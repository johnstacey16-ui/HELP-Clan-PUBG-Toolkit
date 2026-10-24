// Guard PUBG magazine capacities and weapon-specific attachment exclusions.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {resolve}=require('node:path');
const vm=require('node:vm');
const html=readFileSync(resolve(__dirname,'../index.html'),'utf8');
const between=(a,b)=>{
  const i=html.indexOf(a),j=html.indexOf(b,i+a.length);
  assert.ok(i>=0 && j>i,'Missing source section '+a+' -> '+b);
  return html.slice(i,j);
};
const ctx=vm.createContext({});
vm.runInContext(
  between('const WEAPONS = [','// w[9]')+
  '\n'+between('const ATTACH_MOD = {','(function(){\n  const $ = id => document.getElementById(id);')+
  '\nthis.data={WEAPONS,MAG_CAP_VERIFIED,MAG_LARGE_30_ROUND_MODEL,slotsFor,extendedCapFor};',
  ctx
);
const {WEAPONS,MAG_CAP_VERIFIED,slotsFor,extendedCapFor}=ctx.data;
const w=n=>{const weapon=WEAPONS.find(x=>x.name===n);assert.ok(weapon,'Missing '+n);return weapon;};

test('base magazines match official Mk47 and Skorpion notes',()=>{
  assert.equal(WEAPONS.length,45);
  assert.equal(w('MK47 Mutant').mag,20);
  assert.equal(w('Skorpion').mag,20);
  assert.equal(w('M249').mag,75);
  assert.equal(w('RPD').mag,50);
});

test('Extended and Extended QuickDraw capacities must not be conflated',()=>{
  for(const [name,ext,eq] of [
    ['M416',42,40],['AWM',8,7],['M24',8,7],
    ['M249',150,null],['RPD',110,null],
    ['MK47 Mutant',30,null],
    ['S12K',10,10],['Tommy Gun',50,50],['Skorpion',40,40]
  ]){
    assert.equal(extendedCapFor(w(name),'extended'),ext,name+' Extended');
    assert.equal(extendedCapFor(w(name),'extquick'),eq,name+' Extended QuickDraw');
  }
  assert.equal(MAG_CAP_VERIFIED.M416.extended,42);
  assert.equal(MAG_CAP_VERIFIED.M416.extquick,40);
  assert.equal(extendedCapFor(w('AKM'),'extended'),40,'AKM weapon-specific 40-round mag');
  assert.equal(extendedCapFor(w('AKM'),'extquick'),40,'AKM extended quickdraw');
  assert.equal(extendedCapFor(w('SLR'),'extquick'),20,'source-backed SLR EQ capacity');
  assert.equal(extendedCapFor(w('SVD Dragunov'),'extended'),null,'missing exact capacity');
  // A shared 42-round item label must not override actual rounds on each gun.
  for(const gun of ['AUG A3','Beryl M762','Groza','G36C','SCAR-L','QBZ95','M16A4','K2','FAMAS']){
    assert.equal(extendedCapFor(w(gun),'extended'),40,gun+' weapon loaded rounds');
    assert.equal(extendedCapFor(w(gun),'extquick'),40,gun+' EQ loaded rounds');
  }
  for(const [gun,mag] of [['SKS',20],['SLR',20],['VSS Vintorez',20],['Mini 14',30],['Mk12',30]]){
    assert.equal(extendedCapFor(w(gun),'extended'),mag,gun+' Extended');
    assert.equal(extendedCapFor(w(gun),'extquick'),mag,gun+' Extended QuickDraw');
  }
  for(const gun of ['ACE 32','SVD Dragunov']){
    assert.equal(extendedCapFor(w(gun),'extended'),null,gun+' unresolved ambiguity');
    assert.equal(extendedCapFor(w(gun),'extquick'),null,gun+' unresolved EQ ambiguity');
  }
  // Mk14 has two overlapping, weapon-compatible magazine families.
  assert.equal(extendedCapFor(w('MK14 EBR'),'extended'),22,'DMR/SR Extended');
  assert.equal(extendedCapFor(w('MK14 EBR'),'extquick'),20,'DMR/SR Extended QuickDraw');
  assert.equal(extendedCapFor(w('MK14 EBR'),'extended_ar'),20,'AR/DMR Extended');
  assert.equal(extendedCapFor(w('MK14 EBR'),'extquick_ar'),20,'AR/DMR Extended QuickDraw');
  assert.equal(extendedCapFor(w('SLR'),'extended_ar'),null,'do not invent AR family capacity for SLR');
  assert.equal(extendedCapFor(w('M416'),'extended'),42);
  assert.equal(extendedCapFor(w('M416'),'extquick'),40);
});

test('weapon-specific magazine fit: M249 yes; Kar98k/revolver/MG3 no',()=>{
  for(const [name,kind] of [
    ['M249','AR_LMG'],['RPD','AR_LMG'],['AWM','DMR_SR'],
    ['M24','DMR_SR'],['M416','AR_DMR_S12K'],
    ['S12K','AR_DMR_S12K'],['Skorpion','SMG_PISTOL'],
    ['G18C','SMG_PISTOL'],['Tommy Gun','SMG_PISTOL']
  ]){
    assert.equal(slotsFor(w(name)).magazine,kind,name+' slot');
  }
  for(const name of ['Kar98k','R1895','MG3','Lynx AMR','P90','O12','S686','DBS']){
    assert.equal(slotsFor(w(name)).magazine,null,name+' cannot attach magazine');
    assert.equal(extendedCapFor(w(name),'extended'),null,name+' capacity unavailable');
  }
  assert.equal(slotsFor(w('M249')).muzzle,null,'LMG M249 no muzzle selector');
});

test('UI displays the distinct capacities and hides fake RPD reloads',()=>{
  assert.match(html,/const eq  = extendedCapFor\(w,"extquick"\)/);
  assert.match(html,/const extQuick = extendedCapFor\(w,"extquick"\)/);
  assert.match(html,/newCap = extQuick; reloadSpeedMultiplier = 1\.15/);
  assert.match(html,/Extended QuickDraw\\$\\{w.name===/);
  assert.ok(html.includes('Extended QuickDraw (AR/DMR) (20, +15% reload speed)'));
  assert.match(html,/\$\("at_capNew"\)\.textContent = newCap \?\? "No data"/);
  assert.match(html,/finalReload==null \? "No data" : reloadMult<1/);
  assert.doesNotMatch(html,/Math\.ceil\(w\.mag\*1\.3\)/);
  assert.doesNotMatch(html,/return w\.mag\+5/);
});

test('all calculators and scope matcher still parse and retain limits',()=>{
  for(const fun of ['pixelSpeed','matchedSens','shotgunMinShellsAt','dropAtRange','extendedCapFor']){
    assert.match(html,new RegExp('function '+fun+'\\('));
  }
  const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
  assert.equal(scripts.length,5);
  scripts.forEach((s,i)=>assert.doesNotThrow(()=>new vm.Script(s),'script '+i));
});
