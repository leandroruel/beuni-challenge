import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db/index.ts";
import {
  user as userTable,
  account as accountTable,
  session as sessionTable,
  verification as verificationTable,
} from "./db/schema/users.ts";
import dotenv from "dotenv";
dotenv.config();

export const auth = betterAuth({
  trustedOrigins: [process.env.CLIENT_ORIGIN || "http://localhost:3000"],
  secret: process.env.BETTER_AUTH_SECRET || "secret",
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    cookiePrefix: "beuni_",
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: userTable,
      account: accountTable,
      session: sessionTable,
      verification: verificationTable,
    },
  }),
});

console.log(auth)