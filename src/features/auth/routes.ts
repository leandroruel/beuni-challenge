import type { FastifyInstance } from "fastify";
import { auth } from "../../auth.ts";

export async function registerAuthRoutes(fastify: FastifyInstance) {
  // Rota Better Auth padrão
  fastify.route({
    method: ["GET", "POST"],
    url: "/api/auth/*",
    async handler(request, reply) {
      try {
        const url = new URL(request.url, `http://${request.headers.host}`);
        const headers = new Headers();
        Object.entries(request.headers).forEach(([key, value]) => {
          if (value) headers.append(key, value.toString());
        });

        const req = new Request(url.toString(), {
          method: request.method,
          headers,
          body: request.body ? JSON.stringify(request.body) : undefined,
        });

        const response = await auth.handler(req);
        response.headers.forEach((value: string, key: string) =>
          reply.header(key, value),
        );
        reply.status(response.status);
        const text = await response.text();
        reply.send(text);
      } catch (err) {
        reply.status(500).send({ error: "Auth proxy error", details: err });
      }
    },
  });
}
