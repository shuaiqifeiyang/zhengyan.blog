import { CategoryLink, ArticleLink } from "@/components/Links";
import { get_files_metadata_in_a_folder } from "@/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  // console.log("generateStatticParams");
  const metadata = await get_files_metadata_in_a_folder("./md");
  // console.log([...new Set(metadata.map((data) => data.tags).flat())]);
  console.log("generateStaticParams");
  console.log(
    [...new Set(metadata.map((data) => data.category))].map((t) => {
      return { slug: [t?.toLocaleLowerCase().replace(" ", "-")] };
    })
  );
  return [...new Set(metadata.map((data) => data.category))].map((t) => {
    return { slug: [t?.toLocaleLowerCase().replace(" ", "-")] };
  });
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const articleMetadata = await get_files_metadata_in_a_folder("./md");
  const categoryArticleMetadata = articleMetadata.filter((data) => {
    return (
      data.category!.toLocaleLowerCase().replace(" ", "-") === params.slug[0]
    );
  });

  categoryArticleMetadata.sort((a, b) => {
    return (
      new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
    );
  });

  return (
    <div className="pt-10">
      <h1 className="text-xl font-bold py-5">{params.slug[0]}</h1>
      <ul>
        {categoryArticleMetadata.map((data) => (
          <li key={data.title} className="pb-1 flex justify-between">
            <ArticleLink link={data.link!}>
              {data.title}
              <span className="text-orange-500">{` [${data.created_at}]`}</span>
            </ArticleLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
