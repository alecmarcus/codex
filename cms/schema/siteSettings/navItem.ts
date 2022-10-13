export const navItem = {
  name: "navItem",
  title: "Nav Item",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Optional. If omitted, will use the page title.",
    },
    {
      name: "to",
      title: "To",
      to: { type: "basicPage" },
      type: "reference",
      validation: (Rule): void => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
      pageTitle: "to.pageTitle",
      media: "to.pageImage",
    },
    prepare: ({ title, pageTitle, media }) => {
      return {
        title: title || pageTitle,
        media,
      };
    },
  },
};
