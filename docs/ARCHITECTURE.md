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
