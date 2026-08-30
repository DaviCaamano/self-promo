/**
 * When each opening finishes, for the things that have to wait them out.
 *
 * These mirror timings that live in the stylesheets, so they are the one place
 * to correct if those move. Nothing reads them to *drive* an animation — only
 * to know when one is over.
 */

/**
 * The landing sequence's last beat is the pull quote's "read the letter" line:
 * `--intro-credit` (`--intro-start` + 1700ms) plus its own 300ms offset and its
 * 700ms run. See `selfie.module.scss` and `pull-quote.module.scss`.
 */
export const LANDING_INTRO_ENDS_MS = 3450;

/**
 * A section's scroll reveal, for a page that opens on one. Its pieces are
 * observed the moment the page lands on them and arrive on the section default:
 * a capped 240ms of stagger plus a 620ms run. See `section.module.scss`.
 */
export const SECTION_REVEAL_ENDS_MS = 900;
