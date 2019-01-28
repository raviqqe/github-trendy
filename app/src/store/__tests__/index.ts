import createStore, { maxViewPoints } from "..";

beforeEach(() => window.localStorage.clear());

test("Check initial state", () => {
  const store = createStore();

  expect(store.state.menuOpen).toBe(false);
  expect(store.state.languages).toEqual({});
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
  expect(store.state.languages).toEqual({ c: { viewPoints: maxViewPoints } });
});

test("Reduce language view points", () => {
  const store = createStore();

  store.state.languages = { c: { loading: false, viewPoints: 3 } };

  store.commit("reduceLanguageViewPoints");
  expect(store.state.languages).toEqual({
    c: { loading: false, viewPoints: 2 }
  });
});

test("Start loading languages' data", () => {
  const store = createStore();

  store.commit("startLoading", "c");
  expect(store.state.languages.c).toEqual({ loading: true });
});

test("Finish loading languages' data", () => {
  const store = createStore();

  store.commit("startLoading", "c");
  store.commit("finishLoading", "c");
  expect(store.state.languages.c).toEqual({ loading: false });
});
