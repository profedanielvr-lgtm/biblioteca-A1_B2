(function(root){'use strict';
const registry=root.BiblioVisualResources;
const scenarios={
 agreement:[
 {es:['Una clase','Me gusta esta clase.','El grupo nominal «esta clase» es singular. En neerlandés: Ik vind deze les leuk. No traslades literalmente la estructura con ik.'],nl:['Eén les','Me gusta esta clase.','Esta clase is enkelvoud. In het Nederlands: Ik vind deze les leuk. Neem de Nederlandse zinsbouw met ik niet letterlijk over.'],tokens:['Me','gusta','esta clase']},
 {es:['Varias clases','Me gustan estas clases.','«Estas clases» es plural: el verbo cambia a gustan. «Me» señala a quién le gustan.'],nl:['Meer lessen','Me gustan estas clases.','Estas clases is meervoud: het werkwoord wordt gustan. Me geeft aan wie de lessen leuk vindt.'],tokens:['Me','gustan','estas clases']}],
 viewpoint:[
 {es:['Hecho delimitado','Ayer trabajé de nueve a cinco.','Presento el trabajo de ayer como un hecho delimitado. La duración larga no obliga a usar imperfecto.'],nl:['Afgebakend geheel','Ayer trabajé de nueve a cinco.','Ik presenteer het werk van gisteren als een afgebakend geheel. Een lange duur vraagt niet automatisch om de imperfecto.'],start:70,end:280,point:0},
 {es:['Situación en curso','A las diez trabajaba; entonces sonó el teléfono.','Me sitúo dentro de la situación. «Sonó» introduce otro hecho. La elección expresa perspectiva y contexto.'],nl:['Bezig op dat moment','A las diez trabajaba; entonces sonó el teléfono.','Ik kijk vanuit een moment binnen de situatie. Sonó voegt een gebeurtenis toe. Perspectief en context bepalen de keuze.'],start:25,end:325,point:160}],
 routine:[
 {es:['07:00','Desayuno a las siete.','desayunar → ontbijten. Fíjate en el verbo completo: desayuno es una forma de desayunar.'],nl:['07:00','Desayuno a las siete.','Desayunar betekent ontbijten. Desayuno is hier een werkwoordsvorm: ik ontbijt.'],hour:7},
 {es:['22:00','Me acuesto a las diez.','acostarse → naar bed gaan. La expresión incluye me cuando hablo de mí.'],nl:['22:00','Me acuesto a las diez.','Acostarse betekent naar bed gaan. Me hoort erbij als ik over mezelf spreek.'],hour:22}],
 classroom:[
 {es:['El cuaderno','Escribo en el cuaderno.','Objeto + acción: escribir en el cuaderno. En neerlandés: in het schrift schrijven.'],nl:['Het schrift','Escribo en el cuaderno.','Voorwerp + handeling: escribir en el cuaderno. In het Nederlands: in het schrift schrijven.'],object:'notebook'},
 {es:['La pizarra','Escribo en la pizarra.','La combinación cambia: escribir en la pizarra. En neerlandés: op het bord schrijven.'],nl:['Het bord','Escribo en la pizarra.','Let op de combinatie: escribir en la pizarra. In het Nederlands: op het bord schrijven.'],object:'board'}],
 directions:[
 {es:['A la derecha','Gira a la derecha en el cruce.','girar a la derecha → rechtsaf slaan. Empieza en el punto inferior del plano y sigue la flecha.'],nl:['Rechtsaf','Gira a la derecha en el cruce.','Girar a la derecha betekent rechtsaf slaan. Begin onderaan de kaart en volg de pijl.'],side:'right'},
 {es:['A la izquierda','Gira a la izquierda en el cruce.','girar a la izquierda → linksaf slaan. La dirección se interpreta desde el recorrido.'],nl:['Linksaf','Gira a la izquierda en el cruce.','Girar a la izquierda betekent linksaf slaan. Bekijk de richting vanuit de looproute.'],side:'left'}]
};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function picture(kind,s,label,lang){
 let shape='';
 if(kind==='agreement')return '<div class="anchor-tokens">'+s.tokens.map((word,i)=>'<span><small>'+(lang==='nl'?['Persoon','Werkwoord','Onderwerp']:['Persona','Verbo','Sujeto'])[i]+'</small><b lang="es">'+esc(word)+'</b></span>').join('')+'</div>';
 if(kind==='viewpoint')shape='<path d="M20 65H340" stroke="#8794a4"/><path d="M'+s.start+' 65H'+s.end+'" stroke="#663366" stroke-width="12"/>'+(s.point?'<circle cx="160" cy="65" r="9" fill="#0076e0"/><text x="160" y="30" text-anchor="middle">10:00</text>':'<text x="70" y="35" text-anchor="middle">09:00</text><text x="280" y="35" text-anchor="middle">17:00</text>');
 if(kind==='routine') {const angle=(s.hour%12)*30;shape='<circle cx="180" cy="65" r="48" fill="#fff" stroke="#663366" stroke-width="3"/><path d="M180 65V23" stroke="#25476d" stroke-width="3"/><path d="M180 65V35" transform="rotate('+angle+' 180 65)" stroke="#0076e0" stroke-width="6"/><circle cx="180" cy="65" r="4" fill="#25476d"/>';}
 if(kind==='classroom')shape=s.object==='notebook'?'<rect x="120" y="15" width="120" height="95" rx="8" fill="#edf5ff" stroke="#663366" stroke-width="3"/><path d="M140 15V110M150 40H225M150 60H225M150 80H225" stroke="#25476d" stroke-width="2"/>':'<rect x="65" y="15" width="230" height="85" rx="6" fill="#edf5ff" stroke="#663366" stroke-width="4"/><path d="M95 100V118M265 100V118M100 45H250M100 65H210" stroke="#25476d" stroke-width="3"/>';
 if(kind==='directions') {const x=s.side==='right'?280:80;shape='<path d="M20 65H340M180 5V125" stroke="#d9dfea" stroke-width="30"/><path d="M180 115V65H'+x+'" fill="none" stroke="#0063bd" stroke-width="7"/><path d="M'+(x+(s.side==='right'?-14:14))+' 52L'+x+' 65L'+(x+(s.side==='right'?-14:14))+' 78" fill="none" stroke="#0063bd" stroke-width="5"/><circle cx="180" cy="115" r="6" fill="#663366"/>';}
 return '<svg viewBox="0 0 360 130" role="img" aria-label="'+esc(label)+'">'+shape+'</svg>';
}
function mount(container,resource,language){if(!container||!resource)return;const lang=language==='nl'?'nl':'es',tr=(es,nl)=>lang==='nl'?nl:es,states=scenarios[resource.kind];const section=document.createElement('section');section.className='visual-anchor';section.dataset.visualKind=resource.kind;
 section.innerHTML='<h3>'+esc(resource.title[lang])+'</h3><p>'+tr('Cambia el ejemplo y observa qué cambia. Esta exploración no cuenta como prueba de dominio.','Wissel het voorbeeld en bekijk wat verandert. Dit verkennen telt niet als bewijs van beheersing.')+'</p><div class="anchor-controls" role="group" aria-label="'+tr('Comparar ejemplos','Voorbeelden vergelijken')+'">'+states.map((s,i)=>'<button type="button" data-anchor-state="'+i+'" aria-pressed="'+(i===0)+'">'+esc(s[lang][0])+'</button>').join('')+'</div><figure><div class="anchor-picture"></div><figcaption lang="es"></figcaption></figure><p class="anchor-explanation" aria-live="polite"></p>';
 const draw=i=>{const s=states[i];section.querySelector('.anchor-picture').innerHTML=picture(resource.kind,s,s[lang][0]+': '+s[lang][1],lang);section.querySelector('figcaption').textContent=s[lang][1];section.querySelector('.anchor-explanation').textContent=s[lang][2];section.querySelectorAll('button').forEach((b,n)=>b.setAttribute('aria-pressed',String(n===i)));};
 section.querySelectorAll('button').forEach((b,i)=>b.onclick=()=>draw(i));draw(0);container.append(section);return section;
}
function enhance(main,card,lang){const target=main.querySelector('#teoria');if(!target?.querySelector('.visual-anchor'))mount(target,registry.lessons[card.id],lang);}
function deckPreview(container,deck,lang){return mount(container,registry.decks[deck.id],lang);}
function navigation(){const tools=document.querySelector('#sidebar .learning-tools');if(!tools)return;const id=location.hash.slice(1).split('/')[0];let active=false;tools.querySelectorAll('a').forEach(a=>{const selected=a.getAttribute('href')==='#'+id;if(selected){a.setAttribute('aria-current','page');active=true;}else a.removeAttribute('aria-current');});if(active)tools.open=true;}
root.BiblioAnchors={enhance,deckPreview,navigation,mount};
})(typeof window!=='undefined'?window:globalThis);
