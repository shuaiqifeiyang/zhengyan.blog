import type { Metadata } from "next";
import {
  Inter,
  Kanit,
  Geo,
  Geologica,
  Merriweather,
  Roboto as FontSans,
  Nunito_Sans,
  Noto_Sans,
} from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import Nav from "@/components/Nav";
import { ThemeProvider } from "@/components/ThemeProvider";
import {
  get_files_path_in_a_folder,
  get_files_metadata_in_a_folder,
  get_all_categories,
  get_all_tags,
} from "@/utils";
import { Analytics } from "@vercel/analytics/react";

// const inter = Inter({ subsets: ["latin"] });
// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
//   weight: "400",
// });

export const metadata: Metadata = {
  title: "zhengyan.dev",
  description: "Zhengyan's tech blog",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // initial processing

  const path = await get_files_path_in_a_folder("./md");
  const categories = await get_all_categories();
  const tags = await get_all_tags();
  // const metadata = await get_files_metadata_in_a_folder("./md");
  console.log(path);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased"
          // fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="h-screen flex flex-col light:bg-slate-50">
            <Nav categories={categories} tags={tags} />
            <div className="w-full flex justify-center px-5 flex-grow overflow-y-auto">
              {children}
              {/* <div className="text-center border-t border-dashed text-sm">
                  Copyright ©️ 2024 zhengyan.blog
                </div> */}
            </div>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
