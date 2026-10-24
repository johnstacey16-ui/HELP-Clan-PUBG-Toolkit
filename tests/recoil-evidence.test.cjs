// The Recoil Evidence Explorer must never fabricate 5%-per-shot recoil.
const {test} = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {resolve} = require('node:path');
const {Script,runInNewContext} = require('node:vm');

const html = readFileSync(resolve(__dirname,'../index.html'),'utf8');
const start = html.indexOf('/* ================= 3. RECOIL EVIDENCE EXPLORER ================= */');
const end = html.indexOf('/* ================= 4. ATTACHMENTS & RECOIL ================= */', start);
const recoil = html.slice(start,end);

test('retire unsupported recoil growth and assumed prone multipliers',()=>{
  assert.ok(start>=0 && end>start,'Recoil evidence source section exists');
  assert.doesNotThrow(()=>new Script(recoil));
  assert.doesNotMatch(recoil,/0\.05|5%\s*\/\s*shot|PRONE_EXTRA|seededNoise|Math\.random|cumV|cumH|Math\.sin/);
  assert.match(html,/No verified per-shot recoil curve/);
  assert.match(html,/No authoritative evidence has been found/);
  assert.match(html,/supplied dataset, not recoil amounts for specific bullets/);
  assert.match(html,/pubg\.com\/en\/news\/10874/);
  assert.match(html,/pubg\.com\/en\/news\/10179/);
  assert.match(html,/pubg\.com\/en-asia\/news\/7424/);
});

function node(id,value=''){
  return {
    id,value,events:{},attributes:{},children:{},
    textContent:'',innerHTML:'',
    addEventListener(k,v){this.events[k]=v},
    setAttribute(k,v){this.attributes[k]=v},
    querySelector(tag){return this.children[tag]||null}
  };
}

test('selecting 10, 20, or 30 shots shows unknown rather than numerical spray',()=>{
  const objects = {
    rc_weapon:node('rc_weapon','AKM'),
    rc_stance:node('rc_stance','standing'),
    rc_shots:node('rc_shots','20'),
    rc_missing:node('rc_missing'),
    rc_table:node('rc_table'),
    rc_chart:node('rc_chart')
  };
  objects.rc_chart.children.strong=node('strong');
  const document={getElementById(id){
    assert.ok(objects[id], 'Expected input '+id);
    return objects[id];
  }};
  const PT={
    WBYNAME:{
      AKM:{name:'AKM',vRecoil:8,vertSpeed:15,horizSpeed:9.5,minH:42,hBiasDir:'←',hBiasVal:.2,crouchMod:.84},
      G18C:{name:'G18C',vRecoil:null,vertSpeed:null,horizSpeed:null,minH:null,hBiasVal:null,crouchMod:null}
    }
  };
  runInNewContext(recoil,{document,PT,fillWeaponSelect(sel){sel.value='AKM'}});

  for(const count of [10,20,30]){
    objects.rc_shots.value=String(count);
    objects.rc_shots.events.change();
    assert.match(objects.rc_missing.textContent,new RegExp(count+' shots'));
    assert.match(objects.rc_missing.textContent,/No verified vertical\/horizontal recoil measurement/);
    assert.match(objects.rc_chart.children.strong.textContent,/No verified/);
    assert.equal(objects.rc_chart.attributes['data-evidence'],'unknown');
    assert.doesNotMatch(objects.rc_table.innerHTML,/<td>10<\/td><td>\d/);
    assert.match(objects.rc_table.innerHTML,/Supplied weapon-level field/);
  }
  objects.rc_weapon.value='G18C';
  objects.rc_weapon.events.change();
  assert.match(objects.rc_table.innerHTML,/No data/);
  assert.doesNotMatch(objects.rc_table.innerHTML,/NaN|undefined/);
  objects.rc_stance.value='prone';
  objects.rc_stance.events.change();
  assert.match(objects.rc_missing.textContent,/No verified current-patch prone modifier/);
});

test('existing toolkit panels and script structure remain intact',()=>{
  for(const id of ['panel-combat','panel-sensitivity','panel-range','panel-ttk','panel-recoil2','panel-attach','panel-backpack','panel-data']){
    assert.ok(html.includes('id="'+id+'" class="hub-main'));
  }
  const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
  assert.equal(scripts.length,5);
  scripts.forEach(code=>assert.doesNotThrow(()=>new Script(code)));
});
