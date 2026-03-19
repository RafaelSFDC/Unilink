import { prismaAdapter } from "@better-auth/prisma-adapter";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";
import { prisma } from "@/lib/prisma";

const baseURL =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000";
const secret =
  process.env.BETTER_AUTH_SECRET ||
  "unilink-local-better-auth-secret-change-me";

export const auth = betterAuth({
  appName: "Unilink",
  baseURL,
  secret,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    modelName: "User",
    fields: {
      image: "imageUrl",
    },
    additionalFields: {
      firstName: {
        type: "string",
        required: false,
      },
      lastName: {
        type: "string",
        required: false,
      },
      title: {
        type: "string",
        required: false,
      },
      bio: {
        type: "string",
        required: false,
      },
      isPublic: {
        type: "boolean",
        required: false,
        defaultValue: true,
      },
    },
  },
  session: {
    modelName: "Session",
  },
  account: {
    modelName: "Account",
  },
  verification: {
    modelName: "Verification",
  },
  plugins: [
    nextCookies(),
    username(),
  ],
});
