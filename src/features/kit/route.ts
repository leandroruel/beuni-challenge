import { create, update, destroy, getAll, getById } from "./index.ts";
import type { FastifyInstance } from "fastify";

export const registerKitRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/api/kit", create);
  fastify.get("/api/kit", getAll);
  fastify.get("/api/kit/:id", getById);
  fastify.patch("/api/kit/:id", update);
  fastify.delete("/api/kit/:id", destroy);
};
