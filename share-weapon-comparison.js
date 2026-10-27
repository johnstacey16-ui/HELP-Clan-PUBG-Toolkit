// Share a TTK weapon comparison as a URL. No server or user account needed.
// The existing Combat Lab is the only source of damage, recoil, armour and TTK maths.
(function () {
  'use strict';
  const get = id => document.getElementById(id);
  const action = get('wc_copy');
  const output = get('wc_link');
  const status = get('wc_status');
  if (!action || !output || !status) return;

  const names = ['weapon','distance','zone','helmet','vest','a','b','c'];
  const keys = Object.fromEntries(names.map(name => [name, 'wc_' + name]));
  const parts = new Set(['head','neck','clavicle','chest','upperStomach',
    'lowerStomach','pelvis','upperArm','forearm','hand','thigh','calf','foot','limb']);
  const options = id => [...get(id).options].filter(opt => !opt.disabled).map(opt => opt.value);
  const allowed = (id, value) => options(id).includes(value);
  const fireChange = element => element.dispatchEvent(new Event('change', { bubbles:true }));
  function choose(id, value) {
    const element = get(id);
    if (!element || !allowed(id, value)) return false;
    if (element.value !== value) {
      element.value = value;
      fireChange(element);
    }
    return true;
  }

  function selected() {
    return {
      weapon:get('tk_weapon').value,
      distance:get('tk_distance').value,
      zone:get('tk_hitbox').value,
      helmet:get('hz_helmet').value,
      vest:get('hz_vest').value,
      a:get('tk_cmpA').value,
      b:get('tk_cmpB').value,
      c:get('tk_cmpC').value
    };
  }
  function linkFor(data) {
    const url = new URL(window.location.href);
    // Repeated copy actions replace the old snapshot, never stack query params.
    url.searchParams.set('wc_v','1');
    for (const name of names) url.searchParams.set(keys[name], data[name]);
    url.hash = 'panel-ttk'; // Existing navigation opens and scrolls to the TTK section.
    return url.href;
  }
  function readLink(search) {
    const query = new URLSearchParams(search);
    if (!query.has('wc_v')) return null;
    if (query.get('wc_v') !== '1') return {error:'This comparison link uses an unsupported version.'};
    // Reject duplicate or missing fields, including empty mandatory selectors.
    const data = {};
    for (const name of names) {
      const values = query.getAll(keys[name]);
      if (values.length !== 1 || (name !== 'c' && !values[0])) {
        return {error:'This comparison link is missing required settings.'};
      }
      data[name] = values[0];
    }
    if (!allowed('hz_weapon',data.weapon) ||
        !allowed('tk_cmpA',data.a) || !allowed('tk_cmpB',data.b) ||
        !allowed('tk_cmpC',data.c) ||
        !parts.has(data.zone) ||
        !/^(0|[1-9][0-9]{0,3})$/.test(data.distance) ||
        !['0','1','2','3'].includes(data.helmet) ||
        !['0','1','2','3'].includes(data.vest)) {
      return {error:'This comparison link contains a weapon or setting that is not supported.'};
    }
    return {data};
  }
  function restore(data) {
    // The 13-zone source selector has separate helmet/vest options; using it
    // keeps the linked Range and TTK calculators consistent with the original.
    choose('hz_weapon', data.weapon);
    if (!allowed('hz_distance',data.distance)) {
      status.textContent='This weapon has no recorded data at '+data.distance+
        ' m. The comparison was not fully restored; choose an available checkpoint.';
      return false;
    }
    choose('hz_distance',data.distance);
    choose('hz_helmet',data.helmet);
    choose('hz_vest',data.vest);
    const zone=document.querySelector('#hz_body [data-hit-zone="'+data.zone+'"]');
    if (!zone) {
      status.textContent='This hit zone is not available. Choose another body region.';
      return false;
    }
    // Updates the selected SVG zone AND the shared weapon / armour context.
    zone.dispatchEvent(new MouseEvent('click',{bubbles:true}));
    choose('tk_cmpA',data.a);
    choose('tk_cmpB',data.b);
    choose('tk_cmpC',data.c);
    status.textContent='Shared comparison loaded. Values are recalculated from this toolkit’s current data.';
    return true;
  }
  const incoming=readLink(window.location.search);
  if (incoming) {
    if (incoming.error) status.textContent=incoming.error;
    else restore(incoming.data);
  }

  function showCopyFallback() {
    output.focus();
    output.select();
    status.textContent='Link ready. Copy the selected text to share it.';
  }
  action.addEventListener('click',()=>{
    const data=selected();
    if (!allowed('tk_weapon',data.weapon) || !allowed('tk_distance',data.distance) ||
        !allowed('tk_cmpA',data.a) || !allowed('tk_cmpB',data.b) ||
        !allowed('tk_cmpC',data.c) || !parts.has(data.zone)) {
      status.textContent='Choose valid weapons and a recorded distance before sharing.';
      return;
    }
    const link=linkFor(data);
    output.value=link;
    output.hidden=false;
    // An always-visible text fallback works on Xbox Edge and older mobile browsers.
    if (!navigator.clipboard || typeof navigator.clipboard.writeText!=='function') {
      showCopyFallback();
      return;
    }
    navigator.clipboard.writeText(link).then(()=>{
      status.textContent='Comparison link copied. Opening it restores these settings.';
    }).catch(showCopyFallback);
  });
})();
