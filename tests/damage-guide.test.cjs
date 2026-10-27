'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const source=read('src/calculators/00-damage-ballistics.part');
const ctx={PT:{}};vm.runInNewContext(source.slice(source.indexOf('const BODY_PARTS = {'))+'\n',ctx);
const m=ctx.PT.DAMAGE_GUIDE;
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,a+' differs from '+b);
test('guide reuses all thirteen hit regions across all seven classes with independent gear',()=>{
 assert.equal(m.parts.length,13);assert.equal(m.classes.length,7);
 for(const cls of m.classes){
  const bare=m.rows(cls,0,0),helmet=m.rows(cls,2,0),vest=m.rows(cls,0,3);
  for(let i=0;i<13;i++){
   const p=m.parts[i];near(bare[i].combined,p.hitArea*bare[i].classMultiplier);
   near(helmet[i].combined,bare[i].combined*(p.bucket==='head'?.6:1));
   near(vest[i].combined,bare[i].combined*(p.armored&&p.bucket!=='head'?.45:1));
  }
 }
 near(m.rows('AR').find(r=>r.id==='head').combined,1.41);
 near(m.rows('AR').find(r=>r.id==='chest').combined,.66);
 near(m.rows('MG').find(r=>r.id==='chest').combined,.693);
 near(m.rows('MG').find(r=>r.id==='pelvis').combined,.6);
 assert.throws(()=>m.rows('bad'),/Unknown/);assert.throws(()=>m.rows('AR',4,2),/Invalid/);
});
test('worked formula respects actual checkpoints, weapon head exceptions and unknown shotgun totals',()=>{
 const a=m.breakdown({name:'M416',cls:'AR',dmg:40},100,'chest',2,2);
 near(a.distanceFactor,.975);near(a.damage,25.74);
 near(a.base*a.distanceFactor*a.armorMultiplier*a.hitAreaMultiplier*a.classMultiplier,a.damage);
 const d=m.breakdown({name:'SVD Dragunov',cls:'DMR',dmg:53},0,'head',2,2);near(d.classMultiplier,2.8);near(d.damage,89.04);
 assert.equal(m.breakdown({name:'M416',cls:'AR',dmg:40},99,'chest',2,2).damage,null);
 const pellet=m.breakdown({name:'DBS',cls:'SG',dmg:28},0,'chest',2,2);assert.equal(pellet.pellet,true);assert.equal(pellet.damage,null);assert.equal(pellet.distanceFactor,null);
});
test('fifteen distinct optimized portraits and every source prompt are shipped',()=>{
 const manifest=JSON.parse(read('docs/damage-guide-image-prompts.json'));
 assert.equal(manifest.assets.length,15);const hashes=new Set();let bytes=0;
 for(const a of manifest.assets){const data=fs.readFileSync(path.join(__dirname,'..',a.file));assert.equal(data.subarray(8,12).toString(),'WEBP');assert.ok(data.length<100000);bytes+=data.length;hashes.add(crypto.createHash('sha256').update(data).digest('hex'));assert.match(a.prompt,/adult|ADULT/);}
 assert.equal(hashes.size,15);assert.ok(bytes<1000000);
});
