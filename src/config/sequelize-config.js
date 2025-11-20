const { Sequelize } = require('sequelize');

const connectionUrl =
  process.env.DB_URL ||
  process.env.MYSQL_URL ||
  (process.env.MYSQL_USER &&
   process.env.MYSQL_PASSWORD &&
   process.env.MYSQL_HOST &&
   process.env.MYSQL_PORT &&
   process.env.MYSQL_DATABASE
      ? `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}/${process.env.MYSQL_DATABASE}`
      : null);

console.log("Connection URL usada:", connectionUrl);

if (!connectionUrl) {
  console.error('❌ No se encontró ninguna variable de entorno para la base de datos.');
  process.exit(1);
}

const sequelize = new Sequelize(connectionUrl, {
  dialect: 'mysql',
  logging: console.log,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
