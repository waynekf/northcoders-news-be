const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";

const config = {};

require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("No PGDATABASE or DATABASE_URL configured");
} else {
  console.log(`Connected to ${process.env.PGDATABASE}`);
}

module.exports = new Pool(config);
