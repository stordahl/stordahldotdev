import { raw } from "hono/html";
import { Layout, type SiteData } from "./utils";
import { parse_markdown, highlight_code, type ArticleMetaData } from "./data";

export const HomePage = (props: { site_data: SiteData; }) => {
  return (
    <Layout {...props.site_data}>
      <h1 style="margin-top: 50px;">Hi, I'm Jacob.</h1>
      <p>I'm a Software Engineer, obsessed with building tools and infrastructure that enable front-end teams to be productive. Currently, I'm building radical ecommerce user experiences, and developer tools at <a class="out" target="_blank" rel="noreferrer" href="http://stylitics.com">Stylitics.</a></p>
      <p>Sometimes <a href="/writing">I write about the web</a>, and the stuff we use to build it.</p>
      <p>More rarely, I talk about it.</p>
      <p  style="margin-bottom: 50px;">Check out some of my open source work <a class="out" target="_blank" rel="noreferrer" href="https://github.com/stordahl">here</a>.
    You can reach me on <a class="out" target="_blank" rel="noreferrer" href="https://twitter.com/stordahldotdev">twitter</a> or shoot me an <a class="out" href="mailto:jacob@stordahl.dev">email</a>. <span class="strike"> I'm currently available for hire.</span>
    </p>
    </Layout>
  );
};

export const WritingPage = (props: { site_data: SiteData; }) => {
  return (
    <Layout {...props.site_data}>
      <h1>Writing</h1> 
      <ul>
        <li><a href="/writing/error-handling-decorators">Simplify Error Handling with TypeScript Decorators</a></li>
        <li><a href="/writing/google-cloud-function-vitest">Testing Google Cloud Functions with Vitest</a></li>
        <li><a href="/writing/frontend-neovim">Why frontend developers should pickup Neovim</a></li>
        <li><a href="/writing/zsh-alias">Turbo-charge Your Workflow with zsh Aliases</a></li>
        <li><a href="/writing/drawn-border-animation-conic-gradient-svelte">Creating a Drawn Border Animation with Conic Gradient &amp; Svelte</a></li>
        <li><a href="/writing/limiting-cognitive-overload">Limiting Cognitive Overload</a></li>
        <li><a href="/writing/simple-ios-dev-setup">A Simple iOS Development setup</a></li>
        <li><a href="/writing/fresh-work-machine">"Setting Up A Fresh Work Machine"</a></li>
        <li><a href="/writing/from-welder-to-software-engineer">From Welder to Software Engineer</a></li>
        <li><a href="/writing/master-to-main">Renaming your 'master' git branch to 'main'</a></li>
      </ul>
    </Layout>
  );
};

export const ArticlePage = (props: { site_data: SiteData; metadata: ArticleMetaData; raw_markdown: string; }) => {
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
