import { BadgeItem } from "@/type";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function BadgeSection({
  badges,
  highlightTitle,
}: {
  badges: BadgeItem[];
  highlightTitle?: string;
}) {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-2">
      {badges.map((badge) => (
        <Link
          key={badge.title}
          className={`rounded-sm px-2 py-1 text-md hover:shadow-sm ${
            badge.title === highlightTitle
              ? "bg-orange-200 dark:bg-orange-600 hover:text-orange-500"
              : "bg-slate-100 hover:text-orange-500 dark:bg-slate-700"
          }`}
          href={badge.title === highlightTitle ? "/" : badge.href}
        >
          {badge.title}
          <span className="text-xs align-top">{badge.count}</span>
        </Link>
      ))}
    </div>
  );
}

function Item() {}
