import Link from "next/link";
import PostSection from "@/components/PostSection";
import { get_files_metadata_in_a_folder } from "@/utils";
import { TagLink } from "@/components/Links";
import TagSection from "@/components/TagSection";

export default async function Home() {
  // const tags = ["React", "Javascript", "Python"];
  // const x = await getAllArticleMetadata();
  const metadata = await get_files_metadata_in_a_folder("./md");
  metadata.sort((a, b) => {
    if (new Date(a.created_at!).getTime() < new Date(b.created_at!).getTime()) {
      return 1;
    }
    return -1;
  });
  const tagCnt: { [key: string]: number } = {};
  metadata.forEach((data) => {
    data.tags!.forEach((tag) => {
      if (tag in tagCnt) {
        tagCnt[tag]++;
      } else {
        tagCnt[tag] = 1;
      }
    });
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_260px] gap-x-5 py-10">
      <div className="flex flex-col gap-y-3">
        {metadata.map((meta) => {
          return <PostSection key={meta.title} {...meta}></PostSection>;
        })}
      </div>
      <div className="bg-slate-300 shadow hidden md:block"></div>
      <div className="hidden md:block">
        <div className="text-2xl font-bold">Tags</div>
        <TagSection />
      </div>
    </div>
  );
}
