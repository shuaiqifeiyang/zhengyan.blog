// // prettier-ignore
// "use client"
import { ArticleMetadata, BadgeItem } from "@/type";
import PostSection from "@/components/PostSection";
import { Separator } from "@/components/ui/separator";
import BadgeSection from "@/components/BadgeSection";
import { get_all_categories, get_all_tags } from "@/utils";

export default async function HomePage({
  metadata,
  highlightBadgeTitle,
}: {
  metadata: ArticleMetadata[];
  highlightBadgeTitle?: string;
}) {
  const categories = await get_all_categories();
  const tags = await get_all_tags();

  return (
    <div className="w-full h-full xl:w-4/5 2xl:max-w-[90rem]">
      <div className="grid grid-cols-1 min-h-full md:grid-cols-[1fr_350px] gap-x-5">
        <PostArea metadata={metadata} />
        <div className="hidden min-h-full md:flex md:gap-x-5">
          <Separator orientation="vertical" />
          <div className="mt-10">
            <div>
              <div className="text-lg font-bold mb-3">Categories</div>
              <BadgeSection
                badges={categories}
                highlightTitle={highlightBadgeTitle}
              />
            </div>
            <div className="mt-10 mb-3">
              <div className="text-lg font-bold mb-3">Tags</div>
              {/* <TagSection tags={tags} /> */}
              <BadgeSection
                badges={tags}
                highlightTitle={highlightBadgeTitle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostArea({ metadata }: { metadata: ArticleMetadata[] }) {
  return (
    <div className="flex flex-col gap-y-3 mt-10 lg:mx-10 xl:mx-16">
      {metadata.map((meta) => {
        return <PostSection key={meta.title} {...meta}></PostSection>;
      })}
    </div>
  );
}
