// Visual artwork only; never alters sensitivity or combat formula source.
(function(){
'use strict';
const get=id=>document.getElementById(id);
const safe=Object.freeze({'1x':'optic-1x.svg','2x':'optic-2x.svg','3x':'optic-3x.svg','4x':'optic-4x.svg','6x':'optic-6x.svg','8x':'optic-8x.svg','15x':'optic-15x.svg'});
function scopeArt(){const sel=get('px_scope'),img=get('visual-scope-image'),label=get('visual-scope-label');if(!sel||!img||!label)return;const m=Object.prototype.hasOwnProperty.call(safe,sel.value)?sel.value:'3x';img.src='assets/'+safe[m];img.alt='Representative '+m+' scope';label.textContent=m+' reference optic';}
const scope=get('px_scope');if(scope)scope.addEventListener('change',scopeArt);scopeArt();
function attachmentLabels(){for(const id of ['muzzle','grip','mag','sight']){const sel=get('at_'+id),label=get('visual-at-'+id);if(sel&&label){const option=sel.selectedOptions&&sel.selectedOptions[0];label.textContent=option?option.textContent.trim():'Not available';}}}
for(const id of ['weapon','muzzle','grip','mag','sight']){const sel=get('at_'+id);if(sel)sel.addEventListener('change',attachmentLabels);}
for(const id of ['presetVert','presetHoriz','presetBal','presetClear']){const el=get('at_'+id);if(el)el.addEventListener('click',()=>queueMicrotask(attachmentLabels));}
attachmentLabels();
function backpackLabel(){const type=get('bp_type'),level=get('bp_level'),out=get('visual-pack-label');if(type&&level&&out)out.textContent=(type.value==='jammer'?'Jammer Pack':'Standard Backpack')+' · Level '+level.value;}
for(const id of ['bp_type','bp_level']){const el=get(id);if(el)el.addEventListener('change',backpackLabel);}
backpackLabel();
})();
