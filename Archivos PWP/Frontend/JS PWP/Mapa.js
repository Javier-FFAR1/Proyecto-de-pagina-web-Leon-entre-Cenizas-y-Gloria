// JS PWP/Mapa.js
const coordenadasLeon = [12.4357, -86.8788];

const lugares = [
    // Iglesias
    { nombre: "Catedral de León", categoria: "iglesias", lat: 12.4350, lng: -86.8781, pagina: "Monumento.html", descripcion: "Patrimonio de la Humanidad", icono: "fa-church" },
    { nombre: "Iglesia San Juan de Dios", categoria: "iglesias", lat: 12.4360, lng: -86.8775, pagina: "Monumento.html", descripcion: "Siglo XVIII", icono: "fa-church" },
    { nombre: "Iglesia El Calvario", categoria: "iglesias", lat: 12.4355, lng: -86.8810, pagina: "Monumento.html", descripcion: "Cristo Negro", icono: "fa-church" },
    { nombre: "Iglesia La Merced", categoria: "iglesias", lat: 12.4350, lng: -86.8760, pagina: "Monumento.html", descripcion: "Fachada barroca", icono: "fa-church" },
    { nombre: "Iglesia San Francisco", categoria: "iglesias", lat: 12.4335, lng: -86.8790, pagina: "Monumento.html", descripcion: "Siglo XVII", icono: "fa-church" },
    { nombre: "Iglesia El Sutiaba", categoria: "iglesias", lat: 12.4300, lng: -86.8750, pagina: "Monumento.html", descripcion: "Templo de 1524", icono: "fa-church" },
    { nombre: "Iglesia La Recolección", categoria: "iglesias", lat: 12.4338, lng: -86.8802, pagina: "Monumento.html", descripcion: "Templo del siglo XVIII, centro cultural", icono: "fa-church" },
    { nombre: "Iglesia San Felipe", categoria: "iglesias", lat: 12.4320, lng: -86.8820, pagina: "Monumento.html", descripcion: "Siglo XVIII, barrio San Felipe", icono: "fa-church" },
    { nombre: "Iglesia San Sebastián", categoria: "iglesias", lat: 12.4340, lng: -86.8730, pagina: "Monumento.html", descripcion: "Siglo XVIII, fiestas patronales en enero", icono: "fa-church" },
    // Museos
    { nombre: "Museo de la Revolución", categoria: "museos", lat: 12.4350, lng: -86.8775, pagina: "Monumento.html", descripcion: "Historia revolucionaria", icono: "fa-landmark" },
    { nombre: "Museo de Arte Ortíz Gurdián", categoria: "museos", lat: 12.4340, lng: -86.8795, pagina: "Monumento.html", descripcion: "Arte internacional", icono: "fa-landmark" },
    { nombre: "Museo Rubén Darío", categoria: "museos", lat: 12.4365, lng: -86.8780, pagina: "Monumento.html", descripcion: "Casa natal del poeta", icono: "fa-landmark" },
    { nombre: "Antigua Cárcel de la 21", categoria: "museos", lat: 12.4335, lng: -86.8805, pagina: "Monumento.html", descripcion: "Centro cultural", icono: "fa-landmark" },
    // Teatros
    { nombre: "Teatro José de la Cruz Mena", categoria: "teatros", lat: 12.4360, lng: -86.8785, pagina: "Monumento.html", descripcion: "Teatro municipal 1885", icono: "fa-theater-masks" },
    // Universidades
    { nombre: "UNAN - León", categoria: "universidades", lat: 12.4320, lng: -86.8800, pagina: "Monumento.html", descripcion: "Segunda más antigua", icono: "fa-graduation-cap" },
    { nombre: "Colegio San Ramón", categoria: "universidades", lat: 12.4342, lng: -86.8778, pagina: "Monumento.html", descripcion: "Antigua sede de la Universidad Nacional", icono: "fa-graduation-cap" },
    { nombre: "Facultad de Derecho UNAN", categoria: "universidades", lat: 12.4328, lng: -86.8800, pagina: "Monumento.html", descripcion: "Edificio colonial patrimonial", icono: "fa-graduation-cap" },
    { nombre: "Edificio de Ciencias Sociales UNAN", categoria: "universidades", lat: 12.4320, lng: -86.8790, pagina: "Monumento.html", descripcion: "Arquitectura histórica", icono: "fa-graduation-cap" },
    // Patrimonio
    { nombre: "León Viejo (Ruinas)", categoria: "patrimonio", lat: 12.4005, lng: -86.6178, pagina: "Monumento.html", descripcion: "Patrimonio de la Humanidad", icono: "fa-landmark" },
    { nombre: "Palacio Municipal", categoria: "patrimonio", lat: 12.4345, lng: -86.8780, pagina: "Monumento.html", descripcion: "Edificio del siglo XIX", icono: "fa-landmark" },
    { nombre: "Estación de Ferrocarril", categoria: "patrimonio", lat: 12.4310, lng: -86.8795, pagina: "Monumento.html", descripcion: "Arquitectura ferroviaria", icono: "fa-landmark" },
    // Volcanes
    { nombre: "Cerro Negro", categoria: "volcanes", lat: 12.506, lng: -86.702, pagina: "Volcanes.html", descripcion: "Sandboard", icono: "fa-mountain" },
    { nombre: "Volcán Telica", categoria: "volcanes", lat: 12.602, lng: -86.845, pagina: "Volcanes.html", descripcion: "Cráter humeante", icono: "fa-mountain" },
    { nombre: "Volcán Santa Clara", categoria: "volcanes", lat: 12.581, lng: -86.813, pagina: "Volcanes.html", descripcion: "Cráter accesible", icono: "fa-mountain" },
    { nombre: "Volcán El Hoyo", categoria: "volcanes", lat: 12.489, lng: -86.665, pagina: "Volcanes.html", descripcion: "Tres cráteres", icono: "fa-mountain" },
    { nombre: "Volcán Rota", categoria: "volcanes", lat: 12.550, lng: -86.750, pagina: "Volcanes.html", descripcion: "Paisaje volcánico", icono: "fa-mountain" },
    { nombre: "Volcán Momotombo", categoria: "volcanes", lat: 12.4229, lng: -86.5397, pagina: "Volcanes.html", descripcion: "Destruyó León Viejo en 1610", icono: "fa-mountain" },

    // Héroes y Mártires
    { nombre: "Mausoleo de los Héroes y Mártires", categoria: "patrimonio", lat:12.4355609, lng:-86.8784519, pagina: "Monumento.html", descripcion: "Homenaje a los héroes", icono: "fa-flag" },

    // Municipios
    { nombre: "León (Ciudad)", categoria: "municipios", lat: 12.4333, lng: -86.8867, pagina: "Municipios.html", descripcion: "Cabecera departamental, Capital Cultural", icono: "fa-city" },
    { nombre: "La Paz Centro", categoria: "municipios", lat: 12.3394, lng: -86.6741, pagina: "Municipios.html", descripcion: "Cuna del quesillo nicaragüense", icono: "fa-utensils" },
    { nombre: "Nagarote", categoria: "municipios", lat: 12.2692, lng: -86.5618, pagina: "Municipios.html", descripcion: "Entre el lago Xolotlán y el Momotombo", icono: "fa-water" },
    { nombre: "El Jicaral", categoria: "municipios", lat: 12.733, lng: -86.383, pagina: "Municipios.html", descripcion: "Producción pesquera en el río Grande", icono: "fa-fish" },
    { nombre: "El Sauce", categoria: "municipios", lat: 12.8833, lng: -86.5333, pagina: "Municipios.html", descripcion: "Zona montañosa, laguna El Tule", icono: "fa-mountain" },
    { nombre: "Achuapa", categoria: "municipios", lat: 13.050, lng: -86.583, pagina: "Municipios.html", descripcion: "Paisajes montañosos, cerro San Gabriel", icono: "fa-hiking" },
    { nombre: "Santa Rosa del Peñón", categoria: "municipios", lat: 12.800, lng: -86.367, pagina: "Municipios.html", descripcion: "Zona agrícola y ganadera", icono: "fa-tractor" },
    { nombre: "Telica (Municipio)", categoria: "municipios", lat: 12.517, lng: -86.867, pagina: "Municipios.html", descripcion: "Zona minera y volcán Telica", icono: "fa-fire" },
    { nombre: "Quezalguaque", categoria: "municipios", lat: 12.506, lng: -86.903, pagina: "Municipios.html", descripcion: "Cuna del cacique Adiac", icono: "fa-museum" },
    { nombre: "Malpaisillo", categoria: "municipios", lat: 12.593, lng: -86.679, pagina: "Municipios.html", descripcion: "Cerca del volcán Cerro Negro", icono: "fa-volcano" },
];

let map;
let marcadores = [];

function initMap() {
    map = L.map('map').setView(coordenadasLeon, 12);
    
   L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://stamen.com">Stamen Design</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    minZoom: 0,
    maxZoom: 18
    }).addTo(map);
    
    agregarMarcadores('todos');
}

function agregarMarcadores(categoria) {
    marcadores.forEach(marker => map.removeLayer(marker));
    marcadores = [];
    
    const lugaresMostrar = categoria === 'todos' ? lugares : lugares.filter(l => l.categoria === categoria);
    
    const colores = {
        iglesias: '#667eea',
        museos: '#e74c3c',
        teatros: '#9b59b6',
        universidades: '#27ae60',
        patrimonio: '#f39c12',
        volcanes: '#e96443',
        municipios: '#16a085'
    };
    
    lugaresMostrar.forEach(lugar => {
        const color = colores[lugar.categoria] || '#3498db';
        
        const iconoHtml = `
            <div style="background: ${color}; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.3); border: 2px solid white; cursor: pointer;">
                <i class="fas ${lugar.icono}" style="color: white; font-size: 16px;"></i>
            </div>
        `;
        
        const icono = L.divIcon({
            html: iconoHtml,
            iconSize: [36, 36],
            className: 'custom-marker',
            popupAnchor: [0, -18]
        });
        
        const marker = L.marker([lugar.lat, lugar.lng], { icon: icono }).addTo(map);
        
        marker.bindPopup(`
            <div class="info-marker">
                <h3>${lugar.nombre}</h3>
                <p>${lugar.descripcion}</p>
                <a href="${lugar.pagina}">Ver más →</a>
            </div>
        `);
        
        marcadores.push(marker);
    });
}

function configurarFiltros() {
    const botones = document.querySelectorAll('.filtro-mapa-btn');
    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            botones.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            agregarMarcadores(this.dataset.categoria);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initMap();
    configurarFiltros();
});