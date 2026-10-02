/**
 * Venture thesis: areas of interest across the quantum technology stack.
 *
 * These are areas the studio is interested in building in. They are not a
 * list of active investments. Set `status` to describe each area honestly.
 */

export type ThesisArea = {
  number: string;
  slug: string;
  title: string;
  summary: string;
  /** Longer explanation used on the /thesis page. */
  detail: string;
  /** Questions a venture in this area should be able to answer. */
  questions: readonly string[];
  /** Kept as "Area of interest" until there is a venture to point to. */
  status: 'Area of interest';
};

export const thesisIntro = {
  statement:
    'Quantum technology is moving from laboratories into products. We are interested in the companies that will make that transition real, across every layer of the stack.',
  note: 'These are areas of interest for the studio, not a list of active investments.',
} as const;

export const thesisAreas: readonly ThesisArea[] = [
  {
    number: '01',
    slug: 'computing',
    title: 'Quantum computing',
    summary: 'Hardware approaches, architectures and the systems that make qubits usable.',
    detail:
      'Progress in quantum computing is measured in coherence, fidelity and error budgets, not announcements. We are interested in teams whose architecture decisions hold up against those constraints as they exist today.',
    questions: [
      'What does the approach do better than existing modalities, and at what scale?',
      'Which component or capability could become a product before a full machine exists?',
    ],
    status: 'Area of interest',
  },
  {
    number: '02',
    slug: 'software',
    title: 'Quantum software',
    summary: 'Algorithms, compilers, tooling and applications for near-term and future hardware.',
    detail:
      'Software is where most users will meet quantum computing. We look for tools and applications that make today’s hardware more useful, and for domain applications in chemistry, materials, optimisation and machine learning where the advantage case is concrete.',
    questions: [
      'Who uses this today, and what do they use instead?',
      'How does the product stay relevant as the hardware changes underneath it?',
    ],
    status: 'Area of interest',
  },
  {
    number: '03',
    slug: 'security',
    title: 'Post-quantum security',
    summary: 'Cryptographic migration, assessment and quantum-safe infrastructure.',
    detail:
      'Quantum computers will break the public-key cryptography that protects most of the internet. The migration to post-quantum security is already underway, and it is as much an organisational problem as a technical one.',
    questions: [
      'Which part of the migration does the product make measurably easier?',
      'Who owns the budget for this problem inside the customer?',
    ],
    status: 'Area of interest',
  },
  {
    number: '04',
    slug: 'sensing',
    title: 'Quantum sensing',
    summary: 'Measurement and imaging that exploits quantum effects for precision.',
    detail:
      'Quantum sensors can measure fields, time and motion with precision classical devices cannot match. Some of the earliest commercial quantum markets may form here, in navigation, medical imaging and materials inspection.',
    questions: [
      'What decision does the improved measurement change for the customer?',
      'Can the device leave the lab: size, cost, power and robustness?',
    ],
    status: 'Area of interest',
  },
  {
    number: '05',
    slug: 'infrastructure',
    title: 'Infrastructure and enabling technology',
    summary: 'Photonics, control systems, cryogenics, design tools and the supply chain.',
    detail:
      'Every quantum system depends on components and tools that are businesses in their own right: photonic chips, control electronics, cryogenic systems and the design software that ties them together.',
    questions: [
      'Which quantum platforms depend on this, and how many of them are there?',
      'Is there a path to manufacturing at the volume the market will need?',
    ],
    status: 'Area of interest',
  },
];

/** What the studio looks for in any venture, regardless of area. */
export const ventureCriteria: readonly { title: string; description: string }[] = [
  {
    title: 'A real technical edge',
    description: 'A result, capability or insight that is hard to replicate and grounded in how the hardware actually behaves.',
  },
  {
    title: 'A customer with a problem',
    description: 'Someone specific who needs this, and a way to reach them before the technology is fully mature.',
  },
  {
    title: 'Founders who will stay',
    description: 'People committed to building a company over years, with the honesty to change course when the evidence says so.',
  },
  {
    title: 'A reason for a studio',
    description: 'Work the studio can genuinely accelerate: engineering, team formation, go-to-market or access to the QuantumX network.',
  },
];
