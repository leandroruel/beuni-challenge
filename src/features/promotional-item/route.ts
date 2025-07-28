import type { FastifyInstance } from "fastify";
import { create, update, getAll, getById, destroy } from "./index.ts";

export const registerPromotionalItemRoutes = (fastify: FastifyInstance) => {
  fastify.post("/api/promotional-item", create);
  fastify.patch("/api/promotional-item/:id", update);
  fastify.get("/api/promotional-item", getAll);
  fastify.get("/api/promotional-item/:id", getById);
  fastify.delete("/api/promotional-item/:id", destroy);
};
