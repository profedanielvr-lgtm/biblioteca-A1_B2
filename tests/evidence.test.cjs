const {test}=require('node:test'),assert=require('node:assert/strict');
const E=require('../modules/evidence-model.js'),V=require('../content/vocabulary.js');
const event=(id,at,payload,kind='review')=>({id,kind,createdAt:at,payload});
test('receptive and productive evidence stay separate; immediate correction is not delayed retrieval',()=>{
 const key='vocab:test',a=event('answer-1','2026-10-01T10:00:00Z',{type:'answer',key,direction:'nl-es',correct:false,mode:'write'}),b=event('answer-2','2026-10-01T10:01:00Z',{type:'answer',key,direction:'nl-es',correct:true,help:true,mode:'write'}),c=event('answer-3','2026-10-03T10:00:00Z',{type:'answer',key,direction:'nl-es',correct:true,mode:'write'});
 assert.equal(E.reviewState(key,'nl-es',[a,b]).delayed,0);assert.equal(E.reviewState(key,'es-nl',[a,b]).count,0);assert.equal(E.reviewState(key,'nl-es',[a,b,c]).delayed,1);assert(E.reviewState(key,'nl-es',[a,b,c]).interval>1);
 const matched={...c,id:'answer-4',payload:{...c.payload,mode:'match'}};assert.equal(E.reviewState(key,'nl-es',[a,b,matched]).delayed,0);
});
test('difficult cards enter the general queue without overwriting their answer history',()=>{
 const star=event('star-1','2026-10-04T10:00:00Z',{key:'star:vocab:x',value:true},'goal');const state=E.queue([{key:'vocab:x',direction:'nl-es'},{key:'vocab:y',direction:'nl-es'}],[star]);assert.equal(state[0].key,'vocab:x');assert.equal(state[0].state.star,true);assert.equal(E.reviews([star]).length,0);
});
test('concurrent evidence merges idempotently, rejects conflicting IDs and retains collection resources',()=>{
 const a=event('collection-a','2026-10-04T10:00:00Z',{key:'collection:x',title:'Clase',resources:[{route:'F01'}]},'collection'),b=event('collection-b','2026-10-04T11:00:00Z',{key:'collection:x',title:'Clase',resources:[{route:'F02'}]},'collection');assert.equal(E.merge([a],[a,b]).length,2);assert.throws(()=>E.merge([a],[{...a,payload:{...a.payload,title:'changed'}}]));assert.deepEqual(E.collectionState(E.merge([a],[b]))[0].resources.map(r=>r.route),['F02','F01']);
});
test('starter decks provide unique sense cards, both languages and contextual examples at every level',()=>{
 assert.equal(V.decks.length,8);assert.equal(V.decks.flatMap(d=>d.cards).length,80);const ids=new Set();for(const d of V.decks)for(const c of d.cards){assert(!ids.has(c.id));ids.add(c.id);for(const l of ['es','nl']){assert(c.term[l]);assert(c.example[l]);assert(c.accepted[l].includes(c.term[l]));}}assert.deepEqual([...new Set(V.decks.map(d=>d.level))],['A1','A2','B1','B2']);
});
