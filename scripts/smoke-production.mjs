const origin = process.env.SITE_ORIGIN ?? 'https://www.execute42.top';

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const request = async (path, options = {}) => {
  const response = await fetch(new URL(path, origin), {
    redirect: 'manual',
    signal: AbortSignal.timeout(15_000),
    ...options,
  });
  console.log(`${response.status} ${path}`);
  return response;
};

const redirect = await fetch('http://www.execute42.top/', {
  redirect: 'manual',
  signal: AbortSignal.timeout(15_000),
});
assert(redirect.status === 301, `Expected HTTP 301, received ${redirect.status}`);
assert(
  redirect.headers.get('location') === 'https://www.execute42.top/',
  `Unexpected HTTPS redirect: ${redirect.headers.get('location')}`,
);

const routes = [
  '/',
  '/projects/',
  '/projects/ecc-init/',
  '/blog/',
  '/blog/building-evidence-backed-research-mcp/',
  '/search/',
  '/about/',
  '/rss.xml',
  '/sitemap-index.xml',
  '/robots.txt',
];

for (const path of routes) {
  const response = await request(path);
  assert(response.status === 200, `${path} returned ${response.status}`);
}

const home = await request('/');
const homeHtml = await home.text();
assert(homeHtml.includes('href="/go/github"'), 'Homepage is missing the tracked GitHub CTA');
assert(
  homeHtml.includes('<link rel="canonical" href="https://www.execute42.top/"'),
  'Homepage canonical URL is missing',
);

const requiredHeaders = [
  'content-security-policy',
  'strict-transport-security',
  'x-content-type-options',
  'x-frame-options',
  'referrer-policy',
  'permissions-policy',
];
for (const name of requiredHeaders) {
  assert(home.headers.has(name), `Homepage is missing ${name}`);
}

const faviconPath = homeHtml.match(/<link rel="icon" type="image\/webp" href="([^"]+)"/)?.[1];
assert(faviconPath, 'Optimized WebP favicon link is missing');
const favicon = await request(faviconPath);
assert(favicon.status === 200, `Favicon returned ${favicon.status}`);
assert(favicon.headers.get('content-type') === 'image/webp', 'Favicon is not served as WebP');
const faviconBytes = (await favicon.arrayBuffer()).byteLength;
assert(faviconBytes <= 5_000, `Favicon exceeds 5 KB: ${faviconBytes} bytes`);

const missing = await request('/public-smoke-missing-route');
assert(missing.status === 404, `Unknown route returned ${missing.status}`);
assert((await missing.text()).includes('这里没有你要找的页面'), 'Custom 404 content is missing');

for (const [path, expected] of [
  ['/go/github', 'https://github.com/yuyukosama2004'],
  ['/go/github/ecc-init', 'https://github.com/yuyukosama2004/ecc-init'],
]) {
  const response = await request(path, { headers: { referer: `${origin}/` } });
  assert(response.status === 302, `${path} returned ${response.status}`);
  assert(response.headers.get('location') === expected, `${path} redirected to an unexpected URL`);
}

console.log(`Public production smoke passed for ${origin}; favicon ${faviconBytes} bytes.`);
