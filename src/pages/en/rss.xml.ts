import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '@/config/site';
import { byPublishedDesc } from '@/utils/content';

export async function GET(context: { site: URL }) {
  const posts = (await getCollection('blogEn', ({ data }) => !data.draft)).sort(byPublishedDesc);
  return rss({
    title: `${site.name} · Engineering Notes`,
    description: site.locales.en.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/en/blog/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: '<language>en</language>',
  });
}
