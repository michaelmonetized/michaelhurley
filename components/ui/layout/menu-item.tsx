import { Url } from "next/dist/shared/lib/router/router";
import Link from "@/components/link";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function MenuItem({
  anchor,
  href,
  children,
  className,
}: {
  anchor: string;
  href?: Url;
  children?: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}) {
  return (
    <NavigationMenuItem>
      {href ? (
        <NavigationMenuLink
          asChild
          className={navigationMenuTriggerStyle() + " " + className}
        >
          <Link href={href}>
            {anchor}
          </Link>
        </NavigationMenuLink>
      ) : (
        children && (
          <>
            <NavigationMenuTrigger className={className}>
              {anchor}
            </NavigationMenuTrigger>
            <NavigationMenuContent>{children}</NavigationMenuContent>
          </>
        )
      )}
    </NavigationMenuItem>
  );
}
