const express = require('express');
const cors = require('cors');
const pool = require('./Configuraciones/db');
const app = express();
const port = 3000;

console.log('Iniciando servidor...');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos del Frontend
app.use(express.static('../Frontend'));

// Agrega este middleware de prueba para depurar
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// RUTAS DE USUARIOS
// Obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id_usuario, nombre_usuario as nombre, correo, fecha_registro, rol FROM Usuarios');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// Registrar usuario
app.post('/api/registro', async (req, res) => {
    const { nombre, correo, password, rol } = req.body;
    
    if (!nombre || !correo || !password) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }
    
    try {
        const [result] = await pool.query(
            'INSERT INTO Usuarios (nombre_usuario, correo, password, rol) VALUES (?, ?, ?, ?)',
            [nombre, correo, password, rol || 'usuario']
        );
        res.json({ mensaje: 'Usuario registrado exitosamente', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    const { correo, password } = req.body;
    
    if (!correo || !password) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }
    
    try {
        const [rows] = await pool.query(
            'SELECT id_usuario, nombre_usuario as nombre, correo, rol FROM Usuarios WHERE (correo = ? OR nombre_usuario = ?) AND password = ?',
            [correo, correo, password]
        );
        
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }
        console.log('Usuario encontrado:', rows[0]);
        
        res.json({ mensaje: 'Login exitoso', usuario: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

// RUTAS DE MONUMENTOS


app.get('/api/monumentos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Monumentos');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener monumentos' });
    }
});

// RUTAS DE PERSONAJES

app.get('/api/personajes', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Personajes');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener personajes' });
    }
});

// RUTAS DE VOLCANES


app.get('/api/volcanes', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Volcanes');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener volcanes' });
    }
});

// RUTAS DE MUNICIPIOS
app.get('/api/municipios', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Municipios ORDER BY id_municipio ASC'
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener municipios' });
    }
});
 
app.get('/api/municipios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Municipios WHERE id_municipio = ?', [id]
        );
        if (rows.length === 0)
            return res.status(404).json({ error: 'Municipio no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener municipio' });
    }
});



//Rutas de comentarios

// ================================================================
//  PARCHE PARA Server.js
//  1) Reemplaza las rutas de /api/comentarios GET y POST existentes
//  2) Agrega la ruta DELETE nueva
//  Pega esto en Server.js sustituyendo las rutas de comentarios
// ================================================================

// ── GET comentarios (con soporte para respuestas anidadas) ────────
app.get('/api/comentarios', async (req, res) => {
    const { sección } = req.query;
    try {
        let query = `
            SELECT c.*, u.nombre_usuario AS usuario_nombre
            FROM Comentarios c
            JOIN Usuarios u ON c.id_usuario = u.id_usuario
        `;
        const params = [];
        if (sección) {
            query += ' WHERE c.sección = ?';
            params.push(sección);
        }
        query += ' ORDER BY COALESCE(c.id_comentario_padre, c.id_comentario), c.fecha ASC';
        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener comentarios' });
    }
});

// ── POST nuevo comentario (o respuesta anidada) ───────────────────
app.post('/api/comentarios', async (req, res) => {
    const { id_usuario, sección, id_referencia, comentario, id_comentario_padre } = req.body;
    if (!id_usuario || !sección || !comentario) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }
    try {
        const [result] = await pool.query(
            'INSERT INTO Comentarios (id_usuario, sección, id_referencia, comentario, id_comentario_padre) VALUES (?, ?, ?, ?, ?)',
            [id_usuario, sección, id_referencia || null, comentario, id_comentario_padre || null]
        );
        res.json({ mensaje: 'Comentario guardado', id: result.insertId });
    } catch (error) {
        console.error('Error SQL:', error);
        res.status(500).json({ error: 'Error al guardar comentario: ' + error.message });
    }
});

// ── PUT editar comentario ─────────────────────────────────────────
app.put('/api/comentarios/:id', async (req, res) => {
    const { id } = req.params;
    const { id_usuario, rol, comentario } = req.body;

    if (!id_usuario || !comentario) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
        const [rows] = await pool.query(
            'SELECT id_usuario FROM Comentarios WHERE id_comentario = ?', [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Comentario no encontrado' });
        }

        const esAdmin = rol === 'admin';
        const esAutor = String(rows[0].id_usuario) === String(id_usuario);

        if (!esAdmin && !esAutor) {
            return res.status(403).json({ error: 'No tienes permiso para editar este comentario' });
        }

        await pool.query(
            'UPDATE Comentarios SET comentario = ? WHERE id_comentario = ?',
            [comentario, id]
        );
        res.json({ mensaje: 'Comentario actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al editar comentario' });
    }
});

// ── DELETE eliminar comentario ────────────────────────────────────
// El usuario solo puede borrar el suyo; el admin puede borrar cualquiera.
app.delete('/api/comentarios/:id', async (req, res) => {
    const { id } = req.params;
    const { id_usuario, rol } = req.body;

    if (!id_usuario) {
        return res.status(400).json({ error: 'Se requiere autenticación' });
    }

    try {
        // Verificar que el comentario existe
        const [rows] = await pool.query(
            'SELECT id_usuario FROM Comentarios WHERE id_comentario = ?', [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Comentario no encontrado' });
        }

        const esAdmin = rol === 'admin';
        const esAutor = String(rows[0].id_usuario) === String(id_usuario);

        if (!esAdmin && !esAutor) {
            return res.status(403).json({ error: 'No tienes permiso para eliminar este comentario' });
        }

        // Eliminar también respuestas hijas si es comentario padre
        await pool.query(
            'DELETE FROM Comentarios WHERE id_comentario = ? OR id_comentario_padre = ?',
            [id, id]
        );

        res.json({ mensaje: 'Comentario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar comentario' });
    }
});
 

// RUTAS DE MENSAJES DE CONTACTO ...


// Obtener todos los mensajes
app.get('/api/mensajes', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Mensajes_contacto ORDER BY fecha DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener mensajes' });
    }
});

// Marcar mensaje como leído
app.put('/api/mensajes/:id/leido', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('UPDATE Mensajes_contacto SET leido = TRUE WHERE id_msj_contacto = ?', [id]);
        res.json({ mensaje: 'Mensaje marcado como leído' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar mensaje' });
    }
});

// Eliminar mensaje
app.delete('/api/mensajes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM Mensajes_contacto WHERE id_msj_contacto = ?', [id]);
        res.json({ mensaje: 'Mensaje eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar mensaje' });
    }
});

// RUTAS DE MENSAJES DE CONTACTO


app.post('/api/contacto', async (req, res) => {
    const { nombre, email, asunto, mensaje } = req.body;
    
    if (!nombre || !email || !mensaje) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }
    
    try {
        const [result] = await pool.query(
            'INSERT INTO Mensajes_contacto (nombre, email, asunto, mensaje) VALUES (?, ?, ?, ?)',
            [nombre, email, asunto || null, mensaje]
        );
        res.json({ mensaje: 'Mensaje enviado correctamente', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al enviar mensaje' });
    }
});


// ACTUALIZAR Y ELIMINAR USUARIO


app.put('/api/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, password } = req.body;
    
    try {
        let query = 'UPDATE Usuarios SET nombre_usuario = ?, correo = ?';
        let params = [nombre, correo];
        
        if (password && password !== '') {
            query += ', password = ?';
            params.push(password);
        }
        
        query += ' WHERE id_usuario = ?';
        params.push(id);
        
        await pool.query(query, params);
        res.json({ mensaje: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
});

app.delete('/api/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        await pool.query('DELETE FROM Usuarios WHERE id_usuario = ?', [id]);
        res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
});




// Obtener promedio  ← DEBE IR ANTES que GET /api/valoraciones
app.get('/api/valoraciones/promedio', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT COALESCE(AVG(valoracion), 0) as promedio, COUNT(*) as total FROM Valoraciones');
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener promedio' });
    }
});

// Obtener todas las valoraciones
app.get('/api/valoraciones', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT v.*, u.nombre_usuario 
            FROM Valoraciones v
            LEFT JOIN Usuarios u ON v.id_usuario = u.id_usuario
            ORDER BY v.fecha DESC
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error GET /api/valoraciones:', error);
        res.status(500).json({ error: 'Error al obtener valoraciones: ' + error.message });
    }
});

// Guardar valoración
app.post('/api/valoraciones', async (req, res) => {
    console.log('=== POST /api/valoraciones ===');
    console.log('Body recibido:', req.body);
    
    const { id_usuario, valoracion } = req.body;
    
    if (!valoracion || valoracion < 1 || valoracion > 5) {
        console.log('Valoración inválida:', valoracion);
        return res.status(400).json({ error: 'Valoración inválida' });
    }
    
    try {
        console.log('Insertando en BD...');
        const [result] = await pool.query(
            'INSERT INTO Valoraciones (id_usuario, valoracion) VALUES (?, ?)',
            [id_usuario || null, valoracion]
        );
        console.log('Insert exitoso, ID:', result.insertId);
        res.json({ mensaje: 'Valoración guardada', id: result.insertId });
    } catch (error) {
        console.error('Error SQL detallado:', error);
        res.status(500).json({ error: 'Error al guardar valoración: ' + error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});


// Obtener valoración de un usuario específico
app.get('/api/valoraciones/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(
            'SELECT valoracion FROM Valoraciones WHERE id_usuario = ? ORDER BY fecha DESC LIMIT 1',
            [id]
        );
        res.json(rows[0] || { valoracion: null });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener valoración del usuario' });
    }
});