# Reestructuración de la biblioteca y del estudio

Versión: 2026.10.27-study-navigation.

## Estructura modular

| Módulo | Resultado |
| --- | --- |
| Navegación | Cuatro entradas principales: Inicio, Biblioteca, Estudiar y Progreso. Administración es un acceso separado y protegido por la comprobación existente del servidor. Las rutas antiguas continúan disponibles. |
| Biblioteca | Teoría, Ejemplos, Enseñar y Practicar. Se reúne el contenido de propuestas de aula con Enseñar, conservando sus recursos. |
| Administración | Nombre uniforme en español y Beheer en neerlandés. El acceso al historial docente y a la edición mantiene la misma autorización del servidor. No se cambia la contraseña. |
| Conjugador aleatorio | Nuevo verbo sin repetición consecutiva y persona al azar. Siguiente crea la nueva pregunta; audio separado de infinitivo, forma y frase. Presente de indicativo con tú y vosotros. |
| Tarjetas | Giro, ejemplos, traducción contextual al neerlandés, audio independiente y alternativa de recuperación escrita. |
| Repetición | Un error o una autoevaluación negativa devuelve la tarjeta a la cola tras otras tarjetas, cuando hay suficientes. Dos aciertos o autoevaluaciones positivas consecutivos la resuelven para la sesión y la programan para el día siguiente. |
| Progreso | La cola y su estado se guardan mediante eventos del perfil. La autoevaluación es exposición; se mantiene separada de la producción escrita y del recuerdo diferido. Sin perfil, la sesión es temporal. |
| Banco léxico | Se añaden 160 tarjetas originales en ocho temas. Total inicial: 240 tarjetas, 16 mazos. Las glosas y los ejemplos son originales; las referencias académicas documentan la organización temática, no una traducción oficial ni una clasificación estadística. |

## Decisiones instruccionales

Quizlet ofrece giro, orden aleatorio, audio y clasificación en palabras conocidas y en aprendizaje. Se usa como referencia de interacción; no se copia su código ni se afirma reproducir su algoritmo adaptativo. La recuperación repetida de vocabulario respalda mantener preguntas posteriores a un acierto. La regla concreta de dos aciertos y repetición al día siguiente es una decisión transparente de este diseño, no un algoritmo validado científicamente ni una garantía de dominio.

No se considera conocimiento duradero el hecho de ver, escuchar o marcar una tarjeta como conocida. Las traducciones dependen del sentido trabajado; los bancos admiten alternativas contextualizadas. Se conservan los identificadores de las 80 tarjetas existentes para mantener el historial.

## Fuentes

Instituto Cervantes. (2006). Plan curricular del Instituto Cervantes. Nociones específicas, inventarios A1–A2 y B1–B2. https://cvc.cervantes.es/ensenanza/biblioteca_ele/plan_curricular/indice.htm

Real Academia Española y Asociación de Academias de la Lengua Española. Diccionario de la lengua española. https://dle.rae.es/

Karpicke, J. D., & Roediger, H. L. (2008). The critical importance of retrieval for learning. Science, 319(5865), 966–968. https://doi.org/10.1126/science.1152408

Quizlet. Studying with Flashcards. https://help.quizlet.com/hc/en-us/articles/360030988091-Studying-with-Flashcards

## Límites que no deben presentarse como cumplidos

La lista de 100 verbos sigue siendo una selección didáctica. No se ha obtenido ni aplicado una extracción del CORPES que certifique que son exactamente los primeros 100 lemas verbales de una versión, registro y universo definidos. Por ello, la interfaz no la llama ranking estadístico.

No hay proveedor externo de voz configurado ni un banco completo de grabaciones humanas revisadas por región. La síntesis del dispositivo mantiene asignación explícita de voz, exclusión de voces inglesas y es-US, cancelación, errores y tiempos de espera. El estado visual de preparación se activa de forma síncrona al pulsar. Eso no prueba ni garantiza inicio acústico inferior a 200 ms, latencia cero, pronunciación nativa o compatibilidad universal. Las opciones regionales ausentes se indican y no se sustituyen silenciosamente.

Para verificar esos requisitos de audio se necesita un proveedor regional estable o grabaciones revisadas de todas las entradas y pruebas acústicas en los dispositivos objetivo. Las pruebas automatizadas usan voces simuladas; no sustituyen la escucha ni la revisión visual en dispositivos reales.

## Validación

Las comprobaciones incluyen navegación y acceso protegido, compatibilidad de rutas, conservación de tarjetas antiguas, fuentes y ejemplos bilingües, cola de repetición, restauración de progreso, estados de acierto y error, aleatoriedad de verbos, audio independiente y edición autónoma. Se conserva la diferenciación entre exposición, producción asistida, producción independiente y recuerdo diferido.
