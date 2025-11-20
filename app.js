// app.js
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');

const app = express();
app.use(cors());
app.use(express.json());

// ==============================
// Cargar dotenv solo en desarrollo
// ==============================
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  console.log('📦 Variables cargadas desde .env');
}

// ==============================
// Determinar URL de conexión a la DB
// ==============================
let connectionUrl = process.env.DB_URL || process.env.MYSQL_URL;

// Si no hay URL completa, construir desde variables individuales
if (!connectionUrl && process.env.MYSQLUSER && process.env.MYSQLPASSWORD && process.env.MYSQLHOST && process.env.MYSQLPORT && process.env.MYSQLDATABASE) {
  connectionUrl = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;
}

// ==============================
// DEBUG: Mostrar variables críticas
// ==============================
console.log("==== DEBUG VARIABLES ENTORNO ====");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);
console.log("DB_DIALECT:", process.env.DB_DIALECT);
console.log("DB_URL:", process.env.DB_URL);
console.log("MYSQL_URL:", process.env.MYSQL_URL);
console.log("MYSQLUSER:", process.env.MYSQLUSER);
console.log("MYSQLPASSWORD:", process.env.MYSQLPASSWORD);
console.log("MYSQLHOST:", process.env.MYSQLHOST);
console.log("MYSQLPORT:", process.env.MYSQLPORT);
console.log("MYSQLDATABASE:", process.env.MYSQLDATABASE);
console.log("Connection URL usada:", connectionUrl);
console.log("=================================");

// ==============================
// Crear instancia Sequelize
// ==============================
if (!connectionUrl) {
  console.error("❌ No se encontró ninguna variable de entorno para la base de datos.");
  process.exit(1); // Detener ejecución si no hay DB
}

const sequelize = new Sequelize(connectionUrl, {
  dialect: process.env.DB_DIALECT || 'mysql',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// ==============================
// Cargar modelos
// ==============================
const User = require('./src/models/User');
const Course = require('./src/models/Course');
const Enrollment = require('./src/models/Enrollment');
const Task = require('./src/models/Task');
const Submission = require('./src/models/Submission');
const StudyLog = require('./src/models/StudyLog');
const AiRecommendation = require('./src/models/AiRecommendation');
const Material = require('./src/models/Material');

// ==============================
// Cargar asociaciones
// ==============================
require('./src/models/associations');

// ==============================
// Conexión a DB y sincronización
// ==============================
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos establecida correctamente.");

    await User.sync({ alter: true });
    await Course.sync({ alter: true });
    await Enrollment.sync({ alter: true });
    await Task.sync({ alter: true });
    await Submission.sync({ alter: true });
    await StudyLog.sync({ alter: true });
    await AiRecommendation.sync({ alter: true });
    await Material.sync({ alter: true });

    console.log("✅ Todas las tablas sincronizadas correctamente.");
  } catch (error) {
    console.error("❌ Error al conectar con la DB:", error);
  }
}

connectDB();

// ==============================
// Rutas básicas
// ==============================
app.get('/', (req, res) => {
  res.send('Backend Lumina funcionando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

module.exports = sequelize;
