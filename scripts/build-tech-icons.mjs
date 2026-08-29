/**
 * Rebuilds src/components/landing/technologies/tech-icons.ts from the vendored
 * icon packages, so the site ships ~30 path strings instead of three icon sets.
 *
 *   node scripts/build-tech-icons.mjs
 *
 * Sources, in order of preference:
 *   si:<slug>            simple-icons  — single-path brand glyph + official hex
 *   lobe:<name>          @lobehub/icons-static-svg — for marks Amazon/OpenAI
 *                        pulled from simple-icons
 *   devicon:<dir>/<file> devicon — everything neither of the above carries
 *
 * `keep` selects which <path> elements survive, used to strip the rounded-tile
 * backdrop off Adobe's app icons.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const modules = path.join(root, 'node_modules');
const outFile = path.join(root, 'src/components/landing/technologies/tech-icons.ts');

const simpleIcons = JSON.parse(
  fs.readFileSync(path.join(modules, 'simple-icons/data/simple-icons.json'), 'utf8'),
);

const LARGE = [
  { id: 'typescript', source: 'si:typescript' },
  { id: 'node', source: 'si:nodedotjs', title: 'Node.js' },
  { id: 'react', source: 'si:react' },
  { id: 'next', source: 'si:nextdotjs', title: 'Next.js' },
  { id: 'angular', source: 'si:angular' },
  { id: 'python', source: 'si:python', title: 'Python 3' },
  { id: 'fastapi', source: 'si:fastapi' },
  { id: 'postgres', source: 'si:postgresql' },
  { id: 'vllm', source: 'si:vllm' },
];

const SMALL = [
  { id: 'html', source: 'si:html5', title: 'HTML' },
  { id: 'css', source: 'si:css' },
  { id: 'aws', source: 'lobe:aws', title: 'AWS', hex: 'FF9900' },
  { id: 'redux', source: 'si:redux' },
  { id: 'tanstack', source: 'si:tanstack', title: 'TanStack' },
  { id: 'mobx', source: 'si:mobx' },
  { id: 'tailwind', source: 'si:tailwindcss', title: 'Tailwind CSS' },
  { id: 'materialui', source: 'si:mui', title: 'Material UI' },
  { id: 'chakraui', source: 'si:chakraui', title: 'Chakra UI' },
  { id: 'radixui', source: 'si:radixui', title: 'Radix UI' },
  { id: 'framermotion', source: 'si:framer', title: 'Framer Motion' },
  { id: 'reactnative', source: 'si:react', title: 'React Native' },
  { id: 'prisma', source: 'si:prisma' },
  { id: 'drizzle', source: 'si:drizzle', title: 'Drizzle ORM' },
  { id: 'sequelize', source: 'si:sequelize' },
  { id: 'claude', source: 'si:claude' },
  { id: 'codex', source: 'lobe:codex', title: 'Codex', hex: '000000' },
  { id: 'stripe', source: 'si:stripe' },
  { id: 'square', source: 'si:square' },
  { id: 'jest', source: 'si:jest' },
  { id: 'photoshop', source: 'devicon:photoshop/photoshop-original', title: 'Photoshop', hex: '31A8FF', keep: [1] },
];

/**
 * Marks the project write-ups need that the Technologies grid does not list.
 * They are emitted into `techIcons` so a project can badge them, but they stay
 * out of `smallBadges` — that list is the stack that page is about.
 */
const PROJECT_ONLY = [
  { id: 'express', source: 'si:express' },
  { id: 'nestjs', source: 'si:nestjs', title: 'NestJS' },
  { id: 'mysql', source: 'si:mysql', title: 'MySQL' },
  { id: 'recoil', source: 'si:recoil' },
];

const readSvg = (source) => {
  const [kind, ref] = [source.slice(0, source.indexOf(':')), source.slice(source.indexOf(':') + 1)];
  if (kind === 'si') return fs.readFileSync(path.join(modules, `simple-icons/icons/${ref}.svg`), 'utf8');
  if (kind === 'lobe') {
    return fs.readFileSync(path.join(modules, `@lobehub/icons-static-svg/icons/${ref}.svg`), 'utf8');
  }
  if (kind === 'devicon') return fs.readFileSync(path.join(modules, `devicon/icons/${ref}.svg`), 'utf8');
  throw new Error(`unknown icon source "${source}"`);
};

/** Everything we vendor is <svg><title?/><path/>…</svg>; bail loudly on anything else. */
const parseSvg = (svg, source) => {
  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1];
  if (!viewBox) throw new Error(`${source}: no viewBox`);

  const stripped = svg.replace(/<\?xml[^>]*>|<!--[\s\S]*?-->/g, '');
  const tags = [...stripped.matchAll(/<([a-zA-Z-]+)/g)].map((m) => m[1]);
  const unexpected = tags.filter((t) => !['svg', 'title', 'path'].includes(t));
  if (unexpected.length) throw new Error(`${source}: unsupported elements ${unexpected.join(', ')}`);

  const paths = [...stripped.matchAll(/<path\b([^>]*)\/?>/g)].map((m) => {
    const d = m[1].match(/\sd="([^"]+)"/)?.[1];
    if (!d) throw new Error(`${source}: <path> without d`);
    return d;
  });
  if (!paths.length) throw new Error(`${source}: no paths`);

  return { viewBox, paths, title: stripped.match(/<title>([^<]+)<\/title>/)?.[1] };
};

const build = ({ id, source, title, hex, keep }) => {
  const parsed = parseSvg(readSvg(source), source);
  const slug = source.startsWith('si:') ? source.slice(3) : null;
  const brand = slug ? simpleIcons.find((i) => i.slug === slug || i.title.toLowerCase() === slug) : null;
  if (slug && !brand) throw new Error(`${source}: not in the simple-icons manifest`);

  const paths = keep ? keep.map((i) => parsed.paths[i]) : parsed.paths;
  if (paths.some((d) => !d)) throw new Error(`${source}: keep[] points past the end`);

  return {
    id,
    title: title ?? brand?.title ?? parsed.title ?? id,
    viewBox: parsed.viewBox,
    hex: (hex ?? brand?.hex ?? '000000').toUpperCase(),
    paths,
  };
};

const quote = (value) => `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const serialise = (icon) =>
  `  ${icon.id}: {\n` +
  `    title: ${quote(icon.title)},\n` +
  `    viewBox: ${quote(icon.viewBox)},\n` +
  `    hex: ${quote(icon.hex)},\n` +
  `    paths: [${icon.paths.map((d) => `\n      ${quote(d)},`).join('')}\n    ],\n` +
  `  },`;

const icons = [...LARGE, ...SMALL, ...PROJECT_ONLY].map(build);
const unique = icons.filter((icon, i) => icons.findIndex((o) => o.id === icon.id) === i);
const list = (entries) => entries.map(({ id }) => `  '${id}',`).join('\n');

const file = `/**
 * Generated by scripts/build-tech-icons.mjs — do not edit by hand.
 *
 * Brand marks from simple-icons (CC0), @lobehub/icons-static-svg (MIT) and
 * devicon (MIT), reduced to the handful this site actually renders.
 */

export interface TechIcon {
  /** Accessible name for the badge. */
  title: string;
  viewBox: string;
  /** Official brand colour, without the leading '#'. */
  hex: string;
  paths: string[];
}

export const techIcons = {
${unique.map(serialise).join('\n')}
} satisfies Record<string, TechIcon>;

export type TechName = keyof typeof techIcons;

/** Rendered at full size, the stack I reach for first. */
export const largeBadges: TechName[] = [
${list(LARGE)}
];

/** Rendered at half size. */
export const smallBadges: TechName[] = [
${list(SMALL)}
];
`;

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, file);

console.log(`wrote ${path.relative(root, outFile)} — ${unique.length} icons`);
for (const icon of unique) console.log(`  ${icon.id.padEnd(14)} #${icon.hex}  ${icon.title}`);
