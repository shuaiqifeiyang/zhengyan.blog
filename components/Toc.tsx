// prettier-ignore
"use client"
import { useEffect, useState } from "react";

export default function Toc({ headings }: { headings: string[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // entries.forEach((entry) => {
        //   if (entry.isIntersecting) {
        //     console.log(entry.target.id);
        //     setActiveId(entry.target.id);
        //   }
        // });
        for (let i = 0; i < entries.length; i++) {
          console.log(entries[i].target.id);
          if (entries[i].isIntersecting) {
            setActiveId(entries[i].target.id);
            break;
          }
        }
      },
      {
        // root: document.getElementById("Nav"),
        rootMargin: "0% 0% 0% 0%",
        threshold: 0,
      }
    );
    console.log(observer.root);
    document.querySelectorAll("article h2").forEach((item) => {
      observer.observe(item);
    });
    return () => {
      observer.disconnect();
    };
  });

  return (
    <>
      {headings.map((x: string, id: Number) => (
        <div
          key={String(id)}
          className={
            activeId ===
            x
              .toLowerCase()
              .replace(/[^0-9a-zA-Z\s]/g, "")
              .replace(/\s/g, "-")
              ? "text-blue-500"
              : ""
          }
        >
          <a
            href={
              "#" +
              x
                .toLowerCase()
                .replace(/[^0-9a-zA-Z\s]/g, "")
                .replace(/\s/g, "-")
            }
          >
            {x}
          </a>
        </div>
      ))}
    </>
  );
}
