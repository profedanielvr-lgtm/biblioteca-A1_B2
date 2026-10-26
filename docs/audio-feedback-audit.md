# Revisión de audios y retroalimentación

Versión: 2026.10.26-audio-feedback.

## Componentes

| Componente | Función |
| --- | --- |
| Reproductor común | Selección explícita de voz e idioma, cancelación, detección de error, límite de espera y liberación de controles. |
| Control de variantes | España es-ES, México es-MX, Río de la Plata es-AR o es-UY. No hay sustitución silenciosa de región. La opción genérica se identifica por separado. |
| Banco de audio de vocabulario | Botones independientes para términos y frases ES/NL en cada mazo. Las tarjetas antiguas usan el mismo reproductor. |
| Conjugador | Las seis formas de cada uno de los 100 verbos tienen audio; la respuesta generada ofrece audio de la forma y de la frase tras comprobar o revelar. |
| Retroalimentación visual | Correcto e Incorrecto, texto visible, estado anunciado y colores con contraste AA. Incluye gramática, fonética, conjugación, vocabulario, emparejamiento, diagnóstico y resultados de pruebas. |
| Reproductor de grabaciones | Cancelación durante carga o inicio, restitución de escucha reservada si el audio no empieza, límites de espera y control de errores. |

## Fallos corregidos

El reproductor antiguo de vocabulario asignaba lang pero no voice. Podía recurrir a la voz predeterminada del navegador. Ahora todo el texto a voz se crea en modules/phonetics-audio.js con una voz explícita compatible. Se excluyen etiquetas inglesas y es-US; se normalizan etiquetas BCP 47. El neerlandés selecciona voces nl, independientemente del modelo regional español.

Las voces ausentes o incompatibles no se sustituyen: sus botones muestran indisponibilidad y el selector permite actualizar las voces o elegir deliberadamente otro modelo. También se comprueba que exista el constructor de síntesis y se conserva la referencia a la locución durante la reproducción. Los controles se actualizan cuando aparecen voces.

Las grabaciones de mazos importados que no documentan una variante revisada no sustituyen al modelo seleccionado. El banco fonético admite grabaciones por variante solo mediante el manifiesto con revisión y créditos. Se conservan los 11 clips originales con sus atribuciones; no se presentan como muestras verificadas de los tres modelos.

Se corrige el inicio tardío de clips tras detener o navegar durante la carga o durante play(). Los intentos cancelados antes del inicio no consumen una escucha. Un error posterior al inicio conserva la escucha utilizada.

## Cobertura y validación

El inventario incluye 27 letras, 259 elementos de audio registrados, 21 filas regionales, 100 verbos, 600 formas de presente y 11 clips integrados. Los ocho mazos iniciales ofrecen audio independiente de sus palabras y frases en español y neerlandés.

Ejecutar node scripts/audit-audio.cjs para comprobar cobertura, centralización de síntesis y cabeceras de los archivos integrados. Ejecutar node --test tests/*.test.cjs tests/*.test.mjs para comprobar el comportamiento, incluidos voces inglesas predeterminadas, ausencia de voces, carga tardía, errores, cancelaciones y recuperación. Las pruebas usan voces simuladas; no constituyen revisión acústica.

La interfaz usa verde oscuro #125c32 sobre #eef7f1 y rojo oscuro #94232b sobre #fff1f2, con contraste de texto de al menos 4,5:1, etiquetas textuales y avisos accesibles. Se conserva el feedback al finalizar las pruebas para no revelar respuestas durante un intento.

## Límites pendientes

No se han incorporado grabaciones humanas revisadas de todo el banco ni un proveedor TTS externo. Una etiqueta es-AR o es-MX no demuestra que una voz sintetice cada rasgo dialectal; tampoco certifica que sea una voz nativa. No se promete reproducción universal ni coherencia acústica de los tres modelos en dispositivos sin voces compatibles. Faltan pruebas visuales y auditivas en navegadores y dispositivos reales. No se modifican transcripciones ni ortografía para simular acentos.

Referencia técnica: https://wicg.github.io/speech-api/#tts-section
Referencia sobre selección explícita de voz: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/voice
