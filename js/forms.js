import { Store } from "./store.js";

const reCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;             // 000.000.000-00
const rePhone = /^\(\d{2}\)\s?\d\s?\d{4}-\d{4}$/;        // (00) 0 0000-0000
const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setHelp(id, msg) {
  const el = document.querySelector(`[data-help-for="${id}"]`);
  if (!el) return;
  el.textContent = msg || "";
}

function fieldError(input, msg) {
  input.classList.add("is-invalid");
  input.setAttribute("aria-invalid", "true");
  setHelp(input.id, msg);
}
function fieldOk(input) {
  input.classList.remove("is-invalid");
  input.removeAttribute("aria-invalid");
  setHelp(input.id, "");
}

function serialize(form) {
  const data = {};
  new FormData(form).forEach((v, k) => {
    if (data[k]) {
      if (!Array.isArray(data[k])) data[k] = [data[k]];
      data[k].push(v);
    } else data[k] = v;
  });
  // checkboxes de "interesse"
  const interesses = [...form.querySelectorAll('input[name="interesse"]:checked')].map(i=>i.value);
  data.interesse = interesses;
  return data;
}

export function initFormEnhancements(root = document) {
  const form = root.querySelector("#cadastroForm");
  if (!form) return;

  // Restaurar rascunho
  const draft = Store.load();
  Object.entries(draft).forEach(([k, v]) => {
    const el = form.elements[k];
    if (!el) return;
    if (Array.isArray(v)) {
      v.forEach(val => {
        const cb = form.querySelector(`input[name="${k}"][value="${val}"]`);
        if (cb) cb.checked = true;
      });
    } else {
      el.value = v;
    }
  });

  // Auto-save rascunho
  form.addEventListener("input", () => {
    Store.save(serialize(form));
  });

  // Máscaras simples on-the-fly (apenas visual)
  const cpf = form.querySelector("#cpf");
  const tel = form.querySelector("#telefone");
  cpf?.addEventListener("input", e => {
    let v = e.target.value.replace(/\D/g, "").slice(0,11);
    v = v.replace(/^(\d{3})(\d)/, "$1.$2").replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1-$2");
    e.target.value = v;
  });
  tel?.addEventListener("input", e => {
    let v = e.target.value.replace(/\D/g, "").slice(0,11);
    v = v.replace(/^(\d{2})(\d)/, "($1) $2").replace(/^\((\d{2})\)\s(\d)(\d{4})(\d{4}).*/, "($1) $2 $3-$4");
    e.target.value = v;
  });

  // Validação custom + HTML5
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    let ok = true;

    const nome = form.nome;
    if (!nome.value || nome.value.trim().length < 5) {
      ok = false; fieldError(nome, "Informe seu nome completo (mín. 5 caracteres).");
    } else { fieldOk(nome); }

    const email = form.email;
    if (!reEmail.test(email.value)) {
      ok = false; fieldError(email, "E-mail inválido.");
    } else { fieldOk(email); }

    if (!reCPF.test(cpf.value)) {
      ok = false; fieldError(cpf, "CPF no formato 000.000.000-00.");
    } else { fieldOk(cpf); }

    if (!rePhone.test(tel.value)) {
      ok = false; fieldError(tel, "Telefone no formato (00) 0 0000-0000.");
    } else { fieldOk(tel); }

    const interesses = [...form.querySelectorAll('input[name="interesse"]:checked')];
    if (interesses.length === 0) {
      ok = false; setHelp("interesse", "Selecione ao menos 1 opção de interesse.");
    } else { setHelp("interesse", ""); }

    if (!ok) {
      // feedback ao usuário
      try { toast("Verifique os campos destacados."); } catch { alert("Verifique os campos destacados."); }
      return;
    }

    // sucesso: limpar rascunho e dar feedback
    Store.clear();
    form.reset();
    try { toast("Cadastro enviado com sucesso!"); } catch { alert("Cadastro enviado com sucesso!"); }
  });

  // Botão limpar
  root.querySelector("#limpar")?.addEventListener("click", () => {
    Store.clear();
    form.reset();
  });
}
