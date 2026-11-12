# Ancoat Cleaning Services

A responsive, dependency-free static website. No deployment or external account configuration has been performed.

## Run and build

- `npm run dev` — serve at http://localhost:5173 (Python 3 required).
- `npm run check` — JavaScript syntax checks.
- `npm run build` — produce the deployable `dist/` folder (Node 18+).

Edit `content.js` for company configuration, proposed services and FAQs. Page headings and editorial copy are in `index.html`; styling is in `styles.css`. Google Fonts supplies Libre Caslon Display and DM Sans; system fonts are fallbacks.

## Before launch

Confirm the proposed services, all public copy, operating areas, booking arrangements, supplies and availability. Supply real contact details and any social URLs you want displayed. No prices, credentials or testimonials have been invented. Provide a privacy notice appropriate to real enquiry processing before enabling delivery. Add your canonical URL and absolute social image metadata once the final domain is known.

## Enquiry delivery

The default form is a clearly labelled demo. It validates locally and never sends, stores or claims to deliver an enquiry.

To receive enquiries, implement an HTTPS endpoint and set `company.formEndpoint` in `content.js`. It must accept JSON fields `name`, `email`, `phone`, `postcode`, `service` and `message`; return a 2xx response only after successful acceptance for delivery, and a non-2xx response otherwise. Configure CORS for the deployed origin if needed. Validate and limit inputs server-side, add rate limiting/spam protection, and store delivery credentials only on the server. Agree retention/privacy handling and add a privacy notice. The client includes a pending state, 15-second timeout, failure recovery and success only after the endpoint responds successfully. Test real delivery before launch.

## Image sources

Local optimised JPEG copies downloaded from Unsplash on 12 November 2026. Stock interiors are illustrative, not Ancoat staff or completed projects.

- `assets/living-room.jpg`: https://images.unsplash.com/photo-1600210492486-724fe5c67fb0 (2000px, quality 85).
- `assets/interior.jpg`: https://images.unsplash.com/photo-1600607687920-4e2a09cf159d (1200px, quality 85).
- Licence: https://unsplash.com/license — allows free commercial use. No endorsement is implied.

## GitHub Pages publishing

`.github/workflows/deploy.yml` checks and builds the website, then publishes `dist/` to GitHub Pages whenever `main` changes. All asset paths are relative, so repository-based Pages URLs work.

The repository must have Settings → Pages → Build and deployment → Source set to **GitHub Actions**. The workflow can also be started manually from the Actions tab. The resulting Pages URL is independent of your computer; local preview does not need to remain running. A successful workflow deployment is required before the website is live. Use GitHub commits to track incremental changes and revert earlier versions when needed.
