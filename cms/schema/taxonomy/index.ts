import { FiLayers } from "react-icons/fi";

export const taxonomy = {
  icon: FiLayers,
  name: "taxonomy",
  title: "Taxonomy",
  type: "document",
  description: "test",
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
      media: FiLayers,
      title: title,
    }),
  },
};
