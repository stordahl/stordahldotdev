import { type Token, marked } from "marked";
import { getHighlighter } from "shiki";

export interface Article {
	path: string;
	metadata: ArticleMetaData;
}

export interface ArticleMetaData {
	title: string;
	date: string;
	status: "published" | "draft";
}

export interface TArticle extends Article {
	content: string;
}

export async function get_blog_articles() {
	const allArticles = import.meta.glob("/content/blog/*.md", { as: "raw" });
	const iterableArticles = Object.entries(allArticles);

	const articlePromises: Promise<Article>[] = iterableArticles.map(
		async ([path, resolver]): Promise<Article> => {
			const resolvedPost = await resolver();

			return {
				path: path.replace("/content/blog", "").replace(".md", ""),
				metadata: parse_frontmatter(resolvedPost),
			};
		},
	);

	const res = await Promise.all(articlePromises);
	return res.sort(
		(a, b) =>
			new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
	);
}

export async function get_blog_article(id: string) {
	const path = `/content/blog/${id}.md?raw`;
	const page = await import(path);
	const markdownString = page.default;
	const metadata = parse_frontmatter(markdownString);
	const rawContent = remove_frontmatter(markdownString);
	const parsedContent = parse_markdown(rawContent);

	return { content: parsedContent, metadata, path: id };
}

export async function get_systems_articles() {
	const allArticles = import.meta.glob("/content/systems/*.md", { as: "raw" });
	const iterableArticles = Object.entries(allArticles);

	const articlePromises: Promise<Article>[] = iterableArticles.map(
		async ([path, resolver]): Promise<Article> => {
			const resolvedPost = await resolver();

			return {
				path: path.replace("/content/systems", "").replace(".md", ""),
				metadata: parse_frontmatter(resolvedPost),
			};
		},
	);

	const res = await Promise.all(articlePromises);
	return res.sort(
		(a, b) =>
			new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
	);
}

export async function get_systems_article(id: string) {
	const path = `/content/systems/${id}.md?raw`;
	const page = await import(path);
	const markdownString = page.default;
	const metadata = parse_frontmatter(markdownString);
	const rawContent = remove_frontmatter(markdownString);
	const parsedContent = parse_markdown(rawContent);

	return { content: parsedContent, metadata, path: id };
}

export function parse_frontmatter(markdown: string): ArticleMetaData {
	const frontmatter: Record<string, unknown> = {};
	const lines = markdown.trim().split("\n");

	if (lines[0].trim() === "---") {
		let i = 1;

		while (i < lines.length && lines[i].trim() !== "---") {
			const line = lines[i].trim();
			const [key, value] = line.split(":").map((s) => s.trim());

			if (key && value) {
				frontmatter[key] = value;
			}

			i++;
		}
	}

	return frontmatter as unknown as ArticleMetaData;
}

export function remove_frontmatter(markdown: string): string {
	const lines = markdown.trim().split("\n");

	if (lines[0].trim() === "---") {
		let i = 1;
		while (i < lines.length && lines[i].trim() !== "---") {
			i++;
		}
		if (i < lines.length) {
			lines.splice(0, i + 1);
		}
	}

	const contentWithoutFrontmatter = lines.join("\n");
	return contentWithoutFrontmatter;
}

export function parse_description(markdown: string) {
	const content = remove_frontmatter(markdown);
	return content.slice(1, 154);
}

export function parse_markdown(raw_markdown: string) {
	function walkTokens(token: Token) {
		const { type } = token;

		// Modify paragraph blocks beginning and ending with $$.
		if (type === "code" && token.lang.includes("demo")) {
			token.lang = "demo";
			token.escaped = false;
		}
	}

	const renderer = new marked.Renderer();
	renderer.code = (code, language) => {
		if (code.match(/^sequenceDiagram/) || code.match(/^flowchart/)) {
			return `<pre class="mermaid">${code}</pre>`;
		}

		if (language?.includes("demo"))
			return render_demo(code, language as `demo ${string}`);

		return `<pre><code class="language-${language}">${code}</code></pre>`;
	};

	marked.use({ walkTokens, renderer });

	const tokens = marked.lexer(raw_markdown);
	for (const token of tokens) {
		if (token.type === "code") {
			token.escaped = true;
		}
	}

	return marked.parser(tokens);
}

export async function highlight_code(html: string) {
	const highlighter = await getHighlighter({
		themes: ["catppuccin-mocha", "github-dark", "vesper"],
		langs: [
			"javascript",
			"typescript",
			"html",
			"svelte",
			"go",
			"shell",
			"yaml",
		],
	});
	const codeBlockRegex =
		/<pre><code class="language-(.*?)">([\s\S]*?)<\/code><\/pre>/g;
	return html.replace(codeBlockRegex, (_, language, code) => {
		const highlightedCode = highlighter.codeToHtml(code, {
			lang: language,
			theme: "github-dark",
		});
		return highlightedCode;
	});
}

export function render_demo(code: string, language: `demo ${string}`): string {
	return `<section class="demo-canvas">
    <span class="demo-title">${language.replace("demo ", "")}</span>
    ${code}
  </section>`;
}
