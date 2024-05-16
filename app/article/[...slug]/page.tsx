import { promises as fs } from "fs";
import { unified } from "unified";
import rehypeStringify from "rehype-stringify";
import remarkStringfy from "remark-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkMath from "remark-math";
import remarkSlug from "remark-slug";
import rehypeToc from "@jsdevtools/rehype-toc";
import remarkToc from "remark-toc";
import Markdown from "react-markdown";
import MarkNav from "markdown-navbar";
import remarkFrontmatter from "remark-frontmatter";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import Toc from "@/components/Toc";
import { Metadata } from "next";
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
  console.log("generateStatticParams");
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
    .use(rehypePrettyCode, { theme: "github-light" })
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
      <div className="w-full flex flex-col items-center">
        <div className="pt-10 flex flex-col">
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
            className="prose pt-5 pb-32"
            dangerouslySetInnerHTML={{ __html: String(mdSource) }}
          />
        </div>

        {/* <div>
        <TOC markdown={source} />
      </div> */}
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
  // console.log(tree);
  // console.log("hello");
  // console.log(tree.children[0].children);
  //console.log(tree);
  const tocNode: any = tree.children.filter((node) => node.type === "heading");
  // console.log(tocNode[0].children[0].value);
  //console.log(tocNode);
  // tocNode.forEach((x) => {
  //console.log(x.children[]);
  // });

  const headings = tocNode.map((node: any) => {
    return node.children[0].value;
  });

  return (
    <div className="sticky top-0">
      <Toc headings={headings} />
    </div>
  );

  // const tocItems = tocNode.items.map((item) => {
  //   const title = hastToString(toHAST(item));
  //   const slug = item.slug;
  //   return { title, slug };
  // });
}
