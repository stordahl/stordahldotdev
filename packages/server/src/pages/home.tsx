import { Layout, type SiteData } from "../utils";

export default function HomePage(props: { site_data: SiteData; }) {
  return (
    <Layout {...props.site_data}>
      <h1 style="margin-top: 50px;">Hi, I'm Jacob.</h1>
      <p>I'm a Software Engineer, obsessed with building tools and infrastructure that enable front-end teams to be productive. Currently, I'm building radical ecommerce user experiences, and developer tools at <a class="out" target="_blank" rel="noreferrer" href="http://stylitics.com">Stylitics.</a></p>
      <p>Sometimes <a href="/writing">I write about the web</a>, and the stuff we use to build it.</p>
      <p>More rarely, <a href="/talks">I talk about it</a>.</p>
      <p  style="margin-bottom: 50px;">Check out some of my open source work <a class="out" target="_blank" rel="noreferrer" href="https://github.com/stordahl">here</a>.
    You can reach me on <a class="out" target="_blank" rel="noreferrer" href="https://twitter.com/stordahldotdev">twitter</a> or shoot me an <a class="out" href="mailto:jacob@stordahl.dev">email</a>. <span class="strike"> I'm currently available for hire.</span>
    </p>
    </Layout>
  );
};
