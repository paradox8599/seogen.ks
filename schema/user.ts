import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, password } from "@keystone-6/core/fields";

import { type Lists } from ".keystone/types";
import { createdAtField, updatedAtField } from "../admin/helpers/fields";

export const User: Lists.User = list({
  access: allowAll,
  fields: {
    name: text({}),
    email: text({ validation: { isRequired: true }, isIndexed: "unique" }),
    password: password({ validation: { isRequired: true } }),
    createdAt: createdAtField(),
    updatedAt: updatedAtField(),
  },
});
