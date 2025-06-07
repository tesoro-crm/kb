# Video's beheren in de kennisbank

Deze handleiding beschrijft hoe je video's kunt toevoegen en beheren in de TesoroCRM kennisbank.

## Overzicht

Video's worden gehost op Cloudflare Stream voor optimale prestaties en betrouwbaarheid. Het upload- en beheerproces is geautomatiseerd via scripts.

## Vereisten

1. Toegang tot het Cloudflare-dashboard met rechten voor Stream
2. Cloudflare API-token met schrijfrechten voor Stream
3. Node.js en npm geïnstalleerd

## Stappen om een nieuwe video toe te voegen

### 1. Video voorbereiden

- Bewerk de video tot de gewenste lengte
- Exporteer als WebM of MP4
- Bewaar het bestand in `public/videos/` met een beschrijvende naam
  - Bijvoorbeeld: `filter-paneel-openen.webm`

### 2. Video uploaden naar Cloudflare Stream

Voer het volgende commando uit in de projectroot:

```bash
node scripts/upload-videos.js
```

Dit script:
1. Zoekt naar nieuwe video's in `public/videos/`
2. Uploadt ze naar Cloudflare Stream
3. Toont de Video ID en preview-link

### 3. Video toevoegen aan de configuratie

Voeg de video toe aan `scripts/update-video-config.js`:

```javascript
const VIDEOS_CONFIG = {
  // Bestaande video's...
  
  UNIEKE_NAAM: {
    id: 'JOUW_VIDEO_ID',  // Gebruik de ID van de upload stap
    title: 'Beschrijvende titel',
    description: 'Korte omschrijving van de video'
  }
};
```

Voer daarna uit:

```bash
node scripts/update-video-config.js
```

### 4. Video toevoegen aan een MDX-pagina

Gebruik het volgende formaat:

```jsx
<div style="max-width: 800px; margin: 2rem auto; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.2);">
  <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
    <iframe 
      src={`https://customer-5j7pwes53hyjitp3.cloudflarestream.com/${VIDEO_ID}/iframe?preload=true&loop=true&autoplay=true&muted=true`}
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
      title="Beschrijvende titel"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
  <p style="text-align: center; color: #666; margin: 0.5rem 0; padding: 0 1rem;">
    Beschrijvende tekst bij de video
  </p>
</div>
```

## Bestaande video's beheren

### Video's zoeken

Bekijk alle geüploade video's in het [Cloudflare Stream dashboard](https://dash.cloudflare.com/).

### Video verwijderen

1. Verwijder de video uit het Cloudflare Stream dashboard
2. Verwijder de video uit `scripts/update-video-config.js`
3. Voer `node scripts/update-video-config.js` uit
4. Verwijder het videobestand uit `public/videos/`

## Probleemoplossing

- **Upload mislukt**: Controleer of de API-token geldig is en voldoende rechten heeft
- **Video niet zichtbaar**: Controleer of de Video ID klopt en of de video is verwerkt in Cloudflare
- **Automatisch afspelen werkt niet**: Sommige browsers blokkeren automatisch afspelen zonder gebruikersinteractie

## Best practices

- Houd video's kort en gericht (max 2 minuten)
- Gebruik beschrijvende bestandsnamen
- Voeg altijd een duidelijke titel en beschrijving toe
- Test video's op meerdere apparaten
- Houd rekening met toegankelijkheid (voeg eventueel ondertiteling toe)

## Technische details

- Video's worden gehost op Cloudflare Stream
- Scripts bevinden zich in de `scripts/` map
- Configuratie wordt opgeslagen in `src/config/videos.js`
- Video-bestanden worden lokaal opgeslagen in `public/videos/` (niet in versiebeheer)

## Veelvoorkomende fouten

- Vergeten om `.env` bestand aan te maken met API-referenties
- Onjuiste bestandsrechten op de video's
- Verouderde Node.js versie (gebruik LTS versie)
