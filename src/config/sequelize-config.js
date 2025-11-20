const { Sequelize } = require('sequelize');

// Solo cargar dotenv si estás en local
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  console.log('📦 Variables cargadas desde .env (local)');
}

// Construir URL de conexión desde variables de Railway
const connectionUrl =
  process.env.MYSQL_URL || // URL completa
  (process.env.MYSQLUSER &&
    process.env.MYSQLPASSWORD &&
    process.env.MYSQLHOST &&
    process.env.MYSQLPORT &&
    process.env.MYSQLDATABASE
      ? `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`
      : null);

console.log("Connection URL usada:", connectionUrl);

if (!connectionUrl) {
  console.error('❌ No se encontró ninguna variable de entorno para la base de datos.');
  process.exit(1);
}

const sequelize = new Sequelize(connectionUrl, {
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
