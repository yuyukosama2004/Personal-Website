import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(20).max(180),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string().min(1)).min(1),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    project: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    name: z.string().min(1),
    tagline: z.string().min(1),
    summary: z.string().min(20),
    status: z.enum(['active', 'beta', 'experimental', 'archived']),
    category: z.enum(['product', 'research', 'engineering', 'application', 'lab']),
    featured: z.boolean().default(false),
    order: z.number().int().default(100),
    sourceVisibility: z.enum(['public', 'private']),
    githubUrl: z.url().nullable().default(null),
    demoUrl: z.url().nullable().default(null),
    tech: z.array(z.string()).min(1),
    flow: z.array(z.string().min(1)).min(3).max(5),
    relatedPosts: z.array(z.string()).default([]),
    accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  }),
});

export const collections = { blog, projects };
