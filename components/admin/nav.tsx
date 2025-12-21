"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  User,
  Briefcase,
  FolderOpen,
  Wrench,
  GraduationCap,
  Languages,
} from "lucide-react";

const items = [
  {
    title: "Personal Info",
    href: "/admin/personal",
    icon: User,
  },
  {
    title: "Experience",
    href: "/admin/experience",
    icon: Briefcase,
  },
  {
    title: "Projects",
    href: "/admin/projects",
    icon: FolderOpen,
  },
  {
    title: "Skills",
    href: "/admin/skills",
    icon: Wrench,
  },
  {
    title: "Education",
    href: "/admin/education",
    icon: GraduationCap,
  },
  {
    title: "Languages",
    href: "/admin/languages",
    icon: Languages,
  },
];

export function AdminNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex px-2 lg:px-0 scroll-area gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Button
          key={item.href}
          variant={pathname.startsWith(item.href) ? "default" : "ghost"}
          asChild
          className="justify-start"
        >
          <Link href={item.href}>
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
