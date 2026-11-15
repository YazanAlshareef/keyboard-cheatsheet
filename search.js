// Pure helpers, shared by the page and the tests.

// People type "windows" or "control"; the data says "Win" and "Ctrl".
const ALIASES = { windows: "win", control: "ctrl", escape: "esc", delete: "del" };

// Every word typed must appear somewhere in app + keys + action.
export function filterShortcuts(list, query, app = "All") {
  const words = query
    .toLowerCase()
    .split(/[\s+]+/)
    .filter(Boolean)
    .map((w) => ALIASES[w] ?? w);
  return list.filter((s) => {
    if (app !== "All" && s.app !== app) return false;
    const text = `${s.app} ${s.keys} ${s.action}`.toLowerCase().replace(/\+/g, " ");
    return words.every((w) => text.includes(w));
  });
}

// "/" jumps to search, but not while typing, and not as part of Ctrl+/ or Alt+/.
export function shouldFocusSearch(e, activeTag) {
  if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return false;
  return !/^(INPUT|TEXTAREA|SELECT)$/.test(activeTag);
}
