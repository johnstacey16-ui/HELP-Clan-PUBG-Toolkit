
// HELP Clan workspace navigation. Calculator scripts and existing content remain unchanged.
(function(){
  'use strict';
  const panelIds = ["panel-sensitivity","panel-combat","panel-range","panel-ttk","panel-recoil2","panel-attach","panel-backpack"];
  const navButtons = Array.from(document.querySelectorAll('#app-toolnav [data-open-panel]'));
  const toggle = document.getElementById('mobile-nav-toggle');
  const scrim = document.getElementById('sidebar-scrim');
  const title = document.getElementById('active-tool-heading');
  const index = document.getElementById('active-tool-index');
  const root = document.body;
  let currentPanel = 'panel-sensitivity';

  function closeMenu(){
    root.classList.remove('sidebar-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open toolkit navigation');
  }
  function openMenu(){
    root.classList.add('sidebar-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close toolkit navigation');
  }
  function selectPanel(id, options = {}){
    if(!panelIds.includes(id)) return false;
    const changed = id !== currentPanel;
    currentPanel = id;
    document.querySelectorAll('.hub-main').forEach(panel=>{
      const active = panel.id === id;
      panel.classList.toggle('active', active);
      panel.setAttribute('aria-hidden', String(!active));
    });
    navButtons.forEach(button=>{
      const active = button.dataset.openPanel === id;
      button.classList.toggle('active', active);
      if(active) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    const button = navButtons.find(item=>item.dataset.openPanel===id);
    title.textContent = button ? button.querySelector('.nav-tool-name').textContent.trim() : '';
    const currentIndex = panelIds.indexOf(id)+1;
    index.innerHTML = String(currentIndex).padStart(2,'0')+' <i>/</i> '+String(panelIds.length).padStart(2,'0');
    index.setAttribute('aria-label','Tool '+currentIndex+' of '+panelIds.length);
    if(options.updateHistory && location.hash !== '#'+id) history.pushState({panel:id},'', '#'+id);
    if(options.scroll && changed) window.scrollTo({top:0,behavior:'auto'});
    const wasOpen = root.classList.contains('sidebar-open');
    closeMenu();
    if(wasOpen && options.focus) title.focus({preventScroll:true});
    return true;
  }
  navButtons.forEach(button=>{
    button.addEventListener('click',()=>selectPanel(button.dataset.openPanel,{updateHistory:true,scroll:true,focus:true}));
  });
  toggle.addEventListener('click',()=>root.classList.contains('sidebar-open') ? closeMenu() : openMenu());
  scrim.addEventListener('click',closeMenu);
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape' && root.classList.contains('sidebar-open')) {
      closeMenu();
      toggle.focus();
    }
  });
  window.addEventListener('resize',()=>{ if(window.innerWidth>900) closeMenu(); },{passive:true});
  window.addEventListener('popstate',()=>{
    const id = decodeURIComponent(location.hash.slice(1));
    selectPanel(panelIds.includes(id) ? id : panelIds[0],{scroll:true});
  });
  window.addEventListener('hashchange',()=>{
    const id = decodeURIComponent(location.hash.slice(1));
    const target = panelIds.includes(id) ? id : panelIds[0];
    if(target!==currentPanel) selectPanel(target,{scroll:true});
  });
  const initialHash = decodeURIComponent(location.hash.slice(1));
  selectPanel(panelIds.includes(initialHash) ? initialHash : panelIds[0]);
})();
