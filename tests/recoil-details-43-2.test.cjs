// Source-backed recoil metadata in the Recoil Evidence Explorer (Update 43.2).
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {resolve}=require('node:path');
const {runInNewContext,Script}=require('node:vm');
const html=readFileSync(resolve(__dirname,'../index.html'),'utf8');
const at=html.indexOf('const RECOIL_DETAIL_43_2 = {');
const end=html.indexOf('WEAPONS.forEach(w=>',at);
assert.ok(at>0&&end>at);
const recoil=runInNewContext(html.slice(at,end)+';RECOIL_DETAIL_43_2');
const keys=Object.keys(recoil);
const start=html.indexOf('/* ================= 3. RECOIL EVIDENCE EXPLORER ================= */');
const finish=html.indexOf('/* ================= 4. ATTACHMENTS & RECOIL ================= */',start);
const logic=html.slice(start,finish);

test('33 named weapons have individually mapped 43.2 recoil engine metadata',()=>{
  assert.equal(keys.length,33);
  for(const [name,mod,recovery,shotSwitch] of [
    ['RPD',.32,7,2],
    ['M249',.32,6,2],
    ['UMP9',.70,7,2],
    ['MP5K',.70,8.5,2],
    ['Micro Uzi',.70,12,2],
    ['G18C',.70,11,1],
    ['Tommy Gun',.70,12,2],
    ['P90',.70,7,null],
    ['MP9',.70,7,null],
    ['S12K',.75,7,1]
  ]){
    assert.equal(recoil[name].proneMod,mod,name+' prone');
    assert.equal(recoil[name].recoveryV,recovery,name+' recovery');
    assert.equal(recoil[name].switchShots,shotSwitch,name+' direction switch');
  }

  // Every field below comes from a named 43.2 RecoilConfig weapon page.
  for(const [name,prone,recovery,switchShots,climb,fall] of [
    ['AKM',null,8.2,2,0.7,2.4],
    ['Beryl M762',.7,8.2,2,.65,2.15],
    ['M416',null,7,2,.7,2.1],
    ['AUG A3',null,6,2,.65,2.1],
    ['G36C',null,8,2,.65,2.3],
    ['Kar98k',null,5.5,1,.7,3],
    ['AWM',null,5.5,1,.7,3],
    ['M24',null,5.5,1,.5,3],
    ['SCAR-L',null,8,2,.75,2.3],
    ['QBZ95',null,8,2,.75,2.4],
    ['MG3',.265,8.5,2,.75,3.3],
    ['Mini 14',null,9,1,1.2,3],
    ['MK14 EBR',.25,6,1,.9,3]
  ]){
    assert.equal(recoil[name].proneMod,prone,name+'/prone');
    assert.equal(recoil[name].recoveryV,recovery,name+'/recovery');
    assert.equal(recoil[name].switchShots,switchShots,name+'/switch');
    assert.equal(recoil[name].climb,climb,name+'/climb');
    assert.equal(recoil[name].fall,fall,name+'/fall');
  }
  assert.equal(Object.values(recoil).filter(r=>r.proneMod!=null).length > 0,true);
  assert.equal(recoil.SKS.climb,null);
  assert.equal(recoil.SLR.proneMod,null);
  for(const [name,obj] of Object.entries(recoil)){
    for(const [field,value] of Object.entries(obj)){
      assert.ok(value===null||Number.isFinite(value),name+'/'+field+' invalid field');
    }
  }
  assert.match(html,/w\.recoilDetail = RECOIL_DETAIL_43_2\[w.name\] \|\| null/);
});

function element(id,value=''){
  return {id,value,handlers:{},children:{},innerHTML:'',textContent:'',attrs:{},
    addEventListener(event,fn){this.handlers[event]=fn},
    setAttribute(k,v){this.attrs[k]=v},
    querySelector(k){return this.children[k]||null}
  };
}
test('recoil explorer renders recovered fields and preserves unknown shot-by-shot curve',()=>{
  const nodes={
    rc_weapon:element('rc_weapon','RPD'),
    rc_stance:element('rc_stance','prone'),
    rc_shots:element('rc_shots','20'),
    rc_missing:element('rc_missing'),
    rc_table:element('rc_table'),
    rc_chart:element('rc_chart')
  };
  nodes.rc_chart.children.strong=element('strong');
  const doc={getElementById(name){assert.ok(nodes[name],name);return nodes[name]}};
  const PT={WBYNAME:{
    RPD:{name:'RPD',vRecoil:7.5,vertSpeed:15.5,horizSpeed:11,minH:25,crouchMod:.70,recoilDetail:recoil.RPD},
    AKM:{name:'AKM',vRecoil:8,vertSpeed:15,horizSpeed:9.5,minH:42,crouchMod:.84,recoilDetail:null}
  }};
  runInNewContext(logic,{document:doc,PT,fillWeaponSelect(sel){sel.value='RPD'}});
  assert.match(nodes.rc_table.innerHTML,/Prone recoil multiplier<\/td><td>0\.32/);
  assert.match(nodes.rc_table.innerHTML,/Vertical recovery speed<\/td><td>7/);
  assert.match(nodes.rc_table.innerHTML,/Bullets per direction switch<\/td><td>2/);
  assert.match(nodes.rc_table.innerHTML,/Recoil climb parameter<\/td><td>0\.7/);
  assert.match(nodes.rc_missing.textContent,/Exact shot-by-shot recoil: No data/);
  assert.equal(nodes.rc_chart.attrs['data-evidence'],'unknown');
  nodes.rc_weapon.value='AKM';
  nodes.rc_weapon.handlers.change();
  assert.doesNotMatch(nodes.rc_table.innerHTML,/Prone recoil multiplier/);
  assert.match(nodes.rc_missing.textContent,/AKM/);
});

test('sensitivity, ballistics, and shotgun best-case maths are unaffected',()=>{
  for(const name of ['pixelSpeed','matchedSens','shotgunMinShellsAt','dropAtRange','extendedCapFor']){
    assert.match(html,new RegExp('function '+name+'\\('));
  }
  const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
  assert.equal(scripts.length,5);
  scripts.forEach((text,i)=>assert.doesNotThrow(()=>new Script(text),'script '+i));
});
