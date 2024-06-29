import Card, { type CardProps } from "./Card";

export default function Projects() {
	return (
		<>
			<h2>Projects</h2>
			<ul>
				{projects.map((props) => {
					return (
						<li>
							<Card {...props} />
						</li>
					);
				})}
			</ul>
		</>
	);
}

const projects: CardProps[] = [
	{
		description:
			"Collect historical performance data on your products via Lighthouse CI & Github Actions",
		url: "https://github.com/stordahl/datahog",
		tags: ["javascript"],
		title: "datahog",
	},
	{
		description: "A custom context menu for your Svelte Application",
		url: "https://github.com/stordahl/svelte-right-click",
		tags: ["svelte", "typescript"],
		title: "svelte-right-click",
	},
];
