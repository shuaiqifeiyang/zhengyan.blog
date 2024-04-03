import { ArticleLink, TagLink } from "@/components/Links";
import TagSection from "@/components/TagSection";
import { get_files_metadata_in_a_folder } from "@/utils";

export default async function Page() {
  return (
    <div className="pt-10">
      <h1 className="text-xl font-bold py-5">Tags</h1>
      <TagSection />
    </div>
  );
}
