// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeObsidian from 'starlight-theme-obsidian';

// https://astro.build/config
export default defineConfig({
	site: 'https://swag-source.github.io',
	integrations: [
		starlight({
			title: "Ramiro Seltzer",
			social: [
				{
					icon: 'github', label: 'GitHub', href: 'https://github.com/swag-source',
				}
			],
			customCss: [
				'./src/styles/custom.css',
			],
			sidebar: [
				{ label: 'Personal', autogenerate: { directory: 'personal' } },
				{ label: 'College', autogenerate: { directory: 'college' } },
				{ label: 'Vlogs', autogenerate: { directory: 'vlogs' } },
			],
			plugins: [
				starlightThemeObsidian(),
			]
		}),
	],
});
