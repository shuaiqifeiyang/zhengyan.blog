import Head from "next/head";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "about me",
  description: "...",
};

export default function Page() {
  return (
    <div className="pt-10">
      <h1 className="text-xl font-bold py-5">About Me</h1>
      <div>I am a software engineer.</div>
    </div>
  );
}
