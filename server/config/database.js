const path = require("path");

// module.exports = ({ env }) => ({
//   connection: {
//     client: 'sqlite',
//     connection: {
//       filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
//     },
//     useNullAsDefault: true,
//   },
// });

module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "103.236.201.56"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "strapi"),
      user: env("DATABASE_USERNAME", "postgres"),
      password: env("DATABASE_PASSWORD", "Server001Postgres!@#$%"),
      // schema: env("DATABASE_SCHEMA", "public"), // Not required
      ssl: false
      // ssl: {
      //   rejectUnauthorized: env.bool("DATABASE_SSL_SELF", false), // For self-signed certificates
      // },
    },
    debug: false,
  },
});
