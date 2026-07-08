/** One-off: move LAWYERS and TESTIMONIALS from legacy constants into /content. */
import { writeFileSync } from 'node:fs';
import { LAWYERS, TESTIMONIALS } from '../legacy/constants';

const lawyers = LAWYERS.map((l) => ({
  id: l.id,
  name: l.name,
  practiceAreas: l.practiceAreas,
  bio: l.bio,
  location: l.location,
  languages: l.languages,
  // photoUrl/rating/reviews intentionally dropped: photos don't exist in
  // /public, and ratings/superlatives sit badly with a neutral BCI-compliant
  // listing.
}));
writeFileSync('content/lawyers.json', JSON.stringify(lawyers, null, 2) + '\n');
writeFileSync('content/testimonials.json', JSON.stringify(TESTIMONIALS, null, 2) + '\n');
console.log('lawyers:', lawyers.length, 'testimonials:', TESTIMONIALS.length);
