(function(root){'use strict';
const DAY=86400000;
function current(profile,now=Date.now()){
 if(!profile||typeof profile.code!=='string')throw Error('Necesitas un perfil activo / Je hebt een profiel nodig');
 const events=Array.isArray(profile.learningEvents)?profile.learningEvents:[],recentSince=now-30*DAY;
 const answers=events.filter(e=>e?.kind==='review'&&e.payload?.type==='answer'&&typeof e.payload.correct==='boolean');
 const scenarios=events.filter(e=>e?.kind==='scenario'&&e.payload?.source?.includes('conjugador')&&typeof e.payload.correct==='boolean');
 const attempts=new Map();
 for(const a of [...(profile.attempts||[]),...(profile.practice||[])])if(a?.id&&Array.isArray(a.items))attempts.set(a.id,a);
 const counted=[...attempts.values()],lessons=Object.values(profile.lessons||{}).filter(Boolean);
 const safeNum=x=>Number.isFinite(x)?x:0,countGood=items=>items.filter(x=>x.correct===true).length;
 const last30=events.filter(e=>e?.createdAt&&Date.parse(e.createdAt)>=recentSince&&Date.parse(e.createdAt)<=now);
 const tasks=counted.flatMap(a=>a.items.map(item=>({...item,cardId:item.cardId||'',at:a.completedAt})));
 const byTense=new Map(),byDeck=new Map();
 for(const e of scenarios){const key=String(e.payload.tense||'presente').slice(0,60),r=byTense.get(key)||{id:key,total:0,correct:0,verbs:new Set()};r.total++;if(e.payload.correct)r.correct++;if(e.payload.verb)r.verbs.add(e.payload.verb);byTense.set(key,r);}
 for(const e of answers){if(e.payload.domain!=='vocabulary'||!e.payload.deckId)continue;const key=String(e.payload.deckId).slice(0,80),r=byDeck.get(key)||{id:key,total:0,correct:0};r.total++;if(e.payload.correct)r.correct++;byDeck.set(key,r);}
 const independent=answers.filter(e=>e.payload.modality==='independent-production'&&e.payload.attempt===1);
 const supported=independent.filter(e=>e.payload.correct===true);
 const topicMap=new Map();
 for(const item of tasks){if(!item.cardId)continue;const key=item.cardId,g=topicMap.get(key)||{id:key,total:0,correct:0,questions:new Set(),days:new Set()};g.total++;if(item.correct)g.correct++;g.questions.add(item.exerciseId||item.question||String(g.total));if(item.at)g.days.add(String(item.at).slice(0,10));topicMap.set(key,g);}
 const topics=[...topicMap.values()].map(x=>({id:x.id,total:x.total,correct:x.correct,distinct:x.questions.size,days:x.days.size,state:x.total>=10&&x.questions.size>=5&&x.days.size>=2&&x.correct/x.total>=.8?'consolidating':x.total>=3&&x.correct/x.total<.6?'reinforce':'developing'}));
 const complete={code:String(profile.code),name:String(profile.name||''),generatedAt:new Date(now).toISOString(),
  total:{lessonsOpened:lessons.filter(l=>l.openedAt||l.studiedAt).length,lessonsStudied:lessons.filter(l=>l.studiedAt).length,reviewAnswers:answers.length,reviewCorrect:countGood(answers.map(e=>e.payload)),independentAnswers:independent.length,independentCorrect:supported.length,conjugationAnswers:scenarios.length,conjugationCorrect:countGood(scenarios.map(e=>e.payload)),assessmentAttempts:counted.length,assessmentAnswers:tasks.length,assessmentCorrect:countGood(tasks),recentEvents:last30.length},
  tenses:[...byTense.values()].map(x=>({id:x.id,total:x.total,correct:x.correct,verbs:x.verbs.size})).sort((a,b)=>b.total-a.total),
  decks:[...byDeck.values()].sort((a,b)=>b.total-a.total).slice(0,12),
  themes:topics.sort((a,b)=>a.state==='reinforce'?-1:b.state==='reinforce'?1:b.total-a.total).slice(0,12)};
 complete.total.estimatedTopics=topics.filter(t=>t.state==='consolidating').length;complete.total.needsReview=topics.filter(t=>t.state==='reinforce').length;
 return complete;
}
const trim=x=>String(x??'').replace(/[\r\n\t]+/g,' ').trim();
function lines(status,lang='es',decks=[],cards=[],tenseTitles={}){
 const t=(es,nl)=>lang==='nl'?nl:es,a=status.total,ratio=(good,total)=>total?Math.round(100*good/total)+'%':t('sin datos','geen gegevens');
 const names=new Map(decks.map(d=>[d.id,d.title?.[lang]||d.title?.es||d.id]));
 const topicNames=new Map(cards.map(c=>[c.id,c.title?.[lang]||c.title?.es||c.id]));
 const entries=[
 {type:'heading',text:t('Estado de aprendizaje · La biblioteca','Leerontwikkeling · La biblioteca')},
 {type:'small',text:t('Fecha y hora: ','Datum en tijd: ')+new Date(status.generatedAt).toLocaleString(lang==='nl'?'nl-NL':'es-ES',{dateStyle:'medium',timeStyle:'short'})},
 {type:'small',text:t('Perfil: ','Profiel: ')+trim(status.name)+' · '+trim(status.code)},
 {type:'heading',text:t('Resumen acumulado hasta hoy','Totaaloverzicht tot vandaag')},
 {type:'metric',text:t('Fichas consultadas','Onderwerpen bekeken')+': '+a.lessonsOpened+' · '+t('marcadas como estudiadas','gemarkeerd als bestudeerd')+': '+a.lessonsStudied},
 {type:'metric',text:t('Vocabulario y actividades','Woordenschat en opdrachten')+': '+a.reviewAnswers+' · '+t('correctas','goed')+': '+a.reviewCorrect+' ('+ratio(a.reviewCorrect,a.reviewAnswers)+')'},
 {type:'metric',text:t('Producción independiente sin ayuda','Zelfstandige productie zonder hulp')+': '+a.independentCorrect+'/'+a.independentAnswers+' ('+ratio(a.independentCorrect,a.independentAnswers)+')'},
 {type:'metric',text:t('Conjugación, respuestas','Vervoegingen, antwoorden')+': '+a.conjugationCorrect+'/'+a.conjugationAnswers+' ('+ratio(a.conjugationCorrect,a.conjugationAnswers)+')'},
 {type:'metric',text:t('Evaluaciones formativas','Formatieve toetsen')+': '+a.assessmentAttempts+' · '+t('respuestas','antwoorden')+': '+a.assessmentCorrect+'/'+a.assessmentAnswers},
 {type:'metric',text:t('Actividad registrada en 30 días','Vastgelegde activiteit in 30 dagen')+': '+a.recentEvents+' '+t('eventos','gebeurtenissen')},
 {type:'heading',text:t('Conjugación: tiempos practicados','Vervoegingen: geoefende tijden')}
 ];
 if(!status.tenses.length)entries.push({type:'small',text:t('Todavía no hay respuestas registradas.','Er zijn nog geen antwoorden opgeslagen.')});
 for(const x of status.tenses.slice(0,20))entries.push({type:'row',text:trim(tenseTitles[x.id]?.[lang]||tenseTitles[x.id]?.es||x.id)+': '+x.correct+'/'+x.total+' ('+ratio(x.correct,x.total)+') · '+x.verbs+' '+t('verbos','werkwoorden')});
 entries.push({type:'heading',text:t('Mazos de vocabulario practicados','Geoefende woordenschatsets')});
 if(!status.decks.length)entries.push({type:'small',text:t('Sin práctica de mazos registrada.','Geen woordenschatsets geregistreerd.')});
 for(const x of status.decks)entries.push({type:'row',text:trim(names.get(x.id)||x.id)+': '+x.correct+'/'+x.total+' ('+ratio(x.correct,x.total)+')'});
 entries.push({type:'heading',text:t('Temas y próximos pasos','Onderwerpen en volgende stappen')});
 if(!status.themes.length)entries.push({type:'small',text:t('Practica varias preguntas de un tema en diferentes días para recibir orientación.','Oefen verschillende vragen bij één onderwerp op meerdere dagen voor gerichte feedback.')});
 for(const x of status.themes.slice(0,10))entries.push({type:'row',text:trim(topicNames.get(x.id)||x.id)+': '+x.correct+'/'+x.total+' · '+(x.state==='reinforce'?t('repasar','herhalen'):x.state==='consolidating'?t('consolidación en práctica','goed geoefend'):t('en desarrollo','in ontwikkeling'))});
 entries.push({type:'heading',text:t('Cómo interpretar este informe','Hoe lees je dit rapport?')});
 entries.push({type:'small',text:t('Los resultados solo incluyen actividades guardadas en este perfil y dispositivo o sincronizadas. No incluyen búsquedas ni necesariamente todas las actividades realizadas sin perfil.','Dit rapport bevat alleen gegevens die in dit profiel of via synchronisatie zijn opgeslagen. Het bevat geen zoekopdrachten of alle oefeningen zonder profiel.')});
 entries.push({type:'small',text:t('Las cifras de aciertos no certifican un nivel MCER. La consulta no demuestra producción. Para concluir dominio se necesitan varias tareas, contextos, retroalimentación y desempeño independiente.','Scores bewijzen geen ERK-niveau. Iets bekijken is geen zelfstandige productie. Voor beheersing zijn verschillende opdrachten, contexten, feedback en zelfstandig werk nodig.')});
 entries.push({type:'small',text:t('El informe se genera localmente al pulsar descargar; no se envía automáticamente al profesor. Contiene información del perfil: compártelo solo si deseas hacerlo.','Het rapport wordt lokaal gemaakt zodra je het downloadt; het gaat niet automatisch naar je docent. Het bevat profielgegevens: deel het alleen als je dat wilt.')});
 return entries;
}
function renderPdf(status,lang='es',decks=[],cards=[],tenseTitles={},PdfClass){
 const PDF=PdfClass||root.jspdf?.jsPDF;if(!PDF)throw Error('El generador PDF no está disponible / PDF-generator is niet beschikbaar');
 const pdf=new PDF({format:'a4',unit:'mm',compress:true}),pageHeight=297,maxY=278;
 let y=20,page=1;
 const write=(entry)=>{
  const heading=entry.type==='heading',small=entry.type==='small',fontsize=heading?14:small?9:11,spacing=heading?8:small?5:6;
  pdf.setFont('helvetica',heading?'bold':'normal');pdf.setFontSize(fontsize);
  const chunks=pdf.splitTextToSize(trim(entry.text),176);
  for(const part of chunks){
   if(y+spacing>maxY){pdf.addPage();page++;y=20;}
   pdf.text(part,16,y);y+=spacing;
  }
  if(heading)y+=3;
 };
 for(const entry of lines(status,lang,decks,cards,tenseTitles))write(entry);
 const pages=pdf.getNumberOfPages();
 for(let n=1;n<=pages;n++){pdf.setPage(n);pdf.setFont('helvetica','normal');pdf.setFontSize(8);pdf.text('La biblioteca · '+n+' / '+pages,16,290);}
 return pdf;
}
function download(profile,lang='es'){
 const data=current(profile),decks=root.BIBLIO_VOCABULARY?.decks||[],cards=root.GRAMMAR?.cards||[],tenseTitles=root.BIBLIO_PARADIGMS?.tenses?.reduce((a,t)=>{a[t.id]={es:t.name,nl:t.id};return a;},{})||{};
 const pdf=renderPdf(data,lang,decks,cards,tenseTitles);
 pdf.save('la-biblioteca-progreso-'+data.code+'-'+data.generatedAt.slice(0,10)+'.pdf');
 return data;
}
const api={current,lines,renderPdf,download};root.BiblioProgressPDF=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
