import * as React from "react";
import { cn } from "@/lib/utils";
import Nav from "@/components/ui/layout/nav";
import Footer from "@/components/ui/layout/footer";
import { SidebarProvider } from "@/components/ui/sidebar";

/**
 * Layout styles
 * default: flex container with min-height of the viewport height sticky top nav and standard footer
 * full: flex container with min-height of the viewport height full width and height with non sticky top nav and standard footer
 * canvas: flex container with min-height of the viewport height full width and height with no top nav and no footer. Used for custom landing pages, checkout, cart flow, type pages.
 */

export default function Layout({
  variant,
  children,
  className,
  ...props
}: {
  variant: "default" | "full" | "sidebar" | "canvas";
} & React.ComponentPropsWithRef<"div">) {
  return (
    <>
      {variant === "sidebar" && (
        <SidebarProvider>
          <div
            className={cn(
              "flex flex-col place-items-stretch place-content-stretch min-h-dvh w-dvw",
              className,
            )}
            {...props}
          >
            <Nav sticky sidebar />
            <div className="flex grow">{children}</div>
            <Footer />
          </div>
        </SidebarProvider>
      )}

      {variant === "canvas" && (
        <div
          className={cn(
            "flex flex-col place-items-stretch place-content-stretch min-h-dvh w-dvw",
            className,
          )}
          {...props}
        >
          <div className="flex flex-col grow" id="top">
            {children}
          </div>
        </div>
      )}

      {variant === "default" && (
        <div
          className={cn(
            "flex flex-col place-items-stretch place-content-stretch min-h-dvh w-dvw",
            className,
          )}
          {...props}
        >
          <Nav sticky={true} />
          <div className="flex flex-col grow" id="top">
            {children}
          </div>
          <Footer />
        </div>
      )}

      {variant === "full" && (
        <div
          className={cn(
            "flex flex-col place-items-stretch place-content-stretch min-h-dvh w-dvw",
            className,
          )}
          {...props}
        >
          <Nav sticky={false} />
          <div className="flex flex-col grow" id="top">
            {children}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
