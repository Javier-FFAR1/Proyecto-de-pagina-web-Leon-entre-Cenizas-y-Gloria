const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'FFAR1michael!',
    database: 'Patrimonio_leondb',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10
});

// Probar conexión
(async () => {
    try {
        const conn = await pool.getConnection();
        console.log('✅ Conectado a MySQL - Base de datos: Patrimonio_leondb');
        conn.release();
    } catch (err) {
        console.error('❌ Error de conexión a MySQL:', err.message);
    }
})();

module.exports = pool;