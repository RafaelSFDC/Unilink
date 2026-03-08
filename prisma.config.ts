export default {
  directory: "./prisma",
  schema: {
    kind: "single",
    filePath: "./prisma/schema.prisma",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
};
