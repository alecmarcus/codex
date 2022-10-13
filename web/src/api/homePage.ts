import { sanity } from "src/sanity";

export const getHomePage = async () => {
  const query = `*[_type == "homePage"][0]`;
  const data = await sanity.fetch(query);
  return data;
};
