import { sanity } from "src/sanity";
import type { PortableText } from "src/sanity/types";

export type BasicPageData = {
  params: {
    slug: string;
  };
  props: {
    pageTitle: string;
    content: PortableText;
  };
};

export const getBasicPages = async () => {
  const query = `
  *[_type == "basicPage"]{
    "params": {
      "slug": slug.current
    },
    "props": {
      pageTitle,
      content
    }
  }`;

  const data: BasicPageData = await sanity.fetch(query);

  return data;
};
