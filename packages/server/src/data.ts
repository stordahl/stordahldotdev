import { Octokit } from "octokit";
import { Buffer } from "buffer";
import { marked } from "marked";
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import shell from "highlight.js/lib/languages/shell";
import xhtml from "highlight.js/lib/languages/xml";

export type ArticleMetaData = {
  title: string,
  date: Date,
  slug: string
}

export async function build_article_page_data(token: string, slug: string) {
  const octokit = new Octokit({
    auth: token
  });

  const { owner, repo, folderPath } = config;
  const filePath = `${folderPath}/${slug}.md`

try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path: filePath,
    });

    const { data } = response;
    
    //@ts-expect-error
    if (data && data.content && data.encoding === 'base64') {
      // Decode the file content from base64
      //@ts-expect-error
      const fileContent = Buffer.from(data.content, 'base64').toString('utf-8');
      return fileContent;
    } else {
      console.error('File content not found or in an unexpected format.');
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export function parse_frontmatter(markdown: string): ArticleMetaData {
  const frontmatter: Record<string, any> = {};
  const lines = markdown.trim().split('\n');

  if (lines[0].trim() === '---') {
    let i = 1;

    while (i < lines.length && lines[i].trim() !== '---') {
      const line = lines[i].trim();
      const [key, value] = line.split(':').map((s) => s.trim());

      if (key && value) {
        frontmatter[key] = value;
      }

      i++;
    }
  }

  return frontmatter as ArticleMetaData;
}

export function remove_frontmatter(markdown: string): string {
  const lines = markdown.trim().split('\n');

  if (lines[0].trim() === '---') {
    let i = 1;
    while (i < lines.length && lines[i].trim() !== '---') {
      i++;
    }
    if (i < lines.length) {
      lines.splice(0, i + 1);
    }
  }

  const contentWithoutFrontmatter = lines.join('\n');
  return contentWithoutFrontmatter;
}

export function parse_markdown(raw_markdown: string) {
  const tokens = marked.lexer(raw_markdown);
  tokens.forEach(function( token ) {
    if ( token.type === "code" ) {
        token.escaped = true;
    }
  });

  return marked.parser( tokens );
}

export function highlight_code(html: string) {
  // Then register the languages you need
  hljs.registerLanguage('typescript', typescript);
  hljs.registerLanguage('shell', shell);
  hljs.registerLanguage('html', xhtml);

  const codeBlockRegex = /<pre><code class="language-(.*?)">([\s\S]*?)<\/code><\/pre>/g;
  return html.replace(codeBlockRegex, (_, language, code) => {
    const highlightedCode = hljs.highlight(code, { language }).value
    return `<pre class="hljs"><code>${highlightedCode}</code></pre>`;
  });
}

export const config = {
  owner: "stordahl",
  repo: "stordahldotdev",
  folderPath: "packages/content",
};
