import { FiHome } from "react-icons/fi";

export const home = {
  icon: FiHome,
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "seo", title: "SEO" },
    { name: "content", title: "Content" },
  ],
  fields: [
    {
      name: "pageTitle",
      title: "Title",
      type: "string",
      validation: (Rule): void => Rule.required(),
    },
    {
      group: "seo",
      name: "pageDescription",
      rows: 3,
      title: "Description",
      type: "text",
    },
    {
      group: "content",
      name: "pageImage",
      title: "Image",
      type: "image",
    },
    {
      group: "content",
      name: "content",
      of: [{ type: "block" }],
      title: "Content",
      type: "array",
      validation: (Rule): void => Rule.required(),
    },
  ],
};
