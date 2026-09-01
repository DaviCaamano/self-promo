/**
 * When each opening finishes, for the things that have to wait them out.
 *
 * These mirror timings that live in the stylesheets, so they are the one place
 * to correct if those move. Nothing reads them to *drive* an animation — only
 * to know when one is over.
 */

/**
 * The deck's opening. The page lands on the first preview alone and it turns
 * away by itself, with nothing arriving behind it, before the deck falls into
 * its loop. One step of that loop — keep this equal to `--card-step` in
 * `project-deck.module.scss`.
 */
export const DECK_OPENING_MS = 2000;

/**
 * The landing sequence's last beat is the pull quote's "read the letter" line:
 * `--intro-credit` (`--intro-start` + 1700ms) plus its own 300ms offset and its
 * 700ms run. `--intro-start` is half a second past the deck's opening, so the
 * page begins arriving while the second preview is still on its way in.
 * See `selfie.module.scss` and `pull-quote.module.scss`.
 */
export const LANDING_INTRO_ENDS_MS = 5200;

/** The nav rail's own run, which follows the sequence above rather than
 *  overlapping it. See `side-nav.module.scss` and `mobile-nav.module.scss`. */
export const NAV_INTRO_MS = 560;

/**
 * A section's scroll reveal, for a page that opens on one. Its pieces are
 * observed the moment the page lands on them and arrive on the section default:
 * a capped 240ms of stagger plus a 620ms run. See `section.module.scss`.
 */
export const SECTION_REVEAL_ENDS_MS = 900;
