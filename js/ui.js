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
