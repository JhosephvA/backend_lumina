// app.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/sequelize-config'); // importamos la configuración de Sequelize

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
// Importar modelos
// ==============================
require('./src/models/User');
require('./src/models/Course');
require('./src/models/Enrollment');
require('./src/models/Task');
require('./src/models/Submission');
require('./src/models/StudyLog');
require('./src/models/AiRecommendation');
require('./src/models/Material');

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
    console.log('✅ Conexión a la base de datos establecida correctamente.');

    // Sincronizar tablas
    await sequelize.sync({ alter: true });
    console.log('✅ Todas las tablas sincronizadas correctamente.');
  } catch (error) {
    console.error('❌ Error al conectar con la DB:', error);
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
