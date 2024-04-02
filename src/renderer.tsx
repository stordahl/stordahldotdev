import { html } from "hono/html";
import { jsxRenderer } from "hono/jsx-renderer";

export const renderer = jsxRenderer(
	({ children, cssFile, description, title, loadMermaid = false }) => {
		return (
			<html lang="en">
				<head>
          <meta charset="UTF-8"/>
          <meta name="viewport" content="width=device-width" />
          <meta name="description" content={description}/>
          <link href="/static/favicon-dark.png" rel="icon" />
					<link href="/static/css/style.css" rel="stylesheet" />
          {cssFile && <link href={`/static/css/${cssFile}.css`} rel="stylesheet"/>}
					<title>{title} | Jacob Stordahl</title>
				</head>
				<body>
					<header>
						<span>stordahl.dev</span>
						<nav class="print-hide">
						  <a href="/">home</a>
							<a href="/writing">writing</a>
							<a href="/talks">talks</a>
							<a href="/systems">systems</a>
						</nav>
					</header>
					<main>{children}</main>
					<footer>
						<div id="copyright">
							<span>© {new Date().getFullYear()} Jacob Stordahl</span>
						</div>
					</footer>
          {import.meta.env.PROD &&
            html`<script src="/static/js/counterscale-client.js" defer/>
            <script
              id="counterscale-script"
              src="https://counterscale.stordahldev.workers.dev/tracker.js"
              defer
          />`}
					{loadMermaid && html`
            <script type="module" async defer>
              import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
              mermaid.initialize({ startOnLoad: true });
            </script>
          `}
				</body>
			</html>
		);
	},
	{
		docType: true,
	},
);
