
// ---- Sensitivity Calculator logic ----
(function(){
 
const TABS = [
  {id:'scope', label:'Scope Sensitivity Matcher'},
  {id:'vert', label:'Vertical Multiplier'},
  {id:'res', label:'Resolution'},
];
const tabsEl = document.getElementById('tabs');
TABS.forEach((t,i)=>{
  const b = document.createElement('div');
  b.className = 'tab'+(i===0?' active':'');
  b.textContent = t.label;
  b.onclick = ()=>switchTab(t.id);
  b.dataset.tab = t.id;
  tabsEl.appendChild(b);
});
function switchTab(id){
  document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active', b.dataset.tab===id));
  document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('active', p.dataset.panel===id));
}
switchTab('scope');
 
const $ = id => document.getElementById(id);
const fmt = (n, d=3) => isFinite(n) ? (Math.round(n*Math.pow(10,d))/Math.pow(10,d)).toString() : '–';
 
/* ---------- 01 Vertical Multiplier ---------- */
function calcVert(){
  const cur = parseFloat($('v_cur_ads').value);
  const vm = parseFloat($('v_cur_vm').value);
  const tgt = parseFloat($('v_tgt_ads').value);
  if(!isFinite(cur)||!isFinite(vm)||!isFinite(tgt)) return;
  const diff = tgt - cur;
  const ratio = Math.pow(10, diff/50);
  const tvm = vm / ratio;
  $('v_diff').textContent = (diff>=0?'+':'')+diff;
  $('v_ratio').textContent = fmt(ratio,4)+'×';
  $('v_tvm').textContent = fmt(tvm,4);
  $('v_round').textContent = fmt(Math.round(tvm),0);
  $('v_floor').textContent = fmt(Math.floor(tvm),0);
  let advice = '';
  if(diff>0) advice = `Raising ADS sensitivity by ${diff} speeds up horizontal rotation, so vertical multiplier is scaled down to roughly hold your original recoil-control feel. Test AR and vehicle sprays after applying.`;
  else if(diff<0) advice = `Lowering ADS sensitivity by ${Math.abs(diff)} slows horizontal rotation, so vertical multiplier is scaled up to roughly hold your original recoil-control feel. Test AR sprays after applying.`;
  else advice = `No change in ADS sensitivity — vertical multiplier stays the same.`;
  if(cur<0||cur>20||tgt<0||tgt>20){
    advice += ` <b style="color:var(--rust);">Warning: ADS sensitivity in PUBG only goes from 0 to 20 — one of your values is outside that range.</b>`;
  }
  if(vm<50||vm>150){
    advice += ` <b style="color:var(--rust);">Warning: vertical multiplier in PUBG only goes from 50 to 150 — check your input.</b>`;
  }
  $('v_advice').innerHTML = advice;
}
['v_cur_ads','v_cur_vm','v_tgt_ads'].forEach(id=>$(id).addEventListener('input', calcVert));
 
/* ---------- 05 pixel-speed scope matcher ---------- */
const SCOPE_CONST = {
  '1x':  {A:64, B:2,   range:[0.1,19.1]},
  '2x':  {A:54, B:0.6, range:[0.9,15.1]},
  '3x':  {A:70, B:0.6, range:[1.4,19.8]},
  '4x':  {A:50, B:0.6, range:[0.8,14]},
  '6x':  {A:35, B:0.6, range:[0.4,9.6]},
  '8x':  {A:35, B:0.6, range:[0.4,9.6]},
  '15x': {A:53, B:0.2, range:[1.3,14.7]},
};
function pixelSpeed(C, A, B){
  return (3840*(C+B)) / ((A/60)*(10+B));
}
function matchedSens(speed, A, B){
  return ((A/60)*(10+B)*speed)/3840 - B;
}
function calcScope(){
  const refKey = $('px_scope').value;
  const C = parseFloat($('px_sens').value);
  const ref = SCOPE_CONST[refKey];
  if(!isFinite(C)||!ref) return;
  const speed = pixelSpeed(C, ref.A, ref.B);
  $('px_speed').textContent = fmt(speed,0);
 
  const tbody = document.querySelector('#px_table tbody');
  tbody.innerHTML = '';
  Object.keys(SCOPE_CONST).forEach(key=>{
    const sc = SCOPE_CONST[key];
    const sens = matchedSens(speed, sc.A, sc.B);
    const inRange = sens >= sc.range[0] && sens <= sc.range[1];
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${key}${key===refKey?' <span class="badge">ref</span>':''}</td>
      <td>${sc.A}</td><td>${sc.B}</td>
      <td style="color:${key===refKey?'#e8a33d':'#e9e7dc'};font-weight:${key===refKey?'700':'400'};">${fmt(sens,2)}</td>
      <td style="color:${inRange?'#8fae5c':'#c8593d'};">${inRange?'Yes':'Out of range'}</td>`;
    tbody.appendChild(tr);
  });
}
['px_scope','px_sens'].forEach(id=>$(id).addEventListener('input', calcScope));
$('px_scope').addEventListener('change', calcScope);
 
/* ---------- 03 resolution converter ---------- */
const CONV = {
  '169to1610': {sensDelta:0, vmOp:'mul', vmFactor:1.11},
  '1610to169': {sensDelta:0, vmOp:'div', vmFactor:1.11},
  '169to219':  {sensDelta:0, vmOp:'mul', vmFactor:0.85},
  '219to169':  {sensDelta:0, vmOp:'div', vmFactor:0.85},
  '169to43':   {sensDelta:3, vmOp:'mul', vmFactor:1.166},
  '43to169':   {sensDelta:-3, vmOp:'div', vmFactor:1.166},
};
function calcRes(){
  const sens = parseFloat($('r_sens').value);
  const vm = parseFloat($('r_vm').value);
  const c = CONV[$('r_conv').value];
  if(!isFinite(sens)||!isFinite(vm)||!c) return;
  const newSens = sens + c.sensDelta;
  const newVm = c.vmOp==='mul' ? vm*c.vmFactor : vm/c.vmFactor;
  $('r_sensout').textContent = (c.sensDelta===0? 'No change' : (newSens+ ' (' + (c.sensDelta>0?'+':'') + c.sensDelta + ')'));
  $('r_vmout').textContent = fmt(newVm,4);
}
['r_sens','r_vm','r_conv'].forEach(id=>$(id).addEventListener('input', calcRes));
$('r_conv').addEventListener('change', calcRes);
 
/* init all */
calcVert(); calcScope(); calcRes();
 
})();
