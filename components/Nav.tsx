//prettier-ignore
"use client"

import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import BadgeSection from "./BadgeSection";
import { get_all_categories, get_all_tags } from "@/utils";
import { BadgeItem } from "@/type";

export default async function Nav({
  tags,
  categories,
}: {
  tags: BadgeItem[];
  categories: BadgeItem[];
}) {
  return (
    <>
      <div
        id="Nav"
        className="h-14 shrink-0 shadow-sm hover:animate-a-shadow-md flex items-center px-5 lg:px-10 gap-x-3 justify-between light:bg-slate-100"
      >
        <div className="text-lg font-bold">
          <Link href="/">zhengyan.blog 🖥️</Link>
        </div>
        <div className="flex gap-x-3 items-center">
          <NavigationMenu className="md:hidden">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-1">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent className="px-5 py-3 min-w-[15rem]">
                  <BadgeSection badges={categories} />
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-1">
                  Tags
                </NavigationMenuTrigger>
                <NavigationMenuContent className="px-5 py-3 min-w-[15rem]">
                  <BadgeSection badges={tags} />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <ThemeSwitcher />
        </div>
      </div>
    </>
  );
}
