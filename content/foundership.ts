/**
 * QuantumX Foundership Program application options.
 * Keep in sync with the "foundership" form in public/__forms.html.
 */

/** Where the application page lives. Linked from the homepage and footer. */
export const applyHref = '/foundership-apply/';

/** Homepage section copy. */
export const foundershipHome = {
  heading: 'Building in quantum? Apply to the QuantumX Foundership Program.',
  lead: 'Tell us what you need. Fill in a short form and we will reach out with the details.',
  cta: 'Apply now',
};

/** What a founder can ask the program for. */
export const supportOptions = [
  'Investment',
  'Incubation',
  'Mentorship',
  'Lab and hardware access',
  'Co-founder matching',
  'Go-to-market and partnerships',
  'Hiring and talent',
] as const;

export const stages = ['Idea', 'Research result', 'Prototype', 'Early customers', 'Revenue'] as const;

/** Focus areas founders can pick from. */
export const focusAreas = [
  'Quantum Computing',
  'Quantum Communication & Networking',
  'Quantum Sensing & Metrology',
  'Quantum Materials & Devices',
  'Quantum Software & Algorithms',
  'Post-Quantum Cryptography & Quantum Security',
  'Quantum AI & Machine Learning',
  'Quantum Applications & Industry Solutions',
  'Quantum Infrastructure & Enabling Technologies',
  'Quantum Education & Workforce Development',
  'Other',
] as const;

export const teamSizes = ['Solo founder', '2–3 people', '4 or more'] as const;

export const commitments = ['Full-time', 'Part-time', 'Still in a lab or university'] as const;

export const referralSources = [
  'X',
  'LinkedIn',
  'Event or hackathon',
  'Friend or referral',
  'QuantumX Foundation',
  'Search',
  'Other',
] as const;
