const {test}=require('node:test'),assert=require('node:assert/strict');
const {environment}=require('./browser-fixture.cjs');
const resources=require('../content/visual-resources.js');
test('visual registry is additive, versioned and rejects unsupported resource types',()=>{
 assert.equal(resources.validate().schema,1);
 assert.throws(()=>resources.validate({schema:2}));
 assert.throws(()=>resources.validate({schema:1,lessons:{x:{version:1,kind:'untrusted',title:{es:'a',nl:'b'}}},decks:{}}));
});
test('grammar pilots change examples without changing learner evidence in either language',()=>{
 const e=environment(undefined,undefined,'#inicio');e.window.BiblioJourney.store.enter('Ana','1234567');
 const before=JSON.stringify(e.window.BiblioJourney.store.current().learningEvents||[]);
 for(const lang of ['es','nl']){
  if(lang==='nl')e.document.querySelector('[data-lang="nl"]').onclick();
  for(const id of ['F37','F50']){e.route(id+'/teoria');const box=e.document.querySelector('#teoria .visual-anchor');assert(box);assert.equal(box.querySelectorAll('[aria-pressed="true"]').length,1);box.querySelector('[data-anchor-state="1"]').click();assert.equal(box.querySelector('[data-anchor-state="1"]').getAttribute('aria-pressed'),'true');assert(box.querySelector('figcaption').textContent.includes(id==='F37'?'gustan':'trabajaba'));assert(box.querySelector('[aria-live="polite"]'));}
 }
 assert.equal(JSON.stringify(e.window.BiblioJourney.store.current().learningEvents||[]),before);
 const audit=resources.inventory(e.window.GRAMMAR,e.window.BIBLIO_VOCABULARY);assert.equal(audit.lessons.length,123);assert.equal(audit.decks.reduce((n,d)=>n+d.cards,0),400);
 e.window.BiblioPlatform.records().close();
});
test('vocabulary previews keep existing decks and backups and submenu identifies current route',()=>{
 const e=environment(undefined,undefined,'#inicio');e.window.BiblioJourney.store.enter('Ana','1234567');const backup=e.window.BiblioJourney.store.backup();
 for(const id of ['v-rutina','v-aula','v-ciudad']){e.route('vocabulario/'+id);const box=e.document.querySelector('.visual-anchor');assert(box?.querySelector('svg[role="img"][aria-label]'));box.querySelector('[data-anchor-state="1"]').click();assert(box.querySelector('figcaption').textContent);assert(e.document.querySelector('#v-start'));}
 e.route('repaso');assert.equal(e.document.querySelector('.primary-navigation a[aria-current="page"]').getAttribute('href'),'#estudiar');
 e.window.BiblioJourney.store.restore(backup);assert.equal((e.window.BiblioJourney.store.current().learningEvents||[]).length,0);
 e.window.BiblioPlatform.records().close();
});
