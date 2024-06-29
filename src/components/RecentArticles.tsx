import Card, { type CardProps } from "./Card";

export default function RecentArticles() {
	return (
		<>
			<h2>Writing</h2>
			<ul>
				{recent_articles.map((props) => {
					return (
						<li>
							<Card {...props} url={`/writing/${props.slug}`} />
						</li>
					);
				})}
			</ul>
		</>
	);
}

const recent_articles: RecentArticle[] = [
	{
		description:
			"Over the past year, like many JavaScript developers, I have fallen in love with Bun. However, recent choices made by the Bun team have started to taint these feelings.",
		slug: "losing-faith-in-bun",
		title: "Losing Faith in Bun",
	},
	{
		description:
			"Lately over on tech twitter, there's been quite a bit of talk around Platform as a Service (PaaS) infrastructure providers like Vercel and Netlify. Today I'll show you how to implement one of their most killer features, on your own cloud infra: preview deploys.",
		slug: "preview-deploys",
		title: "Implementing Preview Deploys via Github Actions",
	},
	{
		description:
			"Over the past 9 months I've been designing, building, and iterating an error monitoring system for the suite of Third-Party JavaScript widgets I contribute to at my day job. I recently re-designed the client portion of this system and wanted to walk through the solution we ended up with.",
		slug: "third-party-errors",
		title: "Monitoring Errors in Third-Party JavaScript Applications",
	},
];

type RecentArticle = Omit<CardProps, "url"> & { slug: string };
