/* eslint-disable @next/next/no-img-element */
"use client";

import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  developmentGroups,
  galleryCards,
  heroFlashNames,
  menuImages,
  skillGroups,
  timelineEntries,
  type TimelineDoublePhotoEntry,
  type TimelineEntry,
  type TimelinePhotoEntry,
  type TimelineRoleEntry,
} from "@/components/michaelhurley/data";
import {
  GooBackgroundCanvas,
  HeroCanvas,
} from "@/components/michaelhurley/effects";
import {
  MarkIcon,
  SignatureMark,
  WaveText,
  Wordmark,
} from "@/components/michaelhurley/shared";

const groupedGalleryCards = Array.from({ length: 4 }, (_, columnIndex) =>
  galleryCards.filter((_, index) => index % 4 === columnIndex),
);

function getCalendarWeeksSince(startDate: Date, endDate = new Date()) {
  const MS_PER_WEEK = 1000 * 60 * 60 * 24 * 7;

  const startOfWeek = (date: Date) => {
    const nextDate = new Date(date);
    nextDate.setHours(0, 0, 0, 0);
    nextDate.setDate(nextDate.getDate() - nextDate.getDay());
    return nextDate;
  };

  const startWeek = startOfWeek(startDate);
  const endWeek = startOfWeek(endDate);

  return Math.round((endWeek.getTime() - startWeek.getTime()) / MS_PER_WEEK);
}

function HomeNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const menuLinks = [
    { href: "#top", label: "Home" },
    { href: "/on-the-clock", label: "On the clock" },
    { href: "/off-the-clock", label: "Off the clock" },
    { href: "/calendar", label: "Calendar" },
  ] as const;

  return (
    <section
      id="navbar"
      className="p-2x fixed top-0 inset-inline-0 w-full flex justify-between items-center"
    >
      <div
        id="logo"
        className="animate-fadeInUp"
        style={{ "--fade-delay": "250ms" } as CSSProperties}
      >
        <a href="#top" aria-label="Jump to home">
          <Wordmark />
        </a>
      </div>

      <div id="menu">
        <label
          className="menu-trigger relative animate-fadeInUp"
          style={{ "--fade-delay": "500ms" } as CSSProperties}
        >
          <span className="menu-icon h-8x w-8x flex flex-col gap-xl p-xl border-foreground border-4 rounded-xl place-content-center block">
            <hr />
            <hr />
          </span>
          <input
            type="checkbox"
            name="menu-state"
            className="menu-state"
            checked={isMenuOpen}
            aria-label="Toggle site navigation"
            onChange={(event) => setIsMenuOpen(event.target.checked)}
          />
        </label>

        <nav
          id="sheet-menu"
          aria-hidden={!isMenuOpen}
          className="fixed inset-0 p-4x bg-crust z-50 flex gap-4x place-items-center place-content-center h-svh w-svw"
        >
          <div className="flex flex-wrap w-1/3">
            {menuImages.map((image) => (
              <div key={image.src} className="w-1/2 p-xl">
                <img src={image.src} alt={image.alt} className={image.className} />
              </div>
            ))}
          </div>

          <ul className="w-2/3 text-center uppercase p-xl">
            {menuLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  tabIndex={isMenuOpen ? undefined : -1}
                >
                  <WaveText text={link.label} className="text-7xl" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.51], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"]);
  const grayscale = useTransform(scrollYProgress, [0, 0.5], ["grayscale(0%)", "grayscale(100%)"]);

  const flashDuration = `${6 + heroFlashNames.length * 6}s`;

  return (
    <motion.header
      ref={containerRef}
      id="hero"
      role="banner"
      className="hero-wrapper relative h-svh w-svw"
      style={{ scale, opacity, y, filter: grayscale }}
    >
      <div
        className="hero-icon h-2x animate-fadeInUp t-5vh fixed text-center inset-inline-0"
        style={{ "--fade-delay": "0ms" } as CSSProperties}
      >
        <MarkIcon className="mx-auto block h-full w-auto" />
      </div>

      <div className="hero-flashes">
        {heroFlashNames.map((name, index) => (
          <div
            key={name}
            className={`hero-flash hero-flash-${name}`}
            style={
              {
                "--hero-flash-delay": `${6 + index * 3}s`,
                "--hero-flash-duration": flashDuration,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="hero-wipe-wireframe" />
      <HeroCanvas />

      <div
        id="hero-next-pos"
        className="fixed m-2x animate-fadeInUp"
        style={{ "--fade-delay": "250ms" } as CSSProperties}
      >
        <svg
          width="119"
          height="244"
          viewBox="0 0 119 244"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0"
          aria-hidden
        >
          <path
            d="M118.5 6v232a5.5 5.5 0 0 1-5.5 5.5H6A5.5 5.5 0 0 1 .5 238V25A5.5 5.5 0 0 1 6 19.5h46.346c4.695 0 9.167-2 12.297-5.498l7.46-8.337A15.5 15.5 0 0 1 83.653.5H113a5.5 5.5 0 0 1 5.5 5.5Z"
            className="draw-stroke animate-draw-stroke"
          />
        </svg>
        <p className="-mt-sm">
          <small>current</small>
        </p>
        <div className="flex flex-col gap-0 relative p-lg pt-xl">
          <p className="text-center shrink" id="vizible-icon-wrapper">
            <span className="block spin3d">
              <img
                src="/profile/vizible-logo-white.png"
                className="h-5x block mx-auto"
                id="vizible-icon-white"
                alt=""
              />
              <img
                src="/profile/vizible-logo.png"
                className="h-5x block mx-auto"
                id="vizible-icon"
                alt="Vizible logo"
              />
            </span>
            <br /> SALES
          </p>
          <hr />
          <p className="relative grow place-content-center place-items-center text-center">
            <img src="/profile/reef.png" className="absolute reef" alt="" />
            <img src="https://michaelchurley.com/icon.gif" alt="Michael Hurley icon" />
            <small>since 1999</small>
          </p>
        </div>
      </div>
    </motion.header>
  );
}

function AnnouncementSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const liftY = useTransform(scrollYProgress, [0.5, 1], ["0%", "-100%"]);
  const liftOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);
  const pathLength = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <div ref={containerRef} className="h-[200svh] pointer-events-none relative">
      <motion.section
        id="announcements"
        className="text-center fixed inset-0 h-svh w-svw place-items-center place-content-center z-[1000]"
        style={{ y: liftY, opacity: liftOpacity }}
      >
        <div
          id="announcements-icon"
          className="fixed inset-0 grid h-svh w-svw place-content-center place-items-center"
        >
          <MarkIcon className="hero-icon h-2x animate-fadeInUp" />
          <p className="text-center">
            <small>
              <WaveText text="Message from Michael C Hurley" incoming />
            </small>
          </p>
        </div>

        <div
          id="announcments-banner"
          className="fixed inset-0 grid h-svh w-svw place-content-center place-items-center"
        >
          <div className="marquee-container text-7xl font-black text-center">
            <div className="infinite-marquee marquee-direction-right" aria-hidden>
              {Array.from({ length: 42 }, (_, index) => (
                <span key={index}>&nbsp;I DID IT •&nbsp;</span>
              ))}
            </div>
            <div className="infinite-marquee marquee-direction-left" aria-hidden>
              {Array.from({ length: 6 }, (_, index) => (
                <span key={index}>
                  BESTWNC LAUNCHED • UNCAP.US LAUNCHED • GETAT.ME LAUNCHED •
                  HURLEYUS LAUNCHED • REAFERRAL.com LAUNCHED •
                </span>
              ))}
            </div>
          </div>
        </div>

        <div id="announcements-photo" className="scale-1/5 fixed inset-0">
          <img
            src="/profile/landscape-night.jpeg"
            className="object-cover object-left-bottom h-svh w-svw grayscale"
            alt=""
          />
        </div>

        <motion.div
          id="signature"
          className="fixed inset-0 text-sapphire scale-1/2 flex items-center justify-center"
        >
          <SignatureMark progress={pathLength} />
        </motion.div>
      </motion.section>
    </div>
  );
}

function SummarySection({ yearsExperience }: { yearsExperience: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <motion.section
      ref={containerRef}
      id="summary"
      className="p-xl w-svw relative place-content-center place-items-center text-center py-[20svh]"
      style={{ opacity, y }}
    >
      <p className="place-content-center place-items-center text-center relative">
        <img src="/profile/reef.png" className="absolute reef" alt="" />
        <img src="https://michaelchurley.com/icon.gif" alt="Michael Hurley icon" />
        <small>since 1999</small>
      </p>
      <p className="text-7xl text-pretty max-w-4xl mx-auto p-md font-black">
        business operations and technology professional with over{" "}
        <span className="since99">{yearsExperience}</span> years experience in
        management, sales, marketing + growth, graphic design, and software
        development.
      </p>
      <div className="hero-icon h-2x animate-fadeInUp text-center m-xl">
        <MarkIcon className="mx-auto block h-full w-auto" />
      </div>
    </motion.section>
  );
}

function renderRoleMeta(meta: string) {
  if (meta.startsWith("Acquired ")) {
    return (
      <>
        <strong>Acquired</strong> {meta.replace(/^Acquired /, "")}
      </>
    );
  }

  if (meta.includes(", ")) {
    const [first, ...rest] = meta.split(", ");
    return (
      <>
        <strong>{first}</strong>, {rest.join(", ")}
      </>
    );
  }

  if (meta.includes("$")) {
    const matches = [...meta.matchAll(/\$[0-9.]+[A-Za-z+]*\/?[A-Za-z]*/g)];
    const lastMatch = matches.at(-1);

    if (lastMatch && lastMatch.index !== undefined) {
      const amount = lastMatch[0];
      const start = lastMatch.index;
      const end = start + amount.length;

      return (
        <>
          {meta.slice(0, start)}
          <strong>{amount}</strong>
          {meta.slice(end)}
        </>
      );
    }
  }

  return meta;
}

function renderRoleHeader(roleEntry: TimelineRoleEntry) {
  const logo = roleEntry.logoSrc ? (
    <img
      src={roleEntry.logoSrc}
      alt={roleEntry.logoAlt ?? `${roleEntry.company} logo`}
      className={roleEntry.logoClassName}
    />
  ) : null;

  switch (roleEntry.company) {
    case "Hustle Launch":
      return (
        <h3 className="text-md font-bold">
          {logo} <br />
          <strong>{roleEntry.company}</strong>
        </h3>
      );
    case "Kaibo, LLC D/B/A Realay.com":
      return (
        <h3 className="text-md font-bold">
          <strong>{roleEntry.company}</strong>
          <br />
          {logo}
        </h3>
      );
    case "Papa John's Waynesville/Franklin, NC":
    case "StudioTWLEVE":
    case "Corporate Cleaning Services, Inc.":
      return (
        <>
          <p>{logo}</p>
          <h3 className="text-md font-bold">
            <strong>{roleEntry.company}</strong>
          </h3>
        </>
      );
    case "Hurley's Creekside Dining & Rhum Bar":
      return (
        <>
          <h3 className="text-md font-bold">
            <strong>{roleEntry.company}</strong>
          </h3>
          <p>{logo}</p>
        </>
      );
    default:
      return (
        <h3 className="text-md font-bold">
          <strong>{roleEntry.company}</strong>
        </h3>
      );
  }
}

function TimelineCard({ entry }: { entry: TimelineEntry }) {
  if (entry.kind === "photo") {
    const photoEntry = entry as TimelinePhotoEntry;
    return (
      <div className="flex flex-col items-stretch justify-start p-xl relative scroll-marquee-item">
        <p>{photoEntry.title}</p>
        <img src={photoEntry.src} alt={photoEntry.title} className={photoEntry.imageClassName} />
      </div>
    );
  }

  if (entry.kind === "doublePhoto") {
    const doublePhotoEntry = entry as TimelineDoublePhotoEntry;
    return (
      <div className="flex flex-col items-stretch justify-between p-xl relative scroll-marquee-item">
        {doublePhotoEntry.photos.map((photo) => (
          <div key={photo.src} className="p-xl relative">
            <p>{photo.title}</p>
            <img src={photo.src} alt={photo.title} className={photo.imageClassName} />
          </div>
        ))}
      </div>
    );
  }

  const roleEntry = entry as TimelineRoleEntry;

  return (
    <div className="flex flex-col items-stretch justify-start p-xl relative scroll-marquee-item">
      {renderRoleHeader(roleEntry)}

      {roleEntry.meta.map((meta) => (
        <p key={`${roleEntry.company}-${meta}`}>{renderRoleMeta(meta)}</p>
      ))}

      <ul className="list-disc ml-md">
        {roleEntry.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>

      {roleEntry.logoSrc && roleEntry.logoPlacement === "footer" ? (
        <p>
          <img
            src={roleEntry.logoSrc}
            alt={roleEntry.logoAlt ?? `${roleEntry.company} logo`}
            className={roleEntry.logoClassName}
          />
        </p>
      ) : null}
    </div>
  );
}

function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (
    <section ref={containerRef} id="timeline" className="relative h-[400svh]">
      <div className="sticky top-0 h-svh w-svw overflow-hidden flex items-center">
        <motion.div
          className="flex gap-xl items-stretch justify-start text-left w-max-content relative px-svw"
          style={{ x }}
        >
          {timelineEntries.map((entry, index) => (
            <TimelineCard key={`${entry.kind}-${index}`} entry={entry} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ClockSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ["-100%", "0%", "-60%", "-100%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ["100%", "0%", "60%", "100%"]);

  return (
    <section ref={containerRef} id="clock">
      <div id="calendar" aria-hidden />
      <div className="grid grid-cols-4 place-items-stretch place-content-stretch uppercase h-svh w-svw overflow-hidden">
        <div className="flex flex-col place-items-end place-content-end grow">
          <motion.img
            className="w-full h-auto"
            src="/profile/michael-off.png"
            style={{ x: leftX }}
            alt="Michael Hurley off the clock"
          />
        </div>
        <div className="flex flex-col place-items-stretch p-4x place-content-end grow">
          <h2 className="text-9xl font-black text-right">
            Off <small className="block text-4xl">The Clock</small>
          </h2>
          <a
            href="/off-the-clock"
            className="animate-hover-background-drop animate-hover-spin-icon-180 p-xl block border-4 w-fit rounded-xl ml-auto"
          >
            <span className="relative">⏎</span>
          </a>
        </div>
        <div className="flex flex-col place-items-stretch p-4x place-content-end grow">
          <h2 className="text-9xl font-black">
            On <small className="block text-4xl">The Clock</small>
          </h2>
          <a
            href="/on-the-clock"
            className="animate-hover-background-drop animate-hover-spin-icon-180 p-xl block border-4 w-fit rounded-xl"
          >
            <span className="relative rotate-180">⏎</span>
          </a>
        </div>
        <div className="flex flex-col place-items-end place-content-end grow">
          <motion.img
            className="w-full h-auto"
            src="/profile/michael-right.png"
            style={{ x: rightX }}
            alt="Michael Hurley on the clock"
          />
        </div>
      </div>
    </section>
  );
}

function SkillsSection({ averageWorkHours }: { averageWorkHours: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const skyOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 0.6, 0.6, 0.3]);

  return (
    <section ref={containerRef} id="sky" className="relative">
      <motion.div
        className="w-svw h-svh sticky top-0 overflow-hidden -z-10"
        style={{ opacity: skyOpacity }}
      >
        <img
          src="/profile/photos/sky.jpeg"
          className="block object-cover h-svh w-svw object-left-bottom blur-md"
          alt=""
        />
      </motion.div>

      <div className="flex justify-end items-stretch relative p-xl -mt-[100svh]">
        <div
          id="on-the-clock"
          className="w-1/2 flex flex-col gap-xl p-xl avoid-navbar ml-auto bg-background/40 backdrop-blur-sm"
        >
          <h2>Proven Skills</h2>
          <p>
            <span className="average-work-hours">{averageWorkHours}</span> hours
            of active, professional career experience in management, technology,
            marketing and sales.
          </p>

          <div className="flex flex-col items-stretch justify-start gap-xl grow w-full">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="flex flex-col items-stretch justify-start grow w-full"
              >
                <h3>{group.title}</h3>
                <ul className="list-disc p-xl">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-col items-stretch justify-start grow w-full gap-xl">
              <h2>Full-Stack Development + Sr. Level Software Engineering</h2>
              <p>
                Proficient in C, C derivative languages, Scripting languages,
                Web technologies, App development and tools associated with
                these:
              </p>

              {developmentGroups.map((group) => (
                <div key={group.title}>
                  <h3>{group.title}</h3>
                  <ul className="list-disc ml-md">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryProjectCard({
  accent,
  liveUrl,
  repoUrl,
  screenshotSrc,
  subtitle,
  title,
}: {
  accent: string;
  liveUrl: string;
  repoUrl: string;
  screenshotSrc: string;
  subtitle: string;
  title: string;
}) {
  return (
    <motion.div
      className="gallery-item w-full"
      style={{ "--hover-color": accent } as CSSProperties}
      whileHover={{ y: -10 }}
    >
      <div className="gallery-item-outer relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="407"
          height="411"
          viewBox="0 0 407 411"
          fill="none"
          aria-hidden
        >
          <path
            d="M0 8C0 3.58173 3.58172 0 8 0H398.89C403.308 0 406.89 3.58172 406.89 8V364.983C406.89 369.401 403.308 372.983 398.89 372.983H263.329C256.329 372.983 249.709 376.171 245.345 381.644L228.846 402.338C224.482 407.812 217.863 411 210.862 411H8C3.58173 411 0 407.418 0 403V8Z"
            fill="none"
            className="draw-stroke"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="407"
          height="411"
          viewBox="0 0 407 411"
          fill="none"
          aria-hidden
        >
          <path
            d="M0 8C0 3.58173 3.58172 0 8 0H398.89C403.308 0 406.89 3.58172 406.89 8V364.983C406.89 369.401 403.308 372.983 398.89 372.983H263.329C256.329 372.983 249.709 376.171 245.345 381.644L228.846 402.338C224.482 407.812 217.863 411 210.862 411H8C3.58173 411 0 407.418 0 403V8Z"
            fill="none"
          />
        </svg>

        <div className="gallery-item-inner relative">
          <div className="gallery-item-screenshot relative">
            <div className="gallery-item-screenshot-inner grid place-items-center place-content-center text-center">
              <div className="gallery-item-links">
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${title} live site`}
                />
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${title} source code`}
                />
              </div>
              <img src={screenshotSrc} className="block object-cover" alt={title} />
            </div>
          </div>

          <div className="gallery-item-logo relative">
            <div className="p-xl text-left flex flex-col justify-end min-h-[23rem]">
              <p className="text-sm uppercase tracking-[0.2em] text-foreground/70">
                Frontend Hall of Fame
              </p>
              <h3 className="text-3xl font-black">{title}</h3>
              <p className="max-w-[16rem] text-sm text-foreground/80">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function GallerySection() {
  return (
    <section id="gallery" className="min-h-svh avoid-navbar max-w-7xl mx-auto py-4x">
      <div className="p-xl flex flex-wrap gap-2xl items-center mb-4x">
        <div className="w-1/2 p-xl">
          <h2 className="title font-black text-7xl uppercase">
            Frontend
            <br />
            <small className="subtitle text-7xl text-primary">Hall of Fame</small>
          </h2>
        </div>
        <div className="w-1/2 p-xl">
          <p className="text-xl">
            From small local business websites to multi-surface product work,
            Michael Hurley&apos;s engagement-first design decisions are built to
            move people, not just decorate a screen.
          </p>
        </div>
      </div>

      <div
        id="off-the-clock"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-xl"
      >
        {groupedGalleryCards.map((column, colIndex) => (
          <div
            key={colIndex}
            className={cn(
              "gallery-column flex flex-col gap-xl w-full",
              colIndex % 2 !== 0 && "md:pt-[300px]"
            )}
          >
            {column.map((card) => (
              <GalleryProjectCard
                key={card.id}
                accent={card.accent}
                liveUrl={card.liveUrl}
                repoUrl={card.repoUrl}
                screenshotSrc={card.screenshotSrc}
                subtitle={card.subtitle}
                title={card.title}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function MichaelHurleyPage() {
  const yearsExperience = new Date().getFullYear() - 1999;
  const totalWorkWeeks = getCalendarWeeksSince(new Date("1999-06-01"));
  const averageWorkHours = (
    ((40 * totalWorkWeeks + 80 * totalWorkWeeks) / 2)
  ).toLocaleString();

  return (
    <div id="top">
      <HeroSection />
      <HomeNav />
      <GooBackgroundCanvas />

      <main role="main" id="main" className="min-h-dvh relative">
        <AnnouncementSection />
        <SummarySection yearsExperience={yearsExperience} />
        <TimelineSection />
        <ClockSection />
        <SkillsSection averageWorkHours={averageWorkHours} />
        <GallerySection />
      </main>

      <svg width="0" height="0" aria-hidden className="absolute">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
