# Keyboard Cheatsheet

A small static web page with searchable keyboard shortcuts for Windows 11, VS Code, Excel and Chrome. I work keyboard-only, so I built the page I wanted to use.

## What it does

- Type to search. Every word you type must match the app, keys or action ("ctrl shift p" finds the VS Code palette).
- Filter buttons for each app.
- Keyboard only: `/` focuses search, Up/Down move through results, Enter copies the shortcut.
- Dark and light theme (follows the system, button overrides it, choice stored in your browser only).
- Visible focus outline, responsive layout, no tracking, no cookies, no external requests.
- All data lives in one file: `shortcuts.json`.
- No shortcuts for any AI tool are included.

## How an AI coding assistant helped

An AI coding assistant wrote the first version of the files and the shortcut list from the official pages listed below. I read the code, ran the tests and checked the page by hand. See `WALKTHROUGH.md` for what each file does.

## What broke and how I fixed it

- `node --test test/` failed on Node 24 with a bare "test failed". Fix: point it at the files, `node --test test/*.test.mjs`.
- My "no AI tool shortcuts" test matched the word "cursor" inside "multi-cursor" (a real VS Code feature). Fix: the test now checks only for AI product names.
- Browser console showed a 404 for `favicon.ico`. Fix: an empty inline icon in `index.html`.
- A first draft had shortcuts the docs do not list for Windows (Excel `Ctrl+Shift+L`, `Ctrl+R`, `Ctrl+F`, `Ctrl+H`, VS Code "new terminal"). I removed them. See Sources.

## How to run

You need Node 18 or newer.

```bash
npm test
npm start
```

`npm test` checks the JSON file and the search function. `npm start` serves the folder with `npx serve`; open the address it prints. The page must be served over HTTP, because it loads `shortcuts.json` with `fetch`. Any static server works, for example `python -m http.server`.

There is no build step. `npm run build` just runs the tests.

## Limits

- Windows keyboard shortcuts only. Mac and Linux are not covered.
- Shortcuts are the defaults. If you rebind keys, the page is wrong for you.
- 112 shortcuts, a small selection and not a full list.
- Copy needs a secure context (HTTPS or localhost). The page shows a message if the browser blocks it.
- "Ctrl+Plus" and "Ctrl+Minus" are spelled out so the search box can find them.
- Verified on 2026-11-10. Official pages change; recheck before trusting an old copy.
- Not deployed. The Vercel command line tool was not installed, so I skipped the deploy.

## Sources

Every shortcut was compared against these official pages on 2026-11-10. A shortcut that the page did not state for Windows was dropped.

- Windows 11: https://support.microsoft.com/en-us/windows/keyboard-shortcuts-in-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec
- VS Code: https://code.visualstudio.com/docs/reference/default-keybindings
- Excel: https://support.microsoft.com/en-us/office/keyboard-shortcuts-in-excel-1798d9d5-842a-42b8-9c99-9b7213f0040f
- Chrome: https://support.google.com/chrome/answer/157179

Wording note: Windows 11 `Win+A` is shown as "Open Quick Settings"; the page I read called it the action center. Windows lists the Excel time shortcut as `Ctrl+Shift+:`.

## Licence

MIT. See `LICENSE`.
