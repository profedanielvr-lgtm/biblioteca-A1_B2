(function(root){'use strict';
// Additive registry: existing lesson, card and profile IDs are never rewritten.
const resources={
 schema:1,
 lessons:{F37:{version:1,kind:'agreement',title:{es:'¿Qué determina gusta o gustan?',nl:'Wat bepaalt gusta of gustan?'}},F50:{version:1,kind:'viewpoint',title:{es:'Un hecho, dos perspectivas',nl:'Eén gebeurtenis, twee perspectieven'}}},
 decks:{'v-rutina':{version:1,kind:'routine',title:{es:'Una rutina, dos momentos',nl:'Een routine, twee momenten'}},'v-aula':{version:1,kind:'classroom',title:{es:'Del objeto a la acción',nl:'Van voorwerp naar handeling'}},'v-ciudad':{version:1,kind:'directions',title:{es:'Dar indicaciones con un plano',nl:'De weg wijzen met een plattegrond'}}}
};
function validate(data=resources){if(data.schema!==1)throw Error('Unsupported visual schema');for(const group of ['lessons','decks'])for(const resource of Object.values(data[group])){if(resource.version!==1||!resource.title.es||!resource.title.nl||!['agreement','viewpoint','routine','classroom','directions'].includes(resource.kind))throw Error('Invalid visual resource');}return data;}
function inventory(catalog,vocabulary){return {schema:1,lessons:catalog.cards.map(c=>({id:c.id,level:c.level,title:c.title,interactivePilot:!!resources.lessons[c.id],reviewStatus:resources.lessons[c.id]?'pilot-needs-human-review':'needs-visual-audit'})),decks:vocabulary.decks.map(d=>({id:d.id,level:d.level,cards:d.cards.length,interactivePilot:!!resources.decks[d.id],reviewStatus:resources.decks[d.id]?'pilot-needs-human-review':'needs-visual-audit'}))};}
const api={...validate(),validate,inventory};root.BiblioVisualResources=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
