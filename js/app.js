import { Router } from "./router.js";
import { Home, Projetos, Cadastro, Contato, NotFound } from "./templates.js";
import { initFormEnhancements } from "./forms.js";

// Navegação: intercepta cliques do menu/topo e submenu
function hijackNav(router) {
  document.addEventListener("click", (e) => {
    const el = e.target.closest("a,button.nav-link--button");
    if (!el) return;

    // Botão "Projetos" (topo)
    if (el.matches("button.nav-link--button")) {
      e.preventDefault();
      router.go("/projetos");
      return;
    }

    // Submenu: projetos.html#voluntariado / #como-doar
    if (el.matches(".dropdown-link")) {
      const href = el.getAttribute("href") || "";
      if (href.includes("projetos.html#voluntariado")) {
        e.preventDefault();
        router.go("/projetos", { scroll: "voluntariado" });
        return;
      }
      if (href.includes("projetos.html#como-doar")) {
        e.preventDefault();
        router.go("/projetos", { scroll: "como-doar" });
        return;
      }
    }

    // Links de topo (fallback para SPA)
    if (el.matches(".nav-link")) {
      const href = el.getAttribute("href") || "";
      if (href.endsWith("index.html")) { e.preventDefault(); router.go("/"); }
      else if (href.includes("projetos.html")) { e.preventDefault(); router.go("/projetos"); }
      else if (href.includes("cadastro.html")) { e.preventDefault(); router.go("/cadastro"); }
      else if (href.includes("contato.html")) { e.preventDefault(); router.go("/contato"); }
    }
  });
}

function setActive(path) {
  document.querySelectorAll(".nav-link, .nav-link--button").forEach(el => el.classList.remove("is-active"));
  if (path === "/") {
    document.querySelector('.nav-link[href="index.html"]')?.classList.add("is-active");
  } else if (path === "/projetos") {
    document.querySelector(".nav-link--button")?.classList.add("is-active");
  } else if (path === "/cadastro") {
    document.querySelector('.nav-link[href="cadastro.html"]')?.classList.add("is-active");
  } else if (path === "/contato") {
    document.querySelector('.nav-link[href="index.html#contato"], .nav-link[href="contato.html"]')?.classList.add("is-active");
  }
}

// Scroll suave após render
function scrollIfRequested(query) {
  const target = query?.get?.("scroll");
  if (!target) return;
  // garante que a seção já está no DOM
  requestAnimationFrame(() => {
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

const mount = document.getElementById("app");

const router = new Router({
  mount,
  routes: {
    "/": Home,
    "/projetos": Projetos,
    "/cadastro": () => {
      const html = Cadastro();
      queueMicrotask(() => initFormEnhancements(mount));
      return html;
    },
    "/contato": Contato,
    "/404": NotFound
  }
});

hijackNav(router);

// Após cada render, atualiza ativo e faz scroll se pedido
document.addEventListener("spa:render", (e) => {
  const { path, query } = e.detail;
  setActive(path);
  if (path === "/projetos") scrollIfRequested(query);
});

// Sem hash? vai pra home
if (!location.hash) location.hash = "/";
