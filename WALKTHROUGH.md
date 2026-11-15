# Walkthrough: every file

- `index.html`: the page skeleton. A title, a theme button, a search box, filter buttons, an empty list, and a hidden status line for screen readers. It loads `style.css` and `app.js`.
- `style.css`: colours and layout. The colours are variables on `:root`. The dark set applies when the system is dark, or when the theme button sets `data-theme`. `--edge` is a darker border just for inputs and buttons, so they pass the 3:1 contrast rule for controls. `:focus-visible` draws a thick outline, and the selected result gets the same one. Under 480px each result stacks.
- `app.js`: the behaviour. It loads `shortcuts.json`, builds the filter buttons and draws the list.
  - `/` focuses the search box, through `shouldFocusSearch` in `search.js`.
  - Up and Down move the selected result and wrap at the ends. Focus never leaves the search box. `aria-activedescendant` tells a screen reader which result is selected.
  - Enter or a click copies the keys with `navigator.clipboard` and says "Copied ..." in the status line. If the browser refuses, it says so.
  - The theme button flips light and dark and saves the choice in `localStorage`.
  - If `shortcuts.json` fails to load, the count line says why.
- `search.js`: two small functions. `filterShortcuts` splits the query into words, maps "windows" to "win" and "control" to "ctrl", and keeps shortcuts containing every word. `shouldFocusSearch` decides if a keypress should jump to search. They live apart from `app.js` so the tests can run them without a browser.
- `shortcuts.json`: all the data. `sources` maps each app to its docs page, and `shortcuts` is a list of `{app, keys, action}`.
- `test/shortcuts.test.mjs`: seven tests on Node's built-in runner. They check the sources, that each entry has the three fields as non-empty strings, that no app and keys pair repeats, that no AI product name shows up, and how search, the aliases and the `/` rule behave.
- `.github/workflows/ci.yml`: runs `npm test` on GitHub for each push and pull request. No secrets.
- `docs/`: the screenshots used in the README.
- `package.json`: the scripts `test`, `build` (which only runs the tests) and `start` (Python's static server). No dependencies.
- `.gitignore`, `LICENSE` (MIT), `README.md` and this file.

## Questions I should be ready for

- Why no framework? The page is a list with a filter. Plain JavaScript does that and there is nothing to install.
- Why does it need a server? Browsers block `fetch` on local files. Any static server fixes it.
- Why JSON? The tests can check it, and a new shortcut needs no code change.
- What would I do next? Run Lighthouse, try a screen reader, and decide whether Mac keys belong here.
