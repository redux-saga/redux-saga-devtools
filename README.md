
A Visual redux-saga monitor

**this is still a WIP**

## How does it relate to other Redux devtools?

This would of course endup as a browser extension (chrome, firefox). But also intended to release as a themable React Component 
(or many React Components, one per view) so it can be embedded in other Redux devtools (redux-devtools-extension, reactotron or directly inside a React application)

For instance there is no final app or npm package. You can see how it's used by consulting the examples. To play with you can start the
2 included demos.

- `npm run counter` : cancellable counter counter example
- `npm run shopping-cart`   : Shopping cart example.


**Note that the monitor uses the v0.13.0 of redux-saga which includes an improved
monitor api**. 

## Done so far

- [x] Structured Effect view
- [x] Actions/Reactions view (should redirect to Effect view instead (?))
- [x] JS object inspector
- [x] Highlight shared refs in the effect view (right now: Channels)
- [x] Selection management/keyboard navigation
- [x] Pin/Unpin Effect
- [x] Dockable view with resize/toggle visibility

## Todos

Following Todos that I can think of. Ordering doesn't reflect priority.

### Features

- [ ] Hide irrelevant path in the Reactions view
- [ ] Search/filter command
- [ ] Clear effect log (removes all previous Effects)
- [ ] Auto folding/Framing for long running Sagas (with a long effect list)
- [ ] Highlight shared refs for other objects (Tasks, Actions)
- [ ] top/bottom/left/right docking to the Dock view
- [ ] Add raw Effect view
- [ ] Add 'time-lined' Effect view (effects on Row, Sagas on columns, useful to debug race conditions)
- [ ] Show origin of dispatched Actions in the Reactions view (Saga, UI Component (possible?))

### Refactoring

- [ ]support theming (eg of Styled-Components)
- [ ] Add tests for UI Components
- [ ] localize Effect View state (currently shared refs are stored in the Redux store)
- [ ] release the saga monitor store + selectors as a separate package.
