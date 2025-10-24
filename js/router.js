// Router hash simples com query (?scroll=voluntariado)
export class Router {
  constructor({ mount, routes }) {
    this.mount = mount;
    this.routes = routes;
    window.addEventListener("hashchange", () => this.render());
    window.addEventListener("load", () => this.render());
  }

  raw() { return location.hash.replace(/^#/, ""); }

  // "/projetos?scroll=voluntariado" -> { path:"/projetos", query: URLSearchParams }
  parse() {
    const raw = this.raw() || "/";
    const [path, q = ""] = raw.split("?");
    const query = new URLSearchParams(q);
    return { path, query };
  }

  go(path, queryObj) {
    const q = queryObj ? "?" + new URLSearchParams(queryObj).toString() : "";
    location.hash = path + q;
  }

  async render() {
    const { path, query } = this.parse();
    const renderFn = this.routes[path] || this.routes["/404"];
    if (!renderFn) return;
    const html = await renderFn();
    this.mount.innerHTML = html;
    document.dispatchEvent(new CustomEvent("spa:render", { detail: { path, query } }));
  }
}

