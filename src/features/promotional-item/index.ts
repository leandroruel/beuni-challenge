import type { FastifyRequest, FastifyReply } from "fastify";
import {
  createPromotionalItem,
  updatePromotionalItem,
  getAllPromotionalItems,
  getPromotionalItemById,
  deletePromotionalItem,
  exists,
} from "./service.ts";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { promotionalItem } from "../../db/schema/promotional_item.ts";
import { ERROR_CODES } from "../../utils/constants.ts";

/**
 * @description Creates a new promotional item.
 * @example
 * // POST /api/promotional-item
 * create(request, reply)
 * @returns The created promotional item object.
 */
export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const body = request.body;
  const schema = createInsertSchema(promotionalItem);
  const parseResult = schema.safeParse(body);

  if (!parseResult.success) {
    return reply.status(400).send({ error: parseResult.error.message });
  }

  if (await exists(parseResult.data.name)) {
    return reply.status(400).send({ error: "Promotional item already exists" });
  }

  const itemData = parseResult.data;
  const result = await createPromotionalItem(itemData);
  return reply.send(result);
};

/**
 * @description Updates an existing promotional item by ID.
 * @example
 * // PATCH /api/promotional-item/:id
 * update(request, reply)
 * @returns The updated promotional item object or error if not found.
 */
export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id: idParam } = request.params as { id: string };
  const id = parseInt(idParam, 10);

  if (isNaN(id)) {
    return reply.status(400).send({ error: "Invalid ID parameter" });
  }

  const body = request.body;
  const schema = createUpdateSchema(promotionalItem);
  const parseResult = schema.safeParse(body);

  if (!parseResult.success) {
    return reply.status(400).send({ error: parseResult.error.message });
  }

  const itemData = parseResult.data;
  const updatedItem = await updatePromotionalItem(id, itemData);

  if (!updatedItem) {
    return reply.status(404).send({ error: "Promotional item not found", code: ERROR_CODES.NOT_FOUND });
  }

  return reply.send(updatedItem);
};

/**
 * @description Retrieves all promotional items.
 * @example
 * // GET /api/promotional-item
 * getAll(request, reply)
 * @returns An array of promotional item objects.
 */
export const getAll = async (request: FastifyRequest, reply: FastifyReply) => {
  const items = await getAllPromotionalItems();
  return reply.send(items);
};

/**
 * @description Retrieves a promotional item by its ID.
 * @example
 * // GET /api/promotional-item/:id
 * getById(request, reply)
 * @returns The promotional item object or error if not found.
 */
export const getById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id: idParam } = request.params as { id: string };
  const id = parseInt(idParam, 10);

  if (isNaN(id)) {
    return reply.status(400).send({ error: "Invalid ID parameter" });
  }

  const item = await getPromotionalItemById(id);

  if (!item) {
    return reply.status(404).send({ error: "Promotional item not found" });
  }

  return reply.send(item);
};

/**
 * @description Deletes a promotional item by its ID.
 * @example
 * // DELETE /api/promotional-item/:id
 * destroy(request, reply)
 * @returns A success message and the deleted promotional item object, or error if not found.
 */
export const destroy = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id: idParam } = request.params as { id: string };
  const id = parseInt(idParam, 10);

  if (isNaN(id)) {
    return reply.status(400).send({ error: "Invalid ID parameter" });
  }

  const deletedItem = await deletePromotionalItem(id);

  if (!deletedItem) {
    return reply.status(404).send({ error: "Promotional item not found" });
  }

  return reply.send({
    message: "Promotional item deleted successfully",
    promotionalItem: deletedItem,
  });
};
