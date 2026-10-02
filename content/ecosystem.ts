/**
 * The wider QuantumX ecosystem the studio belongs to.
 * Sourced from the QuantumX Foundation website (company page and newsroom).
 */

export type Pillar = {
  number: string;
  title: string;
  description: string;
  /** What this pillar contributes to ventures built in the studio. */
  forVentures: string;
  href: string;
  current?: boolean;
};

export const ecosystemIntro = {
  heading: 'Part of a working quantum ecosystem',
  body: 'QuantumX Foundation is a deep-tech company building an open, accessible and reliable quantum future. It designs quantum and post-quantum technology, trains quantum talent, and grows a global community around both. The studio is where that work becomes companies.',
} as const;

export const pillars: readonly Pillar[] = [
  {
    number: '01',
    title: 'QuantumX Ventures',
    description: 'The venture studio, building the next generation of quantum companies.',
    forVentures: 'Venture creation, founder collaboration and company building.',
    href: '/',
    current: true,
  },
  {
    number: '02',
    title: 'QuantumX Technology',
    description: 'Quantum software and post-quantum security tools, including QxACE, Quark and DsynQ.',
    forVentures: 'Engineering depth and hands-on experience shipping quantum tools.',
    href: 'https://quantumx.foundation/projects/',
  },
  {
    number: '03',
    title: 'QuantumX School',
    description: 'Open, accessible quantum education for students and engineers.',
    forVentures: 'A pipeline of people trained in quantum computing and security.',
    href: 'https://quantumx.school/',
  },
  {
    number: '04',
    title: 'QuantumX Community',
    description: 'Events, hackathons and meetups for the global quantum community.',
    forVentures: 'Access to researchers, developers and early adopters.',
    href: 'https://quantumx.community/',
  },
];

/** Technology QuantumX has already built and released. Not studio ventures. */
export const shippedTechnology: readonly { name: string; description: string; href: string }[] = [
  {
    name: 'QxACE',
    description: 'Orchestrates post-quantum encryption strategies in real time against live risk context.',
    href: 'https://quantumx.foundation/projects/qxace/',
  },
  {
    name: 'Quark',
    description: 'Open-source tool that fingerprints equivalent quantum circuits at scale.',
    href: 'https://quantumx.foundation/projects/qxquark/',
  },
  {
    name: 'DsynQ',
    description: 'AI-assisted design platform for fabrication-ready quantum photonic chip layouts.',
    href: 'https://quantumx.foundation/projects/dsynq/',
  },
];

export const launchMilestone = {
  heading: 'Officially launched',
  body: "QuantumX Foundation was officially launched by the Hon'ble Chief Minister of Karnataka, Shri D.K. Shivakumar, joining Karnataka's Quantum Mission.",
} as const;
