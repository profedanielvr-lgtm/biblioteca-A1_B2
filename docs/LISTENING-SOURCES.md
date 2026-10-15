# Banco de microescucha A2–B2

Verificación realizada el 15 de octubre de 2026. Seis grabaciones completas de frases del corpus Tatoeba, con dos preguntas por nivel. La clasificación corresponde a la demanda de la microtarea, no a una certificación MCER de la grabación ni a una prueba integral de comprensión oral.

## Derechos y procedencia

El audio de hayastan está publicado bajo CC BY 4.0. El texto de las seis frases pertenece a hayastan/Tatoeba bajo CC BY 2.0 Francia. La página individual de cada frase identifica al autor, la licencia del texto, el ID del audio, su locutor y la licencia del audio. Estos datos se contrastaron con el fichero oficial `sentences_with_audio.tar.bz2` descargado desde https://downloads.tatoeba.org/exports/sentences_with_audio.tar.bz2.

La página del locutor https://tatoeba.org/en/audio/of/hayastan confirma CC BY 4.0. La lista oficial https://tatoeba.org/en/sentences_lists/show/4141 documenta Argentina. No se atribuye una ciudad o una variedad regional más concreta.

Tatoeba describe su corpus de audio como grabaciones aportadas por voluntarios: https://en.wiki.tatoeba.org/articles/show/contribute-audio. No se ha generado voz artificial.

## Archivos

| Nivel | Frase y fuente | Audio ID | Duración medida | Demanda |
| --- | --- | --- | --- | --- |
| A2 | https://tatoeba.org/en/sentences/show/942383 | 48656 | 4,728 s | Frecuencia cotidiana |
| A2 | https://tatoeba.org/en/sentences/show/941424 | 48644 | 3,370 s | Modo de desplazamiento |
| B1 | https://tatoeba.org/en/sentences/show/1101962 | 63514 | 7,497 s | Señal observada e interpretación; evitar causas no mencionadas |
| B1 | https://tatoeba.org/en/sentences/show/1074148 | 58914 | 7,758 s | Relación causal entre dos ideas |
| B2 | https://tatoeba.org/en/sentences/show/1101096 | 63502 | 11,964 s | Atribución de una idea y distancia del hablante |
| B2 | https://tatoeba.org/en/sentences/show/1089877 | 59282 | 12,669 s | Alcance de ejemplos y diferencia entre definición y relación |

Las descargas se hicieron desde los enlaces individuales `/audio/download/ID` o desde la URL de audio documentada en la FAQ oficial: `https://audio.tatoeba.org/sentences/spa/ID_FRASE.mp3`. Se conservan los MP3 completos y sin modificación en `media/listening`. Cada objeto de `content/listening-extension.json` incluye SHA-256, tamaño, duración, atribución, enlaces y una copia base64 para la edición autocontenida.

## Verificación técnica y límites

Los seis MP3 se decodificaron sin errores con ffmpeg. Las duraciones se midieron con ffprobe. Se comprobó que cada pista textual aparece literalmente en la transcripción y que las tres opciones de cada pregunta son diferentes. Las transcripciones proceden del texto exacto asociado por Tatoeba a cada grabación; no se ha realizado comparación humana auditiva ni se afirma haberla realizado. Por eso `auditoryQA` permanece en `false`.

Son frases de corpus leídas en voz alta, no conversaciones espontáneas ni muestras multimedia juveniles. Se evitan presentaciones de locutores y consignas porque cada archivo representa una única frase. Estas microtareas permiten práctica focalizada, pero el banco necesita ampliarse con textos más largos y más locutores para evaluar comprensión sostenida. La diversidad de locutores de fonética procede del banco A1 existente; estas seis incorporaciones añaden una cuarta voz documentada.
