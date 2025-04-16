import Head from "next/head";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "about me",
  description: "...",
};

export default function Page() {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="pt-10 max-w-[50rem]">
        <h1 className="text-xl font-bold py-5">About Me</h1>
        <div>
          I am a full stack software engineer at Visa. I spend my spare time
          learning new technologies and writing blog posts. I hope this blog
          site is helpful to you.
        </div>
      </div>
    </div>
  );
}
