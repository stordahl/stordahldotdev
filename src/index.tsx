import { Hono } from "hono";
import { ssgParams } from "hono/ssg";
import { renderer } from "./renderer";
import Article from "./pages/article";
import Home from "./pages/home";
import NotFound from "./pages/404";
import Resume from "./pages/resume";
import Systems from "./pages/systems";
import Talks from "./pages/talks";
import Uses from "./pages/uses";
import Writing from "./pages/writing";
import { get_blog_articles, get_blog_article, get_systems_articles, get_systems_article } from "./data";

const app = new Hono();

app.get("*", renderer);

app.notFound(({ render }) => render(<NotFound />, { title: "Page Not Found" }));

// home
app.get("/", ({ render }) => render(<Home />, { title: "Home" }));

// resume
app.get("/resume", ({ render }) => render(<Resume />, { title: "Resume" }));

// systems
app.get("/systems", ({ render }) => render(<Systems />, { title: "Systems" }));

// systems/:id
app.get(
  "/systems/:id", 
  ssgParams(async () => {
    const data = await get_systems_articles();
    return data.map(({ path }) => ({ id: path }))
  }),
  async ({ render, req }) => {
    const article = await get_systems_article(req.param("id"));
    return render(<Article {...article} />, { title: article.title })
  }
);

// talks
app.get("/talks", ({ render }) => render(<Talks />, { title: "Talks" }));

// uses
app.get("/uses", ({ render }) => render(<Uses />, { title: "Uses" }));

// writing
app.get("/writing", ({ render }) => render(<Writing />, { title: "Writing" }));

// writing/:id
app.get(
  "/writing/:id", 
  ssgParams(async () => {
    const data = await get_blog_articles();
    return data.map(({ path }) => ({ id: path }))
  }),
  async ({ render, req }) => {
    const article = await get_blog_article(req.param("id"));
    return render(<Article {...article} />, { title: article.title })
  }
);

export default app;
