# La Biblioteca

Gramática española y didáctica para docentes en formación y en ejercicio del onderbouw (vmbo-t, havo y vwo). 123 fichas de A1 a B2, español/neerlandés, práctica formativa y propuestas de aula. Roboto está incluida; no se carga desde Google Fonts. Colores: Fontys morado `#663366`, magenta `#E5007D` y azul `#0076E0`.

**Gramática Lab / La biblio pasa a llamarse La Biblioteca.**

## Usar la biblioteca

Abre `index.html` desde GitHub Pages o un servidor estático conservando las carpetas. Para usarla sin servidor, abre `La-Biblioteca.html`, que contiene estilos, datos, código, fuente y once audios. El archivo descargado no necesita cuenta de ChatGPT. Se incluye un ZIP comprobado en `downloads/La-Biblioteca.zip`.

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

Once grabaciones humanas: cinco nombres propios A1 y seis microtareas de escucha A2–B2. Participan cuatro locutores de procedencia documentada. Las nuevas tareas trabajan frecuencia, transporte, causa, atribución y alcance de ejemplos. La etiqueta corresponde a la demanda de la pregunta; no son pruebas integrales ni certificaciones de nivel. Véase `docs/LISTENING-SOURCES.md` para fuentes y licencias de audio/texto.

Se han verificado los metadatos, duraciones y decodificación de los archivos con ffmpeg/ffprobe. No se ha realizado escucha humana ni una validación auditiva de rasgos dialectales. Los audios A1 no piden identificar un acento por una palabra aislada. El docente debe escuchar el material antes de una prueba de clase.

El reproductor espera los metadatos antes de situar el inicio. La configuración inicial reproduce el archivo completo; no añade lecturas de instrucciones ni presentaciones de locutores. Para material nuevo, el profesor fija inicio/final y margen previo, y lo prueba antes de publicar. El recorte se realiza en reproducción, sin modificar el archivo original. Los recortes para una pregunta deben coincidir con su transcripción y sus pistas.

Velocidades iniciales: A1 0,80×, A2 0,85×, B1 1,00× y B2 1,00×. El control manual está disponible también en una prueba. Se permiten dos inicios de reproducción por pregunta e intento, con reserva atómica persistente; un fallo de carga libera la reserva. Detener una escucha ya iniciada la consume. Cambiar velocidad o recargar no reinicia el contador del mismo intento. Iniciar expresamente otro intento crea otro registro. Los originales públicos y las herramientas del navegador no pueden bloquearse desde una página estática.

## Multimedia interna

Las muestras reales y sus traducciones se consultan dentro de la ficha. Las fuentes y materiales abren un diálogo interno. YouTube se transforma en un iframe `youtube-nocookie`; imágenes y PDF se cargan en el diálogo. El contenido externo se solicita al pulsar **Cargar original aquí**.

Un editor externo puede bloquear el iframe mediante CSP o X-Frame-Options. La aplicación no intenta saltarse esa restricción ni copiar publicaciones completas: mantiene el fragmento seleccionado, la traducción, el contexto y la referencia. Una URL accesible no garantiza permiso de incrustación. Las licencias de las grabaciones y las citas breves se conservan; los ejemplos creados están etiquetados como tales.

## Servidor compartido publicado

La conexión pública ya está incluida en `content/config.js`. El alumnado no necesita cuenta de ChatGPT para consultar, practicar ni sincronizar con código y PIN activo.

1. El propietario abre https://gramatica-a2-ele-fontys.daniel-vr.chatgpt.site/gestion y elige una contraseña docente de al menos 12 caracteres. Solo esta configuración inicial requiere su cuenta de propietario.
2. En **Panel del profesor**, entra con esa contraseña y activa un PIN nuevo para el grupo. El PIN dura 24 horas y la sesión 30 minutos.
3. El estudiante usa siempre el mismo código y el PIN activo al iniciar el intento. Sin PIN, la práctica se conserva solo en el navegador. Para recuperar el historial del servidor, introduce código y PIN activo en **Mi historial**; también aparecerán intentos de PIN anteriores.
4. Para editar, prepara los cambios en **Panel de editores** y usa **Publicar copia editorial en el servidor** desde el panel docente. Cada publicación crea una versión y conserva los intentos.

El servicio usa D1 para registros y R2 para versiones de contenido y copias de intentos. El código está en `server/cloud/`; la publicación y secretos se gestionan en el alojamiento. No sustituir secretos ni eliminar bases/objetos al actualizar. Los triggers impiden sobrescribir o borrar intentos por las rutas de la aplicación.

La alternativa autogestionada sigue disponible en `server/server.mjs` (Node 24 + SQLite) y `server/compose.yaml`. Necesita almacenamiento persistente, HTTPS y variables `BIBLIO_SECRET`, `BIBLIO_TEACHER_PASSWORD`, `BIBLIO_DATA_DIR` y `BIBLIO_ALLOWED_ORIGIN`.

El código y el PIN agrupan actividad formativa; no equivalen a identidad institucional comprobada ni a evaluación acreditativa. La aplicación no escribe notas en Canvas.

## Arquitectura y desarrollo

`content/catalog.json` es el catálogo editable documentado; `catalog.js` es su versión ejecutable sin fetch inicial. `content/crosswalk.csv` permite revisar la nivelación. El panel exporta el catálogo actualizado dentro de un HTML autocontenido.

`modules/library.js` gestiona navegación y fichas, `editor.js` la copia editorial, `didactic-view.js` las seis secciones, `curriculum.js` la taxonomía, `assessment.js` los intentos, `history.js` la persistencia, `audio.js` el reproductor, `media.js` los diálogos y `platform.js` las pantallas de evaluación/docencia. `bootstrap.js` valida datos y `styles/` mantiene el diseño.

La API separa `/teacher/session`, `/classes`, `/student/session`, `/attempts`, `/content` y `/content/latest`. SQLite mantiene intentos en una tabla protegida por triggers contra UPDATE/DELETE y contenidos en versiones separadas. Las credenciales viven en variables de entorno; no en el catálogo, el ZIP, el HTML ni GitHub.

Para comprobar el código, `npm install` y `npm test`. Las dependencias de desarrollo no forman parte del sitio. `python3 build.py` genera `index.html` modular y `La-Biblioteca.html` desde `template.html`, los módulos y `content/catalog.json`. También regenera el cruce CSV. Editar el JSON y ejecutar build no sustituye el contenido por una versión antigua.

## Verificación de esta entrega

Se prueban las 123 fichas en ambos idiomas mediante DOM simulado, la validación del catálogo, el editor y su exportación autocontenida, IndexedDB simulado con concurrencia, dos escuchas y devolución de reservas fallidas, historiales con distintos PIN y API real con SQLite, autenticación, conflictos y reinicio. No se ha realizado QA visual en navegador real ni escucha humana. El backend está desplegado en producción; se ha comprobado el acceso anónimo al servicio y la existencia de las tablas migradas. La compilación de GitHub Pages se comprueba por separado.

La Biblioteca — Herramienta educativa sin fines lucrativos creada por Daniel Valle Robles.
