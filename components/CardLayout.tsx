import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function CardLayout({
  title,
  description,
  children,
  footer,
}: {
  title: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <Card className="h-full flex flex-col border-gray-300 dark:border-gray-700 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="overflow-y-auto grow">{children}</CardContent>
      <CardFooter className="flex justify-center items-center py-2">
        {footer}
      </CardFooter>
    </Card>
  );
}
