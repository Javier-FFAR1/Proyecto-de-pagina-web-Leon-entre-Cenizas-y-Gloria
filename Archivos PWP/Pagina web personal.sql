-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS Patrimonio_leondb;
USE Patrimonio_leondb;

-- 1. TABLA DE USUARIOS
CREATE TABLE IF NOT EXISTS Usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    rol ENUM('usuario', 'admin') DEFAULT 'usuario'
);

-- 2. TABLA DE MONUMENTOS -- Nota: el maestro pidio hacer un indice de Monumentos 
CREATE TABLE IF NOT EXISTS Monumentos ( 
    id_monumento INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    ubicacion VARCHAR(200),
    categoria ENUM('iglesia', 'museo', 'teatro', 'universidad', 'hotel', 'patrimonio') NOT NULL,
    imagen VARCHAR(255),
    latitud DECIMAL(10, 8),
    longitud DECIMAL(11, 8)
);

-- 3. TABLA DE COMENTARIOS
CREATE TABLE IF NOT EXISTS Comentarios (
    id_comentario INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    sección VARCHAR(50) NOT NULL,
    id_referencia INT,
    comentario TEXT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Valoraciones (
    id_valoracion INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NULL,
    valoracion INT NOT NULL CHECK (valoracion BETWEEN 1 AND 5),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE SET NULL
);

-- 4. TABLA DE PERSONAJES HISTÓRICOS
CREATE TABLE IF NOT EXISTS Personajes (
    id_personaje INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    nacimiento INT,
    muerte INT,
    imagen VARCHAR(255)
);

-- 5. TABLA DE VOLCANES
CREATE TABLE IF NOT EXISTS Volcanes (
    id_volcan INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    altura INT,
    actividad VARCHAR(50),
    imagen VARCHAR(255)
);

-- 6. TABLA DE MENSAJES DE CONTACTO
CREATE TABLE IF NOT EXISTS Mensajes_contacto (
    id_msj_contacto INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    asunto VARCHAR(150),
    mensaje TEXT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    leido BOOLEAN DEFAULT FALSE
);


-- 7. TABLA DE MUNICIPIOS
CREATE TABLE IF NOT EXISTS Municipios (
    id_municipio        INT PRIMARY KEY AUTO_INCREMENT,
    nombre              VARCHAR(100) NOT NULL,
    descripcion         TEXT,
    descripcion_completa TEXT,
    icono               VARCHAR(50)  DEFAULT 'fa-map-marker-alt',
    imagen_principal    VARCHAR(255),
    imagenes            JSON
);

-- INSERT de los 10 municipios
INSERT INTO Municipios (nombre, descripcion, descripcion_completa, icono, imagen_principal, imagenes) VALUES
 
-- 1. LEÓN
('León',
 'Cabecera departamental. Ciudad universitaria, cultural y patrimonial de Nicaragua. Conocida como la Capital Cultural del país.',
 'León es la segunda ciudad más grande de Nicaragua y su capital cultural. Fundada en 1524 por Francisco Hernández de Córdoba, es sede de la UNAN-León, la segunda universidad más antigua de Centroamérica. Su centro histórico, declarado Patrimonio de la Humanidad junto a la Catedral de la Asunción, alberga una extraordinaria concentración de iglesias coloniales, museos y edificios históricos que hacen de la ciudad un museo a cielo abierto.\n\nLa ciudad fue el epicentro político e intelectual de Nicaragua durante siglos, cuna de Rubén Darío —máximo exponente del Modernismo literario— y escenario de la Revolución Sandinista. Su tradición universitaria, sus poetas y su arquitectura colonial la convierten en un destino cultural único en Centroamérica que atrae a visitantes de todo el mundo.\n\nLeón es también conocida por su gastronomía, sus festividades religiosas y el fervor de sus habitantes, que mantienen vivas tradiciones como La Purísima, la Gigantona y el Enano Cabezón. Caminar por sus calles empedradas es recorrer siglos de historia viva que palpita entre sus paredes encaladas y sus imponentes cúpulas.',
 'fa-church',
 'Imagenes PWP/Municipios/León/Catedral.jpg',
 '["Imagenes PWP/Municipios/León/Catedral.jpg","Imagenes PWP/Municipios/León/Centro Historico.jpg","Imagenes PWP/Municipios/León/UNAN León.jpg","Imagenes PWP/Municipios/León/Parque Central.jpg","Imagenes PWP/Municipios/León/Parque Rubén Darío.jpg"]'),
 
-- 2. EL JICARAL
('El Jicaral',
 'Conocido por su producción de pescado y sus actividades acuáticas en el río Grande.',
 'El Jicaral es un municipio ubicado al noreste del departamento de León, bañado por las aguas del río Grande de Matagalpa. Su economía se basa principalmente en la pesca artesanal, la agricultura y la ganadería, actividades que han dado forma a la identidad y las tradiciones de sus comunidades a lo largo de generaciones.\n\nEl río Grande es el corazón de la vida del municipio, proporcionando sustento a numerosas familias de pescadores que mantienen vivos métodos y técnicas ancestrales. Sus riberas ofrecen paisajes fluviales de gran belleza natural, con bosques de galería que albergan una rica biodiversidad apenas explorada por el turismo convencional.\n\nEl municipio conserva tradiciones y costumbres propias de la zona rural nicaragüense, con festividades patronales que reúnen a toda la comunidad en una celebración de fe y cultura popular. La pesca artesanal en el río Grande es una actividad que se transmite de generación en generación, siendo parte fundamental de la identidad cultural de El Jicaral.',
 'fa-fish',
 'Imagenes PWP/Municipios/El Jicaral/Rio Grande.png',
 '["Imagenes PWP/Municipios/El Jicaral/Rio Grande.png","Imagenes PWP/Municipios/El Jicaral/Iglesia.jpg","Imagenes PWP/Municipios/El Jicaral/Pesca.jpg","Imagenes PWP/Municipios/El Jicaral/Paisaje.jpg","Imagenes PWP/Municipios/El Jicaral/paisaje2.jpg","Imagenes PWP/Municipios/El Jicaral/Pueblo.jpg"]'),
 
-- 3. EL SAUCE
('El Sauce',
 'Zona montañosa, famosa por su quesillo y la laguna El Tule. Destino de peregrinación religiosa al Señor de Esquipulas.',
 'El Sauce es un municipio de zonas montañosas ubicado al norte del departamento de León, rodeado de cerros y bosques que le otorgan un clima fresco y paisajes de gran belleza natural. Es famoso en toda Nicaragua por la Laguna El Tule, un hermoso espejo de agua rodeado de vegetación exuberante que atrae a visitantes en busca de naturaleza, tranquilidad y recreación durante todo el año.\n\nEl municipio es también conocido por su gastronomía, especialmente el quesillo artesanal que se produce en sus comunidades y es considerado uno de los mejores de la región. La producción quesera es una actividad tradicional que refleja la riqueza ganadera de sus tierras y que ha convertido al quesillo saucero en un referente de la identidad gastronómica del departamento de León.\n\nLas fiestas patronales de El Sauce, dedicadas al Señor de Esquipulas, son de las más importantes del departamento, atrayendo peregrinos de toda Nicaragua que llegan con fe y devoción. La combinación de naturaleza, gastronomía y tradición religiosa convierte a El Sauce en uno de los municipios más visitados y queridos del departamento de León.',
 'fa-mountain',
 'Imagenes PWP/Municipios/El Sauce/Laguna El Tule.jpg',
 '["Imagenes PWP/Municipios/El Sauce/Laguna El Tule.jpg","Imagenes PWP/Municipios/El Sauce/Paisaje.jpg","Imagenes PWP/Municipios/El Sauce/Iglesia.jpg","Imagenes PWP/Municipios/El Sauce/Quesillo.jpg","Imagenes PWP/Municipios/El Sauce/Pueblo.jpg"]'),
 
-- 4. LA PAZ CENTRO
('La Paz Centro',
 'Cuna del quesillo nicaragüense, con rica tradición gastronómica y acceso a las Ruinas de León Viejo.',
 'La Paz Centro es mundialmente conocida como la cuna del quesillo, el platillo más emblemático de Nicaragua. Ubicado sobre la carretera Panamericana entre Managua y León, el municipio es parada obligatoria para viajeros atraídos por los puestos de quesillo que se extienden a lo largo de la carretera, ofreciendo ese manjar de tortilla, queso, crema y vinagre con cebolla que ha trascendido fronteras.\n\nLa tradición de elaborar quesillo de manera artesanal se transmite de madres a hijas desde hace generaciones, siendo mucho más que un alimento: es un símbolo de la identidad gastronómica nicaragüense y un orgullo cultural del departamento de León. Cada familia tiene su receta propia, sus secretos y su forma de presentar este platillo que enamora a quien lo prueba por primera vez.\n\nEl municipio es también punto de acceso a las Ruinas de León Viejo, la primera capital de Nicaragua declarada Patrimonio de la Humanidad por la UNESCO, y al imponente Volcán Momotombo. La combinación de gastronomía, historia precolombina y naturaleza volcánica hace de La Paz Centro un nodo turístico imprescindible en cualquier recorrido por el departamento de León.',
 'fa-utensils',
 'Imagenes PWP/Municipios/La Paz Centro/Quesillo.jpg',
 '["Imagenes PWP/Municipios/La Paz Centro/Quesillo.jpg","Imagenes PWP/Municipios/La Paz Centro/Carretera.jpg","Imagenes PWP/Municipios/La Paz Centro/Momotombo.jpg","Imagenes PWP/Municipios/La Paz Centro/Pueblo.jpg","Imagenes PWP/Municipios/La Paz Centro/Leon viejo.jpeg"]'),
 
-- 5. NAGAROTE
('Nagarote',
 'Ubicado entre el lago de Managua y el volcán Momotombo, con rica herencia indígena y artesanal.',
 'Nagarote es un municipio de gran belleza natural ubicado entre el lago Xolotlán (lago de Managua) y el imponente volcán Momotombo. Esta posición privilegiada le otorga paisajes únicos donde el agua y el fuego conviven en una postal natural de extraordinaria belleza, con vistas al Momotombo reflejado en las aguas del lago que dejan sin aliento a quienes las contemplan.\n\nEl municipio tiene una rica historia que se remonta a la época precolombina, cuando comunidades indígenas habitaban sus costas y dejaron una profunda huella cultural que aún puede rastrearse en su toponimia, sus tradiciones y el trabajo de sus artesanos. Sus artesanos producen piezas de barro y cerámica que mantienen viva la tradición alfarera precolombina, siendo estas artesanías muy apreciadas por turistas y coleccionistas nacionales e internacionales.\n\nNagarote es también un importante centro de producción agrícola, con cultivos de caña de azúcar y granos básicos que alimentan su economía local. Las festividades patronales y la hospitalidad proverbial de su gente hacen de Nagarote un destino que combina naturaleza, historia y cultura en una experiencia auténtica y memorable del departamento de León.',
 'fa-water',
 'Imagenes PWP/Municipios/Nagarote/Lago Xolotlan.jpg',
 '["Imagenes PWP/Municipios/Nagarote/Lago Xolotlan.jpg","Imagenes PWP/Municipios/Nagarote/Lago Xolotlan2.jpg","Imagenes PWP/Municipios/Nagarote/Momotombo.jpg","Imagenes PWP/Municipios/Nagarote/Artesanias.jpg","Imagenes PWP/Municipios/Nagarote/Pueblo.png"]'),
 
-- 6. QUEZALGUAQUE
('Quezalguaque',
 'Cuna del cacique Adiac, con profunda identidad indígena sutiaba y costa sobre el Pacífico.',
 'Quezalguaque es un pequeño municipio de gran riqueza histórica ubicado al oeste del departamento de León, cerca de la costa del Pacífico. Es conocido por ser la tierra del cacique Adiac, el líder indígena sutiaba que resistió valientemente la conquista española, convirtiéndose en un símbolo de la resistencia indígena nicaragüense y en referente de la identidad cultural del municipio y de toda la región.\n\nEl municipio conserva una profunda identidad ligada a sus raíces indígenas sutiabas. Sus tradiciones, festividades y formas de organización comunitaria reflejan la continuidad de una cultura que ha sobrevivido siglos de transformaciones históricas. Las celebraciones en honor al cacique Adiac son un momento de reafirmación colectiva de esa identidad que distingue a Quezalguaque dentro del departamento de León.\n\nLa proximidad al mar y la actividad pesquera son también parte fundamental de la vida económica y cultural del municipio. Sus comunidades costeras mantienen una relación ancestral con el Pacífico que se expresa en sus tradiciones, su gastronomía de frutos del mar y su modo de vida, ofreciendo al visitante una experiencia auténtica entre historia indígena, fe popular y la inmensidad del océano.',
 'fa-museum',
 'Imagenes PWP/Municipios/Quezalguaque/Cacique Adiact.jpg',
 '["Imagenes PWP/Municipios/Quezalguaque/Cacique Adiact.jpg","Imagenes PWP/Municipios/Quezalguaque/Costa Pacifico.jpg","Imagenes PWP/Municipios/Quezalguaque/Iglesia.jpg","Imagenes PWP/Municipios/Quezalguaque/Tradiciones.jpg","Imagenes PWP/Municipios/Quezalguaque/Pueblo.jpg"]'),
 
-- 7. SANTA ROSA DEL PEÑÓN
('Santa Rosa del Peñón',
 'Municipio ganadero en las serranías del norte, reconocido por sus quesos artesanales y el imponente peñón rocoso.',
 'Santa Rosa del Peñón es un municipio ubicado en la zona montañosa del norte del departamento de León, caracterizado por sus extensas áreas de pastizales y fincas ganaderas. Sus tierras altas y su clima fresco favorecen la producción lechera de alta calidad, siendo sus quesos y cremas artesanales muy apreciados en todo el departamento y más allá de sus fronteras como símbolo de la ganadería leonesa.\n\nEl municipio toma su nombre del imponente peñón rocoso que domina el paisaje local, un accidente geográfico que ha sido punto de referencia para los habitantes de la región desde tiempos inmemoriales. Desde lo alto del peñón se pueden apreciar vistas panorámicas espectaculares de gran parte del departamento de León, con sus volcanes, llanos y el lejano brillo del lago Xolotlán.\n\nLa vida en Santa Rosa del Peñón gira en torno a los ciclos agrícolas y ganaderos que marcan el ritmo de sus comunidades. Sus ferias anuales de productos lácteos y agrícolas son momentos de encuentro, celebración y orgullo local que reúnen a productores y visitantes de toda la región, mostrando la riqueza y el trabajo de un municipio que alimenta al departamento con sus campos fértiles y su ganadería tradicional.',
 'fa-tractor',
 'Imagenes PWP/Municipios/Santa Rosa del Peñon/Peñon.jpg',
 '["Imagenes PWP/Municipios/Santa Rosa del Peñon/Peñon.jpg","Imagenes PWP/Municipios/Santa Rosa del Peñon/Ganaderia.jpg","Imagenes PWP/Municipios/Santa Rosa del Peñon/Paisaje.jpg","Imagenes PWP/Municipios/Santa Rosa del Peñon/Queso.jpg","Imagenes PWP/Municipios/Santa Rosa del Peñon/Pueblo.jpg"]'),
 
-- 8. ACHUAPA
('Achuapa',
 'El municipio más septentrional de León, con serranías, bosques de pino y el emblemático cerro San Gabriel.',
 'Achuapa es el municipio más septentrional del departamento de León, ubicado en la región montañosa que marca la frontera natural con los departamentos de Estelí y Chinandega. Sus paisajes de serranías, bosques de pino y quebradas de agua cristalina ofrecen una belleza natural sorprendente que contrasta con los paisajes volcánicos del resto del departamento, haciéndolo un destino único dentro de León.\n\nEl Cerro San Gabriel es el punto más alto y emblemático del municipio, un destino de senderismo que ofrece vistas panorámicas espectaculares de varios departamentos de Nicaragua. Su ascensión es una experiencia que combina el esfuerzo físico con la recompensa de paisajes de gran belleza natural, y que cada vez atrae a más amantes del turismo de aventura y el ecoturismo en Nicaragua.\n\nAchuapa es también conocido por sus comunidades rurales que mantienen formas de vida tradicionales basadas en la agricultura de subsistencia, la artesanía y el aprovechamiento sostenible de sus recursos naturales. El turismo rural y ecológico está emergiendo como una alternativa económica prometedora, permitiendo a los visitantes conocer de cerca la vida campesina nicaragüense en toda su autenticidad y hospitalidad.',
 'fa-hiking',
 'Imagenes PWP/Municipios/Achuapa/Cerro San Gabriel.jpg',
 '["Imagenes PWP/Municipios/Achuapa/Cerro San Gabriel.jpg","Imagenes PWP/Municipios/Achuapa/Montañas.jpg","Imagenes PWP/Municipios/Achuapa/Bosque.jpg","Imagenes PWP/Municipios/Achuapa/Pueblo.jpg","Imagenes PWP/Municipios/Achuapa/Rio.jpg"]'),
 
-- 9. TELICA
('Telica',
 'Municipio volcánico y minero, hogar del Volcán Telica, uno de los más activos de Nicaragua.',
 'Telica es un municipio que lleva el nombre de uno de los volcanes más activos de Nicaragua, el Volcán Telica, cuyo cráter constantemente humeante es visible desde gran parte del departamento. La presencia de este gigante de fuego ha moldeado profundamente la identidad, la economía y las tradiciones de sus habitantes, que conviven cotidianamente con la naturaleza volcánica que define el carácter del municipio.\n\nAdemás de su vocación volcánica y turística, Telica es un municipio minero con importante producción de cal y materiales de construcción. La minería artesanal ha sido durante siglos una actividad económica complementaria a la agricultura que proporciona sustento a numerosas familias del municipio, y que ha dejado su huella en el paisaje y en la cultura del trabajo de sus gentes.\n\nLas festividades patronales de Telica y su cultura local reflejan esa convivencia entre la tierra y el fuego que caracteriza al municipio. La gastronomía local, los mercados artesanales y la hospitalidad de su gente hacen de Telica un destino auténtico para quienes buscan conocer el León profundo, más allá de su capital, en contacto directo con la fuerza telúrica que da vida y forma a todo el departamento.',
 'fa-oil-can',
 'Imagenes PWP/Municipios/Telica/Volcan Telica.jpg',
 '["Imagenes PWP/Municipios/Telica/Volcan Telica.jpg","Imagenes PWP/Municipios/Telica/Crater.jpg","Imagenes PWP/Municipios/Telica/Paisaje.jpg","Imagenes PWP/Municipios/Telica/Pueblo.jpg","Imagenes PWP/Municipios/Telica/Siembra.jpg"]'),
 
-- 10. MALPAISILLO
('Malpaisillo',
 'Municipio de paisajes volcánicos únicos, famoso por el sandboard en el Cerro Negro y las lagunas cratéricas.',
 'Malpaisillo es un municipio ubicado en la llanura central del departamento de León, en las inmediaciones del volcán Cerro Negro y la cadena volcánica de Los Marrabios. Su nombre hace referencia al "mal país", como los colonizadores llamaban a los terrenos de lava volcánica que caracterizan parte de su territorio, un paisaje único de gran valor geológico y natural que hoy se ha convertido en atractivo turístico de primer orden.\n\nLa proximidad al Cerro Negro convierte a Malpaisillo en uno de los puntos de acceso al volcán más joven de Centroamérica y al famoso sandboard, la actividad de deslizarse a gran velocidad por sus laderas de arena volcánica negra. Este turismo de aventura ha puesto a Malpaisillo en el mapa turístico internacional, atrayendo viajeros de todo el mundo que buscan experiencias únicas en contacto con la naturaleza volcánica nicaragüense.\n\nEl municipio tiene también una importante producción agrícola, especialmente de granos básicos y caña de azúcar. Sus comunidades rurales mantienen tradiciones de trabajo colectivo y festividades religiosas que son expresión de la rica cultura popular del León rural. Las lagunas cratéricas del Complejo Volcánico San Cristóbal, cercanas al municipio, ofrecen además paisajes de insólita belleza que complementan la experiencia de visitar este territorio marcado por el fuego y la tierra.',
 'fa-fire',
 'Imagenes PWP/Municipios/Malpaisillo/Cerro Negro.jpg',
 '["Imagenes PWP/Municipios/Malpaisillo/Cerro Negro.jpg","Imagenes PWP/Municipios/Malpaisillo/Sandboard.jpg","Imagenes PWP/Municipios/Malpaisillo/Paisaje.jpg","Imagenes PWP/Municipios/Malpaisillo/Pueblo.jpg","Imagenes PWP/Municipios/Malpaisillo/Lava.jpg"]');
-- Insertar un usuario admin
INSERT INTO usuarios (nombre, correo, password, rol) VALUES 
('Michael Urroz', 'michael@patrimonio.com', 'Admin9876', 'admin');

-- Insertar un usuario normal
INSERT INTO usuarios (nombre, correo, password, rol) VALUES 
('Ana Rodriguez', 'ana@gmail.com', 'Ana123', 'usuario');

DESCRIBE Monumentos;


-- Insertar algunos monumentos
INSERT INTO Monumentos (nombre, descripcion, ubicacion, categoria, imagen) VALUES 
('Iglesia San Juan de Dios', 'Hermosa iglesia colonial del siglo XVIII, ubicada en el centro histórico de León.', 'Calle San Juan, León', 'iglesia', 'Iglesia San Juan de Dios.jpg'),
('Iglesia El Calvario', 'Famosa por albergar el Cristo Negro, una de las imágenes religiosas más veneradas de Nicaragua.', 'Calle El Calvario, León', 'iglesia', 'Iglesia el Calvario.jpg'),
('Iglesia La Merced', 'Impresionante fachada barroca y uno de los templos más antiguos de la ciudad.', 'Calle La Merced, León', 'iglesia', 'Iglesia La Merced.jpg'),
('Iglesia San Francisco', 'Uno de los templos más antiguos de León, con hermosa fachada barroca y un convento adjunto.', 'Centro Histórico, León', 'iglesia', 'Iglesia San Francisco.jpg'),
('Iglesia El Sutiaba', 'Construida sobre un antiguo cementerio indígena. Es el templo más antiguo de León, data de 1524.', 'Barrio Sutiaba, León', 'iglesia', 'Iglesia El Sutiaba.jpg'),
('Museo de Arte Ortíz Gurdián', 'Colección de arte nicaragüense e internacional en una casona colonial.', 'Calle La Calzada, León', 'museo', 'Museo de Arte Ortíz Gurdián.jpg'),
('Museo Rubén Darío', 'Casa natal del Príncipe de las Letras Castellanas. Conserva objetos personales y manuscritos del poeta.', 'Calle Rubén Darío, León', 'museo', 'Museo Rubén Darío.jpg'),
('Antigua Cárcel de la 21', 'Centro cultural que antes fue cárcel. Alberga exposiciones de arte y eventos culturales.', 'Calle Real, León', 'museo', 'Carcel La 21.avif'),
('UNAN - León', 'Segunda universidad más antigua de Centroamérica, fundada en 1813. Cuna de Rubén Darío.', 'Suroeste de la Catedral, León', 'universidad', 'UNAN-León.jpg'),
('Ruinas de León Viejo', 'Ciudad original fundada en 1524. Patrimonio de la Humanidad por la UNESCO.', 'Puerto Momotombo, 30km de León', 'patrimonio', 'Ruinas de León Viejo.webp'),
('Palacio Municipal', 'Edificio histórico del siglo XIX, sede del gobierno municipal. Destaca por su arquitectura neoclásica.', 'Parque Central, León', 'patrimonio', 'Alcaldía Municipal.jpg'),
('Iglesia La Recolección', 'Templo del siglo XVIII con hermosa fachada barroca. Actualmente funciona como centro cultural.', 'Calle Real, León', 'iglesia', 'Iglesia La Recolección.jpg'),
('Iglesia San Felipe', 'Templo del siglo XVIII ubicado en el tradicional barrio San Felipe, con hermosa arquitectura colonial.', 'Barrio San Felipe, León', 'iglesia', 'Iglesia San Felipe.png'),
('Iglesia San Sebastián', 'Iglesia colonial del siglo XVIII, famosa por sus festividades patronales en enero.', 'Barrio San Sebastián, León', 'iglesia', 'Iglesia San Sebastián.jpg');
INSERT INTO Monumentos (nombre, descripcion, ubicacion, categoria, imagen) VALUES
('Catedral de León', 'Santa Iglesia Catedral Basílica de la Asunción. Patrimonio de la Humanidad por la UNESCO. Es la catedral más grande de Centroamérica.', 'Centro Histórico, León', 'iglesia', 'Catedral.jpg'),
('Museo de la Revolución', 'Antigua cárcel de la Guardia Nacional, hoy museo histórico.', 'Frente a la Catedral, León', 'museo', 'Museo de la Revolución.jpg'),
('Teatro José de la Cruz Mena', 'Teatro municipal construido en 1885, joya arquitectónica del siglo XIX.', 'Calle Rubén Darío, León', 'teatro', 'Teatro José de la Cruz Mena.jpg'),
('Estación de Ferrocarril', 'Edificio de arquitectura metálica del siglo XIX, testigo del auge del transporte ferroviario.', 'Calle Central, León', 'patrimonio', 'Antigua Estación del Ferrocarril.jpg'),
('Hotel La Recolección', 'Antiguo convento del siglo XVIII convertido en hotel boutique.', 'Calle Real, León', 'hotel', 'Hotel La Recolección.jpg');
-- Insertar personajes
INSERT INTO Personajes (nombre, descripcion, nacimiento, muerte, imagen) VALUES 
('Rubén Darío', 'Poeta, periodista y diplomático. Máximo exponente del Modernismo literario en español. Nació en Metapa pero vivió gran parte de su vida en León.', 1867, 1916, 'Rubén Darío.jpg'),
('Máximo Jerez', 'Militar, político y héroe nacional. Luchó en la Guerra Nacional contra los filibusteros de William Walker. Nació en León.', 1818, 1881, 'Máximo Jerez.jpg'),
('José de la Cruz Mena', 'Músico y compositor, autor de la música del Himno Nacional de Nicaragua. Nació en León.', 1874, 1907, 'José de la Cruz Mena.jpg'),
('Juan José Quesada', 'Poeta, periodista y diplomático. Figura importante de la literatura leonesa del siglo XIX.', 1830, 1887, 'Juan José Quesada.jpg'),
('Alfonso Cortés', 'Poeta místico, considerado uno de los más importantes de Nicaragua. Nació en León.', 1893, 1969, 'Alfonso Cortés.jpg'),
('Salomón Ibarra Mayorga', 'Poeta y compositor, autor de la letra del Himno Nacional de Nicaragua. Nació en León.', 1887, 1985, 'Salomón Ibarra Mayorga.jpg');

-- Insertar volcanes
INSERT INTO Volcanes (nombre, descripcion, altura, actividad, imagen) VALUES 
('Cerro Negro', 'El volcán más joven de Centroamérica. Es famoso por la práctica de sandboard sobre sus arenas negras.', 728, 'Activo', 'Cerro Negro.jpg'),
('Volcán Santa Clara', 'Volcán con un cráter accesible, ideal para senderismo. Ofrece vistas espectaculares del paisaje circundante.', 850, 'Activo', 'Santa Clara.jpg'),
('Volcán Telica', 'Uno de los volcanes más activos de Nicaragua. Su cráter constantemente humeante lo hace muy popular para excursionistas.', 1061, 'Activo', 'Telica.jpg'),
('Volcán El Hoyo', 'Volcán con un cráter en forma de hoyo, ubicado en la cordillera de Los Marrabios.', 832, 'Activo', 'Hoyo.jpg'),
('Volcán Rota', 'Volcán menos conocido de la cordillera de Los Marrabios. Su nombre proviene de su cráter abierto.', 782, 'Activo', ' Volcan Rota.jpg');

-- Insertar usuario administrador
INSERT INTO Usuarios (nombre_usuario, correo, password, rol) VALUES 
('Michael Urroz', 'michael@patrimonio.com', 'Admin9876', 'admin');

-- Insertar usuario normal de prueba
INSERT INTO Usuarios (nombre_usuario, correo, password, rol) VALUES 
('Ana Rodriguez', 'ana@gmail.com', 'Ana123', 'usuario');

-- Insertar otro usuario normal
INSERT INTO Usuarios (nombre_usuario, correo, password, rol) VALUES 
('Carlos Mendoza', 'carlos@mail.com', 'Carlos123', 'usuario');

INSERT INTO Usuarios (nombre_usuario, correo, password, rol) VALUES 
('Fernando Luis Garcia Solis', 'fernando@gmail.com', 'Fernando123', 'usuario');

SELECT * FROM Usuarios;
INSERT INTO Comentarios (id_usuario, sección, comentario) 
VALUES (1, 'historia', 'Comentario de prueba desde SQL');

Select * from Monumentos;


SELECT * FROM Mensajes_contacto;
SELECT * FROM Comentarios;
SELECT * FROM Personajes;
SELECT * FROM Volcanes;
Select * FROM Valoraciones;

ALTER TABLE Comentarios AUTO_INCREMENT = 1;
SELECT * FROM Comentarios ORDER BY fecha DESC;


SELECT id_personaje, nombre, imagen FROM Personajes WHERE nombre = 'Juan José Quezada';
SELECT id_personaje, nombre, imagen FROM Personajes WHERE nombre LIKE '%Quesada%';
-- Corregir Rubén Darío
UPDATE Personajes SET imagen = 'Rubén Darío.jpeg' WHERE id_personaje= 1;

-- Corregir Juan José Quesada
UPDATE Personajes SET imagen = 'Juan José Quezada.jpg' WHERE id_personaje = 4;


-- Ver los ids
SELECT id_volcan, nombre, imagen FROM Volcanes;

-- Actualizar con el id correspondiente (ejemplo: si Cerro Negro es id=1)
UPDATE Volcanes SET imagen = 'Cerro Negro.png' WHERE id_volcan = 1;



CREATE INDEX -- Tarea Indice para la tabla Monumentos.
idx_categoria ON Monumentos(categoria);

SHOW INDEX FROM Monumentos;


-- Actualizar Volcán Rota
UPDATE Volcanes SET imagen = 'Volcan Rota.jpg' WHERE id_volcan = 5;

USE Patrimonio_leondb;
SET SQL_SAFE_UPDATES = 0;

-- ============================================
-- MONUMENTOS
-- ============================================

UPDATE Monumentos SET descripcion = 'La Catedral de León, oficialmente llamada Santa Iglesia Catedral Basílica de la Asunción, es el templo católico más grande de Centroamérica. Su construcción inició en 1747 y fue concluida en 1860, siendo obra del arquitecto Diego de Porres. En 2011, la UNESCO la declaró Patrimonio de la Humanidad junto con las ruinas de León Viejo.

Su imponente fachada barroca contrasta con un interior de estilo neoclásico que alberga las tumbas de figuras ilustres de Nicaragua, entre ellas la del poeta Rubén Darío. Subir a su techo blanco es una de las experiencias más populares entre visitantes, ofreciendo una vista panorámica única de toda la ciudad de León.

La catedral es el corazón espiritual y cultural de León. Cada año miles de peregrinos y turistas la visitan, especialmente durante Semana Santa, cuando la ciudad organiza procesiones que parten desde sus puertas y recorren el centro histórico.' WHERE nombre = 'Catedral de León';

UPDATE Monumentos SET descripcion = 'El Teatro José de la Cruz Mena fue construido en 1885 y lleva el nombre del compositor leonés autor de la música del Himno Nacional de Nicaragua. Es considerada la joya arquitectónica más importante del siglo XIX en León y uno de los teatros coloniales mejor conservados de Centroamérica.

Su fachada de estilo neoclásico con arcos y columnas lo convierte en uno de los edificios más fotografiados de la ciudad. En su interior se han presentado las más importantes compañías de teatro, danza y música de Nicaragua y de toda la región centroamericana.

Tras una restauración integral financiada por el gobierno, el teatro fue reinaugurado y hoy funciona como el principal escenario cultural de León, albergando festivales, conciertos y obras teatrales durante todo el año.' WHERE nombre = 'Teatro José de la Cruz Mena';

UPDATE Monumentos SET descripcion = 'El Museo Rubén Darío está ubicado en la casa donde vivió el Príncipe de las Letras Castellanas durante su infancia y adolescencia en León. La casona colonial data del siglo XIX y ha sido cuidadosamente preservada para mantener la atmósfera que rodeó al poeta durante sus años de formación.

En sus salas se conservan objetos personales del poeta, manuscritos originales, fotografías, ediciones raras de sus obras y correspondencia con figuras literarias de todo el mundo. Es uno de los museos más visitados de Nicaragua y punto de peregrinaje obligado para amantes de la literatura en español.

El museo también alberga una biblioteca especializada en la obra dariana y organiza regularmente eventos culturales, lecturas de poesía y exposiciones temporales en honor al mayor poeta que ha dado Nicaragua al mundo.' WHERE nombre = 'Museo Rubén Darío';

UPDATE Monumentos SET descripcion = 'El Museo de la Revolución ocupa lo que fuera la antigua cárcel de la Guardia Nacional Somocista, un edificio cargado de historia y simbolismo para el pueblo nicaragüense. Sus paredes fueron testigos de la represión y la lucha que culminó con el triunfo de la Revolución Sandinista en 1979.

Hoy sus salas albergan fotografías, documentos, armas y testimonios que narran la historia de la lucha revolucionaria en Nicaragua. Los guías, muchos de ellos ex combatientes o familiares de héroes caídos, ofrecen relatos de primera mano que hacen la visita profundamente emotiva e impactante.

León fue la primera ciudad liberada durante la insurrección de 1979, y este museo es el testimonio vivo de ese papel histórico. Es visita obligada para entender la historia reciente de Nicaragua y el sacrificio que costó la libertad al pueblo leonés.' WHERE nombre = 'Museo de la Revolución';

UPDATE Monumentos SET descripcion = 'Las Ruinas de León Viejo representan los vestigios de la primera ciudad española fundada en Nicaragua en 1524 por Francisco Hernández de Córdoba. La ciudad original fue sepultada por la erupción del volcán Momotombo en 1610, quedando preservada bajo ceniza y tierra durante casi cuatro siglos.

Las excavaciones arqueológicas iniciadas en 1967 sacaron a la luz una ciudad casi intacta con iglesias, viviendas, edificios gubernamentales y cementerios. En el año 2000, la UNESCO la declaró Patrimonio de la Humanidad, reconociendo su valor excepcional como testimonio de la colonización española en América.

Ubicadas a 30 kilómetros de la ciudad actual de León, a orillas del lago Xolotlán y a los pies del Momotombo, las ruinas ofrecen una ventana única al siglo XVI. El sitio incluye un museo con piezas arqueológicas rescatadas y paneles que reconstruyen cómo era la vida cotidiana en aquella primera León.' WHERE nombre = 'Ruinas de León Viejo';

UPDATE Monumentos SET descripcion = 'La Iglesia El Calvario, construida en el siglo XVIII, es famosa por albergar al Cristo Negro, una de las imágenes religiosas más veneradas de toda Nicaragua. Según la tradición popular, la imagen fue tallada en madera de color oscuro por un artesano indígena del barrio Sutiaba, y se le atribuyen numerosos milagros a lo largo de los siglos.

La devoción al Cristo Negro convoca cada año a miles de fieles que acuden a pedir favores o agradecer sus milagros. Durante la Semana Santa leonesa, considerada una de las más solemnes de Centroamérica, la imagen es protagonista de emotivas procesiones nocturnas que recorren las calles de la ciudad.

El templo en sí destaca por su arquitectura colonial sencilla pero elegante, con una nave principal decorada con pinturas y retablos de gran valor artístico. Su campanario se ha convertido en uno de los íconos visuales del perfil urbano de León.' WHERE nombre = 'Iglesia El Calvario';

UPDATE Monumentos SET descripcion = 'La UNAN-León, fundada en 1813, es la segunda universidad más antigua de Centroamérica y la primera de Nicaragua. Fue creada durante el período colonial como la Universidad de León y ha formado a las más importantes figuras intelectuales, políticas y científicas del país a lo largo de más de dos siglos de historia.

Entre sus ilustres egresados se encuentran poetas, presidentes, científicos y revolucionarios que marcaron el rumbo de Nicaragua. Sus edificios históricos, distribuidos alrededor de la catedral, son declarados patrimonio arquitectónico y representan algunos de los mejores ejemplos de arquitectura académica colonial en la región.

Hoy la UNAN-León es una institución pública de educación superior con múltiples facultades y miles de estudiantes. Su biblioteca histórica conserva manuscritos y documentos del período colonial que son piezas invaluables para la historia de Nicaragua y Centroamérica.' WHERE nombre = 'UNAN - León';

UPDATE Monumentos SET descripcion = 'El Museo de Arte Ortíz Gurdián está ubicado en dos casas coloniales del siglo XVIII restauradas y comunicadas entre sí, formando uno de los museos de arte más importantes de Centroamérica. Su colección permanente incluye más de 500 obras de artistas nicaragüenses e internacionales de los siglos XIX, XX y XXI.

Entre sus tesoros más destacados se encuentran obras de maestros latinoamericanos y europeos, junto a una valiosa colección de arte precolombino y piezas de la época colonial. El museo organiza regularmente exposiciones temporales, talleres de arte y actividades culturales que lo convierten en un centro vivo de la cultura leonesa.

La restauración de los edificios que lo albergan fue reconocida con premios internacionales de arquitectura por la forma en que integra elementos coloniales con espacios modernos de exhibición. Una visita al Ortíz Gurdián es una experiencia estética única que combina arte, historia y arquitectura en un mismo recorrido.' WHERE nombre = 'Museo de Arte Ortíz Gurdián';

UPDATE Monumentos SET descripcion = 'La Iglesia La Merced, construida en el siglo XVII, es uno de los templos más antiguos de León y destaca por su espléndida fachada de estilo barroco, considerada una de las más bellas de Nicaragua. Su construcción estuvo a cargo de la orden mercedaria y ha sobrevivido terremotos, erupciones volcánicas y el paso de los siglos.

El interior del templo conserva retablos y pinturas coloniales de gran valor histórico y artístico. Su campanario, visible desde varios puntos de la ciudad, ha sido durante siglos el punto de referencia visual del barrio que lleva su nombre. La iglesia fue restaurada en varias ocasiones, la más reciente con apoyo de organismos internacionales de preservación del patrimonio.

La Merced es también conocida por su activa vida parroquial y por ser sede de importantes celebraciones religiosas. Sus fiestas patronales, celebradas en septiembre, reúnen a toda la comunidad del barrio en una semana de procesiones, música y tradiciones que se mantienen vivas desde la época colonial.' WHERE nombre = 'Iglesia La Merced';

UPDATE Monumentos SET descripcion = 'La Antigua Cárcel La 21, también conocida como La Pólvora, fue construida en el siglo XIX y sirvió durante décadas como prisión bajo el régimen somocista. Sus muros de adobe y su patio central fueron testigos del sufrimiento de presos políticos que luchaban por la libertad de Nicaragua.

Tras el triunfo de la Revolución Sandinista en 1979, el edificio fue transformado en un espacio cultural dedicado al arte y la memoria histórica. Hoy alberga exposiciones de arte contemporáneo, instalaciones, fotografía y eventos culturales que contrastan poderosamente con el oscuro pasado del lugar.

La reconversión de La 21 en centro cultural es un símbolo del proceso de reconciliación y transformación social que vivió León tras la revolución. El edificio conserva intencionalmente elementos de su pasado carcelario como recordatorio histórico, creando una tensión creativa entre el arte y la memoria que lo hace único en Nicaragua.' WHERE nombre = 'Antigua Cárcel de la 21';

UPDATE Monumentos SET ubicacion = 'Al Norte de la Catedral, León' WHERE nombre= 'Mausoleo de los Héroes y Mártires';

-- ============================================
-- PERSONAJES
-- ============================================

UPDATE Personajes SET descripcion = 'Félix Rubén García Sarmiento, conocido universalmente como Rubén Darío, nació el 18 de enero de 1867 en Metapa, hoy Ciudad Darío, Nicaragua. Desde muy temprana edad demostró un talento excepcional para la poesía, escribiendo sus primeros versos a los doce años. Vivió gran parte de su vida en León, ciudad que considera su verdadero hogar espiritual y donde reposan sus restos en la Catedral.

Darío es el fundador y máximo exponente del Modernismo literario en lengua española, movimiento que renovó radicalmente la poesía hispanoamericana a finales del siglo XIX. Sus obras más célebres incluyen "Azul..." (1888), "Prosas Profanas" (1896) y "Cantos de Vida y Esperanza" (1905), libros que transformaron para siempre la literatura en español y le valieron reconocimiento internacional en vida.

Además de poeta, Darío fue periodista, diplomático y viajero incansable. Vivió en Chile, Argentina, España y París, donde se relacionó con los más grandes escritores y artistas de su época. Falleció el 6 de febrero de 1916 en León, siendo su muerte declarada duelo nacional. Hoy es considerado el poeta más importante de la lengua española después de Cervantes.' WHERE nombre = 'Rubén Darío';

UPDATE Personajes SET descripcion = 'Máximo Jerez Tellería nació el 4 de mayo de 1818 en León, Nicaragua, en el seno de una familia criolla de ideales liberales. Desde joven se destacó en los campos del derecho, la política y las armas, convirtiéndose en una de las figuras más importantes del siglo XIX nicaragüense. Estudió derecho en la Universidad de León y pronto se involucró en la turbulenta vida política de su país.

Su momento más glorioso llegó durante la Guerra Nacional de 1856-1857, cuando Nicaragua fue invadida por el filibustero estadounidense William Walker, quien llegó a proclamarse presidente del país. Jerez lideró la resistencia nacional junto a otros patriotas centroamericanos, siendo uno de los artífices de la derrota definitiva de Walker en la Batalla de San Jacinto y en el sitio de Rivas.

Tras la guerra, Jerez continuó su carrera política ocupando importantes cargos en el gobierno de Nicaragua y representando al país en misiones diplomáticas en el exterior. Falleció el 3 de diciembre de 1881 en Washington D.C., mientras ejercía como ministro plenipotenciario de Nicaragua ante el gobierno de los Estados Unidos. Es considerado uno de los héroes nacionales más importantes de Nicaragua.' WHERE nombre = 'Máximo Jerez';

UPDATE Personajes SET descripcion = 'José de la Cruz Mena nació el 8 de octubre de 1874 en León, Nicaragua. Desde niño mostró una extraordinaria sensibilidad musical que cultivó de forma autodidacta, llegando a convertirse en el compositor más importante de su generación. A pesar de haber contraído lepra en su juventud, enfermedad que lo marginó socialmente, nunca abandonó su pasión por la música.

Su legado más trascendental es la composición de la música del Himno Nacional de Nicaragua, cuya letra fue escrita por Salomón Ibarra Mayorga, también leonés. Esta obra, compuesta con una solemnidad y belleza que refleja el alma del pueblo nicaragüense, inmortalizó su nombre en la historia del país. Además del himno, compuso numerosas piezas para piano, canciones y obras religiosas de gran valor artístico.

La vida de José de la Cruz Mena es una historia de superación y genio artístico contra la adversidad. Falleció el 6 de junio de 1907 en León, a los 33 años, siendo reconocido póstumamente como uno de los más grandes músicos que ha dado Nicaragua. El teatro municipal de León lleva su nombre como homenaje permanente a su talento y su historia de vida.' WHERE nombre = 'José de la Cruz Mena';

UPDATE Personajes SET descripcion = 'Juan José Quesada nació en 1830 en León, Nicaragua, y fue una de las figuras literarias más destacadas de la ciudad durante el siglo XIX. Periodista, poeta y diplomático, Quesada representó el espíritu romántico e ilustrado de una generación de leoneses que pusieron la cultura y las letras al servicio de la construcción de la nación nicaragüense.

Como periodista fundó y dirigió varios periódicos en León, desde cuyas páginas promovió la educación, la cultura y los valores liberales que caracterizaron a la élite intelectual de su época. Su poesía, de corte romántico, abordó temas como el amor, la patria y la naturaleza nicaragüense con una sensibilidad y un dominio del lenguaje que lo colocaron entre los mejores poetas de su generación.

Su labor diplomática lo llevó a representar a Nicaragua en varios países, donde fue un embajador no solo de los intereses políticos del país sino también de su cultura y sus letras. Falleció en 1887, dejando una obra que, aunque poco difundida fuera de Nicaragua, es un testimonio valioso de la vida cultural leonesa del siglo XIX.' WHERE nombre = 'Juan José Quesada';

UPDATE Personajes SET descripcion = 'Alfonso Cortés nació el 10 de enero de 1893 en León, Nicaragua, y está considerado junto a Rubén Darío y Salomón de la Selva como uno de los tres poetas más importantes de la historia de Nicaragua. Su poesía, de una profundidad metafísica y una originalidad extraordinarias, lo coloca entre los grandes poetas místicos de la lengua española del siglo XX.

Su vida estuvo marcada por la tragedia: en 1927, mientras vivía en la misma casa de Rubén Darío en León, sufrió un episodio de locura del que nunca se recuperó completamente. Durante décadas vivió encadenado en esa casa, y paradójicamente fue durante esos años de reclusión cuando produjo algunos de sus poemas más brillantes, incluyendo su célebre "La Canción del Espacio", considerada una obra maestra de la poesía en español.

La historia de Cortés es la de un genio incomprendido que encontró en la poesía su único refugio y su forma de trascender el sufrimiento. Falleció el 8 de abril de 1969 en León, dejando una obra poética que fue redescubierta y valorada en su justa dimensión décadas después de su muerte. Hoy su figura es objeto de estudio en universidades de todo el mundo hispanohablante.' WHERE nombre = 'Alfonso Cortés';

UPDATE Personajes SET descripcion = 'Salomón Ibarra Mayorga nació el 8 de noviembre de 1887 en León, Nicaragua, y pasó a la historia como el autor de la letra del Himno Nacional de Nicaragua, obra que lo inmortalizó en el corazón de todos los nicaragüenses. Poeta, maestro y periodista, Ibarra Mayorga dedicó su vida a las letras y a la educación, siendo una figura querida y respetada en la sociedad leonesa.

La letra del himno, que escribió en colaboración con la música de su compatriota José de la Cruz Mena, captura con maestría el espíritu patriótico y los valores del pueblo nicaragüense. Sus versos, llenos de dignidad y amor por la patria, han sido cantados por generaciones de nicaragüenses desde que el himno fue oficialmente adoptado por el Estado.

Más allá del himno, Ibarra Mayorga fue un poeta prolífico que cultivó diferentes géneros literarios y un educador comprometido con la formación de las nuevas generaciones leonesas. Vivió hasta la extraordinaria edad de 97 años, falleciendo el 31 de enero de 1985 en León, siendo testigo de cómo su obra mayor se convertía en el símbolo musical de su nación.' WHERE nombre = 'Salomón Ibarra Mayorga';

-- ============================================
-- VOLCANES
-- ============================================

UPDATE Volcanes SET descripcion = 'El Cerro Negro es el volcán más joven de Centroamérica, habiendo emergido apenas en 1850 de la nada en medio de los campos agrícolas de León. Con sus 728 metros de altura y sus laderas completamente cubiertas de arena volcánica negra, ofrece uno de los paisajes más dramáticos y únicos de Nicaragua. Desde su nacimiento ha tenido más de 20 erupciones registradas, la más reciente en 1999.

Su fama mundial se debe principalmente al sandboard o "volcán boarding", una actividad de aventura que consiste en deslizarse a gran velocidad por sus pendientes de arena negra en una tabla especial. Turistas de todo el mundo viajan a León específicamente para vivir esta experiencia única, convirtiendo al Cerro Negro en uno de los destinos de turismo de aventura más originales del mundo.

La ascensión al cráter, que toma aproximadamente una hora desde la base, ofrece vistas impresionantes de la cordillera de Los Marrabios y del Pacífico nicaragüense en días despejados. El interior del cráter, con sus fumarolas activas y sus colores azufrados, es un recordatorio constante de que este volcán sigue vivo y activo bajo nuestros pies.' WHERE nombre = 'Cerro Negro';

UPDATE Volcanes SET descripcion = 'El Volcán Telica, con sus 1,061 metros de altura, es uno de los volcanes más activos de Nicaragua y de toda Centroamérica. Su cráter principal, de aproximadamente 700 metros de diámetro, emite de forma constante fumarolas de vapor y gases sulfurosos que son visibles desde varios kilómetros de distancia. Su actividad continua lo convierte en uno de los volcanes más monitoreados por el Instituto Nicaragüense de Estudios Territoriales.

La ascensión al Telica es una de las más populares entre los turistas que visitan León, ya que el sendero ofrece una experiencia de trekking de dificultad moderada con vistas espectaculares durante todo el recorrido. Llegar al borde del cráter al atardecer o al amanecer, cuando los gases y el resplandor del magma se hacen más visibles, es una experiencia que los visitantes describen como una de las más impresionantes de sus vidas.

El entorno del Telica es también de gran valor ecológico, albergando una rica biodiversidad de flora y fauna volcánica. Las comunidades rurales que viven en sus faldas han desarrollado una cultura de convivencia con el volcán que incluye rituales, leyendas y una profunda relación espiritual con este gigante de fuego que ha sido su vecino por generaciones.' WHERE nombre = 'Volcán Telica';

UPDATE Volcanes SET descripcion = 'El Volcán Santa Clara, conocido también como San Cristóbal por su cercanía a este gigante volcánico, se eleva a 850 metros sobre el nivel del mar en la cordillera de Los Marrabios. Su cráter relativamente accesible y sus laderas cubiertas de vegetación lo convierten en uno de los destinos de senderismo más atractivos del departamento de León para quienes buscan una experiencia volcánica menos intensa que la del Telica o el Cerro Negro.

Desde su cumbre, en días despejados, es posible observar simultáneamente varios volcanes de la cadena de Los Marrabios, incluyendo al imponente San Cristóbal, el volcán más alto de Nicaragua con sus 1,745 metros. Esta perspectiva única de la cadena volcánica nicaragüense hace del Santa Clara un mirador natural privilegiado que pocos conocen.

El volcán y sus alrededores forman parte de un ecosistema volcánico de gran diversidad biológica. Sus bosques de transición albergan aves, reptiles y mamíferos que han adaptado su vida a las condiciones particulares del entorno volcánico. Las comunidades locales ofrecen guías para la ascensión y han desarrollado pequeñas iniciativas de turismo comunitario que permiten a los visitantes conocer también la cultura y la gastronomía de la zona.' WHERE nombre = 'Volcán Santa Clara';

UPDATE Volcanes SET descripcion = 'El Volcán El Hoyo forma parte del complejo volcánico Las Pilas-El Hoyo, uno de los sistemas volcánicos más complejos de Nicaragua. Su nombre hace referencia a su característica más notable: un profundo cráter de paredes casi verticales que parece un inmenso agujero en la tierra. Con 1,088 metros de altura, es uno de los volcanes más imponentes de la cordillera de Los Marrabios.

El sistema volcánico del que forma parte incluye varios cráteres activos e inactivos que crean un paisaje lunar de gran impacto visual. Las fumarolas que emanan de sus cráteres secundarios y la constante actividad geotérmica de la zona hacen de este volcán un laboratorio natural de gran interés científico. Su última erupción registrada ocurrió en 1954, aunque mantiene actividad fumarólica continua.

La ruta de ascensión al El Hoyo atraviesa diferentes ecosistemas, desde bosques tropicales secos hasta vegetación volcánica de alta montaña, ofreciendo una experiencia de biodiversidad extraordinaria. El sendero, de dificultad moderada-alta, culmina con una vista al interior del cráter que deja sin aliento a quienes lo alcanzan. Es considerado uno de los volcanes más impresionantes para escalar en toda Nicaragua.' WHERE nombre = 'Volcán El Hoyo';

UPDATE Volcanes SET descripcion = 'El Volcán Rota es uno de los menos conocidos y visitados de la cordillera de Los Marrabios, lo que paradójicamente lo convierte en un destino especial para los viajeros que buscan experiencias fuera de los circuitos turísticos convencionales. Con 832 metros de altura, su nombre proviene de su cráter abierto o "roto", una caldera de origen explosivo que da al volcán su característica silueta.

A diferencia de sus vecinos más famosos, el Rota no presenta actividad volcánica significativa en la actualidad, lo que permite una exploración más tranquila de su cráter y sus alrededores. Sus laderas están cubiertas de una vegetación exuberante que contrasta con la aridez de otros volcanes de la cadena, creando un ambiente casi selvático que alberga una rica fauna de aves e insectos.

Las vistas desde la cima del Rota son de las más panorámicas de toda la cordillera, permitiendo observar en un solo golpe de vista los volcanes Telica, Santa Clara, El Hoyo y San Cristóbal. La ausencia de infraestructura turística y la tranquilidad del lugar hacen de la ascensión al Rota una aventura auténtica para quienes prefieren descubrir los tesoros menos hollados del patrimonio natural de León.' WHERE nombre = 'Volcán Rota';

UPDATE Volcanes SET descripcion = 'El Volcán Momotombo es uno de los símbolos más reconocibles de Nicaragua, con su perfecta forma cónica de 1,297 metros que se eleva majestuosamente a orillas del lago Xolotlán (Managua). Perteneciente al departamento de León, específicamente al municipio de La Paz Centro, este volcán activo ha sido testigo y protagonista de algunos de los momentos más importantes de la historia nicaragüense.

Su erupción más famosa y devastadora ocurrió en 1610, cuando expulsó tal cantidad de material volcánico que obligó al abandono y traslado completo de la ciudad original de León, fundada en 1524 a sus pies. Esta catástrofe dio origen a la León actual, ubicada a 30 kilómetros al noroeste. Las ruinas de aquella primera ciudad, hoy conocidas como León Viejo, fueron declaradas Patrimonio de la Humanidad por la UNESCO en el año 2000.

El Momotombo ha inspirado a poetas, pintores y músicos a lo largo de los siglos. El propio Rubén Darío le dedicó uno de sus poemas más célebres, llamándolo "Momotombo, ¡coloso de la selva!". Hoy el volcán alberga una planta geotérmica que aprovecha su energía interna para generar electricidad, siendo un ejemplo de cómo Nicaragua aprovecha su riqueza volcánica de forma sostenible.' WHERE nombre = 'Volcán Momotombo';
SET SQL_SAFE_UPDATES = 1;

USE Patrimonio_leondb;
SELECT nombre, LENGTH(descripcion) as largo FROM Monumentos ORDER BY largo ASC;

USE Patrimonio_leondb;
SET SQL_SAFE_UPDATES = 0;

UPDATE Monumentos SET descripcion = 'La Iglesia San Juan de Dios es uno de los templos coloniales más hermosos y mejor conservados del centro histórico de León. Construida en el siglo XVIII por la orden hospitalaria de San Juan de Dios, su fachada de estilo barroco nicaragüense destaca por su elegante sencillez y sus proporciones armoniosas que la convierten en una joya de la arquitectura religiosa colonial.

El interior del templo alberga retablos y pinturas de gran valor artístico heredados de la época colonial. La iglesia ha sido escenario de importantes celebraciones religiosas y culturales a lo largo de siglos, siendo testigo de bodas, bautizos y eventos que han marcado la historia de las familias leonesas generación tras generación.

La iglesia forma parte del conjunto de templos coloniales que hacen de León una ciudad única en Centroamérica. Su ubicación en el centro histórico la convierte en punto de paso obligado para quienes recorren las calles empedradas de la ciudad, ofreciendo un remanso de paz y espiritualidad en medio del bullicio urbano.' WHERE nombre = 'Iglesia San Juan de Dios';

UPDATE Monumentos SET descripcion = 'La Iglesia San Francisco es uno de los templos más antiguos de León, con una historia que se remonta al siglo XVII. Construida por la orden franciscana, su fachada barroca y el convento adjunto representan uno de los conjuntos arquitectónicos religiosos más completos y mejor conservados de Nicaragua. La iglesia fue durante siglos un importante centro de evangelización y educación en la región.

Su interior conserva obras de arte colonial de gran valor, incluyendo retablos dorados, esculturas religiosas y pinturas que narran pasajes bíblicos con el estilo característico del arte mestizo nicaragüense. El convento adjunto, aunque parcialmente en ruinas, ofrece una imagen evocadora de la vida monástica colonial en América Central.

La Iglesia San Francisco es también conocida por su activa comunidad parroquial y por ser sede de la festividad de San Francisco de Asís cada octubre, cuando el barrio se llena de música, flores y procesiones que mantienen viva una tradición de más de cuatro siglos.' WHERE nombre = 'Iglesia San Francisco';

UPDATE Monumentos SET descripcion = 'La Iglesia La Recolección, construida en el siglo XVIII, es considerada uno de los más bellos ejemplos del barroco mexicano en Nicaragua. Su imponente fachada, tallada en piedra cantera con una riqueza decorativa extraordinaria, es única en todo el país y representa la máxima expresión del arte religioso colonial en León.

A diferencia de otras iglesias de la ciudad, La Recolección fue construida por la orden de los recoletos con un nivel de ornamentación que refleja la prosperidad de León en el siglo XVIII. Sus columnas salomónicas, relieves florales y figuras de santos labrados en piedra conforman un libro de piedra que narra la fe y el arte de una época irrepetible.

Hoy el templo funciona también como centro cultural, albergando exposiciones, conciertos de música clásica y eventos académicos que complementan su rol religioso. Esta combinación de patrimonio histórico y vida cultural activa hace de La Recolección uno de los espacios más dinámicos y visitados del centro histórico de León.' WHERE nombre = 'Iglesia La Recolección';

UPDATE Monumentos SET descripcion = 'La Iglesia El Sutiaba es el templo más antiguo de León y uno de los más antiguos de Nicaragua, con una historia que se remonta al año 1524. Construida sobre un antiguo cementerio indígena del pueblo Sutiaba, su existencia es un símbolo de la fusión entre las culturas indígena y española que dio origen a la identidad nicaragüense.

El templo original fue erigido por misioneros franciscanos sobre un sitio sagrado para el pueblo Sutiaba, siguiendo la práctica colonial de construir iglesias sobre lugares de culto precolombino. A lo largo de los siglos fue reconstruida y ampliada, conservando sin embargo elementos que reflejan la influencia indígena en su decoración y en las tradiciones religiosas del barrio.

El barrio Sutiaba, donde se ubica la iglesia, mantiene viva la identidad del pueblo indígena que habitó estas tierras antes de la llegada española. Las festividades religiosas que se celebran en torno al templo combinan elementos del catolicismo con tradiciones ancestrales sutiabas, creando una expresión cultural única que distingue a León de cualquier otra ciudad de Nicaragua.' WHERE nombre = 'Iglesia El Sutiaba';

UPDATE Monumentos SET descripcion = 'La Iglesia San Felipe, construida en el siglo XVIII, es el corazón espiritual del tradicional barrio San Felipe, uno de los barrios más antiguos y populares de León. Su arquitectura colonial sencilla pero elegante refleja el carácter humilde y trabajador de la comunidad que la rodea, siendo un símbolo de la identidad barrial leonesa.

El templo ha sido testigo de siglos de historia popular, desde las luchas de independencia hasta la revolución de 1979, sirviendo siempre como punto de reunión y refugio espiritual para los habitantes del barrio. Sus festividades patronales, celebradas en honor a San Felipe Apóstol, son de las más coloridas y participativas de toda la ciudad.

La iglesia y su parque forman un conjunto urbano de gran valor patrimonial donde los leoneses se reúnen diariamente para socializar, descansar y mantener vivos los lazos comunitarios que caracterizan a la sociedad leonesa. Este espacio público es un ejemplo vivo de cómo el patrimonio religioso y el tejido social se entrelazan en la cultura nicaragüense.' WHERE nombre = 'Iglesia San Felipe';

UPDATE Monumentos SET descripcion = 'La Iglesia San Sebastián, construida en el siglo XVIII, es una de las iglesias coloniales más queridas por los leoneses por ser sede de las festividades patronales de San Sebastián, celebradas cada enero con gran fervor popular. Estas fiestas, que duran varios días, incluyen procesiones, música de chicheros, pólvora y bailes tradicionales que llenan de vida las calles del barrio.

La fachada del templo, de estilo colonial nicaragüense, ha sido restaurada cuidadosamente preservando su carácter histórico. Su campanario, visible desde varios puntos del barrio, ha marcado el ritmo de la vida cotidiana de generaciones de leoneses con sus toques de misa, de difuntos y de celebración.

San Sebastián es también conocida por albergar imágenes religiosas de gran devoción popular, entre ellas una imagen del santo patrón que según la tradición local ha protegido al barrio de enfermedades y calamidades a lo largo de los siglos. La fe de los feligreses en estas imágenes es un testimonio vivo de la espiritualidad profunda que caracteriza a la cultura leonesa.' WHERE nombre = 'Iglesia San Sebastián';

UPDATE Monumentos SET descripcion = 'El Palacio Municipal de León, construido en el siglo XIX, es la sede del gobierno local y uno de los edificios más representativos de la arquitectura neoclásica de Nicaragua. Su imponente fachada blanca con columnas y arcos domina el lado norte del parque central de León, frente a la majestuosa catedral, conformando el conjunto cívico-religioso más importante de la ciudad.

El edificio ha sido testigo de momentos cruciales de la historia de León y Nicaragua, desde las sesiones del cabildo colonial hasta las asambleas revolucionarias del siglo XX. Sus salones albergan pinturas murales y retratos históricos que narran la historia política y cultural de la ciudad, convirtiéndolo en un museo vivo de la memoria leonesa.

El parque central que se extiende frente al palacio es el corazón social de León, donde confluyen estudiantes, familias, turistas y vendedores en una animada vida urbana que no se detiene nunca. Las famosas "chicas" o gigantona y el enano cabezón, figuras del folclore leonés, tienen aquí su escenario natural durante las festividades de La Purísima y otras celebraciones populares.' WHERE nombre = 'Palacio Municipal';

UPDATE Monumentos SET descripcion = 'La Estación de Ferrocarril de León es un edificio de gran valor patrimonial que data del siglo XIX, época en que el ferrocarril fue el motor del desarrollo económico de Nicaragua. Su arquitectura de hierro y madera, característica de las estaciones ferroviarias de la época victoriana, contrasta elegantemente con la arquitectura colonial que predomina en el centro histórico de la ciudad.

El ferrocarril conectó a León con Managua y con el puerto de Corinto, facilitando el transporte de café, algodón y caña de azúcar que sustentaron la economía nicaragüense durante décadas. La estación fue el punto de llegada y partida de miles de leoneses que viajaban por trabajo, estudios o aventura, y su sala de espera fue escenario de despedidas y reencuentros que forman parte de la memoria sentimental de la ciudad.

Aunque el servicio ferroviario dejó de operar en Nicaragua en los años 90, el edificio de la estación se mantiene en pie como testimonio de una era de progreso y modernización. Su restauración y puesta en valor como patrimonio histórico es una deuda que la ciudad tiene con su propia historia y con las generaciones futuras.' WHERE nombre = 'Estación de Ferrocarril';

UPDATE Monumentos SET descripcion = 'El Colegio San Ramón es uno de los edificios históricos más importantes del patrimonio educativo de León y Nicaragua. Fundado durante la época colonial, fue sede de la primera Universidad de León y cuna de la educación superior en Nicaragua, formando a generaciones de abogados, médicos y políticos que marcaron el rumbo del país durante los siglos XIX y XX.

Su arquitectura colonial con amplios corredores, patios internos y aulas de techos altos refleja la concepción humanista de la educación que prevalecía en la época. Las paredes del colegio han sido testigos de debates académicos, reuniones políticas y tertulias culturales que convirtieron a León en el epicentro intelectual de Nicaragua durante más de dos siglos.

Hoy el edificio está declarado patrimonio histórico nacional y continúa cumpliendo funciones educativas, siendo un símbolo vivo de la tradición universitaria leonesa que se remonta a 1813. Visitar el Colegio San Ramón es hacer un viaje al corazón de la historia educativa y cultural de Nicaragua.' WHERE nombre = 'Colegio San Ramón';

UPDATE Monumentos SET descripcion = 'La Facultad de Derecho de la UNAN-León ocupa uno de los edificios patrimoniales más importantes del campus universitario, con una arquitectura colonial que ha sido cuidadosamente preservada a lo largo de los siglos. Sus aulas y corredores han formado a generaciones de juristas nicaragüenses que han contribuido al desarrollo del estado de derecho en el país.

El edificio es un ejemplo destacado de la arquitectura académica colonial en Centroamérica, con sus arcadas, patios interiores y la disposición espacial característica de los claustros universitarios europeos adaptados al trópico. Su declaratoria como patrimonio histórico reconoce no solo su valor arquitectónico sino también su papel en la formación de la identidad intelectual de Nicaragua.

La Facultad de Derecho mantiene viva la tradición de la UNAN-León como la universidad más antigua de Nicaragua, donde el pensamiento crítico y la formación humanista han sido los pilares de una educación que trasciende las aulas para transformar la sociedad. Sus egresados han ocupado los más altos cargos en el poder judicial, legislativo y ejecutivo del país.' WHERE nombre = 'Facultad de Derecho UNAN';

UPDATE Monumentos SET descripcion = 'El Edificio de Ciencias Sociales de la UNAN-León es uno de los espacios académicos más emblemáticos del campus histórico de la universidad. Su arquitectura patrimonial, con elementos coloniales bien conservados, forma parte del conjunto de edificios históricos que hacen de la UNAN-León un campus universitario único en Centroamérica por su valor patrimonial y académico.

En sus aulas se han formado historiadores, sociólogos, antropólogos y comunicadores que han contribuido al estudio y la difusión del patrimonio cultural de Nicaragua. Los proyectos de investigación desarrollados en esta facultad han sido fundamentales para documentar y preservar la historia, las tradiciones y la identidad del pueblo nicaragüense.

El edificio es también sede de importantes actividades culturales, seminarios internacionales y proyectos comunitarios que vinculan a la universidad con la sociedad leonesa. Esta relación dinámica entre academia y comunidad es uno de los sellos distintivos de la UNAN-León, que desde su fundación en 1813 ha entendido la educación como un servicio a la sociedad y no como un privilegio de pocos.' WHERE nombre = 'Edificio de Ciencias Sociales UNAN';

UPDATE Monumentos SET descripcion = 'El Hotel La Recolección ocupa el antiguo convento de La Recolección, un edificio del siglo XVIII de extraordinario valor histórico y arquitectónico. La reconversión de este convento en hotel boutique es uno de los proyectos de rehabilitación del patrimonio más exitosos de Nicaragua, ganando reconocimientos internacionales por la forma en que combina la preservación histórica con el confort moderno.

Sus habitaciones, distribuidas alrededor del claustro colonial original, ofrecen una experiencia de hospedaje única en la que los huéspedes pueden dormir rodeados de historia. Las paredes de adobe, los techos de teja y los corredores empedrados coexisten con todas las comodidades modernas, creando un ambiente de lujo sereno y auténtico que no se puede encontrar en ningún hotel convencional.

El hotel es también un referente de turismo sostenible y responsable, apoyando a artesanos locales, ofreciendo gastronomía nicaragüense y organizando tours culturales por el centro histórico de León. Hospedarse en La Recolección es vivir León desde adentro, desde sus piedras y su historia, en un espacio que respira siglos de cultura y espiritualidad.' WHERE nombre = 'Hotel La Recolección';

SET SQL_SAFE_UPDATES = 1;


USE Patrimonio_leondb;
INSERT INTO Volcanes (nombre, descripcion, altura, actividad, imagen) VALUES 
('Volcán Momotombo', 'El Volcán Momotombo es uno de los símbolos más reconocibles de Nicaragua, con su perfecta forma cónica de 1,297 metros que se eleva majestuosamente a orillas del lago Xolotlán. Perteneciente al departamento de León, su erupción más famosa ocurrió en 1610, cuando obligó al abandono y traslado completo de la ciudad original de León. Las ruinas de aquella primera ciudad, hoy conocidas como León Viejo, fueron declaradas Patrimonio de la Humanidad por la UNESCO en el año 2000.

El Momotombo ha inspirado a poetas, pintores y músicos a lo largo de los siglos. El propio Rubén Darío le dedicó uno de sus poemas más célebres. Hoy el volcán alberga una planta geotérmica que aprovecha su energía interna para generar electricidad, siendo un ejemplo de cómo Nicaragua aprovecha su riqueza volcánica de forma sostenible.', 1297, 'Activo', 'Momotombo.jpg');

USE Patrimonio_leondb;
INSERT INTO Volcanes (nombre, descripcion, altura, actividad, imagen) 
VALUES ('Volcán Momotombo', 'El Volcán Momotombo es uno de los símbolos más reconocibles de Nicaragua...', 1297, 'Activo', 'Volcan Momotombo.jpg');
Delete from Volcanes where id_volcan= 6;
Select * from Volcanes;

USE Patrimonio_leondb;
SET SQL_SAFE_UPDATES = 0;

INSERT INTO Personajes (nombre, descripcion, nacimiento, muerte, imagen) VALUES
('Luis H. Debayle', 'Luis Henri Debayle Pallais nació en 1865 en León, Nicaragua, y fue uno de los médicos más importantes de la historia del país. Fundador de la medicina moderna nicaragüense, estableció el primer hospital moderno de León y fue pionero en la introducción de técnicas quirúrgicas avanzadas en Centroamérica. Su labor médica transformó el sistema de salud de Nicaragua durante décadas.

Debayle fue también figura central de la vida social y política leonesa. Su amistad con Rubén Darío fue profunda y duradera — el poeta le dedicó varios poemas y su hija Stella inspiró algunos de sus versos más célebres. Esta conexión entre medicina, poesía y aristocracia leonesa hace de Debayle una figura singular en la historia cultural de Nicaragua.

Falleció en 1938, dejando un legado médico y humanístico que sigue siendo reconocido en Nicaragua. El hospital más importante de León lleva su nombre en su honor, siendo un testimonio vivo de su contribución a la salud y el bienestar del pueblo leonés.', 1865, 1938, 'Luis H. Debayle.jpg'),

('Salomón de la Selva', 'Salomón de la Selva Ramírez nació el 20 de agosto de 1893 en León, Nicaragua, y es considerado uno de los tres grandes poetas nicaragüenses junto a Rubén Darío y Alfonso Cortés. Su vida fue tan extraordinaria como su poesía: emigró a Estados Unidos siendo adolescente, dominó el inglés hasta escribir poesía en ese idioma, y llegó a ser amigo personal de importantes figuras literarias norteamericanas.

Durante la Primera Guerra Mundial se alistó voluntariamente en el ejército británico, experiencia que marcó profundamente su obra y dio origen a su poemario más famoso, "El soldado desconocido" (1922), considerado una de las obras cumbres de la poesía hispanoamericana del siglo XX. Este libro, escrito desde la perspectiva de un soldado latinoamericano en las trincheras europeas, es un testimonio único sobre la guerra y la identidad.

De la Selva vivió en México, donde trabajó como diplomático y continuó su prolífica carrera literaria hasta su muerte el 5 de febrero de 1959 en París. Su obra, que abarca poesía en español e inglés, lo convierte en una figura única en la literatura latinoamericana del siglo XX.', 1893, 1959, 'Salomón de la Selva.jpg'),

('Azarías H. Pallais', 'Azarías H. Pallais nació el 11 de diciembre de 1884 en León, Nicaragua, y fue poeta, sacerdote católico y figura fundamental de la literatura nicaragüense del siglo XX. Considerado el poeta más cristiano de Nicaragua, su obra combina una profunda espiritualidad con una sensibilidad poética de gran originalidad, alejada del modernismo de Darío y más cercana a la tradición simbolista europea.

Pallais estudió teología en Europa, donde se empapó de la cultura literaria francesa y belga. De regreso a Nicaragua ejerció como sacerdote en León mientras continuaba su vocación poética, publicando obras como "Espumas y Estrellas" y "A una nariz parada", que le valieron reconocimiento como uno de los poetas más originales de su generación. Su humor, su ironía y su fe conviven en una poesía que no tiene equivalente en la literatura nicaragüense.

Falleció el 15 de noviembre de 1954 en León, siendo honrado como uno de los grandes poetas de la ciudad. En el Parque Rubén Darío de León existe un busto en su honor junto a otros poetas leoneses, testimonio del lugar que ocupa en el panteón literario de Nicaragua.', 1884, 1954, 'Azarías H. Pallais.jpg');

SET SQL_SAFE_UPDATES = 1;


INSERT INTO Monumentos (nombre, descripcion, ubicacion, categoria, imagen) VALUES
('Mausoleo de los Héroes y Mártires', 'Este solemne mausoleo, ubicado frente al costado norte de la Catedral de León, guarda los restos de figuras emblemáticas de la historia de Nicaragua. Entre los héroes y mártires que allí descansan se encuentran el General Augusto C. Sandino, Carlos Fonseca Amador, Tomás Borge y otros combatientes caídos en la lucha contra la dictadura somocista. Su construcción representa un acto de reparación histórica y memoria viva para el pueblo nicaragüense. El monumento, de diseño sobrio y austero, contrasta con la majestuosidad barroca de la Catedral, creando un diálogo simbólico entre el poder colonial religioso y la lucha popular del siglo XX. En su interior, placas de bronce y nichos con los nombres de los caídos invitan al recogimiento. Una llama eterna simboliza que la lucha por la soberanía no se extingue. Además de su valor histórico, el mausoleo es un punto de referencia cultural en el Centro Histórico de León, donde escuelas y turistas visitan para conocer la resistencia popular nicaragüense.', 'Frente al costado norte de la Catedral de León', 'patrimonio', 'Mausoleo de los Héroes y Mártires.jpg');

ALTER TABLE Comentarios ADD COLUMN id_comentario_padre INT NULL;
ALTER TABLE Comentarios ADD FOREIGN KEY (id_comentario_padre) REFERENCES Comentarios(id_comentario) ON DELETE CASCADE;

SELECT nombre, imagen FROM Monumentos LIMIT 5;

SELECT nombre, imagenes FROM Municipios LIMIT 3;  



-- Pruebas 
Select nombre_usuarios from Usuarios;
Select nombre from Municipios;