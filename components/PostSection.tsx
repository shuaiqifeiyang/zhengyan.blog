import { ArticleMetadata } from "@/type";
import { TagLink, ArticleLink } from "./Links";
import Image from "next/image";

export default function PostSection({
  title = "A good way to adopt UI framework",
  created_at = "2024-3-9",
  category = "Frontend",
  tags = [],
  description = "",
  link = "/",
  image = "",
}: ArticleMetadata) {
  return (
    <div className="py-2 border-b border-dashed flex flex-col justify-between">
      <div className="flex justify-between">
        <div className="text-sm text-gray-500 font-semibold">{category}</div>
        <div className="flex text-sm">
          <div className="pr-2">🔖</div>
          {tags.map((tag, idx) => {
            return (
              <div key={idx}>
                <TagLink link={"tags/" + tag}>
                  {idx === 0 ? tag : ", " + tag}
                </TagLink>
                {/* {tag} */}
              </div>
            );
          })}
        </div>
      </div>
      <div className="font-bold text-gray-800 text-xl">
        <ArticleLink link={link}>
          <div>
            {title}{" "}
            <span className="text-xs font-normal text-gray-400">{`[${created_at}]`}</span>
          </div>
        </ArticleLink>
      </div>

      <div className="flex gap-x-3">
        {image && (
          <div className="h-32 py-1 w-52 shrink-0">
            <Image
              src={image}
              className="object-cover w-full h-full rounded-lg"
              alt=""
              height="100"
              width="100"
              priority={true}
            />
          </div>
        )}

        <div className="text-gray-500">
          {description}{" "}
          <ArticleLink link={link}>
            <span className="text-blue-500 text-sm">Read More</span>
          </ArticleLink>
        </div>
      </div>
      {/* <div className="text-sm">Published on {created_at}</div> */}
    </div>
  );
}
