import * as snowflake from "@lib/snowflake";
import handler from "@lib/handler";
import { Static, Type } from "@sinclair/typebox";

const Credentials = Type.Object({
  host: Type.String({ format: "uri" }),
  port: Type.Number(),
  username: Type.String(),
  password: Type.String(),
  database: Type.String(),
  schema: Type.Optional(Type.String()),
  warehouse: Type.Optional(Type.String())
});

const prepareCredentials = (data: Static<typeof Credentials>) => ({
  accessUrl: `${data.host}:${data.port}`,
  username: data.username,
  password: data.password,
  database: data.database,
  schema: data.schema,
  warehouse: data.warehouse
});

const testCredentials = (options: any) => {
  return new Promise<boolean>((resolve) => {
    snowflake.createConnection(options).connect((error, conn) => {
      conn.destroy(() => {});
      resolve(!error);
    });
  });
};

export default handler.post(Credentials, async (req, res) => {
  res.status(200).send({
    success: await testCredentials(prepareCredentials(req.body))
  });
});
