import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { filterShortcuts } from "../search.js";

const data = JSON.parse(readFileSync(new URL("../shortcuts.json", import.meta.url), "utf8"));
const apps = ["Windows 11", "VS Code", "Excel", "Chrome"];

test("sources: one https URL per app", () => {
  assert.deepEqual(Object.keys(data.sources).sort(), [...apps].sort());
  for (const u of Object.values(data.sources)) assert.match(u, /^https:\/\//);
});

test("every shortcut has app, keys, action as non-empty strings", () => {
  assert.ok(data.shortcuts.length > 0);
  for (const s of data.shortcuts) {
    assert.deepEqual(Object.keys(s).sort(), ["action", "app", "keys"]);
    for (const k of ["app", "keys", "action"]) {
      assert.equal(typeof s[k], "string");
      assert.ok(s[k].trim().length > 0, `${k} empty in ${JSON.stringify(s)}`);
    }
    assert.ok(apps.includes(s.app), `unknown app ${s.app}`);
  }
});

test("no duplicate app+keys pair", () => {
  const seen = new Set();
  for (const s of data.shortcuts) {
    const id = `${s.app}|${s.keys}`;
    assert.ok(!seen.has(id), `duplicate ${id}`);
    seen.add(id);
  }
});

test("no AI tool shortcuts", () => {
  const bad = /copilot|chatgpt|gemini|(?<!multi-)cursor|ai assistant/i;
  for (const s of data.shortcuts) assert.ok(!bad.test(`${s.app} ${s.keys} ${s.action}`), s.action);
});

test("search: all words must match, app filter works", () => {
  assert.equal(filterShortcuts(data.shortcuts, "ctrl shift p", "VS Code")[0].keys, "Ctrl+Shift+P");
  assert.equal(filterShortcuts(data.shortcuts, "zzzz").length, 0);
  assert.ok(filterShortcuts(data.shortcuts, "", "Excel").every((s) => s.app === "Excel"));
});
