const {test}=require('node:test'),assert=require('node:assert/strict');
const E=require('../modules/evidence-model.js'),V=require('../content/vocabulary.js');
const {environment}=require('./browser-fixture.cjs');
const key='vocab:sample',at=d=>'2026-10-'+String(d).padStart(2,'0')+'T10:00:00Z';
const row=(id,day,p)=>({id,kind:'review',createdAt:at(day),payload:{schema:2,attempt:1,key,type:'answer',direction:'nl-es',correct:true,mode:'write',...p}});
test('retention requires three days since the latest recorded exposure, including reverse direction',()=>{
 const initial=row('initial',1,{}),later=row('later',5,{});assert.equal(E.reviewState(key,'nl-es',[initial,later]).retained,1);
 for(const exposure of [row('reverse',4,{direction:'es-nl'}),row('reveal',4,{type:'exposure',source:'flash-reveal'})])assert.equal(E.reviewState(key,'nl-es',[initial,exposure,later]).retained,0);
 assert.equal(E.reviewState(key,'nl-es',[initial,row('retry',5,{attempt:2})]).retained,0);
 assert.equal(E.reviewState(key,'nl-es',[initial,row('unknown',5,{mode:'unknown'})]).retained,0);
 assert.equal(E.reviewState(key,'nl-es',[initial,row('assisted',5,{help:true})]).retained,0);
 assert.equal(E.reviewState(key,'nl-es',[initial,row('daytwo',3,{})]).delayed,1);
 assert.equal(E.reviewState(key,'nl-es',[initial,row('daytwo',3,{})]).retained,0);
});
test('contextual alternatives accept the intended sense without widening to unrelated meanings',()=>{
 const e=environment(undefined,undefined,'#inicio');const card=V.decks.flatMap(d=>d.cards).find(c=>c.term.es==='el billete');
 assert.equal(e.window.Practice.grade({answers:card.accepted.nl,mode:'word'},'het ticket'),'correct');
 assert.notEqual(e.window.Practice.grade({answers:card.accepted.nl,mode:'word'},'het bankbiljet'),'correct');
 assert(card.senseId&&card.contextId&&card.usage.nl);e.window.BiblioPlatform.records().close();
});
test('resuming after a hint retains assistance and attempt count rather than recording independent success',()=>{
 const e=environment(undefined,undefined,'#inicio');e.window.BiblioJourney.store.enter('Ana','1234567');e.route('vocabulario/v-rutina');e.document.querySelector('#v-mode').value='write';e.document.querySelector('#v-start').click();
 let form=e.document.querySelector('#recall-form');form.elements.answer.value='wrong';form.onsubmit({preventDefault(){}});
 const first=e.window.BiblioEvidence.reviews()[0];const item=e.window.BiblioHub.vocabItems().find(x=>x.key===first.payload.key&&x.direction===first.payload.direction);
 e.route('biblioteca');e.route('vocabulario/v-rutina');e.document.querySelector('#v-mode').value='write';e.document.querySelector('#v-start').click();e.document.querySelector('#resume').click();
 form=e.document.querySelector('#recall-form');form.elements.answer.value=item.answers[0];form.onsubmit({preventDefault(){}});
 const answer=e.window.BiblioEvidence.reviews().at(-1);assert.equal(answer.payload.correct,true);assert.equal(answer.payload.help,true);assert.equal(answer.payload.attempt,2);assert.equal(answer.payload.modality,'assisted-production');assert.equal(answer.payload.sessionId,first.payload.sessionId);
 const count=e.window.BiblioEvidence.reviews().length;form.onsubmit({preventDefault(){}});assert.equal(e.window.BiblioEvidence.reviews().length,count);
 assert(e.window.BiblioEvidence.events().some(x=>x.payload.type==='exposure'));e.window.BiblioPlatform.records().close();
});
test('moving to a fresh question clears the previous attempt flags in its saved draft',()=>{
 const e=environment(undefined,undefined,'#inicio');e.window.BiblioJourney.store.enter('Ana','1234567');e.route('vocabulario/v-rutina');e.document.querySelector('#v-mode').value='test';e.document.querySelector('#v-start').click();
 const form=e.document.querySelector('#recall-form');form.elements.answer.value='respuesta de prueba';form.onsubmit({preventDefault(){}});
 const draft=e.window.BiblioEvidence.events().filter(x=>x.kind==='session').at(-1).payload;
 assert.equal(draft.at,1);assert.equal(draft.tries,0);assert.equal(draft.help,false);assert.equal(draft.resolved,false);
 e.window.BiblioPlatform.records().close();
});
