import About from "../components/About";
import Hero from "../components/Hero";
import RecentArticles from "../components/RecentArticles";
import Projects from "../components/Projects";
import Links from "../components/Links";
import Location from "../components/Location";

export default function Home() {
  return (
    <>
      <Hero />
      <Links />
      <Location />
      <Projects />
      <RecentArticles />
      {/*<About />
      <Projects />*/}
    </>
  );
};
