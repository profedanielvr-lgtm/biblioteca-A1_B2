(function(root){'use strict';
const byModule={
FON01:['casa','barco','lobo','cine','día','dedo','mesa','foto','gato','guitarra','gente','hola','ahora','isla','tierra','jamón','kiwi','luna','mano','nube','tengo','niño','oso','pato','queso','quince','pero','rosa','sopa','taza','uva','cuatro','vaca','vivir','web','váter','taxi','xilófono','México','yo','y','hoy','zapato','pala','bala','mala','faro','tela','cena','sala','nada','lado','perro','chico','calle','mayo','jabón'],
FON02:['gato','goma','gusano','guerra','guitarra','geranio','girar','vergüenza','pingüino','tengo','lago'],
FON03:['casa','caza','cerveza','coser','cocer','Cecilia sale de casa'],
FON04:['halla','haya','lluvia','Hoy hay lluvia'],
FON05:['chico','calle','lluvia','perro','queso','quince','guerra','guitarra','caballo','pero','caro','carro','rosa','plato','blanco','crema','grande','fruta','tres','piso','mesa','casa','foto','luna','piano','país','cuatro','baúl'],
FON06:['gato','lago','tengo','jamón','gente','guitarra','luna','tú','uno','teléfono','necesita','mesa','foto','poco','baca','vaca','beber','vivir','cara','pero','mira','la ciudad antigua','un club abierto','plato','crema','fruta']
};
const variants=[{id:'es-ES',label:{es:'Peninsular con distinción',nl:'Spanje met distinción'}},{id:'es-MX',label:{es:'Mexicano seseante',nl:'Mexico met seseo'}},{id:'es-AR',label:{es:'Rioplatense',nl:'Río de la Plata'}}];
const slug=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const items={},letterIds={};
for(const row of root.BiblioPhoneticsData.alphabet){const id='letter-'+row[0];letterIds[row[0]]=id;items[id]={id,text:row[0],speechText:row[1],kind:'letter-name'};}
for(const word of Object.values(byModule).flat()){const id='word-'+slug(word);items[id]={id,text:word,speechText:word,kind:'word'};}
for(const [text,name,example] of [['ch','che','chico'],['rr','erre doble','perro'],['ll','elle','lluvia']]){const id='digraph-'+text;items[id]={id,text,speechText:name,example,kind:'digraph-name'};}
for(const [text,example] of [['ga','gato'],['go','goma'],['gu','gusano'],['ge','geranio'],['gi','girar'],['gue','guerra'],['gui','guitarra'],['güe','vergüenza'],['güi','pingüino']]){const id='syllable-'+text;items[id]={id,text,speechText:example,example,kind:'sound-in-word'};}
for(const [text,example]of [['qu','queso'],['gu','guerra']]){const id='digraph-'+text;items[id]={id,text,speechText:example,example,kind:'sound-in-word'};}
root.BiblioPhoneticsAudioData={schema:1,variants,items,letterIds,byModule,wordId:word=>'word-'+slug(word),recordings:{}};
})(typeof window!=='undefined'?window:globalThis);

