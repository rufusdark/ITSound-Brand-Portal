import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.string(),
    category: z.enum(['Release', 'Eventi', 'Guide', 'News']),
  }),
});

const artistCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/artist' }),
  schema: z.object({
    name: z.string(),
    genre: z.string(),
    role: z.string(),
    spotify: z.string().optional(),
    soundcloud: z.string().optional(),
    instagram: z.string().optional(),
    releases: z.array(z.string()),
    image: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  artist: artistCollection,
};
