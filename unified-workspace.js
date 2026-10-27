// One visible presentation for the existing calculator engines.
(function(){
'use strict';
const get=id=>document.getElementById(id);
// Put every armour explanation and tool under one meaningful destination.
const armour=document.createElement('section');armour.id='armor-guide';armour.className='armour-guide';armour.setAttribute('aria-labelledby','armor-guide-title');
const heading=document.createElement('h2');heading.id='armor-guide-title';heading.textContent='Armour & durability guide';armour.append(heading);
get('armor-quick-check').before(armour);
for(const id of ['combat-armour-disclosure','armor-quick-check','combat-armor-crossover-section','how-thresholds-work','realityCard'])armour.append(get(id));
// These are ordinary visible sections, with no picture-hiding controls.
function reveal(details){
 const section=document.createElement('section');
 for(const attr of details.attributes)if(attr.name!=='open')section.setAttribute(attr.name,attr.value);
 for(const child of [...details.childNodes]){
  if(child.nodeName==='SUMMARY'){const h=document.createElement('h2');h.className='section-h';h.textContent=child.textContent;section.append(h);}
  else section.append(child);
 }
 details.replaceWith(section);return section;
}
reveal(get('armor-quick-check').querySelector('details'));
const crossover=reveal(get('combat-armor-crossovers'));
crossover.querySelector('h2').textContent='Helmet & vest crossover table';
// A single model sits above its equivalent table and both analytical sections.
const lab=get('panel-hit-zone'),workspace=lab.querySelector('.hz-workspace');
workspace.after(lab.querySelector('.hz-results'),lab.querySelector('.hz-detail-card'));
const context=get('combat-selected-context');
function describeSelection(){
 const zone=lab.querySelector('[data-hit-zone][aria-pressed=true]');
 const label=zone?.getAttribute('aria-label')?.split(':')[0]||'Chest';
 context.textContent=get('hz_weapon').value+' · '+get('hz_distance').value+' m · '+label+' · Helmet '+get('hz_helmet').value+' / Vest '+get('hz_vest').value+' · Range and TTK below use this selection.';
}
for(const id of ['hz_weapon','hz_distance','hz_helmet','hz_vest','hz_mode'])get(id).addEventListener('change',describeSelection);
for(const zone of lab.querySelectorAll('[data-hit-zone]')){
 zone.addEventListener('click',describeSelection);
 zone.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' ')describeSelection();});
}
describeSelection();
})();
