'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const src=fs.readFileSync(path.join(root,'share-weapon-comparison.js'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');

function setup(url='https://help-clan-pubg-toolkit.vercel.app/#panel-ttk',withClipboard=true){
  const buttons={};
  class FakeEvent{constructor(type){this.type=type;}}
  class FakeElement{
    constructor(value='',items=[]){
      this.value=value;
      this.options=items.map(value=>({value,disabled:false}));
      this.events={};
      this.hidden=true;
      this.textContent='';
      this.checked=false;
    }
    addEventListener(name,handler){this.events[name]=handler;}
    dispatchEvent(event){if(this.events[event.type])this.events[event.type](event);return true;}
    focus(){this.focused=true;}
    select(){this.selected=true;}
    click(){this.dispatchEvent(new FakeEvent('click'));}
  }
  const guns=['AKM','M416','UMP9','SKS','O12'];
  const fields={
    hz_weapon:new FakeElement('M416',guns),
    hz_distance:new FakeElement('0',['0','100']),
    hz_helmet:new FakeElement('2',['0','1','2','3']),
    hz_vest:new FakeElement('2',['0','1','2','3']),
    tk_weapon:new FakeElement('M416',guns),
    tk_distance:new FakeElement('0',['0','100']),
    tk_hitbox:new FakeElement('chest',['head','chest','limb']),
    tk_detailed:new FakeElement(),
    tk_cmpA:new FakeElement('AKM',guns),
    tk_cmpB:new FakeElement('UMP9',guns),
    tk_cmpC:new FakeElement('', ['',...guns]),
    wc_copy:new FakeElement(), wc_link:new FakeElement(),wc_status:new FakeElement()
  };
  // A lightweight simulation of the existing Combat Lab's event propagation.
  fields.hz_weapon.addEventListener('change',()=>{
    fields.tk_weapon.value=fields.hz_weapon.value;
    const distances=fields.hz_weapon.value==='O12'?['2','25','50']:['0','100'];
    for(const key of ['hz_distance','tk_distance']){
      fields[key].options=distances.map(value=>({value,disabled:false}));
      fields[key].value=distances[0];
    }
  });
  fields.hz_distance.addEventListener('change',()=>{fields.tk_distance.value=fields.hz_distance.value;});
  fields.tk_detailed.addEventListener('change',()=>{
    fields.tk_hitbox.options=(fields.tk_detailed.checked
      ? ['head','neck','clavicle','chest','upperArm','forearm','hand','thigh','calf','foot']
      : ['head','chest','limb']).map(value=>({value,disabled:false}));
    fields.tk_hitbox.value='chest';
  });
  const zones=Object.fromEntries(['head','neck','clavicle','chest','upperStomach',
    'lowerStomach','pelvis','upperArm','forearm','hand','thigh','calf','foot'].map(id=>{
    const el=new FakeElement();
    el.addEventListener('click',()=>{
      fields.tk_detailed.checked=true;
      fields.tk_detailed.dispatchEvent(new FakeEvent('change'));
      fields.tk_hitbox.value=id;
    });
    return [id,el];
  }));
  const document={
    getElementById(id){return fields[id]||null;},
    querySelector(selector){
      const match=selector.match(/data-hit-zone="([^"]+)"/);
      return match?zones[match[1]]||null:null;
    }
  };
  let copied='';
  const clipboard=withClipboard?{writeText(value){copied=value;return Promise.resolve();}}:null;
  const navigator=clipboard?{clipboard}:{};
  const location={href:url,search:new URL(url).search};
  vm.runInNewContext(src,{document,window:{location},navigator,URL,URLSearchParams,Event:FakeEvent,MouseEvent:FakeEvent});
  return {fields,zones,get copied(){return copied;}};
}

test('the share control builds a self-contained exact-checkpoint URL with all three weapons',async()=>{
  const app=setup();
  const f=app.fields;
  f.hz_weapon.value='AKM';f.hz_weapon.dispatchEvent({type:'change'});
  f.hz_distance.value='100';f.hz_distance.dispatchEvent({type:'change'});
  f.hz_helmet.value='3';f.hz_vest.value='2';
  app.zones.head.click();
  f.tk_cmpA.value='M416';f.tk_cmpB.value='UMP9';f.tk_cmpC.value='SKS';
  f.wc_copy.click();
  const shared=new URL(f.wc_link.value);
  assert.equal(shared.hash,'#panel-ttk');
  for(const [key,expected] of Object.entries({
    wc_v:'1',wc_weapon:'AKM',wc_distance:'100',wc_zone:'head',
    wc_helmet:'3',wc_vest:'2',wc_a:'M416',wc_b:'UMP9',wc_c:'SKS'
  }))assert.equal(shared.searchParams.get(key),expected,key);
  assert.equal(app.copied,shared.href);
  assert.equal(f.wc_link.hidden,false);
});

test('a shared link restores selections through the source controls',()=>{
  const params=new URLSearchParams({
    wc_v:'1',wc_weapon:'AKM',wc_distance:'100',wc_zone:'head',
    wc_helmet:'3',wc_vest:'2',wc_a:'M416',wc_b:'UMP9',wc_c:'SKS'
  });
  const app=setup('https://help-clan-pubg-toolkit.vercel.app/?'+params+'#panel-ttk');
  const f=app.fields;
  assert.equal(f.tk_weapon.value,'AKM');
  assert.equal(f.tk_distance.value,'100');
  assert.equal(f.tk_hitbox.value,'head');
  assert.equal(f.hz_helmet.value,'3');
  assert.equal(f.hz_vest.value,'2');
  assert.equal(f.tk_cmpA.value,'M416');
  assert.equal(f.tk_cmpB.value,'UMP9');
  assert.equal(f.tk_cmpC.value,'SKS');
  assert.match(f.wc_status.textContent,/Shared comparison loaded/);
});

test('the simple limb option roundtrips without inventing an SVG zone',()=>{
  const p=new URLSearchParams({
    wc_v:'1',wc_weapon:'M416',wc_distance:'0',wc_zone:'limb',
    wc_helmet:'0',wc_vest:'2',wc_a:'AKM',wc_b:'M416',wc_c:''
  });
  const f=setup('https://help-clan-pubg-toolkit.vercel.app/?'+p+'#panel-ttk').fields;
  assert.equal(f.tk_hitbox.value,'limb');
  assert.equal(f.tk_detailed.checked,false);
  assert.match(f.wc_status.textContent,/loaded/);
});

test('unsupported parameters are rejected instead of injected into the UI',()=>{
  const p=new URLSearchParams({
    wc_v:'1',wc_weapon:'Not a real gun',wc_distance:'100',wc_zone:'head',
    wc_helmet:'3',wc_vest:'2',wc_a:'AKM',wc_b:'UMP9',wc_c:''
  });
  const f=setup('https://help-clan-pubg-toolkit.vercel.app/?'+p).fields;
  assert.equal(f.tk_weapon.value,'M416');
  assert.match(f.wc_status.textContent,/not supported/);
  p.set('wc_weapon','O12');
  const f2=setup('https://help-clan-pubg-toolkit.vercel.app/?'+p).fields;
  assert.match(f2.wc_status.textContent,/no recorded data/);
  assert.notEqual(f2.tk_distance.value,'100','invalid checkpoint must not be set');
});

test('missing and conflicting query parameters are safely rejected',()=>{
  const p=new URLSearchParams({wc_v:'1',wc_weapon:'M416'});
  const f=setup('https://help-clan-pubg-toolkit.vercel.app/?'+p).fields;
  assert.match(f.wc_status.textContent,/missing required/);
  p.set('wc_v','2');
  assert.match(setup('https://help-clan-pubg-toolkit.vercel.app/?'+p).fields.wc_status.textContent,/unsupported version/);
});

test('a visible manual-copy link is provided when clipboard is unavailable',()=>{
  const {fields}=setup('https://help-clan-pubg-toolkit.vercel.app/#panel-ttk',false);
  fields.wc_copy.click();
  assert.equal(fields.wc_link.hidden,false);
  assert.equal(fields.wc_link.selected,true);
  assert.match(fields.wc_status.textContent,/Copy the selected text/);
});

test('the share module is loaded after the existing calculators; the base formulas are unmodified',()=>{
  assert.match(html,/<table id="tk_cmpTable"><\/table>[\s\S]*id="wc_copy"/);
  assert.match(html,/<script src="damage-guide\.js"><\/script>\s*<script src="share-weapon-comparison\.js"><\/script>/);
  assert.match(html,/<link rel="stylesheet" href="share-weapon-comparison\.css">/);
  assert.doesNotMatch(src,/eval\(|localStorage|fetch\(/);
  assert.doesNotThrow(()=>new vm.Script(src));
});
