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
  expect(store.state.recentlyViewedLanguageIDs).toEqual({ c: 2 });
});

test("Limit max view points", () => {
  const store = createStore();
  store.state.recentlyViewedLanguageIDs = {};

  store.commit("viewLanguage", "c");
  store.commit("viewLanguage", "c");
  expect(store.state.recentlyViewedLanguageIDs).toEqual({ c: maxViewPoints });
});

test("Clean up recently viewed languages", () => {
  const store = createStore();

  store.state.recentlyViewedLanguageIDs = { c: 0 };

  store.commit("reduceLanguageViewPoints");
  expect(store.state.recentlyViewedLanguageIDs).toEqual({});
});
