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
  assert.equal(extendedCapFor(w('AKM'),'extended'),42,'43.2 large-mag model');
  assert.equal(extendedCapFor(w('AKM'),'extquick'),40,'43.2 large-mag model');
  assert.equal(extendedCapFor(w('SLR'),'extquick'),null,'do not fabricate DMR EQ capacity');
  assert.equal(extendedCapFor(w('SVD Dragunov'),'extended'),null,'missing exact capacity');
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
  assert.match(html,/Extended QuickDraw \(\$\{eq==null\?"No data":eq\}/);
  assert.match(html,/\$\("at_capNew"\)\.textContent = newCap \?\? "No data"/);
  assert.match(html,/w.name==="RPD" \? "No data" : reloadMult<1/);
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
