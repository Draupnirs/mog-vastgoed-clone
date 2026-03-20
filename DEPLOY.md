# Deploy naar Cloudflare Pages

## Optie 1: Via Cloudflare Dashboard (snelste)

1. Ga naar [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages
2. Klik **Create** → **Pages** → **Connect to Git**
3. Selecteer de GitHub repo: `Draupnirs/mog-vastgoed-clone`
4. Build settings:
   - **Build command**: (leeg laten)
   - **Build output directory**: `.` (punt)
5. Klik **Save and Deploy**

Je site is dan live op `mog-vastgoed-clone.pages.dev`

## Optie 2: Via GitHub Actions (automatisch bij elke push)

1. Maak een [Cloudflare API Token](https://dash.cloudflare.com/profile/api-tokens) aan met "Cloudflare Pages" permissies
2. Ga naar GitHub repo Settings → Secrets → Actions
3. Voeg toe:
   - `CLOUDFLARE_API_TOKEN`: je API token
   - `CLOUDFLARE_ACCOUNT_ID`: `0195cfe90b8ffb59203378383d936200`
4. Push een commit of trigger de workflow handmatig

## Custom domein toevoegen

Na deployment in Cloudflare Pages:
1. Ga naar je Pages project → Custom domains
2. Voeg je domein toe
3. Cloudflare regelt automatisch SSL
