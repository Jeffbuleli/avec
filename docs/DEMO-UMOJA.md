# AVEC Umoja — démo VUK’AFRIK / jury (P0)

Compte sandbox pour pitch 90 s. **Ne pas utiliser en production réelle.**

## Seed

```bash
# Depuis le repo Avec (même DATABASE_URL que McBuleli)
npm run seed:eavec-umoja

# Ou depuis McBuleliP2P
npm run seed:eavec-umoja
```

Génère `docs/DEMO-UMOJA.json` + met à jour ce fichier avec le `groupId` réel.

## Accès (après seed)

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Présidente (admin) | `demo-umoja-01@eavec.demo` | `DemoUmoja!2026` |
| Co-admin | `demo-umoja-02@eavec.demo` | idem |
| Membre + Passport | `demo-umoja-05@eavec.demo` (Fatou B.) | idem |

## Page jury

- Production : https://e-avec.org/demo
- Business : https://e-avec.org/business
- Facilitateur : https://e-avec.org/app/facilitateur (après login admin)
- Local : http://localhost:3001/demo

## P1 (différenciation)

- Alertes intégrité sur Vue (anti-détournement)
- Share-out visuel (Caisse → Clôture)
- Labels LN/SW sous CTA critiques
- Export PV facilitateur (Imprimer → PDF)

## Script 90 s

1. **0–15 s — Vue** : caisse, cycle, alertes  
2. **15–35 s — Réunion** : parts 1–5 + caisse sociale  
3. **35–60 s — Caisse** : crédits + vote ouvert « Crédit AGR — Isaac »  
4. **60–90 s — Passport** (scroll Vue) : score + consentement FOGEC démo + insights IA  

Disclaimer pitch : *e-AVEC n’est pas une banque et ne revendique aucun agrément BCC.*
