import { get_files_metadata_in_a_folder } from "@/utils";
import { TagLink } from "./Links";

export default async function TagSection() {
  const metadata = await get_files_metadata_in_a_folder("./md");
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
  const tags = Object.keys(tagCnt)
    .map((tag) => {
      return { tag: tag, cnt: tagCnt[tag] };
    })
    .sort((a, b) => {
      if (a.cnt < b.cnt) {
        return 1;
      } else if (a.cnt > b.cnt) {
        return -1;
      }
      return 0;
    });

  return (
    <div className="flex flex-wrap gap-x-2">
      {tags.map((tag) => (
        <div key={tag.tag}>
          <TagLink link={"tags/" + tag.tag}>
            {tag.tag}
            <span className="text-xs align-top">{tag.cnt}</span>
          </TagLink>
        </div>
      ))}
    </div>
  );
}
