const {test}=require('node:test'),assert=require('node:assert/strict');
const R=require('../modules/learning-report.js');
const DAY=86400000,now=Date.parse('2026-10-29T12:00:00Z');
const iso=n=>new Date(now-n*DAY).toISOString();
function profile(){return {code:'1234567',lessons:{F01:{openedAt:iso(2),studiedAt:iso(1)},F02:{openedAt:iso(45)}},attempts:[],practice:[],learningEvents:[
 {kind:'review',createdAt:iso(3),payload:{type:'answer',domain:'vocabulary',deckId:'v-medioambiente-b2',modality:'independent-production',correct:true,response:'confidencial',key:'vocabulary:x'}},
 {kind:'review',createdAt:iso(2),payload:{type:'answer',domain:'vocabulary',deckId:'v-medioambiente-b2',modality:'recognition',correct:false,response:'error privado'}},
 {kind:'review',createdAt:iso(35),payload:{type:'answer',domain:'grammar',correct:true}},
 {kind:'work',createdAt:iso(1),payload:{status:'submitted',body:'texto muy personal'}},
 {kind:'goal',createdAt:iso(1),payload:{key:'personal',privateNotes:'nota privada'}}
]};}
test('informe voluntario resume solo actividad reciente, distingue modalidades y descarta textos',()=>{
 const p=profile(),r=R.create(p,now),serialized=JSON.stringify(r);
 assert.equal(r.activity.answered,2);assert.equal(r.activity.correct,1);assert.equal(r.activity.vocabulary,2);
 assert.equal(r.activity.grammar,0);assert.equal(r.activity.recognition,1);assert.equal(r.activity.independent,1);
 assert.equal(r.activity.studiedLessons,1);assert.equal(r.activity.consultedLessons,1);assert.equal(r.activity.submittedDesigns,1);
 assert.equal(r.decks[0].answers,2);
 for(const phrase of ['confidencial','error privado','texto muy personal','nota privada'])assert(!serialized.includes(phrase));
 assert.equal(R.parse(serialized).studentCode,'1234567');
});
test('rechaza ficheros arbitrarios o inconsistentes y escapa códigos mostrados',()=>{
 const r=R.create(profile(),now);const bad=structuredClone(r);bad.activity.correct=9999;
 assert.throws(()=>R.parse(JSON.stringify(bad)),/incorrectos/);
 assert.throws(()=>R.parse('x'.repeat(50001)),/50 kB/);
 assert.throws(()=>R.parse('{}'),/compatible/);
 const v=R.view(r,'nl',[{id:'v-medioambiente-b2',title:{nl:'Milieu'}}]);
 assert.match(v,/Milieu/);assert.match(v,/geen beheersing/);assert(!v.includes('nota privada'));
});
test('la vista de Progreso ofrece descarga sin transmitir automáticamente los datos',()=>{
 const {environment}=require('./browser-fixture.cjs'),e=environment(undefined,undefined,'#dashboard');
 e.window.BiblioJourney.store.enter('Ana','1234567');e.route('dashboard');
 const block=e.document.querySelector('#student-learning-report');
 assert(block);assert(block.querySelector('#download-learning-report'));
 assert.match(block.textContent,/No se envía automáticamente/);
 e.window.BiblioPlatform.records().close();
});
