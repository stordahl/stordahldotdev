import { raw } from "hono/html";
import { Layout, type SiteData } from "../utils";
import { parse_markdown, highlight_code, type ArticleMetaData } from "../data";

export default function ArticlePage(props: { site_data: SiteData; metadata: ArticleMetaData; raw_markdown: string; }) {
  const published = new Date(props.metadata.date).toLocaleDateString('en', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  });

  const parsed_markdown = parse_markdown(props.raw_markdown)
  const raw_html = highlight_code(parsed_markdown);

  return (
    <Layout {...props.site_data}>
      <h1>{props.site_data.title}</h1> 
      <p>Published {published}</p>
      {raw(raw_html)}
    </Layout>
  )
};

