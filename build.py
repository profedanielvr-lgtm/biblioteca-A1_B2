"""Build reproducibly from template, modules and the editable JSON catalogue."""
from pathlib import Path
import json,re,csv,io
from datetime import datetime,timezone
P=Path(__file__).resolve().parent
data=json.loads((P/'content'/'catalog.json').read_text())
version={'id':'2026.10.16-cloud-visual','builtAt':datetime.now(timezone.utc).isoformat(timespec='seconds')}
(P/'content'/'version.js').write_text('window.BIBLIO_BUILD = '+json.dumps(version)+';')
(P/'content'/'catalog.js').write_text('window.GRAMMAR = '+json.dumps(data,ensure_ascii=False,separators=(',',':')).replace('</script','<\\/script')+';')
csvfile=io.StringIO();writer=csv.writer(csvfile);writer.writerow(['id','nivel','categoria','tema','PCIC','Kennisbasis'])
for c in data['cards']:
 m=c.get('curriculum',{});writer.writerow([c['id'],c['level'],m.get('category',''),c['title']['es'],m.get('pcic',{}).get('url',''),';'.join(m.get('knowledgeBasis',[]))])
(P/'content'/'crosswalk.csv').write_text(csvfile.getvalue())
shell=(P/'template.html').read_text()
asset_version=version['builtAt'].replace(':','').replace('+','')
shell=re.sub(r'(href|src)="((?:styles|modules|content)/[^"]+\.(?:css|js))"',lambda m:m[1]+'="'+m[2]+'?v='+asset_version+'"',shell)
(P/'index.html').write_text(shell)
def css(match):return '<style>'+(P/match[1].split('?')[0]).read_text()+'</style>'
def script(match):return '<script>'+(P/match[1].split('?')[0]).read_text().replace('</script','<\\/script')+'</script>'
standalone=re.sub(r'<link rel="stylesheet" href="([^"]+)">',css,shell)
import base64
logo='data:image/png;base64,'+base64.b64encode((P/'media/logo-sp.png').read_bytes()).decode()
standalone=standalone.replace('src="media/logo-sp.png"','src="'+logo+'"')
standalone=re.sub(r'<script src="([^"]+)"></script>',script,standalone)
(P/'La-Biblioteca.html').write_text(standalone)
print('Built modular index and self-contained HTML:',len(data['cards']),'cards,',len(standalone),'characters')
