// JS PWP/Detalle.js
const API_URL = 'http://localhost:3000/api';

const params = new URLSearchParams(window.location.search);
const tipo = params.get('tipo');
const id   = params.get('id');

const config = {
    monumento: {
        endpoint: `${API_URL}/monumentos`,
        idCampo:  'id_monumento',
        imagen:   (item) => `Imagenes PWP/${item.imagen || 'placeholder.jpg'}`,
        badge:    (item) => item.categoria || '',
        meta:     (item) => `
            <span class="meta-item"><i class="fas fa-map-marker-alt"></i> ${item.ubicacion || 'León, Nicaragua'}</span>
            <span class="meta-item"><i class="fas fa-tag"></i> ${item.categoria || 'Monumento'}</span>
        `,
        mostrarMapa: true,
        volver: 'Monumento.html',
        seccion: 'monumentos'
    },
    personaje: {
        endpoint: `${API_URL}/personajes`,
        idCampo:  'id_personaje',
        imagen:   (item) => `Imagenes PWP/${item.imagen || 'placeholder.jpg'}`,
        badge:    (item) => item.nacimiento ? `${item.nacimiento} – ${item.muerte || 'presente'}` : '',
        meta:     (item) => `
            <span class="meta-item"><i class="fas fa-calendar-alt"></i> ${item.nacimiento || '?'} – ${item.muerte || '?'}</span>
            <span class="meta-item"><i class="fas fa-map-marker-alt"></i> León, Nicaragua</span>
        `,
        mostrarMapa: false,
        volver: 'Personajes.html',
        seccion: 'personajes'
    },
    volcan: {
        endpoint: `${API_URL}/volcanes`,
        idCampo:  'id_volcan',
        imagen:   (item) => `Imagenes PWP/${item.imagen || 'placeholder.jpg'}`,
        badge:    (item) => item.actividad || '',
        meta:     (item) => `
            <span class="meta-item"><i class="fas fa-arrows-alt-v"></i> ${item.altura ? item.altura + ' msnm' : 'Altura desconocida'}</span>
            <span class="meta-item"><i class="fas fa-fire"></i> ${item.actividad || 'Actividad desconocida'}</span>
        `,
        mostrarMapa: true,
        volver: 'Volcanes.html',
        seccion: 'volcanes'
    }
};

const escapeHTML = (texto) => {
    if (!texto) return '';
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
};

const compartir = () => {
    const titulo = document.getElementById('detalleTitulo').textContent;
    if (navigator.share) {
        navigator.share({
            title: titulo,
            text: `Descubre ${titulo} en León entre Cenizas y Gloria`,
            url: window.location.href
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(window.location.href);
        if (typeof mostrarToast === 'function') mostrarToast('Enlace copiado al portapapeles', 'info');
    }
};

const cargarDetalle = async () => {
    const cargando  = document.getElementById('detalleCargando');
    const contenido = document.getElementById('detalleContenido');
    const error     = document.getElementById('detalleError');

    if (!tipo || !id) {
        cargando.style.display = 'none';
        error.style.display = 'block';
        return;
    }

    // Caso especial: municipio (datos en sessionStorage)
    if (tipo === 'municipio') {
        const datos = sessionStorage.getItem('municipioDetalle');
        if (!datos) {
            cargando.style.display = 'none';
            error.style.display = 'block';
            return;
        }
        const municipio = JSON.parse(datos);

        document.title = `${municipio.nombre} - León entre Cenizas y Gloria`;

        // Marcar nav
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === 'municipios') item.classList.add('active');
        });

        // Construir carrusel en lugar de imagen única
        const wrapperImg = document.getElementById('detalleImagenWrapper');
        if (wrapperImg) {
            wrapperImg.innerHTML = `
                <div class="carrusel-detalle">
                    <div class="carrusel-detalle-slides" id="carruselDetalleSlides">
                        ${municipio.imagenes.map((img, i) => `
                            <div class="carrusel-detalle-slide ${i === 0 ? 'active' : ''}">
                                <img src="${img}" alt="${municipio.nombre}" 
                                     onerror="this.src='Imagenes PWP/placeholder.jpg'">
                            </div>
                        `).join('')}
                    </div>
                    <button class="carrusel-detalle-btn prev" onclick="cambiarSlide(-1)">❮</button>
                    <button class="carrusel-detalle-btn next" onclick="cambiarSlide(1)">❯</button>
                    <div class="carrusel-detalle-dots">
                        ${municipio.imagenes.map((_, i) => `
                            <span class="carrusel-detalle-dot ${i === 0 ? 'active' : ''}" 
                                  onclick="irSlide(${i})"></span>
                        `).join('')}
                    </div>
                    <div class="detalle-badge" id="detalleBadge">Municipio</div>
                </div>
            `;
            iniciarCarruselDetalle();
        }

        document.getElementById('detalleTitulo').textContent = municipio.nombre;
        document.getElementById('detalleMeta').innerHTML = `
            <span class="meta-item"><i class="fas fa-map-marker-alt"></i> Departamento de León, Nicaragua</span>
            <span class="meta-item"><i class="fas fa-city"></i> Municipio</span>
        `;

        const parrafos = (municipio.descripcionCompleta || municipio.descripcion)
            .split('\n').filter(p => p.trim() !== '');
        document.getElementById('detalleDescripcion').innerHTML = parrafos
            .map(p => `<p>${escapeHTML(p.trim())}</p>`).join('');

        const btnMapa = document.getElementById('detalleVerMapa');
        if (btnMapa) btnMapa.style.display = 'inline-flex';

        document.getElementById('btnVolver').onclick = () => {
            window.location.href = 'Municipios.html';
        };

        cargando.style.display = 'none';
        contenido.style.display = 'block';
        return;
    }

    if (!config[tipo]) {
        cargando.style.display = 'none';
        error.style.display = 'block';
        return;
    }

    const cfg = config[tipo];

    // Marcar nav activo según sección
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === cfg.seccion) item.classList.add('active');
    });

    try {
        const response = await fetch(cfg.endpoint);
        if (!response.ok) throw new Error('Error al cargar datos');
        const lista = await response.json();
        const item = lista.find(i => String(i[cfg.idCampo]) === String(id));

        if (!item) {
            cargando.style.display = 'none';
            error.style.display = 'block';
            return;
        }

        document.title = `${item.nombre} - León entre Cenizas y Gloria`;

        const img = document.getElementById('detalleImagen');
        img.src = cfg.imagen(item);
        img.alt = item.nombre;
        img.onerror = () => { img.src = 'Imagenes PWP/placeholder.jpg'; };

        document.getElementById('detalleBadge').textContent = cfg.badge(item);
        document.getElementById('detalleTitulo').textContent = item.nombre;
        document.getElementById('detalleMeta').innerHTML = cfg.meta(item);

        // Descripción: mostrar párrafos separados si hay saltos de línea
        const descripcion = item.descripcion || 'Sin descripción disponible.';
        const parrafos = descripcion.split('\n').filter(p => p.trim() !== '');
        document.getElementById('detalleDescripcion').innerHTML = parrafos
            .map(p => `<p>${escapeHTML(p.trim())}</p>`)
            .join('');

        // Mostrar/ocultar botón de mapa
        const btnMapa = document.getElementById('detalleVerMapa');
        if (btnMapa) btnMapa.style.display = cfg.mostrarMapa ? 'inline-flex' : 'none';

        document.getElementById('btnVolver').onclick = () => {
            window.location.href = cfg.volver;
        };

        cargando.style.display = 'none';
        contenido.style.display = 'block';

    } catch (err) {
        console.error('Error:', err);
        cargando.style.display = 'none';
        error.style.display = 'block';
    }
};

document.addEventListener('DOMContentLoaded', cargarDetalle);

// ============================================
// CARRUSEL DE MUNICIPIOS
// ============================================
let slideActual = 0;
let totalSlides = 0;

const iniciarCarruselDetalle = () => {
    const slides = document.querySelectorAll('.carrusel-detalle-slide');
    totalSlides = slides.length;
    slideActual = 0;
};

const cambiarSlide = (direccion) => {
    slideActual = (slideActual + direccion + totalSlides) % totalSlides;
    actualizarCarrusel();
};

const irSlide = (index) => {
    slideActual = index;
    actualizarCarrusel();
};

const actualizarCarrusel = () => {
    document.querySelectorAll('.carrusel-detalle-slide').forEach((slide, i) => {
        slide.classList.toggle('active', i === slideActual);
    });
    document.querySelectorAll('.carrusel-detalle-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === slideActual);
    });
};