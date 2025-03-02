// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
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
		starlight({
			title: 'Tesoro Docs',
			customCss: [
				// Relative path to your custom CSS file
				'./src/styles/custom.css',
			  ],
			defaultLocale: 'nl',
			locales: {
				// English docs in `src/content/docs/en/`
				en: {
				  label: 'English',
				  lang: 'en',
				},
				// Spanish docs in `src/content/docs/es/`
				es: {
				  label: 'Español',
				  lang: 'es',
				},
				// Dutch docs in `src/content/docs/nl/`
				nl: {
				  label: 'Nederlands',
				  lang: 'nl',
				},
			},
			social: {
				discord: 'https://github.com/withastro/starlight',
			},
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
							label: 'Website',
							autogenerate: { directory: 'settings/website' },
						},
					],
				},
			],
		}),
	],
});
