import { create, getAll, getById, update, destroy } from "./index.ts";
import type { FastifyInstance } from "fastify";

export const registerCompanyRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/api/company", getAll);
  fastify.get("/api/company/:id", getById);
  fastify.post("/api/company", create);
  fastify.patch("/api/company/:id", update);
  fastify.delete("/api/company/:id", destroy);
};
