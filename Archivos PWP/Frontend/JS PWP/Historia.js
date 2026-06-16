// ================================================================
//  Historia.js — León entre Cenizas y Gloria
//  Sistema de comentarios con escalones, respuestas y eliminar
// ================================================================

const API_URL = 'http://localhost:3000/api';

// ── Helpers ───────────────────────────────────────────────────────
const escapeHTML = (t) => {
    if (!t) return '';
    const d = document.createElement('div');
    d.textContent = t;
    return d.innerHTML;
};

const toast = (msg, tipo = 'ok') => {
    const t = document.createElement('div');
    t.className = `toast-notif toast-${tipo}`;
    t.innerHTML = `<i class="fas fa-${tipo === 'ok' ? 'check-circle' : 'exclamation-circle'}"></i> ${msg}`;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3200);
};

const confirmar = (msg) => new Promise(resolve => {
    const modal = document.createElement('div');
    modal.className = 'modal-confirmar';
    modal.innerHTML = `
        <div class="modal-confirmar-caja">
            <h3><i class="fas fa-trash-alt" style="color:#e74c3c"></i> Eliminar comentario</h3>
            <p>${msg}</p>
            <div class="modal-confirmar-botones">
                <button class="btn-confirmar-si"><i class="fas fa-check"></i> Sí, eliminar</button>
                <button class="btn-confirmar-no"><i class="fas fa-times"></i> Cancelar</button>
            </div>
        </div>`;
    document.body.appendChild(modal);
    modal.querySelector('.btn-confirmar-si').onclick = () => { modal.remove(); resolve(true);  };
    modal.querySelector('.btn-confirmar-no').onclick = () => { modal.remove(); resolve(false); };
});

const formatFecha = (f) => new Date(f).toLocaleString('es-NI', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
});

// ── Info del usuario activo ───────────────────────────────────────
const getUsuario = () => ({
    id:     localStorage.getItem('usuarioId'),
    nombre: localStorage.getItem('usuarioActivo'),
    rol:    localStorage.getItem('usuarioRol')
});

const esAdmin = (u) => u.rol === 'admin' || u.nombre === 'Michael Urroz';

// ── CARGA DE COMENTARIOS ──────────────────────────────────────────
const cargarComentarios = async () => {
    const container = document.getElementById('comentariosContainer');
    if (!container) return;

    const u = getUsuario();

    try {
        const res  = await fetch(`${API_URL}/comentarios?sección=historia`);
        const data = await res.json();

        // Separar principales y respuestas
        const principales = data.filter(c => !c.id_comentario_padre);
        const respuestas   = data.filter(c =>  c.id_comentario_padre);

        // Agrupar respuestas por padre
        const porPadre = {};
        respuestas.forEach(r => {
            if (!porPadre[r.id_comentario_padre]) porPadre[r.id_comentario_padre] = [];
            porPadre[r.id_comentario_padre].push(r);
        });

        if (principales.length === 0) {
            container.innerHTML = '<div class="sin-comentarios"><i class="fas fa-comment-slash"></i> Sé el primero en comentar sobre la historia de León</div>';
            return;
        }

        container.innerHTML = '';

        principales.forEach(c => {
            // ── Permisos: solo si hay sesión activa ──
            const logueado       = !!u.id;
            const esAutor        = logueado && String(c.id_usuario) === String(u.id);
            const admin          = esAdmin(u);
            const puedeBorrar    = logueado && (admin || esAutor);
            const puedeEditar    = logueado && (admin || esAutor);
            const puedeResponder = logueado && admin;

            // ── Nombre mostrado ──
            const nombreHTML = (c.usuario_nombre === 'Michael Urroz')
                ? `<span class="comentario-autor es-admin"><i class="fas fa-user-shield"></i> Administrador</span>`
                : `<span class="comentario-autor"><i class="fas fa-user-circle"></i> ${escapeHTML(c.usuario_nombre)}</span>`;

            // ── Respuestas escalón ──
            const respuestasHTML = (porPadre[c.id_comentario] || []).map(r => {
                const esAutorResp  = logueado && String(r.id_usuario) === String(u.id);
                const puedeEditResp  = logueado && (admin || esAutorResp);
                const puedeBorrResp  = logueado && (admin || esAutorResp);
                return `
                <div class="respuesta-escalon" id="resp-${r.id_comentario}">
                    <div class="respuesta-burbuja">
                        <div class="comentario-header">
                            <span class="comentario-autor es-admin">
                                <i class="fas fa-user-shield"></i> Administrador
                            </span>
                            <span class="comentario-fecha">${formatFecha(r.fecha)}</span>
                        </div>
                        <div class="comentario-texto" id="texto-resp-${r.id_comentario}">${escapeHTML(r.comentario)}</div>
                        <div id="edit-form-resp-${r.id_comentario}" class="formulario-edicion" style="display:none"></div>
                        ${(puedeEditResp || puedeBorrResp) ? `
                        <div class="comentario-acciones">
                            ${puedeEditResp ? `
                            <button class="btn-accion btn-editar-com"
                                onclick="abrirEdicion(${r.id_comentario}, 'resp')">
                                <i class="fas fa-pen"></i> Editar
                            </button>` : ''}
                            ${puedeBorrResp ? `
                            <button class="btn-accion btn-eliminar-com"
                                onclick="eliminarComentario(${r.id_comentario})">
                                <i class="fas fa-trash-alt"></i> Eliminar
                            </button>` : ''}
                        </div>` : ''}
                    </div>
                </div>`;
            }).join('');

            // ── Formulario respuesta inline (admin) ──
            const formRespHTML = puedeResponder ? `
                <div class="formulario-respuesta-inline" id="form-resp-${c.id_comentario}">
                    <textarea rows="2" placeholder="Escribe tu respuesta..."
                        id="textarea-resp-${c.id_comentario}"></textarea>
                    <div class="acciones-respuesta">
                        <button class="btn-enviar-respuesta"
                            onclick="enviarRespuesta(${c.id_comentario})">
                            <i class="fas fa-paper-plane"></i> Enviar
                        </button>
                        <button class="btn-cancelar-respuesta"
                            onclick="toggleRespuesta(${c.id_comentario})">
                            Cancelar
                        </button>
                    </div>
                </div>` : '';

            const item = document.createElement('div');
            item.className = 'comentario-item';
            item.id = `com-${c.id_comentario}`;
            item.innerHTML = `
                <div class="comentario-header">
                    ${nombreHTML}
                    <span class="comentario-fecha">${formatFecha(c.fecha)}</span>
                </div>
                <div class="comentario-texto" id="texto-com-${c.id_comentario}">${escapeHTML(c.comentario)}</div>
                <div id="edit-form-com-${c.id_comentario}" class="formulario-edicion" style="display:none"></div>
                <div class="comentario-acciones">
                    ${puedeResponder ? `
                    <button class="btn-accion btn-responder-com"
                        onclick="toggleRespuesta(${c.id_comentario})">
                        <i class="fas fa-reply"></i> Responder
                    </button>` : ''}
                    ${puedeEditar ? `
                    <button class="btn-accion btn-editar-com"
                        onclick="abrirEdicion(${c.id_comentario}, 'com')">
                        <i class="fas fa-pen"></i> Editar
                    </button>` : ''}
                    ${puedeBorrar ? `
                    <button class="btn-accion btn-eliminar-com"
                        onclick="eliminarComentario(${c.id_comentario})">
                        <i class="fas fa-trash-alt"></i> Eliminar
                    </button>` : ''}
                </div>
                ${formRespHTML}
                ${respuestasHTML}
            `;

            container.appendChild(item);
        });

    } catch (err) {
        console.error('Error al cargar comentarios:', err);
        container.innerHTML = '<div class="sin-comentarios"><i class="fas fa-exclamation-triangle"></i> Error al cargar comentarios. Verifica la conexión.</div>';
    }
};

// ── TOGGLE FORMULARIO RESPUESTA ───────────────────────────────────
window.toggleRespuesta = (idPadre) => {
    const form = document.getElementById(`form-resp-${idPadre}`);
    if (!form) return;
    form.classList.toggle('abierto');
    if (form.classList.contains('abierto')) {
        form.querySelector('textarea').focus();
    }
};

// ── ENVIAR RESPUESTA (admin) ──────────────────────────────────────
window.enviarRespuesta = async (idPadre) => {
    const u  = getUsuario();
    const ta = document.getElementById(`textarea-resp-${idPadre}`);
    const texto = ta ? ta.value.trim() : '';

    if (!texto) { toast('Escribe una respuesta antes de enviar', 'error'); return; }

    try {
        const res = await fetch(`${API_URL}/comentarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_usuario:           parseInt(u.id),
                sección:              'historia',
                id_referencia:        null,
                comentario:           texto,
                id_comentario_padre:  idPadre
            })
        });
        const data = await res.json();
        if (res.ok) {
            toast('Respuesta publicada correctamente');
            cargarComentarios();
        } else {
            toast(data.error || 'Error al enviar respuesta', 'error');
        }
    } catch (e) {
        console.error(e);
        toast('Error de conexión con el servidor', 'error');
    }
};

// ── ELIMINAR COMENTARIO ───────────────────────────────────────────
window.eliminarComentario = async (idComentario) => {
    const ok = await confirmar('¿Estás seguro de que deseas eliminar este comentario? Esta acción no se puede deshacer.');
    if (!ok) return;

    const u = getUsuario();

    try {
        const res = await fetch(`${API_URL}/comentarios/${idComentario}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_usuario: parseInt(u.id), rol: u.rol })
        });
        const data = await res.json();
        if (res.ok) {
            toast('Comentario eliminado correctamente');
            // Animación de salida antes de recargar
            const el = document.getElementById(`com-${idComentario}`) ||
                       document.getElementById(`resp-${idComentario}`);
            if (el) {
                el.style.transition = 'opacity 0.3s, transform 0.3s';
                el.style.opacity    = '0';
                el.style.transform  = 'translateX(-10px)';
                setTimeout(cargarComentarios, 320);
            } else {
                cargarComentarios();
            }
        } else {
            toast(data.error || 'Error al eliminar', 'error');
        }
    } catch (e) {
        console.error(e);
        toast('Error de conexión con el servidor', 'error');
    }
};

// ── EDITAR COMENTARIO ─────────────────────────────────────────────
window.abrirEdicion = (idComentario, tipo) => {
    // tipo: 'com' = comentario principal, 'resp' = respuesta
    const textoEl    = document.getElementById(`texto-${tipo}-${idComentario}`);
    const formEl     = document.getElementById(`edit-form-${tipo}-${idComentario}`);
    if (!textoEl || !formEl) return;

    const textoActual = textoEl.textContent.trim();

    // Si ya está abierto, cerrar
    if (formEl.style.display === 'block') {
        formEl.style.display = 'none';
        formEl.innerHTML     = '';
        textoEl.style.display = '';
        return;
    }

    textoEl.style.display = 'none';
    formEl.style.display  = 'block';
    formEl.innerHTML = `
        <textarea id="edit-textarea-${idComentario}"
            rows="3"
            maxlength="500"
            style="width:100%;padding:10px 12px;border:1.5px solid #667eea;border-radius:8px;
                   font-family:inherit;font-size:0.9rem;resize:vertical;box-sizing:border-box;"
        >${escapeHTML(textoActual)}</textarea>
        <div style="display:flex;gap:8px;margin-top:8px;align-items:center;">
            <button class="btn-accion btn-enviar-respuesta"
                style="background:#667eea;color:white;border:none;padding:7px 16px;border-radius:20px;font-size:0.82rem;font-weight:600;cursor:pointer;"
                onclick="guardarEdicion(${idComentario}, '${tipo}')">
                <i class="fas fa-save"></i> Guardar
            </button>
            <button class="btn-accion btn-cancelar-respuesta"
                style="background:#e0e0e0;color:#555;border:none;padding:7px 16px;border-radius:20px;font-size:0.82rem;font-weight:600;cursor:pointer;"
                onclick="cancelarEdicion(${idComentario}, '${tipo}')">
                Cancelar
            </button>
            <span style="font-size:0.75rem;color:#aaa;margin-left:auto;"
                  id="edit-chars-${idComentario}">
                ${500 - textoActual.length} caracteres restantes
            </span>
        </div>`;

    const ta = document.getElementById(`edit-textarea-${idComentario}`);
    ta.focus();
    ta.selectionStart = ta.selectionEnd = ta.value.length;
    ta.addEventListener('input', () => {
        const restantes = document.getElementById(`edit-chars-${idComentario}`);
        if (restantes) restantes.textContent = `${500 - ta.value.length} caracteres restantes`;
    });
};

window.cancelarEdicion = (idComentario, tipo) => {
    const textoEl = document.getElementById(`texto-${tipo}-${idComentario}`);
    const formEl  = document.getElementById(`edit-form-${tipo}-${idComentario}`);
    if (textoEl) textoEl.style.display = '';
    if (formEl)  { formEl.style.display = 'none'; formEl.innerHTML = ''; }
};

window.guardarEdicion = async (idComentario, tipo) => {
    const u  = getUsuario();
    const ta = document.getElementById(`edit-textarea-${idComentario}`);
    if (!ta) return;

    const nuevoTexto = ta.value.trim();
    if (!nuevoTexto) { toast('El comentario no puede quedar vacío', 'error'); return; }
    if (nuevoTexto.length > 500) { toast('Máximo 500 caracteres', 'error'); return; }

    try {
        const res  = await fetch(`${API_URL}/comentarios/${idComentario}`, {
            method:  'PUT',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({
                id_usuario: parseInt(u.id),
                rol:        u.rol,
                comentario: nuevoTexto
            })
        });
        const data = await res.json();
        if (res.ok) {
            toast('Comentario actualizado correctamente');
            cargarComentarios();
        } else {
            toast(data.error || 'Error al editar', 'error');
        }
    } catch (e) {
        console.error(e);
        toast('Error de conexión con el servidor', 'error');
    }
};

// ── PUBLICAR COMENTARIO ───────────────────────────────────────────
const publicarComentario = async () => {
    const u        = getUsuario();
    const textoEl  = document.getElementById('nuevoComentario');
    const errorDiv = document.getElementById('comentarioError');
    const btn      = document.getElementById('btnPublicar');

    if (!u.id || !u.nombre) {
        errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Debes <a href="login.html">iniciar sesión</a> para comentar';
        return;
    }

    const texto = textoEl.value.trim();
    if (!texto) {
        errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Escribe un comentario antes de publicar';
        return;
    }
    if (texto.length > 500) {
        errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> El comentario no puede superar los 500 caracteres';
        return;
    }

    btn.disabled    = true;
    btn.innerHTML   = '<i class="fas fa-spinner fa-spin"></i> Publicando...';

    try {
        const res = await fetch(`${API_URL}/comentarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_usuario:    parseInt(u.id),
                sección:       'historia',
                id_referencia: null,
                comentario:    texto
            })
        });
        const data = await res.json();
        if (res.ok) {
            textoEl.value  = '';
            errorDiv.innerHTML = '';
            toast('Comentario publicado correctamente');
            cargarComentarios();
        } else {
            errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${data.error || 'Error al publicar'}`;
        }
    } catch (e) {
        console.error(e);
        errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error de conexión con el servidor';
    } finally {
        btn.disabled  = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Publicar comentario';
    }
};

// ── VERIFICAR USUARIO ACTIVO ──────────────────────────────────────
const verificarUsuario = () => {
    const u    = getUsuario();
    const info = document.getElementById('usuarioInfo');
    const btn  = document.getElementById('btnPublicar');
    const area = document.getElementById('nuevoComentario');
    if (!info) return;

    if (u.nombre) {
        const admin       = esAdmin(u);
        const nombre      = admin ? 'Administrador' : escapeHTML(u.nombre);
        const icono       = admin ? 'fa-user-shield' : 'fa-check-circle';
        info.innerHTML    = `<i class="fas ${icono}"></i> Comentando como: <strong>${nombre}</strong>`;
        info.style.cssText= 'background:#e8f5e9;color:#2e7d32;padding:10px;border-radius:10px;margin-bottom:15px';
        if (btn)  btn.disabled  = false;
        if (area) area.disabled = false;
    } else {
        info.innerHTML    = `<i class="fas fa-exclamation-circle"></i> <a href="login.html">Inicia sesión</a> para comentar`;
        info.style.cssText= 'background:#fff3e0;color:#e65100;padding:10px;border-radius:10px;margin-bottom:15px';
        if (btn)  btn.disabled  = true;
        if (area) area.disabled = true;
    }
};

// ── ANIMACIONES SCROLL (línea de tiempo y monumentos) ────────────
const animarScroll = () => {
    const inView = (el) => el.getBoundingClientRect().top <= window.innerHeight - 100;
    document.querySelectorAll('.timeline-item').forEach((el, i) => {
        if (inView(el)) setTimeout(() => el.classList.add('animate'), i * 150);
    });
    document.querySelectorAll('.monumento-card').forEach((el, i) => {
        if (inView(el)) setTimeout(() => el.classList.add('animate'), i * 100);
    });
};

// ── MODAL TIMELINE ────────────────────────────────────────────────
const iniciarModalesTimeline = () => {
    const extras = {
        'Fundación':   'León fue la segunda ciudad fundada por los españoles en Nicaragua.',
        'Traslado':    'El volcán Momotombo enterró la ciudad original bajo cenizas y lava.',
        'Catedral':    'Es la catedral más grande de Centroamérica, Patrimonio de la Humanidad.',
        'Universidad': 'La UNAN-León es la segunda universidad más antigua de Centroamérica.',
        'Rubén Darío': 'Rubén Darío es el padre del Modernismo literario en español.',
        'Patrimonio':  'Declarada Patrimonio de la Humanidad el 27 de junio de 2011.'
    };

    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.cursor = 'pointer';
        item.onclick = (e) => {
            if (e.target.closest('.buscador-input')) return;
            const titulo = item.querySelector('h3').textContent;
            const desc   = item.querySelector('p').textContent;
            const año    = item.querySelector('.timeline-year').textContent;
            const extra  = Object.entries(extras).find(([k]) => titulo.includes(k))?.[1]
                           || 'Momento clave en la historia de León.';

            const modal = document.createElement('div');
            modal.className = 'modal-historia';
            modal.innerHTML = `
                <div class="modal-contenido">
                    <span class="modal-cerrar">&times;</span>
                    <h3>${titulo}</h3>
                    <span class="modal-año">${año}</span>
                    <p>${desc}</p>
                    <div class="modal-extra">
                        <p><i class="fas fa-info-circle"></i> <strong>¿Sabías que?</strong> ${extra}</p>
                    </div>
                </div>`;
            document.body.appendChild(modal);
            modal.querySelector('.modal-cerrar').onclick = () => modal.remove();
            modal.onclick = (ev) => { if (ev.target === modal) modal.remove(); };
        };
    });
};

// ── CONTADOR DE AÑOS ──────────────────────────────────────────────
const iniciarContador = () => {
    const años   = new Date().getFullYear() - 1524;
    const header = document.querySelector('.historia-header');
    if (!header || document.querySelector('.contador-anios')) return;

    header.insertAdjacentHTML('beforeend', `
        <div class="contador-anios">
            <div class="contador-numero">0</div>
            <div class="contador-texto">Años de historia</div>
        </div>`);

    const num   = document.querySelector('.contador-numero');
    let start   = 0;
    const timer = setInterval(() => {
        start += Math.ceil(años / (2000 / 16));
        if (start >= años) { num.textContent = años; clearInterval(timer); }
        else num.textContent = start;
    }, 16);
};

// ── INIT ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    animarScroll();
    window.addEventListener('scroll', animarScroll);
    iniciarContador();
    iniciarModalesTimeline();

    if (document.getElementById('comentariosContainer')) {
        cargarComentarios();
        verificarUsuario();
        const btn = document.getElementById('btnPublicar');
        if (btn) btn.onclick = publicarComentario;
    }
});