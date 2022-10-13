import { FiTag } from "react-icons/fi";

export const keyword = {
  icon: FiTag,
  name: "keyword",
  title: "Keyword",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule): void => Rule.required(),
    },
    {
      name: "slug",
      options: { source: "title" },
      title: "Slug",
      type: "slug",
      validation: (Rule): void => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      media: FiTag,
      title: title,
    }),
  },
};
