import { FiSettings } from "react-icons/fi";

export const siteSettings = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: FiSettings,
  fields: [
    {
      description:
        "The global name of this website. Doesn't change, no matter what page a user is on.",
      name: "siteName",
      title: "Site Name",
      type: "string",
      validation: (Rule): void => Rule.required(),
    },
    {
      description:
        "The default page title across the website — what users will see in their browser tab. This value will be used as a fallback if more specific page-level info isn't available. Also used for SEO and generating previews.",
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      validation: (Rule): void => Rule.required(),
    },
    {
      description:
        "The default page description across the website. Will be used as a fallback if more specific page-level info isn't available. Mostly used for SEO and generating previews.",
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      rows: 3,
      validation: (Rule): void => Rule.required(),
    },
    {
      description:
        "The default preview image for the website — what users will see on social media. Will be used as a fallback if more specific page-level info isn't available.",
      name: "siteImage",
      title: "Site Image",
      type: "image",
      validation: (Rule): void => Rule.required(),
    },
    {
      name: "navigation",
      title: "Navigation",
      type: "array",
      validation: (Rule): void => Rule.required().unique().min(1).max(5),
      of: [
        {
          type: "navItem",
        },
      ],
    },
  ],
};
