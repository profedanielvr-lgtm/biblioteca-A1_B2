# Segunda ampliación de B2 y seguimiento docente · 29 de octubre de 2026

## Vocabulario B2

Se incorporan cuatro mazos originales con veinte expresiones cada uno, total de 80 nuevas tarjetas, dedicados a sostenibilidad y medioambiente, condiciones laborales, información digital e investigación y resultados. El total de la biblioteca aumenta de 320 a 400 tarjetas, distribuidas en 24 mazos. El nivel B2 pasa de 40 a 120 tarjetas.

Cada tarjeta contiene expresión en español, equivalente contextual en neerlandés y un ejemplo bilingüe. Se conserva el ID de las 320 tarjetas anteriores. El inventario PCIC de nociones específicas B1–B2 respalda la selección de ámbitos; no atribuye automáticamente el nivel B2 a cada frase ni certifica frecuencia de uso. Las traducciones y ejemplos son originales, y deben someterse a revisión lingüística por hablantes expertos de español y neerlandés.

Fuente: https://cvc.cervantes.es/ensenanza/biblioteca_ele/plan_curricular/niveles/09_nociones_especificas_inventario_b1-b2.htm

## Informe voluntario del estudiante

En Progreso, los estudiantes con perfil pueden pulsar «Descargar mi informe». Se genera **localmente** un archivo JSON con un resumen de actividad durante los 30 días anteriores, sin enviar nada al profesor automáticamente.

Incluye código de perfil, fichas abiertas y estudiadas, número de respuestas de vocabulario y gramática, respuestas correctas, reconocimiento frente a producción asistida o independiente, intentos formativos, propuestas didácticas entregadas y ocho mazos más practicados.

No incluye respuestas literales, preguntas buscadas, registros de páginas visitadas, textos personales, notas ni borradores. Solo se cuenta actividad previamente registrada por la aplicación. No se interpreta como nivel MCER ni se incluye nombre completo. La descarga es una acción explícita, no un consentimiento institucional implícito.

## Administración docente

Administración permite abrir, **de manera local**, el archivo JSON compartido por el estudiante. El archivo no se carga al servidor de La biblioteca al abrirse. La visualización lo valida y comprueba tamaños, campos, recuentos y caracteres peligrosos.

La consulta existente de intentos de clase incorpora un botón de exportación de métricas agregadas en CSV, con códigos de estudiante, PIN, intentos, respuestas, aciertos y fechas. No contiene respuestas literales; se protege contra la interpretación de identificadores como fórmulas de Excel. Solo aparece tras obtener los datos con sesión docente autenticada.

Estos dos canales son distintos: los intentos de clase se recuperan de la API existente; el informe de aprendizaje requiere que el estudiante lo genere y lo comparta. No se ha habilitado un seguimiento centralizado de búsquedas, visitas ni navegación.

## Tratamiento de datos y límites

El acceso al historial por PIN no verifica la identidad institucional. Los archivos pueden contener códigos de estudiante, que siguen siendo datos personales o seudónimos cuando identifican a alguien. Antes de emplear los informes a escala de una titulación, Fontys debe definir finalidades, base jurídica, información a estudiantes, responsables, roles autorizados, plazo de conservación, borrado y medidas de seguridad. No debe asumirse que pedir permiso al estudiante constituye automáticamente una base jurídica válida en el contexto de relación docente y estudiante.

La aplicación no incluye todavía una política técnica de eliminación automática de los historiales preexistentes en D1/R2, y eso debe revisarse institucionalmente. No presentar el sistema como plenamente conforme al RGPD sin esa revisión.

Para referencia: https://autoriteitpersoonsgegevens.nl/themas/basis-avg/avg-algemeen/grondslagen-avg-uitgelegd y https://www.edpb.europa.eu/system/files/2026-04/edpb-summary-consent_en.pdf

## Validación requerida

Comprobar las pruebas de GitHub Actions, generar la edición HTML autónoma y el ZIP, verificar que aparecen los 24 mazos en ambas versiones y revisar la descarga e importación del informe en navegador real. Las pruebas DOM y Node no sustituyen una evaluación de accesibilidad, seguridad o el ensayo con estudiantes reales.
