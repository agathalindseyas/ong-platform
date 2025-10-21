// main.js
document.addEventListener('DOMContentLoaded', function () {
  // Atualiza ano no footer
  const y = new Date().getFullYear();
  const yEls = document.querySelectorAll('#year, #year2');
  yEls.forEach(e => e.textContent = y);

  // Máscaras simples (CPF, telefone, CEP)
  const cpfEl = document.getElementById('cpf');
  const telEl = document.getElementById('telefone');
  const cepEl = document.getElementById('cep');

  function setCursorToEnd(el) { setTimeout(()=> el.selectionStart = el.selectionEnd = el.value.length, 0); }

  if (cpfEl) {
    cpfEl.addEventListener('input', function(e){
      let v = e.target.value.replace(/\D/g,'').slice(0,11);
      v = v.replace(/(\d{3})(\d)/,'$1.$2');
      v = v.replace(/(\d{3})\.(\d{3})(\d)/,'$1.$2.$3');
      v = v.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/,'$1.$2.$3-$4');
      e.target.value = v;
    });
  }

  if (telEl) {
    telEl.addEventListener('input', function(e){
      let v = e.target.value.replace(/\D/g,'').slice(0,11);
      if (v.length <= 10) {
        v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3');
      } else {
        v = v.replace(/^(\d{2})(\d{1})(\d{4})(\d{0,4})/,'($1) $2 $3-$4');
      }
      e.target.value = v.trim();
    });
  }

  if (cepEl) {
    cepEl.addEventListener('input', function(e){
      let v = e.target.value.replace(/\D/g,'').slice(0,8);
      v = v.replace(/^(\d{5})(\d{0,3})/,'$1-$2');
      e.target.value = v;
    });
  }

  // Simple client-side form validation UX enhancement
  const form = document.getElementById('cadastroForm');
  if (form) {
    form.addEventListener('submit', function(e){
      if (!form.checkValidity()) {
        e.preventDefault();
        // find first invalid and focus
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        // let native browser show tooltips
      } else {
        // Aqui normalmente você faria fetch() para enviar os dados.
        e.preventDefault();
        alert('Formulário válido (demo). Em produção, enviar para o servidor.');
      }
    });
  }
});
