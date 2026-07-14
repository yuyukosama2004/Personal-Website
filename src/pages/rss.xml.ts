import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '@/config/site';
import { byPublishedDesc } from '@/utils/content';

export async function GET(context: { site: URL }) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(byPublishedDesc);
  return rss({
    title: `${site.name} · 开发笔记`,
    description: site.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: `<language>${site.language}</language>`,
  });
}
