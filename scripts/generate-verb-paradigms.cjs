// Build-time verb corpus. MIT conjugator: https://github.com/jirimracek/conjugate-esp
// No network requests are required when a student practices.
const fs=require('node:fs'),path=require('node:path');
const {Conjugator}=require('@jirimracek/conjugate-esp');
const root=path.resolve(__dirname,'..'),content=fs.readFileSync(path.join(root,'content/verbs.js'),'utf8');
const match=content.match(/const raw=\x60([\s\S]*?)\x60;/);
if(!match)throw Error('No se encontró la lista de verbos en content/verbs.js');
const verbs=match[1].split('\n').filter(Boolean).map(line=>line.split('|')[0]);
if(verbs.length!==100||new Set(verbs).size!==100)throw Error('El banco inicial debe tener exactamente 100 verbos distintos.');
const specs=[
 ['indicativo-presente','Indicativo','Presente'],
 ['indicativo-imperfecto','Indicativo','PreteritoImperfecto'],
 ['indicativo-indefinido','Indicativo','PreteritoIndefinido'],
 ['indicativo-futuro','Indicativo','FuturoImperfecto'],
 ['indicativo-condicional','Indicativo','CondicionalSimple'],
 ['indicativo-perfecto','Indicativo','PreteritoPerfecto'],
 ['indicativo-pluscuamperfecto','Indicativo','PreteritoPluscuamperfecto'],
 ['indicativo-anterior','Indicativo','PreteritoAnterior'],
 ['indicativo-futuro-compuesto','Indicativo','FuturoPerfecto'],
 ['indicativo-condicional-compuesto','Indicativo','CondicionalCompuesto'],
 ['subjuntivo-presente','Subjuntivo','Presente'],
 ['subjuntivo-imperfecto-ra','Subjuntivo','PreteritoImperfectoRa'],
 ['subjuntivo-imperfecto-se','Subjuntivo','PreteritoImperfectoSe'],
 ['subjuntivo-futuro','Subjuntivo','FuturoImperfecto'],
 ['subjuntivo-perfecto','Subjuntivo','PreteritoPerfecto'],
 ['subjuntivo-pluscuamperfecto-ra','Subjuntivo','PreteritoPluscuamperfectoRa'],
 ['subjuntivo-pluscuamperfecto-se','Subjuntivo','PreteritoPluscuamperfectoSe'],
 ['subjuntivo-futuro-compuesto','Subjuntivo','FuturoPerfecto'],
 ['imperativo-afirmativo','Imperativo','Afirmativo'],
 ['imperativo-negativo','Imperativo','Negativo']
];
const cng=new Conjugator('2010');cng.useHighlight(false);
const data={schema:1,source:{name:'@jirimracek/conjugate-esp',version:'2.3.6',license:'MIT',region:'castellano',orthography:'2010'},tenses:specs.map(([id,mood,name])=>({id,mood,name})),verbs:{}};
const errors=[],missing=[];
for(const infinitive of verbs){
 const result=cng.conjugateSync(infinitive,'castellano');
 if(typeof result==='string'||!Array.isArray(result)||!result.length){errors.push(infinitive+': '+JSON.stringify(result));continue;}
 const candidate=result.find(x=>x.conjugation&&!x.info?.defective)||result.find(x=>x.conjugation);
 if(!candidate){errors.push(infinitive+': no paradigm found');continue;}
 const source=candidate.conjugation,tenses={};
 for(const [id,mood,name] of specs){
  const forms=source?.[mood]?.[name];
  if(!Array.isArray(forms)||forms.length!==6){errors.push(infinitive+'/'+id+': not six slots');continue;}
  tenses[id]=forms.map(form=>typeof form==='string'&&form.trim()&&form!=='-'?form.trim():null);
  if(tenses[id].every(x=>x===null))missing.push(infinitive+'/'+id);
 }
 data.verbs[infinitive]={tenses,nonfinite:source.Impersonal||{},model:candidate.info?.model||null};
}
if(errors.length)throw Error('Errores del corpus de conjugación:\n'+errors.join('\n'));
const output='(function(root){root.BIBLIO_PARADIGMS='+JSON.stringify(data).replace(/<\/script/gi,'<\\/script')+';})(typeof window!==\'undefined\'?window:globalThis);\n';
fs.writeFileSync(path.join(root,'content/verb-paradigms.js'),output);
console.log('Generated paradigms: '+verbs.length+' verbs, '+specs.length+' tense/imperative variants, '+missing.length+' absent defective forms ('+missing.slice(0,8).join(', ')+')');
