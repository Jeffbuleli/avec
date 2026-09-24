import type { HackathonDeck, HackathonSlide } from "@/lib/hackathon/slides/types";

function s(partial: HackathonSlide): HackathonSlide {
  return partial;
}

/**
 * VUK’AFRIK 2026 — Challenge 7 · E-learning hors-ligne (Yekola).
 * Arc: équipe → problème connectivité FP → cible → solution → offline
 * → parcours produit → BM MoMo → différenciation → démo → closing.
 * Piloté /mc · diffusé /live (e-avec.org).
 */
export const vukafrikEavecJ1Deck: HackathonDeck = {
  slug: "vukafrik-eavec-j1",
  titleFr: "Yekola · VUK’AFRIK",
  titleEn: "Yekola · VUK’AFRIK",
  descriptionFr:
    "Challenge 7 : e-learning hors-ligne pour la formation professionnelle.",
  descriptionEn:
    "Challenge 7: offline e-learning for vocational training.",
  moduleLabelFr: "Industrie numérique · Éducation",
  moduleLabelEn: "Digital industry · Education",
  estimatedMinutes: 12,
  speakerHintFr: "Piloté depuis /mc · diffusé sur /live · démo yekola.mcbuleli.com",
  speakerHintEn: "Controlled from /mc · shown on /live · demo yekola.mcbuleli.com",
  slides: [
    s({
      id: "team",
      layout: "team",
      palette: "mint",
      eyebrow: "VUK’AFRIK 2026 · Kinshasa · Team McBuleli",
      title: "L’équipe Yekola",
      subtitle: "Ceux qui rendent la formation pro possible même sans réseau.",
      team: [
        {
          name: "Ir Jeff Buleli",
          role: "Fondateur · produit & tech · McBuleli",
          src: "/live/team/jeff-buleli.png",
          alt: "Portrait de Ir Jeff Buleli",
        },
        {
          name: "Mme Patty Basoga",
          role: "Enseignante démo · finance & académie",
          src: "/live/team/patty-basoga.png",
          alt: "Portrait de Mme Patty Basoga",
        },
        {
          name: "M. Didier Mushagalusa",
          role: "Formateur · pédagogie terrain",
          src: "/live/team/didier-mushagalusa.png",
          alt: "Portrait de M. Didier Mushagalusa",
        },
      ],
      notes:
        "Présenter calmement. Jeff = produit. Patty = académie / finance. Didier = terrain FP.",
    }),
    s({
      id: "cover",
      layout: "title",
      palette: "forest",
      eyebrow: "Challenge 7 · E-learning avec mode hors-ligne",
      title: "Yekola",
      subtitle: "Apprendre un métier même quand le réseau tombe.",
      media: {
        src: "/live/slides/slide-yekola-closing.png",
        alt: "Apprenti fier avec certificat numérique",
        caption: "Formation professionnelle · offline-first · Mobile Money",
      },
      notes: "Accueil. Annoncer le challenge officiel. Produit live : yekola.mcbuleli.com",
    }),
    s({
      id: "problem",
      layout: "split",
      palette: "coral",
      eyebrow: "1 · Problème",
      title: "La formation s’arrête quand le réseau tombe",
      body: [
        "Accès limité à la formation professionnelle en zones à faible connectivité. Un jeune commence un module… le signal part… le cours est perdu.",
      ],
      bullets: [
        { text: "3G instable · data chère · coupures fréquentes" },
        { text: "Les LMS classiques exigent une connexion continue" },
        { text: "Résultat : abandons, retards, métiers non maîtrisés" },
      ],
      media: {
        src: "/live/slides/slide-yekola-problem.png",
        alt: "Apprenti bloqué par un signal faible",
        caption: "Ce n’est pas le manque de motivation — c’est le manque de réseau",
      },
      notes: "Phrase clé : le problème = connectivité, pas le contenu.",
    }),
    s({
      id: "target",
      layout: "split",
      palette: "amber",
      eyebrow: "2 · Cible",
      title: "Étudiants et jeunes en formation professionnelle",
      body: [
        "Ceux qui apprennent un métier concret — électricité, couture, commerce, mécanique — sur téléphone, souvent hors campus, souvent hors Wi-Fi.",
      ],
      bullets: [
        { text: "Centres FP, ateliers, apprentis urbains et périurbains" },
        { text: "Formateurs qui veulent publier sans être développeurs" },
        { text: "Paiement local : Orange Money, Airtel Money…" },
      ],
      media: {
        src: "/live/slides/slide-yekola-target.png",
        alt: "Jeunes en formation professionnelle",
        caption: "La cible du brief — pas seulement les « creators » digitaux",
      },
      notes: "Ancrer le brief VUK’AFRIK. Cible = FP.",
    }),
    s({
      id: "solution",
      layout: "section",
      palette: "mint",
      eyebrow: "3 · Solution attendue",
      title: "Des cours téléchargeables et suivables hors ligne",
      subtitle: "Yekola — la plateforme qui vend, télécharge, et continue offline",
      media: {
        src: "/live/slides/slide-yekola-solution.png",
        alt: "Formateur et apprenant reliés par le même cours",
        caption: "Créer · Vendre · Apprendre hors ligne",
      },
      notes: "Respirer. Annoncer le produit sans jargon.",
    }),
    s({
      id: "offline",
      layout: "split",
      palette: "forest",
      eyebrow: "Cœur différenciateur",
      title: "Pas un PDF envoyé par WhatsApp",
      body: [
        "Après achat MoMo, l’apprenant télécharge le pack du cours. Leçons, quiz et progression restent sur l’appareil — puis se synchronisent au reconnect.",
      ],
      bullets: [
        { text: "Pack hors ligne post-achat (IndexedDB)" },
        { text: "Quiz et progression même sans Internet" },
        { text: "Sync automatique au retour du réseau" },
        { text: "Certificat vérifiable à la fin" },
      ],
      media: {
        src: "/live/slides/slide-yekola-offline.png",
        alt: "Téléchargement du pack hors ligne",
        caption: "Offline après achat = conformité au brief",
      },
      notes: "Insister : interactif + sync, pas fichier mort.",
    }),
    s({
      id: "flow",
      layout: "steps",
      palette: "indigo",
      eyebrow: "Parcours produit",
      title: "Trois comptes · un flux clair",
      steps: [
        {
          num: 1,
          title: "Patty · enseignante",
          body: "Crée l’académie, soumet le cours à validation, encaisse via MoMo.",
        },
        {
          num: 2,
          title: "Jeff · admin",
          body: "Valide le contenu avant publication publique.",
        },
        {
          num: 3,
          title: "Dan · apprenant",
          body: "Achète, télécharge le pack, apprend offline, sync, certificat.",
        },
      ],
      media: {
        src: "/live/slides/slide-yekola-sync.png",
        alt: "Cours métier et téléphone en atelier",
        caption: "Rôles réels pour la démo jury",
      },
      notes: "Comptes démo yekola2026. Enchaîner Dan offline en 90 s.",
    }),
    s({
      id: "bm",
      layout: "steps",
      palette: "violet",
      eyebrow: "4 · Business model · FC",
      title: "Qui paie quoi — clair et local",
      steps: [
        {
          num: 1,
          title: "Enseignant / centre FP",
          body: "Abo mensuel Free 0 → Max 2 000 FC. Publie et encaisse.",
        },
        {
          num: 2,
          title: "Apprenant",
          body: "Paie le cours une fois (ex. 500–1 000 FC) + pack offline.",
        },
        {
          num: 3,
          title: "Yekola",
          body: "Commission sur ventes (20 % → 0 % selon plan) · MoMo natif.",
        },
      ],
      media: {
        src: "/live/slides/slide-yekola-bm.png",
        alt: "Paiement Mobile Money pour un cours",
        caption: "Double marché : B2B académies + B2C apprenants",
      },
      notes: "Chiffrer à voix haute. Pas de freemium ads.",
    }),
    s({
      id: "edge",
      layout: "split",
      palette: "violet",
      eyebrow: "Face aux 9 autres groupes",
      title: "Offline profond × MoMo — le quadrant rare",
      body: [
        "Beaucoup montreront un cache PDF ou une vidéo. Peu monétisent en Mobile Money avec rôles clairs et démo live.",
      ],
      bullets: [
        { text: "Eux : Drive / PDF / Moodle online-first" },
        { text: "Nous : pack interactif + sync + certificats" },
        { text: "Nous : abo enseignant + achat cours + MoMo CDF" },
        { text: "Nous : produit déjà en ligne — yekola.mcbuleli.com" },
      ],
      media: {
        src: "/live/slides/slide-yekola-edge.png",
        alt: "Différenciation parmi les apps e-learning",
        caption: "Exceller = problème FP + preuve offline + BM chiffré",
      },
      notes: "Ne pas dénigrer. Positionner le quadrant.",
    }),
    s({
      id: "demo",
      layout: "content",
      palette: "mint",
      eyebrow: "Démo jury · 90 secondes",
      title: "Le script qui convainc",
      bullets: [
        { text: "Dan se connecte · achète « Électricité de base » ou Web" },
        { text: "Télécharge le pack · bascule hors ligne" },
        { text: "Termine une leçon + quiz sans réseau" },
        { text: "Reconnect · sync · certificat" },
        { text: "Bonus 20 s : Patty studio · Jeff modération" },
      ],
      media: {
        src: "/live/slides/slide-yekola-offline.png",
        alt: "Moment offline de la démo",
      },
      notes: "Répéter sur téléphone réel. Meet/IA = bonus seulement.",
    }),
    s({
      id: "closing",
      layout: "closing",
      palette: "mint",
      eyebrow: "VUK’AFRIK 2026 · Challenge 7",
      title: "Le métier s’apprend même hors ligne",
      subtitle: "Produit live · yekola.mcbuleli.com",
      bullets: [
        { text: "Village : Industrie numérique & technologie" },
        { text: "Solution : cours téléchargeables + suivi offline" },
        { text: "Team McBuleli · Kinshasa" },
      ],
      ctas: [
        { label: "Yekola", href: "https://yekola.mcbuleli.com" },
        { label: "Catalogue", href: "https://yekola.mcbuleli.com/catalog" },
      ],
      media: {
        src: "/live/slides/slide-yekola-closing.png",
        alt: "Impact formation professionnelle",
      },
      notes: "Q&A. Remercier. Phrase-pilier une fois.",
    }),
  ],
};
