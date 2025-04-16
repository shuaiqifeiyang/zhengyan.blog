// // prettier-ignore
// "use client"
import { ArticleMetadata, BadgeItem } from "@/type";
import PostSection from "@/components/PostSection";
import { Separator } from "@/components/ui/separator";
import BadgeSection from "@/components/BadgeSection";
import { get_all_categories, get_all_tags } from "@/utils";
import CardLayout from "@/components/CardLayout";
import { SiGithub, SiLinkedin, SiReact } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { AiFillProfile, AiOutlineUser } from "react-icons/ai";
import { BsBookmarkCheck, BsServer, BsTag } from "react-icons/bs";
import usePagination from "@/hooks/usePagination";
import MyPagination from "@/components/MyPagination";
import LatestPost from "./latestPost";
import SectionPost from "./sectionPost";
import Link from "next/link";

export default async function HomePage({
  metadata,
  highlightBadgeTitle,
  pageIdx = 1,
  pageCnt = 10,
}: {
  metadata: ArticleMetadata[];
  highlightBadgeTitle?: string;
  pageIdx?: number;
  pageCnt?: number;
}) {
  const categories = await get_all_categories();
  const tags = await get_all_tags();

  return (
    // <div className="w-full h-full xl:w-4/5 2xl:max-w-[90rem]">
    <div className="grid grid-rows-[repeat(15,100px)] gap-4 pt-10 md:mt-10 md:grid-cols-3 md:grid-rows-[repeat(5,100px)] lg:grid-cols-4 lg:grid-rows-[repeat(5,100px)]">
      <div className="row-span-5 md:col-span-2">
        <LatestPost metadata={metadata} />
      </div>
      <div className="row-span-2 lg:row-start-1 lg:col-start-4">
        <CardLayout title="👨🏻‍💻 About Me">
          <div className="grid grid-cols-2">
            <a
              href="https://www.linkedin.com/in/zhengyan-l-38583b196/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="link" className="flex justify-start h-7">
                <SiLinkedin />
                Linkedin
              </Button>
            </a>
            <a
              href="https://github.com/shuaiqifeiyang"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="link" className="flex justify-start h-7">
                <SiGithub />
                Github
              </Button>
            </a>
            <Link href="/about">
              <Button variant="link" className="flex justify-start h-7">
                <AiFillProfile /> Homepage
              </Button>
            </Link>
          </div>
        </CardLayout>
      </div>
      <div className="row-span-3 md:col-start-3 md:row-start-3 lg:row-span-5 lg:row-start-1 lg:col-start-3">
        <CardLayout
          title={
            <h1 className="flex items-center gap-x-2">
              <BsTag /> Tags
            </h1>
          }
        >
          <BadgeSection badges={tags} />
        </CardLayout>
      </div>

      {/* <div className="row-span-3 md:col-span-2 lg:col-span-1 lg:row-start-3 lg:col-start-3">
        <SectionPost
          title={
            <>
              <SiReact /> Frontend
            </>
          }
          articles={metadata.filter((data) => data.category === "Frontend")}
        />
      </div> */}
      <div className="row-span-3 md:row-start-6 md:col-start-3 lg:row-start-3 lg:col-start-4">
        <CardLayout
          title={
            <h1 className="flex items-center gap-x-2">
              <BsBookmarkCheck /> Categories
            </h1>
          }
        >
          <BadgeSection badges={categories} />
        </CardLayout>
      </div>
      {/* </div> */}
      {/* <div className="row-span-3 md:col-span-2 lg:col-span-1 lg:row-start-6 lg:col-start-1">
        <SectionPost
          title={
            <>
              <BsServer/> Backend
            </>
          }
          articles={metadata.filter((data) => data.category === "Backend")}
        />
      </div> */}
      {/* <div className="row-span-3 md:col-span-2 lg:col-span-1 lg:row-start-6 lg:col-start-2">
        <SectionPost
          title={
            <>
              <BsServer/> AI
            </>
          }
          articles={metadata.filter((data) => data.category === "AI")}
        />
      </div> */}
    </div>
  );
}
