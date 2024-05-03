export default function Projects() {
	return (
		<>
			<h2>Projects</h2>
			<ul>
				{projects.map(({ description, tech, title, url }) => {
					return (
						<li class="card">
							<a href={url}>
								<h3>{title}</h3>
								<p>{description}</p>
								<div class="tags">
									{tech.map((str) => (
										<span>{str}</span>
									))}
								</div>
							</a>
						</li>
					);
				})}
			</ul>
		</>
	);
}

const projects: Project[] = [
	{
		description:
			"Collect historical performance data on your products via Lighthouse CI & Github Actions",
		url: "https://github.com/stordahl/datahog",
		tech: ["javascript"],
		title: "datahog",
	},
	{
		description: "A custom context menu for your Svelte Application",
		url: "https://github.com/stordahl/svelte-right-click",
		tech: ["svelte", "typescript"],
		title: "svelte-right-click",
	},
];

type Project = {
	description: string;
	url: string;
	tech: string[];
	title: string;
};
