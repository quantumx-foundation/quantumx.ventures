/**
 * People shown on the site.
 *
 * QuantumX Ventures is led by the QuantumX founding team. Names, roles, bios
 * and photographs come from the QuantumX Foundation company page. Add studio
 * team members here as they join, using only confirmed details.
 */

export type Person = {
  name: string;
  role: string;
  /** One or two sentences for cards. */
  summary: string;
  photo: { src: string; alt: string; width: number; height: number };
  /** Full profile on the QuantumX Foundation site. */
  profileUrl?: string;
  linkedin?: string;
  x?: string;
};

export const peopleIntro = {
  heading: 'The founding team',
  body: 'QuantumX Ventures is led by the founders of QuantumX, who bring together quantum science, product engineering and venture building.',
} as const;

export const people: readonly Person[] = [
  {
    name: 'Ajmal Ibn Mohammed Althaf',
    role: 'Founder, CEO & Scientific Lead',
    summary:
      'Leads QuantumX and its scientific agenda across photonic device design, circuit-level tooling and post-quantum cryptography, alongside doctoral research in Molecular Quantum Mechanics.',
    photo: {
      src: '/images/people/ajmal.webp',
      alt: 'Portrait of Ajmal Ibn Mohammed Althaf speaking on stage',
      width: 800,
      height: 800,
    },
    profileUrl: 'https://quantumx.foundation/founder/ajmal/',
    linkedin: 'https://www.linkedin.com/in/ajmal-ima/',
    x: 'https://x.com/ajmalphyx',
  },
  {
    name: 'Muhammed Ameen Sulaiman',
    role: 'Co-Founder & CTO',
    summary:
      'Leads technology, product and engineering at QuantumX, from system architecture to deployment. Works with researchers and engineers to turn quantum research into platforms, developer infrastructure and research tooling.',
    photo: {
      src: '/images/people/ameen.webp',
      alt: 'Portrait of Muhammed Ameen Sulaiman',
      width: 800,
      height: 800,
    },
    profileUrl: 'https://quantumx.foundation/founder/ameen/',
    linkedin: 'https://www.linkedin.com/in/ameenx/',
    x: 'https://x.com/emeenx',
  },
  {
    name: 'Abdul Samad',
    role: 'Co-Founder & Venture Architect',
    summary:
      'Designs and leads the QuantumX venture pipeline, from spotting where ambitious technology can become a company to forming the products and partnerships around it.',
    photo: {
      src: '/images/people/samad.webp',
      alt: 'Portrait of Abdul Samad',
      width: 828,
      height: 1104,
    },
    profileUrl: 'https://quantumx.foundation/founder/samad/',
    linkedin: 'https://www.linkedin.com/in/4samad/',
    x: 'https://x.com/_4samad',
  },
];
