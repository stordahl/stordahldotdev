
export default function RecentArticles() {
  return (
    <div class="card writing">
      <h2>Writing</h2>
      <ul>
        {recent_articles.map(({ description, slug, title }) => {
          return (
            <li>
              <a href={`/writing/${slug}`}>
                <h3>{title}</h3>
                <p>{description}</p>
                <p class="read-more">Read More</p>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const recent_articles: RecentArticle[] = [
  {
    description: "Over the past year, my team has been rebuilding our internal core library from a set of first principles. We have had the opportunity to develop some really great patterns, and today I'd like to share one of them with you; errors as values in asynchronous TypeScript.",
    slug: "better-async-typescript",
    title: "Better Async TypeScript",
  },
  {
    description: "When I was working as a welder, one day I was standing in the shop with headphones on. Heads down and focused on my work, suddenly I heard a loud noise from behind me.",
    slug: "the-table-saw-is-a-witch",
    title: "The Table Saw is a Witch",
  },
  {
    description: "As we move past the zero interest rate era in the tech industry, I think it's important to share perspectives on the future of tech work, especially for those that are just getting into this industry.",
    slug: "the-executives-ic",
    title: "The Executive's Individual Contributor",
  },
];

type RecentArticle = {
  description: string;
  slug: string;
  title: string;
}
