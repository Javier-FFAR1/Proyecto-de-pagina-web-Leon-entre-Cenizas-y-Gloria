// JS PWP/Personajes.js - CONEXIÓN CON BACKEND

const API_URL = 'http://localhost:3000/api';
let personajesData = [];

const mostrarEsqueletos = (containerId, cantidad = 4) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = Array(cantidad).fill(`
        <div class="esqueleto-card">
            <div class="esqueleto-img esqueleto-anim"></div>
            <div class="esqueleto-info">
                <div class="esqueleto-linea esqueleto-anim" style="width:70%;height:20px;margin-bottom:10px;"></div>
                <div class="esqueleto-linea esqueleto-anim" style="width:100%;height:14px;margin-bottom:6px;"></div>
                <div class="esqueleto-linea esqueleto-anim" style="width:85%;height:14px;margin-bottom:6px;"></div>
                <div class="esqueleto-linea esqueleto-anim" style="width:40%;height:12px;"></div>
            </div>
        </div>
    `).join('');
};

const cargarPersonajesDesdeAPI = async () => {
    mostrarEsqueletos('personajesGrid', 4);
    try {
        const response = await fetch(`${API_URL}/personajes`);
        if (!response.ok) throw new Error('Error al cargar personajes');
        personajesData = await response.json();
        console.log('Personajes cargados:', personajesData.length);
        return personajesData;
    } catch (error) {
        console.error('Error:', error);
        mostrarError('No se pudieron cargar los personajes');
        return [];
    }
};

const mostrarPersonajes = (personajes) => {
    const container = document.getElementById('personajesGrid');
    if (!container) return;
    
    if (personajes.length === 0) {
        container.innerHTML = '<div class="sin-resultados"><i class="fas fa-info-circle"></i> No hay personajes disponibles</div>';
        return;
    }
    
    container.innerHTML = personajes.map(personaje => {
        const descCompleta = personaje.descripcion || 'Sin descripción';
        const descCorta = descCompleta.length > 120
            ? descCompleta.substring(0, 120) + '...'
            : descCompleta;
        return `
        <div class="personaje-card scroll-oculto"
             onclick="window.location.href='Detalle.html?tipo=personaje&id=${personaje.id_personaje}'"
             style="cursor:pointer;">
            <div class="personaje-img">
                <img src="Imagenes PWP/${personaje.imagen || 'placeholder.jpg'}" alt="${personaje.nombre}" onerror="this.src='Imagenes PWP/placeholder.jpg'">
            </div>
            <div class="personaje-info">
                <h3>${escapeHTML(personaje.nombre)}</h3>
                <p>${escapeHTML(descCorta)}</p>
            </div>
            <div class="personaje-card-footer">
                <span class="ano"><i class="fas fa-calendar-alt"></i> ${personaje.nacimiento || '?'} - ${personaje.muerte || '?'}</span>
                <div class="ver-mas"><i class="fas fa-eye"></i> Ver detalle</div>
            </div>
        </div>
    `}).join('');
};

const mostrarError = (mensaje) => {
    const container = document.getElementById('personajesGrid');
    if (container) {
        container.innerHTML = `<div class="error-message"><i class="fas fa-exclamation-triangle"></i> ${mensaje}</div>`;
    }
};

const escapeHTML = (texto) => {
    if (!texto) return '';
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
};

const initPersonajes = async () => {
    await cargarPersonajesDesdeAPI();
    mostrarPersonajes(personajesData);
    iniciarAnimacionScroll();
};

const iniciarAnimacionScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('animate'), i * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.personaje-card').forEach(card => observer.observe(card));
};

document.addEventListener('DOMContentLoaded', initPersonajes);