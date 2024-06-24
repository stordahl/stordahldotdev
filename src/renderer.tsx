import { html } from "hono/html";
import { PropsWithChildren } from "hono/jsx";
import { jsxRenderer } from "hono/jsx-renderer";

export const renderer = jsxRenderer(
	({ children, cssFile, description, title, loadMermaid = false }: PropsWithChildren<CustomRendererProps>) => {
		return (
			<html lang="en">
				<head>
					<meta charset="UTF-8" />
					<meta name="viewport" content="width=device-width" />
					<meta name="description" content={description} />
					<link href="/static/favicon-dark.png" rel="icon" />
					<link href="/static/css/tokens.css" rel="stylesheet" preload />
					<link href="/static/css/base.css" rel="stylesheet" preload />
					<link href="/static/css/global.css" rel="stylesheet" preload />
					<link href="/static/css/utils.css" rel="stylesheet" preload />
					{cssFile && (
						<link href={`/static/css/${cssFile}.css`} rel="stylesheet" />
					)}
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
					<script src="/static/js/main.js" defer />
					{import.meta.env.PROD &&
						html`<script src="/static/js/counterscale-client.js" defer></script>
            <script
              id="counterscale-script"
              src="https://counterscale.stordahldev.workers.dev/tracker.js"
              defer
          ></script>`}
					{loadMermaid &&
						html`
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

type CustomRendererProps = {
  cssFile: string; 
  description: string; 
  title: string; 
  loadMermaid: boolean; 
}
