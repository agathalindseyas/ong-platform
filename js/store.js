const KEY = "cadastroDraft.v1";

export const Store = {
  save(obj) {
    try { localStorage.setItem(KEY, JSON.stringify(obj || {})); } catch {}
  },
  load() {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
  },
  clear() { try { localStorage.removeItem(KEY); } catch {} }
};
