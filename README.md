# La Biblioteca

Gramática española y didáctica para docentes en formación y en ejercicio del onderbouw (vmbo-t, havo y vwo). 123 fichas de A1 a B2, español/neerlandés, práctica formativa y propuestas de aula. Roboto está incluida; no se carga desde Google Fonts. Colores: Fontys morado `#663366`, magenta `#E5007D` y azul `#0076E0`.

**Gramática Lab / La biblio pasa a llamarse La Biblioteca.**

## Usar la biblioteca

Abre `index.html` desde GitHub Pages o un servidor estático conservando las carpetas. Para usarla sin servidor, abre `La-Biblioteca.html`, que contiene estilos, datos, código, fuente y cinco audios. El archivo descargado no necesita cuenta de ChatGPT. Se incluye un ZIP comprobado en `downloads/La-Biblioteca.zip`.

El índice A–D enlaza fonética/ortografía, morfología, verbos y sintaxis. Cada ficha conserva el recorrido explicación, puente ES/NL, muestra real, Docentenbril, fuentes y práctica. La práctica rápida de una ficha no crea por sí sola un registro: para conservar un intento, usa **Practicar esta ficha y guardar un intento**.

## Marco curricular

El MCER describe capacidades comunicativas; no prescribe una lista única de gramática española. El PCIC concreta inventarios por niveles y permite situar el uso trabajado. La Kennisbasis 2026 de la documentación facilitada orienta el análisis y la didáctica del futuro profesor. No se atribuye a estos documentos una certificación de la plataforma.

Consulta `content/crosswalk.csv` para el cruce de todas las fichas: código, nivel de entrada, categoría, referencia PCIC y Kennisbasis. Cada ficha muestra alcance y trazabilidad. El nivel es el del uso lingüístico de entrada, mientras que el análisis profesional pertenece a HBO. Algunos temas reaparecen en niveles superiores con más usos y restricciones; una etiqueta A1 no declara que todo el fenómeno termine en A1.

Kennisbasis: 3.1.1 sonidos/articulación, 3.1.2 estructuras, 3.2.2 comparación lingüística y 3.4 didáctica del conocimiento lingüístico, pp. 47–49; 1.3 objetivos y progresión, p. 42. Los dominios de competencia lingüística del docente apuntan a B2+, pp. 44–45: este recurso A1–B2 no sustituye toda la formación. Las fuentes institucionales subidas no se redistribuyen en este repositorio.

Las propuestas se adaptan al nivel real de los adolescentes; no se recomienda impartir toda la sintaxis B2 a principiantes. En VMBO-t se ofrecen modelos y elecciones; la ampliación pide justificar un cambio de contexto en vez de añadir solo etiquetas gramaticales.

## Editar textos, enlaces y ejercicios

1. Abre **Panel de editores**. Elige una ficha y la pestaña pertinente. Escribe en los campos ES y NL; no necesitas HTML.
2. Añade o quita ejemplos, propuestas y ejercicios. Escribe cada respuesta aceptada como una alternativa. Revisa la explicación de la respuesta y la pista.
3. En **Materiales y enlaces**, pega el enlace HTTPS del vídeo, lectura o archivo previamente alojado en Canvas o un servicio autorizado. Las fuentes compartidas se editan aparte porque varias fichas pueden usarlas.
4. Usa **Revisar ficha**. Los borradores pertenecen al navegador; puedes compartir una copia JSON con otro docente. El formato editorial nuevo usa una clave distinta y conserva intactos los borradores de la versión anterior. El historial de intentos usa otro almacenamiento.
5. Para GitHub Pages: **Preparar publicación → Descargar index.html** y sustituye ese archivo en el repositorio. El HTML exportado es autocontenido. Para publicación directa mediante el servidor opcional, entra al servidor en **Panel del profesor** y pulsa **Publicar copia editorial en el servidor**.

El panel estático permite preparar una copia local. No simula una protección mediante contraseña en JavaScript. La publicación en GitHub requiere permisos del repositorio. La publicación en el servidor requiere una sesión docente autenticada.

## Práctica, intentos y PIN

Cada intento usa un código de estudiante estable y un identificador único. El PIN agrupa la clase y se guarda dentro del registro del intento, nunca como clave que sustituya al estudiante. El alumno puede usar el mismo código con nuevos PIN. El PIN de inicio no se conserva: queda vacío al recargar o actualizar; los PIN históricos se mantienen.

Al finalizar se guarda fecha/hora UTC, zona horaria, versión, código, PIN, preguntas, respuesta dada, respuesta correcta, explicación y pistas. La vista usa Europe/Amsterdam y muestra también el registro UTC. No hay operación de borrado ni sobrescritura de intentos en la aplicación. Importar una copia añade registros; los conflictos con un mismo ID y otro contenido se rechazan.

IndexedDB es el almacenamiento local principal, con una segunda copia JSON en localStorage. El nombre de la base y su esquema son independientes de la versión del contenido. Las actualizaciones no ejecutan `deleteDatabase`, `clear` ni `localStorage.clear`. Descargar copias sigue siendo necesario: borrar los datos del navegador, perder el dispositivo o cambiar de origen puede dejar el historial local inaccesible. No se promete permanencia absoluta del almacenamiento del navegador.

El panel del profesor muestra los registros de ese navegador. Para ver los de otros dispositivos debe activarse la API. El código y el PIN no prueban identidad personal; las actividades son formativas y no son un examen oficial, un sistema de vigilancia ni una certificación MCER. El cliente tiene acceso a las soluciones. Para una evaluación de alto impacto se necesita identidad institucional y corrección controlada por servidor.

## Audios y fonética

Cinco grabaciones humanas con metadatos de tres locutores: Arca (Lima), 1ucian0 (Argentina; categoría rioplatense en Commons) y Haylli (español europeo). El lugar pronunciado no determina el acento del locutor. Se conservan autor, licencia, procedencia y URL. El audio está incluido en el catálogo para evitar errores de red al cargarlo.

Son nombres propios, útiles para una introducción A1; no constituyen un banco de escucha B1/B2. Se han comprobado archivo Ogg y duración mediante ffprobe, no la calidad auditiva ni los rasgos dialectales mediante escucha humana. Las tareas no exigen identificar un acento por una palabra aislada.

El reproductor espera los metadatos antes de situar el inicio. La configuración inicial reproduce el archivo completo; no añade lecturas de instrucciones ni presentaciones de locutores. Para material nuevo, el profesor fija inicio/final y margen previo, y lo prueba antes de publicar. El recorte se realiza en reproducción, sin modificar el archivo original. Los recortes para una pregunta deben coincidir con su transcripción y sus pistas.

Velocidades iniciales: A1 0,80×, A2 0,85×, B1 1,00× y B2 1,00×. El control manual está disponible también en una prueba. Se permiten dos inicios de reproducción por pregunta e intento, con reserva atómica persistente; un fallo de carga libera la reserva. Detener una escucha ya iniciada la consume. Cambiar velocidad o recargar no reinicia el contador del mismo intento. Iniciar expresamente otro intento crea otro registro. Los originales públicos y las herramientas del navegador no pueden bloquearse desde una página estática.

## Multimedia interna

Las muestras reales y sus traducciones se consultan dentro de la ficha. Las fuentes y materiales abren un diálogo interno. YouTube se transforma en un iframe `youtube-nocookie`; imágenes y PDF se cargan en el diálogo. El contenido externo se solicita al pulsar **Cargar original aquí**.

Un editor externo puede bloquear el iframe mediante CSP o X-Frame-Options. La aplicación no intenta saltarse esa restricción ni copiar publicaciones completas: mantiene el fragmento seleccionado, la traducción, el contexto y la referencia. Una URL accesible no garantiza permiso de incrustación. Las licencias de las cinco grabaciones y las citas breves se conservan; los ejemplos creados están etiquetados como tales.

## Activar el servidor compartido

El código está en `server/server.mjs`: Node 24 y SQLite, sin paquetes de producción externos. **No está activado por subirlo a GitHub Pages**. Requiere un alojamiento de Fontys u otro servidor con almacenamiento persistente y HTTPS. No se dispone en esta entrega de acceso administrativo a ese alojamiento.

1. Configura `BIBLIO_SECRET` con al menos 32 caracteres aleatorios, `BIBLIO_TEACHER_PASSWORD` con al menos 12, `BIBLIO_DATA_DIR` en un directorio persistente fuera de la publicación web y `BIBLIO_ALLOWED_ORIGIN` con el origen exacto del frontend.
2. Ejecuta `node server/server.mjs` detrás de HTTPS. Opcionalmente utiliza `server/compose.yaml`; el volumen `biblioteca-data` debe conservarse entre despliegues. Nunca uses una orden que elimine ese volumen para actualizar la app.
3. Comprueba `GET /health`. En **Panel del profesor** introduce la API HTTPS y guarda la conexión. Entra con la contraseña del servidor y activa un PIN nuevo. La sesión docente dura 30 minutos; el PIN de clase 24 horas.
4. Para que el alumnado tenga la conexión sin configurarla en cada navegador, escribe la API pública en `content/config.js` o guarda la conexión y exporta el HTML desde el editor. La configuración exportada contiene únicamente la URL pública, no contraseñas ni tokens.
5. Con el servidor conectado, los intentos con PIN válido se guardan primero en el navegador y se envían al servidor. Si falla la sincronización, se informa y se ofrece reintentar; la copia local se conserva. La sincronización requiere conexión y una sesión válida.
6. Conserva copias del directorio persistente y exportaciones de historial. Al actualizar, sustituye código y contenido, no el directorio de datos. La API conserva intentos entre reinicios y entre versiones de contenido.

La API autentica al profesor; limita solicitudes de acceso y usa sesiones firmadas. Los estudiantes acceden con código y PIN activo. Un alumno autenticado con ese esquema puede consultar los registros de su código; conocer el código ajeno y un PIN válido permitiría suplantarlo. Para identidad fuerte, sustituye esta entrada por SSO de Fontys antes de usar datos identificables o evaluación acreditativa.

## Arquitectura y desarrollo

`content/catalog.json` es el catálogo editable documentado; `catalog.js` es su versión ejecutable sin fetch inicial. `content/crosswalk.csv` permite revisar la nivelación. El panel exporta el catálogo actualizado dentro de un HTML autocontenido.

`modules/library.js` gestiona navegación y fichas, `editor.js` la copia editorial, `didactic-view.js` las seis secciones, `curriculum.js` la taxonomía, `assessment.js` los intentos, `history.js` la persistencia, `audio.js` el reproductor, `media.js` los diálogos y `platform.js` las pantallas de evaluación/docencia. `bootstrap.js` valida datos y `styles/` mantiene el diseño.

La API separa `/teacher/session`, `/classes`, `/student/session`, `/attempts`, `/content` y `/content/latest`. SQLite mantiene intentos en una tabla protegida por triggers contra UPDATE/DELETE y contenidos en versiones separadas. Las credenciales viven en variables de entorno; no en el catálogo, el ZIP, el HTML ni GitHub.

Para comprobar el código, `npm install` y `npm test`. Las dependencias de desarrollo no forman parte del sitio. `python3 build.py` genera `index.html` modular y `La-Biblioteca.html` desde `template.html`, los módulos y `content/catalog.json`. También regenera el cruce CSV. Editar el JSON y ejecutar build no sustituye el contenido por una versión antigua.

## Verificación de esta entrega

Se prueban las 123 fichas en ambos idiomas mediante DOM simulado, la validación del catálogo, el editor y su exportación autocontenida, IndexedDB simulado con concurrencia, dos escuchas y devolución de reservas fallidas, historiales con distintos PIN y API real con SQLite, autenticación, conflictos y reinicio. No se ha realizado QA visual en navegador real, escucha humana ni despliegue del backend en producción. La compilación de GitHub Pages se comprueba por separado.

La Biblioteca — Herramienta educativa sin fines lucrativos creada por Daniel Valle Robles.
