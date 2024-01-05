import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text } from "@keystone-6/core/fields";

import { type Lists } from ".keystone/types";
import { createdAtField, updatedAtField } from "../admin/helpers/fields";

export const Store: Lists.Store = list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    description: text({}),
    createdAt: createdAtField(),
    updatedAt: updatedAtField(),
  },
});
