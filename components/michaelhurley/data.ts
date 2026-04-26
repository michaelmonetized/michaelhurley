export type TimelinePhotoEntry = {
  kind: "photo";
  title: string;
  src: string;
  imageClassName?: string;
};

export type TimelineDoublePhotoEntry = {
  kind: "doublePhoto";
  photos: Array<{
    title: string;
    src: string;
    imageClassName?: string;
  }>;
};

export type TimelineRoleEntry = {
  kind: "role";
  company: string;
  meta: string[];
  bullets: string[];
  logoSrc?: string;
  logoPlacement?: "header" | "footer";
  logoClassName?: string;
};

export type TimelineEntry =
  | TimelinePhotoEntry
  | TimelineDoublePhotoEntry
  | TimelineRoleEntry;

export const heroFlashNames = [
  "spring",
  "night",
  "fall",
  "winter",
  "wireframe",
] as const;

export const menuImages = [
  {
    src: "/profile/landscape-spring.jpeg",
    alt: "Spring landscape",
    className: "aspect-portrait object-left-bottom object-cover",
  },
  {
    src: "/profile/michael.jpeg",
    alt: "Michael Hurley portrait",
    className: "aspect-portrait object-cover",
  },
  {
    src: "/profile/photos/happy-sandwich.jpg",
    alt: "Michael with a sandwich",
    className: "aspect-portrait object-cover",
  },
  {
    src: "/profile/photos/young.JPG",
    alt: "Young Michael Hurley portrait",
    className: "aspect-portrait object-right-top object-cover",
  },
] as const;

export const timelineEntries: TimelineEntry[] = [
  {
    kind: "photo",
    title: "Lilu 2014",
    src: "/profile/photos/lilu-2014.jpg",
    imageClassName: "block",
  },
  {
    kind: "role",
    company: "Hustle Launch",
    logoSrc:
      "https://www.hustlelaunch.com/assets/images/Hustle-Launch-Logo.svg?dpl=dpl_7RAfiA23631X2sQEbMUV4ze3VV8g",
    logoPlacement: "header",
    meta: ["Director, 02/2024 - Present", "MRR $70k"],
    bullets: [
      "Oversee all aspects of the company's success, including but not limited to: sales, marketing, finance, human resources, and technology.",
      "Responsible for the company's growth and success.",
      "Manage the company's finances, including but not limited to: revenue, expenses, and cash flow.",
      "Manage the company's human resources, including but not limited to: employee recruitment, training, and development.",
      "Manage the company's technology, including but not limited to: software development, hardware, and infrastructure.",
    ],
  },
  {
    kind: "doublePhoto",
    photos: [
      {
        title: "CHADDY 2020",
        src: "/profile/photos/chad.jpg",
        imageClassName: "block aspect-video object-cover object-right-top",
      },
      {
        title: "Chicken 2021",
        src: "/profile/photos/chicken.jpg",
        imageClassName: "block aspect-portrait object-cover",
      },
    ],
  },
  {
    kind: "role",
    company: "Kaibo, LLC D/B/A Realay.com",
    logoSrc: "https://realay.com/realay-logo.svg",
    logoPlacement: "header",
    logoClassName: "filter grayscale brightness-[50000%] contrast-[100]",
    meta: [
      "Chief Technology Officer, 03/2023 - 04/2024",
      "Salary: $60k++/yr",
    ],
    bullets: [
      "Responsible for the development and maintenance of the company's technology, including but not limited to: infrastructure, database design, software engineering, user experience, design, video production, investment acquisition, direct to customer marketing, sales and growth strategy.",
      "Support c-suite with technology and infrastructure for analyzing and monitoring operations, usage, and performance.",
      "Support clients with usability, maintenance, and direct technical support for onboarding, integration, and troubleshooting.",
      "Collaborate with clients to develop and implement solutions to meet their needs.",
    ],
  },
  {
    kind: "photo",
    title: "Engagement 2025",
    src: "/profile/photos/engaged.jpeg",
    imageClassName: "block aspect-portrait object-cover",
  },
  {
    kind: "role",
    company: "White Fox Studios",
    logoSrc:
      "https://www.whitefoxstudios.net/wp-content/uploads/elementor/thumbs/favicon-r6hb7lahwugs27wikj147kj6c5tllpdfevpdkqjiv0.png",
    logoPlacement: "footer",
    meta: [
      "Director, 02/2015 - 02/2024",
      "Salary: $28k/yr - $60k++/yr",
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
    kind: "doublePhoto",
    photos: [
      {
        title: "Highlands 2023",
        src: "/profile/photos/innocent.jpeg",
        imageClassName: "block aspect-portrait object-cover object-right-top",
      },
      {
        title: "Sylva 2019",
        src: "/profile/photos/sylva-2019.jpg",
        imageClassName: "block aspect-square object-cover",
      },
    ],
  },
  {
    kind: "role",
    company: "Papa John's Waynesville/Franklin, NC",
    logoSrc:
      "https://www.papajohns.com/static-assets/franchise/images/logo-small-new-brand.svg",
    logoPlacement: "header",
    logoClassName: "filter saturate-0 brightness-[10000%]",
    meta: [
      "Franchisee Partner, 06/2014 - 02/2015",
      "Salary: $7.50/h - $27k/yr",
    ],
    bullets: [
      "Responsible for the management of the store's operations, including but not limited to: scheduling, customer service, inventory, sales, recruitment, human resources, cost analysis, budgeting and reporting to franchisee and corporate.",
      "Manage the store's finances, including but not limited to: revenue, expenses, and cash flow.",
      "Manage the store's sales, marketing, and customer satisfaction.",
    ],
  },
  {
    kind: "photo",
    title: "Hanging Around 2022",
    src: "/profile/photos/hung.JPG",
    imageClassName: "block aspect-video object-cover",
  },
  {
    kind: "role",
    company: "Hurley's Creekside Dining & Rhum Bar",
    logoSrc:
      "https://web.archive.org/web/20130602155744im_/http://hurleysmaggievalley.com/img/logo.png",
    logoPlacement: "header",
    meta: [
      "Co-Owner/Operator, 07/2010 - 05/2014",
      "AGR: $1.3M - $5.33M",
      "Acquired Arthur Robert Frady & Sons",
    ],
    bullets: [
      "Responsible for all aspects of the restaurant's success, including but not limited to: brand design, marketing, finance, human resources, and technology.",
      "Manage the restaurant's finances, including but not limited to: revenue, expenses, and cash flow.",
      "Manage the restaurant's human resources, including but not limited to: employee recruitment, training and working all positions, and development.",
      "Manage the restaurant's technology, including but not limited to: software, hardware, and infrastructure.",
      "Manage the restaurant's marketing, including but not limited to: advertising, social media, and public relations.",
      "Manage the restaurant's branding, including but not limited to: logo, web, menu design, presentation, interior design, and signage.",
    ],
  },
  {
    kind: "doublePhoto",
    photos: [
      {
        title: "Highlands 2024",
        src: "/profile/photos/coffee.jpg",
        imageClassName: "block aspect-square object-cover",
      },
      {
        title: "Sylva 2021",
        src: "/profile/photos/lift.jpg",
        imageClassName: "block aspect-square object-cover",
      },
    ],
  },
  {
    kind: "role",
    company: "StudioTWLEVE",
    logoSrc: "/profile/photos/ny-2009.jpg",
    logoPlacement: "header",
    logoClassName: "block aspect-video object-cover",
    meta: [
      "Director, 01/2007 - 07/2010",
      "ANP: $50k - $387k",
      "Acquired TB Creative",
    ],
    bullets: [
      "Responsible for all aspects of the studio's success, including but not limited to: brand design, marketing, finance, human resources, and technology.",
      "Manage the studio's finances, including but not limited to: revenue, expenses, and cash flow.",
      "Manage the studio's human resources, including but not limited to: employee recruitment, training, and development.",
      "Manage the studio's technology, including but not limited to: software, hardware, and infrastructure.",
      "Manage the studio's marketing, including but not limited to: advertising, social media, and public relations.",
      "Manage the studio's branding, including but not limited to: logo, web, menu design, presentation, interior design, and signage.",
    ],
  },
  {
    kind: "photo",
    title: "Nakomis 2019",
    src: "/profile/photos/lilu-beach.jpg",
    imageClassName: "block aspect-portrait object-cover",
  },
  {
    kind: "role",
    company: "Signs 'R' Us",
    logoSrc: "/profile/signsrus.com.png",
    logoPlacement: "footer",
    meta: [
      "Production Manager, 07/2003 - 01/2007",
      "Salary: $10.50/h - $42k/yr",
    ],
    bullets: [
      "Responsible for all sign design and production, including but not limited to: design team output, production, packaging, equipment maintenance, and supplies.",
      "Design team output: design review, customer feedback, and revisions.",
      "Production and packaging: ensure the quality of materials, the final product, and presentation.",
      "Equipment maintenance: repair, maintain, and replace equipment as needed.",
      "Supplies: manage raw material inventory.",
    ],
  },
  {
    kind: "doublePhoto",
    photos: [
      {
        title: "Graveyard Fields 2026",
        src: "/profile/photos/fall.jpeg",
        imageClassName: "block aspect-portrait object-cover",
      },
      {
        title: "Charleston 2025",
        src: "/profile/photos/load.jpeg",
        imageClassName: "block aspect-video object-cover",
      },
    ],
  },
  {
    kind: "role",
    company: "Corporate Cleaning Services, Inc.",
    logoSrc:
      "https://web.archive.org/web/20110208062446im_/http://corporatecleaningservicesinc.com/images/bg_header.jpg",
    logoPlacement: "header",
    meta: [
      "Regional Manager, 06/1996 - 06/2003",
      "Salary: $7.50/h - $35k/yr",
    ],
    bullets: [
      "Responsible for all customer satisfaction for clients throughout the greater South Carolina lowcountry area, including team management and deployment, crisis response, HR, supply distribution, scheduling, recruitment, training, compensation, transportation, cleaning, and grounds maintenance.",
      "Additionally responsible for logo design, web design, and marketing and advertising for the company.",
    ],
  },
  {
    kind: "photo",
    title: "circa 1993",
    src: "/profile/photos/young.JPG",
    imageClassName: "block aspect-portrait object-cover",
  },
];

export const skillGroups = [
  {
    title: "Management",
    items: [
      "Leadership",
      "Strategy",
      "Operations",
      "Sales",
      "Marketing",
      "Growth",
    ],
  },
  {
    title: "Technology",
    items: [
      "Software Development",
      "Web Development",
      "Graphic Design",
      "UI/UX Design",
      "Content Creation",
      "Video Editing",
    ],
  },
  {
    title: "Marketing",
    items: ["Branding", "Web Design", "Messaging", "Strategy", "Distribution"],
  },
  {
    title: "Sales",
    items: [
      "Direct to Customer + B2B",
      "Strategy",
      "Closing",
      "Retention",
      "Reputation",
    ],
  },
] as const;

export const developmentGroups = [
  {
    title: "Languages",
    items: [
      "C/C++/Objective-C/Zig/Swift",
      "Python/Perl/Ruby",
      "PHP/SQL/HTML/CSS",
      "JavaScript/TypeScript",
    ],
  },
  {
    title: "Frameworks",
    items: [
      "React/Next.js",
      "WordPress + Elementor",
      "Laravel/Symfony",
      "Drupal/Joomla/Elgg",
    ],
  },
  {
    title: "Tools",
    items: ["LazyGit/Git/GitHub", "AWS/GCP", "Vercel", "zsh/tmux/neovim"],
  },
] as const;

export const galleryCards = Array.from({ length: 24 }, (_, index) => {
  const accents = [
    "var(--color-peach)",
    "var(--color-sapphire)",
    "var(--color-yellow)",
    "var(--color-lavender)",
  ];

  return {
    id: index + 1,
    accent: accents[index % accents.length],
    liveUrl: "https://barbquewagon.vercel.app",
    repoUrl: "https://github.com/michaelmonetized/barbquewagon.com",
    title: "Bar-B-Que Wagon",
    subtitle: "Brand, UX, and conversion-driven front-end",
    screenshotSrc: "/profile/screenshots/bar-b-que-wagon.jpg",
  };
});
