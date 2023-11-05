import { Layout, type SiteData } from "../utils";

export default function WritingPage(props: { site_data: SiteData; }) {
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
