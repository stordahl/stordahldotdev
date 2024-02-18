
export default function Projects() {
  return (
    <div class="card projects">
      <h2>Projects</h2>
      <ul>
        {projects.map(({ description, tech, title, url }) => {
          return (
            <li>
              <a href={url}>
                <h3>{title}</h3>
                <p>{description}</p>
                <div class="tags">
                  {tech.map((str) => <span>{str}</span>)}
                </div>
              </a>
            </li>
          );
        })}
    </ul>
    </div>
  );
};

const projects: Project[] = [
  {
    description: "A tiny interactive CLI for managing Homebrew, built with Gum",
    url: "https://github.com/stordahl/keg",
    tech: ["bash"],
    title: "keg",
  },
  {
    description: "Collect historical performance data on your products via Lighthouse CI & Github Actions",
    url: "https://github.com/stordahl/datahog",
    tech: ["javascript"],
    title: "datahog",
  },
  {
    description: "A custom context menu for your Svelte Application",
    url: "https://github.com/stordahl/svelte-right-click",
    tech: ["svelte", "typescript"],
    title: "svelte-right-click",
  },
];

type Project = {
  description: string;
  url: string;
  tech: string[];
  title: string;
}
