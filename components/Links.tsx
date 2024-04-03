import Link from "next/link";
import { ReactNode } from "react";

export function TagLink({
  link,
  children,
}: {
  link: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={"/" + link.toLocaleLowerCase().replace(" ", "-")}
      className="hover:text-blue-500"
    >
      {children}
    </Link>
  );
}

export function CategoryLink({
  category,
  children,
}: {
  category: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={"/categories/" + category.toLocaleLowerCase().replace(" ", "-")}
    >
      {children}
    </Link>
  );
}

export function ArticleLink({
  link,
  children,
}: {
  link: string;
  children: ReactNode;
}) {
  if (link.startsWith("md/")) {
    link = link.replace(/^md\//, "article/");
  }
  if (link.endsWith(".md")) {
    link = link.replace(/.md$/, "");
  }
  return <Link href={"/" + link}>{children}</Link>;
}
