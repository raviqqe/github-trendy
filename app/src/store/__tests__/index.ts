import createStore from "..";

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
  const time: number = Date.now();

  expect(store.state.recentlyViewedLanguageIDs).toEqual({});
  store.commit("viewLanguage", "c");
  expect(store.state.recentlyViewedLanguageIDs.c).toBeGreaterThanOrEqual(time);
});

test("Clean up recently viewed languages", () => {
  const store = createStore();

  store.state.recentlyViewedLanguageIDs = { c: 0 };

  store.commit("cleanRecentlyViewedLanguages");
  expect(store.state.recentlyViewedLanguageIDs).toEqual({});
});
