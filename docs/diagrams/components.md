# Components

Shows the files in the page and what each one depends on.

Source: [index.html](../../index.html), [app.js](../../app.js), [search.js](../../search.js), [shortcuts.json](../../shortcuts.json), [style.css](../../style.css), [test/shortcuts.test.mjs](../../test/shortcuts.test.mjs), [package.json](../../package.json), [ci.yml](../../.github/workflows/ci.yml)

```mermaid
flowchart LR
  subgraph Browser
    H["index.html (inputs, list, buttons)"]
    CSS[style.css]
    A["app.js (UI and state)"]
    S["search.js (filterShortcuts, shouldFocusSearch)"]
    LS[("localStorage: theme")]
    CB[navigator.clipboard]
  end
  D[shortcuts.json]
  P["python -m http.server 8000"]
  T["test/shortcuts.test.mjs (node --test)"]
  CI["ci.yml (npm test)"]

  H -->|script type=module| A
  H -->|link| CSS
  A -->|import| S
  A -->|fetch| D
  A --> LS
  A --> CB
  P -->|serves files| H
  T -->|reads| D
  T -->|imports| S
  CI -->|runs| T
```
