# Arquitectura funcional de La Biblioteca

El frontend es estático, sin dependencias de producción. Se puede alojar en GitHub Pages, en un servidor del centro o abrir como HTML autocontenido. La API compartida ya está publicada con D1/R2 para historial y publicación editorial. También se ofrece una alternativa Node/SQLite autogestionada. La consulta de fichas funciona con la copia estática incluso si falla la API.

## Flujo de consulta y aprendizaje

`library.js` resuelve el hash de navegación. Las rutas `#curriculo`, `#audio`, `#evaluacion`, `#historial` y `#docente` se delegan en `platform.js`. Un código de ficha abre su explicación, contraste, muestra, Docentenbril, fuentes y práctica. Las referencias se muestran en un diálogo interno gestionado por `media.js`.

El catálogo JSON contiene reglas y ejemplos bilingües, actividades, ejercicios, referencia curricular y muestras. `build.py` genera su envoltorio JavaScript y el HTML autocontenido. Los cambios de contenido no alteran el nombre de la base del historial.

## Contratos principales

```js
const store = new BiblioHistory.HistoryStore();
const session = new BiblioAssessment.Session({
  studentCode: 'CODIGO_ESTUDIANTE',
  classPin: 'PIN_INTRODUCIDO_MANUALMENTE',
  mode: 'exam',
  appVersion: GRAMMAR.release,
  items: BiblioAssessment.grammarItems(GRAMMAR.cards, {level: 'A2', count: 10})
});
session.answer(session.items[0].id, 'respuesta');
const result = session.finish('es');
await store.append(result);
// Un intento finalizado se añade. Nunca se modifica para crear el siguiente.
const history = await store.all('CODIGO_ESTUDIANTE');
```

```js
const player = new BiblioAudio.ClipPlayer({
  clip: GRAMMAR.recordings[0],
  ledger: store,
  key: session.id + ':' + GRAMMAR.recordings[0].id,
  onCount: used => console.log(used + '/2')
});
await player.play();
player.setSpeed(0.85);
player.stop();
```

La reserva de una escucha es una transacción de IndexedDB. Dos pestañas que compiten por el mismo identificador solo consiguen dos reservas. `play()` espera metadatos, sitúa el punto inicial y aplica la velocidad antes de reproducir. Si falla el inicio, se devuelve la reserva concreta. El recorte final se controla por tiempo sin permitir al alumno desplazar el inicio con una barra libre.

```js
BiblioMedia.open({
  title: 'Un recurso del aula',
  url: 'https://cvc.cervantes.es/',
  summary: 'Contexto preparado por el docente',
  lang: 'es'
});
```

## Persistencia e identidad

Local: base `la-biblioteca-records`, esquema 1, almacenes `attempts`, `plays`, `drafts`, `media`, `metadata`. Solo `attempts` y `plays` tienen uso activo en esta entrega; los otros reservan la evolución sin borrar datos. Se mantiene una copia JSON de intentos con otra clave estable. Los borradores editoriales no comparten almacén ni clave con los intentos.

Servidor: `attempts` es una tabla de inserción única protegida contra UPDATE/DELETE. `classes` conserva la relación con cada PIN histórico. `content_versions` permite cambiar contenidos sin tocar intentos. La versión publicada usa migraciones Drizzle sobre D1, sin recrear datos. R2 almacena versiones grandes de catálogo y copias de intentos. La alternativa Node usa CREATE IF NOT EXISTS sobre el mismo archivo persistente.

El código del estudiante se normaliza y no cambia al cambiar de PIN. El identificador de intento es UUID. Las copias se importan por UUID, se ignoran duplicados equivalentes y se rechazan conflictos; no se sobrescribe un historial completo desde un archivo de configuración.

La autenticación docente es una contraseña verificada en servidor con sesiones firmadas y caducidad. El frontend nunca incluye esa contraseña ni el secreto de firma. La entrada del alumno con código/PIN es seudónima, no una autenticación institucional fuerte. Las respuestas se corrigen en cliente para uso formativo. El servidor valida estructura y consistencia del registro; no acredita que un alumno haya respondido sin ayuda.

## API

| Ruta | Acceso | Función |
|---|---|---|
| GET /health | público | Estado del servicio |
| POST /teacher/setup | solo propietario autenticado | Elegir/renovar contraseña docente |
| POST /teacher/session | contraseña docente | Sesión de 30 minutos |
| POST /classes | docente | PIN nuevo de 24 horas |
| POST /student/session | código y PIN válido | Sesión de estudiante |
| POST /attempts | estudiante | Añadir su intento en su clase |
| GET /attempts | sesión | Historial propio o vista docente |
| POST /content | docente | Publicar una versión del catálogo |
| GET /content/latest | público | Leer la última versión publicada |

`content/config.js` contiene únicamente la URL pública de la API. Sin configurar ese dato, el sitio se mantiene en modo local. Una publicación por GitHub Pages solo actualiza archivos; no despliega esta API ni crea una base SQLite.

## Comprobaciones y límites

Las pruebas ejecutan el DOM con linkedom y IndexedDB con fake-indexeddb, no un navegador real. El servidor se prueba mediante HTTP real y una base SQLite temporal, incluyendo reinicio. La verificación de formato/duración de audio no sustituye una escucha. Las restricciones de iframe de terceros, el almacenamiento en Student View y la apariencia móvil requieren comprobación en el entorno de Fontys.

## Navegación y presentación visual

`reading-state.js` valida destinos internos y conserva lectura/práctica en una clave independiente de los exámenes. Solo restaura en el arranque y sin enlace explícito. Navegar al índice nunca vuelve a ejecutar la restauración. Los cambios de sección de una misma ficha desplazan el foco visual sin reconstruir los controles.

`visual-learning.js` compone esquemas, ejemplos interactivos y un slot opcional `illustration: {url, alt: {es,nl}, caption: {es,nl}}`. La teoría completa se conserva en acordeones nativos. URLs HTTPS y textos alternativos se validan antes de publicar.

El contenido remoto emite `biblio:content-ready`, no un hashchange artificial. Solo se solicita una vez por carga, con timeout de 10 s; no reemplaza la pantalla de un intento activo ni el editor. Sin servidor disponible, la consulta local sigue operativa. `content/version.js` es independiente del catálogo y fija el sello temporal del código publicado.

## Curso y perfiles

`course-model.js` genera la ruta a partir del catálogo, respeta prerrequisitos y agrupa hasta cinco fichas. `ProfileStore` usa la clave estable `la-biblioteca-profiles-v1`; nombres, progreso, historial de pruebas y borrador pertenecen a cada perfil. Las escrituras que fallan se revierten; no se confirma un check guardado si el navegador rechaza el almacenamiento. Los perfiles no son autenticación ni contienen contraseñas.

`course-ui.js` presenta ruta, perfiles y pruebas por pasos. Reutiliza `BiblioAssessment.Session` para corrección y feedback. Cada intento de bloque conserva composición, fecha, respuestas y reflexión; el historial local existente recibe una segunda copia. El criterio de desbloqueo es 80 % y todos los temas declarados estudiados. El acceso de consulta continúa libre.

La memoria de lectura se separa por ID de perfil. Los datos anteriores del historial y del editor conservan sus claves originales. La importación de perfiles fusiona por UUID de perfil/intento y rechaza intentos contradictorios sin sobrescribir registros. Los materiales añadidos al catálogo se incorporan al curso; una nueva composición de bloque exige un intento que la cubra, conservando los anteriores.

## Estudio visual, práctica y paneles

`studio.js` resuelve navegación y presentación por secciones sin desmontar controles. `studio.css` aplica la cuadrícula, Roboto y paleta Fontys. `intensive.js` obtiene los bancos de tablas/ejemplos/ejercicios existentes y ejecuta rondas con feedback. Nunca deduce que un tema está dominado solo por practicarlo.

`panels.js` bloquea las rutas de gestión hasta que `POST /teacher/session` y `GET /teacher/session` confirman una sesión válida. El token se queda en memoria y no se exporta. El backend valida rol/revisión para operaciones privadas y publicación. Los archivos estáticos permanecen públicos; el login no es una técnica para ocultar JavaScript. La clave real solo se comprueba contra el registro derivado guardado en el runtime del servidor.
