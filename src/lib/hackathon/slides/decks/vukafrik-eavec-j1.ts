import type { HackathonDeck, HackathonSlide } from "@/lib/hackathon/slides/types";

function s(partial: HackathonSlide): HackathonSlide {
  return partial;
}

/**
 * VUK’AFRIK 2026 — Immersion narrative (e-avec.org/live).
 * Arc: équipe → exclusion financière → AVEC comme réponse → frictions
 * → e-AVEC comme confiance vérifiable → BM → closing.
 * /mc = télécommande uniquement (pas de doublon de contenu).
 */
export const vukafrikEavecJ1Deck: HackathonDeck = {
  slug: "vukafrik-eavec-j1",
  titleFr: "e-AVEC · VUK’AFRIK",
  titleEn: "e-AVEC · VUK’AFRIK",
  descriptionFr:
    "Immersion : exclusion financière → AVEC → frictions → e-AVEC.",
  descriptionEn:
    "Immersion: financial exclusion → AVEC → frictions → e-AVEC.",
  moduleLabelFr: "Finance / Fintech",
  moduleLabelEn: "Finance / Fintech",
  estimatedMinutes: 14,
  speakerHintFr: "Piloté depuis /mc · diffusé sur /live",
  speakerHintEn: "Controlled from /mc · shown on /live",
  slides: [
    s({
      id: "team",
      layout: "team",
      palette: "mint",
      eyebrow: "VUK’AFRIK 2026 · Kinshasa · Équipe",
      title: "L’équipe e-AVEC",
      subtitle: "Ceux qui portent la confiance numérique des caisses villageoises.",
      team: [
        {
          name: "Ir Jeff Buleli",
          role: "Fondateur · développeur principal · McBuleli",
          src: "/live/team/jeff-buleli.png",
          alt: "Portrait de Ir Jeff Buleli",
        },
        {
          name: "Mme Patty Basoga",
          role: "Chargée des Finances · McBuleli",
          src: "/live/team/patty-basoga.png",
          alt: "Portrait de Mme Patty Basoga",
        },
        {
          name: "M. Didier Mushagalusa",
          role: "Formateur en Finance Numérique",
          src: "/live/team/didier-mushagalusa.png",
          alt: "Portrait de M. Didier Mushagalusa",
        },
      ],
      notes:
        "Présenter l’équipe calmement. Jeff = produit. Patty = finance. Didier = pédagogie terrain.",
    }),
    s({
      id: "cover",
      layout: "title",
      palette: "forest",
      eyebrow: "VUK’AFRIK 2026 · Village Finance / Fintech",
      title: "e-AVEC",
      subtitle:
        "Rendre la caisse villageoise visible, gouvernée et bancable.",
      media: {
        src: "/live/slides/slide-impact.png",
        alt: "Communauté entrepreneuriale congolaise",
        caption: "Inclusion là où la banque n’arrive pas encore",
      },
      notes: "Accueil. Aujourd’hui : théorie immersive. Pratique = e-avec.org.",
    }),
    s({
      id: "exclusion",
      layout: "split",
      palette: "coral",
      eyebrow: "Scène 1 · Exclusion",
      title: "La banque dit non. L’économie, elle, continue.",
      body: [
        "En RDC, des millions d’adultes travaillent, épargnent et prêtent — hors du radar bancaire. Pas parce qu’ils refusent le formel : parce que le formel les refuse.",
      ],
      bullets: [
        { text: "Pas de dossier, pas de collatéral « bancable »" },
        { text: "Revenus irréguliers · distance · littératie" },
        { text: "Résultat : cash, voisins, et risque permanent" },
      ],
      media: {
        src: "/live/slides/slide-exclusion.png",
        alt: "Exclusion financière face à une institution",
        caption: "L’exclusion n’est pas l’absence d’économie — c’est l’absence de preuve",
      },
      notes: "Immersion. Faire sentir le vide : besoin d’épargne, porte fermée.",
    }),
    s({
      id: "avec-hope",
      layout: "split",
      palette: "forest",
      eyebrow: "Scène 2 · La réponse du terrain",
      title: "Alors naît l’AVEC",
      body: [
        "Les Associations Villageoises d’Épargne et de Crédit (VSLA / AVEC) répondent déjà : réunion, parts, crédit interne, fonds social. Un modèle prouvé — CARE, TechnoServe, FAO…",
      ],
      bullets: [
        { text: "Rituel hebdomadaire · confiance de proximité" },
        { text: "Épargne cumulative + prêts entre membres" },
        { text: "Inclusion réelle — encore hors radar des banques" },
      ],
      media: {
        src: "/live/slides/slide-avec-hope.png",
        alt: "Réunion AVEC avec caisse et cahier",
        caption: "L’AVEC : la meilleure réponse populaire à l’exclusion",
      },
      notes: "Hommage au modèle. Ne pas dénigrer l’AVEC — elle est la solution de base.",
    }),
    s({
      id: "avec-friction",
      layout: "split",
      palette: "amber",
      eyebrow: "Scène 3 · Mais l’AVEC bute",
      title: "La caisse soigne… et reste fragile",
      body: [
        "Même le meilleur cercle rencontre les mêmes failles : cash détournable, cahier contestable, pouvoir chez les « lettrés », zéro historique portable pour FOGEC, IMF ou banque.",
      ],
      bullets: [
        { text: "Cash physique — risque de détournement" },
        { text: "Cahier fragile — soldes flous hors réunion" },
        { text: "Crédits sans vote traçable pour tous" },
        { text: "Aucun Passport pour le crédit formel" },
      ],
      media: {
        src: "/live/slides/slide-avec-friction.png",
        alt: "Cahier abîmé et caisse opaque",
        caption: "Ce que nous résolvons n’est pas l’AVEC — ce sont ses frictions",
      },
      notes: "Pivot. Le problème = frictions de confiance, pas le modèle AVEC.",
    }),
    s({
      id: "solution",
      layout: "section",
      palette: "mint",
      eyebrow: "Scène 4 · Tournant",
      title: "Et si le même rituel devenait vérifiable ?",
      subtitle: "e-AVEC — la confiance qu’on peut montrer",
      media: {
        src: "/live/slides/slide-eavec-trust.png",
        alt: "Réunion AVEC avec application numérique",
        caption: "Même réunion · preuve numérique",
      },
      notes: "Respirer. Annoncer le produit sans jargon.",
    }),
    s({
      id: "pillars",
      layout: "content",
      palette: "mint",
      eyebrow: "Produit",
      title: "Quatre piliers contre les frictions",
      bullets: [
        { text: "Réunion — parts 1–5 + solidarité en Fc / MoMo" },
        { text: "Caisse — épargne, prêts, aide, clôture de cycle" },
        { text: "Gouvernance — votes membres (crédits, règles)" },
        { text: "Passport — historique portable + consentement" },
      ],
      media: {
        src: "/live/slides/slide-eavec-trust.png",
        alt: "OS e-AVEC en réunion",
      },
      notes: "Lier chaque pilier à une friction de la scène 3.",
    }),
    s({
      id: "vs-tontine",
      layout: "split",
      palette: "violet",
      eyebrow: "Différenciation",
      title: "Pas une tontine digitale de plus",
      body: [
        "Les apps tontine digitalisent tours et cagnottes. e-AVEC digitalise la méthodologie AVEC/VSLA — pour que la caisse soit gouvernée et bancable.",
      ],
      bullets: [
        { text: "Eux : likelemba / tours · grand public" },
        { text: "Nous : parts, prêts votés, fonds social, clôture" },
        { text: "Nous : OS groupe + Passport + facilitateur ONG" },
      ],
      media: {
        src: "/live/slides/slide-vs-tontine.png",
        alt: "Tontine informelle vs réunion AVEC structurée",
        caption: "Ils digitalisent la tontine — nous digitalisons l’AVEC",
      },
      notes: "ROSCA ≠ VSLA. Phrase clé.",
    }),
    s({
      id: "passport",
      layout: "split",
      palette: "indigo",
      eyebrow: "Pont vers le formel",
      title: "Passport — de l’invisible au crédible",
      body: [
        "Sans historique, l’AVEC reste invisible pour le crédit institutionnel. Le Passport porte le parcours — avec consentement explicite.",
      ],
      bullets: [
        { text: "Fiabilité de groupe traçable" },
        { text: "Consentement (ex. FOGEC démo)" },
        { text: "Porte d’entrée formalisation — sans se dire banque" },
      ],
      media: {
        src: "/live/slides/slide-passport.png",
        alt: "Métaphore Passport financier",
        caption: "La preuve qui ouvre la porte",
      },
    }),
    s({
      id: "bm",
      layout: "steps",
      palette: "violet",
      eyebrow: "Business model · Fc",
      title: "Une grande économie, des tarifs clairs",
      steps: [
        {
          num: 1,
          title: "Transfert interne · 0 Fc",
          body: "Viralité — on fait grandir le réseau.",
        },
        {
          num: 2,
          title: "AVEC 1 000 Fc/mois · ONG 10 000 Fc/mois",
          body: "Récurrent B2B2C via facilitateurs.",
        },
        {
          num: 3,
          title: "MoMo 3,5 % · Marché 1 % acheteur",
          body: "Volume réel — pas de float bancaire.",
        },
      ],
      media: {
        src: "/live/slides/slide-bm-economy.png",
        alt: "Économie communautaire et mobile money",
      },
      notes: "Scénario ~2,1 M Fc/mois (100 AVEC · 5 ONG · volumes). Pas banque.",
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
        { text: "Infrastructure pour AVEC, ONG et partenaires" },
      ],
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
        { text: "Pratique : e-avec.org" },
        { text: "McBuleli · Kinshasa" },
      ],
      ctas: [
        { label: "e-AVEC", href: "https://e-avec.org" },
        { label: "Démo", href: "/demo" },
      ],
      media: {
        src: "/live/slides/slide-impact.png",
        alt: "Impact inclusion",
      },
      notes: "Q&A. Remercier. Annoncer la pratique produit.",
    }),
  ],
};
