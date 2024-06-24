import { Article } from "../data";

export function Writing({ articles }: {articles: Article[]}) {
	return (
		<>
			<h1>Writing</h1>
			<ul>
        {articles.map(({ metadata, path }) => {
          return metadata.status === "published" && <li><a href={path}>{metadata.title}</a></li>
        })}
			</ul>
		</>
	);
}

export const WritingMeta = {
	description:
		"A collection of my writing about Software Engineering and the Web",
	title: "Writing",
};
