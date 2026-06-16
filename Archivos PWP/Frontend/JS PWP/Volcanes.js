// JS PWP/Volcanes.js - CONEXIÓN CON BACKEND

const API_URL = 'http://localhost:3000/api';
let volcanesData = [];

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

const cargarVolcanesDesdeAPI = async () => {
    mostrarEsqueletos('volcanesGrid', 4);
    try {
        const response = await fetch(`${API_URL}/volcanes`);
        if (!response.ok) throw new Error('Error al cargar volcanes');
        volcanesData = await response.json();
        console.log('Volcanes cargados:', volcanesData.length);
        return volcanesData;
    } catch (error) {
        console.error('Error:', error);
        mostrarError('No se pudieron cargar los volcanes');
        return [];
    }
};

const mostrarVolcanes = (volcanes) => {
    const container = document.getElementById('volcanesGrid');
    if (!container) return;
    
    if (volcanes.length === 0) {
        container.innerHTML = '<div class="sin-resultados"><i class="fas fa-info-circle"></i> No hay volcanes disponibles</div>';
        return;
    }
    
    container.innerHTML = volcanes.map(volcan => {
        const descCompleta = volcan.descripcion || 'Sin descripción';
        const descCorta = descCompleta.length > 120
            ? descCompleta.substring(0, 120) + '...'
            : descCompleta;
        return `
        <div class="volcan-card scroll-oculto"
             onclick="window.location.href='Detalle.html?tipo=volcan&id=${volcan.id_volcan}'"
             style="cursor:pointer;">
            <div class="volcan-img">
                <img src="Imagenes PWP/${volcan.imagen || 'placeholder.jpg'}" alt="${volcan.nombre}" onerror="this.src='Imagenes PWP/placeholder.jpg'">
            </div>
            <div class="volcan-info">
                <h3>${escapeHTML(volcan.nombre)}</h3>
                <p>${escapeHTML(descCorta)}</p>
            </div>
            <div class="volcan-card-footer">
                <span class="altura"><i class="fas fa-arrows-alt-v"></i> Altura: ${volcan.altura || '?'} msnm</span>
                <div class="ver-mas"><i class="fas fa-eye"></i> Ver detalle</div>
            </div>
        </div>
    `}).join('');
};

const mostrarError = (mensaje) => {
    const container = document.getElementById('volcanesGrid');
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

const initVolcanes = async () => {
    await cargarVolcanesDesdeAPI();
    mostrarVolcanes(volcanesData);
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
    document.querySelectorAll('.volcan-card').forEach(card => observer.observe(card));
};

document.addEventListener('DOMContentLoaded', initVolcanes);