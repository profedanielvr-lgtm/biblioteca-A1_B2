// Portable equivalent of build.py for environments without a Python runtime.
const fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),write=(p,s)=>fs.writeFileSync(path.join(root,p),s);
const data=JSON.parse(read('content/catalog.json'));
const version={id:'2026.10.23-visual-foundation',builtAt:new Date().toISOString().replace(/\.\d{3}Z$/,'+00:00')};
write('content/version.js','window.BIBLIO_BUILD = '+JSON.stringify(version)+';');
write('content/catalog.js','window.GRAMMAR = '+JSON.stringify(data).replace(/<\/script/g,'<\\/script')+';');
const csvCell=x=>/[",\r\n]/.test(String(x))?'"'+String(x).replace(/"/g,'""')+'"':String(x);
const rows=[['id','nivel','categoria','tema','PCIC','Kennisbasis'],...data.cards.map(c=>[c.id,c.level,c.curriculum?.category||'',c.title.es,c.curriculum?.pcic?.url||'',(c.curriculum?.knowledgeBasis||[]).join(';')])];
write('content/crosswalk.csv',rows.map(r=>r.map(csvCell).join(',')).join('\r\n')+'\r\n');
const stamp=version.builtAt.replace(/[:+]/g,'');
const shell=read('template.html').replace(/(href|src)="((?:styles|modules|content)\/[^"?]+\.(?:css|js))"/g,(_,attr,p)=>attr+'="'+p+'?v='+stamp+'"');
write('index.html',shell);
const standalone=shell.replace(/<link rel="stylesheet" href="([^"]+)">/g,(_,p)=>'<style>'+read(p.split('?')[0])+'</style>')
 .replace('src="media/logo-sp.png"','src="data:image/png;base64,'+fs.readFileSync(path.join(root,'media/logo-sp.png')).toString('base64')+'"')
 .replace(/<script src="([^"]+)"><\/script>/g,(_,p)=>'<script>'+read(p.split('?')[0]).replace(/<\/script/gi,'<\\/script')+'</script>');
write('La-Biblioteca.html',standalone);
console.log('Built '+data.cards.length+' lessons; '+version.id);
