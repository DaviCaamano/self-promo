import { TechName } from './tech-icons';

export interface TechLink {
  label: string;
  url: string;
}

export interface TechDetail {
  /** Year it first became available to the public. */
  released: number;
  /** What the thing is, for a reader who may not have met it. */
  summary: string;
  /** Where it came from, what it set out to solve, and what it competes with. */
  history: string;
  links: TechLink[];
}

/**
 * The copy behind each badge. Kept apart from `tech-icons.ts` because that file
 * is generated from the icon packs and is overwritten wholesale; this is
 * written by hand and must survive a regeneration.
 */
export const techDetails: Record<TechName, TechDetail> = {
  typescript: {
    released: 2012,
    summary: 'JavaScript with a static type system layered on top, checked before the code ever runs.',
    history:
      'Built at Microsoft under Anders Hejlsberg, who had already designed Turbo Pascal and C#. The goal was to make large JavaScript codebases survivable: catch the class of mistake that only showed up at runtime, and give editors enough information to offer real autocomplete and refactoring. It won out over Google’s Dart, which asked the industry to abandon JavaScript entirely, and over Facebook’s Flow, which type-checked JavaScript but never matched the tooling. Its remaining rival is plain JavaScript with JSDoc annotations.',
    links: [
      { label: 'Official handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
      { label: 'Type challenges', url: 'https://github.com/type-challenges/type-challenges' },
    ],
  },
  node: {
    released: 2009,
    summary: "The JavaScript runtime that put the language on the server, built on Chrome's V8 engine.",
    history:
      'Ryan Dahl built it after watching Apache struggle to hold thousands of open connections, each one costing a thread. Node answered with a single-threaded event loop and non-blocking I/O, so a server could hold many idle connections cheaply — and, incidentally, let one language cover both ends of a web app. Deno (from Dahl himself) and Bun now compete on startup speed and built-in tooling, while Go and Python hold much of the ground Node was aimed at.',
    links: [{ label: 'Node.js docs', url: 'https://nodejs.org/en/docs' }],
  },
  react: {
    released: 2013,
    summary: 'A library for building interfaces out of components, redrawing from state rather than by hand.',
    history:
      'Facebook open-sourced it after its own chat and news feed became too tangled to reason about. The bet was that describing what the UI should look like for a given state, and letting a diffing layer work out the DOM operations, was easier to get right than mutating the page by hand. It was widely disliked at first for mixing markup into JavaScript. It now shares the field with Vue, Svelte, which compiles the framework away, and Solid, which keeps the syntax but drops the virtual DOM.',
    links: [
      { label: 'react.dev', url: 'https://react.dev/' },
      { label: 'React Compiler', url: 'https://react.dev/learn/react-compiler' },
    ],
  },
  next: {
    released: 2016,
    summary: 'The React framework that adds routing, server rendering and a build pipeline around the library.',
    history:
      'Vercel built it because every serious React project was reassembling the same routing, bundling and server-rendering setup by hand, usually badly. Next made those decisions once. It has since pushed hard into server components, moving rendering back toward the server after a decade of the opposite. Remix and TanStack Start compete on the React side, with Nuxt and SvelteKit filling the same role for other frameworks.',
    links: [{ label: 'Next.js docs', url: 'https://nextjs.org/docs' }],
  },
  angular: {
    released: 2016,
    summary: "Google's batteries-included frontend framework, built around TypeScript, DI and RxJS.",
    history:
      'A complete rewrite of AngularJS (2010), whose two-way data binding became hard to trace and slow at scale. Angular kept the ambition of shipping everything a large team needs — router, HTTP client, forms, dependency injection — with conventions rather than choices. That completeness is exactly the trade it makes against React, which ships far less and expects you to pick the rest.',
    links: [{ label: 'Angular docs', url: 'https://angular.dev/' }],
  },
  python: {
    released: 1991,
    summary: 'A general purpose language that has become the default for data work and machine learning.',
    history:
      'Guido van Rossum wrote it as a holiday project, aiming at something more readable than C and more capable than shell scripts, with the belief that code is read far more often than it is written. Its second life came from scientific computing: NumPy, then PyTorch and TensorFlow, made it the language machine learning is written in. It competes with R for statistics, Julia for numerical work, and increasingly with Rust for the performance-critical pieces underneath it.',
    links: [{ label: 'Python docs', url: 'https://docs.python.org/3/' }],
  },
  fastapi: {
    released: 2018,
    summary: 'A Python web framework that derives validation and API docs straight from type hints.',
    history:
      'Sebastián Ramírez built it to stop Python APIs declaring the same shape three times — once for validation, once for documentation, once for the editor. Type hints already described it, so FastAPI reads them and generates the rest. It arrived alongside Python’s async support and largely displaced Flask for new APIs, with Django REST Framework still holding projects that want an ORM and admin in the box.',
    links: [{ label: 'FastAPI docs', url: 'https://fastapi.tiangolo.com/' }],
  },
  postgres: {
    released: 1996,
    summary: 'The open source relational database, and the one I reach for unless something rules it out.',
    history:
      'It grew out of Michael Stonebraker’s POSTGRES project at Berkeley, which set out to extend the relational model with custom types and richer queries. SQL support and the PostgreSQL name arrived in the mid-90s. For years MySQL was the more popular default, being simpler and faster at the time; Postgres won the long game on correctness, extensions and JSON support. Today it competes with MySQL, SQLite for embedded work, and managed offerings built on top of it.',
    links: [{ label: 'PostgreSQL docs', url: 'https://www.postgresql.org/docs/' }],
  },
  vllm: {
    released: 2023,
    summary: 'A serving engine for large language models, built around paged attention and continuous batching.',
    history:
      'Out of a Berkeley lab, answering a specific waste: GPU memory for a model’s attention cache was being reserved in one contiguous block per request, most of it unused. PagedAttention borrowed virtual memory paging from operating systems to hand it out in pages instead, raising throughput several times over. It competes with TensorRT-LLM, SGLang, and Hugging Face’s Text Generation Inference.',
    links: [{ label: 'vLLM docs', url: 'https://docs.vllm.ai/' }],
  },
  html: {
    released: 1993,
    summary: 'The markup the web is made of, and the layer accessibility actually rests on.',
    history:
      'Tim Berners-Lee designed it at CERN so physicists could cross-reference documents across machines; the first public specification followed in 1993. It was meant to describe structure, not appearance. The browser wars pulled it toward presentation, XHTML tried to drag it back with strict XML rules and failed, and HTML5 settled the matter by standardising what browsers actually did. It has no real competitor — everything else on the web compiles down to it.',
    links: [{ label: 'MDN HTML reference', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' }],
  },
  css: {
    released: 1996,
    summary: 'The styling language of the web — layout, colour, motion and responsiveness.',
    history:
      'Håkon Wium Lie proposed it to pull appearance back out of HTML, which by then was filling up with font tags and layout tables. The separation took years to arrive in practice, and layout stayed genuinely hard until flexbox and grid. Its competitors are not other languages but the tools built on it: preprocessors like Sass, utility frameworks like Tailwind, and CSS-in-JS libraries, all of which still emit CSS.',
    links: [{ label: 'MDN CSS reference', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' }],
  },
  aws: {
    released: 2006,
    summary: "Amazon's cloud platform, and the hosting most of my professional work has run on.",
    history:
      'Amazon had built internal infrastructure to stop its own teams reinventing storage and servers, and realised the same thing could be sold by the hour. S3 and EC2 launched in 2006 and turned capital expenditure on hardware into an operating cost, which is what made small teams able to scale at all. Azure and Google Cloud are the direct rivals, with Cloudflare, Vercel and Fly competing at the edge for the workloads that do not need a full data centre.',
    links: [{ label: 'AWS documentation', url: 'https://docs.aws.amazon.com/' }],
  },
  redux: {
    released: 2015,
    summary: 'A predictable state container, these days used through Redux Toolkit rather than by hand.',
    history:
      'Dan Abramov wrote it for a conference talk, compressing Facebook’s Flux pattern into one store, plain actions and pure reducers — which made time-travel debugging possible. Its reputation for boilerplate was earned, and Redux Toolkit exists to answer it. Much of what it was used for turned out to be server data, which TanStack Query handles better; for genuinely global client state it now competes with Zustand, Jotai and React’s own context.',
    links: [{ label: 'Redux Toolkit', url: 'https://redux-toolkit.js.org/' }],
  },
  tanstack: {
    released: 2019,
    summary: 'A family of headless libraries — Query for server state, Table, Router and Store.',
    history:
      'Tanner Linsley started with React Query, on the observation that most "state management" was really caching data from a server, and that caching, revalidation and request deduplication should not be rewritten per project. The headless approach — logic without markup — spread to Table, Router and Form. It competes with SWR, Apollo Client for GraphQL, and RTK Query.',
    links: [{ label: 'TanStack Query', url: 'https://tanstack.com/query/latest' }],
  },
  mobx: {
    released: 2015,
    summary: 'State management built on observables, where derived values update themselves.',
    history:
      'Michel Weststrate built it as the opposite bet to Redux: rather than making every change an explicit action, track reads and writes automatically and re-render exactly what depended on the changed value. Less ceremony, at the cost of the explicit audit trail Redux gives you. The reactive idea it popularised has since been absorbed by Vue, Solid and Angular signals.',
    links: [{ label: 'MobX docs', url: 'https://mobx.js.org/' }],
  },
  tailwind: {
    released: 2017,
    summary: 'A utility-first CSS framework — styling composed from small classes rather than bespoke rules.',
    history:
      'Adam Wathan argued that naming things was the hard part of CSS, and that most class names were invented once and never reused. Tailwind replaces them with composable utilities and strips whatever the build does not use. It was widely called a return to inline styles, which is roughly the point. It competes with Bootstrap, with CSS-in-JS libraries like styled-components and Emotion, and with plain CSS modules.',
    links: [{ label: 'Tailwind CSS docs', url: 'https://tailwindcss.com/docs' }],
  },
  materialui: {
    released: 2014,
    summary: "React components implementing Google's Material Design.",
    history:
      'It arrived when React had no component ecosystem to speak of, offering a complete, opinionated design language out of the box so teams without a designer could ship something coherent. That opinion is also its cost: Material-styled apps look like Material apps. It competes with Ant Design, Chakra and the newer headless libraries that supply behaviour and leave the appearance to you.',
    links: [{ label: 'MUI docs', url: 'https://mui.com/material-ui/getting-started/' }],
  },
  chakraui: {
    released: 2019,
    summary: 'An accessible React component library with a style-prop API.',
    history:
      'Segun Adebayo built it around the complaint that most component libraries either dictated a look or left accessibility to the application. Chakra shipped accessible primitives with a style-prop API and no strong visual identity, so a team could restyle it without fighting it. It sits between MUI’s complete design language and the fully unstyled approach of Radix and Headless UI.',
    links: [{ label: 'Chakra UI docs', url: 'https://chakra-ui.com/docs' }],
  },
  radixui: {
    released: 2020,
    summary: 'Unstyled, accessible React primitives — dialogs, popovers, menus — with the behaviour already solved.',
    history:
      'From the team behind Modulz, on the premise that every product rebuilds the same dialog and dropdown and every one of them gets focus management, escape handling and ARIA slightly wrong. Radix ships that behaviour with no styling at all. It made the headless pattern mainstream, and underpins shadcn/ui. Its rivals are Headless UI, Ark UI and React Aria.',
    links: [{ label: 'Radix Primitives', url: 'https://www.radix-ui.com/primitives' }],
  },
  framermotion: {
    released: 2019,
    summary: 'A React animation library, notable for shared-element layout transitions.',
    history:
      'Spun out of the Framer design tool to give React a declarative way to animate — describe the states, let the library interpolate. Its standout trick is animating layout changes, moving an element between two positions in the tree as one continuous shape, which is otherwise painful. Now released independently as Motion. It competes with React Spring, GSAP, and increasingly with native CSS view transitions.',
    links: [{ label: 'Motion docs', url: 'https://motion.dev/docs/react' }],
  },
  reactnative: {
    released: 2015,
    summary: 'React for native iOS and Android, rendering real platform views.',
    history:
      'Facebook built it after concluding that its HTML5 mobile app had been a mistake, but that maintaining separate iOS and Android teams was worse. React Native keeps one React codebase and renders genuine platform widgets rather than a web view. Flutter is the main rival, painting its own pixels for perfect consistency at the cost of native feel; Expo now covers most of what made React Native hard to start.',
    links: [{ label: 'React Native docs', url: 'https://reactnative.dev/docs/getting-started' }],
  },
  prisma: {
    released: 2019,
    summary: 'A TypeScript ORM that generates a fully typed client from a schema file.',
    history:
      'It grew out of Graphcool, and inverted the usual ORM design: rather than inferring types from classes, you declare a schema and Prisma generates a client whose types match it exactly, so a bad query fails to compile. The trade is a generation step and a query engine between you and the database. Drizzle competes by staying closer to SQL, with TypeORM, Sequelize and Kysely also in the field.',
    links: [{ label: 'Prisma docs', url: 'https://www.prisma.io/docs' }],
  },
  drizzle: {
    released: 2022,
    summary: 'A TypeScript ORM that stays close to SQL, with types inferred from the schema.',
    history:
      'A reaction to Prisma’s abstraction: keep the full type safety, but let the query builder read like the SQL it produces, with no extra engine at runtime and no generation step. That makes it a natural fit for serverless and edge runtimes, where a separate binary is awkward. It competes directly with Prisma and Kysely.',
    links: [{ label: 'Drizzle ORM docs', url: 'https://orm.drizzle.team/docs/overview' }],
  },
  sequelize: {
    released: 2010,
    summary: 'A long-standing Node ORM for SQL databases.',
    history:
      'One of the first serious ORMs for Node, from an era when the alternative was assembling SQL strings by hand. It brought models, associations and migrations to a young ecosystem and carried a great many production apps. Written before TypeScript was common, its typing has always been retrofitted, which is the opening Prisma and Drizzle walked through.',
    links: [{ label: 'Sequelize docs', url: 'https://sequelize.org/docs/v6/getting-started/' }],
  },
  claude: {
    released: 2023,
    summary: "Anthropic's family of language models, used both through the API and as a coding assistant.",
    history:
      'Anthropic was founded in 2021 by former OpenAI researchers, with safety research as the stated reason for building frontier models at all. Claude launched publicly in 2023 and is trained with Constitutional AI, where the model critiques its own output against a written set of principles rather than relying solely on human ranking. It competes with OpenAI’s GPT models, Google’s Gemini, and open-weight families such as Llama and Qwen.',
    links: [
      { label: 'Anthropic API docs', url: 'https://docs.anthropic.com/' },
      { label: 'Claude Code', url: 'https://claude.com/claude-code' },
    ],
  },
  codex: {
    released: 2021,
    summary: "OpenAI's code model, and the coding agent that now carries the name.",
    history:
      'The original Codex was a GPT-3 descendant fine-tuned on public code, and the model behind the first GitHub Copilot — the point at which autocomplete stopped guessing the next token and started writing whole functions. The name now belongs to OpenAI’s coding agent. It competes with Claude Code, Copilot, Cursor and Gemini Code Assist.',
    links: [{ label: 'OpenAI platform docs', url: 'https://platform.openai.com/docs' }],
  },
  stripe: {
    released: 2011,
    summary: 'Payments infrastructure — checkout, subscriptions, billing and webhooks.',
    history:
      'The Collison brothers started it because taking payments online meant a merchant account, a gateway and weeks of paperwork before the first charge. Stripe reduced that to an API key and a few lines of code. Its documentation is still the reference other companies are measured against. It competes with PayPal and Braintree, Adyen at enterprise scale, and Square where the seller also trades in person.',
    links: [{ label: 'Stripe docs', url: 'https://docs.stripe.com/' }],
  },
  square: {
    released: 2009,
    summary: 'Payments and point-of-sale APIs, aimed at businesses that sell in person as well as online.',
    history:
      'Founded by Jack Dorsey and Jim McKelvey after McKelvey lost a sale for want of a way to take a card. The original product was a reader that plugged into a phone’s headphone jack, putting card payments within reach of sellers no bank would underwrite. It has since grown into a full commerce platform. It competes with Stripe online, and with Toast, Clover and SumUp at the counter.',
    links: [{ label: 'Square developer docs', url: 'https://developer.squareup.com/docs' }],
  },
  jest: {
    released: 2014,
    summary: 'A JavaScript testing framework, still the default for Node and React codebases.',
    history:
      'Built at Facebook so tests would run without assembling a runner, an assertion library and a mocking library separately. It shipped all three, plus parallel execution and snapshot testing, which made asserting on rendered output practical. Vitest now competes hard on speed by building on Vite, with Mocha, Jasmine and Node’s own built-in test runner also in the field.',
    links: [{ label: 'Jest docs', url: 'https://jestjs.io/docs/getting-started' }],
  },
  express: {
    released: 2010,
    summary: 'The minimal HTTP framework that has been the default way to write a Node server for over a decade.',
    history:
      'TJ Holowaychuk wrote it over Node’s bare HTTP module, borrowing the middleware chain from Ruby’s Sinatra: a request passes through a stack of small functions, each free to handle it or pass it along. It deliberately shipped almost nothing else, which is why it outlived heavier contemporaries. Fastify competes on throughput, Koa and Hono on a modern async API, and NestJS on structure for large teams.',
    links: [{ label: 'Express docs', url: 'https://expressjs.com/' }],
  },
  nestjs: {
    released: 2017,
    summary: 'An opinionated Node framework with modules, dependency injection and decorators.',
    history:
      'Built to answer the thing Express deliberately left open: how to organise a large server codebase. It borrows Angular’s architecture — modules, providers, DI — so teams stop inventing a folder structure per project. That structure is exactly the trade against Express, which asks for less and assumes you will supply the rest.',
    links: [{ label: 'NestJS docs', url: 'https://docs.nestjs.com/' }],
  },
  mysql: {
    released: 1995,
    summary: 'The relational database that ran most of the early web.',
    history:
      'Built by MySQL AB as something fast, free and simple enough to sit behind a website, at a time when the alternative was an expensive Oracle licence. It became the M in LAMP and the default for a generation of web apps. Sun bought it, then Oracle, which prompted the MariaDB fork. Postgres has since taken much of its ground on correctness and features.',
    links: [{ label: 'MySQL docs', url: 'https://dev.mysql.com/doc/' }],
  },
  recoil: {
    released: 2020,
    summary: 'An experimental React state library built around atoms and derived selectors.',
    history:
      'A Facebook experiment aimed at state that is shared but fragmented — many small independent pieces, where one store re-rendering everything is wasteful. Components subscribe to individual atoms, and selectors derive from them. Development has since stalled, and the idea lives on in Jotai and Zustand, which took the same atom model further.',
    links: [{ label: 'Recoil docs', url: 'https://recoiljs.org/' }],
  },
  photoshop: {
    released: 1990,
    summary: "Adobe's raster image editor.",
    history:
      'Written by Thomas and John Knoll — one a PhD student, the other at Industrial Light & Magic — and licensed to Adobe, it arrived as desktop publishing was putting image editing within reach of people who were not running a print shop. It has been the professional default for so long that its name became the verb. It competes with Affinity Photo, GIMP, Procreate on tablets, and Figma for interface work.',
    links: [{ label: 'Photoshop', url: 'https://www.adobe.com/products/photoshop.html' }],
  },
};
