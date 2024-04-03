"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import ContrastSVG from "../public/contrast.svg"



export const ThemeSwitcher = () => {
  // const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) {
  //   return null;
  // }

  return (
    <button
      className="block"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {/* <img src="./contrast.svg" alt="Description" /> */}
      {/* <svg href="/contrast.svg" className="h-10 w-10"></svg> */}
      <Image src={ContrastSVG} alt="contrast" className="block dark:invert">
      </Image>
    </button>
  );
};