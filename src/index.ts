import Fastify from "fastify";
import process from "node:process";
import fastifyCors from "@fastify/cors";
import { registerAuthRoutes } from "./features/auth/routes.ts";
import { registerKitRoutes } from "./features/kit/route.ts";
import { registerCompanyRoutes } from "./features/company/route.ts";
import { registerEmployeeRoutes } from "./features/employee/route.ts";
import { registerPromotionalItemRoutes } from "./features/promotional-item/route.ts";

const fastify = Fastify({ logger: true });

await fastify.register(fastifyCors, {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400,
});

await registerAuthRoutes(fastify);
await registerKitRoutes(fastify);
await registerCompanyRoutes(fastify);
await registerEmployeeRoutes(fastify);
await registerPromotionalItemRoutes(fastify);

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    fastify.log.info(`Server running in http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
