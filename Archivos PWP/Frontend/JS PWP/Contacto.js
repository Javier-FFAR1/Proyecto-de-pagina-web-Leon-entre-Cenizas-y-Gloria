// JS PWP/Contacto.js - CONEXIÓN CON BACKEND

const API_URL = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formContacto');
    const btnEnviar = document.getElementById('btnEnviar');
    const mensajeExito = document.getElementById('mensajeExito');
    
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const asuntoInput = document.getElementById('asunto');
    const mensajeInput = document.getElementById('mensaje');
    
    const errorNombre = document.getElementById('errorNombre');
    const errorEmail = document.getElementById('errorEmail');
    const errorAsunto = document.getElementById('errorAsunto');
    const errorMensaje = document.getElementById('errorMensaje');
    
    let nombreValido = false;
    let emailValido = false;
    let asuntoValido = false;
    let mensajeValido = false;
    
    const validarNombre = () => {
        const valor = nombreInput.value.trim();
        if (valor === '') {
            errorNombre.innerHTML = '<i class="fas fa-exclamation-circle"></i> El nombre es obligatorio';
            nombreInput.classList.add('error');
            nombreInput.classList.remove('valid');
            nombreValido = false;
        } else if (valor.length < 2) {
            errorNombre.innerHTML = '<i class="fas fa-exclamation-circle"></i> Mínimo 2 caracteres';
            nombreInput.classList.add('error');
            nombreInput.classList.remove('valid');
            nombreValido = false;
        } else if (valor.length > 50) {
            errorNombre.innerHTML = '<i class="fas fa-exclamation-circle"></i> Máximo 50 caracteres';
            nombreInput.classList.add('error');
            nombreInput.classList.remove('valid');
            nombreValido = false;
        } else {
            errorNombre.innerHTML = '';
            nombreInput.classList.remove('error');
            nombreInput.classList.add('valid');
            nombreValido = true;
        }
        actualizarBoton();
    };
    
    const validarEmail = () => {
        const valor = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (valor === '') {
            errorEmail.innerHTML = '<i class="fas fa-exclamation-circle"></i> El correo es obligatorio';
            emailInput.classList.add('error');
            emailInput.classList.remove('valid');
            emailValido = false;
        } else if (!emailRegex.test(valor)) {
            errorEmail.innerHTML = '<i class="fas fa-exclamation-circle"></i> Correo inválido';
            emailInput.classList.add('error');
            emailInput.classList.remove('valid');
            emailValido = false;
        } else {
            errorEmail.innerHTML = '';
            emailInput.classList.remove('error');
            emailInput.classList.add('valid');
            emailValido = true;
        }
        actualizarBoton();
    };
    
    const validarAsunto = () => {
        const valor = asuntoInput.value.trim();
        if (valor === '') {
            errorAsunto.innerHTML = '<i class="fas fa-exclamation-circle"></i> El asunto es obligatorio';
            asuntoInput.classList.add('error');
            asuntoInput.classList.remove('valid');
            asuntoValido = false;
        } else if (valor.length < 3) {
            errorAsunto.innerHTML = '<i class="fas fa-exclamation-circle"></i> Mínimo 3 caracteres';
            asuntoInput.classList.add('error');
            asuntoInput.classList.remove('valid');
            asuntoValido = false;
        } else {
            errorAsunto.innerHTML = '';
            asuntoInput.classList.remove('error');
            asuntoInput.classList.add('valid');
            asuntoValido = true;
        }
        actualizarBoton();
    };
    
    const validarMensaje = () => {
        const valor = mensajeInput.value.trim();
        if (valor === '') {
            errorMensaje.innerHTML = '<i class="fas fa-exclamation-circle"></i> El mensaje es obligatorio';
            mensajeInput.classList.add('error');
            mensajeInput.classList.remove('valid');
            mensajeValido = false;
        } else if (valor.length < 10) {
            errorMensaje.innerHTML = '<i class="fas fa-exclamation-circle"></i> Mínimo 10 caracteres';
            mensajeInput.classList.add('error');
            mensajeInput.classList.remove('valid');
            mensajeValido = false;
        } else if (valor.length > 500) {
            errorMensaje.innerHTML = '<i class="fas fa-exclamation-circle"></i> Máximo 500 caracteres';
            mensajeInput.classList.add('error');
            mensajeInput.classList.remove('valid');
            mensajeValido = false;
        } else {
            errorMensaje.innerHTML = '';
            mensajeInput.classList.remove('error');
            mensajeInput.classList.add('valid');
            mensajeValido = true;
        }
        actualizarBoton();
    };
    
    const actualizarBoton = () => {
        const todoValido = nombreValido && emailValido && asuntoValido && mensajeValido;
        btnEnviar.disabled = !todoValido;
    };
    
    const enviarFormulario = async (e) => {
        e.preventDefault();
        
        if (nombreValido && emailValido && asuntoValido && mensajeValido) {
            btnEnviar.disabled = true;
            btnEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            try {
                const response = await fetch(`${API_URL}/contacto`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nombre: nombreInput.value.trim(),
                        email: emailInput.value.trim(),
                        asunto: asuntoInput.value.trim(),
                        mensaje: mensajeInput.value.trim()
                    })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    mensajeExito.innerHTML = '<i class="fas fa-check-circle"></i> Mensaje enviado con éxito. Te responderemos pronto.';
                    mensajeExito.classList.add('show');
                    form.reset();
                    nombreInput.classList.remove('valid');
                    emailInput.classList.remove('valid');
                    asuntoInput.classList.remove('valid');
                    mensajeInput.classList.remove('valid');
                    nombreValido = emailValido = asuntoValido = mensajeValido = false;
                    actualizarBoton();
                    setTimeout(() => mensajeExito.classList.remove('show'), 5000);
                } else {
                    alert('Error: ' + (data.error || 'No se pudo enviar el mensaje'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error de conexión con el servidor');
            } finally {
                btnEnviar.disabled = false;
                btnEnviar.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje';
            }
        }
    };
    
    nombreInput.addEventListener('input', validarNombre);
    emailInput.addEventListener('input', validarEmail);
    asuntoInput.addEventListener('input', validarAsunto);
    mensajeInput.addEventListener('input', validarMensaje);
    form.addEventListener('submit', enviarFormulario);
});