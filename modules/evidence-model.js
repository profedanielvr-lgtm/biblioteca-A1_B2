(function(root){'use strict';
const DAY=86400000,copy=x=>JSON.parse(JSON.stringify(x)),stamp=()=>new Date().toISOString();
const kinds=['work','collection','collection-remove','goal','review','scenario','diagnostic','session'];
function validate(events){if(!Array.isArray(events)||events.length>20000)throw Error('Historial de evidencias no válido / Ongeldige leergegevens');const ids=new Set();for(const e of events){if(!e||!/^[-\w]{5,100}$/.test(e.id)||ids.has(e.id)||!kinds.includes(e.kind)||!Number.isFinite(Date.parse(e.createdAt))||!e.payload||typeof e.payload!=='object'||Array.isArray(e.payload)||JSON.stringify(e.payload).length>60000)throw Error('Evidencia no válida / Ongeldige leergegevens');ids.add(e.id);}return events;}
const canonical=x=>JSON.stringify(x&&typeof x==='object'?Array.isArray(x)?x.map(v=>JSON.parse(canonical(v))):Object.fromEntries(Object.keys(x).sort().map(k=>[k,JSON.parse(canonical(x[k]))])):x);
function merge(a=[],b=[]){validate(a);validate(b);const m=new Map();for(const e of [...a,...b]){if(m.has(e.id)&&canonical(m.get(e.id))!==canonical(e))throw Error('Conflicto de evidencia: se conservan las copias / Conflict in leergegevens');m.set(e.id,copy(e));}const out=[...m.values()].sort((a,b)=>a.createdAt.localeCompare(b.createdAt)||a.id.localeCompare(b.id));validate(out);return out;}
function events(){return root.BiblioJourney?.store.current()?.learningEvents||[];}
function add(kind,payload,cardId){const store=root.BiblioJourney.store,p=store.current();if(!p)throw Error('Abre tu perfil para guardar / Open je profiel om te bewaren');const e={id:root.crypto?.randomUUID?.()||'ev-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2),kind,createdAt:new Date(Math.max(Date.now(),...events().map(x=>Date.parse(x.createdAt)+1))).toISOString(),payload:copy(payload),...(cardId?{cardId}:{})};validate([e]);store.save(()=>{p.learningEvents=merge(p.learningEvents||[],[e]);p.updatedAt=e.createdAt;});return e;}
function latest(kind,key,list=events()){return list.filter(e=>e.kind===kind&&e.payload.key===key).sort((a,b)=>b.createdAt.localeCompare(a.createdAt)||b.id.localeCompare(a.id))[0];}
function reviews(list=events()){return list.filter(e=>e.kind==='review'&&e.payload.type==='answer');}
function reviewState(key,direction,list=events(),now=Date.now()){
 const all=reviews(list).filter(e=>e.payload.key===key&&e.payload.direction===direction).sort((a,b)=>a.createdAt.localeCompare(b.createdAt)||a.id.localeCompare(b.id));let interval=0,due=0,last=null,delayed=0;
 for(const e of all){const p=e.payload,at=Date.parse(e.createdAt),independent=p.correct===true&&!p.help&&!['match','flash','choose','order'].includes(p.mode),gap=last?at-Date.parse(last.createdAt):0;
  if(independent){if(gap>=DAY)delayed++;interval=gap>=DAY?Math.min(90,Math.max(1,interval)*2.2):Math.max(1,interval||1);due=at+interval*DAY;}else{interval=0;due=at+(p.mode==='flash'?DAY:p.correct?4*3600000:10*60000);}last=e;
 }
 const star=latest('goal','star:'+key,list)?.payload.value===true;
 return {key,direction,count:all.length,last,interval,due:due||now,delayed,star,dueNow:!last||due<=now,priority:(last?.payload.correct===false?5:0)+(last?.payload.correct===false&&last.payload.confidence===3?2:0)+(last?.payload.help?2:0)+(star?4:0)+(due&&due<now?Math.min(7,(now-due)/DAY):0)};
}
function queue(items,list=events(),now=Date.now()){return items.map(item=>({...item,state:reviewState(item.key,item.direction,list,now)})).filter(x=>x.state.dueNow||x.state.star).sort((a,b)=>b.state.priority-a.state.priority||a.state.due-b.state.due||a.key.localeCompare(b.key));}
function record(item,response,correct,{help=false,confidence=null,mode='write',phase='practice',elapsedMs=0}={}){return add('review',{type:'answer',key:item.key,direction:item.direction,domain:item.domain||'vocabulary',deckId:item.deckId||null,response,correct,help,confidence,mode,phase,elapsedMs,contentVersion:item.version||1},item.cardId);}
function star(key,value){return add('goal',{key:'star:'+key,value:!!value});}
function collectionState(list=events()){const m=new Map();for(const e of [...list].sort((a,b)=>a.createdAt.localeCompare(b.createdAt)||a.id.localeCompare(b.id))){if(e.kind==='collection'){const previous=m.get(e.payload.key);const next=copy(e.payload);if(previous){const routes=new Set(next.resources.map(r=>r.route));next.resources.push(...previous.resources.filter(r=>!routes.has(r.route)));}m.set(e.payload.key,next);}if(e.kind==='collection-remove')m.delete(e.payload.key);}return [...m.values()];}
function workState(list=events()){const m=new Map();for(const e of list.filter(e=>e.kind==='work'))m.set(e.payload.key,e);return [...m.values()];}
function grammarItems(data=root.GRAMMAR,p=root.BiblioJourney?.store.current()){
 const bank=data.cards.flatMap(c=>c.exercises.map(e=>({...copy(e),cardId:c.id}))).concat(root.BiblioIntensive?.conjugations(data)||[]),byId=new Map(bank.map(e=>[e.id,e])),wanted=new Set();
 for(const row of [...(p?.practice||[]),...(p?.attempts||[])])for(const q of row.items||[]){if(q.correct&&!q.hintsUsed)continue;const ex=byId.get(q.exerciseId||q.id)||bank.find(e=>e.cardId===q.cardId&&e.stem===q.question);if(ex)wanted.add(ex.id);}
 for(const e of reviews(p?.learningEvents||[]))if(e.payload.domain==='grammar'&&e.payload.key.startsWith('grammar:'))wanted.add(e.payload.key.slice(8));
 return [...wanted].map(id=>{const ex=byId.get(id),c=data.cards.find(c=>c.id===ex?.cardId);return ex&&c?{...copy(ex),key:'grammar:'+ex.id,direction:'es',domain:'grammar',cardId:c.id,title:c.title,clue:c.practiceHint,interference:c.nl}:null;}).filter(Boolean);
}

const api={DAY,validate,merge,events,add,latest,reviews,reviewState,queue,record,star,collectionState,workState,grammarItems,canonical};root.BiblioEvidence=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
