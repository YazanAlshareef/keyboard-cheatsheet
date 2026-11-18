# Flows

Two sequence diagrams: page load, then search and copy.

Source: [app.js](../../app.js), [search.js](../../search.js), [shortcuts.json](../../shortcuts.json)

## Page load

Shows how `app.js` loads the data and builds the filter buttons.

```mermaid
sequenceDiagram
  participant B as Browser
  participant A as app.js
  participant D as shortcuts.json
  participant S as search.js
  B->>A: load module
  A->>A: read theme from localStorage
  A->>D: fetch
  alt response ok
    D-->>A: sources and shortcuts
    A->>A: buildFilters (All plus one per source)
    A->>S: filterShortcuts (empty query, All)
    S-->>A: all shortcuts
    A->>A: render list, focus search box
  else fetch fails
    A->>A: show "Could not load shortcuts.json" in count
  end
```

## Search and copy

Shows what happens when the user types, moves through results and presses Enter.

```mermaid
sequenceDiagram
  actor U as User
  participant A as app.js
  participant S as search.js
  participant C as navigator.clipboard
  U->>A: type in search box or click app filter
  A->>S: filterShortcuts(all, query, app)
  S-->>A: matching shortcuts
  A->>A: render list and count
  U->>A: ArrowDown or ArrowUp
  A->>A: move (wraps around), render
  U->>A: Enter or click a row
  A->>C: writeText(keys)
  alt allowed
    A->>A: status "Copied keys"
  else blocked
    A->>A: status "Copy not allowed by the browser"
  end
  U->>A: press "/"
  A->>S: shouldFocusSearch(event, activeTag)
  S-->>A: true or false
  A->>A: focus and select search box if true
```
