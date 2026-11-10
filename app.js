import { filterShortcuts } from "./search.js";

const $ = (id) => document.getElementById(id);
const q = $("q"), list = $("list"), filters = $("filters"), count = $("count"), status = $("status");
let all = [], app = "All", shown = [], active = 0;

function render() {
  shown = filterShortcuts(all, q.value, app);
  active = Math.min(active, Math.max(shown.length - 1, 0));
  list.replaceChildren(...shown.map((s, i) => {
    const li = document.createElement("li");
    li.id = `r${i}`;
    li.setAttribute("role", "option");
    li.setAttribute("aria-selected", String(i === active));
    const keys = document.createElement("kbd");
    keys.textContent = s.keys;
    const text = document.createElement("span");
    text.textContent = s.action;
    const tag = document.createElement("span");
    tag.className = "app";
    tag.textContent = s.app;
    li.append(text, keys, tag);
    li.addEventListener("click", () => { active = i; copy(); });
    return li;
  }));
  count.textContent = `${shown.length} shortcut${shown.length === 1 ? "" : "s"}`;
  if (shown.length) q.setAttribute("aria-activedescendant", `r${active}`);
  else q.removeAttribute("aria-activedescendant");
}

function move(step) {
  if (!shown.length) return;
  active = (active + step + shown.length) % shown.length;
  render();
  $(`r${active}`).scrollIntoView({ block: "nearest" });
}

async function copy() {
  const s = shown[active];
  if (!s) return;
  try {
    await navigator.clipboard.writeText(s.keys);
    status.textContent = `Copied ${s.keys}`;
  } catch {
    status.textContent = "Copy not allowed by the browser";
  }
}

function buildFilters(apps) {
  for (const name of ["All", ...apps]) {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = name;
    b.setAttribute("aria-pressed", String(name === app));
    b.addEventListener("click", () => {
      app = name;
      active = 0;
      for (const x of filters.children) x.setAttribute("aria-pressed", String(x === b));
      render();
    });
    filters.append(b);
  }
}

q.addEventListener("input", () => { active = 0; render(); });
q.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
  else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
  else if (e.key === "Enter") { e.preventDefault(); copy(); }
});
document.addEventListener("keydown", (e) => {
  const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
  if (e.key === "/" && !typing) { e.preventDefault(); q.focus(); q.select(); }
});

const root = document.documentElement;
try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch {}
$("theme").addEventListener("click", () => {
  const dark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = dark ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch {}
});

try {
  const res = await fetch("shortcuts.json");
  if (!res.ok) throw new Error(res.status);
  const data = await res.json();
  all = data.shortcuts;
  buildFilters(Object.keys(data.sources));
  render();
  q.focus();
} catch (err) {
  count.textContent = `Could not load shortcuts.json (${err.message}). Serve the folder over HTTP, do not open the file directly.`;
}
