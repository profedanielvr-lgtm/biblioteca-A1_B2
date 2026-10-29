const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {environment}=require('./browser-fixture.cjs');
const Report=require('../modules/progress-pdf.js');
function setup(route='conjugador'){const e=environment(undefined,undefined,'#'+route);e.window.speechSynthesis={getVoices:()=>[{lang:'es-ES',name:'Spanish'}],cancel(){},speak(){}};e.window.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};e.window.BiblioSpeech.updateVoices();return e;}
function close(e){e.window.BiblioSpeech.stop(false);e.window.BiblioPlatform.records().close();}
test('el corpus offline incluye cien verbos y veinte paradigmas por infinitivo',()=>{
 const e=setup(),v=e.window.BiblioVerbs,p=e.window.BIBLIO_PARADIGMS;
 assert.equal(v.verbs.length,100);assert.equal(p.tenses.length,20);assert.equal(Object.keys(p.verbs).length,100);
 for(const x of v.verbs){const forms=p.verbs[x.infinitive]?.tenses;assert(forms,'Falta '+x.infinitive);assert.equal(Object.keys(forms).length,20);for(const arr of Object.values(forms))assert.equal(arr.length,6);}
 const forms=(verb,tense)=>p.verbs[verb].tenses[tense];
 assert.equal(forms('hablar','indicativo-imperfecto')[0],'hablaba');
 assert.equal(forms('hablar','indicativo-perfecto')[0],'he hablado');
 assert.equal(forms('hablar','subjuntivo-presente')[0],'hable');
 assert.equal(forms('hablar','subjuntivo-pluscuamperfecto-ra')[0],'hubiera hablado');
 assert.equal(forms('ser','indicativo-indefinido')[0],'fui');
 assert.equal(forms('tener','indicativo-futuro')[0],'tendré');
 assert.equal(forms('ir','subjuntivo-presente')[0],'vaya');
 assert.equal(forms('hablar','imperativo-negativo')[1],'no hables');
 close(e);
});
test('el estudiante puede cambiar entre pasados, futuros, subjuntivos e imperativos y obtener feedback fiable',()=>{
 const e=setup(),V=e.window.BiblioVerbs;
 const tense=e.document.querySelector('#random-verb-tense');
 assert(tense);assert.equal(tense.querySelectorAll('option').length,20);
 for(const id of ['indicativo-indefinido','indicativo-futuro-compuesto','subjuntivo-presente','subjuntivo-imperfecto-ra','imperativo-negativo']){
  tense.value=id;tense.onchange();const stage=e.document.querySelector('#random-verb-stage');
  assert(stage.querySelector('h2'));assert(stage.querySelector('#random-verb-next'));assert(stage.querySelector('#random-verb-person'));
  assert(stage.querySelector('#random-verb-answer'));
  const name=stage.querySelector('h2 span[lang=es]').textContent,verb=V.verbs.find(v=>v.infinitive===name),person=Number(stage.querySelector('#random-verb-current-person').dataset.person);
  assert(verb);const answer=e.window.BIBLIO_PARADIGMS.verbs[verb.infinitive].tenses[id][person];
  assert(typeof answer==='string');stage.querySelector('#random-verb-answer').value=answer;
  stage.querySelector('form').onsubmit({preventDefault(){}});
  assert.equal(stage.querySelector('.random-feedback').dataset.feedback,'correct');
 }
 close(e);
});
test('el informe PDF se basa en los datos actuales y nunca reproduce respuestas privadas',()=>{
 const p={code:'1234567',name:'Estudiante',lessons:{F01:{openedAt:'2026-10-27T10:00:00Z',studiedAt:'2026-10-28T10:00:00Z'}},attempts:[],practice:[],learningEvents:[
  {kind:'review',createdAt:'2026-10-28T10:00:00Z',payload:{type:'answer',domain:'vocabulary',deckId:'v-hogar',modality:'independent-production',attempt:1,correct:true,response:'SECRETO_PRIVADO'}},
  {kind:'scenario',createdAt:'2026-10-28T11:00:00Z',payload:{source:'conjugador-aleatorio',tense:'subjuntivo-imperfecto-ra',verb:'tener',correct:false,response:'SECRETO_PRIVADO_2'}}
 ]};
 const a=Report.current(p,Date.parse('2026-10-29T09:00:00Z'));
 assert.equal(a.total.lessonsStudied,1);assert.equal(a.total.reviewAnswers,1);assert.equal(a.total.conjugationAnswers,1);
 assert.equal(a.tenses[0].id,'subjuntivo-imperfecto-ra');
 const text=Report.lines(a,'es').map(x=>x.text).join('\n');
 assert.match(text,/Estado de aprendizaje/);assert.match(text,/Conjugación/);
 assert.doesNotMatch(text,/SECRETO_PRIVADO/);assert.doesNotMatch(JSON.stringify(a),/SECRETO_PRIVADO/);
 const more=structuredClone(p);more.learningEvents.push({kind:'scenario',createdAt:'2026-10-28T12:00:00Z',payload:{source:'conjugador-aleatorio',tense:'subjuntivo-imperfecto-ra',verb:'tener',correct:true}});
 assert.equal(Report.current(more,Date.parse('2026-10-29T09:00:00Z')).total.conjugationAnswers,2);
});
test('produce un PDF verdadero y con páginas a partir de datos sin texto literal de respuestas',()=>{
 const {jsPDF}=require('jspdf');const summary=Report.current({code:'1234567',name:'Prueba',lessons:{},attempts:[],practice:[],learningEvents:[]});
 const document=Report.renderPdf(summary,'es',[],[],{},jsPDF);
 const bytes=Buffer.from(document.output('arraybuffer'));
 assert.equal(bytes.subarray(0,5).toString('ascii'),'%PDF-');
 assert(bytes.length>1500);
});
test('el botón de descarga PDF está disponible al abrir Progreso',()=>{
 const e=setup('dashboard');e.window.BiblioJourney.store.enter('Test','1234567');e.route('dashboard');
 const button=e.document.querySelector('#download-status-pdf');
 assert(button);assert.match(button.textContent,/PDF/);close(e);
});
