const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..'),context={window:{}};
for(const name of ['content/catalog.js','content/vocabulary.js','content/visual-resources.js'])vm.runInNewContext(fs.readFileSync(path.join(root,name),'utf8'),context);
const data=context.window.BiblioVisualResources.inventory(context.window.GRAMMAR,context.window.BIBLIO_VOCABULARY);
fs.writeFileSync(path.join(root,'docs/visual-inventory.json'),JSON.stringify(data,null,2)+'\n');
console.log(JSON.stringify({lessons:data.lessons.length,decks:data.decks.length,cards:data.decks.reduce((n,d)=>n+d.cards,0),lessonPilots:data.lessons.filter(x=>x.interactivePilot).length,deckPilots:data.decks.filter(x=>x.interactivePilot).length}));
