import { company } from "../../db/schema/company.ts";
import { db } from "../../db/index.ts";
import { type InferInsertModel, eq } from "drizzle-orm";

type CompanyInsert = InferInsertModel<typeof company>;
type CompanyUpdate = Partial<Omit<InferInsertModel<typeof company>, "id">>;

export const createCompany = async (companyData: CompanyInsert) => {
  const newCompany = await db.insert(company).values(companyData).returning();
  return newCompany;
};

export const updateCompany = async (id: number, data: CompanyUpdate) => {
  const result = await db
    .update(company)
    .set(data)
    .where(eq(company.id, id))
    .returning();
  return result[0];
};

export const getAllCompanies = async () => {
  const companies = await db.select().from(company);
  return companies;
};

export const getCompanyById = async (id: number) => {
  const companyData = await db.select().from(company).where(eq(company.id, id));
  return companyData[0];
};

export const deleteCompany = async (id: number) => {
  const result = await db.delete(company).where(eq(company.id, id)).returning();
  return result;
};
