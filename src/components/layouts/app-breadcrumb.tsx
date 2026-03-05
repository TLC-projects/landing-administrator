"use client";

import { Fragment } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui";

interface AppBreadcrumbProps {
  breadcrumb: {
    label: string;
    href?: string;
  }[];
}

export const AppBreadcrumb: React.FC<AppBreadcrumbProps> = ({ breadcrumb }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb.length <= 3 ? (
          // If there are 3 or fewer items, display them all
          breadcrumb.map((item, index) => {
            const isLast = index === breadcrumb.length - 1;
            return isLast ? (
              <BreadcrumbItem key={index}>
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={item.href!}>{item.label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </Fragment>
            );
          })
        ) : (
          // If there are more than 3 items, display the first, last, and a dropdown for the middle items
          <>
            {/* First element */}
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={breadcrumb[0].href!}>{breadcrumb[0].label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            {/* Dropdown for middle items */}
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="h-4 w-4" />
                  <span className="sr-only">Abrir menú</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {breadcrumb.slice(1, -1).map((item, idx) => (
                    <DropdownMenuItem key={idx}>
                      <Link href={item.href!} className="w-full">
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            {/* Last element */}
            <BreadcrumbItem>
              <BreadcrumbPage>
                {breadcrumb[breadcrumb.length - 1].label}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
