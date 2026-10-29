(function(root){'use strict';
const inventory='https://cvc.cervantes.es/ensenanza/biblioteca_ele/plan_curricular/niveles/09_nociones_especificas_inventario_',a1=inventory+'a1-a2.htm',b1=inventory+'b1-b2.htm';
// Original bilingual examples; thematic alignment with PCIC, not official translations or certified CEFR assignment.
const specs=[['hogar','A2','La vivienda','Wonen',10,`
la habitación|de kamer|La habitación tiene una ventana.|De kamer heeft een raam.
la cocina|de keuken|Cocinamos en la cocina.|We koken in de keuken.
el salón|de woonkamer|Leemos en el salón.|We lezen in de woonkamer.
el baño|de badkamer|El baño está arriba.|De badkamer is boven.
el dormitorio|de slaapkamer|El dormitorio es pequeño.|De slaapkamer is klein.
la puerta|de deur|Cierra la puerta, por favor.|Doe de deur dicht, alsjeblieft.
la ventana|het raam|Abro la ventana cada mañana.|Ik open elke ochtend het raam.
el suelo|de vloer|El suelo está limpio.|De vloer is schoon.
la pared|de muur|La pared es blanca.|De muur is wit.
el techo|het plafond|La lámpara cuelga del techo.|De lamp hangt aan het plafond.
la escalera|de trap|Subimos por la escalera.|We gaan via de trap naar boven.
el ascensor|de lift|El ascensor no funciona.|De lift werkt niet.
la llave|de sleutel|No encuentro la llave.|Ik kan de sleutel niet vinden.
el alquiler|de huur|Pagamos el alquiler este mes.|We betalen deze maand de huur.
el vecino|de buurman|El vecino vive al lado.|De buurman woont hiernaast.
la vecina|de buurvrouw|La vecina tiene un perro.|De buurvrouw heeft een hond.
la calefacción|de verwarming|La calefacción está encendida.|De verwarming staat aan.
la nevera|de koelkast|La leche está en la nevera.|De melk staat in de koelkast.
la lavadora|de wasmachine|La lavadora está en el baño.|De wasmachine staat in de badkamer.
el jardín|de tuin|Los niños juegan en el jardín.|De kinderen spelen in de tuin.`],['salud','A2','La salud y los cuidados','Gezondheid en verzorging',13,`
la cabeza|het hoofd|Me duele la cabeza.|Ik heb hoofdpijn.
la espalda|de rug|Me duele la espalda.|Ik heb rugpijn.
la mano|de hand|Me lavo la mano.|Ik was mijn hand.
el pie|de voet|Me duele el pie derecho.|Mijn rechtervoet doet pijn.
la garganta|de keel|Me duele la garganta.|Ik heb keelpijn.
el estómago|de maag|Me duele el estómago.|Mijn maag doet pijn.
la fiebre|de koorts|Tengo fiebre desde ayer.|Ik heb sinds gisteren koorts.
la tos|de hoest|La tos no me deja dormir.|Door de hoest kan ik niet slapen.
el resfriado|de verkoudheid|Tengo un resfriado.|Ik ben verkouden.
el dolor|de pijn|El dolor empieza por la noche.|De pijn begint 's avonds.
la farmacia|de apotheek|Voy a la farmacia.|Ik ga naar de apotheek.
el medicamento|het geneesmiddel|Tomo el medicamento con agua.|Ik neem het geneesmiddel met water in.
la receta|het recept|El médico me da una receta.|De arts geeft me een recept.
la cita médica|de afspraak bij de arts|Tengo una cita médica mañana.|Ik heb morgen een afspraak bij de arts.
el enfermero|de verpleegkundige|El enfermero trabaja en el hospital.|De verpleegkundige werkt in het ziekenhuis.
el hospital|het ziekenhuis|Mi hermana está en el hospital.|Mijn zus ligt in het ziekenhuis.
la herida|de wond|La herida es pequeña.|De wond is klein.
la venda|het verband|Necesito una venda para el brazo.|Ik heb verband nodig voor mijn arm.
descansar|uitrusten|Necesito descansar un poco.|Ik moet even uitrusten.
cuidarse|voor zichzelf zorgen|Es importante cuidarse.|Het is belangrijk om voor jezelf te zorgen.`],['transporte','A2','Los desplazamientos','Onderweg',14,`
el andén|het perron|El tren sale del andén dos.|De trein vertrekt van perron twee.
la parada|de halte|Espero en la parada.|Ik wacht bij de halte.
el retraso|de vertraging|El tren tiene retraso.|De trein heeft vertraging.
el horario|de dienstregeling|Consulto el horario del autobús.|Ik bekijk de dienstregeling van de bus.
el trayecto|de rit|El trayecto dura media hora.|De rit duurt een halfuur.
el destino|de bestemming|El destino está cerca.|De bestemming is dichtbij.
el equipaje|de bagage|Llevo poco equipaje.|Ik heb weinig bagage bij me.
la maleta|de koffer|La maleta pesa diez kilos.|De koffer weegt tien kilo.
el pasaporte|het paspoort|Mi pasaporte está en la mochila.|Mijn paspoort zit in de rugzak.
la reserva|de reservering|Tengo una reserva a mi nombre.|Er staat een reservering op mijn naam.
el asiento|de zitplaats|Este asiento está libre.|Deze zitplaats is vrij.
la ida|de heenreis|La ida es el lunes.|De heenreis is op maandag.
la vuelta|de terugreis|La vuelta es el viernes.|De terugreis is op vrijdag.
el transbordo|de overstap|Tengo que hacer un transbordo.|Ik moet overstappen.
la salida|het vertrek|La salida está prevista a las ocho.|Het vertrek staat gepland om acht uur.
la llegada|de aankomst|La llegada es a las nueve.|De aankomst is om negen uur.
la carretera|de weg|La carretera está cerrada.|De weg is afgesloten.
el atasco|de file|Hay un atasco en la carretera.|Er staat een file op de weg.
el cruce|het kruispunt|Gira a la derecha en el cruce.|Sla rechtsaf bij het kruispunt.
el semáforo|het verkeerslicht|El semáforo está en rojo.|Het verkeerslicht staat op rood.`],['empleo','B1','El trabajo y las profesiones','Werk en beroepen',7,`
el sueldo|het salaris|El sueldo se paga cada mes.|Het salaris wordt elke maand betaald.
el contrato|het contract|Firmo el contrato mañana.|Ik onderteken morgen het contract.
la jornada|de werkdag|Mi jornada empieza a las nueve.|Mijn werkdag begint om negen uur.
el turno|de dienst|Trabajo en el turno de noche.|Ik werk in de nachtdienst.
la vacante|de vacature|La empresa anuncia una vacante.|Het bedrijf plaatst een vacature.
la entrevista|het sollicitatiegesprek|Tengo una entrevista de trabajo.|Ik heb een sollicitatiegesprek.
el currículum|het cv|Envío mi currículum a la empresa.|Ik stuur mijn cv naar het bedrijf.
la experiencia|de ervaring|Tengo experiencia en ventas.|Ik heb ervaring in de verkoop.
la formación|de opleiding|La formación dura dos años.|De opleiding duurt twee jaar.
la reunión|de vergadering|La reunión empieza pronto.|De vergadering begint zo.
el plazo|de termijn|El plazo termina el viernes.|De termijn loopt vrijdag af.
la tarea|de taak|Esta tarea requiere atención.|Deze taak vraagt aandacht.
el equipo|het team|Trabajo con un equipo pequeño.|Ik werk in een klein team.
la empresa|het bedrijf|La empresa vende bicicletas.|Het bedrijf verkoopt fietsen.
la oficina|het kantoor|Voy a la oficina en tren.|Ik ga met de trein naar kantoor.
el cliente|de klant|El cliente hace una pregunta.|De klant stelt een vraag.
la solicitud|de sollicitatie|He enviado mi solicitud de empleo.|Ik heb mijn sollicitatie verstuurd.
el permiso|het verlof|Pido permiso para salir antes.|Ik vraag verlof om eerder weg te gaan.
el descanso|de pauze|Tenemos diez minutos de descanso.|We hebben tien minuten pauze.
la responsabilidad|de verantwoordelijkheid|Esta tarea es mi responsabilidad.|Deze taak valt onder mijn verantwoordelijkheid.`],['naturaleza','B1','La naturaleza y el entorno','Natuur en omgeving',20,`
el bosque|het bos|Caminamos por el bosque.|We wandelen door het bos.
el río|de rivier|El río pasa por la ciudad.|De rivier stroomt door de stad.
el lago|het meer|Nadamos en el lago.|We zwemmen in het meer.
la montaña|de berg|La montaña tiene nieve.|Er ligt sneeuw op de berg.
la costa|de kust|Pasamos el verano en la costa.|We brengen de zomer door aan de kust.
la isla|het eiland|La isla es pequeña.|Het eiland is klein.
el campo|het platteland|Mis abuelos viven en el campo.|Mijn grootouders wonen op het platteland.
la lluvia|de regen|La lluvia empieza por la tarde.|De regen begint in de middag.
el viento|de wind|El viento sopla con fuerza.|De wind waait hard.
la sequía|de droogte|La sequía afecta a los cultivos.|De droogte treft de gewassen.
la inundación|de overstroming|La inundación causa daños.|De overstroming veroorzaakt schade.
el residuo|het afval|Este residuo se puede reciclar.|Dit afval kan worden gerecycled.
el reciclaje|de recycling|El reciclaje reduce los residuos.|Recycling vermindert de hoeveelheid afval.
la contaminación|de vervuiling|La contaminación afecta al río.|De vervuiling tast de rivier aan.
el ahorro|de besparing|El ahorro de agua es importante.|Waterbesparing is belangrijk.
la energía|de energie|La casa usa energía solar.|Het huis gebruikt zonne-energie.
el recurso|de hulpbron|El agua es un recurso limitado.|Water is een beperkte hulpbron.
la especie|de soort|Esta especie vive en el bosque.|Deze soort leeft in het bos.
el paisaje|het landschap|El paisaje cambia en otoño.|Het landschap verandert in de herfst.
proteger|beschermen|Debemos proteger la naturaleza.|We moeten de natuur beschermen.`],['medios','B1','Los medios y la comunicación','Media en communicatie',9,`
la noticia|het nieuwsbericht|Leo una noticia sobre educación.|Ik lees een nieuwsbericht over onderwijs.
el titular|de kop|El titular resume la noticia.|De kop vat het nieuwsbericht samen.
la fuente|de bron|Comprueba la fuente de la noticia.|Controleer de bron van het nieuwsbericht.
el reportaje|de reportage|El reportaje trata de la ciudad.|De reportage gaat over de stad.
la encuesta|de enquête|Respondo a una encuesta.|Ik vul een enquête in.
el dato|het gegeven|Este dato necesita una fuente.|Dit gegeven heeft een bron nodig.
la opinión|de mening|Es mi opinión personal.|Dat is mijn persoonlijke mening.
el hecho|het feit|Hay que comprobar este hecho.|Dit feit moet worden gecontroleerd.
el anuncio|de advertentie|Veo un anuncio en el periódico.|Ik zie een advertentie in de krant.
la pantalla|het scherm|La pantalla está apagada.|Het scherm staat uit.
el enlace|de link|Abre el enlace del mensaje.|Open de link in het bericht.
la contraseña|het wachtwoord|No compartas tu contraseña.|Deel je wachtwoord niet.
el archivo|het bestand|Guarda el archivo en una carpeta.|Sla het bestand op in een map.
la carpeta|de map|Esta carpeta contiene fotos.|Deze map bevat foto's.
la descarga|de download|La descarga tarda un minuto.|De download duurt een minuut.
el mensaje|het bericht|He recibido tu mensaje.|Ik heb je bericht ontvangen.
la llamada|het telefoongesprek|La llamada dura diez minutos.|Het telefoongesprek duurt tien minuten.
la cobertura|het bereik|Aquí no hay cobertura móvil.|Hier is geen mobiel bereik.
el usuario|de gebruiker|El usuario puede cambiar el idioma.|De gebruiker kan de taal wijzigen.
compartir|delen|Quiero compartir esta noticia.|Ik wil dit nieuwsbericht delen.`],['compras','A2','Las compras y los pagos','Winkelen en betalen',12,`
el precio|de prijs|El precio incluye el impuesto.|De prijs is inclusief belasting.
la talla|de kledingmaat|¿Tienes esta camisa en mi talla?|Heb je dit overhemd in mijn maat?
el tamaño|de grootte|El tamaño de la caja es adecuado.|De grootte van de doos is geschikt.
el descuento|de korting|Esta tienda ofrece un descuento.|Deze winkel biedt korting aan.
la oferta|de aanbieding|El café está de oferta.|De koffie is in de aanbieding.
el recibo|de bon|Guarda el recibo de la compra.|Bewaar de bon van je aankoop.
la devolución|het terugbrengen|La devolución del producto es gratuita.|Het terugbrengen van het product is gratis.
el cambio|het wisselgeld|Aquí tiene su cambio.|Hier is uw wisselgeld.
el efectivo|het contante geld|Prefiero pagar en efectivo.|Ik betaal liever contant.
la tarjeta|de betaalpas|Pago con tarjeta.|Ik betaal met mijn betaalpas.
la caja|de kassa|Hay una cola en la caja.|Er staat een rij bij de kassa.
la cola|de rij|Espero mi turno en la cola.|Ik wacht op mijn beurt in de rij.
el probador|de paskamer|El probador está al fondo.|De paskamer is achterin.
la prenda|het kledingstuk|Esta prenda es de algodón.|Dit kledingstuk is van katoen.
la etiqueta|het etiket|Lee la etiqueta antes de lavar.|Lees het etiket voordat je het wast.
la bolsa|de tas|Llevo mi propia bolsa.|Ik neem mijn eigen tas mee.
el pedido|de bestelling|El pedido llega mañana.|De bestelling komt morgen aan.
el envío|de verzending|El envío es gratuito.|De verzending is gratis.
agotado|uitverkocht|El producto está agotado.|Het product is uitverkocht.
probarse|passen|Quiero probarme esta chaqueta.|Ik wil deze jas passen.`],['relaciones','A2','Las relaciones y los sentimientos','Relaties en gevoelens',4,`
la amistad|de vriendschap|Nuestra amistad es importante.|Onze vriendschap is belangrijk.
la pareja|de partner|Mi pareja trabaja aquí.|Mijn partner werkt hier.
el compañero|de collega|Mi compañero trabaja conmigo.|Mijn collega werkt met mij samen.
la compañera|de klasgenoot|Mi compañera se sienta a mi lado en clase.|Mijn klasgenoot zit naast me in de les.
el invitado|de gast|El invitado llega a las seis.|De gast komt om zes uur.
la invitación|de uitnodiging|Gracias por la invitación.|Bedankt voor de uitnodiging.
el cumpleaños|de verjaardag|Mi cumpleaños es en mayo.|Mijn verjaardag is in mei.
el regalo|het cadeau|Tengo un regalo para ti.|Ik heb een cadeau voor je.
la confianza|het vertrouwen|La confianza crece con el tiempo.|Het vertrouwen groeit met de tijd.
el acuerdo|de afspraak|Tenemos un acuerdo sobre los horarios.|We hebben een afspraak over de tijden.
la discusión|de ruzie|La discusión termina con una disculpa.|De ruzie eindigt met een verontschuldiging.
la disculpa|de verontschuldiging|Acepto tu disculpa.|Ik accepteer je verontschuldiging.
la alegría|de vreugde|La noticia me da alegría.|Het nieuws maakt me blij.
la tristeza|het verdriet|Siento tristeza por la despedida.|Ik voel verdriet door het afscheid.
el miedo|de angst|Tengo miedo a las alturas.|Ik heb hoogtevrees.
la vergüenza|de schaamte|Me da vergüenza hablar en público.|Ik schaam me om in het openbaar te spreken.
la sorpresa|de verrassing|La fiesta es una sorpresa.|Het feest is een verrassing.
la paciencia|het geduld|Gracias por tu paciencia.|Bedankt voor je geduld.
preocuparse|zich zorgen maken|Me preocupo por mi amigo.|Ik maak me zorgen om mijn vriend.
llevarse bien|goed met elkaar kunnen opschieten|Nos llevamos bien.|We kunnen goed met elkaar opschieten.`]];

// Ampliación original de 80 tarjetas. La referencia indica el área temática, no
// que cada palabra ni cada ejemplo estén certificados individualmente por el PCIC.
specs.push(
['comida-fuera','A1','Comer fuera','Uit eten gaan','5',`
el restaurante|het restaurant|El restaurante abre a las ocho.|Het restaurant gaat om acht uur open.
la cafetería|het café|Nos vemos en la cafetería.|We zien elkaar in het café.
la mesa|de tafel|La mesa está junto a la ventana.|De tafel staat naast het raam.
la carta|de menukaart|¿Nos trae la carta, por favor?|Kunt u ons de menukaart brengen?
el camarero|de ober|El camarero viene enseguida.|De ober komt zo.
la camarera|de serveerster|La camarera trae el agua.|De serveerster brengt het water.
el plato|het gerecht|Este plato lleva arroz.|In dit gerecht zit rijst.
la bebida|het drankje|¿Qué bebida quieres?|Welk drankje wil je?
el agua sin gas|water zonder prik|Quiero agua sin gas.|Ik wil water zonder prik.
el zumo de naranja|het sinaasappelsap|Tomo un zumo de naranja.|Ik drink een glas sinaasappelsap.
el pan|het brood|¿Hay pan en la mesa?|Ligt er brood op tafel?
el queso|de kaas|Me gusta el queso.|Ik houd van kaas.
el arroz|de rijst|Comemos arroz con verduras.|We eten rijst met groenten.
la ensalada|de salade|Pido una ensalada.|Ik bestel een salade.
la sopa|de soep|La sopa está caliente.|De soep is warm.
la cuenta|de rekening|La cuenta, por favor.|De rekening, alstublieft.
pedir|bestellen|Voy a pedir una sopa.|Ik ga soep bestellen.
tener hambre|honger hebben|Tengo hambre.|Ik heb honger.
tener sed|dorst hebben|Tengo sed.|Ik heb dorst.
¡Buen provecho!|Eet smakelijk!|¡Buen provecho a todos!|Eet smakelijk allemaal!`],
['tiempo-atmosferico','A1','El tiempo y las estaciones','Het weer en de seizoenen','20.4',`
la primavera|de lente|En primavera hay flores.|In de lente zijn er bloemen.
el verano|de zomer|En verano hace calor.|In de zomer is het warm.
el otoño|de herfst|En otoño llueve mucho.|In de herfst regent het veel.
el invierno|de winter|En invierno hace frío.|In de winter is het koud.
hace sol|het is zonnig|Hoy hace sol.|Vandaag is het zonnig.
hace frío|het is koud|Por la mañana hace frío.|In de ochtend is het koud.
hace calor|het is warm|En julio hace calor.|In juli is het warm.
hace viento|het waait|Hoy hace mucho viento.|Vandaag waait het hard.
llover|regenen|En otoño suele llover.|In de herfst regent het vaak.
nevar|sneeuwen|En las montañas puede nevar.|In de bergen kan het sneeuwen.
la lluvia|de regen|La lluvia empieza ahora.|Het begint nu te regenen.
la nieve|de sneeuw|La nieve cubre la calle.|De sneeuw bedekt de straat.
la nube|de wolk|Hay una nube grande.|Er is een grote wolk.
el cielo|de lucht|El cielo está azul.|De lucht is blauw.
el paraguas|de paraplu|Llevo un paraguas.|Ik heb een paraplu bij me.
la temperatura|de temperatuur|La temperatura es baja.|De temperatuur is laag.
el grado|de graad|Estamos a diez grados.|Het is tien graden.
el pronóstico|de weersverwachting|Miro el pronóstico para mañana.|Ik bekijk de weersverwachting voor morgen.
estar nublado|bewolkt zijn|Hoy está nublado.|Vandaag is het bewolkt.
el tiempo|het weer|¿Qué tiempo hace hoy?|Wat voor weer is het vandaag?`],
['aprendizaje','B1','Estudiar y aprender','Studeren en leren','6.4',`
la asignatura|het schoolvak|Mi asignatura favorita es español.|Mijn favoriete schoolvak is Spaans.
la beca|de studiebeurs|Solicité una beca para estudiar.|Ik heb een studiebeurs aangevraagd.
la matrícula|de inschrijving|La matrícula empieza en junio.|De inschrijving begint in juni.
el plazo|de termijn|El plazo termina el viernes.|De termijn loopt vrijdag af.
entregar un trabajo|een opdracht inleveren|Tengo que entregar un trabajo mañana.|Ik moet morgen een opdracht inleveren.
aprobar un examen|slagen voor een examen|Quiero aprobar el examen oral.|Ik wil slagen voor het mondelinge examen.
suspender un examen|zakken voor een examen|No quiero suspender el examen.|Ik wil niet zakken voor het examen.
la recuperación|de herkansing|Tengo una recuperación la semana que viene.|Ik heb volgende week een herkansing.
la calificación|het cijfer|Todavía no sé mi calificación.|Ik weet mijn cijfer nog niet.
el criterio|het criterium|El profesor explica el criterio de evaluación.|De docent legt het beoordelingscriterium uit.
el objetivo de aprendizaje|het leerdoel|Mi objetivo de aprendizaje es hablar con más fluidez.|Mijn leerdoel is vloeiender spreken.
la explicación|de uitleg|Necesito otra explicación.|Ik heb nog een uitleg nodig.
el resumen|de samenvatting|Escribo un resumen del capítulo.|Ik schrijf een samenvatting van het hoofdstuk.
tomar apuntes|aantekeningen maken|Tomo apuntes durante la clase.|Ik maak aantekeningen tijdens de les.
repasar|herhalen|Repaso las palabras antes de la prueba.|Ik herhaal de woorden voor de toets.
la duda|de vraag|Tengo una duda sobre esta regla.|Ik heb een vraag over deze regel.
la estrategia|de strategie|Pruebo otra estrategia de aprendizaje.|Ik probeer een andere leerstrategie.
el avance|de vooruitgang|Noto un avance en mi expresión oral.|Ik merk vooruitgang in mijn spreekvaardigheid.
la autoevaluación|de zelfevaluatie|Completo una autoevaluación después de la actividad.|Ik vul na de activiteit een zelfevaluatie in.
aprender de memoria|uit het hoofd leren|No basta con aprender las reglas de memoria.|Het is niet genoeg om de regels uit het hoofd te leren.`],
['debate-critico','B2','Argumentar y evaluar información','Argumenteren en informatie beoordelen','9.1',`
el argumento|het argument|Su argumento se basa en dos ejemplos.|Zijn argument is gebaseerd op twee voorbeelden.
la afirmación|de bewering|Debemos comprobar esa afirmación.|We moeten die bewering controleren.
la hipótesis|de hypothese|La hipótesis necesita más pruebas.|De hypothese heeft meer bewijs nodig.
la evidencia|het bewijsmateriaal|La evidencia disponible no es suficiente.|Het beschikbare bewijsmateriaal is niet voldoende.
la fuente fiable|de betrouwbare bron|Busco una fuente fiable antes de citar.|Ik zoek een betrouwbare bron voordat ik citeer.
la perspectiva|het perspectief|Analizamos el problema desde otra perspectiva.|We bekijken het probleem vanuit een ander perspectief.
el sesgo|de vertekening|El estudio puede contener un sesgo.|Het onderzoek kan een vertekening bevatten.
la contradicción|de tegenstrijdigheid|Hay una contradicción entre las dos versiones.|Er is een tegenstrijdigheid tussen de twee versies.
matizar|nuanceren|Conviene matizar esa conclusión.|Het is verstandig die conclusie te nuanceren.
cuestionar|ter discussie stellen|Podemos cuestionar esa interpretación.|We kunnen die interpretatie ter discussie stellen.
fundamentar|onderbouwen|Hay que fundamentar la propuesta con datos.|We moeten het voorstel met gegevens onderbouwen.
rebatir|weerleggen|Intentó rebatir el argumento con otro ejemplo.|Hij probeerde het argument met een ander voorbeeld te weerleggen.
contrastar fuentes|bronnen vergelijken|Antes de publicar, contrastamos las fuentes.|Voor publicatie vergelijken we de bronnen.
llegar a una conclusión|tot een conclusie komen|Tras el debate llegamos a una conclusión.|Na het debat komen we tot een conclusie.
por una parte|enerzijds|Por una parte, el plan ahorra tiempo.|Enerzijds bespaart het plan tijd.
por otra parte|anderzijds|Por otra parte, requiere más recursos.|Anderzijds zijn er meer middelen voor nodig.
no obstante|desondanks|La propuesta es cara; no obstante, resulta viable.|Het voorstel is duur, maar desondanks uitvoerbaar.
aun así|toch|Aun así, debemos escuchar otras opiniones.|Toch moeten we naar andere meningen luisteren.
en cierta medida|tot op zekere hoogte|Estoy de acuerdo en cierta medida.|Ik ben het er tot op zekere hoogte mee eens.
a grandes rasgos|in grote lijnen|A grandes rasgos, compartimos el diagnóstico.|In grote lijnen delen we de analyse.`]
);
for(const [slug,level,es,nl,section,text]of specs){const id='v-'+slug,reference={title:'Instituto Cervantes (2006). Plan curricular: nociones específicas, apartado '+section,url:['B1','B2'].includes(level)?b1:a1};root.BIBLIO_VOCABULARY.decks.push({id,version:1,level,title:{es,nl},goal:{es:'Comprender y usar vocabulario en situaciones cotidianas.',nl:'Woorden in dagelijkse situaties begrijpen en gebruiken.'},topic:slug,source:'Selección y ejemplos originales de La biblioteca. Organización temática contrastada con el PCIC; niveles orientativos y traducciones contextuales propias, no oficiales.',references:[reference,{title:'RAE y ASALE. Diccionario de la lengua española',url:'https://dle.rae.es/'}],cards:text.trim().split('\n').map((line,i)=>{const [es,nl,exes,exnl]=line.split('|');return {id:id+'-'+(i+1),version:1,contextId:id+'-'+(i+1)+':example:1',senseId:id+'-'+(i+1)+':sense:1',term:{es,nl},example:{es:exes,nl:exnl},accepted:{es:[es],nl:[nl]},audio:{es:null,nl:null},sourceRefs:[reference],usage:{es:'Traducción para el sentido del ejemplo; otras acepciones pueden tener otra traducción.',nl:'Deze vertaling past bij de voorbeeldzin. Andere betekenissen kunnen een andere vertaling hebben.'}};})});}
})(typeof window!=='undefined'?window:globalThis);
