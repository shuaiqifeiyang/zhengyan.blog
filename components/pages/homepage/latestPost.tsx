// prettier-ignore
"use client"

import CardLayout from "@/components/CardLayout";
import MyPagination from "@/components/MyPagination";
import PostSection from "@/components/PostSection";
import usePagination from "@/hooks/usePagination";
import { ArticleMetadata } from "@/type";

export default function LatestPost({
  metadata,
}: {
  metadata: ArticleMetadata[];
}) {
  const { currentPage, totalPages, goToNextPage, goToPreviousPage, goToPage } =
    usePagination({
      totalItems: metadata.length,
      itemsPerPage: 10,
    });
  return (
    <CardLayout
      title="☀️ Latest Posts"
      footer={
        <MyPagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
          goToPage={goToPage}
        />
      }
    >
      <PostArea
        metadata={metadata.slice((currentPage - 1) * 10, currentPage * 10)}
      />
    </CardLayout>
  );
}

export function PostArea({ metadata }: { metadata: ArticleMetadata[] }) {
  return (
    <div className="flex flex-col pt-5">
      {metadata.map((meta) => {
        return <PostSection key={meta.title} {...meta}></PostSection>;
      })}
    </div>
  );
}
