// JS PWP/Usuarios.js - CONEXIÓN CON BACKEND

const API_URL = 'http://localhost:3000/api';

const escapeHTML = (texto) => {
    if (!texto) return '';
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
};

const cargarUsuarios = async () => {
    const contenedor = document.getElementById('contenidoUsuarios');
    
    try {
        const response = await fetch(`${API_URL}/usuarios`);
        const usuarios = await response.json();
        
        if (usuarios.length === 0) {
            contenedor.innerHTML = '<div class="sin-usuarios"><i class="fas fa-info-circle"></i> No hay usuarios registrados.</div>';
            return;
        }
        
        contenedor.innerHTML = `
            <div class="contador" style="text-align: center; margin-bottom: 25px; padding: 15px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border-radius: 10px; font-size: 1.1rem;">
                <i class="fas fa-users"></i> Total de usuarios registrados: ${usuarios.length}
            </div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                    <thead>
                        <tr style="background: linear-gradient(135deg, #2c3e50, #3498db); color: white;">
                            <th style="padding: 15px; text-align: left; font-weight: bold; width: 60px;"><i class="fas fa-hashtag"></i></th>
                            <th style="padding: 15px; text-align: left; font-weight: bold;"><i class="fas fa-user"></i> Nombre</th>
                            <th style="padding: 15px; text-align: left; font-weight: bold;"><i class="fas fa-envelope"></i> Correo</th>
                            <th style="padding: 15px; text-align: left; font-weight: bold;"><i class="fas fa-calendar"></i> Fecha de registro</th>
                            <th style="padding: 15px; text-align: left; font-weight: bold;"><i class="fas fa-tag"></i> Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${usuarios.map((user, i) => `
                            <tr style="border-bottom: 1px solid #eee; transition: background 0.2s;">
                                <td style="padding: 12px 15px; color: #666;">${i + 1}</td>
                                <td style="padding: 12px 15px; font-weight: 500; color: #2c3e50;">${escapeHTML(user.nombre)}</td>
                                <td style="padding: 12px 15px; color: #666;">${escapeHTML(user.correo)}</td>
                                <td style="padding: 12px 15px; color: #666; font-size: 0.85rem;">${new Date(user.fecha_registro).toLocaleString()}</td>
                                <td style="padding: 12px 15px;">${user.rol === 'admin' ? '<span style="color: #e74c3c;"><i class="fas fa-crown"></i> Admin</span>' : '<span style="color: #27ae60;"><i class="fas fa-user"></i> Usuario</span>'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } catch (error) {
        console.error('Error:', error);
        contenedor.innerHTML = '<div class="sin-usuarios"><i class="fas fa-exclamation-triangle"></i> Error al cargar usuarios</div>';
    }
};

const verificarAdmin = () => {
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    const usuarioRol = localStorage.getItem('usuarioRol');
    const esAdmin = (usuarioRol === 'admin');
    
    if (!esAdmin) {
        const contenedor = document.getElementById('contenidoUsuarios');
        contenedor.innerHTML = `
            <div class="sin-usuarios">
                <p><i class="fas fa-lock"></i> Acceso restringido</p>
                <p>Solo el administrador puede ver esta lista.</p>
                <a href="Login.html" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 10px;"><i class="fas fa-sign-in-alt"></i> Iniciar sesión</a>
            </div>
        `;
        return false;
    }
    return true;
};

document.addEventListener('DOMContentLoaded', () => {
    if (verificarAdmin()) {
        cargarUsuarios();
    }
});