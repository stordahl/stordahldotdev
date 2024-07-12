import { html } from "hono/html";

export default function Scripts({ loadMermaid }: { loadMermaid: boolean }) {
	return (
		<>
			<script src="/static/js/main.js" defer />
			{import.meta.env.PROD &&
				html`
          <script src="/static/js/counterscale-client.js" defer></script>
          <script
              id="counterscale-script"
              src="https://counterscale.stordahldev.workers.dev/tracker.js"
              defer
          ></script>
      `}
			{loadMermaid &&
				html`
        <script type="module" async defer>
          import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
          mermaid.initialize({ startOnLoad: true });
        </script>
      `}
		</>
	);
}
