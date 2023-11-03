import { Hono } from "hono";
import { serveStatic } from 'hono/cloudflare-workers';
import { Octokit } from "octokit";
import { HomePage, WritingPage, ArticlePage } from "./components";
import { build_article_page_data, parse_frontmatter, remove_frontmatter } from "./data";

const app = new Hono();

app.get('/static/*', serveStatic({ root: './' }))

app.get('/', async (c) => {
  const props = {
    site_data: {
      title: 'Jacob Stordahl',
      description: 'Software Engineer working in e-commerce & open source',
      image: 'https://example.com/image.png',
    },
  }

  return c.html(<HomePage {...props} />);
});

app.get('/writing', async (c) => {
  const props = {
    site_data: {
      title: 'Writing | Jacob Stordahl',
      description: 'This is a description',
      image: 'https://example.com/image.png',
    },
  }

  return c.html(<WritingPage {...props} />);
});

app.get('/writing/:slug', async (c) => {

  const raw = await build_article_page_data(c.env.GH_TOKEN, c.req.param("slug"))
  const metadata = parse_frontmatter(raw);

  const props = {
    site_data: {
      title: metadata.title,
      description: 'This is a description',
      image: 'https://example.com/image.png',
    },
    metadata,
    raw_markdown: remove_frontmatter(raw),
  }

  return c.html(<ArticlePage {...props} />);
});


export default app
