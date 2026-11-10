# Walkthrough: every file in plain English

- `index.html`: the page skeleton. A title, a theme button, a search box, app filter buttons, an empty list, a hidden message line for screen readers. It loads `style.css` and `app.js`.
- `style.css`: colours and layout. Colours are variables on `:root`. A dark set applies when the system is dark, or when the theme button sets `data-theme`. `:focus-visible` draws a thick outline so keyboard focus is always visible. The selected result has the same outline. A small-screen rule stacks each result.
- `app.js`: the behaviour. It loads `shortcuts.json`, builds the filter buttons, and draws the list. Keys:
  - `/` focuses the search box (only when you are not already typing).
  - Up and Down change which result is selected, wrapping at the ends. Focus stays in the search box; `aria-activedescendant` tells screen readers which result is selected.
  - Enter copies the selected shortcut with `navigator.clipboard`, then says "Copied ..." in the status line.
  - The theme button flips light/dark and remembers it in `localStorage`.
- `search.js`: one function, `filterShortcuts`. It splits your query into words and keeps shortcuts that contain all of them. Kept separate so the test can use it without a browser.
- `shortcuts.json`: all the data. `sources` maps each app to its official docs page. `shortcuts` is a list of `{app, keys, action}`.
- `test/shortcuts.test.mjs`: the tests, run with Node's built-in runner. They check the sources, that each entry has the three fields as non-empty strings, that no app and keys pair repeats, that no AI product name appears, and that search behaves.
- `package.json`: scripts `test`, `build` (runs the tests) and `start` (serves the folder). No dependencies.
- `.gitignore`: files git should skip (node_modules, local tool folders, env files).
- `LICENSE`: MIT licence.
- `README.md`: what the project is, how to run it, what broke, limits and sources.
- `WALKTHROUGH.md`: this file.

## Questions I should be ready for

- Why no framework? The page is one list with a filter. Plain JavaScript is enough and has nothing to install.
- Why does it need a server? Browsers block `fetch` of local files. Any static server fixes that.
- Why keep the data in JSON? The test can check it, and adding a shortcut needs no code change.
