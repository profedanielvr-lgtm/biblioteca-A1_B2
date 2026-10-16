"""One-time editorial seed. Stable IDs, append only; existing teacher edits are preserved.
Models: RAE DLE hablar/comer/vivir conjugation, DPD haber/hora, existing card sources.
Run deliberately to add new items; normal builds never regenerate teacher content.
"""
from pathlib import Path
import json
P=Path(__file__).resolve().parents[1]/'content/catalog.json'
d=json.loads(P.read_text()); cards={c['id']:c for c in d['cards']}; existing={e['id'] for c in d['cards'] for e in c['exercises']}
def add(cid,key,stem,answers,es,nl,**meta):
 eid=cid+'-lab-'+key
 if eid in existing:return
 cards[cid]['exercises'].append(dict(id=eid,stem=stem,answers=answers if isinstance(answers,list) else [answers],why=dict(es=es,nl=nl),mode='word',instruction=dict(es='Completa la forma pedida. Fíjate en el contexto.',nl='Vul de gevraagde vorm in. Let op de context.'),**meta));existing.add(eid)
persons=['yo','tú','él / ella / usted','nosotros / nosotras','vosotros / vosotras','ellos / ellas / ustedes']
verbs=['hablar','estudiar','trabajar','escuchar','cantar','necesitar','aprender','comer','beber','vender','vivir','escribir']
ends={
 'F26':('presente de indicativo','tegenwoordige tijd',[['o','as','a','amos','áis','an'],['o','es','e','emos','éis','en'],['o','es','e','imos','ís','en']]),
 'F47':('pretérito indefinido','indefinido',[['é','aste','ó','amos','asteis','aron'],['í','iste','ió','imos','isteis','ieron'],['í','iste','ió','imos','isteis','ieron']]),
 'F49':('pretérito imperfecto','imperfecto',[['aba','abas','aba','ábamos','abais','aban'],['ía','ías','ía','íamos','íais','ían'],['ía','ías','ía','íamos','íais','ían']]),
 'B105':('presente de subjuntivo','tegenwoordige subjuntivo',[['e','es','e','emos','éis','en'],['a','as','a','amos','áis','an'],['a','as','a','amos','áis','an']]),
 'B201':('imperfecto de subjuntivo','verleden subjuntivo',[['ara','aras','ara','áramos','arais','aran'],['iera','ieras','iera','iéramos','ierais','ieran'],['iera','ieras','iera','iéramos','ierais','ieran']])}
compound={
 'F46':('pretérito perfecto compuesto','perfecto compuesto',['he','has','ha','hemos','habéis','han']),
 'B101':('pluscuamperfecto de indicativo','pluscuamperfecto',['había','habías','había','habíamos','habíais','habían']),
 'B202':('perfecto de subjuntivo','perfecto van de subjuntivo',['haya','hayas','haya','hayamos','hayáis','hayan']),
 'B203':('pluscuamperfecto de subjuntivo','pluscuamperfecto van de subjuntivo',['hubiera','hubieras','hubiera','hubiéramos','hubierais','hubieran'])}
for v in verbs:
 root=v[:-2];typ=['ar','er','ir'].index(v[-2:]);part='escrito' if v=='escribir' else root+('ado' if typ==0 else 'ido')
 models=[]
 for cid,(tense,nlt,sets) in ends.items():
  forms=[[root+e] for e in sets[typ]]
  if cid=='B201':
   alt=['ase','ases','ase','ásemos','aseis','asen'] if typ==0 else ['iese','ieses','iese','iésemos','ieseis','iesen']
   forms=[[a[0],root+b] for a,b in zip(forms,alt)]
  models.append((cid,tense,nlt,forms,'Raíz + terminación de '+tense+'.','Stam + uitgang van de '+nlt+'.'))
 for cid,tense,nlt,ending in [('B102','futuro simple','futuro simple',['é','ás','á','emos','éis','án']),('B103','condicional simple','condicional simple',['ía','ías','ía','íamos','íais','ían'])]:
  models.append((cid,tense,nlt,[[v+e] for e in ending],'Infinitivo completo + terminación.','Hele infinitief + uitgang.'))
 for cid,(tense,nlt,aux) in compound.items():
  forms=[[a+' '+part] for a in aux]
  if cid=='B203':
   alt=['hubiese','hubieses','hubiese','hubiésemos','hubieseis','hubiesen']
   forms=[[a[0],b+' '+part] for a,b in zip(forms,alt)]
  models.append((cid,tense,nlt,forms,'Haber conjugado + '+part+'. El participio no cambia con la persona.','Vervoegd haber + '+part+'. Het deelwoord verandert niet met de persoon.'))
 for key,tense,aux in [('futuro-perfecto','futuro perfecto',['habré','habrás','habrá','habremos','habréis','habrán']),('condicional-compuesto','condicional compuesto',['habría','habrías','habría','habríamos','habríais','habrían'])]:
  for i,a in enumerate(aux):
   add('B205',v+'-'+key+'-'+str(i),f'{persons[i]}: ___ ({v}, {tense}; escribe la forma completa)',a+' '+part,f'{a} + {part}: haber lleva la persona y el tiempo; el participio queda igual.',f'{a} + {part}: haber geeft persoon en tijd aan; het deelwoord blijft gelijk.',verb=v,person=persons[i],tenseKey=key)
 for cid,tense,nlt,forms,es,nl in models:
  for i,ans in enumerate(forms):add(cid,v+'-'+str(i),f'{persons[i]}: ___ ({v}, {tense})',ans,f'{persons[i]} → {ans[0]}. '+es,f'{persons[i]} → {ans[0]}. '+nl,verb=v,person=persons[i],tenseKey=cid)
 # No first-person singular imperatives. Explicit treatment prevents tú/usted ambiguity.
 subj=ends['B105'][2][typ]
 affirmative=[root+('a' if typ==0 else 'e'),root+subj[2],root+subj[3],v[:-1]+'d',root+subj[5]]
 indices=[1,2,3,4,5]
 labels=['tú','usted','nosotros / nosotras','vosotros / vosotras','ustedes']
 for i,form,label in zip(indices,affirmative,labels):
  add('F44',v+'-imp-'+str(i),f'___ ({v}, imperativo afirmativo, {label}; sin pronombres)',form,f'La instrucción para {label} es {form}. El imperativo no tiene forma de yo.',f'De instructie voor {label} is {form}. De gebiedende wijs heeft geen yo-vorm.',verb=v,person=label,tenseKey='imperativo-afirmativo')
 for i,label in zip(indices,labels):
  form=root+subj[i];add('B104',v+'-neg-'+str(i),f'No ___ ({v}, imperativo negativo, {label}; completa solo el verbo)',form,f'No + {form}: el imperativo negativo usa formas del presente de subjuntivo.',f'No + {form}: de ontkennende gebiedende wijs gebruikt vormen van de tegenwoordige subjuntivo.',verb=v,person=label,tenseKey='imperativo-negativo')
# Agreement practice: same variable, different familiar classroom objects.
nouns=[('libro','libros','m'),('cuaderno','cuadernos','m'),('móvil','móviles','m'),('bolígrafo','bolígrafos','m'),('diccionario','diccionarios','m'),('ordenador','ordenadores','m'),('mapa','mapas','m'),('lápiz','lápices','m'),('mochila','mochilas','f'),('carpeta','carpetas','f'),('regla','reglas','f'),('mesa','mesas','f'),('silla','sillas','f'),('pantalla','pantallas','f'),('llave','llaves','f'),('foto','fotos','f')]
for ni,(sg,pl,g) in enumerate(nouns):
 for plural,n in [(False,sg),(True,pl)]:
  key=str(ni)+str(int(plural));art=('los' if g=='m' else 'las') if plural else ('el' if g=='m' else 'la');ind=('unos' if g=='m' else 'unas') if plural else ('un' if g=='m' else 'una')
  add('F04','def-'+key,f'Busca ___ {n} de Ana. (artículo definido)',art,'El artículo concuerda con '+n+' en género y número.','Het lidwoord past in geslacht en getal bij '+n+'.')
  add('F04','ind-'+key,f'Necesito ___ {n} para la clase. (artículo indefinido)',ind,'Elegimos un/una/unos/unas según el género y el número del sustantivo.','Kies un/una/unos/unas op basis van geslacht en getal van het naamwoord.')
  for owner,poss in [('yo','mis' if plural else 'mi'),('tú','tus' if plural else 'tu'),('ella','sus' if plural else 'su'),('nosotras',('nuestros' if g=='m' else 'nuestras') if plural else ('nuestro' if g=='m' else 'nuestra'))]:
   add('F13','poss-'+owner+'-'+key,f'___ {n} {"son" if plural else "es"} de buena calidad. (posesivo delante del nombre; persona: {owner})',poss,'El posesivo señala al poseedor, pero concuerda con la cosa poseída. '+n+' → '+poss+'.','Het bezittelijk woord verwijst naar de bezitter, maar past bij het bezit. '+n+' → '+poss+'.')
  for distance,base in [('aquí, junto a mí','est'),('ahí, junto a ti','es'),('allí, lejos de ambos','aquel')]:
   demonstrative=(base+('os' if g=='m' else 'as')) if plural and base!='aquel' else (('aquellos' if g=='m' else 'aquellas') if plural else ('aquel' if g=='m' else 'aquella')) if base=='aquel' else base+('e' if g=='m' else 'a')
   add('F12','dem-'+base+'-'+key,f'___ {n} {"están" if plural else "está"} {distance}. (demostrativo de distancia)',demonstrative,'La distancia es una pista; la terminación concuerda con '+n+'.','Afstand is een aanwijzing; de uitgang past bij '+n+'.')
  pron=('los' if g=='m' else 'las') if plural else ('lo' if g=='m' else 'la')
  add('F51','od-'+key,f'¿Tienes {art} {n}? Sí, ___ tengo. (pronombre de objeto directo)',pron,'El pronombre sustituye '+art+' '+n+' y conserva género y número.','Het voornaamwoord vervangt '+art+' '+n+' en behoudt geslacht en getal.')
 add('F03','plural-'+str(ni),f'En el aula hay dos ___. ({sg}, escribe el plural)',pl,'El plural de '+sg+' es '+pl+'. Los nombres terminados en consonante suelen añadir es; z cambia a c.','Het meervoud van '+sg+' is '+pl+'. Bij een medeklinker komt er vaak es bij; z wordt c.')
# Clock tasks: explicit requested y/menos model; alternative natural forms accepted.
hours=['doce','una','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once']
for h in range(1,13):
 for m in [0,15,30,45]:
  nh=h if m!=45 else h%12+1; number=hours[nh%12];prefix='Es la ' if nh==1 else 'Son las ';phrase=prefix+number+({0:' en punto',15:' y cuarto',30:' y media',45:' menos cuarto'}[m]);answers=[phrase]
  if m==0:answers.append(prefix+number)
  if m in [15,45]:answers.append(prefix+number+(' y quince' if m==15 else ' menos quince'))
  add('F20',f'clock-{h}-{m}',f'¿Qué hora es? {h:02}:{m:02}. Escribe la frase completa con {"menos" if m==45 else "y" if m else "en punto"}.',answers,'La hora se refiere al modelo de doce horas. '+('Con menos, nombramos la hora siguiente.' if m==45 else 'La una lleva es la; las otras horas, son las.')+' En neerlandés, half twee corresponde a la una y media.','We gebruiken de twaalfuursklok. '+('Bij menos noem je het volgende uur.' if m==45 else 'Bij één uur: es la; bij de andere uren: son las.')+' Half twee is la una y media.',clock=dict(hour=h,minute=m))
# Contextual prepositions, indirect pronouns, contrasts: answer is constrained explicitly.
sets={
'F56':[
('La mochila está debajo ___ la mesa. (completa la locución)','de','Debajo de introduce la referencia.','Debajo de noemt het referentiepunt.'),
('Estoy ___ casa, no en el instituto. (en / a)','en','En indica ubicación.','En geeft een locatie aan.'),
('El póster está encima ___ la pizarra.','de','Encima de necesita de.','Encima de heeft de nodig.'),
('Nos vemos delante ___ la biblioteca.','de','Delante de expresa una posición.','Delante de geeft een plaats aan.'),
('El móvil está ___ la mesa, apoyado en su superficie. (sobre / debajo de)','sobre','Sobre indica contacto por arriba.','Sobre geeft hier contact bovenop aan.'),
('La farmacia está ___ el banco y el colegio. (entre / hacia)','entre','Entre relaciona dos referencias.','Entre verbindt twee referentiepunten.')],
'F60':[
('Estudio ___ aprender, no para aprobar solamente. (por / para)','para','Para + infinitivo expresa finalidad.','Para + infinitief geeft een doel aan.'),
('Gracias ___ tu ayuda. (por / para)','por','Dar las gracias por algo.','Je bedankt iemand met gracias por.'),
('He pagado diez euros ___ esta entrada. (por / para)','por','Por introduce el precio del intercambio.','Por noemt de prijs bij een ruil.'),
('La tarea es ___ mañana; esa es la fecha límite. (por / para)','para','Para introduce una fecha límite.','Para noemt een deadline.'),
('La excursión se canceló ___ la lluvia. (por / para)','por','Por presenta la causa.','Por geeft de oorzaak aan.'),
('Esta aplicación sirve ___ practicar. (por / para)','para','Servir para + infinitivo indica utilidad.','Servir para + infinitief geeft het doel aan.')],
'F58':[
('El club empieza ___ las cuatro. (a / en)','a','Las horas llevan a.','Een tijdstip krijgt a.'),
('Mi cumpleaños es ___ mayo. (a / en)','en','Los meses llevan en en esta construcción.','Maanden krijgen hier en.'),
('Descansamos ___ el recreo. (durante / hacia)','durante','Durante indica el periodo.','Durante noemt de periode.'),
('El curso empieza ___ septiembre. (en / a)','en','En introduce el mes.','En introduceert de maand.')],
'F52':[
('A mis amigas ___ escribo un mensaje. (pronombre OI)','les','Les corresponde a varias destinatarias.','Les verwijst naar meerdere ontvangers.'),
('A ti ___ presto mi bicicleta. (pronombre OI)','te','Te señala al destinatario tú.','Te verwijst naar de ontvanger tú.'),
('A nosotros ___ envían el horario. (pronombre OI)','nos','Nos corresponde a nosotros.','Nos hoort bij nosotros.'),
('A vosotros ___ doy las gracias. (pronombre OI)','os','Os corresponde a vosotros.','Os hoort bij vosotros.')],
'F53':[
('Entrego las llaves a Eva. Se ___ entrego. (OD)','las','Las sustituye las llaves.','Las vervangt las llaves.'),
('Doy los libros a mis amigos. ___ los doy. (OI)','se','Les cambia a se delante de los.','Les wordt se vóór los.'),
('Mando la foto a Ana. Se ___ mando. (OD)','la','La sustituye la foto.','La vervangt la foto.'),
('Presto el móvil a Luis. ___ lo presto. (OI)','se','Le cambia a se delante de lo.','Le wordt se vóór lo.')],
'F37':[
('A mí me ___ este juego. (gustar, presente)','gusta','Este juego es singular y determina gusta.','Este juego is enkelvoud en bepaalt gusta.'),
('A nosotros nos ___ las series. (encantar, presente)','encantan','Las series es el sujeto plural.','Las series is het meervoudige onderwerp.'),
('A ella le ___ los pies. (doler, presente)','duelen','Los pies determina duelen.','Los pies bepaalt duelen.'),
('A ti te ___ aprender idiomas. (interesar, presente)','interesa','El infinitivo funciona como sujeto singular.','De infinitief werkt als enkelvoudig onderwerp.')]
}
for cid,rows in sets.items():
 for i,(s,a,es,nl) in enumerate(rows):add(cid,'context-'+str(i),s,a,es,nl)
d['practiceRevision']=1
P.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n');print('Total exercises:',sum(len(c['exercises']) for c in d['cards']))
