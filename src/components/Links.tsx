import type { FC } from "hono/jsx";
import EmailIcon from "./icons/EmailIcon";
import GithubIcon from "./icons/GithubIcon";
import LinkedInIcon from "./icons/LinkedInIcon";
import TwitterIcon from "./icons/TwitterIcon";

export default function Links() {
	return (
		<div class="links-row">
			{links.map(({ iconComponent: Component, url }) => (
				<a href={url} target="_blank" rel="noreferrer">
					<Component />
				</a>
			))}
		</div>
	);
}

const links: Link[] = [
	{
		iconComponent: EmailIcon,
		iconName: "Email",
		url: "mailto:jacob@stordahl.dev",
	},
	{
		iconComponent: GithubIcon,
		iconName: "Github",
		url: "https://github.com/stordahl",
	},
	{
		iconComponent: LinkedInIcon,
		iconName: "LinkedIn",
		url: "https://www.linkedin.com/in/jacobstordahl",
	},
	{
		iconComponent: TwitterIcon,
		iconName: "Twitter",
		url: "https://twitter.com/stordahldotdev",
	},
];

type Link = {
	iconComponent: FC;
	iconName: "Github" | "Twitter" | "LinkedIn" | "Email";
	url: string;
};
