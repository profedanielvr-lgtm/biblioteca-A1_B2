const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');const {environment}=require('./browser-fixture.cjs');
const close=e=>e.window.BiblioPlatform.records().close();
test('phonetics exposes six complete bilingual modules and 27 recommended letter names without changing the curriculum',()=>{
 const e=environment(undefined,undefined,'#fonetica');const D=e.window.BiblioPhoneticsData;
 assert.equal(D.alphabet.length,27);assert.equal(new Set(D.alphabet.map(x=>x[0])).size,27);assert.equal(D.modules.length,6);assert.equal(e.window.GRAMMAR.cards.length,123);
 for(const m of D.modules){assert(m.title.es&&m.title.nl);assert(m.goal.es&&m.goal.nl);assert.equal(m.quiz.length,3);for(const s of m.sections){assert(s.title.es&&s.title.nl);for(const p of s.paragraphs)assert(p.es&&p.nl);for(const r of s.rows)assert.equal(r.length,s.headers.length);}for(const q of m.quiz){assert(q.feedback.es&&q.feedback.nl);assert(q.options[q.answer]);}for(const id of m.sources)assert(D.sources.some(s=>s.id===id&&s.url.startsWith('https://')));}
 assert(e.document.querySelector('a[href="#fonetica/FON06"]'));assert(e.document.querySelector('.primary-navigation a[href="#fonetica"]'));close(e);
});
test('all phonetics routes render in both languages; visual exploration does not record learner evidence',()=>{
 const e=environment(undefined,undefined,'#fonetica');e.window.BiblioJourney.store.enter('Ana','1234567');
 for(const lang of ['es','nl']){e.document.querySelector('[data-lang="'+lang+'"]').onclick();for(const m of e.window.BiblioPhoneticsData.modules){e.route('fonetica/'+m.id);assert.equal(e.document.querySelector('h1').textContent,m.title[lang]);assert(e.document.querySelector('.phon-table'));const before=e.document.querySelector('.phon-scene').textContent;e.document.querySelector('[data-phon-state="1"]').click();assert.notEqual(e.document.querySelector('.phon-scene').textContent,before);assert.equal(e.document.querySelector('[data-phon-state="1"]').getAttribute('aria-pressed'),'true');}}
 assert.equal(e.window.BiblioEvidence.events().length,0);close(e);
});
function answer(e){const form=e.document.querySelector('#phon-quiz'),m=e.window.BiblioPhonetics.get('FON03');for(const q of m.quiz)form.querySelector('input[name="'+q.id+'"][value="'+q.answer+'"]').setAttribute('checked','');form.onsubmit({preventDefault(){}});}
test('phonetics feedback works without a profile and does not pretend to have saved',()=>{
 const e=environment(undefined,undefined,'#fonetica/FON03');answer(e);assert(e.document.querySelector('#phon-result').textContent.includes('3 / 3'));assert(e.document.querySelector('#phon-result').textContent.includes('Abre un perfil'));assert.equal(e.window.BiblioEvidence.events().length,0);close(e);
});
test('knowledge answers persist as recognition scenarios and stay separate from pronunciation and review mastery',()=>{
 const e=environment(undefined,undefined,'#fonetica');e.window.BiblioJourney.store.enter('Ana','1234567');e.route('fonetica/FON03');answer(e);answer(e);
 const events=e.window.BiblioEvidence.events();assert.equal(events.length,2);assert.equal(events[0].kind,'scenario');assert.equal(events[0].payload.modality,'recognition');assert.equal(events[0].payload.score,3);assert.equal(events[1].payload.help,true);assert.equal(e.window.BiblioEvidence.reviews().length,0);
 const backup=e.window.BiblioJourney.store.backup();e.window.BiblioJourney.store.enter('Luis','7654321');assert.equal(e.window.BiblioEvidence.events().length,0);e.window.BiblioJourney.store.restore(backup);e.window.BiblioJourney.store.enter('Ana','1234567');assert.equal(e.window.BiblioEvidence.events().length,2);
 const reload=environment(undefined,e.storage,'#fonetica/FON03');assert(reload.document.querySelector('#phon-result').textContent.includes('3 / 3'));close(reload);close(e);
});
test('phonetics favorites join mixed collections and branded PDF exports with sources and optional answers',()=>{
 const e=environment(undefined,undefined,'#fonetica');e.window.BiblioJourney.store.enter('Ana','1234567');e.route('fonetica/FON03');e.document.querySelector('[data-favorite]').click();
 const ref=e.window.BiblioMaterials.favorites()[0];assert.equal(ref.type,'phonetics');assert.equal(ref.route,'fonetica/FON03');assert(!e.document.querySelector('.material-actions a[href="#laboratorio/fonetica"]'));
 e.route('colecciones');assert(e.document.querySelector('#favorite-materials').textContent.includes('fonética'));e.document.querySelector('[data-favorite-index]').checked=true;e.document.querySelector('#favorites-to-collection').click();const c=e.window.BiblioEvidence.collectionState()[0];assert.equal(c.resources[0].route,ref.route);
 const refs=[ref,{route:'F31/teoria',title:'Ser y estar'},{route:'vocabulario/v-aula',title:'Aula'}];const html=e.window.BiblioExport.documentHTML(refs,'es');assert(html.includes('Fontys'));assert(html.includes('Daniel Valle Robles'));assert(html.includes('https://www.rae.es/dpd/ceceo'));assert(html.includes('cerveza'));assert(!html.includes('Preguntas y soluciones'));assert(!html.includes('1234567'));assert(e.window.BiblioExport.documentHTML([ref],'nl',{answers:true}).includes('Vragen en antwoorden'));e.document.querySelector('[data-col-pdf]').click();assert(e.document.querySelector('.material-preview').textContent.includes('Distinción'));close(e);
});
test('phonetic contrasts correct the cerveza diagnostic and preserve multiple legitimate dialect realizations',()=>{
 const e=environment(undefined,undefined,'#fonetica/FON03');const D=e.window.BiblioPhoneticsData;assert(D.modules[2].sections[1].paragraphs[0].es.includes('no permite identificar por sí sola el ceceo'));assert(D.modules[1].sections[1].paragraphs[0].es.includes('[ɣ̞]'));assert(D.modules[3].sections[0].rows.some(r=>r[2]==='[ˈʃuβ̞ja]'));assert(D.modules[3].sections[0].rows.some(r=>r[2]==='[ˈʒuβ̞ja]'));assert.equal(e.document.querySelectorAll('audio').length,0);close(e);
});
test('phonetics reading routes validate and restore without breaking existing routes',()=>{
 const {ReaderState,valid}=require('../modules/reading-state.js'),e=environment(undefined,undefined,'#fonetica'),D=e.window.GRAMMAR;assert(valid('fonetica',D));assert(valid('fonetica/FON06',D));assert(!valid('fonetica/FON99',D));assert(!valid('fonetica/FON01/extra',D));const storage={getItem:k=>e.storage.get(k),setItem:(k,v)=>e.storage.set(k,v)},reader=new ReaderState(storage);reader.remember('fonetica/FON02',D,234);assert.equal(new ReaderState(storage).restore('',D).route,'fonetica/FON02');assert(valid('F31/teoria',D));close(e);
});
test('the standalone edition includes phonetics data, styles and activities',()=>{
 const html=fs.readFileSync(path.join(__dirname,'../La-Biblioteca.html'),'utf8');assert(html.includes('BiblioPhoneticsData'));assert(html.includes('.phon-explorer'));assert(!html.includes('src="content/phonetics.js'));const e=environment(html,undefined,'#fonetica/FON02');assert(e.document.querySelector('.phon-scene svg'));assert(e.document.querySelector('#phon-quiz'));close(e);
});

