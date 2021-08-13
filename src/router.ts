import type {
  FastifyInstance,
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

export const setup = (server: FastifyInstance) => {
  // this globs all files under `routes`,
  // treating the default export as the route options
  // and the path relative to `routes` as the URL
  // e.g. `routes/credentials.ts` becomes `/credentials`

  for (const route of glob.sync("**/*.route.js", { cwd: path.join(__dirname, "routes") })) {
    const name = route.substring(0, route.length - ".route.js".length);
    console.log(name);
    server.route<{ Body: {} }>({
      ...require(`./routes/${name}.route`).default,
      url: "/" + name
    });
  }
};
