(function(root){'use strict';
const D=root.BiblioPhoneticsData,A=root.BiblioPhoneticsAudioData,b=(es,nl)=>({es,nl}),ex=(text,es,mx=es,ar=mx)=>({text,ipa:{'es-ES':es,'es-MX':mx,'es-AR':ar}});
const raw=[
['a','/a/','[a]',b('Vocal baja central, sin redondear.','Lage centrale klinker, ongerond.'),[ex('casa','[ˈkasa]'),ex('mapa','[ˈmapa]')]],
['b','/b/','[b], [β̞]',b('Los dos labios intervienen. Hay cierre o aproximación según el contexto.','Beide lippen doen mee. Afsluiting of vernauwing hangt af van de context.'),[ex('barco','[ˈbaɾko]'),ex('lobo','[ˈloβ̞o]')]],
['c','/k/, /θ/ o /s/','[k], [θ], [s]',b('Ante a, o, u representa /k/. Ante e, i intervienen distinción o seseo.','Voor a, o, u staat c voor /k/. Voor e, i spelen distinción en seseo een rol.'),[ex('casa','[ˈkasa]'),ex('cerca','[ˈθeɾka]','[ˈseɾka]'),ex('cine','[ˈθine]','[ˈsine]')]],
['d','/d/','[d̪], [ð̞]',b('Contacto dental con cierre o aproximación según el contexto.','Dentaal contact met afsluiting of vernauwing, afhankelijk van de context.'),[ex('día','[ˈd̪ia]'),ex('dedo','[ˈd̪eð̞o]')]],
['e','/e/','[e]',b('Vocal media anterior, sin redondear.','Midden-voorklinker, ongerond.'),[ex('mesa','[ˈmesa]'),ex('leche','[ˈlet͡ʃe]')]],
['f','/f/','[f]',b('El labio inferior se acerca a los dientes superiores.','De onderlip gaat naar de boventanden.'),[ex('foto','[ˈfoto]'),ex('café','[kaˈfe]')]],
['g','/g/, /x/','[g], [ɣ̞], [x], [h]',b('Distingue cierre sonoro, aproximación sonora y fricción sorda.','Onderscheid stemhebbende afsluiting, stemhebbende vernauwing en stemloze wrijving.'),[ex('gato','[ˈgato]'),ex('lago','[ˈlaɣ̞o]'),ex('gente','[ˈxente]'),ex('guitarra','[giˈtara]')]],
['h','∅','Sin sonido propio / Geen eigen klank',b('En hola y harina no hay una consonante correspondiente a h. Su nombre hache sí se pronuncia.','In hola en harina is er geen medeklinker voor h. De letternaam hache spreek je wel uit.'),[ex('hola','[ˈola]'),ex('hora','[ˈoɾa]'),ex('harina','[aˈɾina]')]],
['i','/i/','[i], [j]',b('Alta anterior, sin redondear; también puede ser no silábica en un diptongo.','Hoge voorklinker, ongerond; kan ook niet-syllabisch zijn in een tweeklank.'),[ex('piso','[ˈpiso]'),ex('piano','[ˈpjano]')]],
['j','/x/','[x], [h], entre otras / onder andere',b('Fricción sorda posterior. [h] es glotal, no velar.','Stemloze wrijving achter in de mond. [h] is glottaal, niet velair.'),[ex('jamón','[xaˈmon]'),ex('jabón','[xaˈβ̞on]')]],
['k','/k/','[k]',b('Cierre velar sordo.','Stemloze velaire afsluiting.'),[ex('kilo','[ˈkilo]'),ex('kiwi','[ˈkiwi]')]],
['l','/l/','[l]',b('Salida lateral del aire con contacto alveolar.','De lucht gaat langs de tong bij alveolair contact.'),[ex('luna','[ˈluna]'),ex('pala','[ˈpala]')]],
['m','/m/','[m]',b('Cierre de ambos labios y salida nasal.','Beide lippen sluiten; de lucht gaat door de neus.'),[ex('mano','[ˈmano]'),ex('cama','[ˈkama]')]],
['n','/n/','[n], variantes contextuales / contextvarianten',b('Nasal alveolar; su lugar puede adaptarse a la consonante siguiente.','Alveolaire nasaal; de articulatieplaats kan zich aan de volgende medeklinker aanpassen.'),[ex('nube','[ˈnuβ̞e]'),ex('mano','[ˈmano]'),ex('tengo','[ˈteŋgo]')]],
['ñ','/ɲ/','[ɲ]',b('Nasal palatal.','Palatale nasaal.'),[ex('niño','[ˈniɲo]'),ex('mañana','[maˈɲana]')]],
['o','/o/','[o]',b('Vocal media posterior, labios redondeados.','Midden-achterklinker, lippen gerond.'),[ex('oso','[ˈoso]'),ex('foto','[ˈfoto]')]],
['p','/p/','[p]',b('Cierre bilabial sordo.','Stemloze bilabiale afsluiting.'),[ex('pato','[ˈpato]'),ex('sopa','[ˈsopa]')]],
['q','/k/ mediante qu / via qu','[k]',b('Su nombre es cu. Qu representa /k/ ante e, i; la u es muda.','De naam is cu. Qu staat voor /k/ voor e, i; de u is stil.'),[ex('queso','[ˈkeso]'),ex('quitar','[kiˈtaɾ]'),ex('quince','[ˈkinθe]','[ˈkinse]')]],
['r','/ɾ/, /r/','[ɾ], [r]',b('Un contacto breve o varios contactos de la punta de la lengua.','Eén kort contact of meerdere contacten met de tongpunt.'),[ex('pero','[ˈpeɾo]'),ex('rosa','[ˈrosa]'),ex('caro','[ˈkaɾo]'),ex('carro','[ˈkaro]')]],
['s','/s/','[s], con variación / met variatie',b('Fricción dental o alveolar según la variedad.','Dentale of alveolaire wrijving, afhankelijk van de variëteit.'),[ex('sopa','[ˈsopa]'),ex('casa','[ˈkasa]')]],
['t','/t/','[t̪]',b('Cierre dental sordo.','Stemloze dentale afsluiting.'),[ex('taza','[ˈt̪aθa]','[ˈt̪asa]'),ex('tomate','[t̪oˈmat̪e]')]],
['u','/u/','[u], [w], o muda en dígrafos / of stil in digrafen',b('Alta posterior y redondeada. Distingue u de la vocal [y] de nu en neerlandés.','Hoog achter en gerond. Onderscheid u van de Nederlandse klinker [y] in nu.'),[ex('uva','[ˈuβ̞a]'),ex('luna','[ˈluna]'),ex('cuatro','[ˈkwatɾo]'),ex('guitarra','[giˈtara]')]],
['v','/b/','[b], [β̞]',b('Uve es el nombre. El fonema es /b/, igual que b. No exige una fricativa labiodental.','Uve is de naam. Het foneem is /b/, net als bij b. Een labiodentale fricatief is niet nodig.'),[ex('vaca','[ˈbaka]'),ex('uva','[ˈuβ̞a]'),ex('vivir','[biˈβ̞iɾ]')]],
['w','/w/ en estos ejemplos / in deze voorbeelden','[w]',b('Sus valores dependen del préstamo y de su adaptación. Estos ejemplos muestran [w]; no un valor universal de w.','De klank hangt af van het leenwoord en de aanpassing. Deze voorbeelden tonen [w], geen universele klankwaarde van w.'),[ex('web','[web]'),ex('wifi','[ˈwifi]')]],
['x','/ks/, /s/, /x/','[ks], [s], [x]',b('El valor depende de la palabra. México conserva una correspondencia histórica con /x/.','De klank hangt af van het woord. In México staat x historisch voor /x/.'),[ex('taxi','[ˈtaksi]'),ex('xilófono','[siˈlofono]'),ex('México','[ˈmexiko]')]],
['y','/ʝ/ en modelo yeísta no rehilado; valor vocálico / klinkerwaarde','[ʝ], [ʝ̞], [ɟ͡ʝ], [ʒ], [ʃ], [i̯]',b('Distingue el uso consonántico de yo y mayo del vocálico de hoy.','Onderscheid het medeklinkergebruik in yo en mayo van het klinkergebruik in hoy.'),[ex('yo','[ʝo]','[ʝo]','[ʃo] ~ [ʒo]'),ex('mayo','[ˈmaʝo]','[ˈmaʝo]','[ˈmaʃo] ~ [ˈmaʒo]'),ex('hoy','[oi̯]')]],
['z','/θ/ o /s/','[θ], [s]',b('Con distinción aparece /θ/; con seseo, /s/. La escritura no cambia.','Bij distinción klinkt /θ/; bij seseo /s/. De spelling verandert niet.'),[ex('zapato','[θaˈpato]','[saˈpato]'),ex('taza','[ˈt̪aθa]','[ˈt̪asa]')]]
];
const notes={
h:b('La h no representa un fonema en el español estándar general. Hay aspiraciones dialectales y ciertos préstamos con h pronunciada; consulta la ampliación y la fuente. No se reproduce un supuesto sonido aislado de h.','De h staat in het algemene standaardspaans niet voor een foneem. Er bestaan dialectale aspiratie en bepaalde leenwoorden met uitgesproken h; zie de verdieping en bron. Er wordt geen vermeende losse h-klank afgespeeld.'),
q:b('El botón del nombre dice cu. El botón del sonido reproduce /k/ dentro de queso, no el nombre cu.','De naamknop zegt cu. De klankknop laat /k/ horen binnen queso, niet de letternaam cu.'),
v:b('Baca y vaca coinciden en el modelo general. [b] suele aparecer después de pausa y de nasal; [β̞] es frecuente entre vocales. Evita el contacto de dientes y labio característico de [v].','Baca en vaca klinken in het algemene model hetzelfde. [b] komt vaak na pauze en nasaal; [β̞] tussen klinkers. Vermijd het contact tussen tanden en lip dat bij [v] hoort.'),
g:b('Los ejemplos con [g] inicial se presentan después de pausa. No conviertas todas las realizaciones de /g/ en oclusivas.','Voorbeelden met [g] aan het begin staan na een pauze. Maak niet van elke realisatie van /g/ een plofklank.')
};
raw.find(r=>r[0]==='h')[2]='∅';raw.find(r=>r[0]==='q')[1]='/k/';raw.find(r=>r[0]==='j')[2]='[x], [h], [χ]';raw.find(r=>r[0]==='n')[2]='[n], [ŋ], …';raw.find(r=>r[0]==='u')[2]='[u], [w], ∅';raw.find(r=>r[0]==='w')[1]='/w/';raw.find(r=>r[0]==='y')[1]='/ʝ/, /i/';
A.variants.find(v=>v.id==='es-MX').label=b('Seseante, ejemplo mexicano','Seseo, Mexicaans voorbeeld');
const entries=raw.map(([letter,phoneme,realization,articulation,examples])=>{const r=D.alphabet.find(row=>row[0]===letter);return {id:letter,name:r[1],nameIpa:r[2],phoneme,realization,articulation,examples,note:notes[letter]||null,soundExample:letter==='h'?null:examples[0].text};});
for(const e of entries){const row=D.alphabet.find(r=>r[0]===e.id);row[3]=e.phoneme;row[4]=e.examples.map(x=>x.text).join(', ');}
function register(text){const id=A.wordId(text);A.items[id]={id,text,speechText:text,kind:'word'};return id;}
for(const e of entries)for(const sample of e.examples){register(sample.text);if(!A.byModule.FON01.includes(sample.text))A.byModule.FON01.push(sample.text);}
const regional=[
{module:'FON03',text:'cerca',models:[['Distinción','[ˈθeɾka]'],['Seseo','[ˈseɾka]']]},
{module:'FON03',text:'zapato',models:[['Distinción','[θaˈpato]'],['Seseo','[saˈpato]']]},
{module:'FON03',text:'casa / caza',audio:['casa','caza'],models:[['Distinción','[ˈkasa] / [ˈkaθa]'],['Seseo','[ˈkasa] / [ˈkasa]']]},
{module:'FON04',text:'me llamo',models:[[b('Distinción ll/y, no yeísta','Onderscheid ll/y, zonder yeísmo'),'[me ˈʎamo]'],[b('Yeísmo no rehilado','Yeísmo zonder rehilamiento'),'[me ˈʝamo]'],['Zheísmo','[me ˈʒamo]'],['Sheísmo','[me ˈʃamo]']]},
{module:'FON04',text:'lluvia',models:[[b('No yeísta','Zonder yeísmo'),'[ˈʎuβ̞ja]'],['Yeísmo','[ˈʝuβ̞ja]'],['Zheísmo','[ˈʒuβ̞ja]'],['Sheísmo','[ˈʃuβ̞ja]']]},
{module:'FON04',text:'calle',models:[[b('No yeísta','Zonder yeísmo'),'[ˈkaʎe]'],['Yeísmo','[ˈkaʝe]'],['Zheísmo','[ˈkaʒe]'],['Sheísmo','[ˈkaʃe]']]},
{module:'FON04',text:'yo',models:[['Yeísmo','[ʝo]'],['Zheísmo','[ʒo]'],['Sheísmo','[ʃo]']]},
{module:'FON04',text:'mayo',models:[['Yeísmo','[ˈmaʝo]'],['Zheísmo','[ˈmaʒo]'],['Sheísmo','[ˈmaʃo]']]}
];
for(const r of regional)for(const text of r.audio||[r.text]){register(text);if(!A.byModule[r.module].includes(text))A.byModule[r.module].push(text);}
for(const s of [{id:'h',title:'RAE y ASALE. DPD: h',url:'https://www.rae.es/dpd/h'},{id:'q',title:'RAE y ASALE. DPD: q',url:'https://www.rae.es/dpd/q'},{id:'v',title:'RAE y ASALE. DPD: v',url:'https://www.rae.es/dpd/v'}]){if(!D.sources.some(x=>x.id===s.id))D.sources.push(s);if(!D.modules[0].sources.includes(s.id))D.modules[0].sources.push(s.id);}
D.modules[0].sections[0].paragraphs.push(b('Cada ficha separa nombre, fonema y realización. Las transcripciones de palabras son amplias y orientativas; no representan a todos los hablantes de una región. Solo mostramos diferencias regionales cuando son relevantes.','Elke kaart onderscheidt naam, foneem en realisatie. Woordtranscripties zijn breed en indicatief; ze vertegenwoordigen niet iedere spreker uit een regio. We tonen regionale verschillen alleen waar ze relevant zijn.'));
D.modules[2].sections.push({title:b('Más ejemplos del mismo contraste','Meer voorbeelden van hetzelfde contrast'),paragraphs:[b('El seseo andaluz y el mexicano comparten la ausencia de oposición /s/ frente a /θ/, no una identidad fonética en todos los detalles. Parte de Andalucía presenta seseo; no todo el sur de España.','Andalusisch en Mexicaans seseo delen de afwezigheid van het contrast /s/ tegenover /θ/, niet alle fonetische details. In een deel van Andalusië komt seseo voor; niet in heel Zuid-Spanje.')],headers:[b('Ejemplo','Voorbeeld'),b('Con distinción','Met distinción'),b('Con seseo','Met seseo')],rows:[['cerca','[ˈθeɾka]','[ˈseɾka]'],['zapato','[θaˈpato]','[saˈpato]']]});
D.modules[3].sections.push({title:b('Me llamo: cuatro realizaciones','Me llamo: vier realisaties'),paragraphs:[b('[ʎ] pertenece a un sistema no yeísta. No se presenta como una opción del yeísmo. El rehilamiento [ʒ] o [ʃ] conserva la coincidencia de ll e y consonántica.','[ʎ] hoort bij een systeem zonder yeísmo. Het is geen variant van yeísmo. Bij rehilamiento met [ʒ] of [ʃ] blijven ll en de medeklinker y samenvallen.')],headers:[b('Patrón','Patroon'),b('Realización amplia','Brede realisatie')],rows:regional.find(r=>r.text==='me llamo').models});
root.BiblioPhoneticsEntries={schema:1,version:1,entries,regional,models:[{id:'es-ES',label:b('Peninsular con distinción','Spanje met distinción')},{id:'es-MX',label:b('Seseante, ejemplo mexicano','Seseo, Mexicaans voorbeeld')},{id:'es-AR',label:b('Rioplatense','Río de la Plata')}]};
})(typeof window!=='undefined'?window:globalThis);

