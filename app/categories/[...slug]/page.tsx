import { CategoryLink, ArticleLink } from "@/components/Links";
import HomePage from "@/components/ui/pages/homepage";
import { get_files_metadata_in_a_folder } from "@/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  // console.log("generateStatticParams");
  const metadata = await get_files_metadata_in_a_folder("./md");
  return [...new Set(metadata.map((data) => data.category))].map((t) => {
    return { slug: [t?.toLocaleLowerCase().replace(" ", "-")] };
  });
}

export default async function Page({ params }: { params: { slug: string[] } }) {
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
    <HomePage
      metadata={categoryArticleMetadata}
      highlightBadgeTitle={highlightBadgeTitle}
    />
  );
}
