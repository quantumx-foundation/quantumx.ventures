/**
 * Studio model content: what the studio does, how it differs from a fund,
 * who it works with, and the venture-building process.
 *
 * This describes the operating model the studio is designed around. Edit it
 * as the model is refined, and keep claims to what the studio actually does.
 */

export const studioIntro = {
  statement:
    'QuantumX Ventures is a venture studio for quantum technology. We start companies alongside the people doing the science, instead of waiting to invest in them later.',
  body: [
    'Quantum technology rarely fails for lack of good research. It stalls in the gap between a working result and a company that can carry it: a team, a product, a first customer, and the patience to get there.',
    'A venture studio exists to close that gap. We work with researchers, founders and engineers from the earliest stage, contributing people, technical work and company-building support, then stay involved as the venture grows.',
  ],
} as const;

/** Side-by-side comparison of a studio and a conventional fund. */
export const studioVsFund = {
  fund: {
    label: 'A conventional fund',
    points: [
      'Waits for a company to exist, then decides whether to invest.',
      'Contributes capital and advice from the outside.',
      'Spreads attention across a large portfolio.',
    ],
  },
  studio: {
    label: 'The QuantumX Ventures studio',
    points: [
      'Starts before the company exists, often from a research result or a market problem.',
      'Contributes people, engineering and company-building work from the inside.',
      'Builds a small number of ventures with deep, sustained involvement.',
    ],
  },
} as const;

export type Capability = { number: string; title: string; description: string };

export const capabilities: readonly Capability[] = [
  {
    number: '01',
    title: 'Venture creation',
    description:
      'We originate companies around specific opportunities in the quantum stack, from first hypothesis to incorporation, and carry them through their earliest and most fragile stage.',
  },
  {
    number: '02',
    title: 'Founder collaboration',
    description:
      'We work with founders as co-builders, not observers. That means shared work on strategy, hiring, positioning and the decisions that shape a young company.',
  },
  {
    number: '03',
    title: 'Research commercialisation',
    description:
      'We help researchers test whether a result can become a product: who needs it, what it must do outside the lab, and what a credible path to market looks like.',
  },
  {
    number: '04',
    title: 'Technical product development',
    description:
      'Our engineers build alongside venture teams, turning research code and prototypes into software and systems that customers can evaluate and use.',
  },
  {
    number: '05',
    title: 'Strategic support',
    description:
      'We connect ventures to the wider QuantumX network of researchers, developers, educators and partners, and help them prepare for customers and future investors.',
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  summary: string;
  detail: string;
};

export const process: readonly ProcessStep[] = [
  {
    number: '01',
    title: 'Identify',
    summary: 'Find an opportunity worth a company.',
    detail:
      'We start from a research result, a technical capability, or a problem the market has not solved. The question is simple: is there a company here that only quantum technology makes possible?',
  },
  {
    number: '02',
    title: 'Validate',
    summary: 'Test the technology and the market.',
    detail:
      'We pressure-test the science against real hardware constraints and the business against real buyers. Most ideas stop here, and that is the point of the stage.',
  },
  {
    number: '03',
    title: 'Assemble',
    summary: 'Form the founding team.',
    detail:
      'We bring together the right mix of scientific, technical and commercial founders, from inside and outside the QuantumX network, around a venture that has earned it.',
  },
  {
    number: '04',
    title: 'Build',
    summary: 'Build the product and launch.',
    detail:
      'Studio engineers and the founding team ship a first product, put it in front of users, and establish the company as an independent entity.',
  },
  {
    number: '05',
    title: 'Scale',
    summary: 'Support growth.',
    detail:
      'Once a venture stands on its own, we stay close: helping with hiring, partnerships and fundraising preparation as the company grows.',
  },
];

export type Audience = { title: string; description: string };

export const audiences: readonly Audience[] = [
  {
    title: 'Founders',
    description:
      'You are building, or want to build, a company in quantum technology and want a partner who works on the company with you.',
  },
  {
    title: 'Researchers',
    description:
      'You have a result, a method or a prototype and want to understand whether it can become a product and a company.',
  },
  {
    title: 'Technical teams',
    description:
      'You are engineers or developers with deep capability in quantum software, hardware or security looking for the right problem.',
  },
  {
    title: 'Partners',
    description:
      'You are an institution, corporate or investor that wants to work with the studio on ventures, programmes or co-investment.',
  },
];
