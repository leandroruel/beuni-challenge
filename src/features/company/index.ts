import type { FastifyReply, FastifyRequest } from "fastify";
import {
  companyInsertSchema,
  companySelectSchema,
  companyUpdateSchema,
} from "./schema.ts";
import {
  createCompany,
  deleteCompany,
  getAllCompanies,
  getByTaxId,
  getCompanyById,
  updateCompany,
} from "./service.ts";
import { ERROR_CODES } from "../../utils/constants.ts";

export const getAll = async (request: FastifyRequest, reply: FastifyReply) => {
  const companies = await getAllCompanies();
  return reply.send(companies);
};

export const getById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  const companyId = Number(request.params.id);
  if (isNaN(companyId)) {
    return reply.status(400).send({ error: "Invalid ID" });
  }
  const companyData = await getCompanyById(companyId);
  if (!companyData) {
    return reply.status(404).send({ error: "Company not found" });
  }
  return reply.send(companyData);
};

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const body = request.body;

  const parseResult = companyInsertSchema.safeParse(body);

  if (!parseResult.success) {
    return reply.status(400).send({ error: parseResult.error.message });
  }

  // Check if taxId is already in use
  const taxId = parseResult.data.taxId;
  if (typeof taxId !== "string") {
    return reply.status(400).send({
      error: "Tax ID is required and must be a string",
      code: ERROR_CODES.INVALID_TAX_ID,
    });
  }

  const existingCompany = await getByTaxId(taxId);

  if (existingCompany) {
    return reply.status(400).send({
      error: "Tax ID already exists",
      code: ERROR_CODES.TAX_ID_EXISTS,
    });
  }

  const companyData = parseResult.data;

  const result = await createCompany(companyData);
  return reply.send(result);
};

export const update = async (
  request: FastifyRequest<{
    Params: { id: string };
    Body: typeof companyUpdateSchema;
  }>,
  reply: FastifyReply,
) => {
  const companyId = Number(request.params.id);

  if (isNaN(companyId)) {
    return reply.status(400).send({ error: "Invalid ID" });
  }

  const parseResult = companyUpdateSchema.safeParse(request.body);

  if (!parseResult.success) {
    return reply.status(400).send({ error: parseResult.error.message });
  }

  const result = await updateCompany(companyId, parseResult.data);
  return reply.send(result);
};

export const destroy = async (
  request: FastifyRequest<{
    Params: { id: string };
    Body: typeof companySelectSchema;
  }>,
  reply: FastifyReply,
) => {
  const companyId = Number(request.params.id);

  if (isNaN(companyId)) {
    return reply.status(400).send({ error: "Invalid ID" });
  }

  const result = await deleteCompany(companyId);
  return reply.send(result);
};
