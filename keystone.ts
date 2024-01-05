import "dotenv/config";

import { config } from "@keystone-6/core";
import { NextApiResponse } from "next";

import { session, withAuth } from "./auth";
import { lists } from "./schema/_lists";
import {
  DATABASE_URL,
  DB_PROVIDER,
  GRAPHQL_PATH,
  KS_PORT,
} from "./src/lib/variables";
import { Context } from '.keystone/types'

function withContext<F extends (req: Request, res: NextApiResponse, context: Context) => void>(
  commonContext: Context,
  f: F
) {
  return async (req: any, res: any) => {
    return f(req, res, await commonContext.withRequest(req, res))
  }
}

export default withAuth(
  config({
    server: {
      port: KS_PORT,
      extendExpressApp: (app, context) => {
        app.get("/x/ok", withContext(context, async (req, res, ctx) => {
          res.json(ctx.session)
        }))
      },
    },
    ui: {
      // fix: AdminMeta access denied when login to admin ui
      isAccessAllowed: (context) => !!context.session,
    },
    db: {
      provider: DB_PROVIDER,
      url: DATABASE_URL,
    },
    lists,
    graphql: { path: GRAPHQL_PATH },
    session,
  })
);
