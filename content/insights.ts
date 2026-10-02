/**
 * Insights: articles published by QuantumX.
 *
 * These are real articles from the QuantumX Foundation blog. Each links out to
 * the full piece. Add new entries at the top; the list is sorted by date at
 * render time, so order here does not matter.
 */

export type InsightKind = 'Analysis' | 'Security' | 'Explainer';

export type Insight = {
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  kind: InsightKind;
  href: string;
  publisher: string;
  /** Shown on the homepage when true. */
  featured?: boolean;
};

const blog = (slug: string) => `https://quantumx.foundation/blog/${slug}/`;
const publisher = 'QuantumX Foundation';

export const insightKinds: readonly InsightKind[] = ['Analysis', 'Security', 'Explainer'];

export const insights: readonly Insight[] = [
  {
    title: 'The Next 5-Year Investment Window in Quantum Computing Technology',
    description:
      'Where the opportunities are, why India is well placed, the real risks, and why the next five years build the foundation.',
    date: '2026-09-15',
    kind: 'Analysis',
    href: blog('the-next-5-year-investment-window-in-quantum-computing'),
    publisher,
    featured: true,
  },
  {
    title: 'Quantum AI: How 2 Revolutionary Technologies Are Reshaping the Future',
    description:
      'Where artificial intelligence and quantum computing meet: quantum machine learning, real applications in pharma, finance and materials, and the limits.',
    date: '2026-08-20',
    kind: 'Analysis',
    href: blog('quantum-ai-where-ai-and-quantum-computing-converge'),
    publisher,
    featured: true,
  },
  {
    title: 'Industries That Could Be Transformed by Quantum Computing in the Next Decade',
    description:
      'Seven industries where quantum computing could make the biggest difference, from drug discovery and cybersecurity to logistics, finance, energy and materials.',
    date: '2026-07-02',
    kind: 'Analysis',
    href: blog('industries-transformed-by-quantum-computing'),
    publisher,
    featured: true,
  },
  {
    title: 'Beginner-Friendly Online Courses to Learn Quantum Computing Concepts (2026)',
    description:
      'Five beginner-friendly quantum computing courses compared, with who each one suits and what it costs.',
    date: '2026-06-12',
    kind: 'Explainer',
    href: blog('beginner-friendly-quantum-computing-courses'),
    publisher,
  },
  {
    title: 'Superposition Isn’t “Both at Once”: Here’s What It Really Means',
    description:
      'What a quantum state actually is, what measurement does, and a better mental model for superposition.',
    date: '2026-05-25',
    kind: 'Explainer',
    href: blog('superposition-isnt-both-at-once'),
    publisher,
  },
  {
    title: 'Qubits Explained: From Bits to Quantum Bits in 10 Minutes',
    description:
      'What a qubit really is, from amplitudes and the Bloch sphere to measurement, and why N qubits need 2^N numbers.',
    date: '2026-05-11',
    kind: 'Explainer',
    href: blog('qubits-explained-from-bits-to-quantum-bits'),
    publisher,
  },
  {
    title: 'How Beginners Can Get Into Quantum Computing: A Practical 90-Day Path',
    description:
      'The real prerequisites, the best free resources, a 90-day learning path, and how to find a community that keeps you going.',
    date: '2026-05-05',
    kind: 'Explainer',
    href: blog('how-beginners-can-get-into-quantum-computing'),
    publisher,
  },
  {
    title: 'What Is Quantum Computing? A No-Physics-Degree Explanation',
    description:
      'Qubits, superposition, entanglement and interference explained through everyday analogies, plus what quantum computers can and cannot do.',
    date: '2026-04-23',
    kind: 'Explainer',
    href: blog('what-is-quantum-computing'),
    publisher,
  },
  {
    title: 'What Breaks First During a Post-Quantum Migration?',
    description:
      'Algorithms, infrastructure, or governance? Why post-quantum migrations usually stall at the governance layer long before a single algorithm changes.',
    date: '2026-01-13',
    kind: 'Security',
    href: blog('what-breaks-first-during-a-post-quantum-migration'),
    publisher,
  },
  {
    title: 'Designing for a Quantum-Safe World',
    description:
      'Why harvest-now-decrypt-later risk exists today, why post-quantum cryptography is only one layer, and how to prepare now.',
    date: '2025-12-17',
    kind: 'Security',
    href: blog('designing-for-a-quantum-safe-world'),
    publisher,
  },
];

export function sortedInsights(list: readonly Insight[] = insights): Insight[] {
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
}

/** Formats an ISO date as "15 SEP 2026" without relying on the runtime locale. */
export function formatInsightDate(iso: string): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${months[m - 1]} ${y}`;
}
