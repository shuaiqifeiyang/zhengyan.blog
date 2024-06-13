import { ArticleMetadata, BadgeItem } from "./type";
import { promises as fs } from "fs";
import path from "path";
import { unified } from "unified";
import remarkStringfy from "remark-stringify";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";

export async function get_files_metadata_in_a_folder(curPath: string) {
  let articleMetadata: ArticleMetadata[] = [];

  const files = await fs.readdir(curPath, {
    withFileTypes: true,
  });
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

export async function get_all_tags() {
  let articleMetadata = await get_files_metadata_in_a_folder("./md");
  const tagCnt: { [key: string]: number } = {};

  articleMetadata.forEach((data) => {
    data.tags!.forEach((tag) => {
      if (tag in tagCnt) {
        tagCnt[tag]++;
      } else {
        tagCnt[tag] = 1;
      }
    });
  });

  const tags: BadgeItem[] = Object.keys(tagCnt)
    .map((tag) => {
      return {
        title: tag,
        count: tagCnt[tag],
        href: `/tags/${tag.toLocaleLowerCase().replace(" ", "-")}`,
      };
    })
    .sort((a, b) => {
      if (a.count < b.count) {
        return 1;
      } else if (a.count > b.count) {
        return -1;
      }
      return 0;
    });

  return tags;
}

export async function get_all_categories() {
  let articleMetadata = await get_files_metadata_in_a_folder("./md");

  const categoryCnt: { [key: string]: number } = {};

  articleMetadata.forEach((data) => {
    if (data.category) {
      if (!(data.category in categoryCnt)) categoryCnt[data.category] = 1;
      else categoryCnt[data.category]++;
    }
  });
  const categories: BadgeItem[] = Object.keys(categoryCnt)
    .map((category) => {
      return {
        title: category,
        count: categoryCnt[category],
        href: `/categories/${category.toLocaleLowerCase().replace(" ", "-")}`,
      };
    })
    .sort((a, b) => {
      if (a.count < b.count) {
        return 1;
      } else if (a.count > b.count) {
        return -1;
      }
      return 0;
    });
  return categories;
}
