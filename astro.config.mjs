// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://support.tesoro.estate',
	integrations: [
		starlight({
			title: 'Tesoro Docs',
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
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
