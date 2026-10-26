// Presentation-only controls. Never set any calculator option or source data.
(function(){
'use strict';
const get=id=>document.getElementById(id);
const owns=(map,key)=>Object.prototype.hasOwnProperty.call(map,key);
const optics=Object.freeze({'1x':'optic-1x.svg','2x':'optic-2x.svg','3x':'optic-3x.svg','4x':'optic-4x.svg','6x':'optic-6x.svg','8x':'optic-8x.svg','15x':'optic-15x.svg'});
const catalogue=window.HELP_VISUAL_WEAPONS||{};
function artFor(name){return owns(catalogue,name)?catalogue[name]:null;}
const oneXArt=Object.freeze({reddot:'optic-red-dot.svg',holo:'optic-holographic.svg',iron:'optic-iron.svg'});
let oneXSelection='reddot';
function syncScope(){
 const s=get('px_scope'),img=get('visual-scope-image'),label=get('visual-scope-label');
 if(!s||!img||!label)return;
 const m=owns(optics,s.value)?s.value:'3x';
 const selectOne=m==='1x'&&owns(oneXArt,oneXSelection);
 const source='assets/'+(selectOne?oneXArt[oneXSelection]:optics[m]);
 // Preserve decoded artwork on repeated updates; only switch when the variant changes.
 if(img.getAttribute('src')!==source)img.src=source;
 img.alt=selectOne?'Original representative '+oneXSelection+' sight':'Representative '+m+' scope';
 label.textContent=selectOne?'1x '+({reddot:'Red Dot',holo:'Holographic',iron:'Iron sights'}[oneXSelection]):m+' reference optic';
 const variants=get('visual-one-x-variants');
 if(variants)variants.hidden=m!=='1x';
 for(const button of document.querySelectorAll('[data-visual-optic]'))button.setAttribute('aria-pressed',String(button.dataset.visualOptic===oneXSelection));
}
const scope=get('px_scope');if(scope)scope.addEventListener('change',syncScope);
for(const button of document.querySelectorAll('[data-visual-optic]')){
 button.addEventListener('click',()=>{
  if(!owns(oneXArt,button.dataset.visualOptic))return;
  oneXSelection=button.dataset.visualOptic;syncScope();
 });
}
syncScope();
// Details are closed by default. Do not request their optional images until
// the player opens the art section. No HTTP images/async timers are necessary.
function assignOptionalArt(img,src) {
 const details=img.closest('details.visual-opt-in-art');
 if(details && !details.open){
  img.dataset.visualSrc=src;
  img.removeAttribute('src');
 }else{
  img.removeAttribute('data-visual-src');
  img.src=src;
 }
}
function syncOptionalDetails(details) {
 for(const image of details.querySelectorAll('img')){
  if(details.open){
   const pending=image.dataset.visualSrc;
   if(pending){image.src=pending;image.removeAttribute('data-visual-src');}
  }else if(image.hasAttribute('src')){
   image.dataset.visualSrc=image.getAttribute('src');
   image.removeAttribute('src');
  }
 }
}
for(const details of document.querySelectorAll('details.visual-opt-in-art')){
 details.addEventListener('toggle',()=>syncOptionalDetails(details));
 syncOptionalDetails(details);
}
function selectedWeapon(prefix,name) {
 const image=get('visual-'+prefix+'-weapon-image'),title=get('visual-'+prefix+'-weapon-title'),note=get('visual-'+prefix+'-weapon-note');
 if(!image||!title||!note)return;
 const file=artFor(name);
 title.textContent=name || 'No weapon selected';
 if(file){
   image.hidden=false;image.alt='Original representative '+name+' weapon illustration';
   assignOptionalArt(image,'assets/'+file);
   note.textContent='Original conceptual art; not an official PUBG weapon screenshot.';
 }else{
   image.hidden=true;image.removeAttribute('src');image.removeAttribute('data-visual-src');image.alt='';
   note.textContent=name?'No artwork for this weapon yet; numbers remain available.':'Choose a weapon for reference artwork.';
 }
}
function guardImageError(img,prefix){
 if(!img)return;
 img.addEventListener('error',()=>{
  const note=get('visual-'+prefix+'-weapon-note');
  img.hidden=true;img.removeAttribute('src');
  if(note)note.textContent='Artwork unavailable; weapon statistics are unaffected.';
 });
}
for(const [panel,id] of [['range','rg_weapon'],['ttk','tk_weapon'],['recoil','rc_weapon'],['attach','at_weapon']]){
 const select=get(id);
 guardImageError(get('visual-'+panel+'-weapon-image'),panel);
 const render=()=>selectedWeapon(panel,select&&select.value);
 if(select)select.addEventListener('change',render);
 render();
}
function syncCompare(){
 for(const [key,input] of [['a','tk_cmpA'],['b','tk_cmpB'],['c','tk_cmpC']]){
   const select=get(input),image=get('visual-compare-'+key+'-image'),title=get('visual-compare-'+key+'-title'),note=get('visual-compare-'+key+'-note');
   if(!select||!image||!title||!note)continue;
   const name=select.value,file=artFor(name);
   title.textContent=name||'No third weapon';
   if(file){
     image.alt='Representative '+name+' weapon illustration';
     image.hidden=false;assignOptionalArt(image,'assets/'+file);
     note.textContent='Concept art · not official game imagery';
   }else{
     image.hidden=true;image.removeAttribute('src');image.removeAttribute('data-visual-src');image.alt='';
     note.textContent=name?'No artwork yet; stats still shown.':'Optional comparison not selected';
   }
 }
}
for(const id of ['tk_cmpA','tk_cmpB','tk_cmpC']){const el=get(id);if(el)el.addEventListener('change',syncCompare);}
for(const key of ['a','b','c']){
 const image=get('visual-compare-'+key+'-image');
 if(image)image.addEventListener('error',()=>{
   image.hidden=true;image.removeAttribute('src');
   const note=get('visual-compare-'+key+'-note');
   if(note)note.textContent='Artwork unavailable; stats are unaffected.';
 });
}
syncCompare();
// Visual category maps are intentionally separate from calculator compatibility/stats.
const attachmentVisuals=Object.freeze({
 muzzle:Object.freeze({
  compensator:'gear-compensator.svg',compensator_ar:'gear-compensator.svg',
  suppressor:'gear-suppressor.svg',flash:'gear-flash-hider.svg',
  brake:'gear-muzzle.svg',choke:'gear-muzzle.svg',duckbill:'gear-muzzle.svg'
 }),
 grip:Object.freeze({
  vertical:'gear-vertical-grip.svg',angled:'gear-angled-grip.svg',
  half:'gear-grip.svg',light:'gear-grip.svg',thumb:'gear-grip.svg',
  laser:'gear-grip.svg',tilted:'gear-grip.svg'
 }),
 mag:Object.freeze({
  extended:'gear-extended-magazine.svg',extquick:'gear-extended-magazine.svg',
  extended_ar:'gear-extended-magazine.svg',extquick_ar:'gear-extended-magazine.svg',
  quickdraw:'gear-magazine.svg'
 }),
 stock:Object.freeze({
  tactical:'gear-stock.svg',heavy:'gear-stock.svg',folding:'gear-stock.svg',
  cheek:'gear-stock.svg',loops:'gear-stock.svg'
 }),
 sight:Object.freeze({
  reddot:'optic-red-dot.svg',dot:'optic-red-dot.svg',holo:'optic-holographic.svg',
  hybrid:'optic-4x.svg',thermal4x:'optic-4x.svg',
  '2x':'optic-2x.svg','3x':'optic-3x.svg','4x':'optic-4x.svg',
  '6x':'optic-6x.svg','8x':'optic-8x.svg','15x':'optic-15x.svg'
 })
});
function syncAttachmentArt(){
 for(const id of ['muzzle','grip','mag','sight','stock']){
  const select=get('at_'+id),label=get('visual-at-'+id),image=get('visual-at-'+id+'-image');
  if(!select||!label||!image)continue;
  const option=select.selectedOptions&&select.selectedOptions[0];
  const value=select.disabled?'none':String(select.value||'none').toLowerCase();
  label.textContent=option?option.textContent.trim():'Not available';
  const file=owns(attachmentVisuals[id],value)?attachmentVisuals[id][value]:null;
  // Empty/disabled attachment slots do not show apparently equipped hardware.
  image.hidden=!file;
  if(file){
   image.src='assets/'+file;
   image.alt='Original illustrative '+label.textContent+' attachment category';
  }else{
   image.removeAttribute('src');image.alt='';
  }
 }
}
for(const id of ['weapon','muzzle','grip','mag','sight','stock']){
 const select=get('at_'+id);
 if(select)select.addEventListener('change',syncAttachmentArt);
}
for(const id of ['presetVert','presetHoriz','presetBal','presetClear']){
 const button=get('at_'+id);
 if(button)button.addEventListener('click',()=>queueMicrotask(syncAttachmentArt));
}
syncAttachmentArt();
const packImage=get('visual-pack-image');
if(packImage)packImage.addEventListener('error',()=>{
  // Missing art must never hide the calculator or trigger an image error loop.
  packImage.hidden=true;packImage.removeAttribute('src');packImage.alt='';
  const note=get('visual-pack-note');
  if(note)note.textContent='Equipment illustration unavailable; capacity calculations still work.';
});
function syncBackpackArt(){
 const type=get('bp_type'),level=get('bp_level'),vest=get('bp_vest');
 const label=get('visual-pack-label'),image=get('visual-pack-image');
 if(!type||!level||!label||!image)return;
 const jammer=type.value==='jammer';
 const file=jammer?'gear-jammer.svg':({1:'gear-backpack-l1.svg',2:'gear-backpack-l2.svg',3:'gear-backpack.svg'}[level.value]||'gear-backpack.svg');
 label.textContent=(jammer?'Jammer Pack':'Standard Backpack')+' · Level '+level.value;
 image.hidden=false;image.src='assets/'+file;
 image.alt='Original representative '+(jammer?'Jammer Pack':'Level '+level.value+' backpack')+' illustration';
 const note=get('visual-pack-note');
 if(note)note.textContent='Illustration only. The controls calculate actual capacity.';
 const vestLabel=get('visual-pack-vest-label');
 if(vestLabel&&vest)vestLabel.textContent=vest.value==='yes'?'Vest: worn':'Vest: none';
}
for(const id of ['bp_type','bp_level','bp_vest']){const el=get(id);if(el)el.addEventListener('change',syncBackpackArt);}
syncBackpackArt();

// Keep inventory data and calculator logic untouched. Existing +/- buttons
// receive meaningful accessible names, and the adjacent number input remains editable.
for(const row of document.querySelectorAll('#panel-backpack .bp-row')){
 const item=row.querySelector('.bp-name')?.textContent?.trim();
 const input=row.querySelector('.bp-stepper input[data-bp]');
 if(!item||!input)continue;
 input.setAttribute('aria-label','Quantity of '+item);
 for(const button of row.querySelectorAll('.bp-stepper button[data-step]')){
  const operation=Number(button.dataset.step)>0?'Add one':'Remove one';
  button.setAttribute('aria-label',operation+' '+item);
  button.setAttribute('title',operation+' '+item);
 }
}

// Local illustration failure policy: keep the explanatory text readable when an SVG fails.
// Image errors do not bubble, so use capture; all hooks are presentation-only.
const illustrationParents='.visual-inline-preview,.visual-reference-banner,.visual-gear-tile,.visual-pack-items,.visual-armour-key';
function clearArtError(img){
 const sibling=img.nextElementSibling;
 if(sibling&&sibling.classList.contains('visual-image-unavailable'))sibling.remove();
}
document.addEventListener('error',event=>{
 const image=event.target;
 if(!(image instanceof HTMLImageElement)||!image.closest(illustrationParents))return;
 if(!image.getAttribute('src')?.startsWith('assets/'))return;
 image.hidden=true;
 clearArtError(image);
 const message=document.createElement('small');
 message.className='visual-image-unavailable';
 message.setAttribute('role','status');
 message.textContent='Illustration unavailable; calculations and labels are unaffected.';
 image.insertAdjacentElement('afterend',message);
},true);
document.addEventListener('load',event=>{
 const image=event.target;
 if(!(image instanceof HTMLImageElement)||!image.closest(illustrationParents))return;
 clearArtError(image);
 if(image.hasAttribute('src'))image.hidden=false;
},true);
})();
