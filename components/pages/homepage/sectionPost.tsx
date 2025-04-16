import CardLayout from "@/components/CardLayout";
import { ArticleMetadata } from "@/type";
import React from "react";

export default function SectionPost({
  title,
  articles,
}: {
  title: React.ReactNode;
  articles: ArticleMetadata[];
}) {
  console.log(articles);
  
  return (
    <CardLayout title={<h1 className="flex items-center gap-x-2">{title}</h1>}>
      <ul className="flex flex-col items-start">
        {articles.map((article) => {
          return (
            <li
              key={article.title}
              className="text-sm text-ellipsis py-1 px-1 line-clamp-2 w-full border-b cursor-pointer hover:text-gray-500"
            >
              {article.title}
            </li>
          );
        })}
      </ul>
    </CardLayout>
  );
}
