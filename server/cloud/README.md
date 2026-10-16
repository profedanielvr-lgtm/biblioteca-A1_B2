# La Biblioteca · Servicio compartido

Frontend público: https://profedanielvr-lgtm.github.io/biblioteca-A1_B2/

API para historial formativo, PIN de clase y publicación editorial. El alumnado no necesita cuenta de ChatGPT: usa su código estable y un PIN activo para sincronizar intentos.

La ruta `/gestion` es exclusiva del propietario autenticado y sirve para elegir o renovar la contraseña docente (mínimo 12 caracteres). No está destinada al alumnado. Después, los docentes usan esa contraseña desde el panel del frontend.

D1 conserva intentos con triggers que impiden UPDATE/DELETE. R2 conserva copias de intentos y versiones del catálogo. Las migraciones se añaden; no se modifica una migración ya aplicada. Las actualizaciones no eliminan datos. Deben conservarse copias administrativas y los mismos secretos de firma.

Variables runtime: BIBLIO_SECRET, BIBLIO_OWNER_ID, BIBLIO_FRONTEND_ORIGIN. No incluir sus valores en el repositorio. Contraseñas derivadas con PBKDF2; sesiones firmadas 30 minutos; PIN válidos 24 horas. El código+PIN es acceso formativo y no identidad institucional verificada.

Comprobación: `node --test tests/api.test.mjs`. Compilación: helper Sites `build-site.mjs`. El despliegue aplica las migraciones Drizzle incluidas y enlaza DB/BUCKET desde `.openai/hosting.json`.

Gramática Lab / La biblio pasa a llamarse La Biblioteca.
La Biblioteca — Herramienta educativa sin fines lucrativos creada por Daniel Valle Robles.

## Acceso compartido a paneles

`BIBLIO_PANEL_CREDENTIAL` contiene un registro PBKDF2 con salt y revisión, configurado como secreto de runtime. Si existe, prevalece sobre la contraseña en D1 y bloquea la configuración antigua por `/gestion`. La clave compartida nunca se inserta en el frontend, HTML descargable o repositorio. `POST /api/teacher/session` comprueba la contraseña; `GET /api/teacher/session` valida el token. Rotar el registro invalida las sesiones docentes anteriores.

El frontend estático permanece público. El login impide entrar a las pantallas de gestión por la navegación normal; las lecturas privadas y publicaciones se autorizan también en el servidor. Una copia local del HTML no puede modificar el contenido compartido sin un token válido.
