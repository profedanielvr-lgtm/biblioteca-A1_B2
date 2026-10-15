# La Biblioteca · Servicio compartido

Frontend público: https://profedanielvr-lgtm.github.io/biblioteca-A1_B2/

API para historial formativo, PIN de clase y publicación editorial. El alumnado no necesita cuenta de ChatGPT: usa su código estable y un PIN activo para sincronizar intentos.

La ruta `/gestion` es exclusiva del propietario autenticado y sirve para elegir o renovar la contraseña docente (mínimo 12 caracteres). No está destinada al alumnado. Después, los docentes usan esa contraseña desde el panel del frontend.

D1 conserva intentos con triggers que impiden UPDATE/DELETE. R2 conserva copias de intentos y versiones del catálogo. Las migraciones se añaden; no se modifica una migración ya aplicada. Las actualizaciones no eliminan datos. Deben conservarse copias administrativas y los mismos secretos de firma.

Variables runtime: BIBLIO_SECRET, BIBLIO_OWNER_ID, BIBLIO_FRONTEND_ORIGIN. No incluir sus valores en el repositorio. Contraseñas derivadas con PBKDF2; sesiones firmadas 30 minutos; PIN válidos 24 horas. El código+PIN es acceso formativo y no identidad institucional verificada.

Comprobación: `node --test tests/api.test.mjs`. Compilación: helper Sites `build-site.mjs`. El despliegue aplica las migraciones Drizzle incluidas y enlaza DB/BUCKET desde `.openai/hosting.json`.

Gramática Lab / La biblio pasa a llamarse La Biblioteca.
La Biblioteca — Herramienta educativa sin fines lucrativos creada por Daniel Valle Robles.
