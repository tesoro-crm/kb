# Video Upload Script voor Cloudflare Stream

Dit script maakt het eenvoudig om video's te uploaden naar Cloudflare Stream.

## Vereisten

1. Node.js 16 of hoger
2. Cloudflare account met Stream ingeschakeld
3. Cloudflare API token met Stream rechten

## Installatie

1. Installeer de benodigde afhankelijkheden:
   ```bash
   npm install
   ```

2. Maak een kopie van `.env.example` naar `.env`:
   ```bash
   cp .env.example .env
   ```

3. Vul je Cloudflare gegevens in het `.env` bestand:
   ```
   CLOUDFLARE_ACCOUNT_ID=je_account_id_hier
   CLOUDFLARE_API_TOKEN=je_api_token_hier
   ```

## Gebruik

1. Plaats je video's in de `public/videos` map
2. Voer het script uit:
   ```bash
   node scripts/upload-videos.js
   ```

3. De geüploade video's worden weergegeven met hun afspeel-URL's

## Ondersteunde bestandsformaten
- MP4
- WebM
- MOV

## Veiligheid

- Zorg ervoor dat je `.env` in je `.gitignore` staat
- Deel je API-token nooit publiekelijk
- Gebruik een token met alleen de benodigde rechten

## Probleemoplossing

- Zorg ervoor dat je voldoende rechten hebt in Cloudflare
- Controleer of je account is ingesteld voor Stream
- Zorg voor een stabiele internetverbinding bij het uploaden
