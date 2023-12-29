import { Layout, type SiteData } from "../utils";
import About from "../components/About";
import Hero from "../components/Hero";
import RecentArticles from "../components/RecentArticles";
import Projects from "../components/Projects";

export default function HomePage(props: { site_data: SiteData; }) {
  return (
    <Layout {...props.site_data}>
      <Hero />
      <About />
      <RecentArticles />
      <Projects />
    </Layout>
  );
};

