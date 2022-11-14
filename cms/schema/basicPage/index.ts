import { FiFileText } from "react-icons/fi";

const capitalize = s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const basicPage = {
  icon: FiFileText,
  name: "basicPage",
  title: "Basic Page",
  type: "document",
  groups: [
    { name: "seo", title: "SEO" },
    { name: "content", title: "Content" },
    { name: "navigation", title: "Navigation" },
  ],
  fields: [
    {
      group: ["seo", "content", "navigation"],
      name: "pageTitle",
      title: "Title",
      type: "string",
      validation: (Rule): void => Rule.required(),
    },
    {
      description:
        "Used to create the page's URL. Changing this value after publishing the document requires Admin permissions, as it will break permalinks to this page.",
      group: "navigation",
      name: "slug",
      options: { source: "pageTitle" },
      title: "Slug",
      type: "slug",
      validation: (Rule): void => Rule.required(),
      readOnly: ({ currentUser, document, value }) => {
        const unpublished = document?._id.includes("draft");
        const isAdmin = currentUser.roles.find(
          ({ name }: { name: string }) => name === "administrator",
        );
        if (!value || isAdmin || unpublished) {
          return false;
        } else {
          return true;
        }
      },
    },
    {
      group: "seo",
      name: "pageDescription",
      rows: 3,
      title: "Description",
      type: "text",
    },
    {
      description:
        "A list of attributes that may be used to categorize this page. Not case sensitive.",
      group: ["seo", "navigation"],
      name: "tags",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      title: "Tags",
      type: "array",
    },
    {
      group: "content",
      name: "theme",
      title: "Theme",
      type: "string",
      validation: (Rule): void => Rule.required(),
      options: {
        list: [
          {
            title: "Navy",
            value: "navy",
          },
          {
            title: "Beige",
            value: "beige",
          },
        ],
      },
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
    {
      group: "navigation",
      name: "taxonomy",
      to: [{ type: "taxonomy" }],
      title: "Parent category",
      type: "reference",
    },
    {
      group: "navigation",
      name: "children",
      of: [{ type: "navItem" }],
      title: "Child pages",
      type: "array",
      validation: (Rule): void => Rule.unique().max(8),
    },
  ],
  initialValue: {
    theme: "beige",
  },
  preview: {
    select: {
      title: "pageTitle",
      media: "pageImage",
      taxonomy: "taxonomy.title",
      tag0: "tags.0",
      tag1: "tags.1",
    },
    prepare: ({ title, media, taxonomy, tag0, tag1 }) => {
      const readableTags = capitalize(
        [tag0, tag1].filter(tag => tag).join(", "),
      );

      const joiner = taxonomy && readableTags ? " • " : "";

      const subtitle = `${taxonomy ?? ""}${joiner}${readableTags}`;

      return {
        title,
        media,
        subtitle,
      };
    },
  },
};
