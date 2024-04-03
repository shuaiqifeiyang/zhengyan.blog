import { ArticleMetadata } from "./type";
import { promises as fs } from "fs";
import path from "path";
import { unified } from "unified";
import remarkStringfy from "remark-stringify";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";

export async function get_files_metadata_in_a_folder(curPath: string) {
  let articleMetadata: ArticleMetadata[] = [];

  const files = await fs.readdir(curPath, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(curPath, file.name);

    if (file.isDirectory()) {
      const t = await get_files_metadata_in_a_folder(fullPath);
      articleMetadata = articleMetadata.concat(t);
    } else if (file.name.endsWith(".md")) {
      const md = await fs.readFile(fullPath, "utf8");
      const source = String(md);

      await unified()
        .use(remarkParse)
        .use(remarkStringfy)
        .use(remarkFrontmatter, { marker: "-", type: "json" })
        .use(function () {
          return function (tree: any) {
            const x = JSON.parse(tree.children[0].value);
            if (x.draft === true) {
              return;
            }
            x.link = fullPath;
            articleMetadata.push(x);
          };
        })
        .process(source);
    }
  }
  return articleMetadata;
}

export async function get_files_path_in_a_folder(curPath: string) {
  let articlePath: string[] = [];
  const files = await fs.readdir(curPath, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(curPath, file.name);

    if (file.isDirectory()) {
      const t = await get_files_path_in_a_folder(fullPath);
      articlePath = articlePath.concat(t);
    } else if (file.name.endsWith(".md")) {
      const fileMetadata = await get_file_metadata(fullPath);
      if (fileMetadata.draft !== true) {
        articlePath.push(fullPath);
      }
    }
  }
  return articlePath;
}

export async function get_file_metadata(curPath: string) {
  let res: ArticleMetadata = {};
  const md = await fs.readFile(curPath, "utf8");
  const source = String(md);

  await unified()
    .use(remarkParse)
    .use(remarkStringfy)
    .use(remarkFrontmatter, { marker: "-", type: "json" })
    .use(function () {
      return function (tree: any) {
        const x = JSON.parse(tree.children[0].value);
        res = x;
      };
    })
    .process(source);

  return res;
}
