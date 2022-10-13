import S from "@sanity/desk-tool/structure-builder";
import { FiSettings } from "react-icons/fi";
import { singletonSchemes } from "../constants";

const filterSingletonSchemes = (listItem, include: boolean) =>
  include === singletonSchemes.includes(listItem.getId());

export default () =>
  S.list()
    .title("Content")
    .items([
      // All repeatable schema as folders of documents
      ...S.documentTypeListItems().filter((d) =>
        filterSingletonSchemes(d, false)
      ),

      // Divider
      S.divider(),

      // All singleton schema as single documents
      ...S.documentTypeListItems()
        .filter((d) => filterSingletonSchemes(d, true))
        .map((d) =>
          S.listItem()
            .title(d.getTitle())
            .child(
              S.document()
                .schemaType(d.getId())
                .documentId(`${d.getId()}-singleton`)
                .title(d.getTitle())
            )
            // @ts-ignore Legacy typing in vendor package is broken.
            .icon(d.getSchemaType().icon ?? FiSettings)
        ),
    ]);
