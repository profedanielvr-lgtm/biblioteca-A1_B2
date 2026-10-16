# Práctica y navegación

Revisión del 16 de octubre de 2026. La biblioteca mantiene los perfiles, las claves de progreso y el historial anterior. No cambia el criterio de aprobación de las pruebas formativas.

## Referencias analizadas

| Referencia | Patrón observado | Aplicación propia |
| :--- | :--- | :--- |
| [Ver-taal: gramática](https://www.ver-taal.com/gramatica.htm) | Índice por fenómeno, distinción entre formación y uso, niveles de dificultad, huecos, práctica repetida y materiales contextualizados | Filtro por tema y nivel, entrenador de formas separado del trabajo en contexto, rondas de diez |
| [Ver-taal: demostrativos](https://www.ver-taal.com/ej_demostrativos1.htm) | Elección de formas según referencias de distancia | Esquema propio con tres perspectivas espaciales, concordancia y contexto |
| [Ver-taal: posesivos](https://www.ver-taal.com/ej_posesivos1.htm) | Completar posesivos con referencias explícitas | Contraste poseedor/objeto poseído, transformación singular/plural |
| [Aprender Español: gramática](https://aprenderespanol.org/gramatica-ejercicios.html) | Categorías breves y acceso directo a un fenómeno | Familia gramatical y tema concreto, sin recorrer un listado de ejercicios no relacionados |
| [Aprender Español: posesivos](https://aprenderespanol.org/gramatica/posesivos.html) | Progresión entre asociar, elegir y escribir, tests y tablas | Cinco modos: conjugar, completar, elegir, asociar y ordenar, con respuesta y explicación inmediatas |

Los patrones observados son decisiones de diseño, no pruebas de eficacia de esas páginas. Los ejercicios añadidos son propios. No se han copiado sus enunciados, imágenes, audios ni código.

## Contenido y alcance

El catálogo contiene 1.722 ejercicios con respuesta y feedback bilingüe. Los 123 temas tienen práctica propia. No todos tienen la misma cantidad: la ampliación intensiva prioriza paradigmas verbales, artículos, posesivos, demostrativos, pronombres, horas y preposiciones. Los otros temas conservan sus ejercicios contextualizados. Los recuentos de los cinco modos se solapan: elegir y completar reutilizan el mismo banco; no son preguntas distintas.

El entrenador verbal ofrece 1.287 entradas, incluidas las tablas existentes y doce verbos modelo en quince tiempos o formas. Las formas regulares, los tiempos compuestos y el participio irregular escrito se han contrastado con los paradigmas de [hablar](https://dle.rae.es/hablar), [comer](https://dle.rae.es/comer), [vivir](https://dle.rae.es/vivir) y con [haber](https://www.rae.es/dpd/haber). Conserva la práctica previa de irregularidades y voseo; la ampliación no pretende cubrir todos los verbos irregulares del español.

Los ejercicios de reloj distinguen es la/son las y aceptan las variantes previstas de y cuarto/y quince y menos cuarto/menos quince. La consigna indica el modelo solicitado para que una expresión natural diferente no se evalúe como si fuera un error de concepto. Fuente de contraste: [RAE, hora](https://www.rae.es/dpd/hora).

Las pruebas de bloque conservan las dos preguntas iniciales de cada tema. Los ejercicios nuevos se añaden sin modificar las preguntas previas ni invalidar intentos guardados. Las actividades del entrenador no marcan automáticamente una lección como estudiada.

## Edición

En Redactiepanel, selecciona la ficha y abre Práctica. Puedes cambiar enunciados, respuestas aceptadas y explicaciones ES/NL. Los metadatos verb, person y tenseKey identifican las formas del entrenador. Si añades una nueva forma, conserva esos campos o usa como base un ejercicio equivalente. El profesorado puede seguir añadiendo preguntas sin esos metadatos: aparecerán en Completar y Elegir.

content/catalog.json es la fuente editable. scripts/expand-practice.py es una semilla editorial deliberada y aditiva. La compilación normal no la ejecuta, para evitar sobrescribir las revisiones del profesorado. El historial se conserva con las claves existentes.

## Corrección de la interfaz

El contenedor de la barra lateral es el único elemento sticky. La navegación interna vuelve al flujo normal y tiene una única columna explícita. En móvil cambia a una fila desplazable. El logo original se presenta arriba a la derecha sin recortarlo; el HTML autónomo lo lleva incrustado.

La brújula de la ruta usa el progreso real del perfil. Identifica bloque, tema y siguiente tarea. Los esquemas de reloj, posesivos, demostrativos, posición y pronombres responden a los controles del estudiante. El texto completo permanece accesible en acordeones. Las imágenes opcionales solo aparecen cuando el docente ha añadido una imagen real; ya no se muestran huecos vacíos.

## Verificación

Pruebas automatizadas de los 123 temas en español y neerlandés, perfiles, restauración, historial, acceso docente, filtros, cinco modalidades, feedback, repaso de errores, reloj y controles visuales. No se ha realizado una inspección visual en un navegador real en este entorno. Esa comprobación sigue siendo necesaria antes de afirmar que todos los tamaños y dispositivos se ven perfectamente.
