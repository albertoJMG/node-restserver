// ========================
// Puerto
// ========================
process.env.PORT = process.env.PORT || 3000

// ======================
// Entorno
// ======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// ======================
// Vencimiento del token
// ======================

process.env.CADUCIDAD_TOKEN = '72h';

// ======================
// SEED de autentitifcacion
// ======================

process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'este-es-el-seed-desarrollo'

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

// ======================
// Google Client_ID
// ======================

process.env.CLIENT_ID = process.env.CLIENT_ID || '381673324434-p3pkdvhpj26hqvg3cnqdh7kvoqknorn9.apps.googleusercontent.com';