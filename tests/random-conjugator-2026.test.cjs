const {test}=require('node:test'),assert=require('node:assert/strict'),{environment}=require('./browser-fixture.cjs');
function setup(lang='es'){
 const e=environment(undefined,undefined,'#conjugador'),spoken=[];
 e.window.speechSynthesis={getVoices:()=>['es-ES','es-MX','nl-NL'].map(code=>({name:code,lang:code})),cancel(){},speak(u){spoken.push(u);}};
 e.window.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
 e.window.BiblioSpeech.updateVoices();
 if(lang==='nl')e.document.querySelector('[data-lang="nl"]').onclick();
 return {...e,spoken,close(){e.window.BiblioSpeech.stop(false);e.window.BiblioPlatform.records().close();}};
}
test('los cien verbos son filtrables por terminación y regularidad del presente',()=>{
 const e=setup(),V=e.window.BiblioVerbs,M=e.window.BiblioRandomVerbs;
 assert.equal(V.verbs.length,100);assert.equal(M.pool().length,100);
 assert.equal(M.isIrregular(V.get('hablar')),false);assert.equal(M.endingOf(V.get('oir')),'ir');assert(M.pool({ending:'ir'}).some(v=>v.id==='oir'));assert.equal(M.isIrregular(V.get('tener')),true);
 assert.equal(M.isIrregular(V.get('levantarse')),false);assert.equal(M.isIrregular(V.get('despertarse')),true);
 for(const [type,expect] of [['regular',false],['irregular',true]]){
  const matches=M.pool({type,ending:'ar'});
  assert(matches.length>0);
  assert(matches.every(v=>v.infinitive.replace(/se$/,'').endsWith('ar')&&M.isIrregular(v)===expect));
 }
 const previous=M.pool({type:'regular',ending:'ar'})[0].id;
 for(let i=0;i<20;i++)assert.notEqual(M.choose(previous,()=>i/20,{type:'regular',ending:'ar'}).id,previous);
 assert.equal(M.choose('nada',()=>0,{ending:'xx'}),null);
 e.close();
});
test('los botones cambian de persona sin cambiar el verbo o sortean un verbo nuevo',()=>{
 const e=setup(),V=e.window.BiblioVerbs,Vpick=V.pick;
 V.pick=()=>2;e.route('conjugador');
 const stage=e.document.querySelector('#random-verb-stage'),title=()=>stage.querySelector('h2 span[lang=es]').textContent,person=()=>Number(stage.querySelector('#random-verb-current-person').dataset.person);
 const first=title(),firstPerson=person();
 stage.querySelector('#random-verb-person').click();
 assert.equal(title(),first);assert.notEqual(person(),firstPerson);
 assert(stage.querySelector('#random-verb-next').textContent.includes('Siguiente verbo'));
 stage.querySelector('#random-verb-next').click();
 assert.notEqual(title(),first);
 V.pick=Vpick;e.close();
});
test('puede elegir persona inicial y resolver todas las personas de un mismo verbo',()=>{
 const e=setup(),V=e.window.BiblioVerbs;
 const selector=e.document.querySelector('#random-verb-person-select');selector.value='2';selector.onchange();
 assert.equal(Number(e.document.querySelector('#random-verb-current-person').dataset.person),2);
 const mode=e.document.querySelector('#random-verb-mode');mode.value='full';mode.onchange();
 const stage=e.document.querySelector('#random-verb-stage');
 const name=stage.querySelector('h2 span[lang=es]').textContent,verb=V.verbs.find(v=>v.infinitive===name);
 const forms=[...stage.querySelectorAll('[data-person]')];
 assert.equal(forms.length,verb.eligible.length);
 for(const input of forms)input.value=verb.present[Number(input.dataset.person)];
 stage.querySelector('form').onsubmit({preventDefault(){}});
 assert.equal(stage.querySelector('.random-feedback').dataset.feedback,'correct');
 assert.equal(stage.querySelectorAll('.random-solution [data-read-text]').length,verb.eligible.length);
 stage.querySelector('#random-verb-person').click();
 assert.equal(stage.querySelector('h2 span[lang=es]').textContent,name);
 assert.equal(mode.value,'single');
 e.close();
});
test('la navegación queda disponible antes de responder y muestra el alcance limitado a presente',()=>{
 const e=setup('nl'),stage=e.document.querySelector('#random-verb-stage');
 assert(stage.querySelector('#random-verb-person'));assert(stage.querySelector('#random-verb-next'));
 assert(e.document.querySelector('#contenido').textContent.includes('Andere tijden zijn nog niet gevalideerd'));
 assert(e.document.querySelector('#random-verb-type'));assert(e.document.querySelector('#random-verb-ending'));
 stage.querySelector('#random-verb-reveal').click();
 assert(stage.querySelector('.random-feedback').textContent.includes('niet als zelfstandig antwoord'));
 assert(stage.querySelector('#random-verb-next').disabled===false);
 e.close();
});

test('los filtros de interfaz seleccionan únicamente verbos del grupo pedido',()=>{
 const e=setup(),V=e.window.BiblioVerbs,M=e.window.BiblioRandomVerbs;
 const end=e.document.querySelector('#random-verb-ending'),type=e.document.querySelector('#random-verb-type'),name=()=>e.document.querySelector('#random-verb-stage h2 span[lang=es]').textContent;
 end.value='ir';end.onchange();type.value='irregular';type.onchange();
 assert(V.get(name()).infinitive.replace(/se$/,'').endsWith('ir'));
 assert(M.isIrregular(V.get(name())));
 assert.match(e.document.querySelector('#random-verb-filter-count').textContent,/\/ 100/);
 const previous=name(),stage=e.document.querySelector('#random-verb-stage');
 stage.querySelector('#random-verb-next').click();assert.notEqual(name(),previous);
 e.close();
});
