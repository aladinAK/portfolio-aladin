# Portfolio — Aladin Akkari

Portfolio personnel à **défilement horizontal**, une page, quatre sections thématiques.
Objectif double : montrer les travaux et convaincre des recruteurs (postes visés :
designer web, frontend, UI/UX, Shopify/CMS).

Production : <https://aladinakkari.ca> — hébergé chez **WHC.ca**, déployé par
cPanel Git Version Control.

---

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript 5 · Tailwind CSS 4 ·
lucide-react · @formspree/react · pnpm.

`output: 'export'` — **site 100 % statique**, aucun serveur Node en production.

---

## Déploiement — à lire avant tout push

Le site se met à jour tout seul quand on pousse sur `main`, mais **cPanel ne
compile rien** : il ne fait que recopier le dossier `out/` déjà présent dans le
dépôt.

> **`out/` est versionné. Un push sans rebuild déploie l'ancienne version du site.**

```bash
pnpm run deploy  # = next build + git add out public
git add app components lib   # le script n'indexe QUE out/ et public/
git commit -m "…"
git push         # cPanel déploie automatiquement
```

> `pnpm run deploy`, pas `pnpm deploy` : `deploy` est une commande réservée de
> pnpm (déploiement de workspace) et échoue avec `ERR_PNPM_CANNOT_DEPLOY`
> avant même d'atteindre le script.
>
> Le script s'arrête à `git add -A out public`. Commiter `out/` sans les
> sources qui l'ont produit laisse un dépôt incapable de reproduire son
> propre build.

`.cpanel.yml` exécute :

1. `rm -rf $DEPLOYPATH/*` (avec `DEPLOYPATH=$HOME/public_html/`) — purge le site.
   `*` **ne touche pas aux fichiers cachés**, et c'est voulu : `.well-known/`
   sert au renouvellement du certificat SSL, le supprimer casserait le HTTPS.
2. `cp -R out/. $DEPLOYPATH` — copie tout, y compris les fichiers cachés.
   ⚠️ `out/*` (avec l'astérisque) ignorerait `.htaccess` : ne pas le remettre.

`public/.htaccess` → recopié dans `out/` à chaque build. Il porte la compression
gzip, les en-têtes de cache (1 an sur `/_next/static`, revalidation sur le HTML),
la page 404 et les en-têtes de sécurité.

---

## Architecture

```
app/layout.tsx          Polices, metadata SEO, JSON-LD, I18nProvider, CustomCursor, DsLauncher
app/page.tsx            Assemble les 4 sections dans HorizontalScrollLayout
app/globals.css         Thèmes de section, animations, primitives DS  (~1000 lignes)
app/sitemap.ts          sitemap.xml généré au build
app/robots.ts           robots.txt généré au build

components/
  horizontal-scroll-layout.tsx   Défilement horizontal, hash d'URL, nav clavier ← →
  custom-cursor.tsx              Curseur personnalisé (désactivé si pointer: coarse)
  floating-orb.tsx               Orbe en haut au centre, couleur par section
  project-info.tsx               Panneau d'infos projet (agency/book/mood)
  manuscript-canvas.tsx          Dragon interactif de la section livre (canvas + WebGL)
  agency-contact-form.tsx        Formulaire Formspree
  sections/{studio,agency,book,mood}-section.tsx
  design-system/                 Panneau de documentation du design system
    doc-overlay.tsx              Coque plein écran partagée (focus, Échap, jauge, nav, accent de section)
    doc-primitives.tsx           SectionHead / Panel des panneaux

lib/i18n.tsx            Dictionnaire FR/EN (~420 clés) + useLang()
lib/use-scroll-reveal.ts Hook partagé des révélations au scroll
```

### Les 4 sections

| Slug | Thème CSS | Sujet | Identité typographique |
|---|---|---|---|
| `studio` | `.section-studio` | Profil, parcours, projets | Geist + Playfair italic |
| `agency` | `.section-nature` | Services, réalisations, contact | Clash Display |
| `book` | `.section-tech` | Roman *Les Chroniques de Jez* | UnifrakturMaguntia + Special Elite |
| `mood` | `.section-lifestyle` | App MoodMovie | Syne |

Chaque thème expose 4 rôles : `--section-bg`, `--section-fg`, `--section-accent`,
`--section-muted`. **Aucune couleur en dur dans un composant** — tout passe par ces
jetons.

---

## Conventions

- **i18n** : tout texte visible passe par `t("clé")`. Clés préfixées par section
  (`agency.*`, `book.*`…). Exception assumée : les avis Amazon de la section livre
  restent en français dans les deux langues — ce sont les mots des lecteurs.
- **Révélations au scroll** : `useScrollReveal` + classes `.s-reveal` `.s-up`
  `.s-blur` `.s-left`… Le délai se règle par `--delay`.
- **Commentaires** : en anglais dans les fichiers de sections et `globals.css`
  (convention existante) ; en français dans `components/design-system/`.
- **Animations** : toujours prévoir `prefers-reduced-motion`. Éviter les boucles
  infinies hors marquees — la section livre a déjà été allégée pour cette raison.

---

## Pièges rencontrés (ne pas refaire)

1. **`style` inline > classe utilitaire.** Un `style={{backgroundColor}}` écrase
   toujours un `hover:bg-*` de Tailwind : le survol ne se déclenche jamais. Le bug
   existait dans les grilles de services d'agency **et** de studio. Mettre le fond
   dans une classe CSS.
2. **Couches décoratives en `absolute inset-0`** : elles ont besoin d'un ancêtre
   `position: relative` sur le conteneur **racine** de la section, sinon elles se
   calent sur `.vertical-section` (100vh) et s'arrêtent après le premier écran.
3. **`.s-reveal.s-left` décale de 40 px vers la droite** avant révélation → ajouter
   `overflow-hidden` sur la section qui la contient, sinon défilement latéral parasite.
4. **`overflow-x: clip` est inutile ici** : la spec CSS le ramène à `hidden` dès que
   `overflow-y` vaut `auto`. Corriger la source du débordement à la place.
5. **Ancres internes** : ne jamais utiliser `href="#id"` — écrire dans
   `location.hash` perturbe la navigation par section de `HorizontalScrollLayout`.
   Utiliser `scrollIntoView()`.
6. **Le dev server peut cesser de recompiler `globals.css`.** Si un style n'apparaît
   pas alors que le fichier est correct, redémarrer `next dev` — et valider sur le
   build de production (`npx next build` + servir `out/`).
7. **`@keyframes` avec `forwards`** écrase les opacités utilitaires : `brushReveal`
   affichait les traits de pinceau à 100 % au lieu de leur opacité voulue. Passer par
   une variable (`--brush-o`).

---

## Dosage des couches ambiantes

Chaque section porte une couche décorative de fond. Son opacité est un réglage
transverse : lu section par section, un chiffre isolé ne dit rien, c'est la
comparaison entre sections qui compte.

| Section | Couche | Opacités | Écart au fond |
|---|---|---|---|
| `studio` | 4 lignes, 9 marques d'angle | 4 – 8 % | identité volontairement graphique, sans ambiance |
| `agency` | 8 formes géométriques + 3 orbes | 17 – 42 % | 1,07 – 1,26:1 |
| `book` | 6 taches, 4 coulures, 7 pinceaux | 10 – 17 % | 1,22 – 1,39:1 |
| `mood` | 14 particules | 20 – 42 % | 1,32 – 2,03:1 |

> Montées le 05/10/2026 : `agency` et `mood` étaient trop discrètes. Les
> opacités des formes et des particules ont été multipliées par 1,4, la bordure
> des formes est passée de 35 % à 50 % d'alpha et les trois orbes de 10/12/15 %
> à 14/17/21 %.

**Comment l'écart est calculé** : couleur de la couche composée sur le fond de
section avec son alpha effectif — pour `agency`, l'alpha de la **bordure**
(0,5) multiplié par l'opacité de la forme — puis ratio WCAG contre le fond nu.
Les valeurs d'`agency` étaient auparavant annoncées entre 1,31 et 2,42:1 : ce
chiffre ne tenait pas compte de l'alpha de la bordure, les formes se situaient
en réalité à 1,03 – 1,09:1, soit au niveau du seuil de perception.

Le seuil où l'œil distingue un aplat d'un fond uni est autour de **1,05:1**. Les
couches de `book` étaient à 2,5 – 6 % (1,05 – 1,12:1) : dix-sept éléments que
personne ne voyait. Elles sont montées à 10 – 17 %, ce qui aligne leur écart au
fond sur celui d'`agency`. Attention au piège : à opacité égale, une couche ne
se voit pas pareil sur le parchemin de `book` que sur le noir d'`agency` — c'est
l'écart au fond qui doit correspondre, pas le pourcentage.

Trois leviers pour `book`, à ne pas oublier ensemble : `o:` des `INK_SPLATS`,
`--brush-o` des `BrushStrokes`, et l'alpha du dégradé de `.ink-drip` — dont
l'opacité effective est le **produit** du dégradé et de l'opacité finale de
`inkDripDown` (0,26 × 0,5 = 13 %).

---

## Sécurité

Le dépôt GitHub est **public** : rien de sensible ne doit y entrer.

- **Aucun secret dans le code.** Pas de `.env`, pas de clé API. L'identifiant
  Formspree (`mpqyogeq`) est un endpoint public par nature, pas un secret.
- **`.cpanel.yml` utilise `$HOME`**, jamais `/home/<utilisateur>/`. Le chemin en
  dur publiait l'identifiant cPanel sur un dépôt public — moitié d'un couple de
  connexion. Ne pas le remettre.
- **Source maps bloquées** par `.htaccess` (403), plus `.yml`, `.bak`, `.log`,
  `.ts`. Next livre une `.map` de polyfill que rien n'oblige à exposer.
- **En-têtes** : `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`.
- **`dangerouslySetInnerHTML`** n'est utilisé qu'une fois (`app/layout.tsx`), sur
  un objet JSON-LD littéral et figé : aucune entrée utilisateur, pas d'injection.
- **Vulnérabilités Next.js signalées par `pnpm audit`** (DoS, contournement de
  middleware, SSRF) : **non exploitables ici**. Elles visent toutes le runtime
  serveur de Next — or `output: 'export'` produit un site 100 % statique servi par
  Apache, sans Node, sans middleware, sans composants serveur. À réévaluer
  seulement si le projet quitte l'export statique.
- `aladinakdesign@gmail.com` est exposé volontairement (lien de contact) : risque
  de moissonnage assumé pour un portfolio.

### Modifier le `.htaccess` sans casser le site

Une directive refusée par Apache renvoie **500 sur tout le site**. Toujours
valider avant de pousser :

```bash
# syntaxe
apachectl -f <conf-de-test> -t
```

`ServerSignature` a été écarté pour cette raison : refusé selon les configurations,
et sans réel bénéfice. Toute directive dépendant d'un module doit rester dans un
`<IfModule>`.

Validé en conditions réelles (Apache local, `AllowOverride All`) : gzip actif,
`.map` en 403, 404 personnalisée, cache 1 an sur `/_next/static`, HTML revalidé.

---

## Points ouverts

- **Aucun projet Shopify / e-commerce** alors que c'est un poste visé. Un gros
  projet client Shopify est en cours — à ajouter dans la section agency une fois livré.
- **Pas d'étude de cas** : les projets sont des vitrines (lien + description). Pour
  un poste UI/UX, une seule étude de cas fouillée (problème → recherche → itérations
  → résultat mesuré) vaudrait mieux que cinq vitrines.
- **Aucun résultat chiffré** sur les projets réels.
- `book.subtitle` est une clé i18n conservée volontairement bien qu'inutilisée — le
  sous-titre a été retiré du hero du livre, il peut revenir.
- **Formspree** : formulaire `mpqyogeq`. L'adresse de destination est configurée dans
  le tableau de bord Formspree, pas dans le code. Plan gratuit = 50 envois/mois.
- Les projets « Réalisations » d'agency sont des **concepts personnels**, affichés
  comme tels (badge « Concept »). Ne pas les présenter comme des commandes clients.

---

## Vérifications avant de livrer

```bash
npx tsc --noEmit                    # typecheck
npx next build                      # build + regénère out/
cd out && python3 -m http.server 3222   # servir le build réel pour tester
```

Le projet n'a **pas de configuration ESLint** : `pnpm lint` échoue, indépendamment
de toute modification.
