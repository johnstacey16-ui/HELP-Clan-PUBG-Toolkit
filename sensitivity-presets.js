// Optional, device-local saved settings for Sensitivity Studio.
// This file deliberately does not modify any of the calculator formulas.
(function(){
  'use strict';
  const panel=document.getElementById('panel-sensitivity');
  const anchor=panel && panel.querySelector('.sensitivity-top-tools');
  if(!anchor)return;

  const STORAGE_KEY='help-clan:sensitivity-settings:v1';
  const fields=['px_scope','px_sens','v_cur_ads','v_cur_vm','v_tgt_ads',
    'r_conv','r_sens','r_vm',
    ...['aim','1x','2x','3x','4x','6x','8x','15x'].map(scope=>'current_sens_'+scope)];
  const section=document.createElement('section');
  section.id='sensitivity-presets';
  section.className='card sensitivity-presets';
  section.setAttribute('aria-label','Saved sensitivity settings');
  const heading=document.createElement('h2');
  heading.className='card-title';
  heading.textContent='Your saved sensitivity settings';
  const note=document.createElement('p');
  note.className='sensitivity-preset-note';
  note.textContent='Save these settings on this device. Nothing is uploaded or shared; clear them any time.';
  const actions=document.createElement('div');
  actions.className='sensitivity-preset-actions';
  const status=document.createElement('p');
  status.id='sensitivity-preset-status';
  status.className='sensitivity-preset-status';
  status.setAttribute('role','status');
  status.setAttribute('aria-live','polite');
  function button(label,fn){
    const el=document.createElement('button');
    el.type='button';
    el.textContent=label;
    el.addEventListener('click',fn);
    actions.append(el);
  }
  function capture(){
    const saved={};
    for(const id of fields){
      const el=document.getElementById(id);
      if(el)saved[id]=String(el.value);
    }
    return saved;
  }
  function validField(el,value){
    if(typeof value!=='string' || value.length>64)return false;
    if(el.tagName==='SELECT')return Array.from(el.options).some(option=>option.value===value);
    return value==='' || Number.isFinite(Number(value));
  }
  button('Save settings',()=>{
    try{
      window.localStorage.setItem(STORAGE_KEY,JSON.stringify({version:1,fields:capture()}));
      status.textContent='Settings saved in this browser.';
    }catch(_err){
      status.textContent='This browser does not allow local saving. Your current calculations still work.';
    }
  });
  button('Load saved',()=>{
    let data;
    try{
      const raw=window.localStorage.getItem(STORAGE_KEY);
      data=raw ? JSON.parse(raw) : null;
    }catch(_err){
      status.textContent='Saved settings cannot be read in this browser.';
      return;
    }
    if(!data || data.version!==1 || !data.fields || typeof data.fields!=='object'){
      status.textContent='No saved settings found on this device.';
      return;
    }
    let loaded=0;
    for(const id of fields){
      const el=document.getElementById(id),value=data.fields[id];
      if(!el || !validField(el,value))continue;
      el.value=value;
      el.dispatchEvent(new Event('input',{bubbles:true}));
      if(el.tagName==='SELECT')el.dispatchEvent(new Event('change',{bubbles:true}));
      loaded++;
    }
    status.textContent=loaded ? 'Saved settings loaded and results recalculated.' : 'No compatible settings found.';
  });
  button('Clear saved',()=>{
    try{
      window.localStorage.removeItem(STORAGE_KEY);
      status.textContent='Saved settings cleared from this browser. Current values remain unchanged.';
    }catch(_err){
      status.textContent='Unable to clear saved settings in this browser.';
    }
  });
  section.append(heading,note,actions,status);
  anchor.insertAdjacentElement('afterend',section);
})();
