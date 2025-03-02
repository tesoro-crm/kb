# Tesoro Documentatie

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

Deze repository bevat de officiële documentatie voor Tesoro CRM, gebouwd met Astro en Starlight.

## 📋 Projectoverzicht

Tesoro Docs is een meertalige documentatiewebsite die gebruikers helpt bij het gebruik van het Tesoro CRM-platform. De documentatie is beschikbaar in het Nederlands, Engels en Spaans, met Nederlands als standaardtaal.

## 🛠️ Installatie

### Vereisten

- Node.js (versie 16 of hoger)
- npm (komt mee met Node.js)

### Stappen

1. Clone de repository:

   ```bash
   git clone https://github.com/yourusername/tesoro-docs.git
   cd tesoro-docs
   ```

2. Installeer de afhankelijkheden:
   ```bash
   npm install
   ```

## 🚀 Gebruik

| Commando            | Actie                                            |
| :------------------ | :----------------------------------------------- |
| `npm run dev`       | Start lokale ontwikkelserver op `localhost:4321` |
| `npm run build`     | Bouwt de productieversie naar `./dist/`          |
| `npm run preview`   | Bekijk de gebouwde site lokaal                   |
| `npm run astro ...` | Voer CLI-commando's uit zoals `astro add`        |

## 📁 Projectstructuur

```
.
├── public/               # Statische bestanden (favicon, etc.)
├── src/
│   ├── assets/           # Afbeeldingen en andere assets
│   │   └── docs/         # Geoptimaliseerde documentatie-afbeeldingen
│   ├── content/
│   │   ├── docs/         # Documentatie-inhoud (Markdown/MDX)
│   │   │   ├── en/       # Engelse documentatie
│   │   │   ├── es/       # Spaanse documentatie
│   │   │   └── nl/       # Nederlandse documentatie
│   │   └── i18n/         # Vertalingsbestanden
│   └── styles/           # CSS-bestanden
├── astro.config.mjs      # Astro configuratie
├── package.json
└── tsconfig.json
```

## 🖼️ Afbeeldingsoptimalisatie

Dit project gebruikt Astro's ingebouwde afbeeldingsoptimalisatie om afbeeldingen automatisch te comprimeren en te converteren naar moderne formaten zoals WebP.

### Hoe afbeeldingen toe te voegen:

1. **Plaats afbeeldingen in de juiste map**:

   - Plaats afbeeldingen in `src/assets/docs/[taal]/[sectie]/` in plaats van in de `public/` map.
   - Bijvoorbeeld: `src/assets/docs/nl/settings/website/xml-import/`

2. **Afbeeldingen gebruiken in .mdx bestanden** (aanbevolen methode):

   ```mdx
   ---
   title: Paginatitel
   description: Paginabeschrijving
   ---

   import { Image } from "astro:assets";
   import afbeelding from "@assets/docs/nl/settings/website/afbeelding.png";

   <figure class="screenshot-figure">
     <Image
       src={afbeelding}
       alt="Beschrijving van de afbeelding"
       width={800}
       height={450}
       format="webp"
       quality={80}
     />
     <figcaption>Bijschrift voor de afbeelding</figcaption>
   </figure>
   ```

3. **Afbeeldingen gebruiken in .md bestanden**:

   Voor standaard Markdown-bestanden (.md) kun je de volgende methoden gebruiken:

   a. **Relatieve paden naar afbeeldingen in de public map**:

   ```md
   ![Beschrijving van de afbeelding](/docs/nl/settings/website/afbeelding.png)
   ```

   b. **Met HTML in Markdown** (voor meer controle):

   ```md
   <figure class="screenshot-figure">
     <img src="/docs/nl/settings/website/afbeelding.png" alt="Beschrijving van de afbeelding" />
     <figcaption>Bijschrift voor de afbeelding</figcaption>
   </figure>
   ```

   **Let op**: Bij deze methode worden afbeeldingen niet automatisch geoptimaliseerd. Voor optimalisatie, gebruik .mdx bestanden met het Image-component.

4. **Voorbeeld van een volledige implementatie**:

   Bestandsstructuur:

   ```
   src/
   ├── assets/
   │   └── docs/
   │       └── nl/
   │           └── settings/
   │               └── website/
   │                   └── xml-import/
   │                       └── settings-menu-nav.png
   └── content/
       └── docs/
           └── nl/
               └── settings/
                   └── website/
                       └── xml-import.mdx
   ```

   In `src/content/docs/nl/settings/website/xml-import.mdx`:

   ```mdx
   ---
   title: XML-Import Configuratie
   description: Leer hoe je XML-feeds configureert
   ---

   import { Image } from "astro:assets";
   import settingsMenuNav from "@assets/docs/nl/settings/website/xml-import/settings-menu-nav.png";

   ## Navigatie naar XML-Import

   <figure class="screenshot-figure">
     <Image
       src={settingsMenuNav}
       alt="Navigatie naar XML-Import settings"
       width={800}
       height={450}
       format="webp"
       quality={80}
     />
     <figcaption>
       Het settings menu bereik je via het tandwiel-icoon rechtsboven
     </figcaption>
   </figure>
   ```

5. **Configuratie**:
   - De afbeeldingsoptimalisatie is geconfigureerd in `astro.config.mjs`.
   - Standaard worden afbeeldingen geconverteerd naar WebP en AVIF met een kwaliteit van 80%.

## 📝 Documentatie toevoegen

### Nieuwe pagina toevoegen:

1. Maak een nieuw `.md` of `.mdx` bestand in de juiste taalmap:

   ```
   src/content/docs/[taal]/[sectie]/pagina-naam.md
   ```

2. Voeg de frontmatter toe aan het begin van het bestand:

   ```md
   ---
   title: Titel van de pagina
   description: Korte beschrijving van de pagina
   ---

   # Inhoud van de pagina
   ```

3. Voeg de pagina toe aan de sidebar in `astro.config.mjs` indien nodig.

## 🤝 Bijdragen

1. Fork de repository
2. Maak een nieuwe branch: `git checkout -b feature/jouw-feature`
3. Commit je wijzigingen: `git commit -m 'Voeg nieuwe feature toe'`
4. Push naar de branch: `git push origin feature/jouw-feature`
5. Open een Pull Request

## 📚 Meer informatie

- [Starlight documentatie](https://starlight.astro.build/)
- [Astro documentatie](https://docs.astro.build)
- [Astro Discord server](https://astro.build/chat)
