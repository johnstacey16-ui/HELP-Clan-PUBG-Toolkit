'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const src=fs.readFileSync(path.join(root,'sensitivity-presets.js'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');

function mount(storage){
  const mounted={section:null};
  function element(tag,value=''){
    return {
      tagName:tag.toUpperCase(),value,textContent:'',children:[],events:[],
      options:[],listeners:{},setAttribute(){},
      append(...items){this.children.push(...items);},
      addEventListener(type,fn){this.listeners[type]=fn;},
      dispatchEvent(e){this.events.push(e.type);},
      insertAdjacentElement(_location,child){mounted.section=child;},
      click(){this.listeners.click();}
    };
  }
  const fields=new Map([
    ['px_scope',element('select','1x')],
    ['px_sens',element('input','10')],
    ['v_cur_ads',element('input','10')],
    ['r_conv',element('select','169to1610')],
    ['current_sens_1x',element('input','')]
  ]);
  fields.get('px_scope').options=[{value:'1x'},{value:'3x'}];
  fields.get('r_conv').options=[{value:'169to1610'},{value:'169to43'}];
  const anchor=element('div');
  const panel={querySelector(selector){assert.equal(selector,'.sensitivity-top-tools');return anchor;}};
  const document={
    getElementById(id){return id==='panel-sensitivity'?panel:fields.get(id)||null;},
    createElement(tag){return element(tag);}
  };
  vm.runInNewContext(src,{document,window:{localStorage:storage},Event:class Event{constructor(type){this.type=type;}}});
  const buttons=mounted.section.children[2].children;
  return {fields,buttons,status:mounted.section.children[3],mounted};
}

test('saved sensitivity fields roundtrip and recompute without changing calculator formulas',()=>{
  const values=new Map();
  const storage={
    getItem(k){return values.get(k)||null;},
    setItem(k,v){values.set(k,v);},
    removeItem(k){values.delete(k);}
  };
  const {fields,buttons,status}=mount(storage);
  assert.deepEqual(buttons.map(b=>b.textContent),['Save settings','Load saved','Clear saved']);
  fields.get('px_scope').value='3x';
  fields.get('px_sens').value='12.4';
  fields.get('current_sens_1x').value='8.1';
  buttons[0].click();
  assert.match(status.textContent,/saved/i);
  fields.get('px_scope').value='1x';
  fields.get('px_sens').value='10';
  fields.get('current_sens_1x').value='';
  buttons[1].click();
  assert.equal(fields.get('px_scope').value,'3x');
  assert.equal(fields.get('px_sens').value,'12.4');
  assert.equal(fields.get('current_sens_1x').value,'8.1');
  assert.ok(fields.get('px_sens').events.includes('input'));
  assert.ok(fields.get('px_scope').events.includes('change'));
  buttons[2].click();
  assert.equal(values.size,0);
  assert.equal(fields.get('px_sens').value,'12.4','clear must not reset visible calculations');
});

test('malformed or unsupported saved values cannot override current settings',()=>{
  const storage={
    getItem(){return JSON.stringify({version:1,fields:{px_scope:'not-a-scope',px_sens:'oops',v_cur_ads:'15'}});},
    setItem(){},removeItem(){}
  };
  const {fields,buttons}=mount(storage);
  buttons[1].click();
  assert.equal(fields.get('px_scope').value,'1x');
  assert.equal(fields.get('px_sens').value,'10');
  assert.equal(fields.get('v_cur_ads').value,'15');
});

test('storage denial does not throw or block calculators',()=>{
  const denied={getItem(){throw Error('denied');},setItem(){throw Error('denied');},removeItem(){throw Error('denied');}};
  const {buttons,status}=mount(denied);
  for(const button of buttons) assert.doesNotThrow(()=>button.click());
  assert.match(status.textContent,/Unable to clear/);
});

test('presets and crawl metadata are linked without altering core classic script order',()=>{
  assert.match(html,/<script src="js\/sensitivity\.js"><\/script>\s*<script src="sensitivity-presets\.js"><\/script>/);
  assert.match(html,/<link rel="stylesheet" href="sensitivity-presets\.css">/);
  assert.match(html,/<meta name="description" content="/);
  assert.match(html,/<link rel="canonical" href="https:\/\/help-clan-pubg-toolkit\.vercel\.app\/">/);
  assert.match(fs.readFileSync(path.join(root,'robots.txt'),'utf8'),/sitemap\.xml/);
});
