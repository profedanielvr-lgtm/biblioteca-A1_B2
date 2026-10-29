const {test}=require('node:test'),assert=require('node:assert/strict');
const Analytics=require('../modules/teacher-insights.js');
const vocabulary=require('../content/vocabulary.js');
require('../content/vocabulary-expanded.js');

test('los mazos añadidos conservan identificadores y ejemplos completos',()=>{
 const decks=vocabulary.decks,cards=decks.flatMap(x=>x.cards),ids=cards.map(x=>x.id);
 assert.equal(decks.length,20);assert.equal(cards.length,320);assert.equal(new Set(ids).size,cards.length);
 for(const slug of ['comida-fuera','tiempo-atmosferico','aprendizaje','debate-critico']){
  const deck=decks.find(x=>x.id==='v-'+slug);assert.ok(deck);assert.equal(deck.cards.length,20);
 }
 assert.ok(cards.some(x=>x.id==='v-rutina-1'));
 for(const card of cards){assert.ok(card.term.es);assert.ok(card.term.nl);assert.ok(card.example.es);assert.ok(card.example.nl);}
 for(const deck of decks.filter(x=>x.level==='B2'&&x.references?.length)){
  assert.ok(deck.references[0].url.includes('b1-b2.htm'),'Un mazo B2 no debe enlazar al inventario A1–A2');
 }
});
test('el profesor recibe solo un resumen de intentos, con agregaciones correctas',()=>{
 const rows=[
  {studentCode:'12345',classPin:'A12345',completedAt:'2026-10-28T10:00:00Z',items:[{cardId:'F01',correct:false},{cardId:'F02',correct:true}]},
  {studentCode:'67890',classPin:'A12345',completedAt:'2026-10-28T11:00:00Z',items:[{cardId:'F01',correct:false}]}
 ];
 const r=Analytics.summarise(rows);assert.equal(r.attempts,2);assert.equal(r.questions,3);assert.equal(r.correct,1);
 assert.equal(r.students.length,2);assert.equal(r.classes.length,1);
 assert.equal(r.topics.length,1);assert.equal(r.topics[0].key,'F01');
 const html=Analytics.render(rows,'es',[{id:'F01',title:{es:'Repaso de verbos'}}]);
 assert.match(html,/Repaso de verbos/);assert.match(html,/Los códigos no verifican identidad/);
 assert.doesNotMatch(html,/fetch\(/);
});
test('no interpreta datos incompletos como intentos válidos ni inyecta HTML',()=>{
 const rows=[{studentCode:'<script>alert(1)</script>',classPin:'X',completedAt:'2026-10-28T10:00:00Z',items:[{question:'<img src=x onerror=alert(1)>',correct:false},{question:'<img src=x onerror=alert(1)>',correct:false}]}];
 const html=Analytics.render(rows);
 assert.doesNotMatch(html,/<script>/);assert.doesNotMatch(html,/<img/);
 assert.match(html,/&lt;script&gt;/);
 assert.equal(Analytics.summarise([{},null]).attempts,0);
});
