import { employee } from "../../db/schema/employee.ts";
import { db } from "../../db/index.ts";
import { type InferInsertModel, eq } from "drizzle-orm";

type EmployeeInsert = InferInsertModel<typeof employee>;
type EmployeeUpdate = Partial<Omit<InferInsertModel<typeof employee>, "id">>;

/**
 * Creates a new employee.
 * @param employeeData - Data for the new employee.
 * @returns The created employee.
 */
export const createEmployee = async (employeeData: EmployeeInsert) => {
  const newEmployee = await db
    .insert(employee)
    .values(employeeData)
    .returning();
  return newEmployee[0];
};

/**
 * Updates an existing employee by ID.
 * @param id - Employee ID.
 * @param data - Data to update.
 * @returns The updated employee or undefined if not found.
 */
export const updateEmployee = async (id: number, data: EmployeeUpdate) => {
  const result = await db
    .update(employee)
    .set(data)
    .where(eq(employee.id, id))
    .returning();
  return result[0];
};

/**
 * Retrieves all employees.
 * @returns Array of employees.
 */
export const getAllEmployees = async () => {
  const employees = await db.select().from(employee);
  return employees;
};

/**
 * Retrieves an employee by ID.
 * @param id - Employee ID.
 * @returns The employee or undefined if not found.
 */
export const getEmployeeById = async (id: number) => {
  const employeeData = await db
    .select()
    .from(employee)
    .where(eq(employee.id, id));
  return employeeData[0];
};

/**
 * Deletes an employee by ID.
 * @param id - Employee ID.
 * @returns The deleted employee or undefined if not found.
 */
export const deleteEmployee = async (id: number) => {
  const result = await db
    .delete(employee)
    .where(eq(employee.id, id))
    .returning();
  return result[0];
};
