'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const html=read('index.html');
const panel=id=>{const a=html.indexOf('id="panel-'+id+'"');const b=html.indexOf('id="panel-',a+20);return html.slice(a,b<0?undefined:b)};
test('Range, TTK and Recoil display primary values before optional illustrations',()=>{
 for(const [id,result,disclosure] of [['range','id="rg_dmg"','visual-range-artwork'],['ttk','id="tk_pure"','visual-ttk-artwork'],['recoil2','id="rc_table"','visual-recoil-artwork']]){
  const p=panel(id);
  assert.ok(p.indexOf(result)>0 && p.indexOf(result)<p.indexOf('id="'+disclosure+'"'),id);
  assert.match(p,new RegExp('<details class="visual-opt-in-art" id="'+disclosure+'">'));
 }
});
test('TTK comparison numbers precede their opt-in image gallery',()=>{
 const p=panel('ttk');
 assert.ok(p.indexOf('id="tk_cmpTable"')<p.indexOf('id="visual-ttk-comparison-artwork"'));
 assert.match(p,/id="visual-ttk-comparisons"/);
 assert.equal((html.match(/id="visual-ttk-comparisons"/g)||[]).length,1);
});
test('native art expander meets controller focus and mobile tap targets',()=>{
 const css=read('visual-assets.css');
 assert.match(css,/\.visual-opt-in-art>summary/);
 assert.match(css,/min-height:48px/);
 assert.match(css,/focus-visible/);
 assert.match(read('tests/visual-layout.html'),/item\.open=true/);
 assert.equal((html.match(/data-hit-zone="/g)||[]).length,13);
});
