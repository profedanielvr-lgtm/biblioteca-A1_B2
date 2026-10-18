# Consultar, aprender y aprender a enseñar

Esta ampliación parte del frontend público d43dca51db60e5e59be899a161933e05f843068b, del 16 de octubre de 2026. Se recuperó el archivo completo y se contrastaron index.html, course-model.js, cloud-profile.js y version.js con GitHub Pages. El backend de Sites corresponde a la versión publicada 8, commit f46a71d586be29e88c2ee35a2d4a11b32de7e041. Sites no sirve los módulos del frontend: su portada enlaza a GitHub Pages y su API gestiona cuentas y datos compartidos. Sus hashes distintos no indican dos frontends contradictorios.

## Rutas

La entrada vacía y #inicio abren recomendaciones. #biblioteca conserva las fichas y añade filtros de preparación. #vocabulario muestra mazos y #vocabulario/v-rutina abre un mazo. #mazo permite crear e importar mazos personales. #repaso combina preguntas de gramática y recuperaciones de vocabulario. #laboratorio y #laboratorio/F13 o #laboratorio/v-rutina abren el ciclo profesional. #colecciones reúne recursos y notas. #evidencias separa consulta, práctica, recuperación diferida y productos docentes. Se conservan #ruta, #entrenar, #historial, #dashboard y las rutas docentes anteriores.

## Datos y sincronización

El catálogo recuperado contiene 123 fichas y 1.738 ejercicios; su archivo JSON se conserva idéntico byte a byte. El recuento anterior de 1.722 en otra documentación estaba desactualizado. Se conserva la clave la-biblioteca-profiles-v1, las bases de intentos y todos sus identificadores. learningEvents es una extensión opcional y aditiva del perfil. Cada evento tiene id, kind, createdAt, payload y cardId opcional. Los kinds admitidos por el backend publicado son review, goal, work, collection, collection-remove, diagnostic, session y scenario.

review conserva respuesta, dirección, dominio, ayudas, confianza, modalidad, fase, tiempo y versión. goal representa estrellas y mazos personales. work guarda versiones de borradores, producción abierta y propuestas. session conserva selección, posición y respuestas de una sesión interrumpida. diagnostic guarda las preguntas, resultados y firma del bloque. collection conserva planificación y enlaces versionados. scenario documenta decisiones en un caso simulado.

Los eventos se unen por ID; un ID con contenido distinto produce conflicto y no sustituye la evidencia original. Los clientes antiguos que no incluyen learningEvents no eliminan los eventos del servidor. El estado de repaso se deriva del historial. Las direcciones NL→ES y ES→NL son independientes. Las colecciones conservan recursos añadidos desde dos dispositivos. El registro conserva versiones anteriores de productos docentes; el formulario permite recuperarlas.

La infraestructura existente almacena las cabeceras de versión en D1 y los perfiles versionados en R2, usando comparación y sustitución condicional. No hace falta una migración destructiva ni una nueva cuenta. La publicación sigue pendiente; las pruebas utilizan servidores simulados y almacenamiento aislado.

## Repaso y diagnóstico

Un error propone una nueva recuperación tras diez minutos. Un acierto asistido o de reconocimiento usa un intervalo corto. Una recuperación escrita independiente propone inicialmente un día y amplía el intervalo cuando ocurre tras al menos un día. Los intervalos se limitan a noventa días. Son reglas iniciales transparentes, no un modelo psicométrico validado. Las estrellas elevan la prioridad, pero no borran resultados. Las respuestas inmediatas y los aciertos en emparejamiento no cuentan como recuerdo diferido.

El diagnóstico usa dos preguntas por tema del bloque sin pistas. El salto exige acertarlas todas y mantiene la firma del contenido; una firma distinta invalida el salto. No marca las lecciones como leídas. Es una orientación formativa con soluciones accesibles en el cliente, no una evaluación acreditativa.

## Vocabulario

Se incluyen ocho mazos originales de inicio, ochenta tarjetas, con dos mazos por nivel A1, A2, B1 y B2. No constituyen un inventario completo del nivel. Una tarjeta representa una expresión o un sentido en contexto. Admite alternativas, ejemplos ES/NL y grabaciones HTTPS. El editor permite importar JSON para añadir alternativas y audio. Las tarjetas personales se guardan en el perfil y viajan con su copia y su sincronización.

Tarjetas muestra reverso y ejemplo. Aprender prioriza pendientes y difíciles. Escribir requiere recuperación sin opciones. Test aplaza la corrección hasta el final. Emparejar ofrece asociaciones con tiempo personal. La sesión docente deja pendiente el producto del laboratorio.

No se han fabricado ni atribuido grabaciones nativas. Sin un audio autorizado se identifica una voz sintética del dispositivo, si existe. No se descarga voz externa sin petición. La incorporación de grabaciones humanas requiere fuente, permiso y comprobación auditiva.

## Laboratorio y revisión

El recorrido permite observar, completar y diseñar directamente. Incluye un caso con tres intervenciones y reacciones simuladas. Para guardar una propuesta elaborada se exige objetivo, explicación visual, actividad, comprobación en contexto nuevo, justificación, decisión de caso y autoevaluación con tres criterios. Se exporta texto para Canvas. No se simula una entrega LTI ni una revisión docente automática.

Un producto elaborado permanece pendiente de revisión humana. No se infiere capacidad docente de un check de lectura ni de una puntuación de vocabulario. El tutor de IA, las clasificaciones públicas y las calificaciones institucionales no se incorporan. Las metas personales y las evidencias tienen prioridad.

## Consulta y límites

Los filtros combinan metadatos existentes, texto de objetivos, materiales y duración. La búsqueda por curso solo devuelve contextos expresamente documentados, sin asignar un nivel MCER universal a cada curso de VO. Las colecciones guardan vínculos, anotaciones y versión del recurso; no son instantáneas completas de recursos externos.

La revisión automatizada usa DOM simulado, pruebas de perfiles, archivos, algoritmo y API. La revisión en navegador real debe documentarse por separado. Una respuesta HTTP correcta de la vista local no sustituye la inspección visual.
