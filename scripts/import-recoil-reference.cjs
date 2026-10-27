// Import data literals only; never execute a third-party page or its handlers.
'use strict';
const fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const path=require('node:path'),root=path.resolve(__dirname,'..');
const filename=process.argv[2];if(!filename)throw Error('Usage: node scripts/import-recoil-reference.cjs downloaded-page.html');
const source=fs.readFileSync(filename,'utf8');
function literal(name){
 const match=new RegExp('const '+name+'\\s*=\\s*').exec(source);if(!match)throw Error('Missing '+name);
 let start=match.index+match[0].length,depth=0,quote=null,escape=false;
 for(let i=start;i<source.length;i++){
  const c=source[i];
  if(quote){if(escape)escape=false;else if(c==='\\')escape=true;else if(c===quote)quote=null;continue;}
  if(c==='"'||c==="'"){quote=c;continue;}
  if(c==='{'||c==='[')depth++;if(c==='}'||c===']')depth--;
  if(depth===0){const expression=source.slice(start,i+1);return JSON.parse(JSON.stringify(vm.runInNewContext('('+expression+')',Object.create(null),{timeout:500})));}
 }
 throw Error('Unclosed '+name);
}
const curves=literal('PS_C'),classes=literal('PS_W'),random=literal('PS_R'),pools=literal('PS_P');
const aliases={'ACE32':'ACE 32','HK416':'M416','FAMAS G2':'FAMAS','Mutant':'MK47 Mutant','QBZ':'QBZ95','Thompson':'Tommy Gun','Uzi':'Micro Uzi','Dragunov':'SVD Dragunov','Mini14':'Mini 14'};
const weapons={};
for(const [referenceName,curve] of Object.entries(curves)){
 const name=aliases[referenceName]||referenceName;let settings,weaponClass;
 for(const [cls,entries] of Object.entries(classes))if(entries[referenceName]){settings=entries[referenceName];weaponClass=cls;}
 if(!settings||!random[referenceName])throw Error('Incomplete '+name);
 for(const axis of ['v','h','r']){
  let previous=-Infinity;
  for(const key of curve[axis]){
   if(!['t','v','at','lt'].every(k=>Number.isFinite(key[k]))||key.t<previous||!['Constant','Linear','Cubic'].includes(key.mode))throw Error('Invalid key '+name);
   previous=key.t;
  }
 }
 weapons[name]={referenceName,weaponClass,...curve,stanceAndSlots:settings,random:random[referenceName]};
}
if(Object.keys(weapons).length!==27)throw Error('Review changed coverage before importing');
const data={schemaVersion:1,source:{url:'https://www.pubgintel.com/pubg-per-shot-analyzer',accessed:'2026-10-27',sha256:crypto.createHash('sha256').update(source).digest('hex'),policy:'Owner-approved fallback reference. Existing HELP values win conflicts; curves are model inputs, not observed bullet impacts.'},weapons,attachmentPools:pools,patchChanges:literal('PATCH_WEAPONS')};
fs.writeFileSync(path.join(root,'data/recoil-reference.json'),JSON.stringify(data,null,2)+'\n');
fs.writeFileSync(path.join(root,'recoil-reference.js'),'// Numeric reference data; provenance and precedence are documented in docs/recoil-reference-audit.md.\nwindow.HELP_RECOIL_REFERENCE='+JSON.stringify(data)+';\n');
console.log('Imported '+Object.keys(weapons).length+' weapon curves; source SHA-256 '+data.source.sha256);
