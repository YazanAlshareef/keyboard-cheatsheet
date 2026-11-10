// Pure search logic, shared by the page and the tests.
// Every word typed must appear somewhere in app + keys + action.
export function filterShortcuts(list, query, app = "All") {
  const words = query.toLowerCase().split(/[\s+]+/).filter(Boolean);
  return list.filter((s) => {
    if (app !== "All" && s.app !== app) return false;
    const text = `${s.app} ${s.keys} ${s.action}`.toLowerCase().replace(/\+/g, " ");
    return words.every((w) => text.includes(w));
  });
}
