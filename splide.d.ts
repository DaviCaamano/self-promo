/**
 * Types for the carousel on `/spooky`.
 *
 * `@splidejs/react-splide` ships real declarations at `dist/types/` and then
 * hides them: its `exports` map lists `require`, `import` and `default` but no
 * `types` condition, and `moduleResolution: bundler` honours that map exactly,
 * so the import reads as an implicit `any`.
 *
 * The usual fix — pointing a `tsconfig.json` `paths` entry at those
 * declarations — is wrong here. Next reads `paths` for bundling too, so the
 * package name resolves to a `.d.ts` file at runtime and `<Splide>` arrives
 * undefined. Re-exporting them from an ambient declaration keeps the fix where
 * only the type checker can see it.
 *
 * Named exports rather than `export *`, which an ambient module declaration
 * accepts and then quietly drops — the three components are the package's
 * whole component surface, and its prop and event types need listing here by
 * name before anything can import them.
 *
 * A file of its own rather than a few lines in `global.d.ts`: that one imports
 * from 'react' at the top, which makes it a module, and `declare module` inside
 * a module augments something that already exists rather than declaring
 * something that does not.
 */
declare module '@splidejs/react-splide' {
  export { Splide, SplideSlide, SplideTrack } from './node_modules/@splidejs/react-splide/dist/types/components';
}

/** Splide's stylesheet, imported for its side effect by the carousel. The same
 *  missing `types` condition, and nothing to import from it besides. */
declare module '@splidejs/react-splide/css';
