// JS PWP/Admin_mensajes.js - VERSIÓN CON TARJETAS

const API_URL = 'http://localhost:3000/api';

const cargarMensajes = async () => {
    const contenedor = document.getElementById('contenidoAdmin');
    
    if (!contenedor) return;
    
    contenedor.innerHTML = '<div class="contador"><i class="fas fa-spinner fa-spin"></i> Cargando mensajes...</div>';
    
    try {
        const response = await fetch(`${API_URL}/mensajes`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const mensajes = await response.json();
        
        if (mensajes.length === 0) {
            contenedor.innerHTML = '<div class="contador"><i class="fas fa-inbox"></i> No hay mensajes de contacto.</div>';
            return;
        }
        
        const noLeidos = mensajes.filter(m => !m.leido).length;
        
        contenedor.innerHTML = `
            <div class="contador">
                <i class="fas fa-envelope"></i> Total: ${mensajes.length} | 
                <i class="fas fa-clock"></i> No leídos: ${noLeidos}
            </div>
            <div class="mensajes-grid">
                ${mensajes.map(m => `
                    <div class="mensaje-card ${!m.leido ? 'no-leido' : ''}">
                        <div class="mensaje-header">
                            <span class="mensaje-nombre"><i class="fas fa-user"></i> ${escapeHTML(m.nombre)}</span>
                            <span class="mensaje-fecha"><i class="fas fa-calendar"></i> ${new Date(m.fecha).toLocaleString()}</span>
                        </div>
                        <div class="mensaje-email"><i class="fas fa-envelope"></i> ${escapeHTML(m.email)}</div>
                        <div class="mensaje-asunto"><i class="fas fa-tag"></i> ${escapeHTML(m.asunto || 'Sin asunto')}</div>
                        <div class="mensaje-texto">${escapeHTML(m.mensaje)}</div>
                        <div class="mensaje-estado ${m.leido ? 'estado-leido' : 'estado-no-leido'}">
                            ${m.leido ? '<i class="fas fa-check-circle"></i> Leído' : '<i class="fas fa-envelope"></i> No leído'}
                        </div>
                        <div class="mensaje-acciones">
                            ${!m.leido ? `<button class="btn-marcar" onclick="marcarComoLeido(${m.id_msj_contacto})"><i class="fas fa-check"></i> Marcar leído</button>` : ''}
                            <button class="btn-eliminar" onclick="eliminarMensaje(${m.id_msj_contacto})"><i class="fas fa-trash"></i> Eliminar</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (error) {
        console.error('Error:', error);
        contenedor.innerHTML = `<div class="contador"><i class="fas fa-exclamation-triangle"></i> Error: ${error.message}</div>`;
    }
};

const marcarComoLeido = async (id) => {
    try {
        const response = await fetch(`${API_URL}/mensajes/${id}/leido`, { method: 'PUT' });
        if (response.ok) cargarMensajes();
        else alert('Error');
    } catch (error) {
        alert('Error de conexión');
    }
};

const eliminarMensaje = async (id) => {
    if (confirm('¿Eliminar este mensaje?')) {
        try {
            const response = await fetch(`${API_URL}/mensajes/${id}`, { method: 'DELETE' });
            if (response.ok) cargarMensajes();
            else alert('Error');
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

const verificarAdmin = () => {
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    const usuarioRol = localStorage.getItem('usuarioRol');
    const esAdmin = (usuarioRol === 'admin');
    
    if (!esAdmin) {
        const contenedor = document.getElementById('contenidoAdmin');
        if (contenedor) {
            contenedor.innerHTML = `
                <div class="contador">
                    <i class="fas fa-lock"></i> Acceso restringido<br>
                    <a href="Login.html">Iniciar sesión como administrador</a>
                </div>
            `;
        }
        return false;
    }
    return true;
};

document.addEventListener('DOMContentLoaded', () => {
    if (verificarAdmin()) cargarMensajes();
});