export type PortableText = any[];

export type NavigationItem = {
  title: string;
  to: string;
  children?: {
    title: string;
    to: string;
  }[];
};
