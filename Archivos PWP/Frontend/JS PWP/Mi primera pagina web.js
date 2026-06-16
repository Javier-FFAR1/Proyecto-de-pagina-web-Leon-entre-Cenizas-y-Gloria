// ============================================
// FUNCIONES PRINCIPALES
// ============================================



const mostrarToast = (mensaje, tipo = 'exito') => {
    // Eliminar toast anterior si existe
    const anterior = document.querySelector('.toast-notif');
    if (anterior) anterior.remove();

    const colores = {
        exito:   { bg: '#27ae60', icono: 'fa-check-circle' },
        error:   { bg: '#e74c3c', icono: 'fa-times-circle' },
        info:    { bg: '#3498db', icono: 'fa-info-circle' },
        aviso:   { bg: '#f39c12', icono: 'fa-exclamation-circle' }
    };
    const { bg, icono } = colores[tipo] || colores.exito;

    const toast = document.createElement('div');
    toast.className = 'toast-notif';
    toast.innerHTML = `<i class="fas ${icono}" style="margin-right:8px;"></i>${mensaje}`;
    toast.style.cssText = `
        position: fixed; bottom: 30px; right: 30px;
        background: ${bg}; color: white;
        padding: 14px 22px; border-radius: 12px;
        font-size: 0.9rem; font-weight: 500;
        box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        z-index: 99999; display: flex; align-items: center;
        animation: toastEntrar 0.4s cubic-bezier(0.175,0.885,0.32,1.275);
        max-width: 320px;
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastSalir 0.35s ease forwards';
        setTimeout(() => toast.remove(), 350);
    }, 3200);
};

// ============================================
// VERIFICAR SESIÓN Y ACTUALIZAR BOTÓN
// ============================================

const verificarYActualizarBotonRegistro = () => {
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    const botonRegistro = document.querySelector('.button-principal');
    
    if (usuarioActivo && usuarioActivo !== 'null' && usuarioActivo !== 'undefined') {
        if (botonRegistro) {
            botonRegistro.innerHTML = `<i class="fas fa-user-circle"></i> ${usuarioActivo}`;
            botonRegistro.href = "Perfil.html";
            botonRegistro.style.background = "linear-gradient(135deg, #27ae60, #2ecc71)";
        }
    } else {
        if (botonRegistro) {
            botonRegistro.innerHTML = '<i class="fas fa-user-plus"></i> Iniciar Sesion / Registrarse';
            botonRegistro.href = "Login.html";
            botonRegistro.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
        }
    }
};

const verificarSesionAutomatica = () => {
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    mostrarEnlaceAdmin(); // Siempre ejecutar, para limpiar o agregar según sea admin
    if (usuarioActivo && usuarioActivo !== 'null') {
        verificarYActualizarBotonRegistro();
        return true;
    }
    return false;
};

// ============================================
// MENÚ HAMBURGUESA
// ============================================

const iniciarMenuHamburguesa = () => {
    const hamburger = document.getElementById('hamburger');
    const navItemsWrapper = document.getElementById('navItemsWrapper');
    if (hamburger && navItemsWrapper) {
        hamburger.onclick = () => navItemsWrapper.classList.toggle('show');

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navItemsWrapper.contains(e.target)) {
                navItemsWrapper.classList.remove('show');
            }
        });

        // Cerrar menú al seleccionar un item
        navItemsWrapper.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => navItemsWrapper.classList.remove('show'));
        });
    }
};

// ============================================
// CONTADOR DE VISITAS
// ============================================

const actualizarContadorVisitas = () => {
    let visitas = localStorage.getItem('visitasPagina');
    visitas = visitas === null ? 1 : parseInt(visitas) + 1;
    localStorage.setItem('visitasPagina', visitas);
    const contador = document.getElementById('contadorVisitas');
    if (contador) contador.innerHTML = `<i class="fas fa-eye"></i> ${visitas} visitas`;
};

const agregarContadorAlFooter = () => {
    const footer = document.querySelector('.footer-bottom');
    if (footer && !document.getElementById('contadorVisitas')) {
        footer.insertAdjacentHTML('beforebegin', '<div class="contador-visitas" id="contadorVisitas"></div>');
        actualizarContadorVisitas();
    }
};

// ============================================
// BUSCADOR GLOBAL
// ============================================

const baseDeDatos = [
    // ========== HISTORIA ==========
    { titulo: "<i class='fas fa-flag'></i> Fundación de León (1524)", descripcion: "León fue fundada el 15 de junio de 1524 por Francisco Hernández de Córdoba", pagina: "Historia.html" },
    { titulo: "<i class='fas fa-exchange-alt'></i> Traslado de León (1610)", descripcion: "La ciudad fue trasladada por erupción del volcán Momotombo", pagina: "Historia.html" },
    { titulo: "<i class='fas fa-building'></i> Construcción de la Catedral (1747)", descripcion: "Inicio de la construcción de la Catedral de León", pagina: "Historia.html" },
    { titulo: "<i class='fas fa-graduation-cap'></i> Fundación de la UNAN (1813)", descripcion: "Universidad Nacional de León, segunda más antigua de Centroamérica", pagina: "Historia.html" },
    { titulo: "<i class='fas fa-birthday-cake'></i> Nacimiento de Rubén Darío (1867)", descripcion: "Nace el Príncipe de las Letras Castellanas", pagina: "Historia.html" },
    { titulo: "<i class='fas fa-landmark'></i> Patrimonio de la Humanidad (2011)", descripcion: "La Catedral de León es declarada Patrimonio de la Humanidad por la UNESCO", pagina: "Historia.html" },
    
    // ========== IGLESIAS ==========
    { titulo: "<i class='fas fa-church'></i> Catedral de León", descripcion: "La catedral más grande de Centroamérica, Patrimonio de la Humanidad", pagina: "Monumento.html" },
    { titulo: "<i class='fas fa-church'></i> Iglesia San Juan de Dios", descripcion: "Iglesia colonial del siglo XVIII en el centro histórico", pagina: "Monumento.html" },
    { titulo: "<i class='fas fa-church'></i> Iglesia El Calvario", descripcion: "Famosa por su Cristo Negro, imagen muy venerada", pagina: "Monumento.html" },
    { titulo: "<i class='fas fa-church'></i> Iglesia La Merced", descripcion: "Fachada barroca del siglo XVII, templo muy antiguo", pagina: "Monumento.html" },
    { titulo: "<i class='fas fa-church'></i> Iglesia San Francisco", descripcion: "Templo barroco del siglo XVII con convento anexo", pagina: "Monumento.html" },
    { titulo: "<i class='fas fa-church'></i> Iglesia El Sutiaba", descripcion: "Templo más antiguo de León, construido en 1524", pagina: "Monumento.html" },
    { titulo: "<i class='fas fa-church'></i> Iglesia La Recolección", descripcion: "Templo del siglo XVIII, actualmente centro cultural", pagina: "Monumento.html" },
    { titulo: "<i class='fas fa-church'></i> Iglesia San Felipe", descripcion: "Templo del siglo XVIII en el barrio San Felipe", pagina: "Monumento.html" },
    { titulo: "<i class='fas fa-church'></i> Iglesia San Sebastián", descripcion: "Iglesia colonial del siglo XVIII, famosa por sus fiestas patronales", pagina: "Monumento.html" },
    
    // ========== MUSEOS ==========
    { titulo: "<i class='fas fa-landmark'></i> Museo de la Revolución", descripcion: "Antigua cárcel de la Guardia Nacional, hoy museo histórico", pagina: "Monumento.html" },
    { titulo: "<i class='fas fa-palette'></i> Museo de Arte Ortíz Gurdián", descripcion: "Colección de arte nicaragüense e internacional", pagina: "Monumento.html" },
    { titulo: "<i class='fas fa-landmark'></i> Museo Rubén Darío", descripcion: "Casa natal del poeta Rubén Darío", pagina: "Monumento.html" },
    { titulo: "<i class='fas fa-landmark'></i> Antigua Cárcel de la 21", descripcion: "Centro cultural y de arte contemporáneo", pagina: "Monumento.html" },
    { titulo: "<i class='fas fa-landmark'></i> Museo de la UNAN", descripcion: "Museo universitario con piezas arqueológicas e históricas", pagina: "Monumento.html" },
    { titulo: "<i class='fas fa-landmark'></i> Museo de Historia de León", descripcion: "Historia de la ciudad desde su fundación", pagina: "Monumento.html" },
    { titulo: "<i class='fas fa-landmark'></i> Museo de Arte Sacro", descripcion: "Arte religioso en el interior de la Catedral", pagina: "Monumento.html" },
    { titulo: "<i class='fas fa-landmark'></i> Museo Rigoberto López Pérez", descripcion: "Antiguo Club de Obreros, museo dedicado al poeta y héroe nacional", pagina: "Monumento.html" },

    // ========== TEATROS ==========
    { titulo: "<i class='fas fa-theater-masks'></i> Teatro José de la Cruz Mena", descripcion: "Teatro municipal construido en 1885", pagina: "Monumento.html" },
    { titulo: "<i class='fas fa-theater-masks'></i> Teatro de la UNAN", descripcion: "Espacio cultural dentro de la universidad", pagina: "Monumento.html" },
    
    // ========== UNIVERSIDADES ==========
    { titulo: "<i class='fas fa-graduation-cap'></i> UNAN - León", descripcion: "Segunda universidad más antigua de Centroamérica", pagina: "Monumento.html" },
    { titulo: "<i class='fas fa-university'></i> Colegio San Ramón", descripcion: "Antigua sede de la Universidad Nacional de León", pagina: "Monumento.html" },
    { titulo: "<i class='fas fa-gavel'></i> Facultad de Derecho UNAN", descripcion: "Edificio colonial patrimonial de la UNAN-León", pagina: "Monumento.html" },
    { titulo: "<i class='fas fa-book'></i> Edificio de Ciencias Sociales UNAN", descripcion: "Arquitectura histórica del campus universitario", pagina: "Monumento.html" },
    
    // ========== OTROS ==========
    { titulo: "<i class='fas fa-landmark'></i> León Viejo (Ruinas)", descripcion: "Ciudad original fundada en 1524, Patrimonio de la Humanidad", pagina: "Monumento.html" },
    { titulo: "<i class='fas fa-landmark'></i> Palacio Municipal", descripcion: "Edificio histórico del siglo XIX, sede del gobierno municipal", pagina: "Monumento.html" },
    { titulo: "<i class='fas fa-landmark'></i> Centro Histórico de León", descripcion: "Corazón cultural y patrimonial de la ciudad", pagina: "Historia.html" },
    { titulo: "<i class='fas fa-landmark'></i> Hotel la Recolección", descripcion: "Hotel histórico en el centro de la ciudad", pagina: "Monumento.html" },
    { titulo: "<i class='fas fa-landmark'></i> Antigua Estación del Ferrocarril", descripcion: "Edificio histórico que albergó la estación de tren", pagina: "Monumento.html" },
    { titulo: "<i class='fas fa-landmark'></i> Mausoleo de los Héroes y Mártires", descripcion: "Mausoleo que alberga los restos de héroes y mártires nacionales", pagina: "Monumento.html" },
    
    // ========== PÁGINAS ==========
    { titulo: "<i class='fas fa-phone-alt'></i> Contacto", descripcion: "Formulario de contacto, mapa y ubicación", pagina: "Contacto.html" },
    { titulo: "<i class='fas fa-user-plus'></i> Registro", descripcion: "Crea una cuenta para ser parte de la comunidad", pagina: "Registro.html" },
    { titulo: "<i class='fas fa-sign-in-alt'></i> Iniciar Sesión", descripcion: "Accede a tu cuenta", pagina: "Login.html" },
    { titulo: "<i class='fas fa-user'></i> Mi Perfil", descripcion: "Tu perfil de usuario y tus comentarios", pagina: "Perfil.html" },
    { titulo: "<i class='fas fa-info-circle'></i> Acerca de", descripcion: "Información sobre el creador y el proyecto", pagina: "Acerca.html" },
    
    // ========== PERSONAJES HISTÓRICOS ==========
    { titulo: "<i class='fas fa-user'></i> Rubén Darío", descripcion: "Príncipe de las Letras Castellanas, nacido en León en 1867", pagina: "Personajes.html" },
    { titulo: "<i class='fas fa-user'></i> Máximo Jerez", descripcion: "Militar, político y héroe nacional, nacido en León", pagina: "Personajes.html" },
    { titulo: "<i class='fas fa-user'></i> José de la Cruz Mena", descripcion: "Músico y compositor, autor del Himno Nacional", pagina: "Personajes.html" },
    { titulo: "<i class='fas fa-user'></i> Juan José Quesada", descripcion: "Poeta y periodista, figura importante de la literatura leonesa", pagina: "Personajes.html" },
    { titulo: "<i class='fas fa-user'></i> Alfonso Cortés", descripcion: "Poeta místico, nacido en León", pagina: "Personajes.html" },
    { titulo: "<i class='fas fa-user'></i> Salomón Ibarra Mayorga", descripcion: "Poeta y compositor, autor de la letra del Himno Nacional", pagina: "Personajes.html" },

    // ========== VOLCANES ==========
    { titulo: "<i class='fas fa-mountain'></i> Cerro Negro", descripcion: "Volcán activo, famoso para hacer sandboard", pagina: "Volcanes.html" },
    { titulo: "<i class='fas fa-mountain'></i> Volcán El Hoyo", descripcion: "Complejo volcánico con tres cráteres de paredes verticales", pagina: "Volcanes.html" },
    { titulo: "<i class='fas fa-mountain'></i> Volcán Santa Clara", descripcion: "Volcán con cráter accesible cerca de León", pagina: "Volcanes.html" },
    { titulo: "<i class='fas fa-mountain'></i> Volcán Telica", descripcion: "Volcán con cráter humeante, popular para senderismo", pagina: "Volcanes.html" },
    { titulo: "<i class='fas fa-mountain'></i> Volcán Rota", descripcion: "Volcán menos conocido en la cordillera de Marrabios", pagina: "Volcanes.html" },
    { titulo: "<i class='fas fa-mountain'></i> Volcán Momotombo", descripcion: "Volcán con cráter activo, ubicado en la cordillera de Marrabios", pagina: "Volcanes.html" },


    // ========== MUNICIPIOS ==========
    { titulo: "<i class='fas fa-city'></i> Municipios de León", descripcion: "Los 10 municipios que conforman el departamento de León", pagina: "Municipios.html" },
    { titulo: "<i class='fas fa-city'></i> El Jicaral", descripcion: "Municipio de León, conocido por su producción de pescado", pagina: "Municipios.html" },
    { titulo: "<i class='fas fa-city'></i> El Sauce", descripcion: "Municipio de León, famoso por su quesillo", pagina: "Municipios.html" },
    { titulo: "<i class='fas fa-city'></i> La Paz Centro", descripcion: "Municipio de León, cuna del quesillo nicaragüense", pagina: "Municipios.html" },
    { titulo: "<i class='fas fa-city'></i> Nagarote", descripcion: "Municipio de León, entre el lago de Managua y el volcán Momotombo", pagina: "Municipios.html" },
    { titulo: "<i class='fas fa-city'></i> Quezalguaque", descripcion: "Municipio de León, cuna del cacique Adiac", pagina: "Municipios.html" },
    { titulo: "<i class='fas fa-city'></i> Santa Rosa del Peñón", descripcion: "Municipio de León, zona agrícola y ganadera", pagina: "Municipios.html" },
    { titulo: "<i class='fas fa-city'></i> Achuapa", descripcion: "Municipio de León, conocido por sus paisajes montañosos", pagina: "Municipios.html" },
    { titulo: "<i class='fas fa-city'></i> Telica", descripcion: "Municipio de León, zona minera y volcán Telica", pagina: "Municipios.html" },
    { titulo: "<i class='fas fa-city'></i> Malpaisillo", descripcion: "Municipio de León, cerca del volcán Cerro Negro", pagina: "Municipios.html" },
    
    // ========== PALABRAS CLAVE ==========
    { titulo: "Rubén Darío", descripcion: "Príncipe de las Letras Castellanas, nacido en León", pagina: "Historia.html" },
    { titulo: "UNESCO", descripcion: "Organización que declaró Patrimonio de la Humanidad a la Catedral de León", pagina: "Historia.html" },
    { titulo: "Francisco Hernández de Córdoba", descripcion: "Fundador de León en 1524", pagina: "Historia.html" },
    { titulo: "Capital Cultural de Nicaragua", descripcion: "Apodo de la ciudad de León", pagina: "Primera pagina web.html" },
    { titulo: "Cristo Negro", descripcion: "Imagen venerada en la Iglesia El Calvario", pagina: "Monumento.html" }
];

const normalizar = (texto) => {
    return texto.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
};

const buscarEnSitio = (texto) => {
    if (!texto || texto.length < 2) return [];
    const textoBuscar = normalizar(texto);
    return baseDeDatos.filter(item => 
        normalizar(item.titulo).includes(textoBuscar) || 
        normalizar(item.descripcion).includes(textoBuscar)
    );
};

const inicializarBuscador = () => {
    const input = document.getElementById('buscarInput');
    const resultados = document.getElementById('resultadosBusqueda');
    if (!input) return;

    // Desactivar autocompletado del navegador
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocorrect', 'off');
    input.setAttribute('spellcheck', 'false');
    
    input.addEventListener('input', (e) => {
        const texto = e.target.value.trim();
        if (texto.length < 2) {
            resultados.classList.remove('show');
            return;
        }
        const items = buscarEnSitio(texto);
        resultados.innerHTML = items.length === 0 
            ? '<div class="no-resultados">No se encontraron resultados</div>'
            : items.slice(0, 8).map(r => `
                <div class="resultado-item" onclick="limpiarBuscadorYNavegar('${r.pagina}')">
                    <h4>${r.titulo}</h4>
                    <p>${r.descripcion}</p>
                </div>
            `).join('');
        resultados.classList.add('show');
    });
    
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !resultados.contains(e.target)) {
            resultados.classList.remove('show');
        }
    });
};

// Función para limpiar el buscador y navegar
const limpiarBuscadorYNavegar = (pagina) => {
    const input = document.getElementById('buscarInput');
    const resultados = document.getElementById('resultadosBusqueda');
    
    // Limpiar el input
    input.value = '';
    
    // Limpiar los resultados
    resultados.innerHTML = '';
    resultados.classList.remove('show');
    
    // Navegar con transición
    navegarConTransicion(pagina);
};

// ============================================
// TEMA DINÁMICO POR HORA
// ============================================

const aplicarTemaPorHora = () => {
    // Si el usuario eligió manualmente un tema, respetarlo y no sobrescribirlo
    const temaManual = localStorage.getItem('temaManual');
    if (temaManual) {
        document.body.classList.remove('tema-manana', 'tema-tarde', 'tema-noche');
        document.body.classList.add(temaManual);
        return;
    }

    const hora = new Date().getHours();
    document.body.classList.remove('tema-manana', 'tema-tarde', 'tema-noche');
    
    if (hora >= 6 && hora < 12) {
        document.body.classList.add('tema-manana');
    } else if (hora >= 12 && hora < 18) {
        document.body.classList.add('tema-tarde');
    } else {
        document.body.classList.add('tema-noche');
    }
};

// ============================================
// CARRUSEL
// ============================================

let slideIndex = 0, carruselInterval;

const initCarrusel = () => {
    const slides = document.querySelectorAll('.carrusel-slide');
    const dots = document.getElementById('carruselDots');
    const prev = document.getElementById('carruselPrev');
    const next = document.getElementById('carruselNext');
    if (!slides.length) return;
    
    dots.innerHTML = '';
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('carrusel-dot');
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(i);
        dots.appendChild(dot);
    });
    
    const updateSlides = () => {
        const container = document.querySelector('.carrusel-slides');
        if (container) container.style.transform = `translateX(-${slideIndex * 100}%)`;
        document.querySelectorAll('.carrusel-dot').forEach((d, i) => d.classList.toggle('active', i === slideIndex));
    };
    
    const goToSlide = (index) => {
        const slides = document.querySelectorAll('.carrusel-slide');
        slideIndex = (index + slides.length) % slides.length;
        updateSlides();
        resetInterval();
    };
    
    const nextSlide = () => goToSlide(slideIndex + 1);
    const prevSlide = () => goToSlide(slideIndex - 1);
    const startInterval = () => carruselInterval = setInterval(nextSlide, 5000);
    const resetInterval = () => { clearInterval(carruselInterval); startInterval(); };
    
    prev?.addEventListener('click', prevSlide);
    next?.addEventListener('click', nextSlide);
    
    const carrusel = document.querySelector('.carrusel-container');
    carrusel?.addEventListener('mouseenter', () => clearInterval(carruselInterval));
    carrusel?.addEventListener('mouseleave', startInterval);
    startInterval();
};

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    iniciarMenuHamburguesa();
    agregarContadorAlFooter();
    inicializarBuscador();
    verificarSesionAutomatica();
    aplicarTemaPorHora(); 
    mostrarEnlaceAdmin();
    initFloatingNavbar();
    initRating();

    // En Detalle.html esperamos un poco más para que el navbar esté listo
    const esDetalle = window.location.pathname.includes('Detalle.html');
    setTimeout(() => marcarItemActivo(), esDetalle ? 200 : 50);

    if (document.querySelector('.carrusel-container')) initCarrusel();
});

// Estilos de animación
if (!document.querySelector('#toastAnimations')) {
    const style = document.createElement('style');
    style.id = 'toastAnimations';
    style.textContent = `
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
        .contador-visitas { text-align: center; padding: 10px; background: rgba(52,152,219,0.2); font-size: 0.9rem; }
    `;
    document.head.appendChild(style);
}

// ============================================
// MOSTRAR ENLACES DE ADMINISTRADOR
// ============================================


const mostrarEnlaceAdmin = () => {
    const usuario = localStorage.getItem('usuarioActivo');
    const usuarioRol = localStorage.getItem('usuarioRol');
    const navItemsWrapper = document.getElementById('navItemsWrapper');
    
    const esAdmin = (usuario === 'Michael Urroz' || usuarioRol === 'admin');
    
    if (!navItemsWrapper) return;
    
    // Verificar si ya existen los enlaces
    const yaExisteUsuarios = navItemsWrapper.querySelector('[data-section="usuarios"]');
    const yaExisteMensajes = navItemsWrapper.querySelector('[data-section="admin_mensajes"]');
    
    // Si es admin y no existen, agregarlos
    if (esAdmin && !yaExisteUsuarios && !yaExisteMensajes) {
        // Encontrar la posición después de Municipios
        const municipiosItem = Array.from(navItemsWrapper.children).find(child => 
            child.querySelector('.nav-label')?.textContent === 'Municipios'
        );
        
        // Crear enlace a Usuarios
        const usuariosItem = document.createElement('div');
        usuariosItem.className = 'nav-item';
        usuariosItem.setAttribute('data-section', 'usuarios');
        usuariosItem.innerHTML = '<div class="nav-icon"><i class="fas fa-user-cog"></i></div><span class="nav-label">Usuarios</span>';
        usuariosItem.onclick = () => window.location.href = 'Usuarios.html';
        
        // Crear enlace a Mensajes
        const mensajesItem = document.createElement('div');
        mensajesItem.className = 'nav-item';
        mensajesItem.setAttribute('data-section', 'admin_mensajes');
        mensajesItem.innerHTML = '<div class="nav-icon"><i class="fas fa-envelope-open-text"></i></div><span class="nav-label">Mensajes</span>';
        mensajesItem.onclick = () => window.location.href = 'Admin_mensajes.html';

        // Enlace a Valoraciones
        const valoracionesItem = document.createElement('div');
        valoracionesItem.className = 'nav-item';
        valoracionesItem.setAttribute('data-section', 'valoraciones');
        valoracionesItem.innerHTML = '<div class="nav-icon"><i class="fas fa-star"></i></div><span class="nav-label">Valoraciones</span>';
        valoracionesItem.onclick = () => window.location.href = 'Admin_valoraciones.html';
        
        // Insertar después de Municipios
        if (municipiosItem) {
            municipiosItem.insertAdjacentElement('afterend', usuariosItem);
            usuariosItem.insertAdjacentElement('afterend', mensajesItem);
            mensajesItem.insertAdjacentElement('afterend', valoracionesItem);
        } else {
            navItemsWrapper.appendChild(usuariosItem);
            navItemsWrapper.appendChild(mensajesItem);
            navItemsWrapper.appendChild(valoracionesItem);
        }
    }
    
    // Si no es admin, eliminar los enlaces si existen
    if (!esAdmin) {
        const enlacesExistentes = navItemsWrapper.querySelectorAll('[data-section="usuarios"], [data-section="admin_mensajes"]');
        enlacesExistentes.forEach(enlace => enlace.remove());
    }
    
    // ========== MARCAR EL ITEM ACTIVO SEGÚN LA PÁGINA ACTUAL ==========
    const currentPage = window.location.pathname.split('/').pop();
    
    // Remover active de todos los nav-item
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    
    // Marcar el activo correspondiente
    if (currentPage === 'Primera pagina web.html') {
        const inicioNav = document.querySelector('.nav-item[data-section="inicio"]');
        if (inicioNav) inicioNav.classList.add('active');
    } else if (currentPage === 'Historia.html') {
        const historiaNav = document.querySelector('.nav-item[data-section="historia"]');
        if (historiaNav) historiaNav.classList.add('active');
    } else if (currentPage === 'Monumento.html') {
        const monumentosNav = document.querySelector('.nav-item[data-section="monumentos"]');
        if (monumentosNav) monumentosNav.classList.add('active');
    } else if (currentPage === 'Personajes.html') {
        const personajesNav = document.querySelector('.nav-item[data-section="personajes"]');
        if (personajesNav) personajesNav.classList.add('active');
    } else if (currentPage === 'Volcanes.html') {
        const volcanesNav = document.querySelector('.nav-item[data-section="volcanes"]');
        if (volcanesNav) volcanesNav.classList.add('active');
    } else if (currentPage === 'Mapa.html') {
        const mapaNav = document.querySelector('.nav-item[data-section="mapa"]');
        if (mapaNav) mapaNav.classList.add('active');
    } else if (currentPage === 'Municipios.html') {
        const municipiosNav = document.querySelector('.nav-item[data-section="municipios"]');
        if (municipiosNav) municipiosNav.classList.add('active');
    } else if (currentPage === 'Contacto.html') {
        const contactoNav = document.querySelector('.nav-item[data-section="contacto"]');
        if (contactoNav) contactoNav.classList.add('active');
    } else if (currentPage === 'Perfil.html') {
        const perfilNav = document.querySelector('.nav-item[data-section="perfil"]');
        if (perfilNav) perfilNav.classList.add('active');
    } else if (currentPage === 'Acerca.html') {
        const acercaNav = document.querySelector('.nav-item[data-section="acerca"]');
        if (acercaNav) acercaNav.classList.add('active');
    } else if (currentPage === 'Usuarios.html') {
        const usuariosNav = document.querySelector('.nav-item[data-section="usuarios"]');
        if (usuariosNav) usuariosNav.classList.add('active');
    } else if (currentPage === 'Admin_mensajes.html') {
        const mensajesNav = document.querySelector('.nav-item[data-section="admin_mensajes"]');
        if (mensajesNav) mensajesNav.classList.add('active');
    }
    else if (currentPage === 'Admin_valoraciones.html') {
        const valoracionesNav = document.querySelector('.nav-item[data-section="valoraciones"]');
        if (valoracionesNav) valoracionesNav.classList.add('active');
    }

    // Actualizar el indicador
    const activeItem = document.querySelector('.nav-item.active');
    const indicator = document.querySelector('.active-indicator');
    const navbar = document.querySelector('.floating-navbar');
    
    if (activeItem && indicator && navbar) {
        setTimeout(() => {
            const rect = activeItem.getBoundingClientRect();
            const navbarRect = navbar.getBoundingClientRect();
            if (rect.width > 0) {
                indicator.style.width = `${rect.width}px`;
                indicator.style.left = `${rect.left - navbarRect.left}px`;
                indicator.style.display = 'block';
            }
        }, 50);
    }
};

// ============================================
// MARCAR ITEM ACTIVO SEGÚN PÁGINA ACTUAL
// ============================================

const marcarItemActivo = () => {
    const currentPage = window.location.pathname.split('/').pop();
    
    let expectedSection = '';
    
    // Mapear páginas a secciones
    if (currentPage === 'Primera pagina web.html') expectedSection = 'inicio';
    else if (currentPage === 'Historia.html') expectedSection = 'historia';
    else if (currentPage === 'Monumento.html') expectedSection = 'monumentos';
    else if (currentPage === 'Personajes.html') expectedSection = 'personajes';
    else if (currentPage === 'Volcanes.html') expectedSection = 'volcanes';
    else if (currentPage === 'Mapa.html') expectedSection = 'mapa';
    else if (currentPage === 'Municipios.html') expectedSection = 'municipios';
    else if (currentPage === 'Contacto.html') expectedSection = 'contacto';
    else if (currentPage === 'Perfil.html') expectedSection = 'perfil';
    else if (currentPage === 'Acerca.html') expectedSection = 'acerca';
    else if (currentPage === 'Usuarios.html') expectedSection = 'usuarios';
    else if (currentPage === 'Admin_mensajes.html') expectedSection = 'admin_mensajes';
    else if (currentPage === 'Admin_valoraciones.html') expectedSection = 'valoraciones';
    else if (currentPage === 'Detalle.html') {
        const tipoDetalle = new URLSearchParams(window.location.search).get('tipo');
        if (tipoDetalle === 'monumento') expectedSection = 'monumentos';
        else if (tipoDetalle === 'personaje') expectedSection = 'personajes';
        else if (tipoDetalle === 'volcan') expectedSection = 'volcanes';
    }
    
    if (expectedSection) {
        // Remover active de todos
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        
        // Marcar el activo
        const activeItem = document.querySelector(`.nav-item[data-section="${expectedSection}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
            
            // Actualizar el indicador
            const indicator = document.querySelector('.active-indicator');
            const navbar = document.querySelector('.floating-navbar');
            if (indicator && navbar) {
                setTimeout(() => {
                    const rect = activeItem.getBoundingClientRect();
                    const navbarRect = navbar.getBoundingClientRect();
                    if (rect.width > 0) {
                        indicator.style.width = `${rect.width}px`;
                        indicator.style.left = `${rect.left - navbarRect.left}px`;
                        indicator.style.display = 'block';
                    }
                }, 50);
            }
        }
    }
};


// ============================================
// FLOATING NAVBAR - REDIRECCIÓN E INDICADOR
// ============================================

const initFloatingNavbar = () => {
    const items = document.querySelectorAll('.nav-item');
    const indicator = document.querySelector('.active-indicator');
    const navbar = document.querySelector('.floating-navbar');
    
    if (!items.length || !indicator || !navbar) return;
    
    const updateIndicator = (activeItem) => {
        if (!activeItem) return;
        requestAnimationFrame(() => {
            const rect = activeItem.getBoundingClientRect();
            const navbarRect = navbar.getBoundingClientRect();
            if (rect.width > 0) {
                indicator.style.width = `${rect.width}px`;
                indicator.style.left = `${rect.left - navbarRect.left}px`;
                indicator.style.display = 'block';
            }
        });
    };
    
    // Marcar el item activo según la página actual
    const currentPage = window.location.pathname.split('/').pop();
    const pageMap = {
        'Primera pagina web.html': 'inicio',
        'Historia.html': 'historia',
        'Monumento.html': 'monumentos',
        'Personajes.html': 'personajes',
        'Volcanes.html': 'volcanes',
        'Mapa.html': 'mapa',
        'Municipios.html': 'municipios',
        'Contacto.html': 'contacto',
        'Perfil.html': 'perfil',
        'Acerca.html': 'acerca',
        'Usuarios.html': 'usuarios',
        'Admin_mensajes.html': 'admin_mensajes',
        'Admin_valoraciones.html': 'valoraciones' 
    };
    
    const expectedSection = pageMap[currentPage];
    let activeItem = null;
    
    items.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === expectedSection) {
            item.classList.add('active');
            activeItem = item;
        }
    });
    
    if (!activeItem && items.length > 0) {
        activeItem = items[0];
        activeItem.classList.add('active');
    }
    
    setTimeout(() => updateIndicator(activeItem), 50);
    
    // Redirección al hacer clic
    items.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            const pages = {
                inicio: 'Primera pagina web.html',
                historia: 'Historia.html',
                monumentos: 'Monumento.html',
                contacto: 'Contacto.html',
                perfil: 'Perfil.html',
                acerca: 'Acerca.html',
                personajes: 'Personajes.html',
                volcanes: 'Volcanes.html',
                mapa: 'Mapa.html',
                municipios: 'Municipios.html',
                usuarios: 'Usuarios.html',
                admin_mensajes: 'Admin_mensajes.html',
                valoraciones: 'Admin_valoraciones.html'
            };
            if (pages[section]) {
                setTimeout(() => window.location.href = pages[section], 200);
            }
        });
    });
    
    window.addEventListener('resize', () => {
        const currentActive = document.querySelector('.nav-item.active');
        if (currentActive) updateIndicator(currentActive);
    });
};

// ============================================
// VALORACIÓN CON ESTRELLAS
// ============================================

function initRating() {
    const stars = document.querySelectorAll('#ratingStars i');
    const message = document.getElementById('ratingMessage');
    const promedioDiv = document.getElementById('ratingPromedio');
    
    if (!stars.length) return;

    const usuarioId = localStorage.getItem('usuarioId');
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    const usuarioRol = localStorage.getItem('usuarioRol');
    const estaLogueado = usuarioId && usuarioActivo;
    const esAdmin = usuarioRol === 'admin' || usuarioActivo === 'Michael Urroz';

    if (promedioDiv) {
        promedioDiv.style.display = 'none';
    }

    // Cargar promedio solo para administradores
    if (esAdmin && promedioDiv) {
        fetch('http://localhost:3000/api/valoraciones/promedio')
            .then(res => res.json())
            .then(data => {
                if (data.total > 0) {
                    promedioDiv.style.display = 'block';
                    promedioDiv.innerHTML = `<i class="fas fa-star"></i> ${parseFloat(data.promedio).toFixed(1)} (${data.total} valoraciones)`;
                } else {
                    promedioDiv.style.display = 'block';
                    promedioDiv.innerHTML = 'Aún no hay valoraciones';
                }
            })
            .catch(err => console.error('Error al cargar promedio:', err));
    }

    const esAnonimo = !estaLogueado;
    const nombreAnonimo = `<i class="fas fa-user-secret"></i> Anónimo`;

    if (esAnonimo && message) {
        message.innerHTML = `${nombreAnonimo} puede valorar el sitio de forma anónima.`;
    }

    if (esAdmin) {
        stars.forEach(star => {
            star.style.cursor = 'not-allowed';
            star.style.opacity = '0.4';
            star.style.pointerEvents = 'none';
        });
        if (message) {
            message.innerHTML = '<i class="fas fa-user-shield"></i> Los administradores no pueden valorar.';
        }
        return;
    }

    if (estaLogueado) {
        fetch(`http://localhost:3000/api/valoraciones/usuario/${usuarioId}`)
            .then(res => res.json())
            .then(data => {
                const savedRating = data.valoracion || 0;
                stars.forEach((s, i) => {
                    if (i < savedRating) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            })
            .catch(err => console.error('Error al cargar valoración del usuario:', err));
    }

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.dataset.value);
            
            stars.forEach((s, i) => {
                i < value ? s.classList.add('active') : s.classList.remove('active');
            });
            
            const mensajes = {
                1: 'Gracias por tu opinión. Mejoraremos.',
                2: 'Gracias, trabajaremos para ser mejores.',
                3: '¡Gracias! Nos alegra que te guste.',
                4: '¡Excelente! ¿Alguna sugerencia?',
                5: '¡Muchas gracias! Nos motiva a seguir mejorando.'
            };
            const nombreUsuario = estaLogueado ? usuarioActivo : `<i class="fas fa-user-secret"></i> Anónimo`;
            if (message) message.innerHTML = `${nombreUsuario} - ${mensajes[value]}`;
            
            const idUsuarioEnvio = estaLogueado ? parseInt(usuarioId) : null;
            fetch('http://localhost:3000/api/valoraciones', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_usuario: idUsuarioEnvio,
                    valoracion: value
                })
            })
            .then(res => res.json())
            .then(() => {
                if (esAdmin && promedioDiv) {
                    return fetch('http://localhost:3000/api/valoraciones/promedio')
                        .then(res => res.json())
                        .then(data => {
                            if (data.total > 0) {
                                promedioDiv.style.display = 'block';
                                promedioDiv.innerHTML = `<i class="fas fa-star"></i> ${parseFloat(data.promedio).toFixed(1)} (${data.total} valoraciones)`;
                            } else {
                                promedioDiv.style.display = 'block';
                                promedioDiv.innerHTML = 'Aún no hay valoraciones';
                            }
                        });
                }
            })
            .then(() => {
                // Limpiar selección después de que el usuario envíe la valoración
                setTimeout(() => {
                    stars.forEach(s => s.classList.remove('active'));
                    if (message) message.innerHTML = '';
                }, 2000);
            })
            .catch(err => console.error('Error:', err));
        });
    });
}

// ============================================
// TRANSICIÓN SUAVE ENTRE PÁGINAS
// ============================================

// Tiempo de transición en milisegundos (ajústalo a tu gusto)
const TRANSITION_DELAY = 250; // 0.25 segundos

// Función para navegar con transición suave
function navegarConTransicion(url) {
    // Aplicar efecto de fade-out
    document.body.style.transition = 'opacity 0.2s ease';
    document.body.style.opacity = '0';
    
    // Redirigir después del delay
    setTimeout(() => {
        window.location.href = url;
    }, TRANSITION_DELAY);
}

// Función para restaurar la opacidad al cargar la página (evita que se quede invisible)
function restaurarOpacidad() {
    document.body.style.opacity = '1';
    document.body.style.transition = '';
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', restaurarOpacidad);


// Sobrescribir los botones de "Leer más" y otros enlaces
document.addEventListener('click', function(e) {
    // Buscar botones con clase botton-article
    const boton = e.target.closest('.botton-article');
    if (boton && boton.getAttribute('onclick')) {
        e.preventDefault();
        const url = boton.getAttribute('onclick').match(/'(.*?)'/)[1];
        navegarConTransicion(url);
    }
    
    // Buscar enlaces del sidebar
    const enlace = e.target.closest('.sidebar a');
    if (enlace && enlace.getAttribute('href')) {
        e.preventDefault();
        const url = enlace.getAttribute('href');
        navegarConTransicion(url);
    }
});

// Restaurar opacidad al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = '';
});


// Evitar parpadeo al cambiar de página
document.addEventListener('DOMContentLoaded', function() {
    // Guardar el color de fondo actual
    const bodyStyle = getComputedStyle(document.body);
    const bgColor = bodyStyle.backgroundColor;
    
    // Aplicar el mismo fondo al html para evitar parpadeo
    document.documentElement.style.backgroundColor = bgColor;
});

// ============================================
// BOTÓN FLOTANTE SUBIR ARRIBA
// ============================================

function initBtnSubir() {
    const btn = document.getElementById('btnSubir');
    if (!btn) return;
    
    // Mostrar/ocultar botón según el scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.style.display = 'block';
        } else {
            btn.style.display = 'none';
        }
    });
    
    // Subir al inicio al hacer clic
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// BOTÓN FLOTANTE - MODO NOCHE
// ============================================

function initBtnTema() {
    // Evitar duplicados si la función se llama más de una vez
    if (document.getElementById('btnTema')) return;

    const btn = document.createElement('button');
    btn.id = 'btnTema';
    btn.className = 'btn-tema';
    btn.setAttribute('aria-label', 'Cambiar tema');
    btn.setAttribute('title', 'Cambiar tema');
    document.body.appendChild(btn);

    const actualizarIcono = () => {
        const esNoche = document.body.classList.contains('tema-noche');
        btn.innerHTML = esNoche
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    };

    actualizarIcono();

    btn.addEventListener('click', () => {
        const esNoche = document.body.classList.contains('tema-noche');
        const nuevoTema = esNoche ? 'tema-manana' : 'tema-noche';

        document.body.classList.remove('tema-manana', 'tema-tarde', 'tema-noche');
        document.body.classList.add(nuevoTema);

        // Guardar preferencia manual para que persista entre paginas
        localStorage.setItem('temaManual', nuevoTema);

        actualizarIcono();
        mostrarToast(
            esNoche ? 'Tema claro activado' : 'Tema oscuro activado',
            'info'
        );
    });
}

// Llamar a las funciones
document.addEventListener('DOMContentLoaded', initBtnSubir);
document.addEventListener('DOMContentLoaded', initBtnTema);