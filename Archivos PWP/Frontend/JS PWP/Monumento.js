// JS PWP/Monumento.js - CONEXIÓN CON BACKEND

const API_URL = 'http://localhost:3000/api';
let monumentosData = [];

const mostrarEsqueletos = (containerId, cantidad = 6) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = Array(cantidad).fill(`
        <div class="esqueleto-card">
            <div class="esqueleto-img esqueleto-anim"></div>
            <div class="esqueleto-info">
                <div class="esqueleto-linea esqueleto-anim" style="width:70%;height:20px;margin-bottom:10px;"></div>
                <div class="esqueleto-linea esqueleto-anim" style="width:100%;height:14px;margin-bottom:6px;"></div>
                <div class="esqueleto-linea esqueleto-anim" style="width:85%;height:14px;margin-bottom:6px;"></div>
                <div class="esqueleto-linea esqueleto-anim" style="width:50%;height:12px;"></div>
            </div>
        </div>
    `).join('');
};

const cargarMonumentosDesdeAPI = async () => {
    mostrarEsqueletos('galeriaGrid', 6);
    try {
        const response = await fetch(`${API_URL}/monumentos`);
        if (!response.ok) throw new Error('Error al cargar monumentos');
        monumentosData = await response.json();
        console.log('Monumentos cargados:', monumentosData.length);
        return monumentosData;
    } catch (error) {
        console.error('Error:', error);
        mostrarError('No se pudieron cargar los monumentos');
        return [];
    }
};

const mostrarMonumentos = (monumentos) => {
    const container = document.getElementById('galeriaGrid');
    if (!container) return;
    
    if (monumentos.length === 0) {
        container.innerHTML = '<div class="sin-resultados"><i class="fas fa-info-circle"></i> No hay monumentos disponibles</div>';
        return;
    }
    
    // Mapa de categorías (singular a plural)
    const categoriaMap = {
        'iglesia': 'iglesias',
        'museo': 'museos',
        'teatro': 'teatros',
        'universidad': 'universidades',
        'patrimonio': 'patrimonio',
        'hotel': 'hoteles'
    };
    
    container.innerHTML = monumentos.map(monumento => {
        const categoriaFinal = categoriaMap[monumento.categoria] || monumento.categoria;
        const descCompleta = monumento.descripcion || 'Sin descripción';
        const descCorta = descCompleta.length > 120
            ? descCompleta.substring(0, 120) + '...'
            : descCompleta;

        return `
            <div class="galeria-item scroll-oculto" data-categoria="${categoriaFinal}"
                 onclick="window.location.href='Detalle.html?tipo=monumento&id=${monumento.id_monumento}'"
                 style="cursor:pointer;">
                <div class="galeria-img">
                    <img src="${encodeURI('Imagenes PWP/' + (monumento.imagen || 'placeholder.jpg'))}" 
                         alt="${monumento.nombre}" 
                         onerror="this.src=encodeURI('Imagenes PWP/placeholder.jpg')">
                </div>
                <div class="galeria-info">
                    <h3>${escapeHTML(monumento.nombre)}</h3>
                    <p>${escapeHTML(descCorta)}</p>
                </div>
                <div class="galeria-card-footer">
                    <div class="ubicacion"><i class="fas fa-map-marker-alt"></i> ${escapeHTML(monumento.ubicacion || 'León, Nicaragua')}</div>
                    <div class="ver-mas"><i class="fas fa-eye"></i> Ver detalle</div>
                </div>
            </div>
        `;
    }).join('');
    
    actualizarContador();
    configurarFiltros();
};

const configurarFiltros = () => {
    const filtros = document.querySelectorAll('.filtro-btn');
    const items = document.querySelectorAll('.galeria-item');
    const resultadosCount = document.getElementById('resultadosCount');
    
    if (!filtros.length) return;
    
    const actualizarContadorFiltro = () => {
        const visibles = Array.from(items).filter(item => item.style.display !== 'none').length;
        if (resultadosCount) resultadosCount.innerHTML = `Mostrando ${visibles} de ${items.length} monumentos`;
    };
    
    filtros.forEach(filtro => {
        filtro.addEventListener('click', () => {
            filtros.forEach(f => f.classList.remove('active'));
            filtro.classList.add('active');
            
            const categoria = filtro.dataset.categoria;
            console.log('Filtrando por:', categoria);
            
            items.forEach(item => {
                if (categoria === 'todos' || item.dataset.categoria === categoria) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            actualizarContadorFiltro();
        });
    });
    
    actualizarContadorFiltro();
};

const configurarLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxUbicacion = document.getElementById('lightboxUbicacion');
    
    const items = document.querySelectorAll('.galeria-item');
    
    items.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.galeria-img img');
            const title = item.querySelector('h3').innerHTML;
            const desc = item.querySelector('p').innerHTML;
            const ubicacion = item.querySelector('.ubicacion').innerHTML;
            
            if (img) lightboxImg.src = img.src;
            lightboxTitle.innerHTML = title;
            lightboxDesc.innerHTML = desc;
            lightboxUbicacion.innerHTML = ubicacion;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    const cerrarLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('close-lightbox')) {
            cerrarLightbox();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            cerrarLightbox();
        }
    });
};

const actualizarContador = () => {
    const items = document.querySelectorAll('.galeria-item');
    const visibles = Array.from(items).filter(item => item.style.display !== 'none').length;
    const contador = document.getElementById('resultadosCount');
    if (contador) contador.innerHTML = `Mostrando ${visibles} de ${items.length} monumentos`;
};

const mostrarError = (mensaje) => {
    const container = document.getElementById('galeriaGrid');
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

const initMonumentos = async () => {
    await cargarMonumentosDesdeAPI();
    mostrarMonumentos(monumentosData);
    iniciarAnimacionScroll();
};

const iniciarAnimacionScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('animate'), i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.galeria-item').forEach(item => observer.observe(item));
};

document.addEventListener('DOMContentLoaded', initMonumentos);