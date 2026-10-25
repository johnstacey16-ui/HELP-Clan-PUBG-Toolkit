// True browser smoke with no npm dependencies. Run locally or on GitHub Actions.
// The browser serves actual committed HTML/JS through a temporary localhost server.
'use strict';
const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const {spawn}=require('node:child_process');
const {tmpdir}=require('node:os');
const {mkdtempSync,rmSync}=require('node:fs');
const root=path.resolve(__dirname,'..');
const candidates=[process.env.CHROME_BIN,'google-chrome','google-chrome-stable','chromium','chromium-browser'].filter(Boolean);
const {spawnSync}=require('node:child_process');
function chromePath(){
  for(const candidate of candidates){
    if(candidate.includes('/')&&fs.existsSync(candidate))return candidate;
    if(!candidate.includes('/')){
      const r=spawnSync('which',[candidate],{encoding:'utf8'});
      if(r.status===0&&r.stdout.trim())return r.stdout.trim();
    }
  }
  throw Error('Chrome/Chromium is required to run the real-browser smoke checks.');
}
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{
  let pathname;
  try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}
  const full=path.resolve(root,'.'+pathname);
  if(!(full===root||full.startsWith(root+path.sep))){res.writeHead(403).end();return;}
  fs.stat(full,(err,stat)=>{
    if(err||!stat.isFile()){res.writeHead(404).end();return;}
    res.writeHead(200,{'Content-Type':types[path.extname(full)]||'application/octet-stream','Cache-Control':'no-store'});
    fs.createReadStream(full).pipe(res);
  });
});
(async()=>{
  const binary=chromePath();
  await new Promise((resolve,reject)=>server.listen(0,'127.0.0.1',e=>e?reject(e):resolve()));
  const dir=mkdtempSync(path.join(tmpdir(),'help-smoke-'));
  const url='http://127.0.0.1:'+server.address().port+'/tests/browser-smoke.html';
  const args=['--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage',
    '--no-first-run','--no-default-browser-check','--disable-background-networking',
    '--window-size=390,850','--virtual-time-budget=12000','--dump-dom',
    '--user-data-dir='+dir,url];
  let stdout='',stderr='';
  const child=spawn(binary,args,{stdio:['ignore','pipe','pipe']});
  child.stdout.on('data',v=>stdout+=v.toString());
  child.stderr.on('data',v=>stderr+=v.toString());
  const timeout=setTimeout(()=>child.kill('SIGKILL'),30000);
  const code=await new Promise(resolve=>child.on('close',resolve));
  clearTimeout(timeout);
  server.close();
  rmSync(dir,{recursive:true,force:true});
  const ok=code===0 && /data-smoke-status="pass"/.test(stdout);
  if(!ok){
    const msg=stdout.match(/<pre id="result">([\s\S]*?)<\/pre>/);
    console.error('Browser smoke failed:',msg?msg[1]:'No test result found');
    console.error('Chrome exit:',code,'Chrome stderr:',stderr.slice(-2500));
    process.exitCode=1;
  }else console.log('PASS: real Chrome loaded and exercised all seven toolkit tools.');
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
