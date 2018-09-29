import createStore, { maxViewPoints } from "..";

test("Check initial state", () => {
  const store = createStore();

  expect(store.state.menuOpen).toBe(false);
  expect(store.state.recentlyViewedLanguageIDs).toEqual({});
});

test("Toggle a menu", () => {
  const store = createStore();
  expect(store.state.menuOpen).toBe(false);

  store.commit("toggleMenu");
  expect(store.state.menuOpen).toBe(true);

  store.commit("toggleMenu");
  expect(store.state.menuOpen).toBe(false);
});

test("View languages", () => {
  const store = createStore();

  store.commit("viewLanguage", "c");
  expect(store.state.recentlyViewedLanguageIDs).toEqual({ c: maxViewPoints });
});

test("Reduce language view points", () => {
  const store = createStore();

  store.state.recentlyViewedLanguageIDs = { c: 3 };

  store.commit("reduceLanguageViewPoints");
  expect(store.state.recentlyViewedLanguageIDs).toEqual({ c: 2 });
});

test("Clean up languages not viewed recently", () => {
  const store = createStore();

  store.state.recentlyViewedLanguageIDs = { c: 0 };

  store.commit("reduceLanguageViewPoints");
  expect(store.state.recentlyViewedLanguageIDs).toEqual({});
});
