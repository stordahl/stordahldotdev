
export default function RecentArticles() {
  return (
    <>
      <h2>Writing</h2>
      <ul>
        {recent_articles.map(({ description, slug, title }) => {
          return (
            <li class="card">
              <a href={`/writing/${slug}`}>
                <h3>{title}</h3>
                <p>{description}</p>
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
};

const recent_articles: RecentArticle[] = [
  {
    description: "When ChatGPT was first released in 2022, I was very skeptical of the tool and the underlying LLM technology that was (and still is) buzzing around the tech world.",
    slug: "my-ai-workflow",
    title: "How I'm Using AI as a Software Engineer",
  },
  {
    description: "I started properly teaching myself to code in the winter of 2019 - I was living the #VanLife, hating my job and desperately needing a drastic change",
    slug: "on-opinions",
    title: "On Opinions",
  },
  {
    description: "Recently, I realized the workflow I had built for my personal blog, was causing me to not want to write.",
    slug: "exploring-hono",
    title: "Exploring Hono",
  },
];

type RecentArticle = {
  description: string;
  slug: string;
  title: string;
}
