import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { ThemeProvider } from "@/components/ThemeProvider";
import {
  get_files_path_in_a_folder,
  get_files_metadata_in_a_folder,
} from "@/utils";

// const inter = Inter({ subsets: ["latin"] });

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
  // const metadata = await get_files_metadata_in_a_folder("./md");
  console.log(path);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="h-screen flex flex-col bg-slate-50">
            <Nav />
            <div className="w-full flex justify-center px-5 flex-grow overflow-y-auto">
              <div className="w-full xl:w-4/5 2xl:w-3/4 3xl:w-3/5 flex flex-col justify-between">
                {children}
                <div className="text-center border-t border-dashed text-sm">
                  Copyright ©️ 2024 zhengyan.blog
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
