// JS PWP/Perfil.js - CONEXIÓN CON BACKEND

const API_URL = 'http://localhost:3000/api';
let modoEdicion = false;

const cerrarSesion = () => {
    if (confirm('¿Cerrar sesión?')) {
        localStorage.removeItem('usuarioActivo');
        localStorage.removeItem('usuarioId');
        localStorage.removeItem('usuarioRol');
        localStorage.removeItem('usuarioCorreo');
        localStorage.removeItem('sesionIniciada');
        window.location.href = 'Primera pagina web.html';
    }
};

const cargarPerfil = async () => {
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    const usuarioId = localStorage.getItem('usuarioId');
    const contenedor = document.getElementById('perfilContenido');
    const accionesDiv = document.getElementById('accionesPerfil');
    const irRegistro = document.getElementById('irRegistro');
    
    if (!contenedor) return;
    
    if (!usuarioActivo || !usuarioId) {
        contenedor.innerHTML = `
            <div class="no-sesion">
                <p><i class="fas fa-exclamation-circle"></i> No has iniciado sesión</p>
                <p><a href="Login.html">Inicia sesión</a> para acceder a tu perfil</p>
            </div>
        `;
        accionesDiv.innerHTML = '';
        if (irRegistro) irRegistro.style.display = 'block';
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/usuarios`);
        const usuarios = await response.json();
        const usuario = usuarios.find(u => u.id_usuario == usuarioId);
        
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        
        if (modoEdicion) {
            mostrarModoEdicion(usuario);
        } else {
            mostrarModoVista(usuario);
        }
        
        accionesDiv.innerHTML = `
            <button id="editarPerfil" class="btn-editar"><i class="fas fa-edit"></i> Editar perfil</button>
            <button id="cerrarSesion" class="btn-cerrar-sesion"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</button>
            ${usuario.rol !== 'admin' ? '<button id="eliminarCuenta" class="btn-eliminar-cuenta"><i class="fas fa-trash-alt"></i> Eliminar mi cuenta</button>' : ''}
        `;
        
        document.getElementById('editarPerfil')?.addEventListener('click', () => { modoEdicion = true; cargarPerfil(); });
        document.getElementById('cerrarSesion')?.addEventListener('click', cerrarSesion);
        if (usuario.rol !== 'admin') {
            document.getElementById('eliminarCuenta')?.addEventListener('click', eliminarCuenta);
        }
        
        if (irRegistro) irRegistro.style.display = 'none';
        
    } catch (error) {
        console.error('Error al cargar perfil:', error);
        contenedor.innerHTML = '<p><i class="fas fa-times-circle"></i> Error al cargar el perfil</p>';
    }
};

const mostrarModoVista = (usuario) => {
    const contenedor = document.getElementById('perfilContenido');
    
    contenedor.innerHTML = `
        <div class="perfil-info">
            <div class="info-grupo">
                <label><i class="fas fa-user"></i> Nombre</label>
                <p>${escapeHTML(usuario.nombre)}</p>
            </div>
            <div class="info-grupo">
                <label><i class="fas fa-envelope"></i> Correo electrónico</label>
                <p>${escapeHTML(usuario.correo)}</p>
            </div>
            <div class="info-grupo">
                <label><i class="fas fa-calendar-alt"></i> Fecha de registro</label>
                <p>${usuario.fecha_registro ? new Date(usuario.fecha_registro).toLocaleString() : 'No disponible'}</p>
            </div>
            <div class="info-grupo">
                <label><i class="fas fa-tag"></i> Rol</label>
                <p>${usuario.rol === 'admin' ? '<span style="color:#e74c3c;"><i class="fas fa-crown"></i> Administrador</span>' : '<i class="fas fa-user"></i> Usuario'}</p>
            </div>
        </div>
    `;
};

const mostrarModoEdicion = (usuario) => {
    const contenedor = document.getElementById('perfilContenido');
    
    contenedor.innerHTML = `
        <div class="editar-form">
            <h3><i class="fas fa-edit"></i> Editar perfil</h3>
            <div class="campo-editable">
                <label><i class="fas fa-user"></i> Nombre:</label>
                <input type="text" id="editNombre" value="${escapeHTML(usuario.nombre)}">
            </div>
            <div class="campo-editable">
                <label><i class="fas fa-envelope"></i> Correo:</label>
                <input type="email" id="editCorreo" value="${escapeHTML(usuario.correo)}">
            </div>
            <div class="campo-editable">
                <label><i class="fas fa-lock"></i> Nueva contraseña:</label>
                <input type="password" id="editPassword" placeholder="Dejar vacío para mantener actual">
            </div>
            <div class="campo-editable">
                <label><i class="fas fa-check-circle"></i> Confirmar:</label>
                <input type="password" id="editConfirmPassword" placeholder="Repite la nueva contraseña">
            </div>
            <div style="text-align:center; margin-top:20px;">
                <button id="guardarCambios" class="btn-guardar"><i class="fas fa-save"></i> Guardar</button>
                <button id="cancelarEdicion" class="btn-cancelar"><i class="fas fa-times"></i> Cancelar</button>
            </div>
            <div id="errorEdicion" class="mensaje-error"></div>
        </div>
    `;
    
    document.getElementById('guardarCambios')?.addEventListener('click', () => guardarCambios(usuario.id_usuario));
    document.getElementById('cancelarEdicion')?.addEventListener('click', () => { modoEdicion = false; cargarPerfil(); });
};

const guardarCambios = async (usuarioId) => {
    const nuevoNombre = document.getElementById('editNombre').value.trim();
    const nuevoCorreo = document.getElementById('editCorreo').value.trim();
    const nuevaPassword = document.getElementById('editPassword').value;
    const confirmPassword = document.getElementById('editConfirmPassword').value;
    const errorDiv = document.getElementById('errorEdicion');
    
    if (nuevoNombre.length < 2) {
        errorDiv.innerHTML = 'El nombre debe tener al menos 2 caracteres';
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(nuevoCorreo)) {
        errorDiv.innerHTML = 'Correo inválido';
        return;
    }
    
    if (nuevaPassword !== confirmPassword) {
        errorDiv.innerHTML = 'Las contraseñas no coinciden';
        return;
    }
    
    errorDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
    
    try {
        const response = await fetch(`${API_URL}/usuarios/${usuarioId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: nuevoNombre,
                correo: nuevoCorreo,
                password: nuevaPassword || undefined
            })
        });
        
        if (response.ok) {
            localStorage.setItem('usuarioActivo', nuevoNombre);
            localStorage.setItem('usuarioCorreo', nuevoCorreo);
            alert('Perfil actualizado');
            modoEdicion = false;
            cargarPerfil();
        } else {
            const data = await response.json();
            errorDiv.innerHTML = data.error || 'Error al actualizar';
        }
    } catch (error) {
        errorDiv.innerHTML = 'Error de conexión';
    }
};

const eliminarCuenta = async () => {
    const usuarioId = localStorage.getItem('usuarioId');
    if (confirm('¿Eliminar tu cuenta permanentemente?')) {
        try {
            const response = await fetch(`${API_URL}/usuarios/${usuarioId}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Cuenta eliminada');
                cerrarSesion();
            } else {
                alert('Error al eliminar');
            }
        } catch (error) {
            alert('Error de conexión');
        }
    }
};

const escapeHTML = (texto) => {
    if (!texto) return '';
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
};

document.addEventListener('DOMContentLoaded', cargarPerfil);