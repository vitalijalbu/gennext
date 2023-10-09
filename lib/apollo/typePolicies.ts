import { TypePolicies } from "@apollo/client";
import { KeyFieldsFunction } from "@apollo/client/cache/inmemory/policies";
import subTypes from "lib/apollo/subTypes.json";
import { offsetLimitPagination } from "@apollo/client/utilities";

const keyFields: KeyFieldsFunction = (obj) => {
  const { __typename, id, siteId } = obj;

  if (__typename && id && siteId) return `${__typename}:${id}:${siteId}`;
  if (__typename && id) return `${__typename}:${id}`;
  return false;
};

const keyFieldPolicies = Array.isArray(subTypes)
  ? subTypes.reduce((acc, curr) => {
      return {
        ...acc,
        [curr]: { keyFields }
      };
    }, {} as TypePolicies)
  : {};

const otherTypePolicies: TypePolicies = {
  // Query: {
  //   fields: {
  //     entries: offsetLimitPagination(["section", "site"])
  //   }
  // }
};

const typePolicies = {
  ...keyFieldPolicies,
  ...otherTypePolicies
};

export default typePolicies;
