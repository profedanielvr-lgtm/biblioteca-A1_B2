import {test} from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {handleLibraryRequest} from '../lib/biblioteca-api.mjs';
test('shared API: owner setup, scoped history across PINs, append-only attempts and content versions',async()=>{
 const sqlite=new DatabaseSync(':memory:');sqlite.exec(readFileSync(new URL('../drizzle/0000_loud_landau.sql',import.meta.url),'utf8'));
 const DB={prepare(sql){let args=[];const s=sqlite.prepare(sql),q={bind(...values){args=values;return q;},async first(){return s.get(...args)||null;},async all(){return {results:s.all(...args)};},async run(){return s.run(...args);}};return q;}};
 const objects=new Map(),BUCKET={async put(k,v){objects.set(k,v);},async get(k){return objects.has(k)?{async text(){return objects.get(k);}}:null;}};
 const env={DB,BUCKET,BIBLIO_SECRET:'test-only-secret-000000000000000000000000',BIBLIO_OWNER_ID:'owner-test',BIBLIO_FRONTEND_ORIGIN:'https://frontend.example'};
 async function call(path,data,token,identity){const r=await handleLibraryRequest(new Request('https://backend.example/api'+path,{method:data?'POST':'GET',headers:{Origin:env.BIBLIO_FRONTEND_ORIGIN,'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},...(data?{body:JSON.stringify(data)}:{})}),env,identity);return {status:r.status,data:await r.json()};}
 assert.equal((await call('/health')).data.anonymousStudentAccess,true);
 assert.equal((await call('/teacher/setup',{password:'long-password-test'})).status,403);
 assert.equal((await call('/teacher/setup',{password:'long-password-test'},null,{userId:'owner-test'})).status,200);
 assert.equal((await call('/teacher/session',{password:'wrong'})).status,401);
 const teacher=(await call('/teacher/session',{password:'long-password-test'})).data.token;assert(teacher);
 let student;
 for(const [i,pin] of ['CLASS01','CLASS02'].entries()){
  assert.equal((await call('/classes',{classPin:pin},teacher)).status,201);
  student=(await call('/student/session',{studentCode:'ab123',classPin:pin})).data.token;assert(student);
  const a={id:'test-attempt-'+i,schemaVersion:1,studentCode:'AB123',classPin:pin,startedAt:'2026-10-15T09:00:00.000Z',completedAt:'2026-10-15T09:01:00.000Z',appVersion:'test',mode:'exam',score:0,total:1,items:[{question:'Question',correct:false,selectedText:'Wrong',correctText:'Correct'}]};
  assert.equal((await call('/attempts',a,student)).status,201);
  assert.equal((await call('/attempts',a,student)).data.duplicate,true);
  assert.equal((await call('/attempts',{...a,appVersion:'changed'},student)).status,409);
 }
 assert.equal((await call('/attempts',null,student)).data.attempts.length,2);
 assert.equal((await call('/attempts',null,teacher)).data.attempts.length,2);
 const other=(await call('/student/session',{studentCode:'OTHER',classPin:'CLASS02'})).data.token;
 assert.equal((await call('/attempts',null,other)).data.attempts.length,0);
 assert.throws(()=>sqlite.exec('DELETE FROM attempts'),/append-only/);
 assert.throws(()=>sqlite.exec("UPDATE attempts SET student_code='OTHER'"),/append-only/);
 const library={cards:[{id:'a',title:{es:'Tema',nl:'Thema'},level:'A1',exercises:[]}],sources:{},authenticSources:{},groups:[],padding:'x'.repeat(2100000)};
 assert.equal((await call('/content',{library},student)).status,403);
 assert.equal((await call('/content',{library},teacher)).status,201);
 assert.equal((await call('/content/latest')).data.library.padding.length,2100000);
 assert.equal((await call('/attempts',null,student)).data.attempts.length,2);
 assert.equal([...objects.keys()].filter(k=>k.startsWith('attempt-backups/')).length,2);
 assert.equal((await call('/teacher/setup',{password:'changed-password-test'},null,{userId:'owner-test'})).status,200);
 assert.equal((await call('/classes',{classPin:'CLASS03'},teacher)).status,401);
 sqlite.close();
});
