
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
    description: "I've come to believe that enums are an anti-pattern, and I'd like to explain why.",
    slug: "against-enums",
    title: "My Case Against TypeScript Enums",
  },
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
];

type RecentArticle = {
  description: string;
  slug: string;
  title: string;
}
