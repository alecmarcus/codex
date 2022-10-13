import urlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/asset-utils";

import { sanity } from ".";

const builder = urlBuilder(sanity);

export const imageURL = (
  source: SanityImageSource,
): {
  lowRes: (width: number) => string;
  fullRes: (width: number) => string;
  builder: typeof builder;
} => ({
  lowRes: width =>
    builder
      .image(source)
      .fit("max")
      .width(width / 4)
      .dpr(window.devicePixelRatio)
      .quality(50)
      .auto("format")
      .url(),
  fullRes: width =>
    builder
      .image(source)
      .fit("max")
      .width(width)
      .dpr(window.devicePixelRatio)
      .auto("format")
      .url(),
  builder: builder.image(source),
});
