// prettier-ignore
'use client'
import BadgeSection from "@/components/BadgeSection";
import CardLayout from "@/components/CardLayout";
import { BadgeItem } from "@/type";

import { LabelList, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BsBookmarkCheck } from "react-icons/bs";

export default function Categories({ badges }: { badges: BadgeItem[] }) {

  return (
    <CardLayout
      title={
        <h1 className="flex items-center gap-x-2">
          <BsBookmarkCheck /> Categories
        </h1>
      }
    >
      <BadgeSection badges={badges} />
    </CardLayout>
  );
}
