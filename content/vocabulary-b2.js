(function(root){'use strict';
const url='https://cvc.cervantes.es/ensenanza/biblioteca_ele/plan_curricular/niveles/09_nociones_especificas_inventario_b1-b2.htm';
// Contenido y traducciones originales. PCIC apoya la organización por ámbitos y no certifica cada expresión B2.
const specs=[
['medioambiente','Sostenibilidad y medioambiente','Duurzaamheid en milieu','20.7',`
la huella ecológica|de ecologische voetafdruk|Queremos reducir nuestra huella ecológica.|We willen onze ecologische voetafdruk verkleinen.
las emisiones contaminantes|de vervuilende uitstoot|Las emisiones contaminantes han disminuido.|De vervuilende uitstoot is afgenomen.
el calentamiento global|de opwarming van de aarde|El calentamiento global afecta a los océanos.|De opwarming van de aarde beïnvloedt de oceanen.
la escasez de agua|het watertekort|La escasez de agua obliga a adaptar los cultivos.|Het watertekort dwingt tot aanpassing van gewassen.
las energías renovables|de hernieuwbare energiebronnen|Las energías renovables ganan terreno.|Hernieuwbare energiebronnen winnen terrein.
el consumo responsable|bewust consumeren|El consumo responsable puede reducir residuos.|Bewust consumeren kan afval verminderen.
la biodiversidad|de biodiversiteit|La biodiversidad de la región está amenazada.|De biodiversiteit van de regio wordt bedreigd.
el ecosistema|het ecosysteem|Este ecosistema es especialmente frágil.|Dit ecosysteem is bijzonder kwetsbaar.
la especie en peligro|de bedreigde diersoort|Esta especie en peligro necesita protección.|Deze bedreigde diersoort heeft bescherming nodig.
el desperdicio alimentario|de voedselverspilling|La campaña pretende reducir el desperdicio alimentario.|De campagne wil voedselverspilling verminderen.
reutilizar|hergebruiken|Podemos reutilizar los envases.|We kunnen de verpakkingen hergebruiken.
la recogida selectiva|het gescheiden inzamelen|La recogida selectiva facilita el reciclaje.|Gescheiden inzamelen maakt recyclen gemakkelijker.
el vertedero|de stortplaats|Los residuos acaban en el vertedero.|Het afval belandt op de stortplaats.
la gestión de residuos|het afvalbeheer|El municipio revisará la gestión de residuos.|De gemeente gaat het afvalbeheer herzien.
la contaminación acústica|de geluidsoverlast|La contaminación acústica afecta al descanso.|Geluidsoverlast verstoort de nachtrust.
la deforestación|de ontbossing|La deforestación amenaza numerosas especies.|Ontbossing bedreigt veel soorten.
el recurso natural|de natuurlijke hulpbron|El agua es un recurso natural limitado.|Water is een beperkte natuurlijke hulpbron.
la medida preventiva|de preventieve maatregel|Proponen una medida preventiva contra incendios.|Ze stellen een preventieve maatregel tegen branden voor.
mitigar los efectos|de gevolgen beperken|Estas acciones pueden mitigar los efectos de la sequía.|Deze acties kunnen de gevolgen van de droogte beperken.
la economía circular|de circulaire economie|La economía circular promueve la reutilización.|De circulaire economie stimuleert hergebruik.`],
['empleo-avanzado','Trabajo y condiciones laborales','Werk en arbeidsvoorwaarden','7.3',`
la jornada laboral|de werkdag|La jornada laboral termina a las cinco.|De werkdag eindigt om vijf uur.
el convenio colectivo|de collectieve arbeidsovereenkomst|El convenio colectivo regula las condiciones laborales.|De collectieve arbeidsovereenkomst regelt de arbeidsvoorwaarden.
la contratación|het aannemen van personeel|La contratación de personal se ha ralentizado.|Het aannemen van personeel is vertraagd.
el proceso de selección|de sollicitatieprocedure|El proceso de selección dura varias semanas.|De sollicitatieprocedure duurt enkele weken.
el puesto de trabajo|de functie|El puesto de trabajo exige experiencia.|De functie vereist ervaring.
la plantilla|het personeelsbestand|La plantilla ha crecido este trimestre.|Het personeelsbestand is dit kwartaal gegroeid.
el ascenso|de promotie|Consiguió un ascenso después de dos años.|Na twee jaar kreeg hij promotie.
el despido|het ontslag|El comité discutió el despido del trabajador.|De commissie besprak het ontslag van de werknemer.
la indemnización|de vergoeding|Recibió una indemnización tras el despido.|Hij ontving na zijn ontslag een vergoeding.
la baja laboral|het ziekteverlof|Está de baja laboral desde el lunes.|Hij is sinds maandag met ziekteverlof.
conciliar trabajo y familia|werk en gezin combineren|Conciliar trabajo y familia no siempre resulta fácil.|Werk en gezin combineren is niet altijd eenvoudig.
la sobrecarga de trabajo|de werkoverbelasting|La sobrecarga de trabajo afecta al equipo.|De werkoverbelasting heeft gevolgen voor het team.
el contrato indefinido|het vaste contract|Busca un contrato indefinido.|Zij zoekt een vast contract.
el contrato temporal|het tijdelijke contract|Le ofrecieron un contrato temporal.|Ze boden hem een tijdelijk contract aan.
la remuneración|de beloning|La remuneración depende de la experiencia.|De beloning hangt af van de ervaring.
el derecho laboral|het arbeidsrecht|El sindicato asesora sobre derecho laboral.|De vakbond adviseert over arbeidsrecht.
el sindicato|de vakbond|El sindicato representa a los trabajadores.|De vakbond vertegenwoordigt de werknemers.
negociar condiciones|over voorwaarden onderhandelen|Queremos negociar condiciones más justas.|We willen over eerlijkere voorwaarden onderhandelen.
el teletrabajo|het thuiswerken|El teletrabajo requiere acuerdos claros.|Thuiswerken vraagt om duidelijke afspraken.
la formación continua|de bijscholing|La formación continua mejora las oportunidades laborales.|Bijscholing vergroot de kansen op de arbeidsmarkt.`],
['informacion-digital','Medios e información digital','Media en digitale informatie','9.1',`
el titular sensacionalista|de sensationele krantenkop|El titular sensacionalista exagera los hechos.|De sensationele krantenkop overdrijft de feiten.
la cobertura mediática|de berichtgeving|La cobertura mediática fue muy amplia.|Er was veel berichtgeving in de media.
el corresponsal|de correspondent|El corresponsal informa desde el extranjero.|De correspondent doet verslag vanuit het buitenland.
la rueda de prensa|de persconferentie|La ministra respondió en la rueda de prensa.|De minister beantwoordde vragen op de persconferentie.
la libertad de expresión|de vrijheid van meningsuiting|La libertad de expresión tiene límites legales.|De vrijheid van meningsuiting kent wettelijke grenzen.
la desinformación|de desinformatie|La desinformación circula rápidamente.|Desinformatie verspreidt zich snel.
la verificación de datos|de feitencontrole|La verificación de datos permitió corregir la noticia.|Door de feitencontrole kon het nieuwsbericht worden gecorrigeerd.
difundir un rumor|een gerucht verspreiden|No conviene difundir un rumor sin comprobarlo.|Je kunt beter geen gerucht verspreiden zonder het te controleren.
la privacidad digital|de digitale privacy|La privacidad digital requiere medidas de protección.|Digitale privacy vraagt om beschermingsmaatregelen.
el consentimiento informado|de geïnformeerde toestemming|El consentimiento informado exige información clara.|Geïnformeerde toestemming vereist duidelijke informatie.
la filtración de datos|het datalek|La filtración de datos afectó a miles de usuarios.|Het datalek trof duizenden gebruikers.
el algoritmo de recomendación|het aanbevelingsalgoritme|El algoritmo de recomendación selecciona contenidos.|Het aanbevelingsalgoritme selecteert inhoud.
la cámara de eco|de echokamer|Una cámara de eco puede reforzar nuestras opiniones.|Een echokamer kan onze opvattingen versterken.
la fuente primaria|de primaire bron|Consultamos la fuente primaria del estudio.|We raadplegen de primaire bron van het onderzoek.
la publicación engañosa|het misleidende bericht|Denunciaron una publicación engañosa.|Ze meldden een misleidend bericht.
el contenido patrocinado|de gesponsorde inhoud|El contenido patrocinado debe identificarse.|Gesponsorde inhoud moet herkenbaar zijn.
el derecho a la intimidad|het recht op privacy|El derecho a la intimidad también rige en internet.|Het recht op privacy geldt ook op internet.
contrastar versiones|versies vergelijken|Es necesario contrastar versiones antes de informar.|Je moet versies vergelijken voordat je verslag doet.
la noticia sin verificar|het niet-geverifieerde nieuwsbericht|Una noticia sin verificar puede causar confusión.|Een niet-geverifieerd nieuwsbericht kan verwarring veroorzaken.
la rectificación pública|de openbare rectificatie|El periódico publicó una rectificación pública.|De krant publiceerde een openbare rectificatie.`],
['investigacion','Investigación y resultados','Onderzoek en resultaten','16.1',`
la muestra representativa|de representatieve steekproef|El estudio necesita una muestra representativa.|Het onderzoek heeft een representatieve steekproef nodig.
la variable|de variabele|Controlamos una variable durante el experimento.|Tijdens het experiment houden we één variabele constant.
la metodología|de methodologie|La metodología se explica en el informe.|De methodologie wordt in het verslag uitgelegd.
el marco teórico|het theoretisch kader|El marco teórico orienta el análisis.|Het theoretisch kader geeft richting aan de analyse.
el hallazgo|de bevinding|Este hallazgo confirma parte de la hipótesis.|Deze bevinding bevestigt een deel van de hypothese.
la fiabilidad|de betrouwbaarheid|Cuestionamos la fiabilidad de la medición.|We trekken de betrouwbaarheid van de meting in twijfel.
la validez|de validiteit|La validez del instrumento debe examinarse.|De validiteit van het instrument moet worden onderzocht.
la limitación del estudio|de beperking van het onderzoek|La pequeña muestra es una limitación del estudio.|De kleine steekproef is een beperking van het onderzoek.
la correlación|de correlatie|La correlación no demuestra causalidad.|Correlatie bewijst geen oorzakelijk verband.
la causalidad|het oorzakelijk verband|No podemos afirmar la causalidad con estos datos.|Met deze gegevens kunnen we geen oorzakelijk verband vaststellen.
el dato atípico|de uitschieter|Un dato atípico alteró el promedio.|Een uitschieter beïnvloedde het gemiddelde.
la tendencia|de trend|La gráfica muestra una tendencia ascendente.|De grafiek laat een stijgende trend zien.
el margen de error|de foutmarge|El margen de error es relativamente amplio.|De foutmarge is relatief groot.
la estimación|de schatting|La estimación se basa en datos anteriores.|De schatting is gebaseerd op eerdere gegevens.
la distribución|de verdeling|La distribución de respuestas no es uniforme.|De verdeling van de antwoorden is niet gelijkmatig.
la interpretación|de interpretatie|La interpretación debe apoyarse en los datos.|De interpretatie moet door de gegevens worden ondersteund.
la conclusión provisional|de voorlopige conclusie|Es una conclusión provisional, no definitiva.|Het is een voorlopige conclusie, geen definitieve.
la revisión bibliográfica|het literatuuronderzoek|La revisión bibliográfica identifica trabajos anteriores.|Het literatuuronderzoek brengt eerdere studies in kaart.
la pregunta de investigación|de onderzoeksvraag|La pregunta de investigación debe ser concreta.|De onderzoeksvraag moet concreet zijn.
fundamentar una conclusión|een conclusie onderbouwen|Hay que fundamentar una conclusión con evidencias.|Je moet een conclusie met bewijs onderbouwen.`]
];
if(!root.BIBLIO_VOCABULARY?.decks)throw Error('Vocabulario de base no disponible');
for(const [slug,es,nl,section,rows] of specs){
 const id='v-'+slug+'-b2',ref={title:'Instituto Cervantes (2006). Plan curricular: nociones específicas B1–B2, apartado '+section,url};
 const cards=rows.trim().split('\n').map((line,i)=>{const p=line.split('|');if(p.length!==4||p.some(x=>!x.trim()))throw Error('Tarjeta incompleta '+id+': '+i);const [es,nl,exampleEs,exampleNl]=p;return {id:id+'-'+(i+1),version:1,contextId:id+'-'+(i+1)+':example:1',senseId:id+'-'+(i+1)+':sense:1',term:{es,nl},example:{es:exampleEs,nl:exampleNl},accepted:{es:[es],nl:[nl]},audio:{es:null,nl:null},sourceRefs:[ref],usage:{es:'Equivalencia contextual del ejemplo, no traducción universal.',nl:'Contextuele vertaling, geen universeel equivalent.'}};});
 if(cards.length!==20)throw Error('No hay 20 tarjetas en '+id);
 root.BIBLIO_VOCABULARY.decks.push({id,version:1,level:'B2',title:{es,nl},goal:{es:'Comprender y utilizar vocabulario para argumentar y explicar con precisión.',nl:'Woordenschat gebruiken om genuanceerd uit te leggen en te onderbouwen.'},topic:slug,source:'Selección y ejemplos originales. Alineación temática orientativa con el PCIC; ninguna entrada individual está certificada por nivel o frecuencia.',references:[ref,{title:'RAE y ASALE. Diccionario de la lengua española',url:'https://dle.rae.es/'}],cards});
}
})(typeof window!=='undefined'?window:globalThis);
