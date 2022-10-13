import { sanity } from "src/sanity";
import type { SanityImageSource } from "@sanity/asset-utils";
import type { NavigationItem } from "src/sanity/types";

export type SiteSettingsData = {
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  siteImage: SanityImageSource;
  navigation: NavigationItem[];
};

export const getSiteSettings = async () => {
  const query = `
  *[_type == "siteSettings"]{
    siteName,
    siteTitle,
    siteDescription,
    siteImage,
    navigation[] {
      "title": select(
        defined(title) => title,
        !defined(title) => to->pageTitle,
      ),
      "to": to->slug.current,
      "children": to->children[] {
        "title": select(
          defined(title) => title,
          !defined(title) => to->pageTitle,
        ),
        "to": to->slug.current,
      }
    }
  }[0]`;

  const data: SiteSettingsData = await sanity.fetch(query);

  return data;
};
