# Iteración de vocabulario y seguimiento docente · 29 de octubre de 2026

Este cambio parte de la rama principal del repositorio público y mantiene la navegación y los identificadores existentes.

## Vocabulario

Se añaden cuatro mazos originales de veinte tarjetas cada uno: Comer fuera (A1), El tiempo y las estaciones (A1), Estudiar y aprender (B1) y Argumentar y evaluar información (B2).

El total pasa de 240 a 320 tarjetas distribuidas en veinte mazos. Las traducciones corresponden al sentido de los ejemplos. Las referencias del PCIC indican el marco temático, no una certificación de frecuencia ni una atribución oficial del nivel de cada frase.

Se corrige un error por el que los mazos B2 ampliados enlazaban al inventario A1–A2. Ahora B1 y B2 enlazan al inventario B1–B2.

Fuentes de organización: Instituto Cervantes, PCIC, inventario de nociones específicas A1–A2 y B1–B2.

## Panel docente

Se añade un resumen de los intentos de clase que ya estaban disponibles mediante GET /attempts con sesión docente. Presenta intentos, respuestas, porcentajes, agrupación por PIN y código de estudiante, fecha del último intento y preguntas con dos o más respuestas para revisar.

No se han añadido rastreadores ni se han creado nuevos registros de navegación o búsquedas. El resumen NO contiene todo lo que hace el alumnado: excluye tarjetas y sesiones locales, búsquedas y eventos de cuenta que no se han sincronizado como intentos de clase.

El PIN de clase no acredita identidad institucional. Las puntuaciones son formativas y no son prueba de nivel MCER. Solo la sesión docente protegida tiene acceso a los intentos remotos.

## Validación

Se han realizado comprobaciones programáticas de sintaxis y estructura y pruebas unitarias de funciones aisladas en el entorno de preparación. La batería completa npm test y una revisión visual en navegador real deben ejecutarse antes de integrar o publicar esta rama.

El HTML autocontenido y el ZIP descargable requieren regeneración mediante npm run build para reflejar los cambios; el sitio modular servido desde index.html incorpora los scripts modificados. Tras generar los archivos hay que revisar el diff y no sustituir datos o registros históricos.

## Siguiente fase

Mejorar el alcance de los mazos por nivel y temática; revisar equivalencias contextuales y alternativas aceptadas con expertos de español y neerlandés; contrastar la interfaz con alumnos; ampliar el seguimiento solo tras definir acceso docente, finalidad, conservación, información a usuarios y condiciones RGPD.
