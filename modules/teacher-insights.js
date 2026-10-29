(function(root){'use strict';
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function summarise(attempts){
 const students=new Map(),classes=new Map(),topics=new Map();let questions=0,correct=0,count=0;
 const add=(map,key,at,n,good)=>{if(!map.has(key))map.set(key,{key,attempts:0,questions:0,correct:0,last:''});const v=map.get(key);v.attempts++;v.questions+=n;v.correct+=good;if(at>v.last)v.last=at;};
 for(const a of Array.isArray(attempts)?attempts:[]){
  if(!a||!a.studentCode||!Array.isArray(a.items)||!Number.isFinite(Date.parse(a.completedAt)))continue;
  const items=a.items.filter(q=>q&&typeof q.correct==='boolean'),good=items.filter(q=>q.correct).length;
  count++;questions+=items.length;correct+=good;
  add(students,String(a.studentCode),a.completedAt,items.length,good);
  add(classes,String(a.classPin||'Sin PIN'),a.completedAt,items.length,good);
  for(const q of items){
   const key=String(q.cardId||q.verb||q.question||'Sin tema').slice(0,160);
   if(!topics.has(key))topics.set(key,{key,questions:0,correct:0});
   const x=topics.get(key);x.questions++;if(q.correct)x.correct++;
  }
 }
 const sort=map=>[...map.values()].sort((a,b)=>b.questions-a.questions||a.key.localeCompare(b.key));
 return {attempts:count,questions,correct,students:sort(students),classes:sort(classes),topics:[...topics.values()].filter(x=>x.questions>=2).sort((a,b)=>a.correct/a.questions-b.correct/b.questions||b.questions-a.questions).slice(0,8)};
}
function render(rows,lang='es',cards=[]){
 const d=summarise(rows),tr=(es,nl)=>lang==='nl'?nl:es,pct=(n,total)=>total?Math.round(100*n/total)+' %':'—';
 const date=x=>new Intl.DateTimeFormat('nl-NL',{dateStyle:'medium',timeStyle:'short',timeZone:'Europe/Amsterdam'}).format(new Date(x));
 const table=(headers,rows)=>'<div class="table-scroll"><table><thead><tr>'+headers.map(h=>'<th>'+h+'</th>').join('')+'</tr></thead><tbody>'+rows.join('')+'</tbody></table></div>';
 const headers=[tr('Código o PIN','Code of PIN'),tr('Intentos','Pogingen'),tr('Aciertos','Goed'),tr('Porcentaje','Percentage'),tr('Último intento','Laatste poging')];
 const line=x=>'<tr><td>'+esc(x.key)+'</td><td>'+x.attempts+'</td><td>'+x.correct+' / '+x.questions+'</td><td>'+pct(x.correct,x.questions)+'</td><td>'+esc(x.last?date(x.last):'—')+'</td></tr>';
 const topic=x=>{const card=cards.find(c=>c.id===x.key);return '<tr><td>'+esc(card?.title?.[lang]||card?.title?.es||x.key)+'</td><td>'+x.questions+'</td><td>'+pct(x.correct,x.questions)+'</td></tr>';};
 return '<h2>'+tr('Análisis de clase','Klasanalyse')+'</h2>'+
 '<p class="meta">'+tr('Solo se cuentan los intentos sincronizados mediante un PIN de clase. No incluye búsquedas, visitas, tarjetas locales ni toda la actividad de las cuentas personales. Los códigos no verifican identidad y los resultados no acreditan un nivel MCER.','Alleen pogingen die met een klas-PIN zijn gesynchroniseerd. Zoekopdrachten, bezoeken, lokale kaarten en overige accountactiviteit ontbreken. Codes bewijzen geen identiteit en de scores geen ERK-niveau.')+'</p>'+
 '<div class="dashboard-stats">'+[[d.students.length,tr('códigos diferentes','verschillende codes')],[d.attempts,tr('intentos','pogingen')],[d.questions,tr('respuestas','antwoorden')],[pct(d.correct,d.questions),tr('respuestas correctas','goede antwoorden')]].map(([v,label])=>'<article><strong>'+v+'</strong><span>'+label+'</span></article>').join('')+'</div>'+
 '<h3>'+tr('Por PIN de clase','Per klas-PIN')+'</h3>'+(d.classes.length?table(headers,d.classes.map(line)):'<p>'+tr('Sin intentos sincronizados para este filtro.','Geen gesynchroniseerde pogingen voor dit filter.')+'</p>')+
 '<h3>'+tr('Por código de estudiante','Per studentcode')+'</h3>'+(d.students.length?table(headers,d.students.map(line)):'<p>'+tr('Sin resultados.','Geen resultaten.')+'</p>')+
 '<h3>'+tr('Preguntas que conviene revisar','Vragen om opnieuw te bekijken')+'</h3>'+
 '<p class="meta">'+tr('Solo aparecen preguntas o temas con al menos dos respuestas. Son señales para orientar el feedback, no diagnósticos de dominio.','Alleen vragen of onderwerpen met minimaal twee antwoorden. Dit zijn signalen voor feedback, geen bewijs van beheersing.')+'</p>'+
 (d.topics.length?table([tr('Tema o pregunta','Onderwerp of vraag'),tr('Respuestas','Antwoorden'),tr('Aciertos','Goed')],d.topics.map(topic)):'<p>'+tr('Aún no hay suficientes respuestas repetidas.','Nog niet genoeg herhaalde antwoorden.')+'</p>');
}
function csv(rows){
 const data=summarise(rows),cell=value=>{let v=String(value??'');if(/^[=+@\-\t\r]/.test(v))v="'"+v;return '"'+v.replace(/"/g,'""')+'"';};
 const lines=[['tipo','identificador','intentos','respuestas','aciertos','ultima_actividad']];
 for(const [type,items] of [['clase',data.classes],['estudiante',data.students]])for(const x of items)lines.push([type,x.key,x.attempts,x.questions,x.correct,x.last]);
 return '\uFEFF'+lines.map(x=>x.map(cell).join(',')).join('\r\n')+'\r\n';
}
function renderExport(rows,lang='es',cards=[]){return render(rows,lang,cards)+'<p class="meta">'+(lang==='nl'?'Een export bevat studentcodes. Bewaar en deel deze alleen volgens de afspraken van je opleiding.':'La exportación contiene códigos de estudiantes. Consérvala y compártela únicamente según los acuerdos de tu institución.')+'</p><button type="button" id="teacher-export-csv">'+(lang==='nl'?'Groepsoverzicht downloaden (CSV)':'Descargar resumen de clase (CSV)')+'</button>';}
root.BiblioTeacherInsights={summarise,render:renderExport,csv};if(typeof module!=='undefined')module.exports=root.BiblioTeacherInsights;
})(typeof window!=='undefined'?window:globalThis);
