import { create } from "../../router";
import { Static, Type } from "@sinclair/typebox";
import snowflake from "snowflake-sdk";

snowflake.configure({ ocspFailOpen: false });

type ConnectionOptions = Omit<snowflake.ConnectionOptions, "account"> & { accessUrl: string };
const testCredentials = (options: ConnectionOptions) =>
  new Promise<void>((resolve, reject) => {
    snowflake.createConnection(options as any).connect((error, conn) => {
      conn.destroy(() => {});
      if (error) reject(error);
      else resolve();
    });
  });

const Body = Type.Object({
  hostname: Type.String(),
  port: Type.Number(),
  username: Type.String(),
  password: Type.String(),
  database: Type.String(),
  schema: Type.Optional(Type.String()),
  warehouse: Type.Optional(Type.String())
});
type Body = Static<typeof Body>;

export default create<Body>({
  method: "POST",
  schema: { body: Body },
  handler: async (req) => {
    try {
      await testCredentials({
        accessUrl: `${req.body.hostname}:${req.body.port}`,
        username: req.body.username,
        password: req.body.password,
        database: req.body.password,
        schema: req.body.schema,
        warehouse: req.body.warehouse
      });
      return { success: true };
    } catch (error) {
      req.log.trace(error);
      return { success: false };
    }
  }
});
