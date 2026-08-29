export interface Letter {
  company: string;
  id: string;
  name: string;
  quote: string;
  title: string;
}

/** Ordered oldest role first, which is also the tab order on the About page. */
export const LETTERS: Letter[] = [
  {
    id: 'steve-swanson',
    name: 'Steve Swanson',
    company: 'Shift Pixy',
    title: 'Director of Engineering',
    quote:
      'His commitment to delivering high quality results is evident in every task he undertakes, going above and beyond to ensure that his work meets and exceeds expectations.',
  },
  {
    id: 'hines-tran',
    name: 'Hines Tran',
    company: 'Shift Pixy',
    title: 'Product Owner',
    quote:
      "Under his leadership, our team's productivity and cohesion noticeably improved, resulting in successful project deliveries.",
  },
  {
    id: 'andrei-budoi',
    name: 'Andrei Budoi',
    company: 'Legit Script',
    title: 'Team Lead',
    quote:
      'What gives that input its weight is his deep expertise in frontend development, which was in short supply when he joined the team. He stays current with the industry and has always made that knowledge available to the rest of the team as we built out front-end staffing',
  },
  {
    id: 'aaron-everly',
    name: 'Aaron Everly',
    company: 'Legit Script',
    title: 'UI Designer',
    quote:
      'Speaking from the UI/UX designer role, his input on new features, product improvements, and UI/UX considerations has repeatedly proven valuable.',
  },
];

/**
 * The letter the landing page leads with. Change this id and both the landing
 * quote and the card it jumps to follow, because they read the same record.
 */
export const FEATURED_LETTER_ID = 'steve-swanson';

export const featuredLetter = LETTERS.find(({ id }) => id === FEATURED_LETTER_ID) as Letter;

/** The one place the letters' filename convention is spelled out. */
export const letterUrl = (name: string) => `/pdfs/recommendations/${name} - Letter of Recommendation for Davi Caamano.pdf`;

/** Anchor the landing quote scrolls to once it has switched slides. */
export const letterAnchorId = (id: string) => `letter-${id}`;
