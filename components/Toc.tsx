// prettier-ignore
"use client"
import next from "next";
import { getNamedRouteRegex } from "next/dist/shared/lib/router/utils/route-regex";
import { useEffect, useState, useRef } from "react";

export default function Toc({ headings }: { headings: string[] }) {
  const [activeId, setActiveId] = useState("");
  const activeArr = useRef(new Array(headings.length).fill(false));
  const headingsID = headings.map((heading) =>
    heading
      .toLowerCase()
      .replace(/[^0-9a-zA-Z\s_]/g, "")
      .replace(/\s/g, "-")
  );

  const handleObserver = (entries: any) => {
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        const id = headingsID.findIndex((ele) => ele === entries[i].target.id);
        activeArr.current[id] = true;
      } else {
        const id = headingsID.findIndex((ele) => ele === entries[i].target.id);
        activeArr.current[id] = false;
      }
    }

    for (let i = 0; i < activeArr.current.length; i++) {
      if (activeArr.current[i]) {
        setActiveId(headings[i]);
        break;
      }
    }
    //setActiveArr(nextArr);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      // root: document.getElementById("Nav"),
      rootMargin: "0% 0% 0% 0%",
      threshold: 0,
    });
    document.querySelectorAll("article h2").forEach((item) => {
      observer.observe(item);
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="font-bold mb-3">On Ths Page</div>
      {headings.map((x: string, id: Number) => (
        <div
          key={String(id)}
          className={`mt-1 ${
            activeId === x
              ? // .toLowerCase()
                // .replace(/[^0-9a-zA-Z\s]/g, "")
                // .replace(/\s/g, "-")
                "font-bold"
              : ""
          }`}
        >
          <a
            href={
              "#" +
              x
                .toLowerCase()
                .replace(/[^0-9a-zA-Z\s_]/g, "")
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
