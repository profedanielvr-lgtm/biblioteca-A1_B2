(function(root){'use strict';
const normalize=(s,mode='word')=>String(s).normalize('NFC').trim().toLocaleLowerCase('es').replace(/\s+/g,' ').replace(mode==='word'?/[.!?]+$/g:/$^/g,'').trim();
const withoutAcute=s=>s.normalize('NFD').replace(/\u0301/g,'').normalize('NFC');
function grade(ex,value){const v=normalize(value,ex.mode);if(!v)return 'empty';const options=ex.answers.map(a=>normalize(a,ex.mode));if(options.includes(v))return 'correct';if(options.some(a=>withoutAcute(a)===withoutAcute(v)))return 'accent';return 'wrong';}
const searchKey=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function matches(card,query){const q=query.trim();if(/^[A-Z]\d{2,3}$/i.test(q))return card.id===q.toUpperCase();return searchKey(JSON.stringify([card.id,card.title,card.goal,card.p,card.ex,card.nl,card.depth])).includes(searchKey(q));}
const api={normalize,grade,matches};root.Practice=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
