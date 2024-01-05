import { graphql, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, text, virtual } from "@keystone-6/core/fields";

import { type Lists } from ".keystone/types";
import { createdAtField, updatedAtField } from "../admin/helpers/fields";

export const Task: Lists.Task = list({
  access: allowAll,
  fields: {
    name: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve: () => {
          // TODO: format name
          return 'name'
        },
      }),
    }),
    description: text({}),
    store: relationship({ ref: "Store", many: false }),
    createdAt: createdAtField(),
    updatedAt: updatedAtField(),
  },
});

