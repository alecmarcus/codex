import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import { basicPage } from "./basicPage";
import { blockEditor } from "./blockEditor";
import { siteSettings } from "./siteSettings";
import { taxonomy } from "./taxonomy";
import { home } from "./home";
import { navItem } from "./siteSettings/navItem";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    basicPage,
    blockEditor,
    home,
    taxonomy,
    navItem,
    siteSettings,
  ]),
});
