const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/sequelize-config');

const app = express();
app.use(cors());
app.use(express.json());

// Importar modelos
require('./src/models/User');
require('./src/models/Course');
require('./src/models/Enrollment');
require('./src/models/Task');
require('./src/models/Submission');
require('./src/models/StudyLog');
require('./src/models/AiRecommendation');
require('./src/models/Material');

// Cargar asociaciones
require('./src/models/associations');

// Conexión y sincronización
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente en Railway');

    await sequelize.sync({ alter: true });
    console.log('✅ Todas las tablas sincronizadas correctamente');
  } catch (error) {
    console.error('❌ Error al conectar con la DB:', error);
  }
}

connectDB();

// Rutas básicas
app.get('/', (req, res) => {
  res.send('Backend Lumina funcionando en Railway!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

module.exports = sequelize;
