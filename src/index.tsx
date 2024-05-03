import { Hono } from "hono";
import { ssgParams } from "hono/ssg";
import {
	get_blog_article,
	get_blog_articles,
	get_systems_article,
	get_systems_articles,
} from "./data";
import { NotFound, NotFoundMeta } from "./pages/404";
import { Article, createArticleMeta } from "./pages/article";
import { Home, HomeMeta } from "./pages/home";
import { Resume, ResumeMeta } from "./pages/resume";
import { Systems, SystemsMeta } from "./pages/systems";
import { Talks, TalksMeta } from "./pages/talks";
import { Uses, UsesMeta } from "./pages/uses";
import { Writing, WritingMeta } from "./pages/writing";
import { renderer } from "./renderer";

const app = new Hono();

app.get("*", renderer);

app.notFound(({ render }) => render(<NotFound />, NotFoundMeta));

// home
app.get("/", ({ render }) => render(<Home />, HomeMeta));

// resume
app.get("/resume", ({ render }) => render(<Resume />, ResumeMeta));

// systems
app.get("/systems", ({ render }) => render(<Systems />, SystemsMeta));

// systems/:id
app.get(
	"/systems/:id",
	ssgParams(async () => {
		const data = await get_systems_articles();
		return data.map(({ path }) => ({ id: path.substring(1) }));
	}),
	async ({ notFound, render, req }) => {
		const id = req.param("id");
		if (id.includes(":")) return;
		const article = await get_systems_article(id);
		if (!article) return notFound();
		const meta = createArticleMeta(article);
		return render(<Article {...article} />, { ...meta, loadMermaid: true });
	},
);

// talks
app.get("/talks", ({ render }) => render(<Talks />, TalksMeta));

// uses
app.get("/uses", ({ render }) => render(<Uses />, UsesMeta));

// writing
app.get("/writing", ({ render }) => render(<Writing />, WritingMeta));

// writing/:id
app.get(
	"/writing/:id",
	ssgParams(async () => {
		const data = await get_blog_articles();
		return data.map(({ path }) => ({ id: path.substring(1) }));
	}),
	async ({ notFound, render, req }) => {
		const id = req.param("id");
		if (id.includes(":")) return;
		const article = await get_blog_article(id);
		if (!article) return notFound();
		const meta = createArticleMeta(article);
		return render(<Article {...article} />, meta);
	},
);

export default app;
