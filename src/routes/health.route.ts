import { create } from "../router";

export default create({
  method: "GET",
  handler: async (_, res) => {
    res.status(204);
  }
});
