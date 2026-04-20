import { z } from "zod";

const project: z.infer<typeof projectSchema> = {
  url: "https://michaelhurley.localhost",
  title: "Michael Hurley",
  logo: "/profile/logo.svg",
  address: {
    street: "127 Lonely Violet Lane",
    city: "Sylva",
    state: "NC",
    zip: "28779",
    country: "USA",
    coordinates: {
      latitude: 35.3765942,
      longitude: -83.1836358,
    },
  },
  place: "https://maps.app.goo.gl/TKr3eLkCmJhz12ce6",
  phone: "+18285931935",
  email: "sales@hustlelaunch.com",
  description:
    "Business operations, growth, design, and software development profile for Michael Hurley.",
  author: {
    name: "Michael C Hurley",
    url: "https://www.michaelchurley.com",
    github: "https://github.com/michaelmonetized",
  },
};

const projectSchema = z.object({
  url: z.string().url(),
  title: z
    .string()
    .min(1, "Title is required")
    .describe("The title of the website, typically the name of the business"),
  logo: z
    .string()
    .min(1, "Logo is required as a path or url to an image")
    .describe("The logo of the website, typically the name of the business"),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z
      .string()
      .min(2, "State is required")
      .max(2, "State must be 2 characters"),
    zip: z.string().min(1, "Zip is required"),
    country: z.string().min(1, "Country is required"),
    coordinates: z.object({
      latitude: z
        .number()
        .min(-90, "Latitude must be between -90 and 90")
        .max(90, "Latitude must be between -90 and 90"),
      longitude: z
        .number()
        .min(-180, "Longitude must be between -180 and 180")
        .max(180, "Longitude must be between -180 and 180"),
    }),
  }),
  place: z
    .string()
    .url()
    .min(1, "Place is required")
    .max(255, "Place must be less than 255 characters")
    .describe(
      "The google maps place url of the business eg https://maps.app.goo.gl/TKr3eLkCmJhz12ce6",
    ),
  phone: z
    .string()
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      "Phone number must be a valid international phone number",
    )
    .min(1, "Phone number is required")
    .max(15, "Phone number must be less than 15 characters")
    .describe("The phone number of the business eg +18285931935"),
  email: z
    .string()
    .email("Email must be a valid email")
    .min(1, "Email is required")
    .max(255, "Email must be less than 255 characters")
    .describe("The email of the business eg sales@hustlelaunch.com"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be less than 1000 characters")
    .describe(
      "A short description of the business eg Modern web design and strategic marketing for emerging brands.",
    ),
  author: z.object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(255, "Name must be less than 255 characters")
      .describe("The name of the human author eg Michael Hurley"),
    url: z
      .string()
      .url()
      .min(1, "Url is required")
      .max(255, "Url must be less than 255 characters")
      .describe("The url of the author eg https://www.michaelchurley.com"),
    github: z
      .string()
      .url()
      .min(1, "Github is required")
      .max(255, "Github must be less than 255 characters")
      .describe(
        "The github of the author eg https://github.com/michaelmonetized",
      ),
  }),
});

export { project, projectSchema };
