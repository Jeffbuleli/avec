import type { HackathonDeck, HackathonSlide } from "@/lib/hackathon/slides/types";

function s(partial: HackathonSlide): HackathonSlide {
  return partial;
}

/**
 * VUK’AFRIK 2026 — Jour 1 théorique (slides only).
 * Style Silikin / McBuleli Hackathon. Démo pratique = e-avec.org (prod), pas /demo.
 */
export const vukafrikEavecJ1Deck: HackathonDeck = {
  slug: "vukafrik-eavec-j1",
  titleFr: "VUK’AFRIK · e-AVEC (J1 théorique)",
  titleEn: "VUK’AFRIK · e-AVEC (Day 1 theory)",
  descriptionFr:
    "Présentation théorique Jour 1 : problème AVEC → solution e-AVEC → impact → business model. Sans démo live.",
  descriptionEn:
    "Day 1 theory deck: AVEC problem → e-AVEC solution → impact → business model. No live demo.",
  moduleLabelFr: "Jour 1 · Théorie",
  moduleLabelEn: "Day 1 · Theory",
  estimatedMinutes: 12,
  speakerHintFr:
    "J1 = slides seulement. ← → pour naviguer, F plein écran, L On Air. Démo pratique = e-avec.org (prod) à partir de J2.",
  speakerHintEn:
    "Day 1 = slides only. ← → navigate, F fullscreen, L On Air. Live product = e-avec.org (prod) from Day 2.",
  slides: [
    s({
      id: "cover",
      layout: "title",
      palette: "mint",
      eyebrow: "VUK’AFRIK 2026 · Village Finance / Fintech",
      title: "e-AVEC",
      subtitle:
        "L’infrastructure de confiance des associations villageoises d’épargne & crédit.",
      illustration: "project",
      notes:
        "Accueillir. Dire : Jour 1 théorique — on pose le problème et la vision. La pratique produit arrive ensuite sur e-avec.org.",
    }),
    s({
      id: "context",
      layout: "content",
      palette: "forest",
      eyebrow: "Contexte",
      title: "Trois jours à Kinshasa — notre plan",
      bullets: [
        { text: "J1 — Théorie : problème, solution, impact, modèle (cette session)" },
        { text: "J2 — Pratique : prototype live sur e-avec.org (prod)" },
        { text: "J3 — Pitch jury + public" },
      ],
      illustration: "agenda",
      notes: "Insister : aujourd’hui pas de clic produit — uniquement la logique.",
    }),
    s({
      id: "village",
      layout: "split",
      palette: "amber",
      eyebrow: "Village thématique",
      title: "Finance, Fintech & Assurance",
      body: [
        "VUK’AFRIK regroupe l’écosystème inclusion financière (BCC, FOGEC, MFI, fintechs). On ne pitch pas « une app cool » — on pitch une infrastructure AVEC.",
      ],
      bullets: [
        { text: "Primaire : Finance / Fintech / Assurance" },
        { text: "Secondaire : Startups & PME" },
        { text: "Pont narratif : AGR / agriculture (crédits AVEC)" },
      ],
      illustration: "idea-to-spec",
      notes: "Citer le village à voix haute pour le jury.",
    }),
    s({
      id: "problem-section",
      layout: "section",
      palette: "coral",
      eyebrow: "Le problème",
      title: "La caisse AVEC est opaque",
      subtitle: "Cash · cahier · confiance fragile",
      illustration: "limits",
    }),
    s({
      id: "problem",
      layout: "content",
      palette: "coral",
      eyebrow: "Réalité terrain",
      title: "Ce que vivent les groupes AVEC",
      bullets: [
        { text: "Épargne en cash — soldes peu vérifiables hors réunion" },
        { text: "Risque de détournement / erreurs de tenue de livres" },
        { text: "Crédits sans vote traçable pour tous les membres" },
        { text: "Aucun historique portable pour banque, FOGEC ou ONG" },
      ],
      illustration: "security",
      notes:
        "Persona : présidente AVEC Kinshasa / Bukavu. Pain = confiance + formalisation.",
    }),
    s({
      id: "personas",
      layout: "steps",
      palette: "slate",
      eyebrow: "Personas",
      title: "Trois regards, un même pain",
      steps: [
        {
          num: 1,
          title: "Présidente / trésorière",
          body: "Doit prouver que la caisse est juste — sans Excel fragile.",
        },
        {
          num: 2,
          title: "Membre",
          body: "Veut voir ses parts, ses prêts, et voter les décisions.",
        },
        {
          num: 3,
          title: "Facilitateur ONG",
          body: "Suit N groupes, détecte les alertes, exporte un PV crédible.",
        },
      ],
      illustration: "workspace",
    }),
    s({
      id: "solution-section",
      layout: "section",
      palette: "mint",
      eyebrow: "La solution",
      title: "e-AVEC",
      subtitle: "Même rituel AVEC · confiance vérifiable",
      illustration: "vibe-loop",
    }),
    s({
      id: "solution",
      layout: "content",
      palette: "mint",
      eyebrow: "Produit",
      title: "Quatre piliers",
      bullets: [
        { text: "Réunion — parts 1–5 + solidarité (Fc / MoMo)" },
        { text: "Caisse — épargne, prêts, aide, clôture de cycle" },
        { text: "Gouvernance — votes membres (crédits, règles)" },
        { text: "Passport — historique portable + consentement partenaires" },
      ],
      illustration: "build-stack",
      notes: "Ne pas ouvrir l’app aujourd’hui. Promettre la pratique J2 sur e-avec.org.",
    }),
    s({
      id: "impact",
      layout: "split",
      palette: "forest",
      eyebrow: "Impact",
      title: "Pourquoi le jury Finance / Fintech s’y retrouve",
      body: [
        "On digitalise une pratique déjà massive en RDC — on ne invente pas un usage.",
      ],
      bullets: [
        { text: "Transparence pour chaque membre" },
        { text: "Alertes intégrité pour gérants et ONG" },
        { text: "Porte d’entrée crédit / formalisation via Passport" },
        { text: "Ancré terrain : Fc, réunions, cycles AVEC" },
      ],
      illustration: "eval",
    }),
    s({
      id: "bm",
      layout: "content",
      palette: "indigo",
      eyebrow: "Business model",
      title: "B2B2C — qui paie ?",
      bullets: [
        { text: "Groupe AVEC — abonnement par cycle / mois" },
        { text: "Facilitateur / ONG — licence multi-groupes + alertes + export" },
        { text: "Institution (FOGEC, MFI) — lecture Passport (consentement)" },
      ],
      illustration: "project",
      notes: "Clarifier : pas de float bancaire — on n’est pas une banque.",
    }),
    s({
      id: "rubric",
      layout: "steps",
      palette: "violet",
      eyebrow: "Grille (modèle McBuleli Hackathon)",
      title: "Comment on gagne les points",
      steps: [
        {
          num: 1,
          title: "Innovation 25 %",
          body: "Gouvernance + Passport + intégrité — pas juste un wallet.",
        },
        {
          num: 2,
          title: "Impact 25 %",
          body: "Transparence caisse · inclusion · anti-détournement.",
        },
        {
          num: 3,
          title: "Tech 20 %",
          body: "Prototype live e-avec.org (pratique J2+).",
        },
        {
          num: 4,
          title: "BM + Pitch 30 %",
          body: "ONG / groupes + présentation problème→solution.",
        },
      ],
      illustration: "eval",
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
        { text: "Infrastructure logicielle pour AVEC & facilitateurs" },
      ],
      illustration: "security",
      notes: "Dire la phrase à voix haute — crédibilité institutionnelle.",
    }),
    s({
      id: "closing",
      layout: "closing",
      palette: "mint",
      eyebrow: "VUK’AFRIK 2026",
      title: "On ne remplace pas la confiance — on la rend vérifiable",
      subtitle: "Suite : pratique sur e-avec.org · McBuleli",
      bullets: [
        { text: "Produit : e-avec.org" },
        { text: "Slides : mcbuleli.org/hackathon/slides" },
        { text: "Village : Finance / Fintech" },
      ],
      ctas: [
        { label: "e-AVEC", href: "https://e-avec.org" },
        { label: "Slides hub", href: "/hackathon/slides" },
      ],
      illustration: "vibe-loop",
      notes:
        "Q&A court. Rappeler J2 = pratique produit en prod. Remercier la salle.",
    }),
  ],
};
