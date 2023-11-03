import { Octokit } from "octokit";
import { Buffer } from "buffer";

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

  // Check if the frontmatter starts with '---'
  if (lines[0].trim() === '---') {
    let i = 1;

    // Find the end of the frontmatter (the second '---')
    while (i < lines.length && lines[i].trim() !== '---') {
      i++;
    }

    if (i < lines.length) {
      // Remove the frontmatter lines, including the first and second '---'
      lines.splice(0, i + 1);
    }
  }

  // Join the remaining lines to get the content without frontmatter
  const contentWithoutFrontmatter = lines.join('\n');
  return contentWithoutFrontmatter;
}

export const config = {
  owner: "stordahl",
  repo: "stordahldotdev",
  folderPath: "packages/content",
};
