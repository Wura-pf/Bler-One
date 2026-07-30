export const env = {
  port: Number(process.env.PORT) || 3000,

  database: {
    url: process.env.DATABASE_URL ?? "",
  },

  jwt: {
    secret: process.env.JWT_SECRET ?? "",
    expiresIn: process.env.JWT_EXPIRES_IN ?? "1d",
  },

  app: {
    name: "Blér One",
    version: "1.0.0",
  },
};