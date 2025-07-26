import type { FastifyRequest, FastifyReply } from "fastify";
import { employeeInsertSchema, employeeUpdateSchema } from "./schema.ts";
import {
  createEmployee,
  updateEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployee,
} from "./service.ts";

/**
 * @description Creates a new employee.
 * @example
 * // POST /employees
 * create(request, reply)
 * @returns The created employee object.
 */
export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const body = request.body;
  const parseResult = employeeInsertSchema.safeParse(body);

  if (!parseResult.success) {
    return reply.status(400).send({ error: parseResult.error.message });
  }

  const employeeData = parseResult.data;
  const result = await createEmployee(employeeData);
  return reply.send(result);
};

/**
 * @description Updates an existing employee by ID.
 * @example
 * // PUT /employees/:id
 * update(request, reply)
 * @returns The updated employee object or error if not found.
 */
export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id: idParam } = request.params as { id: string };
  const id = parseInt(idParam, 10);

  if (isNaN(id)) {
    return reply.status(400).send({ error: "Invalid ID parameter" });
  }

  const body = request.body;
  const parseResult = employeeUpdateSchema.safeParse(body);

  if (!parseResult.success) {
    return reply.status(400).send({ error: parseResult.error.message });
  }

  const employeeData = parseResult.data;
  const updatedEmployee = await updateEmployee(id, employeeData);

  if (!updatedEmployee) {
    return reply.status(404).send({ error: "Employee not found" });
  }

  return reply.send(updatedEmployee);
};

/**
 * @description Retrieves all employees.
 * @example
 * // GET /employees
 * getAll(request, reply)
 * @returns An array of employee objects.
 */
export const getAll = async (request: FastifyRequest, reply: FastifyReply) => {
  const employees = await getAllEmployees();
  return reply.send(employees);
};

/**
 * @description Retrieves an employee by its ID.
 * @example
 * // GET /employees/:id
 * getById(request, reply)
 * @returns The employee object or error if not found.
 */
export const getById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };

  if (!id) {
    return reply.status(400).send({ error: "ID is required" });
  }

  const employee = await getEmployeeById(id);

  if (!employee) {
    return reply.status(404).send({ error: "Employee not found" });
  }

  return reply.send(employee);
};

/**
 * @description Deletes an employee by its ID.
 * @example
 * // DELETE /employees/:id
 * destroy(request, reply)
 * @returns A success message and the deleted employee object, or error if not found.
 */
export const destroy = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };

  if (!id) {
    return reply.status(400).send({ error: "ID is required" });
  }

  const deletedEmployee = await deleteEmployee(id);

  if (!deletedEmployee) {
    return reply.status(404).send({ error: "Employee not found" });
  }

  return reply.send({
    message: "Employee deleted successfully",
    employee: deletedEmployee,
  });
};
