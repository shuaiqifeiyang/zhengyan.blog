import HomePage from "@/components/ui/pages/homepage";
import { get_files_metadata_in_a_folder } from "@/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  // console.log("generateStatticParams");
  const metadata = await get_files_metadata_in_a_folder("./md");
  // console.log([...new Set(metadata.map((data) => data.tags).flat())]);
  return [...new Set(metadata.map((data) => data.tags).flat())].map((t) => {
    return { slug: [t?.toLocaleLowerCase().replace(" ", "-")] };
  });
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const metadata = await get_files_metadata_in_a_folder("./md");
  const allTags = new Set(metadata.map((data) => data.tags!).flat());
  const url2Tags: { [key: string]: string } = {};
  for (let tag of allTags) {
    url2Tags[tag.toLocaleLowerCase().replace(" ", "-")] = tag;
  }

  const articleMetadata = metadata.filter((data) => {
    return data.tags?.includes(url2Tags[params.slug[0]]);
  });

  articleMetadata.sort((a, b) => {
    if (new Date(a.created_at!).getTime() < new Date(b.created_at!).getTime()) {
      return 1;
    } else if (
      new Date(a.created_at!).getTime() > new Date(b.created_at!).getTime()
    ) {
      return -1;
    }
    return 0;
  });

  // console.log(articleMetadata);
  return (
    <HomePage
      metadata={articleMetadata}
      highlightBadgeTitle={url2Tags[params.slug[0]]}
    />
  );
}
