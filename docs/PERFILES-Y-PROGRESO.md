# Perfiles, práctica e historial

Revisión del 16 de octubre de 2026.

## Acceso y persistencia

La pantalla Mi perfil solicita el número de estudiante. El nombre o alias es opcional. Una entrada nueva recibe el identificador estable fontys seguido del número; un número ya presente selecciona su perfil anterior y conserva su identificador, nombre y datos. No se cambian las claves de almacenamiento existentes.

Este acceso es local, sin PIN ni contraseña, y no verifica que el número pertenezca a quien lo introduce. No es Fontys SSO. El número recupera los datos guardados en ese navegador y origen; no recupera datos borrados ni datos de otro dispositivo sin importarlos. Para trasladarlos, exporta e importa el perfil. Los perfiles antiguos siguen disponibles. Las copias con el mismo número se fusionan sin borrar intentos, aunque el identificador del perfil antiguo sea distinto.

La copia del perfil incluye ahora las respuestas de práctica además de las pruebas, checks y progreso. El archivo de intentos local existente se consulta e incorpora al perfil al abrir Mi historial. Se conservan los intentos previos con PIN; el historial personal los muestra sin pedirlo. El Docentenpanel mantiene el acceso protegido y sus herramientas de clase.

## Qué registra Mi historial

Cada comprobación con respuesta no vacía en una ficha, cada respuesta de los cinco entrenadores y cada intento finalizado de evaluación, audio o prueba de bloque conserva la pregunta, respuesta del estudiante, respuesta correcta, explicación, fecha, identificador de intento y puntuación. Los clics repetidos de comprobación sobre la misma respuesta sin cambios no crean duplicados. Cambiar la respuesta o repetir una actividad crea otro registro. Consultar soluciones no se registra como respuesta realizada.

Una pregunta individual muestra 1/1 y 100 % o 0/1 y 0 %. Un intento con varias preguntas conserva además su puntuación total. La vista incluye todas sus preguntas, veinte por página, un filtro por tema y los últimos diez intentos en un gráfico. Los porcentajes describen esas tareas, no certifican un nivel MCER. Los datos siguen disponibles al cambiar de PIN porque se relacionan con el número de estudiante, no con el PIN.

## Progreso del bloque

La barra vertical crece desde abajo. Cada tema aporta una unidad por estar marcado como estudiado y otra por haber practicado al menos una pregunta con respuesta. La prueba aprobada aporta la última unidad. Un bloque de cinco temas tiene once unidades. El detalle de la barra explica el cálculo y muestra el porcentaje pendiente. Practicar no marca automáticamente el check de estudio; una respuesta incorrecta cuenta como práctica realizada, pero no como dominio. Para llegar al 100 % hay que estudiar y practicar todos los temas y superar la prueba del bloque.

El botón Volver al bloque abre un menú del bloque concreto con sus temas y su prueba. Está disponible en las lecciones, los entrenadores, la evaluación y el historial. La ruta general sigue disponible desde ese menú.

## Aleatoriedad

Las fichas barajan sus ejercicios al abrirse o reiniciarse, manteniendo las respuestas asociadas al identificador de cada pregunta. Los entrenadores cambian la primera pregunta cuando existen alternativas y barajan el resto. Las pruebas de bloque eligen preguntas de cada tema del banco existente. El audio baraja preguntas y alternativas sin cambiar cuál es correcta. Los borradores de pruebas abiertas conservan orden y respuestas para que una recarga no cambie una pregunta ya iniciada.

Se usan las 1.722 preguntas editables y sus alternativas revisadas. No se generan frases nuevas sin verificar. Los modos Elegir y Completar comparten banco; sus recuentos no deben sumarse como si fueran contenidos distintos.

## Verificación

Pruebas automáticas de acceso por número, recuperación, perfiles antiguos, importación, puntuaciones, detalle de preguntas, historial sin PIN, protección docente, aleatoriedad, respuestas correctas tras barajar opciones, retorno al bloque y cálculo del 100 %. La revisión visual en un navegador real sigue pendiente en este entorno.
