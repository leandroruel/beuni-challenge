import type { FastifyInstance } from "fastify";
import { getAll, getById, create, update, destroy } from "./index.ts";

export const registerEmployeeRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/api/employee", getAll);
  fastify.get("/api/employee/:id", getById);
  fastify.post("/api/employee", create);
  fastify.patch("/api/employee/:id", update);
  fastify.delete("/api/employee/:id", destroy);
};
