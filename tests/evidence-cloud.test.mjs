import {test} from 'node:test';import assert from 'node:assert/strict';import {mergeProfile} from '../server/cloud/lib/learner-api.mjs';
const base=()=>({id:'fontys-1234567',code:'1234567',name:'Ana',updatedAt:'2026-10-18T10:00:00Z',lessons:{},attempts:[],practice:[]});
test('server preserves evidence from concurrent devices and legacy clients, rejecting conflicting immutable records',()=>{
 const a=base(),b=base();a.learningEvents=[{id:'review-device-a',kind:'review',createdAt:a.updatedAt,payload:{type:'answer',key:'vocab:one',direction:'nl-es',correct:false,help:false}}];b.learningEvents=[{id:'work-device-b',kind:'work',createdAt:b.updatedAt,payload:{key:'lab:one',status:'draft',objective:'Un objetivo'}}];
 const both=mergeProfile(a,b,a.code);assert.equal(both.learningEvents.length,2);assert.equal(mergeProfile(both,base(),a.code).learningEvents.length,2);assert.equal(mergeProfile(both,b,a.code).learningEvents.length,2);const conflict=structuredClone(a);conflict.learningEvents[0].payload.correct=true;assert.throws(()=>mergeProfile(both,conflict,a.code),e=>e.status===409);assert.throws(()=>mergeProfile(both,{...b,code:'other'},a.code),e=>e.status===400);
});
test('server rejects malformed event histories before accepting a profile',()=>{
 for(const learningEvents of [[{id:'bad',kind:'review',createdAt:'yesterday',payload:{}}],[{id:'valid-event',kind:'untrusted-kind',createdAt:'2026-10-18T10:00:00Z',payload:{}}]])assert.throws(()=>mergeProfile(null,{...base(),learningEvents},'1234567'),e=>e.status===400);
});
test('new answer metadata and solution exposure survive a legacy profile synchronisation',()=>{
 const p=base();p.learningEvents=[{id:'answer-schema-two',kind:'review',createdAt:p.updatedAt,payload:{schema:2,type:'answer',key:'vocab:one',direction:'nl-es',mode:'write',modality:'assisted-production',attempt:2,help:true,sessionId:'session-one',contextId:'sense-one:example-one',correct:true}},{id:'exposure-schema-two',kind:'review',createdAt:p.updatedAt,payload:{schema:2,type:'exposure',key:'vocab:one',direction:'es-nl',source:'flash-reveal'}}];
 const result=mergeProfile(mergeProfile(null,p,p.code),base(),p.code);assert.deepEqual(result.learningEvents,p.learningEvents);
});
