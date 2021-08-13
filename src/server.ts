import fastify from "fastify";
import cors from "fastify-cors";
import * as router from "./router";

export async function start() {
  const server = fastify({ logger: true });
  server.register(cors);
  router.setup(server);
  server.listen(3000, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
}
