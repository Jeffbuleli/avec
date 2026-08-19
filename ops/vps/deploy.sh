#!/usr/bin/env bash
# Deploy e-AVEC web from GitHub → VPS (same host + Postgres as McBuleli).
#
# Usage on the VPS:
#   bash /opt/avec/ops/vps/deploy.sh
#   bash /opt/avec/ops/vps/deploy.sh --ref abc1234
#
# Prereqs:
#   - McBuleli stack running (docker network mcbuleli_default)
#   - ops/vps/.env filled (JWT_SECRET + POSTGRES_* match McBuleli)
#   - nginx: ops/vps/nginx-e-avec.conf + TLS under /etc/ssl/e-avec/
set -euo pipefail

REPO_DIR="${EAVEC_REPO:-/opt/avec}"
COMPOSE_DIR="$REPO_DIR/ops/vps"
BRANCH="${EAVEC_DEPLOY_BRANCH:-main}"
REF=""

if [[ "${1:-}" == "--ref" ]]; then
  REF="${2:?usage: deploy.sh [--ref <sha|tag>]}"
fi

cd "$REPO_DIR"
if [[ ! -d .git ]]; then
  echo "ERROR: $REPO_DIR is not a git checkout. Clone from GitHub first:" >&2
  echo "  git clone https://github.com/Jeffbuleli/avec.git $REPO_DIR" >&2
  exit 1
fi

echo "==> Fetching origin"
git fetch --prune origin

if [[ -n "$REF" ]]; then
  echo "==> Detach at $REF"
  git checkout --detach "$REF"
else
  echo "==> Reset $BRANCH to origin/$BRANCH"
  git checkout -B "$BRANCH" "origin/$BRANCH"
fi

echo "==> HEAD $(git rev-parse --short HEAD) — $(git log -1 --oneline)"
cd "$COMPOSE_DIR"

if [[ ! -f .env ]]; then
  echo "ERROR: missing $COMPOSE_DIR/.env (copy from .env.example; JWT_SECRET = McBuleli)." >&2
  exit 1
fi

if ! docker network inspect mcbuleli_default >/dev/null 2>&1; then
  echo "ERROR: docker network mcbuleli_default missing — start McBuleli db/web first." >&2
  exit 1
fi

chmod +x "$REPO_DIR/ops/vps/"*.sh 2>/dev/null || true

echo "==> Building e-AVEC web image"
docker compose build web
echo "==> Restarting e-AVEC web"
docker compose stop web 2>/dev/null || true
docker compose rm -f web 2>/dev/null || true
docker rm -f eavec-web-1 2>/dev/null || true
docker compose up -d web
sleep 3
curl -fsS -o /dev/null -w "health_http=%{http_code}\n" "http://127.0.0.1:3001/login" || {
  echo "WARN: e-AVEC not responding on :3001 yet — check: docker compose logs -f web" >&2
}

NGINX_SRC="$REPO_DIR/ops/vps/nginx-e-avec.conf"
if [[ -f "$NGINX_SRC" ]]; then
  install -m 644 "$NGINX_SRC" /etc/nginx/sites-available/e-avec.org
  ln -sf /etc/nginx/sites-available/e-avec.org /etc/nginx/sites-enabled/e-avec.org
  if nginx -t 2>/dev/null; then
    systemctl reload nginx
    echo "==> nginx reloaded (e-avec.org)"
  else
    echo "WARN: nginx -t failed — install TLS certs under /etc/ssl/e-avec/ first" >&2
  fi
fi

echo "DEPLOY_OK $(git -C "$REPO_DIR" rev-parse --short HEAD)"
