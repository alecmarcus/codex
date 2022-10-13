import defaultResolve from "part:@sanity/base/document-actions";
import { singletonSchemes } from "../constants";

const singletonActions = ["PublishAction", "DiscardChangesAction"];

const resolveDocumentActions = (props) => {
  // return [...defaultResolve(props)];

  // There is a bug that removes the publish button on deployed studios
  // when using custom actions. Disabling for now.
  if (singletonSchemes.includes(props.type)) {
    return [...defaultResolve(props)].filter((action) =>
      singletonActions.includes(action.name)
    );
  } else {
    return [...defaultResolve(props)];
  }
};

export default resolveDocumentActions;
