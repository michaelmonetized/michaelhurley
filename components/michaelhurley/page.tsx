/* eslint-disable @next/next/no-img-element */
"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  useEffect,
  useEffectEvent,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { MotionValue } from "motion/react";
import { heroFlashNames } from "@/components/michaelhurley/data";
import {
  DrawStrokeSetup,
  GooBackgroundCanvas,
  HeroCanvas,
} from "@/components/michaelhurley/effects";
import { SiteNav } from "@/components/michaelhurley/layout-shell";
import {
  MarkIcon,
  WaveText,
  signaturePath,
} from "@/components/michaelhurley/shared";

type SectionKey = "hero" | "announcements" | "summary" | "timeline";
type SharedMarkSectionKey = Exclude<SectionKey, "timeline">;

type HomeTimelineEntry = {
  company: string;
  lines: ReactNode[];
  bullets: string[];
};

const SECTION_MARK_TRANSITION_NAME = "section-mark";
const HERO_TRANSFORM_SPRING = { damping: 30, mass: 0.35, stiffness: 220 };
const TIMELINE_SPRING = { damping: 28, mass: 0.45, stiffness: 160 };

const homeTimelineEntries: HomeTimelineEntry[] = [
  {
    company: "Hustle Launch",
    lines: [
      <>
        <strong>Director</strong>, 02/2024 - Present
      </>,
      <>
        MRR <strong>$70k</strong>
      </>,
    ],
    bullets: [
      "Oversee all aspects of the company's success, including but not limited to: sales, marketing, finance, human resources, and technology.",
      "Responsible for the company's growth and success.",
      "Manage the company's finances, including but not limited to: revenue, expenses, and cash flow.",
      "Manage the company's human resources, including but not limited to: employee recruitment, training, and development.",
      "Manage the company's technology, including but not limited to: software development, hardware, and infrastructure.",
    ],
  },
  {
    company: "Kaibo, LLC D/B/A Realay.com",
    lines: [
      <>
        <strong>Chief Technology Officer</strong>, 03/2023 - 04/2024
      </>,
      <>
        Salary: <strong>$60k++</strong>/yr
      </>,
    ],
    bullets: [
      "Responsible for the development and maintenance of the company's technology, including but not limited to: infrastructure, database design, software engineering, user experience, design, video production, investment acquisition, direct to customer marketing, sales and growth strategy.",
      "Support c-suite with technology and infrastructure for analyzing and monitoring operations, usage, and performance.",
      "Support clients with usability, maintenance, and direct technical support for onboarding, integration, and troubleshooting.",
      "Collaborate with clients to develop and implement solutions to meet their needs.",
    ],
  },
  {
    company: "White Fox Studios",
    lines: [
      <>
        <strong>Director</strong>, 02/2015 - 02/2024
      </>,
      <>
        Salary: $28k/yr - <strong>$60k++</strong>/yr
      </>,
    ],
    bullets: [
      "Responsible for all aspects of the company's success, including but not limited to: sales, marketing, finance, human resources, and technology.",
      "Develop software and systems to support the business and business clients.",
      "Sell marketing and web design services to clients.",
      "Provide support and maintenance for clients' websites and online presence.",
      "Collaborate with clients to develop and implement solutions to meet their needs.",
      "Consult with clients on business strategy, marketing, and sales.",
      "Conduct market research and analysis to inform business decisions and client marketing strategies.",
      "Manage company finances: revenue, expenses, and cash flow.",
      "Manage sales, marketing, and customer satisfaction.",
      "Manage teams and staff: recruitment, training, development, performance, and compensation.",
    ],
  },
  {
    company: "Papa John's Waynesville/Franklin, NC",
    lines: [
      <>
        <strong>Franchisee Partner</strong>, 06/2014 - 02/2015
      </>,
      <>
        Salary: $7.50/h - <strong>$27k</strong>/yr
      </>,
    ],
    bullets: [
      "Responsible for the management of the store's operations, including but not limited to: scheduling, customer service, inventory, sales, recruitment, human resources, cost analysis, budgeting and reporting to franchisee/corporate.",
      "Manage the store's finances, including but not limited to: revenue, expenses, and cash flow.",
      "Manage the store's sales, marketing, and customer satisfaction.",
    ],
  },
  {
    company: "Hurley's Creekside Dining & Rhum Bar",
    lines: [
      <>
        <strong>Co-Owner/Operator</strong>, 07/2010 - 05/2014
      </>,
      <>
        AGR: $1.3M - <strong>$5.33M</strong>
      </>,
      <>
        <strong>Acquired</strong> Arthur Robert Frady & Sons
      </>,
    ],
    bullets: [
      "Responsible for all aspects of the restaurant's success, including but not limited to: brand design, marketing, finance, human resources, and technology.",
      "Manage the restaurant's finances, including but not limited to: revenue, expenses, and cash flow.",
      "Manage the restaurant's human resources, including but not limited to: employee recruitment, training and working all positions, and development.",
      "Manage the restaurant's technology, including but not limited to: software, hardware, and infrastructure.",
      "Manage the restaurant's marketing, including but not limited to: advertising, social media, and public relations.",
      "Manage the restaurant's branding, including but not limited to: logo, web & menu design, presentation, interior design, and signage.",
    ],
  },
  {
    company: "StudioTWLEVE",
    lines: [
      <>
        <strong>Director</strong>, 01/2007 - 07/2010
      </>,
      <>
        ANP: $50k - <strong>$387k</strong>
      </>,
      <>
        <strong>Acquired</strong> TB Creative
      </>,
    ],
    bullets: [
      "Responsible for all aspects of the studio's success, including but not limited to: brand design, marketing, finance, human resources, and technology.",
      "Manage the studio's finances, including but not limited to: revenue, expenses, and cash flow.",
      "Manage the studio's human resources, including but not limited to: employee recruitment, training, and development.",
      "Manage the studio's technology, including but not limited to: software, hardware, and infrastructure.",
      "Manage the studio's marketing, including but not limited to: advertising, social media, and public relations.",
      "Manage the studio's branding, including but not limited to: logo, web & menu design, presentation, interior design, and signage.",
    ],
  },
  {
    company: "Signs 'R' Us",
    lines: [
      <>
        <strong>Production Manager</strong>, 07/2003 - 01/2007
      </>,
      <>
        Salary: $10.50/h - <strong>$42k</strong>/yr
      </>,
    ],
    bullets: [
      "Responsible for all sign design and production, including but not limited to: design team output, production + packaging, equipment maintenance, and supplies.",
      "Design team output: design review, customer feedback, and revisions.",
      "Production + packaging: ensure the quality of sign materials, materials, final product, and packaging presentation.",
      "Equipment maintenance: repair, maintain and replace equipement as needed.",
      "Supplies: manage raw material inventory.",
    ],
  },
  {
    company: "Corporate Cleaning Services, Inc.",
    lines: [
      <>
        <strong>Regional Manager</strong>, 06/1996 - 06/2003
      </>,
      <>
        Salary: $7.50/h - <strong>$35k</strong>/yr
      </>,
    ],
    bullets: [
      "Responsible for all customer satisfaction for all clients in the greater south carolina lowcountry area, including but not limited to: team management and deployment, crisis response, HR, supply distribution, scheduling, recruitment, training and compensation, transporation, cleaning and grounds maintenance.",
      "Additionally resonsible for all logo design, web design, and marketing/advertising for the company.",
    ],
  },
];

function HeroSection({
  heroRef,
  heroScale,
  heroOpacity,
  heroY,
  heroFilter,
  markRef,
}: {
  heroRef: React.RefObject<HTMLElement | null>;
  heroScale: MotionValue<number>;
  heroOpacity: MotionValue<number>;
  heroY: MotionValue<string>;
  heroFilter: MotionValue<string>;
  markRef: (node: HTMLDivElement | null) => void;
}) {
  const flashDuration = `${6 + heroFlashNames.length * 6}s`;

  return (
    <motion.header
      ref={heroRef}
      id="hero"
      role="banner"
      className="hero-wrapper"
      style={{
        filter: heroFilter,
        opacity: heroOpacity,
        scale: heroScale,
        transformOrigin: "center center",
        y: heroY,
      }}
    >
      <div
        ref={markRef}
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

        <p
          className="-mt-sm animate-fadeInUp"
          style={{ "--fade-delay": "500ms" } as CSSProperties}
        >
          <small>current</small>
        </p>

        <div
          className="flex flex-col gap-0 relative p-lg pt-xl animate-fadeInUp"
          style={{ "--fade-delay": "750ms" } as CSSProperties}
        >
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
    </motion.header>
  );
}

function AnnouncementSection({
  opacity,
  y,
  signatureOpacity,
  signaturePathLength,
  markRef,
}: {
  opacity: MotionValue<number>;
  y: MotionValue<string>;
  signatureOpacity: MotionValue<number>;
  signaturePathLength: MotionValue<number>;
  markRef: (node: HTMLDivElement | null) => void;
}) {
  return (
    <motion.section
      id="announcements"
      className="text-center sticky inset-0 h-svh w-svw place-items-center place-content-center pointer-events-none"
      style={{ opacity, y }}
    >
      <div
        id="announcements-icon"
        className="fixed inset-0 grid h-svh w-svw place-content-center place-items-center"
      >
        <div ref={markRef}>
          <MarkIcon className="hero-icon h-2x animate-fadeInUp" />
        </div>
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
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 2260 1976"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <g transform="matrix(1,0,0,1,50,-92.3287)">
            <g transform="matrix(1.1444,0,0,1.1444,-89.5787,-139.669)">
              <motion.path
                d={signaturePath}
                fill="none"
                stroke="currentColor"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  opacity: signatureOpacity,
                  pathLength: signaturePathLength,
                }}
              />
            </g>
          </g>
        </svg>
      </div>
    </motion.section>
  );
}

function SummarySection({
  markRef,
  yearsExperience,
  summaryRef,
}: {
  markRef: (node: HTMLDivElement | null) => void;
  yearsExperience: number;
  summaryRef: React.RefObject<HTMLElement | null>;
}) {
  return (
    <section
      ref={summaryRef}
      id="summary"
      className="p-xl bg-background w-svw relative place-content-center place-items-center text-center"
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
      <div ref={markRef} className="hero-icon h-2x text-center m-xl">
        <MarkIcon className="h-full w-auto" />
      </div>
    </section>
  );
}

function TimelineCard({ entry }: { entry: HomeTimelineEntry }) {
  return (
    <div className="flex flex-col items-stretch justify-start p-xl relative scroll-marquee-item">
      <h3 className="text-md font-bold">
        <strong>{entry.company}</strong>
      </h3>

      {entry.lines.map((line, index) => (
        <p key={`${entry.company}-${index}`}>{line}</p>
      ))}

      <ul className="list-disc ml-md">
        {entry.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
}

function TimelineSection({
  timelineRef,
  timelineTrackRef,
  x,
}: {
  timelineRef: React.RefObject<HTMLElement | null>;
  timelineTrackRef: React.RefObject<HTMLDivElement | null>;
  x: MotionValue<number>;
}) {
  return (
    <section ref={timelineRef} id="timeline" className="bg-background relative">
      <GooBackgroundCanvas />
      <div className="scroll-marquee-container">
        <motion.div
          ref={timelineTrackRef}
          className="flex gap-xl items-stretch justify-start text-left w-max-content scroll-marquee relative"
          style={{ x }}
        >
          {homeTimelineEntries.map((entry) => (
            <TimelineCard key={entry.company} entry={entry} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function MichaelHurleyPage() {
  const heroRef = useRef<HTMLElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const timelineTrackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [activeSection, setActiveSection] = useState<SectionKey>("hero");
  const [timelineDistance, setTimelineDistance] = useState(0);
  const sectionMarkRefs = useRef<Record<SharedMarkSectionKey, HTMLDivElement | null>>({
    announcements: null,
    hero: null,
    summary: null,
  });
  const activeSectionRef = useRef<SectionKey>("hero");
  const canUseViewTransitionsRef = useRef(false);

  const yearsExperience = new Date().getFullYear() - 1999;

  const setSectionMarkRef = (section: SharedMarkSectionKey) => {
    return (node: HTMLDivElement | null) => {
      sectionMarkRefs.current[section] = node;
    };
  };

  const { scrollY } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({
    offset: ["start start", "end start"],
    target: heroRef,
  });
  const { scrollYProgress: summaryProgress } = useScroll({
    offset: ["start end", "end start"],
    target: summaryRef,
  });
  const { scrollYProgress: timelineProgress } = useScroll({
    offset: ["start start", "end end"],
    target: timelineRef,
  });

  const heroScale = useSpring(
    useTransform(
      heroProgress,
      [0, 0.5, 1],
      shouldReduceMotion ? [1, 1, 1] : [1, 0.2, 0.2],
    ),
    HERO_TRANSFORM_SPRING,
  );
  const heroOpacity = useTransform(
    heroProgress,
    [0, 0.5, 0.5001, 1],
    shouldReduceMotion ? [1, 1, 1, 1] : [1, 1, 0, 0],
  );
  const heroY = useTransform(
    heroProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? ["0%", "0%", "0%"] : ["0%", "50%", "50%"],
  );
  const heroGrayscale = useTransform(
    heroProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? [0, 0, 0] : [0, 1, 1],
  );
  const heroFilter = useMotionTemplate`grayscale(${heroGrayscale})`;

  const announcementsY = useTransform(
    summaryProgress,
    [0.56, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "-100%"],
  );
  const announcementsOpacity = useTransform(
    summaryProgress,
    [0.64, 1],
    shouldReduceMotion ? [1, 1] : [1, 0],
  );

  const signaturePathLength = useSpring(
    useTransform(
      summaryProgress,
      [0.12, 0.22],
      shouldReduceMotion ? [1, 1] : [0, 1],
    ),
    HERO_TRANSFORM_SPRING,
  );
  const signatureOpacity = useTransform(
    signaturePathLength,
    [0, 0.05, 1],
    [0, 1, 1],
  );

  const timelineX = useSpring(
    useTransform(
      timelineProgress,
      [0, 1],
      shouldReduceMotion ? [0, 0] : [0, -timelineDistance],
    ),
    TIMELINE_SPRING,
  );

  useEffect(() => {
    if (shouldReduceMotion) return;

    let cancelled = false;

    void Promise.all([
      import("view-transitions-toolkit/feature-detection"),
      import("view-transitions-toolkit/track-active-view-transition"),
    ]).then(([{ supports }, { trackActiveViewTransition }]) => {
      if (cancelled) return;
      canUseViewTransitionsRef.current = supports.sameDocument;
      if (supports.sameDocument) {
        trackActiveViewTransition();
      }
    });

    return () => {
      cancelled = true;
    };
  }, [shouldReduceMotion]);

  useLayoutEffect(() => {
    const track = timelineTrackRef.current;
    if (!track) return;

    const updateDistance = () => {
      setTimelineDistance(track.scrollWidth);
    };

    updateDistance();

    const resizeObserver = new ResizeObserver(updateDistance);
    resizeObserver.observe(track);
    window.addEventListener("resize", updateDistance);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateDistance);
    };
  }, []);

  const transitionSection = useEffectEvent((nextSection: SectionKey) => {
    const currentSection = activeSectionRef.current;

    if (nextSection === currentSection) return;

    const updateSection = () => {
      activeSectionRef.current = nextSection;
      setActiveSection(nextSection);
    };

    const documentWithTransitions = document as Document & {
      activeViewTransition?: ViewTransition | null;
      startViewTransition?: (callback: () => void) => ViewTransition;
    };

    const fromNode =
      currentSection === "timeline"
        ? null
        : sectionMarkRefs.current[currentSection as SharedMarkSectionKey];
    const toNode =
      nextSection === "timeline"
        ? null
        : sectionMarkRefs.current[nextSection as SharedMarkSectionKey];

    if (
      shouldReduceMotion ||
      !canUseViewTransitionsRef.current ||
      !documentWithTransitions.startViewTransition ||
      documentWithTransitions.activeViewTransition ||
      !fromNode ||
      !toNode
    ) {
      updateSection();
      return;
    }

    fromNode.style.viewTransitionName = SECTION_MARK_TRANSITION_NAME;

    const vt = documentWithTransitions.startViewTransition(() => {
      fromNode.style.viewTransitionName = "none";
      toNode.style.viewTransitionName = SECTION_MARK_TRANSITION_NAME;

      flushSync(() => {
        updateSection();
      });
    });

    void vt.finished.finally(() => {
      fromNode.style.viewTransitionName = "";
      toNode.style.viewTransitionName = "";
    });
  });

  const syncSectionState = useEffectEvent(() => {
    const nextSection: SectionKey =
      timelineProgress.get() >= 0.08
        ? "timeline"
        : summaryProgress.get() >= 0.32
          ? "summary"
          : heroProgress.get() >= 0.42
            ? "announcements"
            : "hero";

    transitionSection(nextSection);
  });

  useEffect(() => {
    const unsubscribe = scrollY.on("change", () => {
      syncSectionState();
    });

    syncSectionState();

    return () => {
      unsubscribe();
    };
  }, [scrollY]);

  return (
    <div id="top" data-active-section={activeSection}>
      <DrawStrokeSetup />
      <HeroSection
        heroRef={heroRef}
        heroFilter={heroFilter}
        heroOpacity={heroOpacity}
        heroScale={heroScale}
        heroY={heroY}
        markRef={setSectionMarkRef("hero")}
      />
      <SiteNav />

      <main role="main" id="main" className="min-h-dvh relative">
        <AnnouncementSection
          markRef={setSectionMarkRef("announcements")}
          opacity={announcementsOpacity}
          signatureOpacity={signatureOpacity}
          signaturePathLength={signaturePathLength}
          y={announcementsY}
        />
        <SummarySection
          markRef={setSectionMarkRef("summary")}
          summaryRef={summaryRef}
          yearsExperience={yearsExperience}
        />
        <TimelineSection
          timelineRef={timelineRef}
          timelineTrackRef={timelineTrackRef}
          x={timelineX}
        />
      </main>

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
