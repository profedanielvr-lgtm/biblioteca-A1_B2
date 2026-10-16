(function(root){'use strict';
const KEY='la-biblioteca-reading-v1',sections=['teoria','puente','ejemplos','docentenbril','aula','fuentes','practica'];
function valid(hash,data){const [id,step,...extra]=String(hash||'').replace(/^#/,'').split('/');if(extra.length)return false;if(!id)return !step;if(data.cards.some(c=>c.id===id))return !step||sections.includes(step);if(id==='ruta')return !step||['A1','A2','B1','B2'].includes(step);if(id==='modulo')return /^(A1|A2|B1|B2)-[0-9]{2}$/.test(step||'');if(id==='prueba')return /^(A1|A2|B1|B2)-[0-9]{2}$/.test(step||'');if(id==='entrenar')return !step||data.cards.some(c=>c.id===step);if(id==='evaluacion')return !step||data.cards.some(c=>c.id===step);return !step&&(['curriculo','audio','historial','biblioteca','entrenar'].includes(id)||/^bloque[1-9]\d*$/.test(id)&&Number(id.slice(6))<=data.groups.length);}
class ReaderState{
 constructor(storage,key=KEY){this.key=key;this.storage=storage;this.value={schema:1,route:'',scroll:0,details:{},practice:{}};try{const saved=JSON.parse(storage?.getItem(this.key)||'null');if(saved?.schema===1&&typeof saved.route==='string'){this.value={...this.value,...saved};this.value.details=saved.details&&typeof saved.details==='object'?saved.details:{};this.value.practice=saved.practice&&typeof saved.practice==='object'?saved.practice:{};}}catch(_){} }
 flush(){try{this.storage?.setItem(this.key,JSON.stringify(this.value));}catch(_){} }
 remember(hash,data,scroll){if(!valid(hash,data))return;this.value.route=String(hash).replace(/^#/,'');this.value.scroll=Math.max(0,Number(scroll)||0);this.flush();}
 restore(hash,data){if(hash&&hash!=='#')return null;return this.value.route&&valid(this.value.route,data)?{route:this.value.route,scroll:Math.max(0,Number(this.value.scroll)||0)}:null;}
 answer(id,value){this.value.practice[id]=String(value).slice(0,2000);this.flush();}
 details(id,open){this.value.details[id]=!!open;this.flush();}
}
let storage;try{storage=root.localStorage;}catch(_){}const profileId=root.BiblioJourney?.store.current()?.id;const instance=new ReaderState(storage,profileId?KEY+':'+profileId:KEY);
root.BiblioReader={ReaderState,valid,instance,sections};
if(typeof module!=='undefined'&&module.exports)module.exports={ReaderState,valid};
})(typeof window!=='undefined'?window:globalThis);
