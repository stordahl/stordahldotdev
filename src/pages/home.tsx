import Hero from "../components/Hero";
import RecentArticles from "../components/RecentArticles";
import Projects from "../components/Projects";

export function Home() {
  return (
    <>
      <Hero />
      <RecentArticles />
      <Projects />
    </>
  );
};

export const HomeMeta = {
  title: "Home",
  description: "Jacob Stordahl's Homepage",
  cssFile: "home" 
};
