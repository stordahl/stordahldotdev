import { html } from "hono/html";

export interface SiteData {
  title: string
  description: string
  image: string
  children?: any
}

export const Layout = (props: SiteData) => html`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${props.title}</title>
  <meta name="viewport" content="width=device-width" />
  <meta name="description" content="${props.description}">
  <head prefix="og: http://ogp.me/ns#">
  <meta property="og:type" content="article">
  <!-- More elements slow down JSX, but not template literals. -->
  <meta property="og:title" content="${props.title}">
  <meta property="og:image" content="${props.image}">
  <link rel="stylesheet" href="/static/styles.css"/>
  <link rel="stylesheet" href="/static/highlight.css"/>
</head>
<body>
  <header>
	  <span>jacob stordahl</span>
	  <nav class="print-hide">
		  <a href="/">home</a>
		  <a href="/writing">writing</a>
	  </nav>
  </header>
  <main>${props.children}</main>
  <footer>
    <div id="copyright">
      <span>© ${new Date().getFullYear()} Jacob Stordahl | <a href="https://github.com/stordahl">github</a> | <a href="https://twitter.com/stordahldotdev">twitter</a> | <a href="/resume">resume</a></span>
    </div>
  </footer>
</body>
</html>
`;

