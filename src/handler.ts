import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { Static } from "@sinclair/typebox";
import Pino from "pino-http";
import type { Logger } from "pino";

const pino = Pino();

const ajv = addFormats(new Ajv({}), [
  "date-time",
  "time",
  "date",
  "email",
  "hostname",
  "ipv4",
  "ipv6",
  "uri",
  "uri-reference",
  "uuid",
  "uri-template",
  "json-pointer",
  "relative-json-pointer",
  "regex"
])
  .addKeyword("kind")
  .addKeyword("modifier");

const corsHandler = Cors();
const cors = (req: NextApiRequest, res: NextApiResponse) =>
  new Promise<void>((resolve, reject) =>
    corsHandler(req, res, (err) => (err instanceof Error ? reject(err) : resolve()))
  );

export type Request = NextApiRequest & { log: Logger };
export type Response = NextApiResponse;

export type GetHandler = (request: Request, response: Response) => Promise<void> | void;
export type PostRequest<Schema> = Omit<Request, "body"> & { body: Schema };
export type PostHandler<Schema> = (
  request: PostRequest<Schema>,
  response: Response
) => Promise<void> | void;

/**
 * `GET` route with logging + CORS
 */
export default function handler(callback: GetHandler) {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    pino(request, response);
    cors(request, response);

    if (request.method !== "GET") return response.status(404).end();
    return callback(request, response);
  };
}
/**
 * `POST` route with logging + CORS + validated body
 */
handler.post = <Schema>(schema: Schema, callback: PostHandler<Static<Schema>>) => {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    pino(request, response);
    cors(request, response);

    if (request.method === "OPTIONS") return;
    if (request.method !== "POST") return response.status(404).end();
    if (!ajv.validate(schema, request.body)) {
      return response.status(400).send({ error: ajv.errorsText() });
    }
    return callback(request, response);
  };
};
