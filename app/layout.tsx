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


// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const geologica = Geologica({
  subsets: ["latin"],
  variable: "--font-geologica",
  weight: "400",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: "700",
});
// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
//   weight: "400",
// });

export const metadata: Metadata = {
  title: "zhengyan.blog",
  description: "Zhengyan's tech blog",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // initial processing

  const categories = await get_all_categories();
  const tags = await get_all_tags();
  // const metadata = await get_files_metadata_in_a_folder("./md");

  return (
    <html lang="en" suppressHydrationWarning className={merriweather.variable}>
      
      <body
        className={cn(
          "h-screen bg-background antialiased overflow-hidden"
          // fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="h-screen flex flex-col light:bg-slate-50">
            <Nav categories={categories} tags={tags} />
            <div className="w-full flex justify-center px-5 overflow-y-auto">
              <div className="w-full h-full xl:w-4/5 2xl:max-w-[90rem]">
                {children}
              </div>
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
