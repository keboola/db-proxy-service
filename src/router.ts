import type {
  FastifyInstance,
  FastifyPluginOptions,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteOptions
} from "fastify";
import path from "path";
import glob from "glob";

export const create = <Body = unknown>(
  route: Omit<
    RouteOptions<
      RawServerDefault,
      RawRequestDefaultExpression,
      RawReplyDefaultExpression,
      { Body: Body }
    >,
    "url"
  >
) => route;

export default (
  server: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error) => void
) => {
  // this globs all `*.route.js` files under `routes`,
  // treating the default export as the route options
  // and the path relative to `routes` as the URL
  // e.g. `routes/credentials.ts` becomes `/credentials`
  server.log.info("Initializing router");
  for (const route of glob.sync("**/*.route.js", { cwd: path.join(__dirname, "routes") })) {
    // strip the suffix
    const name = route.substring(0, route.length - ".route.js".length);
    const options = require(`./routes/${name}.route`).default;
    server.log.info(`Created route ${options.method} /${name}`);
    server.route<{ Body: {} }>({
      ...options,
      url: "/" + name
    });
  }
  done();
};
