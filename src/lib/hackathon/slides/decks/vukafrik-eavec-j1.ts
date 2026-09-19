import type { HackathonDeck, HackathonSlide } from "@/lib/hackathon/slides/types";

function s(partial: HackathonSlide): HackathonSlide {
  return partial;
}

/**
 * VUK’AFRIK 2026 — Jour 1 théorique (e-avec.org/live + /mc).
 * Narratif ancré VSLA/AVEC (CARE, TechnoServe, AIR) : caisse opaque,
 * tenue de livres fragile, faible lien au formalisme financier.
 */
export const vukafrikEavecJ1Deck: HackathonDeck = {
  slug: "vukafrik-eavec-j1",
  titleFr: "e-AVEC · VUK’AFRIK",
  titleEn: "e-AVEC · VUK’AFRIK",
  descriptionFr:
    "Problème AVEC → solution e-AVEC → impact → modèle. Jour 1 théorique.",
  descriptionEn:
    "AVEC problem → e-AVEC solution → impact → model. Day 1 theory.",
  moduleLabelFr: "Finance / Fintech",
  moduleLabelEn: "Finance / Fintech",
  estimatedMinutes: 12,
  speakerHintFr: "Piloté depuis /mc · diffusé sur /live",
  speakerHintEn: "Controlled from /mc · shown on /live",
  slides: [
    s({
      id: "cover",
      layout: "title",
      palette: "mint",
      eyebrow: "VUK’AFRIK 2026 · Kinshasa · Village Finance / Fintech",
      title: "e-AVEC",
      subtitle:
        "Rendre la caisse villageoise visible, gouvernée et bancable.",
      illustration: "avec-circle",
      notes:
        "Accueil. Dire : aujourd’hui théorie. La pratique produit = e-avec.org en prod.",
    }),
    s({
      id: "context",
      layout: "content",
      palette: "forest",
      eyebrow: "Contexte RDC",
      title: "Les AVEC existent déjà — le système les voit mal",
      body: [
        "Des millions de membres en Afrique épargnent en cercle (VSLA / AVEC). En RDC, c’est un pilier d’inclusion — encore largement hors radar des banques et du régulateur.",
      ],
      bullets: [
        { text: "Réunions hebdomadaires · parts · crédits internes · fonds social" },
        { text: "Modèle prouvé (CARE et pairs) — mais cahier + cash" },
        { text: "Village VUK’AFRIK : Finance, Fintech & Assurance" },
      ],
      illustration: "avec-cashbox",
      notes: "Ancrer dans la réalité institutionnelle (FOGEC, MFI, ONG).",
    }),
    s({
      id: "problem",
      layout: "split",
      palette: "coral",
      eyebrow: "Problématique",
      title: "La caisse est opaque",
      body: [
        "Les rapports terrain (CARE, TechnoServe, AIR…) convergent : vol de caisse, mauvaises écritures, pouvoir concentré chez les « lettrés », peu de lien au crédit formel.",
      ],
      bullets: [
        { text: "Cash physique — risque de détournement" },
        { text: "Cahier fragile — soldes contestables hors réunion" },
        { text: "Crédits sans vote traçable pour tous" },
        { text: "Aucun historique portable pour FOGEC / banque / ONG" },
      ],
      illustration: "avec-opaque",
      notes: "Persona : présidente AVEC + facilitateur ONG.",
    }),
    s({
      id: "personas",
      layout: "steps",
      palette: "slate",
      eyebrow: "Qui souffre ?",
      title: "Trois acteurs, un même frein",
      steps: [
        {
          num: 1,
          title: "Présidente / trésorière",
          body: "Doit prouver l’intégrité de la caisse sans Excel fragile.",
        },
        {
          num: 2,
          title: "Membre",
          body: "Veut voir ses parts, ses prêts, et voter les décisions.",
        },
        {
          num: 3,
          title: "Facilitateur ONG",
          body: "Suit N groupes, détecte les alertes, produit un PV crédible.",
        },
      ],
      illustration: "workspace",
    }),
    s({
      id: "vs-tontine",
      layout: "split",
      palette: "violet",
      eyebrow: "Différenciation",
      title: "Pas une tontine digitale de plus",
      body: [
        "Djangui, Likelemba, Maman Tontine digitalisent tours et cagnottes. e-AVEC digitalise la méthodologie AVEC/VSLA documentée par CARE, FAO, ICI Cocoa, World Bank.",
      ],
      bullets: [
        { text: "Eux : tours / likelemba · coach IA grand public" },
        { text: "Nous : parts, prêts votés, fonds social, clôture" },
        { text: "Nous : OS de groupe + Passport + facilitateur ONG" },
        { text: "Phrase : ils digitalisent la tontine — nous l’AVEC" },
      ],
      illustration: "avec-ledger",
      notes:
        "Insister : ROSCA ≠ VSLA. Jury Fintech = différenciation nette.",
    }),
    s({
      id: "solution",
      layout: "section",
      palette: "mint",
      eyebrow: "Solution",
      title: "e-AVEC",
      subtitle: "Le même rituel AVEC — une confiance vérifiable",
      illustration: "avec-ledger",
    }),
    s({
      id: "pillars",
      layout: "content",
      palette: "mint",
      eyebrow: "Produit",
      title: "Quatre piliers",
      bullets: [
        { text: "Réunion — parts 1–5 + solidarité (Fc / Mobile Money)" },
        { text: "Caisse — épargne, prêts, aide, clôture de cycle" },
        { text: "Gouvernance — votes membres (crédits, règles)" },
        { text: "Passport — historique portable + consentement partenaires" },
      ],
      illustration: "avec-vote",
      notes: "Ne pas ouvrir l’app ici — renvoyer à la pratique sur e-avec.org.",
    }),
    s({
      id: "digital",
      layout: "split",
      palette: "sky",
      eyebrow: "Ancrage terrain",
      title: "Conçu pour le Kinshasa réel",
      body: [
        "La digitalisation VSLA échoue souvent sur le réseau, la littératie et le téléphone. e-AVEC reste simple : Fc, rituel connu, offline-aware.",
      ],
      bullets: [
        { text: "Montants en Fc — pas de jargon ledger" },
        { text: "Parcours réunion = réunion physique" },
        { text: "Réseau faible anticipé" },
        { text: "Facilitateur multi-groupes pour les ONG" },
      ],
      illustration: "avec-momo",
    }),
    s({
      id: "passport",
      layout: "content",
      palette: "indigo",
      eyebrow: "Différenciation",
      title: "Passport — de l’informel au formel",
      body: [
        "Sans historique, l’AVEC reste invisible pour le crédit institutionnel. Le Passport porte le parcours du membre — avec consentement.",
      ],
      bullets: [
        { text: "Score / historique de fiabilité de groupe" },
        { text: "Consentement explicite (ex. FOGEC démo)" },
        { text: "Porte d’entrée formalisation — sans se dire banque" },
      ],
      illustration: "avec-passport",
    }),
    s({
      id: "impact",
      layout: "content",
      palette: "forest",
      eyebrow: "Impact",
      title: "Pourquoi le jury Fintech s’y retrouve",
      bullets: [
        { text: "Inclusion financière là où la banque n’arrive pas" },
        { text: "Transparence anti-détournement pour membres & ONG" },
        { text: "Données utiles aux institutions — avec consentement" },
        { text: "Ancré RDC : pratique AVEC déjà massive" },
      ],
      illustration: "avec-impact",
    }),
    s({
      id: "bm",
      layout: "steps",
      palette: "violet",
      eyebrow: "Business model",
      title: "Qui paie ? B2B2C",
      steps: [
        {
          num: 1,
          title: "Groupe AVEC",
          body: "Abonnement par cycle / mois — caisse digitale.",
        },
        {
          num: 2,
          title: "Facilitateur / ONG",
          body: "Licence multi-groupes · alertes · export PV.",
        },
        {
          num: 3,
          title: "Institution",
          body: "Lecture Passport (API / partenariat) — FOGEC, MFI…",
        },
      ],
      illustration: "project",
      notes: "Rappeler : pas de float bancaire — infrastructure logicielle.",
    }),
    s({
      id: "disclaimer",
      layout: "content",
      palette: "amber",
      eyebrow: "Régulation",
      title: "Ce que e-AVEC n’est pas",
      bullets: [
        { text: "Pas une banque" },
        { text: "Pas d’agrément BCC revendiqué" },
        { text: "Infrastructure pour AVEC, facilitateurs et partenaires" },
      ],
      illustration: "security",
      notes: "Dire la phrase à voix haute.",
    }),
    s({
      id: "closing",
      layout: "closing",
      palette: "mint",
      eyebrow: "VUK’AFRIK 2026",
      title: "On ne remplace pas la confiance — on la rend vérifiable",
      subtitle: "Produit live · e-avec.org",
      bullets: [
        { text: "Village : Finance / Fintech" },
        { text: "Pratique : e-avec.org (production)" },
        { text: "McBuleli · Kinshasa" },
      ],
      ctas: [
        { label: "e-AVEC", href: "https://e-avec.org" },
        { label: "LIVE", href: "/live" },
      ],
      illustration: "avec-circle",
      notes: "Q&A. Remercier. Annoncer la pratique produit.",
    }),
  ],
};
