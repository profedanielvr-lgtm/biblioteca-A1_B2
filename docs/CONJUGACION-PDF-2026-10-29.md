# Conjugador completo e informe PDF de progreso · 29 de octubre de 2026

## Conjugación

Conserva los 100 verbos ya existentes, sus traducciones neerlandesas y los controles de filtro y navegación. Se generan en el proceso de compilación 20 opciones de conjugación: 10 tiempos del indicativo, seis tiempos del subjuntivo (con alternativas -ra/-se del imperfecto y pluscuamperfecto como opciones independientes) y los imperativos afirmativo y negativo. Se incorporan el futuro de subjuntivo, su forma compuesta y el pretérito anterior, marcados como históricos o de uso limitado.

La aplicación utiliza el paquete MIT @jirimracek/conjugate-esp v2.3.6, con ortografía 2010 y paradigma castellano, para preparar las formas de manera reproducible. Los datos se empaquetan con la aplicación: el alumno no necesita conexión con un servicio de conjugación cuando practica.

Cada práctica ofrece tiempo verbal seleccionable, tipo regular/irregular del **presente**, terminación, modalidad de una persona o todas las personas disponibles, selección de persona y acciones separadas «Cambiar de persona (mismo verbo)» y «Siguiente verbo». El imperativo no tiene paradigma de yo y se excluyen formas no aplicables; la aplicación no inventa respuestas para esos casos.

Se corrigió un error preexistente en el presente de **costar**: cuesto, cuestas, cuesta, costamos, costáis, cuestan. Las formas presentes de la base anterior se compararon programáticamente con las del corpus nuevo tras esta corrección, sin discrepancias.

Referencias: RAE, Diccionario del estudiante, modelos de conjugación; NGLE/RAE, inventario de tiempos; modelo de biblioteca MIT, https://github.com/jirimracek/conjugate-esp.

## Informe PDF

En «Progreso» aparece «Descargar mi progreso en PDF». Al pulsar, el navegador genera un PDF A4 actualizado con la actividad **acumulada desde el inicio del perfil**, no solo los últimos treinta días. Incluye además un recuento de eventos de los últimos treinta días.

Incluye fichas consultadas y estudiadas, respuestas de vocabulario y gramática registradas, respuestas independientes sin ayuda, conjugaciones por tiempo, intentos formativos, mazos practicados, temas que requieren refuerzo y una explicación prudente de los indicadores. No incluye respuestas literales, búsquedas, notas ni borradores.

El informe se calcula en el dispositivo con los datos del perfil disponibles en ese momento. Si hay actividad pendiente de sincronización en otro dispositivo, todavía no estará reflejada. El resultado es un registro formativo, no una certificación MCER ni una evaluación institucional. El usuario decide si comparte el PDF.

Se conserva la exportación JSON opcional de los últimos treinta días para el profesor, independiente de la nueva descarga PDF acumulada.

El paquete jsPDF 4.2.1 (licencia MIT) se incorpora a la versión autónoma y a la web; el PDF no depende de servicios externos. Para verificar la cabecera PDF se incluye una prueba con el motor real.

## Límites de validación

Las pruebas automatizadas comprueban 100 verbos con 20 opciones cada uno, formas irregulares representativas, selección de tiempos, regresiones de la app y generación de PDF. No sustituyen la validación manual de la accesibilidad, la reproducción en distintas plataformas, la revisión académica de todas las formas ni el ensayo visual y de descarga en navegadores reales. El historial existente no se reinicia ni se reescribe.
