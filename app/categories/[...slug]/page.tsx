import { CategoryLink, ArticleLink } from "@/components/Links";
import HomePage from "@/components/pages/homepage";
import { PostArea } from "@/components/pages/homepage/latestPost";
import { get_files_metadata_in_a_folder } from "@/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  // console.log("generateStatticParams");
  const metadata = await get_files_metadata_in_a_folder("./md");
  return [...new Set(metadata.map((data) => data.category))].map((t) => {
    return { slug: [t?.toLocaleLowerCase().replace(" ", "-")] };
  });
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params;
  const articleMetadata = await get_files_metadata_in_a_folder("./md");
  let highlightBadgeTitle = "";
  const categoryArticleMetadata = articleMetadata.filter((data) => {
    if (
      data.category!.toLocaleLowerCase().replace(" ", "-") === params.slug[0]
    ) {
      highlightBadgeTitle = data.category!;
    }
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
    // <HomePage
    //   metadata={categoryArticleMetadata}
    //   highlightBadgeTitle={highlightBadgeTitle}
    // />
    <div className="pt-8 md:px-[100px] lg:px-[150px] xl:px-[200px] 2xl:px-[20%]">
      <h1 className="text-2xl font-semibold text-center">
        {highlightBadgeTitle}
      </h1>
      <PostArea metadata={categoryArticleMetadata} />
    </div>
  );
}
