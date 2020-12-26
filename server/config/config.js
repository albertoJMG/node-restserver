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
    urlDB = 'mongodb+srv://albertoJMG:G5VsZEAr9G3ZE7M@cluster1.uswnp.mongodb.net/cafe';
}

process.env.URLDB = urlDB;