import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Nav() {
  return (
    <>
      <div
        id="Nav"
        className="h-14 shrink-0 shadow-sm hover:animate-a-shadow-md flex items-center px-10 gap-x-3 justify-between bg-slate-100"
      >
        <div className="text-lg font-bold">
          <Link href="/">zhengyan.blog 🖥️</Link>
        </div>
        <div className="flex gap-x-3 items-center">
          {/* <div>Posts</div> */}
          <Link href="/categories">
            <div>Categories</div>
          </Link>
          <Link href="/tags">
            <div>Tags</div>
          </Link>
          {/* <Link href="/about">
            <div>About</div>
          </Link> */}
          {/* <ThemeSwitcher /> */}
        </div>
      </div>
    </>
  );
}
