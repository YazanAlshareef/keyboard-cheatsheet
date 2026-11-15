# Improvement log

## 2026-11-15, cycle 1

Baseline: 7 tests pass (`npm test`). No linter or type checker is configured.

### Done this cycle (branches awaiting review, not merged)

| Item | Branch | Commit | Result |
|---|---|---|---|
| Clicking a result did not move the selected highlight (app.js:23). Bug fix, behaviour change: the highlight and `aria-activedescendant` now follow the clicked row. | fix/click-selects-row | 523100a | 7 of 7 tests pass. No test covers app.js. |
| The search box always reported `aria-expanded="true"` (index.html:18). Bug fix, behaviour change: the attribute now follows the result count. | fix/combobox-expanded | be93aae | 7 of 7 tests pass. No test covers app.js. |
| README said Node 18 or newer, but CI only runs Node 20 (README.md:24). Docs only, no behaviour change: the README now says Node 20. | fix/node-version-claim | 3dd3d43 | 7 of 7 tests pass. |

Each branch was reviewed on its own and passed. Each branch holds one commit on top of main.

### Not verified

- None of this was opened in a browser or heard in a screen reader. The two behaviour changes are checked by reading the code only.
- The four official shortcut pages were not fetched again, so shortcut accuracy is unchanged from before this round.
- CI was not observed running.

### Backlog, re-ranked

1. No test covers app.js (test/shortcuts.test.mjs:4, app.js:85-95). The top-level `await fetch` means it cannot be imported in plain Node. Effort M to L, risk low. A DOM test would have caught the click bug.
2. Two shortcut wordings differ from the cited source, and the footer says the data was checked with no caveat or date (shortcuts.json:19 and :25, README.md:95, index.html:26). Effort S for a footer caveat, risk low.
3. Copying the same shortcut twice sets identical status text, which a live region may not announce again (app.js:43 and :45, index.html:24). Unconfirmed, not tested with a screen reader. Effort S, risk low.
4. The whole list is rebuilt on every arrow key (app.js:31-36, app.js:10). Not slow at 112 rows. Listed for completeness, not recommended yet. Effort M, risk medium.
5. CI has no `permissions:` block and pins actions by tag, not commit SHA (.github/workflows/ci.yml:12-13). Effort S, risk low.

### Lessons

- The click fix and the combobox fix touch different lines (app.js:23 against index.html:18), so the branches do not conflict.
- The click bug was only found by reading the code. With no test on app.js, both fixes rest on review alone.
- The Node 18 claim had never been run anywhere. The README now says only what CI shows.

### Diagrams

Component and flow diagrams are in `docs/diagrams/` (components.md, flows.md). They live on the `docs/diagrams` branch, not on main.

### Status

All branches are local. Nothing is pushed or merged. They wait for the owner's approval.
