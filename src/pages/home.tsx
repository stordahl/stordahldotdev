import Hero from "../components/Hero";
import HireMe from "../components/HireMe";
import Projects from "../components/Projects";
import RecentArticles from "../components/RecentArticles";

export function Home() {
	return (
		<>
			<Hero />
      <HireMe />
			<RecentArticles />
			<Projects />
		</>
	);
}

export const HomeMeta = {
	title: "Home",
	description: "Jacob Stordahl's Homepage",
	cssFile: "home",
};
