import { CategoryLink } from "@/components/Links";
import { get_files_metadata_in_a_folder } from "@/utils";
import Link from "next/link";

export default async function Page() {
  const metadatas = await get_files_metadata_in_a_folder("./md");
  // console.log(metadatas);
  const categories = [
    ...new Set(metadatas.map((data) => data.category)),
  ] as string[];
  categories.sort((a, b) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    return 0;
  });
  console.log("categories");
  console.log(categories);

  return (
    <div className="pt-10">
      <h1 className="text-xl font-bold py-5">Categories</h1>
      <ul className="px-10">
        {categories.map((category) => {
          return (
            <li key={category} className="pb-1">
              <CategoryLink category={category}>🗂️ {category}</CategoryLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
