# Corrección del conjugador de 100 verbos · 29 de octubre de 2026

## Qué había en la versión pública

El banco de 100 verbos seguía presente en `content/verbs.js`. El acceso `#conjugador` sorteaba un verbo distinto mediante un botón único «Siguiente», junto a una persona gramatical. No permitía filtrar ni ejercitar en una misma actividad todas las personas disponibles. La ficha de cada verbo (`#verbos/infinitivo`) tenía un ejercicio individual distinto y no se debe confundir con el conjugador global.

No se ha comprobado que esas funciones más amplias hayan estado publicadas previamente; esta versión añade lo solicitado sobre el módulo existente.

## Funciones ahora disponibles

En el conjugador `#conjugador`, el usuario puede filtrar los 100 verbos según su regularidad morfológica en presente y según las terminaciones ar, er e ir, incluidas las formas reflexivas. También puede escoger una persona gramatical inicial o dejarla aleatoria.

La modalidad «Una persona» presenta una frase y pide conjugarla. La modalidad «Conjugación completa» permite escribir todas las formas disponibles para el verbo seleccionado y corregirlas conjuntamente. Para `gustar`, `costar`, `ocurrir` y `existir` se conservan las personas terceras de los ejemplos construidos para la actividad; se explica expresamente que esta práctica no representa el paradigma morfológico entero de seis personas.

El botón «Cambiar de persona (mismo verbo)» evita repetir la persona anterior, conserva el infinitivo y permite seguir practicando antes o después de responder. Si el estudiante estaba en modalidad completa, cambia a modalidad individual para practicar la nueva persona.

El botón «Siguiente verbo» selecciona otro verbo de los que cumplen los filtros, sin repetir el infinitivo anterior cuando hay al menos dos candidatos. Si el filtro deja uno solo, se desactiva este botón y se indica que hay que ampliar la selección.

Se mantienen el audio, la reproducción de las formas y ejemplos correctos, el feedback de errores, la exigencia de tildes, los datos del perfil cuando existe y la posibilidad de usar la aplicación sin perfil. Consultar una solución no se considera una respuesta independiente.

## Límite real de los tiempos

La base actual contiene únicamente paradigmas completos del presente de indicativo. No es correcto añadir un selector de pretérito perfecto, imperfecto, indefinido, futuro, condicional o subjuntivo sin incorporar y revisar previamente sus formas y contextos. El conjugador indica explícitamente el único tiempo disponible, sin fingir cobertura de los demás.

La lista de 100 verbos es una selección didáctica de verbos frecuentes, no un ranking de corpus con frecuencia acreditada.

## Comprobación

Las pruebas automatizadas comprueban el banco de 100 verbos, la clasificación regular e irregular, los filtros, ambas modalidades, la navegación entre verbos sin repetir, el cambio de persona conservando el infinitivo y el funcionamiento de la interfaz en español y neerlandés.

No se deben confundir las pruebas automatizadas con una revisión visual en un navegador real. El HTML autónomo y el archivo ZIP deben regenerarse mediante `npm run build` para incluir la versión corregida.
