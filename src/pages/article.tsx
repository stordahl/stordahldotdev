import { raw } from "hono/html";
import { type TArticle, highlight_code } from "../data";

export async function Article({ content, metadata: { date, title } }: TArticle) {
	const published = new Date(date).toLocaleDateString("en", {
		month: "long",
		day: "2-digit",
		year: "numeric",
	});

	return (
		<>
			<h1>{title}</h1>
			<p>Published {published}</p>
			<article>{raw(await highlight_code(content))}</article>
		</>
	);
}

export function createArticleMeta({ metadata: { title } }: TArticle) {
	return {
		title,
    cssFile: "article"
	};
}
