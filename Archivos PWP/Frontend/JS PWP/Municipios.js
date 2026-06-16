// ================================================================
//  Municipios.js — León entre Cenizas y Gloria
//  Carga desde la API REST (Node + MySQL)
//  Fallback a datos locales si el servidor no está disponible
// ================================================================

const API_URL = 'http://localhost:3000/api/municipios';

// ── DATOS LOCALES DE RESPALDO ─────────────────────────────────────
const MUNICIPIOS_LOCAL = [
    {
        id: 1, nombre: "León",
        descripcion: "Cabecera departamental. Ciudad universitaria, cultural y patrimonial de Nicaragua. Conocida como la Capital Cultural del país.",
        descripcionCompleta: "León es la segunda ciudad más grande de Nicaragua y su capital cultural. Fundada en 1524 por Francisco Hernández de Córdoba, es sede de la UNAN-León, la segunda universidad más antigua de Centroamérica. Su centro histórico, declarado Patrimonio de la Humanidad junto a la Catedral de la Asunción, alberga una extraordinaria concentración de iglesias coloniales, museos y edificios históricos que hacen de la ciudad un museo a cielo abierto.\n\nLa ciudad fue el epicentro político e intelectual de Nicaragua durante siglos, cuna de Rubén Darío —máximo exponente del Modernismo literario— y escenario de la Revolución Sandinista. Su tradición universitaria, sus poetas y su arquitectura colonial la convierten en un destino cultural único en Centroamérica que atrae a visitantes de todo el mundo.\n\nLeón es también conocida por su gastronomía, sus festividades religiosas y el fervor de sus habitantes, que mantienen vivas tradiciones como La Purísima, la Gigantona y el Enano Cabezón. Caminar por sus calles empedradas es recorrer siglos de historia viva que palpita entre sus paredes encaladas y sus imponentes cúpulas.",
        icono: "fa-church",
        imagenes: ["Imagenes PWP/Municipios/León/Catedral.jpg","Imagenes PWP/Municipios/León/Centro Historico.jpg","Imagenes PWP/Municipios/León/UNAN León.jpg","Imagenes PWP/Municipios/León/Parque Central.jpg","Imagenes PWP/Municipios/León/Parque Rubén Darío.jpg"]
    },
    {
        id: 2, nombre: "El Jicaral",
        descripcion: "Conocido por su producción de pescado y sus actividades acuáticas en el río Grande.",
        descripcionCompleta: "El Jicaral es un municipio ubicado al noreste del departamento de León, bañado por las aguas del río Grande de Matagalpa. Su economía se basa principalmente en la pesca artesanal, la agricultura y la ganadería, actividades que han dado forma a la identidad y las tradiciones de sus comunidades a lo largo de generaciones.\n\nEl río Grande es el corazón de la vida del municipio, proporcionando sustento a numerosas familias de pescadores que mantienen vivos métodos y técnicas ancestrales. Sus riberas ofrecen paisajes fluviales de gran belleza natural, con bosques de galería que albergan una rica biodiversidad apenas explorada por el turismo convencional.\n\nEl municipio conserva tradiciones y costumbres propias de la zona rural nicaragüense, con festividades patronales que reúnen a toda la comunidad en una celebración de fe y cultura popular. La pesca artesanal en el río Grande es una actividad que se transmite de generación en generación, siendo parte fundamental de la identidad cultural de El Jicaral.",
        icono: "fa-fish",
        imagenes: ["Imagenes PWP/Municipios/El Jicaral/Rio Grande.png","Imagenes PWP/Municipios/El Jicaral/Iglesia.jpg","Imagenes PWP/Municipios/El Jicaral/Pesca.jpg","Imagenes PWP/Municipios/El Jicaral/Paisaje.jpg","Imagenes PWP/Municipios/El Jicaral/paisaje2.jpg","Imagenes PWP/Municipios/El Jicaral/Pueblo.jpg"]
    },
    {
        id: 3, nombre: "El Sauce",
        descripcion: "Zona montañosa, famosa por su quesillo y la laguna El Tule. Destino de peregrinación religiosa al Señor de Esquipulas.",
        descripcionCompleta: "El Sauce es un municipio de zonas montañosas ubicado al norte del departamento de León, rodeado de cerros y bosques que le otorgan un clima fresco y paisajes de gran belleza natural. Es famoso en toda Nicaragua por la Laguna El Tule, un hermoso espejo de agua rodeado de vegetación exuberante que atrae a visitantes en busca de naturaleza, tranquilidad y recreación durante todo el año.\n\nEl municipio es también conocido por su gastronomía, especialmente el quesillo artesanal que se produce en sus comunidades y es considerado uno de los mejores de la región. La producción quesera es una actividad tradicional que refleja la riqueza ganadera de sus tierras y que ha convertido al quesillo saucero en un referente de la identidad gastronómica del departamento de León.\n\nLas fiestas patronales de El Sauce, dedicadas al Señor de Esquipulas, son de las más importantes del departamento, atrayendo peregrinos de toda Nicaragua que llegan con fe y devoción. La combinación de naturaleza, gastronomía y tradición religiosa convierte a El Sauce en uno de los municipios más visitados y queridos del departamento de León.",
        icono: "fa-mountain",
        imagenes: ["Imagenes PWP/Municipios/El Sauce/Laguna El Tule.jpg","Imagenes PWP/Municipios/El Sauce/Paisaje.jpg","Imagenes PWP/Municipios/El Sauce/Iglesia.jpg","Imagenes PWP/Municipios/El Sauce/Quesillo.jpg","Imagenes PWP/Municipios/El Sauce/Pueblo.jpg"]
    },
    {
        id: 4, nombre: "La Paz Centro",
        descripcion: "Cuna del quesillo nicaragüense, con rica tradición gastronómica y acceso a las Ruinas de León Viejo.",
        descripcionCompleta: "La Paz Centro es mundialmente conocida como la cuna del quesillo, el platillo más emblemático de Nicaragua. Ubicado sobre la carretera Panamericana entre Managua y León, el municipio es parada obligatoria para viajeros atraídos por los puestos de quesillo que se extienden a lo largo de la carretera, ofreciendo ese manjar de tortilla, queso, crema y vinagre con cebolla que ha trascendido fronteras.\n\nLa tradición de elaborar quesillo de manera artesanal se transmite de madres a hijas desde hace generaciones, siendo mucho más que un alimento: es un símbolo de la identidad gastronómica nicaragüense y un orgullo cultural del departamento de León. Cada familia tiene su receta propia, sus secretos y su forma de presentar este platillo que enamora a quien lo prueba por primera vez.\n\nEl municipio es también punto de acceso a las Ruinas de León Viejo, la primera capital de Nicaragua declarada Patrimonio de la Humanidad por la UNESCO, y al imponente Volcán Momotombo. La combinación de gastronomía, historia precolombina y naturaleza volcánica hace de La Paz Centro un nodo turístico imprescindible en cualquier recorrido por el departamento de León.",
        icono: "fa-utensils",
        imagenes: ["Imagenes PWP/Municipios/La Paz Centro/Quesillo.jpg","Imagenes PWP/Municipios/La Paz Centro/Carretera.jpg","Imagenes PWP/Municipios/La Paz Centro/Momotombo.jpg","Imagenes PWP/Municipios/La Paz Centro/Pueblo.jpg","Imagenes PWP/Municipios/La Paz Centro/Leon viejo.jpeg"]
    },
    {
        id: 5, nombre: "Nagarote",
        descripcion: "Ubicado entre el lago de Managua y el volcán Momotombo, con rica herencia indígena y artesanal.",
        descripcionCompleta: "Nagarote es un municipio de gran belleza natural ubicado entre el lago Xolotlán (lago de Managua) y el imponente volcán Momotombo. Esta posición privilegiada le otorga paisajes únicos donde el agua y el fuego conviven en una postal natural de extraordinaria belleza, con vistas al Momotombo reflejado en las aguas del lago que dejan sin aliento a quienes las contemplan.\n\nEl municipio tiene una rica historia que se remonta a la época precolombina, cuando comunidades indígenas habitaban sus costas y dejaron una profunda huella cultural que aún puede rastrearse en su toponimia, sus tradiciones y el trabajo de sus artesanos. Sus artesanos producen piezas de barro y cerámica que mantienen viva la tradición alfarera precolombina, siendo estas artesanías muy apreciadas por turistas y coleccionistas nacionales e internacionales.\n\nNagarote es también un importante centro de producción agrícola, con cultivos de caña de azúcar y granos básicos que alimentan su economía local. Las festividades patronales y la hospitalidad proverbial de su gente hacen de Nagarote un destino que combina naturaleza, historia y cultura en una experiencia auténtica y memorable del departamento de León.",
        icono: "fa-water",
        imagenes: ["Imagenes PWP/Municipios/Nagarote/Lago Xolotlan.jpg","Imagenes PWP/Municipios/Nagarote/Lago Xolotlan2.jpg","Imagenes PWP/Municipios/Nagarote/Momotombo.jpg","Imagenes PWP/Municipios/Nagarote/Artesanias.jpg","Imagenes PWP/Municipios/Nagarote/Pueblo.png"]
    },
    {
        id: 6, nombre: "Quezalguaque",
        descripcion: "Cuna del cacique Adiac, con profunda identidad indígena sutiaba y costa sobre el Pacífico.",
        descripcionCompleta: "Quezalguaque es un pequeño municipio de gran riqueza histórica ubicado al oeste del departamento de León, cerca de la costa del Pacífico. Es conocido por ser la tierra del cacique Adiac, el líder indígena sutiaba que resistió valientemente la conquista española, convirtiéndose en un símbolo de la resistencia indígena nicaragüense y en referente de la identidad cultural del municipio y de toda la región.\n\nEl municipio conserva una profunda identidad ligada a sus raíces indígenas sutiabas. Sus tradiciones, festividades y formas de organización comunitaria reflejan la continuidad de una cultura que ha sobrevivido siglos de transformaciones históricas. Las celebraciones en honor al cacique Adiac son un momento de reafirmación colectiva de esa identidad que distingue a Quezalguaque dentro del departamento de León.\n\nLa proximidad al mar y la actividad pesquera son también parte fundamental de la vida económica y cultural del municipio. Sus comunidades costeras mantienen una relación ancestral con el Pacífico que se expresa en sus tradiciones, su gastronomía de frutos del mar y su modo de vida, ofreciendo al visitante una experiencia auténtica entre historia indígena, fe popular y la inmensidad del océano.",
        icono: "fa-museum",
        imagenes: ["Imagenes PWP/Municipios/Quezalguaque/Cacique Adiact.jpg","Imagenes PWP/Municipios/Quezalguaque/Costa Pacifico.jpg","Imagenes PWP/Municipios/Quezalguaque/Iglesia.jpg","Imagenes PWP/Municipios/Quezalguaque/Tradiciones.jpg","Imagenes PWP/Municipios/Quezalguaque/Pueblo.jpg"]
    },
    {
        id: 7, nombre: "Santa Rosa del Peñón",
        descripcion: "Municipio ganadero en las serranías del norte, reconocido por sus quesos artesanales y el imponente peñón rocoso.",
        descripcionCompleta: "Santa Rosa del Peñón es un municipio ubicado en la zona montañosa del norte del departamento de León, caracterizado por sus extensas áreas de pastizales y fincas ganaderas. Sus tierras altas y su clima fresco favorecen la producción lechera de alta calidad, siendo sus quesos y cremas artesanales muy apreciados en todo el departamento y más allá de sus fronteras como símbolo de la ganadería leonesa.\n\nEl municipio toma su nombre del imponente peñón rocoso que domina el paisaje local, un accidente geográfico que ha sido punto de referencia para los habitantes de la región desde tiempos inmemoriales. Desde lo alto del peñón se pueden apreciar vistas panorámicas espectaculares de gran parte del departamento de León, con sus volcanes, llanos y el lejano brillo del lago Xolotlán.\n\nLa vida en Santa Rosa del Peñón gira en torno a los ciclos agrícolas y ganaderos que marcan el ritmo de sus comunidades. Sus ferias anuales de productos lácteos y agrícolas son momentos de encuentro, celebración y orgullo local que reúnen a productores y visitantes de toda la región, mostrando la riqueza y el trabajo de un municipio que alimenta al departamento con sus campos fértiles y su ganadería tradicional.",
        icono: "fa-tractor",
        imagenes: ["Imagenes PWP/Municipios/Santa Rosa del Peñon/Peñon.jpg","Imagenes PWP/Municipios/Santa Rosa del Peñon/Ganaderia.jpg","Imagenes PWP/Municipios/Santa Rosa del Peñon/Paisaje.jpg","Imagenes PWP/Municipios/Santa Rosa del Peñon/Queso.jpg","Imagenes PWP/Municipios/Santa Rosa del Peñon/Pueblo.jpg"]
    },
    {
        id: 8, nombre: "Achuapa",
        descripcion: "El municipio más septentrional de León, con serranías, bosques de pino y el emblemático cerro San Gabriel.",
        descripcionCompleta: "Achuapa es el municipio más septentrional del departamento de León, ubicado en la región montañosa que marca la frontera natural con los departamentos de Estelí y Chinandega. Sus paisajes de serranías, bosques de pino y quebradas de agua cristalina ofrecen una belleza natural sorprendente que contrasta con los paisajes volcánicos del resto del departamento, haciéndolo un destino único dentro de León.\n\nEl Cerro San Gabriel es el punto más alto y emblemático del municipio, un destino de senderismo que ofrece vistas panorámicas espectaculares de varios departamentos de Nicaragua. Su ascensión es una experiencia que combina el esfuerzo físico con la recompensa de paisajes de gran belleza natural, y que cada vez atrae a más amantes del turismo de aventura y el ecoturismo en Nicaragua.\n\nAchuapa es también conocido por sus comunidades rurales que mantienen formas de vida tradicionales basadas en la agricultura de subsistencia, la artesanía y el aprovechamiento sostenible de sus recursos naturales. El turismo rural y ecológico está emergiendo como una alternativa económica prometedora, permitiendo a los visitantes conocer de cerca la vida campesina nicaragüense en toda su autenticidad y hospitalidad.",
        icono: "fa-hiking",
        imagenes: ["Imagenes PWP/Municipios/Achuapa/Cerro San Gabriel.jpg","Imagenes PWP/Municipios/Achuapa/Montañas.jpg","Imagenes PWP/Municipios/Achuapa/Bosque.jpg","Imagenes PWP/Municipios/Achuapa/Pueblo.jpg","Imagenes PWP/Municipios/Achuapa/Rio.jpg"]
    },
    {
        id: 9, nombre: "Telica",
        descripcion: "Municipio volcánico y minero, hogar del Volcán Telica, uno de los más activos de Nicaragua.",
        descripcionCompleta: "Telica es un municipio que lleva el nombre de uno de los volcanes más activos de Nicaragua, el Volcán Telica, cuyo cráter constantemente humeante es visible desde gran parte del departamento. La presencia de este gigante de fuego ha moldeado profundamente la identidad, la economía y las tradiciones de sus habitantes, que conviven cotidianamente con la naturaleza volcánica que define el carácter del municipio.\n\nAdemás de su vocación volcánica y turística, Telica es un municipio minero con importante producción de cal y materiales de construcción. La minería artesanal ha sido durante siglos una actividad económica complementaria a la agricultura que proporciona sustento a numerosas familias del municipio, y que ha dejado su huella en el paisaje y en la cultura del trabajo de sus gentes.\n\nLas festividades patronales de Telica y su cultura local reflejan esa convivencia entre la tierra y el fuego que caracteriza al municipio. La gastronomía local, los mercados artesanales y la hospitalidad de su gente hacen de Telica un destino auténtico para quienes buscan conocer el León profundo, más allá de su capital, en contacto directo con la fuerza telúrica que da vida y forma a todo el departamento.",
        icono: "fa-oil-can",
        imagenes: ["Imagenes PWP/Municipios/Telica/Volcan Telica.jpg","Imagenes PWP/Municipios/Telica/Crater.jpg","Imagenes PWP/Municipios/Telica/Paisaje.jpg","Imagenes PWP/Municipios/Telica/Pueblo.jpg","Imagenes PWP/Municipios/Telica/Siembra.jpg"]
    },
    {
        id: 10, nombre: "Malpaisillo",
        descripcion: "Municipio de paisajes volcánicos únicos, famoso por el sandboard en el Cerro Negro y las lagunas cratéricas.",
        descripcionCompleta: "Malpaisillo es un municipio ubicado en la llanura central del departamento de León, en las inmediaciones del volcán Cerro Negro y la cadena volcánica de Los Marrabios. Su nombre hace referencia al 'mal país', como los colonizadores llamaban a los terrenos de lava volcánica que caracterizan parte de su territorio, un paisaje único de gran valor geológico y natural que hoy se ha convertido en atractivo turístico de primer orden.\n\nLa proximidad al Cerro Negro convierte a Malpaisillo en uno de los puntos de acceso al volcán más joven de Centroamérica y al famoso sandboard, la actividad de deslizarse a gran velocidad por sus laderas de arena volcánica negra. Este turismo de aventura ha puesto a Malpaisillo en el mapa turístico internacional, atrayendo viajeros de todo el mundo que buscan experiencias únicas en contacto con la naturaleza volcánica nicaragüense.\n\nEl municipio tiene también una importante producción agrícola, especialmente de granos básicos y caña de azúcar. Sus comunidades rurales mantienen tradiciones de trabajo colectivo y festividades religiosas que son expresión de la rica cultura popular del León rural. Las lagunas cratéricas del Complejo Volcánico San Cristóbal ofrecen además paisajes de insólita belleza que complementan la experiencia de visitar este territorio marcado por el fuego y la tierra.",
        icono: "fa-fire",
        imagenes: ["Imagenes PWP/Municipios/Malpaisillo/Cerro Negro.jpg","Imagenes PWP/Municipios/Malpaisillo/Sandboard.jpg","Imagenes PWP/Municipios/Malpaisillo/Paisaje.jpg","Imagenes PWP/Municipios/Malpaisillo/Pueblo.jpg","Imagenes PWP/Municipios/Malpaisillo/Lava.jpg"]
    }
];

let municipiosData = [];

// ── INICIALIZACIÓN ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', cargarMunicipios);

async function cargarMunicipios() {
    const grid = document.getElementById('municipiosGrid');
    if (!grid) return;

    mostrarSkeleton(grid);

    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const datos = await res.json();

        municipiosData = datos.map(d => ({
            id:                  d.id_municipio,
            nombre:              d.nombre,
            descripcion:         d.descripcion,
            descripcionCompleta: d.descripcion_completa || d.descripcion,
            icono:               d.icono || 'fa-map-marker-alt',
            imagenes: (() => {
                const raw = d.imagenes;
                let arr = [];
                if (!raw) {
                    arr = d.imagen_principal ? [d.imagen_principal] : [];
                } else if (Array.isArray(raw)) {
                    arr = raw;
                } else if (typeof raw === 'string') {
                    try { arr = JSON.parse(raw); } catch { arr = []; }
                }
                // Limpiar espacios sobrantes en cada ruta
                return arr.map(src => String(src).trim());
            })()
        }));
    } catch (err) {
        console.warn('API no disponible, usando datos locales:', err.message);
        municipiosData = MUNICIPIOS_LOCAL;
    }

    renderizarMunicipios(grid);
}

// ── RENDER ────────────────────────────────────────────────────────
function renderizarMunicipios(grid) {
    grid.innerHTML = '';

    municipiosData.forEach((m, idx) => {
        const card = document.createElement('div');
        card.className = 'municipio-card scroll-oculto';

        // ── Imagen con carrusel si hay más de una ──
        const imgContainer = document.createElement('div');
        imgContainer.className = 'municipio-img';

        const imagenes = m.imagenes && m.imagenes.length > 0 ? m.imagenes : null;

        if (imagenes) {
            if (imagenes.length === 1) {
                // Una sola imagen — sin carrusel
                const img = document.createElement('img');
                img.src     = encodeURI(imagenes[0]);
                img.alt     = m.nombre;
                img.loading = 'lazy';
                img.addEventListener('error', function () {
                    imgContainer.innerHTML = `<div class="municipio-icon-fallback"><i class="fas ${m.icono}"></i></div>`;
                });
                imgContainer.appendChild(img);
            } else {
                // Varias imágenes — carrusel interno
                imgContainer.classList.add('municipio-carrusel');
                imgContainer.dataset.index = '0';
                imgContainer.dataset.total = imagenes.length;

                // Track de imágenes
                const track = document.createElement('div');
                track.className = 'mun-carrusel-track';

                imagenes.forEach((src, i) => {
                    const img = document.createElement('img');
                    img.src     = encodeURI(src);
                    img.alt     = `${m.nombre} ${i + 1}`;
                    img.loading = i === 0 ? 'eager' : 'lazy';
                    img.addEventListener('error', function () { this.style.display = 'none'; });
                    track.appendChild(img);
                });
                imgContainer.appendChild(track);

                // Botones prev / next
                const btnPrev = document.createElement('button');
                btnPrev.className = 'mun-car-btn mun-car-prev';
                btnPrev.innerHTML = '&#10094;';
                btnPrev.setAttribute('aria-label', 'Anterior');

                const btnNext = document.createElement('button');
                btnNext.className = 'mun-car-btn mun-car-next';
                btnNext.innerHTML = '&#10095;';
                btnNext.setAttribute('aria-label', 'Siguiente');

                // Puntos indicadores
                const dots = document.createElement('div');
                dots.className = 'mun-car-dots';
                imagenes.forEach((_, i) => {
                    const dot = document.createElement('span');
                    dot.className = 'mun-car-dot' + (i === 0 ? ' active' : '');
                    dot.dataset.i = i;
                    dots.appendChild(dot);
                });

                imgContainer.appendChild(btnPrev);
                imgContainer.appendChild(btnNext);
                imgContainer.appendChild(dots);

                // Función de navegación
                const goTo = (container, newIdx) => {
                    const total = parseInt(container.dataset.total);
                    newIdx = (newIdx + total) % total;
                    container.dataset.index = newIdx;
                    const t = container.querySelector('.mun-carrusel-track');
                    if (t) t.style.transform = `translateX(-${newIdx * 100}%)`;
                    container.querySelectorAll('.mun-car-dot').forEach((d, i) => {
                        d.classList.toggle('active', i === newIdx);
                    });
                };

                btnPrev.addEventListener('click', (e) => {
                    e.stopPropagation();
                    goTo(imgContainer, parseInt(imgContainer.dataset.index) - 1);
                });
                btnNext.addEventListener('click', (e) => {
                    e.stopPropagation();
                    goTo(imgContainer, parseInt(imgContainer.dataset.index) + 1);
                });
                dots.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const dot = e.target.closest('.mun-car-dot');
                    if (dot) goTo(imgContainer, parseInt(dot.dataset.i));
                });
            }
        } else {
            imgContainer.innerHTML = `<div class="municipio-icon-fallback"><i class="fas ${m.icono}"></i></div>`;
        }

        // ── Info ──
        const descCorta = m.descripcion.length > 120
            ? m.descripcion.substring(0, 120) + '…'
            : m.descripcion;

        const info = document.createElement('div');
        info.className = 'municipio-info';
        info.innerHTML = `
            <h3>${m.nombre}</h3>
            <p>${descCorta}</p>
        `;

        const footer = document.createElement('div');
        footer.className = 'municipio-card-footer';
        footer.innerHTML = `
            <span class="municipio-numero"><i class="fas fa-map-marker-alt"></i> Municipio ${String(idx + 1).padStart(2, '0')}</span>
            <div class="ver-mas-btn"><i class="fas fa-eye"></i> Ver detalle</div>
        `;

        card.appendChild(imgContainer);
        card.appendChild(info);
        card.appendChild(footer);
        card.addEventListener('click', () => abrirDetalleMunicipio(m.id));
        grid.appendChild(card);
    });

    iniciarAnimacionScroll();
}

// ── SKELETON ──────────────────────────────────────────────────────
function mostrarSkeleton(grid) {
    grid.innerHTML = Array(6).fill(0).map(() => `
        <div class="municipio-card municipio-skeleton">
            <div class="skeleton-img"></div>
            <div class="municipio-info">
                <div class="skeleton-line skeleton-title"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line skeleton-short"></div>
            </div>
        </div>
    `).join('');
}

// ── ANIMACIÓN SCROLL ──────────────────────────────────────────────
function iniciarAnimacionScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('animate'), i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.municipio-card:not(.municipio-skeleton)')
            .forEach(card => observer.observe(card));
}

// ── DETALLE ───────────────────────────────────────────────────────
function abrirDetalleMunicipio(id) {
    const municipio = municipiosData.find(m => m.id === id);
    if (!municipio) return;
    sessionStorage.setItem('municipioDetalle', JSON.stringify(municipio));
    window.location.href = `Detalle.html?tipo=municipio&id=${id}`;
}