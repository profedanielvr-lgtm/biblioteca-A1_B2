# La biblioteca

La base visual de octubre se documenta en [VISUAL-FOUNDATION.md](docs/VISUAL-FOUNDATION.md). Incluye dos pilotos de teoría, tres vistas previas de vocabulario y un inventario de cobertura pendiente de revisión. `npm run build` funciona con Node, sin Python. `npm run audit:visual` actualiza el inventario.

La ampliación local de octubre de 2026 se documenta en [LEARNING-HUB.md](docs/LEARNING-HUB.md). Esa página prevalece sobre los recuentos y descripciones anteriores para vocabulario, repaso, evidencias y laboratorio. La publicación de esta ampliación está pendiente.

Gramática española y didáctica para docentes en formación y en ejercicio del onderbouw (vmbo-t, havo y vwo). 123 fichas de A1 a B2, español/neerlandés, práctica formativa y propuestas de aula. Roboto está incluida; no se carga desde Google Fonts. Colores: Fontys morado `#663366`, magenta `#E5007D` y azul `#0076E0`.

**Gramática Lab / La biblio pasa a llamarse La Biblioteca.**

## Interfaz y práctica intensiva

Nombre visible: **La biblioteca**. Roboto está incluida localmente. La interfaz usa blanco, azul Fontys `#0076E0`, morado `#663366` y acentos contenidos. El azul de los botones con texto blanco se oscurece mínimamente a `#0075DF` para superar 4,5:1 de contraste. Guía contrastada: https://www.fontys.nl/Content/Overzicht-Kleurcodes-Fontys.htm (16-10-2026).

La navegación principal reúne ruta, práctica intensiva, biblioteca, historial y perfil. Las fichas muestran una sección a la vez; cambiar de sección conserva los campos y despliegues. La teoría completa sigue disponible. Los modelos, esquemas y ejemplos tienen prioridad visual.

En **Práctica intensiva** (`#entrenar`) hay cuatro herramientas:

- Conjugar: 231 formas extraídas de los paradigmas A1/A2 ya revisados; conserva personas, variantes y tildes. Se filtra por nivel, verbo y tiempo/forma. No presenta un paradigma B2 incompleto como si fuera un banco B2.
- Completar: 254 ejercicios A1–B2.
- Asociar: 239 pares ES/NL de los ejemplos de las fichas.
- Ordenar: 237 modelos breves A1–B2. Se reconstruye el modelo; no se afirma que exista un único orden gramatical posible.

Rondas de diez tareas con feedback inmediato, explicación, repetición y repaso de errores. El modo y los filtros se conservan por perfil. Con perfil activo, cada respuesta se añade al historial local. No se marca automáticamente un tema como estudiado ni se sustituye la prueba formativa del bloque.

## Acceso a Redactiepanel y Docentenpanel

Ambos paneles exigen login. La contraseña se valida en la API; no se guarda ni compara en JavaScript público. La sesión dura 30 minutos y vive en memoria. Cerrar sesión o caducar vuelve a mostrar el login y conserva los borradores.

En la publicación compartida, `BIBLIO_PANEL_CREDENTIAL` es un secreto del servidor con un registro PBKDF2, salt y revisión. No se incluye su valor ni la clave en este repositorio, ZIP o HTML. El propietario lo configura desde el alojamiento; la pantalla antigua `/gestion` no puede sustituirlo mientras esté activo. La publicación editorial y la consulta de registros remotos se autorizan también en servidor.

El HTML y las fichas son públicos y descargables. La protección no pretende ocultar ese código ni impedir preparar una copia local; impide usar las pantallas de gestión y modificar los datos compartidos sin una sesión autorizada. El HTML descargado permite consulta/práctica sin conexión; para la gestión protegida utiliza la versión publicada con conexión HTTPS.

Tras entrar en Redactiepanel, **Publicar cambios** valida el borrador y publica una nueva versión en el servidor, conservando intentos y contenidos previos. La exportación HTML/JSON sigue disponible para copias y revisión.

## Ruta A1–B2 y perfiles

La portada es una ruta de aprendizaje con cuatro niveles y 26 bloques (A1: 10; A2: 6; B1: 6; B2: 4). La biblioteca de consulta permanece en `#biblioteca`; la ruta en `#ruta`, los perfiles en `#perfiles` y las pruebas de bloque en `#prueba/A1-01`, etc.

1. Crea un perfil con alias y código opcional. El código generado es estable. Los perfiles son locales y no tienen contraseña: en un dispositivo compartido, otra persona puede elegirlos. No son cuentas institucionales.
2. Pulsa **Continuar mi aprendizaje**. Abrir un tema lo marca en curso; **Marcar como estudiado** añade el check verde. La marca expresa que has trabajado el tema, no que domines todas sus aplicaciones.
3. Al estudiar todos los temas de un bloque, realiza la **formatieve toets**. Incluye dos preguntas por tema y una decisión didáctica. La reflexión se guarda para revisión, sin fingir corrección automática.
4. El 80 % en la parte autocorregible permite pasar al siguiente bloque. Todos los bloques del nivel deben estar superados para avanzar al siguiente nivel. La consulta puntual de otros temas sigue disponible.
5. Si hace falta, revisa el feedback y vuelve a intentarlo. Se conservan intentos, respuestas y fechas. El borrador de prueba permite continuar tras recargar. La ruta propone repasos al día siguiente y, tras aciertos, a la semana.
6. En **Mi perfil**, cambia de perfil, modifica el nombre y descarga/importa una copia. La importación añade intentos y rechaza conflictos. No se borra progreso al actualizar la aplicación. Borrar los datos del navegador puede perder perfiles; conserva copias.

La ruta no sincroniza perfiles automáticamente entre dispositivos. Usa exportación/importación para trasladarlos. La API de pruebas de clase con PIN sigue funcionando por separado. No se trasladan checks anteriores de forma arbitraria: una respuesta de práctica previa no demuestra que una lección completa se haya estudiado.

El informe [BENCHMARK-MOOC.md](docs/BENCHMARK-MOOC.md) recoge la comparación de cinco plataformas, las fuentes de investigación y los límites de las decisiones adoptadas.

## Usar la biblioteca

Abre `index.html` desde GitHub Pages o un servidor estático conservando las carpetas. Para usarla sin servidor, abre `La-Biblioteca.html`, que contiene estilos, datos, código, fuente y once audios. El archivo descargado no necesita cuenta de ChatGPT. Se incluye un ZIP comprobado en `downloads/La-Biblioteca.zip`.

El índice A–D enlaza fonética/ortografía, morfología, verbos y sintaxis. Cada ficha conserva el recorrido explicación, puente ES/NL, muestra real, Docentenbril, fuentes y práctica. La práctica rápida de una ficha no crea por sí sola un registro: para conservar un intento, usa **Practicar esta ficha y guardar un intento**.

## Lectura visual y última sesión

Al volver sin un enlace de ficha explícito se recupera la última ficha, sección y posición de lectura de este navegador. Los enlaces directos tienen prioridad. El índice sigue accesible desde la marca o el menú. Se conservan las respuestas de práctica rápida y los acordeones abiertos; los PIN y contraseñas no forman parte de esta memoria. Los intentos de evaluación y su historial conservan su almacenamiento separado. Borrar datos del navegador elimina esta preferencia local.

Cada ficha incluye un mapa visual, ejemplos seleccionables, teoría desplegable y un espacio para ilustración. Ser/estar, gustar, cambios vocálicos y contraste de pasados tienen esquemas propios. Las demás fichas conectan la regla principal, un ejemplo y la mnemotecnia propia del tema. La explicación completa sigue disponible debajo.

Para añadir una ilustración: **Panel de editores → Materiales y enlaces → Ilustración de la teoría**. Introduce URL HTTPS, texto alternativo en ES/NL y pie de imagen. Usa imágenes con permiso y una dirección de archivo accesible al alumnado. Guarda y publica la copia docente. Si falla la imagen, se conserva la teoría y aparece una alternativa textual.

El footer muestra la fecha/hora de compilación de `content/version.js`, en Europe/Amsterdam y con segundos. No muestra la hora de visita. `build.py` crea ese sello al preparar cada versión. Las revisiones del catálogo compartido no cambian la fecha del código de la aplicación.

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

El panel exige una sesión verificada en servidor y permite preparar un borrador local. La publicación en GitHub requiere permisos del repositorio. La publicación en el servidor requiere una sesión docente autenticada.

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

1. Abre Redactiepanel o Docentenpanel y entra con la contraseña docente configurada para la aplicación. La configuración de acceso se mantiene en el alojamiento, separada de las fichas.
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


## Interfaz y práctica, octubre de 2026

La navegación lateral usa un solo contenedor sticky; el logo de la formación aparece arriba a la derecha. La brújula de la ruta identifica el siguiente tema o prueba según el progreso guardado. Práctica intensiva permite filtrar por nivel, familia y tema, con cinco modalidades y repaso de errores. El catálogo contiene 1.722 ejercicios editables; los recuentos por modalidad se solapan. Consulta docs/PRACTICA-Y-NAVEGACION.md para el alcance, las referencias y la edición.


## Historial sin PIN y progreso por bloque

Mi perfil permite entrar con número de estudiante. El historial personal reúne respuestas de fichas, entrenadores y pruebas con puntuación, detalle y evolución, sin PIN. Se conserva en este navegador y en las copias del perfil; no es una cuenta Fontys verificada ni sincronización automática entre dispositivos. La barra vertical cuenta estudio, práctica y prueba aprobada. Consulta docs/PERFILES-Y-PROGRESO.md.


## Cuenta en la nube y dashboard

La versión cloud visual añade cuentas propias vinculadas al número de estudiante, guardado de perfiles en D1/R2 y restauración en otro navegador al iniciar sesión. No es Fontys SSO. Se conservan los perfiles locales existentes. Mi progreso estima el dominio con criterios explícitos y enlaza práctica focalizada. La teoría añade infografías SVG y un laboratorio de acentuación; el banco contiene 1.738 ejercicios. Lee docs/NUBE-DOMINIO-Y-VISUALES.md para el acceso, la arquitectura activa y los límites de verificación.
