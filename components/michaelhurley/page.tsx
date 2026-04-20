/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import {
  developmentGroups,
  galleryCards,
  heroFlashNames,
  skillGroups,
  timelineEntries,
  type TimelineDoublePhotoEntry,
  type TimelineEntry,
  type TimelinePhotoEntry,
  type TimelineRoleEntry,
} from "@/components/michaelhurley/data";
import {
  DrawStrokeSetup,
  GooBackgroundCanvas,
  HeroCanvas,
} from "@/components/michaelhurley/effects";
import {
  CodeIcon,
  LiveIcon,
  MarkIcon,
  SignatureMark,
  WaveText,
} from "@/components/michaelhurley/shared";
import {
  SiteFooter,
  SiteNav,
} from "@/components/michaelhurley/layout-shell";

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

function HeroSection() {
  const flashDuration = `${6 + heroFlashNames.length * 6}s`;

  return (
    <header id="hero" role="banner" className="hero-wrapper">
      <div
        className="hero-icon h-2x fixed text-center inset-inline-0"
        style={{ "--fade-delay": "0ms" } as CSSProperties}
      >
        <MarkIcon className="h-full w-auto animate-fadeInUp" />
      </div>

      <div className="hero-flashes">
        {heroFlashNames.map((name, index) => (
          <div
            key={name}
            className={`hero-flash hero-flash-${name}`}
            style={
              {
                "--hero-flash-duration": flashDuration,
                "--hero-flash-delay": `${6 + index * 3}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="hero-wipe-wireframe" />
      <HeroCanvas />

      <div
        id="hero-next-pos"
        className="fixed m-2x"
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

        <p className="-mt-sm animate-fadeInUp" style={{ "--fade-delay": "500ms" } as CSSProperties}>
          <small>current</small>
        </p>

        <div className="flex flex-col gap-0 relative p-lg pt-xl animate-fadeInUp" style={{ "--fade-delay": "750ms" } as CSSProperties}>
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
            <br />
            SALES
          </p>
          <hr />
          <p className="relative grow place-content-center place-items-center text-center">
            <img src="/profile/reef.png" className="absolute reef" alt="" />
            <img src="https://michaelchurley.com/icon.gif" alt="Michael Hurley icon" />
            <small>since 1999</small>
          </p>
        </div>
      </div>
    </header>
  );
}

function AnnouncementSection() {
  return (
    <section
      id="announcements"
      className="text-center sticky inset-0 h-svh w-svw place-items-center place-content-center pointer-events-none"
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

      <div id="signature" className="fixed inset-0 text-sapphire scale-1/2">
        <SignatureMark />
      </div>
    </section>
  );
}

function SummarySection({ yearsExperience }: { yearsExperience: number }) {
  return (
    <section
      id="summary"
      className="p-xl w-svw relative place-content-center place-items-center text-center"
    >
      <p className="place-content-center place-items-center text-center relative">
        <img src="/profile/reef.png" className="absolute reef" alt="" />
        <img src="https://michaelchurley.com/icon.gif" alt="Michael Hurley icon" />
        <small>since 1999</small>
      </p>
      <p className="text-7xl text-pretty max-w-4xl mx-auto p-md font-black">
        business operations and technology professional with over{" "}
        <span>{yearsExperience}</span> years experience in management, sales,
        marketing + growth, graphic design, and software development.
      </p>
      <div className="hero-icon h-2x text-center m-xl">
        <MarkIcon className="h-full w-auto" />
      </div>
    </section>
  );
}

function TimelineCard({ entry }: { entry: TimelineEntry }) {
  if (entry.kind === "photo") {
    const photoEntry = entry as TimelinePhotoEntry;
    return (
      <div className="flex flex-col items-stretch justify-start p-xl relative scroll-marquee-item">
        <p>{photoEntry.title}</p>
        <img
          src={photoEntry.src}
          alt={photoEntry.title}
          className={photoEntry.imageClassName}
        />
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
            <img
              src={photo.src}
              alt={photo.title}
              className={photo.imageClassName}
            />
          </div>
        ))}
      </div>
    );
  }

  const roleEntry = entry as TimelineRoleEntry;
  return (
    <div className="flex flex-col items-stretch justify-start p-xl relative scroll-marquee-item">
      {roleEntry.logoSrc && roleEntry.logoPlacement === "header" ? (
        <p>
          <img
            src={roleEntry.logoSrc}
            alt={`${roleEntry.company} logo`}
            className={roleEntry.logoClassName}
          />
        </p>
      ) : null}

      <h3 className="text-md font-bold">
        <strong>{roleEntry.company}</strong>
      </h3>

      {roleEntry.meta.map((meta) => (
        <p key={`${roleEntry.company}-${meta}`}>{meta}</p>
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
            alt={`${roleEntry.company} logo`}
            className={roleEntry.logoClassName}
          />
        </p>
      ) : null}
    </div>
  );
}

function TimelineSection() {
  return (
    <section id="timeline" className="relative">
      <div className="scroll-marquee-container">
        <div className="flex gap-xl items-stretch justify-start text-left w-max-content scroll-marquee relative">
          {timelineEntries.map((entry, index) => (
            <TimelineCard key={`${entry.kind}-${index}`} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ClockSection() {
  return (
    <section id="clock">
      <div className="grid grid-cols-4 place-items-stretch place-content-stretch uppercase">
        <div className="flex flex-col place-items-end place-content-end grow">
          <img
            className="left-in-out"
            src="/profile/michael-off.png"
            style={{ width: "100%", height: "auto" }}
            alt="Michael Hurley off the clock"
          />
        </div>
        <div className="flex flex-col place-items-stretch p-4x place-content-end grow">
          <h2 className="text-9xl font-black text-right">
            Off <small className="block text-4xl">The Clock</small>
          </h2>
          <a
            href="#off-the-clock"
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
            href="#on-the-clock"
            className="animate-hover-background-drop animate-hover-spin-icon-180 p-xl block border-4 w-fit rounded-xl"
          >
            <span className="relative rotate-180">⏎</span>
          </a>
        </div>
        <div className="flex flex-col place-items-end place-content-end grow">
          <img
            className="right-in-out"
            src="/profile/michael-right.png"
            style={{ width: "100%", height: "auto" }}
            alt="Michael Hurley on the clock"
          />
        </div>
      </div>
    </section>
  );
}

function SkillsSection({ averageWorkHours }: { averageWorkHours: string }) {
  return (
    <section id="sky">
      <div className="w-svw h-svh sticky inset-0" style={{ overflow: "clip" }}>
        <img
          src="/profile/photos/sky.jpeg"
          className="block object-cover h-svh w-svw object-left-bottom"
          style={{ opacity: 0.6, filter: "blur(8px)" }}
          alt=""
        />
      </div>

      <div className="flex justify-end items-stretch relative p-xl">
        <div
          id="on-the-clock"
          className="w-1/2 flex flex-col gap-xl p-xl avoid-navbar ml-auto"
        >
          <h2>Proven Skills</h2>
          <p>
            <span>{averageWorkHours}</span> hours of active, professional career
            experience in management, technology, marketing and sales.
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
              <h2>Full-Stack Development + Senior-Level Software Engineering</h2>
              <p>
                Proficient in C, C-derivative languages, scripting languages,
                web technologies, app development, and the tooling around them.
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
  title,
  subtitle,
  liveUrl,
  repoUrl,
  screenshotSrc,
  accent,
}: {
  title: string;
  subtitle: string;
  liveUrl: string;
  repoUrl: string;
  screenshotSrc: string;
  accent: string;
}) {
  return (
    <div
      className="gallery-item w-full"
      style={{ "--hover-color": accent } as CSSProperties}
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
              <div className="galler-ietm-links flex gap-sm absolute top-lg right-lg z-20">
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 bg-background/90 text-foreground"
                  aria-label={`Open ${title} live site`}
                >
                  <LiveIcon />
                </a>
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 bg-background/90 text-foreground"
                  aria-label={`Open ${title} source code`}
                >
                  <CodeIcon />
                </a>
              </div>
              <img src={screenshotSrc} className="block object-cover" alt={title} />
            </div>
          </div>

          <div className="gallery-item-logo relative z-10 p-xl text-left flex flex-col justify-end min-h-[23rem]">
            <p className="text-sm uppercase tracking-[0.2em] text-foreground/70">
              Frontend Hall of Fame
            </p>
            <h3 className="text-3xl font-black">{title}</h3>
            <p className="max-w-[16rem] text-sm text-foreground/80">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GallerySection() {
  return (
    <section id="gallery" className="h-svh avoid-navbar max-w-7xl mx-auto">
      <div className="p-xl flex flex-wrap gap-2xl items-center">
        <div className="w-1/2 p-xl">
          <h2 className="title font-black text-7xl uppercase">
            Frontend
            <br />
            <small className="subttitle text-7xl text-primary">
              Hall of Fame
            </small>
          </h2>
        </div>
        <div className="w-1/2 p-xl">
          <p>
            From small local business websites to multi-surface product work,
            Michael Hurley&apos;s engagement-first design decisions are built to
            move people, not just decorate a screen.
          </p>
        </div>
      </div>

      <div
        id="off-the-clock"
        className="grid grid-cols-4 gap-xl place-items-center place-content-center"
      >
        {groupedGalleryCards.map((column, index) => (
          <div key={index} className="gallery-column flex flex-col gap-xl w-full">
            {column.map((card) => (
              <GalleryProjectCard key={card.id} {...card} />
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
      <DrawStrokeSetup />
      <HeroSection />
      <SiteNav />
      <GooBackgroundCanvas />

      <main role="main" id="main" className="min-h-dvh relative">
        <AnnouncementSection />
        <SummarySection yearsExperience={yearsExperience} />
        <TimelineSection />
        <ClockSection />
        <SkillsSection averageWorkHours={averageWorkHours} />
        <GallerySection />
      </main>

      <SiteFooter />

      <svg width="0" height="0" aria-hidden className="absolute">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -10"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
