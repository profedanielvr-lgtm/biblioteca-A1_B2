(function(root){'use strict';
function clear(el){if(!el)return;el.querySelector('[data-result-label]')?.remove();el.removeAttribute('data-feedback');el.classList.remove('is-correct','is-incorrect');}
function mark(el,correct,lang='es'){if(!el)return;clear(el);if(typeof correct!=='boolean')return;el.dataset.feedback=correct?'correct':'incorrect';el.classList.add(correct?'is-correct':'is-incorrect');el.setAttribute('role','status');el.setAttribute('aria-live','polite');const badge=document.createElement('strong');badge.dataset.resultLabel='';badge.className='feedback-label';badge.textContent=lang==='nl'?(correct?'Goed':'Onjuist'):(correct?'Correcto':'Incorrecto');el.prepend(badge);}
root.BiblioFeedback={mark,clear};
})(typeof window!=='undefined'?window:globalThis);
