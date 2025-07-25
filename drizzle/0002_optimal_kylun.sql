CREATE TABLE "employee" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"birth_date" date NOT NULL,
	"department" varchar(255) NOT NULL,
	"company_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "tax_id" text;--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "website" text;--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "industry" text;--> statement-breakpoint
ALTER TABLE "employee" ADD CONSTRAINT "employee_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;