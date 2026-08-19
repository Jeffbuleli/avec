/**
 * Cloudflare R2 — e-AVEC media (group logos, avatars).
 * Falls back to COMMUNITY_R2_* credentials when EAVEC-specific keys are unset.
 */

import {
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { normalizePublicMediaUrl } from "@/lib/media-url-config";

export type EavecR2Config = {
  accountId: string;
  bucket: string;
  publicBaseUrl: string;
  accessKeyId: string;
  secretAccessKey: string;
};

function readEnv(key: string): string | undefined {
  return process.env[key]?.trim() || undefined;
}

export function eavecR2EnvPresent(): boolean {
  return Boolean(
    getEavecR2Config() ||
      (readEnv("EAVEC_R2_PUBLIC_BASE_URL") &&
        readEnv("EAVEC_R2_BUCKET") &&
        readEnv("EAVEC_R2_TOKEN")),
  );
}

export function getEavecR2Config(): EavecR2Config | null {
  const accountId =
    readEnv("EAVEC_R2_ACCOUNT_ID") ?? readEnv("COMMUNITY_R2_ACCOUNT_ID");
  const bucket = readEnv("EAVEC_R2_BUCKET") ?? "e-avec";
  const publicBaseUrl =
    readEnv("EAVEC_R2_PUBLIC_BASE_URL") ??
    readEnv("COMMUNITY_R2_PUBLIC_BASE_URL");
  const accessKeyId =
    readEnv("EAVEC_R2_ACCESS_KEY_ID") ?? readEnv("COMMUNITY_R2_ACCESS_KEY_ID");
  const secretAccessKey =
    readEnv("EAVEC_R2_SECRET_ACCESS_KEY") ??
    readEnv("EAVEC_R2_TOKEN") ??
    readEnv("COMMUNITY_R2_SECRET_ACCESS_KEY");

  if (
    !accountId ||
    !bucket ||
    !publicBaseUrl ||
    !accessKeyId ||
    !secretAccessKey
  ) {
    return null;
  }

  if (secretAccessKey.startsWith("cfat_")) {
    return null;
  }

  return {
    accountId,
    bucket,
    publicBaseUrl: publicBaseUrl.replace(/\/$/, ""),
    accessKeyId,
    secretAccessKey,
  };
}

function getR2Client(cfg: EavecR2Config): S3Client {
  return new S3Client({
    region: "auto",
    endpoint: `https://${cfg.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: cfg.accessKeyId,
      secretAccessKey: cfg.secretAccessKey,
    },
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
  });
}

export function eavecGroupLogoKey(groupId: string, fileName: string): string {
  const now = new Date();
  const ym = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  return `e-avec/groups/${ym}/${groupId}/${fileName}`;
}

export function eavecMediaPublicUrl(
  cfg: EavecR2Config,
  objectKey: string,
): string {
  return `${cfg.publicBaseUrl}/${objectKey}`;
}

export async function putEavecObjectToR2(args: {
  objectKey: string;
  body: Uint8Array;
  mimeType: string;
}): Promise<string | null> {
  const cfg = getEavecR2Config();
  if (!cfg) return null;

  try {
    const client = getR2Client(cfg);
    await client.send(
      new PutObjectCommand({
        Bucket: cfg.bucket,
        Key: args.objectKey,
        Body: args.body,
        ContentType: args.mimeType,
      }),
    );
    const raw = eavecMediaPublicUrl(cfg, args.objectKey);
    return normalizePublicMediaUrl(raw) ?? raw;
  } catch (e) {
    console.error("[eavec/r2] putObject failed", {
      key: args.objectKey,
      message: e instanceof Error ? e.message : String(e),
    });
    return null;
  }
}
