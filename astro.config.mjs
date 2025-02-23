// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://support.tesoro.estate',
	integrations: [
		starlight({
			title: 'Tesoro Docs',
			defaultLocale: 'root',
			locales: {
				// English docs in `src/content/docs/en/`
				root: {
				  label: 'English',
				  lang: 'en',
				},
				// Spanish docs in `src/content/docs/es/`
				es: {
				  label: 'Español',
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
					label: 'Subscribe',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Subscribe', slug: 'subscribe/example' },
					],
				},
				{
					label: 'Onboarding',
					autogenerate: { directory: 'onboarding' },
				},
			],
		}),
	],
});
