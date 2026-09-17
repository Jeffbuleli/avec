# AVEC Umoja — démo VUK’AFRIK / jury

Compte sandbox pour pitch 90 s. **Ne pas utiliser en production réelle.**

## Seed

```bash
# Depuis le repo Avec (même DATABASE_URL que prod)
npm run seed:eavec-umoja
```

Génère `docs/DEMO-UMOJA.json` + met à jour ce fichier avec le `groupId` réel.

## Accès (après seed)

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Présidente (admin) | `demo-umoja-01@eavec.demo` | `DemoUmoja!2026` |
| Co-admin | `demo-umoja-02@eavec.demo` | idem |
| Membre + Passport | `demo-umoja-05@eavec.demo` (Fatou B.) | idem |

## Liens

- Jury : https://e-avec.org/demo  
- App : https://e-avec.org  
- Business : https://e-avec.org/business  
- Facilitateur : https://e-avec.org/app/facilitateur (login admin)  
- Pack pitch : [docs/vukafrik/README.md](./vukafrik/README.md)

## Script 90 s (résumé)

1. **0–30 s — Vue** : caisse Fc → Cotiser  
2. **30–50 s — Réunion** : parts 1–5 + solidarité  
3. **50–70 s — Caisse** : fonds / prêts / vote  
4. **70–90 s — Passport** : historique portable + disclaimer BCC  

Détail : [vukafrik/SCRIPT-90S.md](./vukafrik/SCRIPT-90S.md)

Disclaimer : *e-AVEC n’est pas une banque et ne revendique aucun agrément BCC.*
