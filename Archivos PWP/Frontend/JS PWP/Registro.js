// JS PWP/Registro.js - VERSIÓN LIMPIA

const API_URL = 'http://localhost:3000/api';

function validarCampos() {
    const nombre = document.getElementById('nombreUsuario');
    const correo = document.getElementById('correoUsuario');
    const password = document.getElementById('passwordUsuario');
    const confirmPass = document.getElementById('confirmPassword');
    const btnRegistro = document.getElementById('btnRegistro');
    const mensaje = document.getElementById('mensajeBienvenida');
    
    let todoValido = true;
    
    // Nombre
    if (nombre.value.trim().length >= 2) {
        nombre.classList.add('valid');
        nombre.classList.remove('error');
    } else {
        nombre.classList.add('error');
        nombre.classList.remove('valid');
        todoValido = false;
    }
    
    // Correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(correo.value.trim())) {
        correo.classList.add('valid');
        correo.classList.remove('error');
    } else {
        correo.classList.add('error');
        correo.classList.remove('valid');
        todoValido = false;
    }
    
    // Contraseña
    if (password.value.length >= 8) {
        password.classList.add('valid');
        password.classList.remove('error');
    } else {
        password.classList.add('error');
        password.classList.remove('valid');
        todoValido = false;
    }
    
    // Confirmar
    if (confirmPass.value === password.value && password.value.length >= 8) {
        confirmPass.classList.add('valid');
        confirmPass.classList.remove('error');
    } else {
        confirmPass.classList.add('error');
        confirmPass.classList.remove('valid');
        todoValido = false;
    }
    
    btnRegistro.disabled = !todoValido;
    
    if (todoValido) {
        mensaje.innerHTML = '✅ Todos los campos son válidos';
        mensaje.style.color = '#27ae60';
    } else {
        mensaje.innerHTML = '⚠️ Completa todos los campos correctamente';
        mensaje.style.color = '#e74c3c';
    }
}

function procesarRegistro() {
    const nombre = document.getElementById('nombreUsuario').value;
    const correo = document.getElementById('correoUsuario').value;
    const password = document.getElementById('passwordUsuario').value;
    const mensaje = document.getElementById('mensajeBienvenida');
    const btn = document.getElementById('btnRegistro');
    
    mensaje.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registrando...';
    mensaje.style.color = '#3498db';
    btn.disabled = true;
    
    fetch(`${API_URL}/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, password, rol: 'usuario' })
    })
    .then(res => res.json())
    .then(data => {
        if (data.id) {
            mensaje.innerHTML = '✅ ¡Registro exitoso!';
            mensaje.style.color = '#27ae60';
            localStorage.setItem('usuarioActivo', nombre);
            localStorage.setItem('usuarioId', data.id);
            setTimeout(() => {
                window.location.href = 'Primera pagina web.html';
            }, 2000);
        } else {
            mensaje.innerHTML = '❌ ' + (data.error || 'Error al registrar');
            mensaje.style.color = '#e74c3c';
            btn.disabled = false;
        }
    })
    .catch(err => {
        console.error(err);
        mensaje.innerHTML = '❌ Error de conexión con el servidor';
        mensaje.style.color = '#e74c3c';
        btn.disabled = false;
    });
}

// Event listeners
document.getElementById('nombreUsuario').addEventListener('input', validarCampos);
document.getElementById('correoUsuario').addEventListener('input', validarCampos);
document.getElementById('passwordUsuario').addEventListener('input', validarCampos);
document.getElementById('confirmPassword').addEventListener('input', validarCampos);

// Ejecutar al cargar
validarCampos();

// Exponer función para el onclick del botón
window.procesarRegistroCompleto = procesarRegistro;