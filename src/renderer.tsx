import { html } from "hono/html";
import { jsxRenderer } from "hono/jsx-renderer";

export const renderer = jsxRenderer(
	({ children, cssFile, description, title }) => {
		return (
			<html lang="en">
				<head>
          <meta charset="UTF-8"/>
          <meta name="viewport" content="width=device-width" />
          <meta name="description" content={description}/>
          <link href="/static/favicon-dark.png" rel="icon" />
					<link href="/static/css/style.css" rel="stylesheet" />
          {cssFile && <link href={`/static/css/${cssFile}.css`} rel="stylesheet"/>}
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossorigin=""
					/>
          <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>
					<title>{title} | Jacob Stordahl</title>
				</head>
				<body>
					<header>
            <div>
						  <span>stordahl.dev</span>
						  <nav class="print-hide">
							  <a href="/">home</a>
							  <a href="/writing">writing</a>
							  <a href="/talks">talks</a>
							  <a href="/systems">systems</a>
						  </nav>
            </div>
					</header>
					<main>{children}</main>
					<footer>
						<div id="copyright">
							<span>© {new Date().getFullYear()} Jacob Stordahl</span>
						</div>
					</footer>
					{html`
            <script type="module" defer>
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
