import fastify from "fastify";
import cors from "fastify-cors";
import router from "./router";

export async function start() {
  fastify({ logger: true })
    .register(cors)
    .register(router)
    .listen(3000, "0.0.0.0", (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
}
