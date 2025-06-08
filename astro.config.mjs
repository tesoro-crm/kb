// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'fs';

// Read package.json for version info
const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@images': fileURLToPath(new URL('./src/assets/images', import.meta.url))
      }
    }
  },
  site: 'https://support.tesoro.estate',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        // Opties voor afbeeldingsoptimalisatie
        formats: ['webp', 'avif', 'png', 'jpeg'],
        quality: 80
      }
    },
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co'
      }
    ]
  },
  integrations: [
    react(),
    sitemap({
      // Customize sitemap URLs
      customPages: ['https://support.tesoro.estate'],
      // Change frequency for different sections
      changefreq: 'weekly',
      // Priority for different sections
      priority: 0.8,
      // Last modification time
      lastmod: new Date(),
    }),
    starlight({
      title: 'Tesoro Docs',
      customCss: [
        './src/styles/custom.css',
      ],
      defaultLocale: 'nl',
      locales: {
        en: {
          label: 'English',
          lang: 'en',
        },
        es: {
          label: 'Español',
          lang: 'es',
        },
        nl: {
          label: 'Nederlands',
          lang: 'nl',
        },
      },
      social: [
        { icon: 'discord', label: 'Discord', href: 'https://github.com/withastro/starlight' },
        { icon: 'github', label: 'GitHub', href: 'https://github.com/tesoro-crm' },
        { icon: 'twitter', label: 'Twitter', href: 'https://twitter.com/TesoroCRM' },
        { icon: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/company/tesorocrm' },
      ],
      
      // SEO Configuration
      head: [
        // Favicon
        { tag: 'link', attrs: { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' } },
        // Canonical URL
        { tag: 'link', attrs: { rel: 'canonical', href: 'https://support.tesoro.estate' } },
        // Open Graph / Facebook
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
        { tag: 'meta', attrs: { property: 'og:site_name', content: 'Tesoro CRM Documentation' } },
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://support.tesoro.estate/og-image.jpg' } },
        // Twitter
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://support.tesoro.estate/twitter-card.jpg' } },
      ],
      logo: {
        light: './src/assets/tesoro-logo-light.svg',
        dark: './src/assets/tesoro-logo-dark.svg',
        alt: 'Tesoro CRM Logo',
				replacesTitle: true,
			},
			sidebar: [
        {
          label: 'Documentatie',
          items: [
            { label: 'Home', link: '/' },
            {
              label: 'Functies',
              items: [
                { label: 'Overzicht', link: '/features/' },
                { label: 'Filters', link: '/features/filters' }
              ]
            },
            {
              label: 'Interfaces',
              items: [
                { 
                  label: 'Deal',
                  items: [
                    { label: 'Koper Deal', link: '/interfaces/deal/buyer-deal' },
                    { label: 'Eigenaar Deal', link: '/interfaces/deal/owner-deal' }
                  ]
                }
              ]
            },
            {
              label: 'Onboarding',
              items: [
                { label: 'Overzicht', link: '/onboarding/' },
                { label: 'Eerste Stappen', link: '/onboarding/first-steps' },
                { label: 'Account Aanmaken', link: '/onboarding/create-account' },
                { label: 'Basisinstellingen', link: '/onboarding/basic-settings' },
                { label: 'Bedrijfsinstellingen Toevoegen', link: '/onboarding/add-company-settings' }
              ]
            },
            {
              label: 'Abonneren',
              items: [
                { label: 'Overzicht', link: '/subscribe/' },
                { label: 'Voorbereiding', link: '/subscribe/voorbereiding-op-tesoro-crm' },
                { label: 'Eerste Gebruiker', link: '/subscribe/register-first-user' },
                { label: 'Collega\'s Toevoegen', link: '/subscribe/add-colleagues' },
                { label: 'Abonneren', link: '/subscribe/subscribe' }
              ]
            },
            {
              label: 'Instellingen',
              items: [
                { 
                  label: 'Algemeen',
                  items: [
                    { label: 'Overzicht', link: '/settings/general/' },
                    { label: 'Bedrijfsinstellingen', link: '/settings/general/company-settings' },
                    { label: 'Persoonlijke Instellingen', link: '/settings/general/personal-settings' },
                    { label: 'Gebruikers', link: '/settings/general/users' }
                  ]
                },
                {
                  label: 'Abonnementen',
                  items: [
                    { label: 'Overzicht', link: '/settings/subscriptions/' },
                    { label: 'Abonnementen', link: '/settings/subscriptions/plans' }
                  ]
                },
                {
                  label: 'Templates',
                  items: [
                    { label: 'Overzicht', link: '/settings/templates/' },
                    { label: 'E-mails', link: '/settings/templates/emails' },
                    { label: 'PDF\'s', link: '/settings/templates/pdfs' },
                    { label: 'Prompts', link: '/settings/templates/prompts' }
                  ]
                },
                {
                  label: 'Website',
                  items: [
                    { label: 'Overzicht', link: '/settings/website/' },
                    { label: 'Configuratie', link: '/settings/website/config' },
                    { label: 'Importeren', link: '/settings/website/import' },
                    { label: 'MLS', link: '/settings/website/mls' }
                  ]
                }
              ]
            },
            {
              label: 'Release Notes',
              items: [
                { label: 'Overzicht', link: '/release-notes/' },
                { label: 'v1.1.0', link: '/release-notes/v1-1-0' }
              ]
            }
          ]
        }
			],
		}),
	],
});
