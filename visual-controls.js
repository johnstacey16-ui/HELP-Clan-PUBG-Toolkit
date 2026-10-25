// Presentation-only controls. Never set any calculator option or source data.
(function(){
'use strict';
const get=id=>document.getElementById(id);
const owns=(map,key)=>Object.prototype.hasOwnProperty.call(map,key);
const optics=Object.freeze({'1x':'optic-1x.svg','2x':'optic-2x.svg','3x':'optic-3x.svg','4x':'optic-4x.svg','6x':'optic-6x.svg','8x':'optic-8x.svg','15x':'optic-15x.svg'});
const catalogue=window.HELP_VISUAL_WEAPONS||{};
function artFor(name){return owns(catalogue,name)?catalogue[name]:null;}
function syncScope(){
 const s=get('px_scope'),img=get('visual-scope-image'),label=get('visual-scope-label');
 if(!s||!img||!label)return;
 const m=owns(optics,s.value)?s.value:'3x';
 img.src='assets/'+optics[m];img.alt='Representative '+m+' scope';label.textContent=m+' reference optic';
}
const scope=get('px_scope');if(scope)scope.addEventListener('change',syncScope);syncScope();
function selectedWeapon(prefix,name) {
 const image=get('visual-'+prefix+'-weapon-image'),title=get('visual-'+prefix+'-weapon-title'),note=get('visual-'+prefix+'-weapon-note');
 if(!image||!title||!note)return;
 const file=artFor(name);
 title.textContent=name || 'No weapon selected';
 if(file){
   image.hidden=false;image.alt='Original representative '+name+' weapon illustration';
   image.src='assets/'+file;
   note.textContent='Original conceptual art; not an official PUBG weapon screenshot.';
 }else{
   image.hidden=true;image.removeAttribute('src');image.alt='';
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
     image.hidden=false;image.src='assets/'+file;
     note.textContent='Concept art · not official game imagery';
   }else{
     image.hidden=true;image.removeAttribute('src');image.alt='';
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
function syncAttachmentArt(){
 for(const id of ['muzzle','grip','mag','sight']){
  const select=get('at_'+id),label=get('visual-at-'+id);
  if(select&&label){const option=select.selectedOptions&&select.selectedOptions[0];label.textContent=option?option.textContent.trim():'Not available';}
 }
 const optic=get('at_sight'),img=get('visual-at-sight-image');
 if(optic&&img){
  const value=(optic.value||'').toLowerCase();
  // Purely illustrative magnification categories, never a compatibility rule.
  const found=value.match(/(?:^|[^0-9])(15|8|6|4|3|2|1)x(?:$|[^0-9])/);
  const zoom=found?found[1]+'x':'1x';
  img.src='assets/'+optics[zoom];img.alt='Representative '+zoom+' optic illustration';
 }
}
for(const id of ['weapon','muzzle','grip','mag','sight']){const select=get('at_'+id);if(select)select.addEventListener('change',syncAttachmentArt);}
for(const id of ['presetVert','presetHoriz','presetBal','presetClear']){const button=get('at_'+id);if(button)button.addEventListener('click',()=>queueMicrotask(syncAttachmentArt));}
syncAttachmentArt();
function syncBackpackArt(){
 const type=get('bp_type'),level=get('bp_level'),label=get('visual-pack-label'),image=get('visual-pack-image');
 if(!type||!level||!label||!image)return;
 const jammer=type.value==='jammer';
 label.textContent=(jammer?'Jammer Pack':'Standard Backpack')+' · Level '+level.value;
 image.src='assets/'+(jammer?'gear-jammer.svg':'gear-backpack.svg');
 image.alt='Original representative '+(jammer?'Jammer Pack':'backpack')+' illustration';
}
for(const id of ['bp_type','bp_level']){const el=get(id);if(el)el.addEventListener('change',syncBackpackArt);}
syncBackpackArt();
})();
