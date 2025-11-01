// Botão hambúrguer: abre/fecha o menu em telas pequenas
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');
if (nav && toggle){
  toggle.addEventListener('click', ()=> nav.classList.toggle('is-open'));
}
// Acessibilidade: sincroniza aria-expanded do item "Projetos"
document.querySelectorAll('.nav-item--dropdown').forEach((item)=>{
  const btn = item.querySelector('.nav-link--button');
  function set(v){ btn && btn.setAttribute('aria-expanded', String(v)); }
  item.addEventListener('mouseenter', ()=>set(true));
  item.addEventListener('mouseleave', ()=>set(false));
  item.addEventListener('focusin',  ()=>set(true));
  item.addEventListener('focusout', ()=>set(false));
});

// Utilidades opcionais (modal / toast) – pode manter
export function openModal(id){
  const el = document.getElementById(id);
  if (el) el.classList.add('is-open');
}
export function closeModal(id){
  const el = document.getElementById(id);
  if (el) el.classList.remove('is-open');
}
export function toast(msg, ms=3000){
  let stack = document.querySelector('.toast-stack');
  if(!stack){
    stack = document.createElement('div');
    stack.className = 'toast-stack';
    document.body.appendChild(stack);
  }
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  stack.appendChild(el);
  setTimeout(()=>{ el.remove(); if(!stack.children.length) stack.remove(); }, ms);
}
// ===== Alternância de tema (salvo no localStorage)
(function(){
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);

  function makeBtn(label, attrValue){
    const b = document.createElement("button");
    b.className = "btn btn--ghost ml-8";
    b.type = "button";
    b.textContent = label;
    b.addEventListener("click", ()=>{
      const v = root.getAttribute("data-theme");
      if (v === attrValue) { root.removeAttribute("data-theme"); localStorage.removeItem("theme"); }
      else { root.setAttribute("data-theme", attrValue); localStorage.setItem("theme", attrValue); }
    });
    return b;
  }

  window.addEventListener("DOMContentLoaded", ()=>{
    const headerBox = document.querySelector(".site-header .header-inner");
    if (!headerBox) return;
    headerBox.appendChild(makeBtn("Modo escuro", "dark"));
    headerBox.appendChild(makeBtn("Alto contraste", "high-contrast"));
  });
})();
// ===== Acessibilidade do dropdown "Projetos"
(function(){
  const root = document;
  function setExpanded(button, val){ button.setAttribute("aria-expanded", String(val)); }
  function closeAll(){ root.querySelectorAll(".nav-item--dropdown .dropdown").forEach(ul=>ul.classList.remove("is-open"));
                      root.querySelectorAll(".nav-item--dropdown .nav-link--button").forEach(b=>setExpanded(b,false)); }

  root.addEventListener("click", (e)=>{
    const btn = e.target.closest(".nav-item--dropdown .nav-link--button");
    if (!btn) return;
    const menu = btn.parentElement.querySelector(".dropdown");
    const open = !menu.classList.contains("is-open");
    closeAll();
    menu.classList.toggle("is-open", open);
    setExpanded(btn, open);
    if (open) menu.querySelector("a,button")?.focus();
  });

  root.addEventListener("keydown", (e)=>{
    const openMenu = root.querySelector(".nav-item--dropdown .dropdown.is-open");
    if (!openMenu) return;
    const items = [...openMenu.querySelectorAll("a,button")];
    if (!items.length) return;

    const idx = items.indexOf(document.activeElement);
    if (e.key === "Escape"){ closeAll(); root.querySelector(".nav-link--button")?.focus(); }
    if (e.key === "ArrowDown"){ e.preventDefault(); items[(idx+1) % items.length].focus(); }
    if (e.key === "ArrowUp"){ e.preventDefault(); items[(idx-1+items.length) % items.length].focus(); }
  });
})();
