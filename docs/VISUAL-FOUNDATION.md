# Primera entrega: base visual y compatibilidad

El registro opcional content/visual-resources.js enlaza recursos mediante los ID existentes. No modifica catalog.json, los mazos originales ni las claves de almacenamiento. Los perfiles anteriores siguen siendo válidos; consultar o manipular una representación no crea eventos de aprendizaje.

El piloto incluye F37 (concordancia con gustar), F50 (perspectiva de los pasados) y las vistas previas de los mazos rutina, aula y ciudad. Cada recurso incluye título ES/NL, versión, tipo de representación, ejemplos y explicación textual. No se añaden servicios, voces ni imágenes externas. SVG y HTML funcionan también en el archivo autónomo.

Ejecutar node scripts/visual-inventory.cjs actualiza docs/visual-inventory.json. interactivePilot indica que existe un componente nuevo; no certifica cobertura conceptual ni aprobación pedagógica. Los recursos anteriores permanecen disponibles y pendientes de auditoría. Antes de ampliar la cobertura hay que identificar los conceptos de cada ficha, comprobar accesibilidad y revisar sus ejemplos.

## Contrato de aprendizaje para las siguientes entregas

Se conservan los eventos inmutables review existentes: key, direction, domain, response, correct, help, mode, phase, elapsedMs y contentVersion. Reconocimiento, producción y ayuda deben derivarse conjuntamente de mode y help; phase identifica el contexto de la sesión, no el dominio. Los eventos antiguos sin metadatos nuevos no se reinterpretarán como transferencia ni como recuerdo diferido a varios días.

La próxima ampliación incorporará campos opcionales para contexto y modalidad con versión explícita. La medida de recuerdo independiente deberá considerar la primera respuesta, ausencia de ayuda y el intervalo desde la exposición previa, incluida la revelación de soluciones. Cambiar un ejemplo o navegar por una visualización no proporciona esas evidencias.

## Comprobación de entrega

Las pruebas de DOM verifican alternancia ES/NL, cambio de ejemplos, etiquetas SVG, navegación y conservación de evidencias y copias de perfil. El contraste del menú se calcula con los pares de colores explícitos y debe superar 4,5:1 en reposo y hover. La verificación visual en navegador real, teclado, móvil y alto contraste queda pendiente si el entorno no proporciona navegador; las pruebas de DOM no sustituyen esa revisión.

No se considera terminada la cobertura visual de las 123 fichas ni de las 80 tarjetas. Este lote crea la base y el piloto; vocabulario por sentidos, repaso avanzado, plantillas VO/MBO y métricas de impacto continúan en las siguientes entregas del plan.
