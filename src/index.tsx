import { Hono } from "hono";
import { renderer } from "./renderer";
import Home from "./pages/home";
import NotFound from "./pages/404";
import Resume from "./pages/resume";
import Systems from "./pages/systems";
import Talks from "./pages/talks";
import Uses from "./pages/uses";
import Writing from "./pages/writing";

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

// talks
app.get("/talks", ({ render }) => render(<Talks />, { title: "Talks" }));

// uses
app.get("/uses", ({ render }) => render(<Uses />, { title: "Uses" }));

// writing
app.get("/writing", ({ render }) => render(<Writing />, { title: "Writing" }));

// writing/:id

export default app;
