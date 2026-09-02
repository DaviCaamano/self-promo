const jsonImporter = require('node-sass-json-importer');

/**
 * Next 16 builds with Turbopack, which refuses to run alongside a webpack
 * config it cannot account for. There was one here, adding an SVGR loader for
 * `.svg` imports — but nothing imports an SVG. The only files that read one do
 * it with `fs` in `scripts/build-tech-icons.mjs`, which never touches the
 * bundler. It went, and with it the Turbopack conflict.
 *
 * Three more entries went at the same time, all left over from the monorepo
 * this was started from and all verified dead: `experimental.serverActions`,
 * stable since Next 14 and invalid as a boolean in 16; `transpilePackages` for
 * a `shared` package that does not exist; and a `/api/*` proxy to a backend,
 * when nothing on the site makes a request at all.
 */
module.exports = {
  reactStrictMode: true,
  sassOptions: {
    importer: jsonImporter(),
  },
};
