import { get_files_metadata_in_a_folder } from "@/utils";
import { TagLink } from "./Links";

export default async function TagSection({
  tags,
}: {
  tags: { tag: string; cnt: number }[];
}) {
  const colors = ["bg-slate-100 dark:bg-slate-700"];

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-2">
      {tags.map((tag) => (
        <div
          key={tag.tag}
          className={`rounded-sm px-2 py-1 ${
            colors[Math.floor(Math.random() * colors.length)]
          }`}
        >
          <TagLink link={"tags/" + tag.tag}>
            {tag.tag}
            <span className="text-xs align-top">{tag.cnt}</span>
          </TagLink>
        </div>
      ))}
    </div>
  );
}
