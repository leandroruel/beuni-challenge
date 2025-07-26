import { company } from "../../db/schema/company.ts";
import { db } from "../../db/index.ts";
import { type InferInsertModel, asc, eq } from "drizzle-orm";
import { withPagination } from "../../utils/withPagination.ts";

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
  if (result.length === 0) {
    return null;
  }
  return result[0];
};

export const getAllCompanies = async () => {
  const companies = db.select().from(company);
  const result = await withPagination(companies.$dynamic(), asc(company.name));
  return result;
};

export const getCompanyById = async (id: number) => {
  const companyData = await db.select().from(company).where(eq(company.id, id));
  return companyData[0];
};

export const deleteCompany = async (id: number) => {
  const result = await db.delete(company).where(eq(company.id, id)).returning();
  return result;
};

export const getByTaxId = async (taxId: string) => {
  const companyData = await db
    .select()
    .from(company)
    .where(eq(company.taxId, taxId));
  return companyData[0];
};
