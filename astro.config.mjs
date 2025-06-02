// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
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
      social: {
        discord: 'https://github.com/withastro/starlight',
        github: 'https://github.com/tesoro-crm',
        twitter: 'https://twitter.com/TesoroCRM',
        linkedin: 'https://linkedin.com/company/tesorocrm',
      },
      
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
					label: 'Abonneren',
					autogenerate: { directory: 'subscribe' },
				},
				{
					label: 'Onboarding',
					autogenerate: { directory: 'onboarding' },
				},
				{
					label: 'Instellingen',
					items: [
						{
							label: 'Algemeen',
							autogenerate: { directory: 'settings/general' },
						},
						{
							label: 'Abonnementen',
							autogenerate: { directory: 'settings/subscriptions' },
						},
						{
							label: 'Templates',
							autogenerate: { directory: 'settings/templates' },
						},
						{
							label: 'AI Property Context',
							link: '/docs/nl/settings/ai-property-context',
						},
						{
							label: 'Website',
							autogenerate: { directory: 'settings/website' },
						},
				{
					label: 'Interfaces',
					autogenerate: { directory: 'interfaces' },
				},
					],
				},
				{
					label: 'Release Notes',
					autogenerate: { directory: 'release-notes' },
				},
			],
		}),
	],
});
