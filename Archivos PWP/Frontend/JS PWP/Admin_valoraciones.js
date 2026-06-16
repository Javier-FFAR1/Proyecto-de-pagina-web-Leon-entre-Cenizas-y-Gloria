// JS PWP/Admin_valoraciones.js

const API_URL = 'http://localhost:3000/api';

const cargarValoraciones = async () => {
    const contenedor = document.getElementById('contenidoValoraciones');
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    const usuarioRol = localStorage.getItem('usuarioRol');
    const esAdmin = (usuarioRol === 'admin');
    
    if (!contenedor) return;
    
    if (!esAdmin) {
        contenedor.innerHTML = '<div class="contador"><i class="fas fa-lock"></i> Acceso restringido. Solo administrador.</div>';
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/valoraciones`);
        const valoraciones = await response.json();
        
        if (valoraciones.length === 0) {
            contenedor.innerHTML = '<div class="contador"><i class="fas fa-chart-line"></i> No hay valoraciones aún.</div>';
            return;
        }
        
        const promedio = valoraciones.reduce((sum, v) => sum + v.valoracion, 0) / valoraciones.length;
        
        contenedor.innerHTML = `
            <div class="contador">
                <i class="fas fa-star" style="color: #f1c40f;"></i> Promedio: ${promedio.toFixed(1)} estrellas | 
                <i class="fas fa-chart-simple"></i> Total: ${valoraciones.length} valoraciones
            </div>
            <div style="overflow-x: auto;">
                <table class="tabla-valoraciones">
                    <thead>
                        <tr>
                            <th><i class="fas fa-hashtag"></i></th>
                            <th><i class="fas fa-user"></i> Usuario</th>
                            <th><i class="fas fa-star"></i> Valoración</th>
                            <th><i class="fas fa-calendar"></i> Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${valoraciones.map((v, i) => `
                            <tr>
                                <td>${i + 1}</td>
                                <td>${v.nombre_usuario ? '<i class="fas fa-user-circle"></i> ' + escapeHTML(v.nombre_usuario) : '<i class="fas fa-user-secret"></i> Anónimo'}</td>
                                <td><span class="estrellas">${'★'.repeat(v.valoracion)}${'☆'.repeat(5 - v.valoracion)}</span> (${v.valoracion})</td>
                                <td><i class="fas fa-clock"></i> ${new Date(v.fecha).toLocaleString()}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } catch (error) {
        console.error('Error:', error);
        contenedor.innerHTML = '<div class="contador"><i class="fas fa-exclamation-triangle"></i> Error al cargar valoraciones</div>';
    }
};

const escapeHTML = (texto) => {
    if (!texto) return '';
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
};

document.addEventListener('DOMContentLoaded', cargarValoraciones);