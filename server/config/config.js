// ========================
// Puerto
// ========================
process.env.PORT = process.env.PORT || 3000

// ======================
// Entorno
// ======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// ======================
// Base de datos
// ======================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;  //Es necesario establecer esta variable de entorno en el repositorio de Heroku (Heroku config:set MONGO_URI = "<url de mongo_atlas>")
}

process.env.URLDB = urlDB;