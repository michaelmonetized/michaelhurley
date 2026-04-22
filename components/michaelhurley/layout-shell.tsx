 
"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import Link from "@/components/link";
import { WaveText, Wordmark } from "@/components/michaelhurley/shared";

const menuPanels = [
  { className: "bg-rosewater", label: "1" },
  { className: "bg-peach", label: "2" },
  { className: "bg-flamingo", label: "3" },
  { className: "bg-lavender", label: "4" },
] as const;

const menuTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
} as const;

const listVariants = {
  closed: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  closed: { opacity: 0, y: 24 },
  open: { opacity: 1, y: 0 },
};

type MenuLink = {
  href: string;
  kind: "anchor" | "route";
  label: string;
};

function MenuLinkItem({
  closeMenu,
  link,
}: {
  closeMenu: () => void;
  link: MenuLink;
}) {
  if (link.kind === "anchor") {
    return (
      <motion.li variants={itemVariants}>
        <a href={link.href} onClick={closeMenu}>
          <WaveText text={link.label} className="text-7xl" />
        </a>
      </motion.li>
    );
  }

  return (
    <motion.li variants={itemVariants}>
      <Link href={link.href} onClick={closeMenu}>
        <WaveText text={link.label} className="text-7xl" />
      </Link>
    </motion.li>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuLinks: MenuLink[] = [
    {
      href: pathname === "/" ? "#top" : "/",
      kind: pathname === "/" ? "anchor" : "route",
      label: "Home",
    },
    { href: "/on-the-clock", kind: "route", label: "On the clock" },
    { href: "/off-the-clock", kind: "route", label: "Off the clock" },
    { href: "/calendar", kind: "route", label: "Calendar" },
  ];

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <section
      id="navbar"
      className="p-2x fixed top-0 inset-inline-0 w-full flex justify-between items-center"
    >
      <div
        id="logo"
        className="animate-fadeInUp"
        style={{ "--fade-delay": "250ms" } as React.CSSProperties}
      >
        {pathname === "/" ? (
          <a href="#top" aria-label="Jump to home">
            <Wordmark />
          </a>
        ) : (
          <Link href="/" aria-label="Jump to home">
            <Wordmark />
          </Link>
        )}
      </div>

      <div id="menu">
        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close site navigation" : "Open site navigation"}
          className="menu-trigger relative animate-fadeInUp"
          style={{ "--fade-delay": "500ms" } as React.CSSProperties}
          onClick={() => {
            setIsMenuOpen((open) => !open);
          }}
        >
          <span className="menu-icon h-8x w-8x flex flex-col gap-xl p-xl border-foreground border-4 rounded-xl place-content-center block">
            <motion.hr
              animate={
                isMenuOpen
                  ? { rotate: 45, scaleX: 0.5, scaleY: 0.5, x: 0, y: 13 }
                  : { rotate: 0, scaleX: 0.75, scaleY: 1, x: 4, y: -2 }
              }
              transition={menuTransition}
            />
            <motion.hr
              animate={
                isMenuOpen
                  ? { rotate: -45, scaleX: 0.5, scaleY: 0.5, x: 0, y: -13 }
                  : { rotate: 0, scaleX: 1, scaleY: 1, x: 0, y: -2 }
              }
              transition={menuTransition}
            />
          </span>
        </button>

        <AnimatePresence>
          {isMenuOpen ? (
            <motion.div
              key="site-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-0 z-[9090] bg-crust/80 backdrop-blur-[2px]"
              onClick={closeMenu}
            >
              <motion.nav
                id="sheet-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={menuTransition}
                className="fixed inset-0 p-4x bg-crust z-[9091] flex flex-col md:flex-row gap-4x place-items-center place-content-center h-svh w-svw"
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <div className="grid w-full md:w-1/2 grid-cols-2 grid-rows-2 gap-xl h-[40svh] md:h-full">
                  {menuPanels.map((panel) => (
                    <motion.div
                      key={panel.label}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={menuTransition}
                      className={`${panel.className} aspect-portrait w-full grid place-content-center place-items-center text-center`}
                    >
                      {panel.label}
                    </motion.div>
                  ))}
                </div>

                <motion.ul
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={listVariants}
                  className="w-full md:w-1/2 text-center uppercase p-xl"
                >
                  {menuLinks.map((link) => (
                    <MenuLinkItem
                      key={`${link.kind}-${link.href}`}
                      closeMenu={closeMenu}
                      link={link}
                    />
                  ))}
                </motion.ul>
              </motion.nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="px-xl py-4x text-center text-sm border-t border-border mt-auto">
      <p>Michael Hurley builds for growth, clarity, and momentum.</p>
      <p>
        <a href="https://github.com/michaelmonetized" target="_blank" rel="noreferrer">
          GitHub
        </a>{" "}
        •{" "}
        <a href="https://www.hurleyus.com/" target="_blank" rel="noreferrer">
          HurleyUS
        </a>{" "}
        •{" "}
        <a href="https://www.hustlelaunch.com/" target="_blank" rel="noreferrer">
          Hustle Launch
        </a>
      </p>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-svh">
      <SiteNav />
      <main className="flex-grow pt-24">{children}</main>
      <SiteFooter />
    </div>
  );
}
