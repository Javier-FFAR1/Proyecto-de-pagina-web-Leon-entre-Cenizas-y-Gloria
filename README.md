# Proyecto-de-pagina-web-Leon-entre-Cenizas-y-Gloria
# León entre Cenizas y Gloria
## Sitio Web de Patrimonio Cultural — Departamento de León, Nicaragua

**Autor:** Michael Javier Obando Urroz  
**Curso:** Fundamentos de Diseño de pagina web
**Año:** 2026  

---

## Descripción General

León entre Cenizas y Gloria es un sitio web de patrimonio cultural dedicado al departamento de León, Nicaragua. El proyecto tiene como propósito digitalizar y difundir la historia, los monumentos, los personajes ilustres, los volcanes y los municipios que conforman una de las regiones con mayor riqueza cultural e histórica de Centroamérica.

El sistema permite a los visitantes explorar el patrimonio leonés de forma interactiva, registrarse como usuarios, publicar comentarios, responder a otros usuarios y calificar el sitio. Toda la información se gestiona desde una base de datos relacional en tiempo real mediante una API REST.

---

## Estructura del Proyecto

```
Archivos PWP/
├── Frontend/
│   ├── CSS PWP/
│   │   ├── Primera pagina web.css   # Estilos globales, navbar, header, footer
│   │   ├── Historia.css             # Línea de tiempo y sección de monumentos
│   │   ├── Personajes.css           # Tarjetas de personajes históricos
│   │   ├── Volcanes.css             # Tarjetas de volcanes
│   │   └── Municipios.css           # Tarjetas de municipios
│   ├── JS PWP/
│   │   ├── Mi primera pagina web.js # Lógica global: navbar, búsqueda, modo oscuro
│   │   ├── Historia.js              # Línea de tiempo y sistema de comentarios
│   │   ├── Monumento.js             # Galería filtrable de monumentos
│   │   ├── Personajes.js            # Carga de personajes desde la API
│   │   ├── Volcanes.js              # Carga de volcanes desde la API
│   │   └── Municipios.js            # Carga de municipios desde la API
│   ├── Imagenes PWP/                # Recursos gráficos del sitio
│   ├── index.html                   # Página de inicio
│   ├── Historia.html                # Sección de historia y monumentos
│   ├── Personajes.html              # Sección de personajes históricos
│   ├── Volcanes.html                # Sección de volcanes
│   ├── Municipios.html              # Sección de municipios
│   ├── Monumento.html               # Galería principal de monumentos
│   ├── Detalle.html                 # Vista de detalle de cada elemento
│   ├── login.html                   # Formulario de inicio de sesión
│   └── registro.html                # Formulario de registro de usuarios
└── Backend/
    ├── Server.js                    # Servidor Express con todas las rutas de la API
    ├── Configuraciones/
    │   └── db.js                    # Configuración del pool de conexión a MySQL
    ├── Pagina web personal.sql      # Script completo de la base de datos
    └── package.json                 # Dependencias del proyecto
```

---

## Tecnologías Utilizadas

| Capa | Tecnología |
|------|------------|
| Estructura | HTML5 con etiquetas semánticas (`header`, `nav`, `main`, `footer`) |
| Presentación | CSS3, Flexbox, Grid, animaciones, diseño responsivo |
| Interactividad | JavaScript ES6+, Fetch API, manipulación del DOM |
| Servidor | Node.js, Express.js |
| Base de datos | MySQL, mysql2 |
| Iconografía | Font Awesome 6 |

---

## Base de Datos

El proyecto utiliza MySQL con la base de datos `Patrimonio_leondb`. A continuación se describen las tablas que la conforman:

| Tabla | Descripción |
|-------|-------------|
| `Usuarios` | Almacena el registro de usuarios con roles (admin / usuario) |
| `Monumentos` | 23 monumentos con categoría, descripción, imagen y coordenadas |
| `Personajes` | Personajes históricos ilustres del departamento de León |
| `Volcanes` | Volcanes del departamento con altura y nivel de actividad |
| `Municipios` | Los 10 municipios con descripción completa e imágenes |
| `Comentarios` | Sistema de comentarios con soporte para respuestas anidadas |
| `Mensajes_contacto` | Mensajes recibidos a través del formulario de contacto |
| `Valoraciones` | Valoraciones del sitio de 1 a 5 estrellas por usuario |

---

## Instalación y Configuración Local

### Requisitos previos

- Node.js v18 o superior
- MySQL 8.0 o superior

### Pasos de instalación

**1. Instalar las dependencias del backend**

Desde la carpeta `Archivos PWP/Backend`, ejecutar:

```bash
npm install
```

**2. Crear la base de datos**

Abrir MySQL Workbench y ejecutar el script:

```
Archivos PWP/Backend/Pagina web personal.sql
```

Esto creará la base de datos, todas las tablas y los datos iniciales.

**3. Configurar la conexión a MySQL**

Editar el archivo `Archivos PWP/Backend/Configuraciones/db.js` con las credenciales del entorno local:

```js
const pool = mysql.createPool({
    host:     'localhost',
    user:     'root',
    password: 'tu_contraseña',
    database: 'Patrimonio_leondb'
});
```

**4. Iniciar el servidor**

```bash
node Server.js
```

El servidor quedará disponible en `http://localhost:3000`.

**5. Abrir el frontend**

Abrir el archivo `Archivos PWP/Frontend/Primera pagina web.html` con la extensión Live Server de Visual Studio Code.

---

## Funcionalidades del Sistema

**Contenido cultural**
- Línea de tiempo interactiva de la historia de León desde 1524, con contador de años transcurridos y modales informativos al hacer clic en cada evento.
- Galería de monumentos filtrable por categoría (iglesias, museos, teatros, universidades, patrimonio, hoteles), cargada dinámicamente desde la base de datos.
- Secciones de personajes históricos, volcanes y municipios, todas con carga desde la API y skeleton loaders durante la espera.

**Sistema de usuarios**
- Registro e inicio de sesión con validación de campos.
- Roles diferenciados: administrador y usuario normal.
- Perfil de usuario editable.

**Sistema de comentarios**
- Publicación de comentarios por sección del sitio.
- Respuestas anidadas en escalón (el administrador puede responder directamente al comentario de un usuario).
- Edición y eliminación de comentarios propios; el administrador puede gestionar cualquier comentario.

**Otras funcionalidades**
- Modo oscuro con persistencia en localStorage.
- Buscador global en tiempo real.
- Formulario de contacto con almacenamiento en base de datos.
- Sistema de valoración del sitio de 1 a 5 estrellas.
- Diseño responsivo adaptado a móvil, tablet y escritorio.
- Mapa interactivo de ubicaciones patrimoniales.

---

## API REST — Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/monumentos` | Obtener todos los monumentos |
| GET | `/api/personajes` | Obtener todos los personajes |
| GET | `/api/volcanes` | Obtener todos los volcanes |
| GET | `/api/municipios` | Obtener todos los municipios |
| GET | `/api/comentarios?sección=historia` | Obtener comentarios por sección |
| POST | `/api/comentarios` | Publicar un comentario o respuesta |
| PUT | `/api/comentarios/:id` | Editar un comentario existente |
| DELETE | `/api/comentarios/:id` | Eliminar un comentario |
| POST | `/api/registro` | Registrar un nuevo usuario |
| POST | `/api/login` | Iniciar sesión |
| GET | `/api/valoraciones/promedio` | Obtener el promedio de valoraciones |
| POST | `/api/contacto` | Enviar un mensaje de contacto |

---

## Credenciales de Prueba

| Rol | Correo | Contraseña |
|-----|--------|------------|
| Administrador | michaelpatrimonio@gmail.com | Admin9876 |
| Usuario normal | anarodriguez@gmail.com | AnaRO123 |

---

## Licencia

Este proyecto fue desarrollado con fines estrictamente académicos para el curso de Fundamentos y diseño de página web.  
© 2026 Michael Javier Obando Urroz. Todos los derechos reservados.

https://github.com/Javier-FFAR1/Proyecto-de-pagina-web-Leon-entre-Cenizas-y-Gloria.git
