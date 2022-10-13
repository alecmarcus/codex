// MIT License

// Copyright (c) 2020 Fabian Krutsch

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// https://github.com/Krutsch/progressive-picture/blob/master/src/progressive-picture.ts

const progessiveLoaded = new WeakSet<HTMLPictureElement>();

const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (
      entry.intersectionRatio > 0 &&
      !progessiveLoaded.has(entry.target as HTMLPictureElement)
    ) {
      const sources = entry.target.querySelectorAll("source");
      const img = entry.target.querySelector("img");
      if (!img) break;

      preload(sources, "srcset", img).then(preloadedSource => {
        if (preloadedSource) {
          progessiveLoaded.add(entry.target as HTMLPictureElement);
          return; // source element is being used -> no need to preload <img>
        }

        preload([img], "src", img).then(
          preloadedImage =>
            preloadedImage &&
            progessiveLoaded.add(entry.target as HTMLPictureElement),
        );
      });
    }
  }
});

const pictures = iteratePictures(document.body);
let current;
while ((current = pictures.nextNode() as HTMLPictureElement)) {
  observer.observe(current);
}

const DOMObserver = new MutationObserver(entries => {
  for (const entry of entries) {
    for (const node of entry.addedNodes) {
      const pictures = iteratePictures(node);
      let current;
      while ((current = pictures.nextNode() as HTMLPictureElement)) {
        observer.observe(current);
      }
    }

    for (const node of entry.removedNodes) {
      const pictures = iteratePictures(node);
      let current;
      while ((current = pictures.nextNode() as HTMLPictureElement)) {
        observer.unobserve(current);
        progessiveLoaded.delete(current);
      }
    }
  }
}).observe(document.body, { childList: true, subtree: true });

async function preload(
  imgOrSrcs: Array<HTMLImageElement> | NodeListOf<HTMLSourceElement>,
  src: string,
  img: HTMLImageElement,
) {
  // Wait until image has been loaded
  if (!img.currentSrc) {
    await {
      then: (resolve: typeof Promise.resolve) => (img.onload = resolve),
    };
  }

  for (const imgOrSrc of imgOrSrcs) {
    const currentSrc = img.currentSrc.split("/").pop();
    const maybeCurrentSrc = imgOrSrc.getAttribute(src)?.split("/").pop(); // Logic to find out which Source Element is being used

    // preload when data-src exists and when found the correct source element | fallback img
    if (imgOrSrc.dataset.src && currentSrc === maybeCurrentSrc) {
      if (imgOrSrc.dataset.src.includes(", ")) {
        // Cannot preload multiple images - try to add more source elements with media attribute.
      } else {
        const preload = new Image();
        preload.setAttribute(src, imgOrSrc.dataset.src);
        await {
          then: (resolve: typeof Promise.resolve) => (preload.onload = resolve),
        };
      }
      if (!imgOrSrc.dataset.src) continue;
      imgOrSrc.setAttribute(src, imgOrSrc.dataset.src);

      img.removeAttribute("data-src");
      // Remove attribute for any other source
      imgOrSrcs.forEach((imgOrSrc: HTMLSourceElement | HTMLImageElement) => {
        if (imgOrSrc.dataset.src) {
          imgOrSrc.setAttribute(src, imgOrSrc.dataset.src);
          imgOrSrc.removeAttribute("data-src");
        }
      });
      img.classList.add("img-progressive");

      if (img.dataset.alt) {
        img.setAttribute("alt", img.dataset.alt);
        img.removeAttribute("data-alt");
      }

      return true;
    }
  }
}

function iteratePictures(node: Node) {
  return document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT, {
    acceptNode(elem) {
      return (elem as Element).localName === "picture"
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    },
  });
}

addEventListener("afterRouting", () => {
  //@ts-ignore
  if (window.isHMR) {
    for (const img of document.body.querySelectorAll(
      "picture > img[data-src]",
    )) {
      img.removeAttribute("data-src");
    }
  }
});
