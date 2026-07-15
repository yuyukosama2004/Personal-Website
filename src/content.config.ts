import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(20).max(180),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  tags: z.array(z.string().min(1)).min(1),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  project: z.string().optional(),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: blogSchema,
});

const blogEn = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog-en' }),
  schema: blogSchema,
});

const projectSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  summary: z.string().min(20),
  category: z.enum(['product', 'research', 'engineering', 'application', 'lab']),
  tier: z.enum(['featured', 'more', 'lab']),
  order: z.number().int().default(100),
  sourceVisibility: z.enum(['public', 'private']),
  maturity: z.enum(['alpha', 'beta', 'experimental']),
  activity: z.enum(['active', 'maintained', 'paused']),
  demoStatus: z.enum(['public', 'internal', 'unavailable']),
  evidence: z.enum(['verified', 'partial', 'planned']),
  license: z.string().nullable().default(null),
  githubUrl: z.url().nullable().default(null),
  demoUrl: z.url().nullable().default(null),
  tech: z.array(z.string()).min(1),
  evidenceStats: z
    .array(
      z.object({
        value: z.string().min(1),
        label: z.string().min(1),
        measuredAt: z.coerce.date(),
      }),
    )
    .max(2)
    .default([]),
  flow: z.array(z.string().min(1)).min(3).max(5),
  relatedPosts: z.array(z.string()).default([]),
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: projectSchema,
});

const projectsEn = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects-en' }),
  schema: projectSchema,
});

export const collections = { blog, blogEn, projects, projectsEn };
