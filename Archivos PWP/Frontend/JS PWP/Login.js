// JS PWP/Login.js - CONEXIÓN CON BACKEND

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btnLogin');
    const userInput = document.getElementById('loginUser');
    const passInput = document.getElementById('loginPass');
    const mensaje = document.getElementById('mensajeLogin');
    
    if (!btn) return;
    
    const API_URL = 'http://localhost:3000/api';
    
   const procesarLogin = async () => {
    const correo = userInput.value.trim();
    const password = passInput.value;
    
    if (!correo || !password) {
        mensaje.innerHTML = '<i class="fas fa-exclamation-circle"></i> Completa todos los campos';
        mensaje.style.color = "#e74c3c";
        return;
    }
    
    mensaje.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando...';
    mensaje.style.color = "#3498db";
    
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            console.log('Datos del login:', data.usuario);
            
            mensaje.innerHTML = '<i class="fas fa-check-circle"></i> Bienvenido ' + data.usuario.nombre;
            mensaje.style.color = "#27ae60";
            
            // Guardar todos los datos del usuario
            localStorage.setItem('usuarioActivo', data.usuario.nombre);
            localStorage.setItem('usuarioId', data.usuario.id_usuario);
            localStorage.setItem('usuarioRol', data.usuario.rol);
            localStorage.setItem('usuarioCorreo', data.usuario.correo);
            localStorage.setItem('sesionIniciada', 'true');
            
            console.log('Sesion guardada:', {
                id: data.usuario.id_usuario,
                nombre: data.usuario.nombre,
                rol: data.usuario.rol
            });
            
            setTimeout(() => {
                window.location.href = "Primera pagina web.html";
            }, 1500);
        } else {
            mensaje.innerHTML = '<i class="fas fa-times-circle"></i> ' + (data.error || 'Usuario o contrasena incorrectos');
            mensaje.style.color = "#e74c3c";
            passInput.value = "";
        }
    }   catch (error) {
        console.error('Error de conexion:', error);
        mensaje.innerHTML = '<i class="fas fa-times-circle"></i> Error de conexion con el servidor';
        mensaje.style.color = "#e74c3c";
    }
};
    
    btn.onclick = procesarLogin;
    
    passInput.onkeypress = (e) => {
        if (e.key === 'Enter') {
            procesarLogin();
        }
    };
});