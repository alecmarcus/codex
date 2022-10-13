import client from "@sanity/client";

export const sanity = client({
  projectId: "26p2c0pc",
  dataset: import.meta.env.PROD ? "production" : "staging",
  apiVersion: "2022-10-09",
  useCdn: import.meta.env.PROD,
});
