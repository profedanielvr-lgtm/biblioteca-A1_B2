(function(root){'use strict';
const raw=`ser|zijn|de aquí
estar|zijn; zich bevinden|en casa
tener|hebben|tiempo
haber|hebben (hulpwerkwoord); er zijn|terminado la tarea
hacer|doen; maken|la tarea
ir|gaan|a clase
venir|komen|a clase
poder|kunnen; mogen|participar
querer|willen; houden van|aprender español
deber|moeten; verschuldigd zijn|estudiar
decir|zeggen|la verdad
hablar|spreken; praten|español
contar|vertellen; tellen|una historia
preguntar|vragen|la hora
responder|antwoorden|a la pregunta
pedir|vragen om; bestellen|un café
llamar|bellen; noemen|a María
saber|weten; kunnen|la respuesta
conocer|kennen|la ciudad
entender|begrijpen|la pregunta
comprender|begrijpen|la explicación
pensar|denken|en el viaje
creer|geloven; denken|que es posible
recordar|zich herinneren|la fecha
olvidar|vergeten|la dirección
aprender|leren|español
estudiar|studeren; leren|en la biblioteca
enseñar|lesgeven; laten zien|español
leer|lezen|el periódico
escribir|schrijven|un mensaje
escuchar|luisteren naar|la radio
oír|horen|la música
ver|zien|el mar
mirar|kijken naar|el mapa
sentir|voelen|frío
gustar|leuk vinden|esta canción
preferir|de voorkeur geven aan|el té
necesitar|nodig hebben|ayuda
buscar|zoeken|las llaves
encontrar|vinden|las llaves
dar|geven|las gracias
recibir|ontvangen|un mensaje
poner|zetten; leggen|la mesa
quitar|weghalen|el cartel
tomar|nemen; drinken|un café
llevar|meenemen; dragen|una mochila
traer|meebrengen|el libro
dejar|laten; achterlaten|las llaves aquí
usar|gebruiken|el diccionario
utilizar|gebruiken|el diccionario
comprar|kopen|pan
vender|verkopen|libros
pagar|betalen|la cuenta
costar|kosten|diez euros
ganar|winnen; verdienen|el partido
perder|verliezen; missen|el autobús
trabajar|werken|en una escuela
vivir|wonen; leven|en Utrecht
comer|eten|fruta
beber|drinken|agua
cocinar|koken|arroz
dormir|slapen|ocho horas
despertarse|wakker worden|temprano
levantarse|opstaan|a las siete
salir|vertrekken; uitgaan|de casa
entrar|binnengaan|en la biblioteca
llegar|aankomen|a tiempo
volver|terugkomen|a casa
pasar|voorbijgaan; doorbrengen|por el parque
quedarse|blijven|en casa
andar|lopen|por el parque
caminar|wandelen; lopen|por el parque
correr|rennen|por el parque
viajar|reizen|en tren
conducir|autorijden; besturen|con cuidado
abrir|openen|la puerta
cerrar|sluiten|la ventana
empezar|beginnen|la clase
comenzar|beginnen|la reunión
terminar|afmaken; eindigen|la tarea
acabar|afmaken; eindigen|el trabajo
seguir|volgen; doorgaan|las instrucciones
continuar|doorgaan|con el trabajo
esperar|wachten op; hopen|el autobús
ayudar|helpen|a un amigo
intentar|proberen|aprender
conseguir|verkrijgen; erin slagen|una entrada
elegir|kiezen|un libro
cambiar|veranderen; wisselen|de opinión
explicar|uitleggen|la regla
mostrar|laten zien|el mapa
jugar|spelen|al fútbol
tocar|aanraken; bespelen|la guitarra
crear|creëren; maken|una actividad
preparar|voorbereiden; klaarmaken|la cena
permitir|toestaan|el acceso
parecer|lijken|de aquí
ocurrir|gebeuren|a menudo
existir|bestaan|en esta región
importar|ertoe doen; importeren|`;
const irregular={ser:'soy eres es somos sois son',estar:'estoy estás está estamos estáis están',tener:'tengo tienes tiene tenemos tenéis tienen',haber:'he has ha hemos habéis han',hacer:'hago haces hace hacemos hacéis hacen',ir:'voy vas va vamos vais van',venir:'vengo vienes viene venimos venís vienen',poder:'puedo puedes puede podemos podéis pueden',querer:'quiero quieres quiere queremos queréis quieren',decir:'digo dices dice decimos decís dicen',contar:'cuento cuentas cuenta contamos contáis cuentan',pedir:'pido pides pide pedimos pedís piden',saber:'sé sabes sabe sabemos sabéis saben',conocer:'conozco conoces conoce conocemos conocéis conocen',entender:'entiendo entiendes entiende entendemos entendéis entienden',pensar:'pienso piensas piensa pensamos pensáis piensan',recordar:'recuerdo recuerdas recuerda recordamos recordáis recuerdan',oír:'oigo oyes oye oímos oís oyen',ver:'veo ves ve vemos veis ven',sentir:'siento sientes siente sentimos sentís sienten',preferir:'prefiero prefieres prefiere preferimos preferís prefieren',encontrar:'encuentro encuentras encuentra encontramos encontráis encuentran',dar:'doy das da damos dais dan',poner:'pongo pones pone ponemos ponéis ponen',traer:'traigo traes trae traemos traéis traen',perder:'pierdo pierdes pierde perdemos perdéis pierden',dormir:'duermo duermes duerme dormimos dormís duermen',despertar:'despierto despiertas despierta despertamos despertáis despiertan',salir:'salgo sales sale salimos salís salen',volver:'vuelvo vuelves vuelve volvemos volvéis vuelven',conducir:'conduzco conduces conduce conducimos conducís conducen',cerrar:'cierro cierras cierra cerramos cerráis cierran',empezar:'empiezo empiezas empieza empezamos empezáis empiezan',comenzar:'comienzo comienzas comienza comenzamos comenzáis comienzan',seguir:'sigo sigues sigue seguimos seguís siguen',continuar:'continúo continúas continúa continuamos continuáis continúan',conseguir:'consigo consigues consigue conseguimos conseguís consiguen',elegir:'elijo eliges elige elegimos elegís eligen',mostrar:'muestro muestras muestra mostramos mostráis muestran',jugar:'juego juegas juega jugamos jugáis juegan',parecer:'parezco pareces parece parecemos parecéis parecen'};
const subjects=['Yo','Tú','Ella','Nosotros','Vosotros','Ellos'],persons=['yo','tú','él / ella / usted','nosotros / nosotras','vosotros / vosotras','ellos / ellas / ustedes'];
function forms(inf){const reflexive=inf.endsWith('se'),base=reflexive?inf.slice(0,-2):inf,stem=base.slice(0,-2),ends={ar:['o','as','a','amos','áis','an'],er:['o','es','e','emos','éis','en'],ir:['o','es','e','imos','ís','en']};const values=irregular[base]?.split(' ')||ends[base.slice(-2)].map(e=>stem+e);return values.map((v,i)=>reflexive?['me','te','se','nos','os','se'][i]+' '+v:v);}
const verbs=raw.split('\n').map((line,i)=>{const [infinitive,nl,context]=line.split('|');return {id:infinitive.normalize('NFD').replace(/[\u0300-\u036f]/g,''),infinitive,nl,context,present:forms(infinitive),eligible:['gustar','costar','ocurrir','existir'].includes(infinitive)?[2,5]:[0,1,2,3,4,5]};});
function sentence(v,p,blank=false){const f=blank?'_____':v.present[p];if(v.infinitive==='gustar')return 'Me '+f+(p===2?' esta canción.':' estas canciones.');if(v.infinitive==='costar')return (p===2?'El libro ':'Los libros ')+f+' diez euros.';if(v.infinitive==='ocurrir')return (p===2?'Esto ':'Estas cosas ')+f+' a menudo.';if(v.infinitive==='existir')return (p===2?'Esta especie ':'Estas especies ')+f+' en esta región.';if(v.infinitive==='importar')return subjects[p]+' '+(p===0||p===3?'te':'me')+' '+f+'.';return subjects[p]+' '+f+' '+v.context+'.';}
const A=root.BiblioPhoneticsAudioData;for(const v of verbs){const id=A.wordId(v.infinitive);A.items[id]||={id,text:v.infinitive,speechText:v.infinitive,kind:'word'};}
root.BiblioVerbs={schema:1,verbs,persons,sentence,pick(v,random=Math.random){return v.eligible[Math.min(v.eligible.length-1,Math.floor(random()*v.eligible.length))];},get(id){return verbs.find(v=>v.id===id);},normalize(x){return String(x).normalize('NFC').trim().replace(/\s+/g,' ').toLocaleLowerCase('es');}};
})(typeof window!=='undefined'?window:globalThis);
