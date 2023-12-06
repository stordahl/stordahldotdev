import { Hono } from "hono";
import { cache } from 'hono/cache';
import { serveStatic } from 'hono/cloudflare-workers';
import ArticlePage from "./pages/article";
import HomePage from "./pages/home";
import WritingPage from "./pages/writing";
import ResumePage from "./pages/resume";;
import TalksPage from "./pages/talks";
import { build_article_page_data, parse_description, parse_frontmatter, remove_frontmatter } from "./data";

const app = new Hono();

app.get('*', cache({ cacheName: 'stordahldotdev-server', cacheControl: 'max-age=3600' }));

app.get('/static/*', serveStatic({ root: './' }));
app.get('/favicon.png', serveStatic({ path: './favicon.png' }));
app.get('/favicon-dark.png', serveStatic({ path: './favicon-dark.png' }));

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

app.get('/talks', async (c) => {
  const props = {
    site_data: {
      title: 'Talks | Jacob Stordahl',
      description: 'A list of my talks and podcasts',
      image: 'https://example.com/image.png',
    },
  }

  return c.html(<TalksPage {...props} />);
});

app.get('/resume', async (c) => {
  const props = {
    site_data: {
      title: 'Resume | Jacob Stordahl',
      description: 'My resume',
      image: 'https://example.com/image.png',
    },
  }

  return c.html(<ResumePage {...props} />);
});

app.get('/writing', async (c) => {
  const props = {
    site_data: {
      title: 'Writing | Jacob Stordahl',
      description: 'A collection of writing on JavaScript and the web',
      image: 'https://example.com/image.png',
    },
  }

  return c.html(<WritingPage {...props} />);
});

app.get('/writing/:slug', async (c) => {
  const raw = await build_article_page_data(c.env?.GH_TOKEN as string, c.req.param("slug"))
  const metadata = parse_frontmatter(raw!);
  const description = parse_description(raw!);

  const props = {
    site_data: {
      title: metadata.title,
      description,
      image: 'https://example.com/image.png',
    },
    metadata,
    raw_markdown: remove_frontmatter(raw!),
  }

  return c.html(<ArticlePage {...props} />);
});

export default app
