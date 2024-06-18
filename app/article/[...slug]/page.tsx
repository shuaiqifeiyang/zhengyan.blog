import { promises as fs } from "fs";
import { unified } from "unified";
import { Card } from "@/components/ui/card";
import rehypeStringify from "rehype-stringify";
import remarkStringfy from "remark-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";
import remarkFrontmatter from "remark-frontmatter";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import Toc from "@/components/Toc";
import { get_file_metadata, get_files_path_in_a_folder } from "@/utils";
import { ArticleMetadata } from "@/type";
import { CategoryLink, TagLink } from "@/components/Links";
// import { useEffect } from "react";

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const filePath = `md/${params.slug.join("/")}.md`;
  const x = await get_file_metadata(filePath);
  return { title: x.title };
}

export async function generateStaticParams() {
  let metadata = await get_files_path_in_a_folder("./md");

  metadata = metadata.map((data) => data.replace(/\.md$/g, ""));

  return metadata.map((data) => {
    const x = data.split("/");
    x.shift();
    return { slug: x };
  });
}
// /product/[id]	                { id: string }[]
// /products/[category]/[product]	{ category: string, product: string }[]
// /products/[...slug]	          { slug: string[] }[]

export default async function Page({ params }: { params: { slug: string[] } }) {
  const md = await fs.readFile(
    `${process.cwd()}/md/${params.slug.join("/")}.md`,
    "utf8"
  );
  const source = String(md);

  const mdSource = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkFrontmatter, { marker: "-", type: "yaml" })
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypePrettyCode, {
      theme: { light: "github-light", dark: "github-dark" },
      //theme: "github-dark",
    })
    .use(rehypeStringify)
    .process(source);

  let mdata: ArticleMetadata = {};
  const frontmatter = await unified()
    .use(remarkParse)
    .use(remarkStringfy)
    .use(remarkFrontmatter, { marker: "-", type: "json" })
    .use(function () {
      return function (tree: any) {
        //console.log("fontmatter Tree");
        //console.log(tree.children[0].value);
        mdata = JSON.parse(tree.children[0].value);
        // metadata.title = x.title;
        //console.log(x);
      };
    })
    .process(source);

  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_15rem] lg:grid-cols-[1fr_65ch_1fr] pb-52">
        <div className="pt-20 flex flex-col lg:col-start-2">
          <h1 className="text-[1.8rem] font-bold max-w-[35ch]">
            {mdata.title!}
          </h1>
          <div>{mdata.created_at}</div>
          <div className="flex">
            <div className="pr-2">🗂️</div>
            <CategoryLink category={mdata.category!}>
              {mdata.category}
            </CategoryLink>
          </div>
          <div className="flex">
            <div className="pr-2">🔖</div>
            {mdata.tags!.map((tag, idx) => {
              return (
                <div key={idx}>
                  {idx === 0 ? (
                    <TagLink link={"tags/" + tag}>{tag}</TagLink>
                  ) : (
                    <>
                      {", "}
                      <TagLink link={"tags/" + tag}>{tag}</TagLink>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <article
            className="mt-10 prose dark:prose-invert shiki prose-pre:bg-[var(--shiki-light-bg)] prose-pre:dark:bg-[var(--shiki-dark-bg)]"
            dangerouslySetInnerHTML={{ __html: String(mdSource) }}
          />
        </div>

        <div>
          <TOC markdown={source} />
        </div>
      </div>
    </div>
  );
}

function TOC({ markdown }: { markdown: string }) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, { marker: "-", type: "yaml" });

  processor.use(remarkToc, {
    heading: "Table of Contents",
    tight: true,
    maxDepth: 2,
  });

  const tree = processor.parse(markdown);

  const tocNode: any = tree.children.filter((node) => {
    console.log(node);
    return node.type === "heading" && node.depth === 2;
  });

  const headings = tocNode.map((node: any) => {
    return node.children[0].value;
  });

  return (
    <div className="sticky top-10 pl-4 max-w-[16rem]">
      <Toc headings={headings} />
    </div>
  );
}
