import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import { basicPage } from "./basicPage";
import { blockEditor } from "./blockEditor";
import { siteSettings } from "./siteSettings";
// import { keyword } from "./keyword";
import { home } from "./home";
import { navItem } from "./siteSettings/navItem";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    basicPage,
    blockEditor,
    home,
    // keyword,
    navItem,
    siteSettings,
  ]),
});
