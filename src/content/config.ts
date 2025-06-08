import { defineCollection } from 'astro:content';
import Video from '../components/mdx/Video.astro';

export const collections = {
  // Globale componenten beschikbaar in MDX bestanden
  mdx: defineCollection({
    components: {
      Video,
    },
  }),
};
