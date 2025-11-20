const { Sequelize } = require('sequelize');

// Railway injecta variables directamente
const user = process.env.MYSQL_USER || process.env.MYSQLUSER;
const password = process.env.MYSQL_PASSWORD || process.env.MYSQLPASSWORD;
const host = process.env.MYSQL_HOST || process.env.MYSQLHOST;
const port = process.env.MYSQL_PORT || process.env.MYSQLPORT;
const database = process.env.MYSQL_DATABASE || process.env.MYSQLDATABASE;
const dialect = process.env.DB_DIALECT || 'mysql';

if (!user || !password || !host || !port || !database) {
  console.error("==== DEBUG VARIABLES ENTORNO ====");
  console.log("MYSQL_USER:", process.env.MYSQL_USER);
  console.log("MYSQL_PASSWORD:", process.env.MYSQL_PASSWORD);
  console.log("MYSQL_HOST:", process.env.MYSQL_HOST);
  console.log("MYSQL_PORT:", process.env.MYSQL_PORT);
  console.log("MYSQL_DATABASE:", process.env.MYSQL_DATABASE);
  console.log("MYSQLUSER:", process.env.MYSQLUSER);
  console.log("MYSQLPASSWORD:", process.env.MYSQLPASSWORD);
  console.log("MYSQLHOST:", process.env.MYSQLHOST);
  console.log("MYSQLPORT:", process.env.MYSQLPORT);
  console.log("MYSQLDATABASE:", process.env.MYSQLDATABASE);
  throw new Error('❌ No se encontró ninguna variable de entorno para la base de datos.');
}

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

console.log("✅ Conexión configurada con éxito a la base de datos.");

module.exports = sequelize;
