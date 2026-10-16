# Del catálogo a una ruta: comparación y decisiones de diseño

Consulta de documentación pública: 16 de octubre de 2026. Se han comparado cinco referentes desde ocho dimensiones: organización, explicación gramatical, práctica, feedback, repaso, progreso, evaluación y adecuación a docentes de ELE. Duolingo, Babbel y Busuu son aplicaciones de idiomas; Coursera y FutureLearn son plataformas MOOC. No son productos equivalentes ni se afirma que uno sea universalmente mejor.

## Comparación de plataformas (fuentes primarias)

| Referente | Organización y explicación | Práctica y feedback | Progreso, repaso y evaluación | Aplicación a La Biblioteca |
|---|---|---|---|---|
| Duolingo | Ruta guiada con unidades pequeñas y apoyos explícitos para observar patrones. | Práctica integrada; sus lecciones gramaticales combinan instrucción y aplicación. | Repaso dentro de la ruta y secuencia de pasos. | Una acción siguiente clara; objetivo, ejemplo y práctica. Mantener explicación profesional y elección docente; no trasladar mecánicas de presión o rachas. |
| Babbel | Lecciones breves con situaciones comunicativas. | Revisión programada de vocabulario según respuestas. | Intervalos de repaso que aumentan con respuestas correctas. | Volver a recuperar la regla después de estudiar. Sus resultados de vocabulario no prueban por sí solos eficacia para todo el análisis gramatical. |
| Coursera | Organización por unidades y objetivos. | Comprobaciones durante la enseñanza y feedback que orienta la corrección. | Pruebas y nuevas oportunidades tras revisar dificultades. | Cada bloque tiene prueba, feedback por pregunta y reintentos conservados. El error conduce a una explicación concreta. |
| FutureLearn | Secuencia de pasos con texto, audio o vídeo. | Quizzes con ayuda y diferencia entre práctica y pruebas. | El estudiante marca pasos completados; dispone de vista de progreso. | Separar «abrir», «estudiar» y «superar un bloque». Leer una pantalla no demuestra aprendizaje. |
| Busuu | Curso y sección de revisión de gramática. | Reglas, ejercicios por tema y revisión de puntos débiles. | Seguimiento de temas y sugerencias de práctica. | Mantener biblioteca de consulta junto a la ruta; el feedback enlaza al tema que necesita revisión. |

Fuentes de producto:

1. Duolingo, [The science behind the new learning path](https://blog.duolingo.com/new-duolingo-home-screen-design/).
2. Duolingo, [Learning grammar](https://blog.duolingo.com/language-rules-learning-grammar-on-duolingo/).
3. Duolingo, [Spaced repetition for learning](https://blog.duolingo.com/spaced-repetition-for-learning/).
4. Babbel, [Vocab workout (Review)](https://support.babbel.com/hc/en-gb/articles/205600228-Vocab-workout-Review).
5. Babbel, [Effective language learning](https://support.babbel.com/hc/en-us/articles/360037496092-Effective-language-learning).
6. Coursera, [How to integrate mastery learning into course design](https://blog.coursera.org/how-to-integrate-mastery-learning-into-course-design/).
7. FutureLearn, [Using FutureLearn: steps, completion and quizzes](https://www.futurelearn.com/using-futurelearn).
8. FutureLearn, [Assessment and completion](https://www.futurelearn.com/info/faq/course-assessment-and-completion).
9. Busuu, [What is Grammar Review?](https://help.busuu.com/hc/en-us/articles/12575126438674-What-is-Grammar-Review).

Se ha analizado lo documentado por los propios proveedores; no se han auditado sus algoritmos, servicios de pago ni cada variante actual de la interfaz. Las afirmaciones comerciales no se tratan como pruebas independientes de eficacia.

## Evidencia educativa y límites de transferencia

- **Recuperación activa:** Agarwal, Nunes y Blunt (2021), [revisión sistemática de investigación de aula](https://doi.org/10.1007/s10648-021-09595-9), reúne resultados favorables a recuperar conocimientos. Se aplica aquí como responder antes de abrir la solución. No garantiza el mismo efecto en esta aplicación sin evaluación de uso.
- **Práctica espaciada en L2:** Kim y Webb (2022), [metaanálisis](https://doi.org/10.1111/lang.12479), respalda distribuir la práctica y muestra que los efectos dependen de tareas y condiciones. Aquí se propone un primer repaso al día siguiente y nuevos repasos tras una semana cuando las respuestas son correctas. Es una pauta simple de diseño, no un algoritmo clínicamente validado ni una copia del sistema de Babbel.
- **Explicación explícita:** Spada y Tomita (2010), [metaanálisis sobre instrucción gramatical](https://doi.org/10.1111/j.1467-9922.2010.00562.x), respalda la utilidad de instrucción explícita en los estudios analizados, centrados en inglés L2. No basta para trasladar automáticamente el tamaño del efecto al español o a futuros docentes neerlandófonos. Por eso se combina regla, contraste, uso y decisión didáctica.
- **Variación y contexto:** [The role of variable retrieval in effective learning, PNAS](https://doi.org/10.1073/pnas.2413511121) estudia pistas variables y práctica de recuperación, principalmente de vocabulario. Apoya explorar ejemplos variados, pero no demuestra que cambiar el orden de las mismas preguntas equivalga a una evaluación nueva de transferencia.

## Diseño implementado

1. Ruta A1 → A2 → B1 → B2: 123 temas, 26 bloques de hasta cinco temas. Orden topológico de prerrequisitos dentro de cada nivel. No se presentan todos los temas B2 como objetivos de principiantes del onderbouw.
2. Pasos de lección: explicación visual, puente ES/NL, muestras, Docentenbril, fuentes y práctica. El recorrido conserva la profundidad HBO para decidir cómo enseñar.
3. Perfil local con alias, código estable y memoria independiente de otros perfiles del mismo navegador. No requiere correo ni ChatGPT. No se simula una cuenta segura ni sincronización automática entre dispositivos.
4. Estados: **sin abrir**, **en curso**, **estudiado**. Estudiado es una declaración del usuario después de trabajar el material, no una medición automática de dominio.
5. Cada bloque termina con **formatieve toets**: dos preguntas por tema, una a una, respuestas abiertas, feedback final y una reflexión didáctica guardada sin calificación automática. La prueba usa el banco existente y explica la corrección.
6. Para avanzar en la ruta: estudiar los temas, completar la reflexión y alcanzar al menos 80 % en la parte autocorregible. El porcentaje y el tamaño de bloque son decisiones de diseño, no umbrales oficiales del MCER, Fontys ni una exigencia derivada de los estudios.
7. Reintentos sin borrar los anteriores. La marca de bloque superado considera un intento que cumplió el umbral con la misma composición de temas. Una ampliación del bloque pide revisar lo nuevo; no borra el historial previo.
8. Repasos sugeridos según errores y fechas. La consulta libre permanece disponible para docentes en ejercicio. Una ruta progresiva no debe impedir resolver una duda puntual.
9. Perfiles y borradores se guardan en el navegador; el usuario puede exportarlos e importarlos de forma aditiva. Los intentos también se copian al historial local de la biblioteca. No se envían notas automáticamente a Canvas.

## Lo que se debe evaluar con estudiantes reales

Prueba de usabilidad en Canvas: localizar el siguiente paso, distinguir los tres estados, recuperar un borrador, interpretar feedback y cambiar de perfil sin mezclar progreso. Comparar comprensión antes/después con tareas nuevas, observar uso de Docentenbril y recoger carga percibida. Una tasa de finalización alta o muchos checks no equivalen a mayor competencia docente.

La implementación tiene pruebas funcionales automatizadas; no se ha realizado una prueba de usabilidad con alumnado ni una revisión visual en un navegador real en este entorno.
