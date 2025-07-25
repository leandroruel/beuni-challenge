import { createKit, getAllKits, getKitById, updateKit, deleteKit } from "./service.ts";
import { kitInsertSchema } from "./schema.ts";
import type { FastifyRequest, FastifyReply } from "fastify";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const body = request.body;

  const parseResult = kitInsertSchema.safeParse(body);

  if (!parseResult.success) {
    return reply.status(400).send({ error: parseResult.error.message });
  }

  const kitData = parseResult.data;

  const result = await createKit(kitData);
  return reply.send(result);
};

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const body = request.body;
  const parseResult = kitInsertSchema.safeParse(body);
  if (!parseResult.success) {
    return reply.status(400).send({ error: parseResult.error.message });
  }
  const kitData = parseResult.data;
  const updatedKit = await updateKit(id, kitData);
  if (!updatedKit) {
    return reply.status(404).send({ error: "Kit not found" });
  }
  return reply.send(updatedKit);
};

export const getAll = async (request: FastifyRequest, reply: FastifyReply) => {
  const kits = await getAllKits();
  return reply.send(kits);
};

export const getById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };

  if (!id) {
    return reply.status(400).send({ error: "ID is required" });
  }

  const kit = await getKitById(id);

  if (!kit) {
    return reply.status(404).send({ error: "Kit not found" });
  }

  return reply.send(kit);
};

export const destroy = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };

  if (!id) {
    return reply.status(400).send({ error: "ID is required" });
  }

  const deletedKit = await deleteKit(id);

  if (!deletedKit) {
    return reply.status(404).send({ error: "Kit not found" });
  }

  return reply.send({ message: "Kit deleted successfully", kit: deletedKit });
}
