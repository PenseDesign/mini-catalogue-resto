# Le Ndolé d'Or — site-catalogue à commande WhatsApp

## Contenu du dossier

- `index.html` — la structure de la page
- `style.css` — les styles propres au projet (le reste vient de Tailwind via CDN)
- `script.js` — la logique du panier et la génération du message WhatsApp
- `images/` — 6 images de plats + 1 logo, générées en placeholder (dégradé + nom du plat).
  **À remplacer par de vraies photos**, en gardant exactement les mêmes noms de fichiers :
  - `images/ndole-complet.jpg`
  - `images/poulet-dg.jpg`
  - `images/poisson-braise.jpg`
  - `images/eru-traditionnel.jpg`
  - `images/miondo.jpg`
  - `images/bissap.jpg`
  - `images/logo.jpg`

## Adapter à un vrai restaurant

1. Dans `script.js`, ligne `WHATSAPP_NUMBER`, mets le numéro WhatsApp du restaurant (format `237XXXXXXXXX`).
2. Dans `script.js`, modifie l'objet `cart` : noms, prix, et liste des plats.
3. Dans `index.html`, modifie les textes (nom du restaurant, quartier, description de chaque plat) et remplace les images dans `images/`.
4. Pense à mettre à jour aussi les infos du bandeau du haut (`Bonapriso, Douala`, numéro de téléphone dans `tel:`).

## Tester en local

Double-clique sur `index.html` — il s'ouvre directement dans ton navigateur, aucune installation nécessaire.

## Mettre en ligne (pour avoir un vrai lien à montrer)

Options simples et gratuites :
- **Netlify Drop** (netlify.com/drop) : glisser-déposer ce dossier, un lien est généré immédiatement.
- **GitHub Pages** : pousser ce dossier dans un dépôt GitHub, activer Pages dans les réglages du dépôt.
- **Vercel** : `vercel` en ligne de commande dans ce dossier, ou glisser-déposer sur vercel.com.

Une fois en ligne, génère un QR code du lien (n'importe quel générateur de QR gratuit) pour le coller sur les tables ou l'ajouter en bio Instagram/Facebook.
