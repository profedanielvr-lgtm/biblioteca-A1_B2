# Nube, dominio y recursos visuales

Versión del 16 de octubre de 2026. Esta ampliación sustituye la limitación de historial exclusivamente local descrita en versiones anteriores.

## Uso del estudiante

En Mi perfil, abre Mi cuenta en la nube. Para el primer acceso, elige Crear mi cuenta, escribe tu número de estudiante y crea una contraseña propia de La biblioteca de al menos doce caracteres. En otro navegador o dispositivo, elige Entrar en mi cuenta con el mismo número y esa contraseña. No se necesitan cuentas de GitHub ni ChatGPT.

La cuenta no verifica la matrícula ni usa el inicio de sesión institucional de Fontys. No introduzcas tu contraseña de Fontys. El profesorado puede restablecer la contraseña de La biblioteca desde Docentenpanel, conservando el historial. Los perfiles antiguos del navegador se mantienen para facilitar la transición y no tienen contraseña local. En un equipo compartido, sus copias locales siguen siendo visibles para quien use ese navegador.

Se guardan en el backend historial, puntuaciones, temas estudiados, borrador de prueba y estado de lectura: ruta, posición, respuestas y apartados abiertos. El pie muestra Guardado en la nube solo después de recibir la confirmación del servidor. Con una conexión interrumpida, indica Pendiente de sincronizar y mantiene una copia de trabajo. Comprueba la confirmación antes de cambiar de equipo. Sin conexión no se puede garantizar que una modificación nueva llegue al servidor.

## Arquitectura y conservación

El frontend estático de GitHub Pages se comunica por HTTPS con el backend existente. El número identifica la cuenta; la contraseña verifica el acceso al perfil. Las contraseñas se almacenan como derivaciones PBKDF2 con sal aleatoria. Las sesiones firmadas duran treinta minutos y se conservan únicamente durante la sesión de pestaña. El token no se incluye en las copias de perfil ni en el código público. Restablecer una contraseña cambia su revisión e invalida las sesiones previas.

D1 conserva las credenciales derivadas y la referencia vigente de cada perfil. R2 guarda versiones del perfil. La actualización de la referencia es condicional: si otro dispositivo la ha cambiado, el servidor vuelve a leer y fusiona antes de guardar. Los intentos se añaden por identificador y los conflictos no sustituyen respuestas anteriores. Los checks de estudio se conservan al fusionar. Un fallo de escritura en R2 no cambia la referencia del perfil. No se borran versiones antiguas durante la sincronización ni al actualizar la aplicación.

Las cuentas y perfiles usan el almacén de configuración existente; no se altera el esquema ni se ejecutan migraciones. El API nuevo está en server/cloud/lib/learner-api.mjs. El backend alojado es la implementación activa; el servidor Node/SQLite opcional del paquete no incorpora estos endpoints nuevos y no debe usarse como sustituto sin ampliarlo.

## Dashboard y evaluación formativa

Mi progreso reúne respuestas, repeticiones y resultados recientes por tema. Para conjugar, conserva además el verbo, la persona en la pregunta y el tiempo o forma del ejercicio. Los registros antiguos que no tienen metadatos se mantienen visibles por tema; no se inventa su verbo o tiempo.

Un tema se marca Consolidado en práctica al acumular diez respuestas, cinco preguntas distintas, dos días de práctica y un mínimo del 80 % en las diez respuestas recientes. Con tres respuestas o más y menos del 60 %, se recomienda refuerzo. Los demás casos siguen En desarrollo o Sin práctica. Son criterios de orientación explícitos, no una certificación MCER, una prueba psicométrica validada ni una garantía de transferencia a tareas comunicativas.

## Imágenes y acentuación

Las infografías son originales y están hechas en SVG/HTML: personas que señalan libros, mochilas y móviles, concordancia de posesivos, manecillas del reloj, posiciones y sílabas tónicas. Se adaptan al ancho de la pantalla y heredan Roboto. No se han generado imágenes de texto con un modelo de difusión: las etiquetas son texto real, legible y editable.

La acentuación distingue fuerza de voz y tilde escrita. La pista de consonante distinta de n/s frente a vocal/n/s se presenta para palabras sin tilde, de varias sílabas y con terminaciones simples. Se añaden los límites para hiatos, monosílabos, y final y grupos consonánticos. Las grafías correctas son kilómetro, teléfono, cápsula, volcán, líquido, fábrica, pájaro y avión. La sílaba fuerte se marca por color, sin añadir puntos o letras ajenas a la ortografía española.

Referencia normativa revisada: [RAE y ASALE, tilde](https://www.rae.es/dpd/tilde). El banco editable tiene ahora 1.738 ejercicios, con dieciséis tareas nuevas de acentuación. El minirreto visual también registra la respuesta cuando hay un perfil activo.

## Pruebas

Se comprueban el aislamiento de cuentas, sesiones independientes, restauración desde un navegador sin datos locales, fusión de intentos, protección de credenciales, restablecimiento de acceso, conservación ante fallos, criterios de dominio y esquemas interactivos. Se ha comprobado por HTTPS la recuperación de un perfil de prueba sintético con dos sesiones independientes en el backend publicado, sin datos de estudiantes reales.

Los estilos incluyen diseños para móvil, tableta y escritorio, tablas desplazables, controles táctiles y reducción de movimiento. La inspección visual en un navegador real no está disponible en este entorno. No se afirma una experiencia perfecta en todos los dispositivos sin esa revisión.
