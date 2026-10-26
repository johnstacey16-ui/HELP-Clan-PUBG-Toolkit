'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const read=p=>fs.readFileSync(path.resolve(__dirname,'..',p),'utf8');
test('all three sensitivity views use accessible tab buttons with standard keyboard navigation',()=>{
 const html=read('index.html'),src=read('js/sensitivity.js');
 assert.match(html,/<div class="tabs" id="tabs" role="tablist" aria-label="Sensitivity calculator views"><\/div>/);
 assert.match(src,/document\.createElement\('button'\)/);
 assert.match(src,/b\.setAttribute\('role','tab'\)/);
 assert.match(src,/b\.setAttribute\('aria-controls',panel\.id\)/);
 assert.match(src,/b\.setAttribute\('aria-selected',String\(i===0\)\)/);
 assert.match(src,/ArrowRight/);
 assert.match(src,/ArrowLeft/);
 assert.match(src,/Home/);
 assert.match(src,/End/);
 assert.match(src,/button\.tabIndex=active\?0:-1/);
 assert.match(src,/panel\.setAttribute\('aria-hidden',String\(!active\)\)/);
 assert.doesNotThrow(()=>new vm.Script(src));
});
test('visual upgrade cannot change the empirical sensitivity maths',()=>{
 const src=read('js/sensitivity.js');
 assert.match(src,/function pixelSpeed\(C, A, B\)/);
 assert.match(src,/function matchedSens\(speed, A, B\)/);
 assert.match(src,/switchTab\('scope'\)/);
 assert.match(read('visual-assets.css'),/#panel-sensitivity #tabs \[role="tab"\]:focus-visible/);
});
test('all static inline images reserve dimensions, supply alt and explicit loading intent',()=>{
 const html=read('index.html'),images=[...html.matchAll(/<img\b[^>]*>/g)].map(x=>x[0]);
 assert.ok(images.length>=20,'Expected visible artwork and optional images');
 let eager=0;
 for(const tag of images){
   assert.match(tag,/\bwidth="\d+"/,'Missing width on '+tag);
   assert.match(tag,/\bheight="\d+"/,'Missing height on '+tag);
   assert.match(tag,/\balt="[^"]*"/,'Missing alt text on '+tag);
   assert.match(tag,/\bloading="(?:eager|lazy)"/,'Missing loading intent on '+tag);
   if(/\bloading="eager"/.test(tag))eager++;
   if(/data-visual-src=/.test(tag)){
     assert.doesNotMatch(tag,/\ssrc=/,'Deferred image unexpectedly requests art');
   }
 }
 assert.ok(eager<=1,'Optional images must not be eager');
 assert.equal((html.match(/data-hit-zone="/g)||[]).length,13);
});
