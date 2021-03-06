import { Layout, type SiteData } from "../utils";

export default function TalksPage(props: { site_data: SiteData; }) {
  return (
    <Layout {...props.site_data}>
      <h1>Talks</h1> 
      <ul>
        <li><a href="https://www.svelteradio.com/episodes/svelte-in-dynamic-e-commerce-widgets-with-jacob-stordahl">Svelte Radio, 2023</a></li>
        <li><a href="https://www.youtube.com/watch?v=U3rS-nOiN6k">Svelte Summit, 2023</a></li>
        <li><a href="https://www.compressed.fm/episode/99">Compressed FM, 2022</a></li>
        <li><a href="https://sveltesirens.dev/events/sveltekit-sanityio-a-match-made-in-heaven">Svelte Sirens, 2022</a></li>
      </ul>
    </Layout>
  );
};
