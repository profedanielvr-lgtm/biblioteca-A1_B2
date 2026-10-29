(function(root){'use strict';
const V=root.BiblioVerbs,S=root.BiblioSpeech,esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'' :'&#39;'}[c]));
const endings={ar:['o','as','a','amos','áis','an'],er:['o','es','e','emos','éis','en'],ir:['o','es','e','imos','ís','en']};
const pronouns=['me','te','se','nos','os','se'];
function regularForms(v){
 const reflexive=v.infinitive.endsWith('se'),base=reflexive?v.infinitive.slice(0,-2):v.infinitive;
 const ending=base.slice(-2),stem=base.slice(0,-2);
 return endings[ending].map((suffix,i)=>(reflexive?pronouns[i]+' ':'')+stem+suffix);
}
function isIrregular(v){return v.present.some((form,i)=>V.normalize(form)!==V.normalize(regularForms(v)[i]));}
function pool(filters={}){
 return V.verbs.filter(v=>(!filters.ending||v.infinitive.replace(/se$/,'').endsWith(filters.ending))&&(!filters.type||filters.type==='all'||(isIrregular(v)?'irregular':'regular')===filters.type));
}
function choose(previous,random=Math.random,filters={}){
 const candidates=pool(filters).filter(v=>v.id!==previous);
 if(!candidates.length)return null;
 return candidates[Math.min(candidates.length-1,Math.floor(Math.max(0,Math.min(.999999999,random()))*candidates.length))];
}
function otherPerson(v,previous,random=Math.random){
 const candidates=v.eligible.filter(i=>i!==previous);
 return candidates.length?candidates[Math.min(candidates.length-1,Math.floor(Math.max(0,Math.min(.999999999,random()))*candidates.length))]:null;
}
function render(main,lang){
 const tr=(es,nl)=>lang==='nl'?nl:es;
 let v=null,person=null,attempt=0,done=false,usedHelp=false;
 main.innerHTML='<p><a href="#estudiar">'+tr('Estudiar','Oefenen')+'</a> · <a href="#verbos">'+tr('Consultar los 100 verbos','De 100 werkwoorden bekijken')+'</a></p>'+
 '<h1>'+tr('Conjugador aleatorio de verbos','Willekeurige werkwoordoefening')+'</h1>'+
 '<p>'+tr('Practica los 100 verbos del banco. Filtra la selección y cambia de persona sin perder el verbo o pasa directamente a otro.','Oefen met de 100 werkwoorden. Filter de selectie, kies een andere persoon bij hetzelfde werkwoord of ga verder met een nieuw werkwoord.')+'</p>'+
 '<p class="meta">'+tr('Tiempo disponible: presente de indicativo. Los demás tiempos todavía no tienen paradigmas validados. Selección didáctica de verbos frecuentes, no una lista estadística certificada.','Beschikbare tijd: tegenwoordige tijd van de indicatief. Andere tijden zijn nog niet gevalideerd. Didactische selectie van veelgebruikte werkwoorden, geen gecertificeerde frequentieranglijst.')+'</p>'+
 '<div class="study-filters random-verb-filters">'+
 '<label>'+tr('Tipo de verbo','Soort werkwoord')+'<select id="random-verb-type"><option value="all">'+tr('Todos','Alle')+'</option><option value="regular">'+tr('Regulares','Regelmatig')+'</option><option value="irregular">'+tr('Irregulares','Onregelmatig')+'</option></select></label>'+
 '<label>'+tr('Terminación','Uitgang')+'<select id="random-verb-ending"><option value="">'+tr('Todas','Alle')+'</option><option value="ar">-ar</option><option value="er">-er</option><option value="ir">-ir</option></select></label>'+
 '<label>'+tr('Modalidad','Oefenvorm')+'<select id="random-verb-mode"><option value="single">'+tr('Una persona','Eén persoon')+'</option><option value="full">'+tr('Conjugación completa','Hele vervoeging')+'</option></select></label>'+
 '<label>'+tr('Persona inicial','Eerste persoon')+'<select id="random-verb-person-select"><option value="random">'+tr('Aleatoria','Willekeurig')+'</option>'+V.persons.map((name,i)=>'<option value="'+i+'">'+esc(name)+'</option>').join('')+'</select></label>'+
 '</div><p id="random-verb-filter-count" role="status" aria-live="polite"></p>'+
 '<div id="random-verb-stage"></div>';
 S.mount(main,lang);
 const stage=main.querySelector('#random-verb-stage'),type=main.querySelector('#random-verb-type'),ending=main.querySelector('#random-verb-ending'),mode=main.querySelector('#random-verb-mode'),initial=main.querySelector('#random-verb-person-select');
 const options=()=>({type:type.value,ending:ending.value});
 const candidates=()=>pool(options());
 function save(response,correct,index,full){
  if(!root.BiblioJourney?.store.current())return;
  try{root.BiblioEvidence.add('scenario',{key:'random-conjugation:'+v.id+':'+index,verb:v.id,person:index,tense:'presente',response,correct,attempt,help:usedHelp||attempt>1,modality:'production',source:'conjugador-aleatorio',full:!!full});}
  catch(error){const out=stage.querySelector('.random-feedback');if(out)out.textContent+=' '+error.message;}
 }
 function solution(indices){
  stage.querySelector('.random-solution').innerHTML=indices.map(i=>'<p lang="es"><strong>'+esc(V.persons[i])+':</strong> '+esc(v.present[i])+' '+S.readButton(v.present[i],lang,'es')+'</p>').join('')+
   (indices.length===1?'<p lang="es">'+esc(V.sentence(v,indices[0]))+' '+S.readButton(V.sentence(v,indices[0]),lang,'es')+'</p>':'');
  S.bindRead(stage,lang);
 }
 function draw(){
  S.stop(false);attempt=0;done=false;usedHelp=false;
  const full=mode.value==='full',indices=full?v.eligible:[person],single=indices.length===1;
  const personLabel=single?'<p>'+tr('Persona gramatical: ','Grammaticale persoon: ')+esc(V.persons[indices[0]])+'</p><p lang="es">'+esc(V.sentence(v,indices[0],true))+'</p>':'<p>'+tr('Completa las formas correspondientes.','Vul de bijbehorende vormen in.')+'</p>';
  const field=single?'<label for="random-verb-answer">'+tr('Tu respuesta','Je antwoord')+'</label><input id="random-verb-answer" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="80" required>':
   '<div class="random-verb-paradigm">'+indices.map(i=>'<label for="random-verb-form-'+i+'"><span>'+esc(V.persons[i])+'</span><input id="random-verb-form-'+i+'" data-person="'+i+'" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="80" required></label>').join('')+'</div>';
  const restricted=full&&indices.length<6?'<p class="meta">'+tr('Este verbo se practica aquí en los contextos habituales de tercera persona; no se presenta como paradigma completo de seis personas.','Dit werkwoord oefen je hier in gebruikelijke contexten met de derde persoon; dit zijn niet alle zes persoonsvormen.')+'</p>':'';
  const count=candidates().length;
  main.querySelector('#random-verb-filter-count').textContent=count+' / 100 '+tr('verbos en la selección','werkwoorden in de selectie');
  stage.innerHTML='<section class="study-card random-verb-card"><h2 lang="es">'+S.token(root.BiblioPhoneticsAudioData.wordId(v.infinitive),lang)+'</h2><p lang="nl">'+esc(v.nl)+'</p>'+
   '<p class="meta">'+tr('Presente de indicativo','Tegenwoordige tijd')+' · '+tr(isIrregular(v)?'Irregular':'Regular',isIrregular(v)?'Onregelmatig':'Regelmatig')+' · '+esc(v.infinitive.replace(/se$/,'').slice(-2))+'</p>'+
   personLabel+restricted+'<form id="random-verb-form">'+field+'<button type="submit">'+tr('Comprobar','Controleren')+'</button></form>'+
   '<p class="random-feedback" role="status" aria-live="polite"></p><div class="random-solution"></div>'+
   '<div class="random-verb-actions"><button type="button" id="random-verb-reveal">'+tr('Mostrar solución','Antwoord tonen')+'</button>'+
   '<button type="button" id="random-verb-person">'+tr('Cambiar de persona (mismo verbo)','Andere persoon (zelfde werkwoord)')+'</button>'+
   '<button type="button" id="random-verb-next" class="primary">'+tr('Siguiente verbo','Volgend werkwoord')+'</button></div>'+
   '<p id="random-verb-note" class="meta"></p></section>';
  S.bindTokens(stage,lang);
  const nextButton=stage.querySelector('#random-verb-next');
  nextButton.disabled=count<2;
  if(count<2)stage.querySelector('#random-verb-note').textContent=tr('Solo hay un verbo con estos filtros. Amplía la selección para obtener otro.','Met deze filters is er maar één werkwoord. Verbreed de selectie voor een ander werkwoord.');
  stage.querySelector('#random-verb-person').disabled=v.eligible.length<2;
  nextButton.onclick=()=>{next();stage.querySelector('input')?.focus();};
  stage.querySelector('#random-verb-person').onclick=()=>{const other=otherPerson(v,person);if(other===null)return;person=other;if(mode.value==='full')mode.value='single';draw();stage.querySelector('input')?.focus();};
  stage.querySelector('#random-verb-reveal').onclick=()=>{
   usedHelp=true;done=true;solution(indices);
   const out=stage.querySelector('.random-feedback');out.textContent=tr('Solución consultada. Este intento no cuenta como respuesta independiente.','Antwoord bekeken. Deze poging telt niet als zelfstandig antwoord.');
   stage.querySelectorAll('input').forEach(i=>i.disabled=true);stage.querySelector('form button').disabled=true;stage.querySelector('#random-verb-reveal').disabled=true;
  };
  stage.querySelector('form').onsubmit=e=>{
   e.preventDefault();if(done)return;
   const responses=indices.map(i=>({i,input:single?stage.querySelector('#random-verb-answer'):stage.querySelector('#random-verb-form-'+i)}));
   if(responses.some(x=>!x.input.value.trim())){stage.querySelector('.random-feedback').textContent=tr('Completa todas las respuestas antes de comprobar.','Vul alle antwoorden in voordat je ze controleert.');return;}
   attempt++;
   let good=0;
   for(const x of responses){
    const correct=V.normalize(x.input.value)===V.normalize(v.present[x.i]);if(correct)good++;
    x.input.setAttribute('aria-invalid',String(!correct));
    save(x.input.value,correct,x.i,full);
   }
   const allGood=good===responses.length,out=stage.querySelector('.random-feedback');
   out.textContent=allGood?tr('Correcto. Puedes cambiar de persona o seguir con otro verbo.','Goed. Kies een andere persoon of ga verder met een nieuw werkwoord.'):tr(good+' de '+responses.length+' formas correctas. Revisa las personas y las tildes. Puedes reintentar.',''+good+' van '+responses.length+' vormen goed. Controleer de personen en accenten. Probeer opnieuw.');
   root.BiblioFeedback.mark(out,allGood,lang);
   if(allGood){
    done=true;responses.forEach(x=>x.input.disabled=true);
    stage.querySelector('form button').disabled=true;stage.querySelector('#random-verb-reveal').disabled=true;
    solution(indices);
   }else stage.querySelector('form button').textContent=tr('Reintentar','Opnieuw proberen');
  };
 }
 function next(){
  const chosen=choose(v?.id,Math.random,options());if(!chosen){
   stage.innerHTML='<section class="study-card"><p role="status">'+tr('No hay otro verbo para estos filtros. Prueba una selección más amplia.','Geen ander werkwoord met deze filters. Kies ruimere filters.')+'</p></section>';
   return;
  }
  v=chosen;
  const selected=Number(initial.value);
  person=initial.value!=='random'&&v.eligible.includes(selected)?selected:V.pick(v);
  draw();
 }
 type.onchange=()=>{v=null;next();};
 ending.onchange=()=>{v=null;next();};
 mode.onchange=()=>{if(v)draw();};
 initial.onchange=()=>{if(v&&mode.value==='single'){person=initial.value!=='random'&&v.eligible.includes(Number(initial.value))?Number(initial.value):V.pick(v);draw();}};
 next();
}
root.BiblioRandomVerbs={choose,otherPerson,isIrregular,pool,render};
})(typeof window!=='undefined'?window:globalThis);
