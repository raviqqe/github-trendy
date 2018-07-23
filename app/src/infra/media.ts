const widthQuery = matchMedia('(max-width: 512px)');

export const windowSmall: boolean = !!widthQuery.matches;

export function onWindowResize(callback: (windowSmall: boolean) => void): void {
  widthQuery.addListener(({ matches }) => callback(!!matches));
}
