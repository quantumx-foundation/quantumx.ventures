/**
 * Hosts, venues and programmes QuantumX has run sessions with or joined.
 * Sourced from the QuantumX Community website. Shown as names, not logos:
 * these are rooms the team has been in, not formal partnerships.
 */

export const roomsIntro = {
  label: "Rooms we've been in",
  body: "Hosts, venues and programmes we've run sessions with or joined.",
} as const;

export const rooms: readonly { name: string; note?: string }[] = [
  { name: 'IBM Qiskit Fall Fest', note: 'Official host 2026' },
  { name: 'National Quantum Mission' },
  { name: 'Department of Science & Technology, India' },
  { name: 'University of Oxford' },
  { name: 'Imperial College London' },
  { name: 'University of Bristol' },
  { name: 'IIT Delhi' },
  { name: 'IISc Bengaluru' },
  { name: 'DIFC Innovation Hub' },
  { name: 'ISTE' },
  { name: 'Manipal Institute of Technology' },
  { name: 'IIIT Hyderabad' },
  { name: 'BQIT:26' },
  { name: 'Engine Shed Bristol' },
  { name: 'TinkerHub Foundation' },
  { name: 'Startup Park Bengaluru' },
  { name: 'Girls in Quantum' },
  { name: 'HKBK Group of Institutions' },
  { name: 'Kristu Jayanti University' },
  { name: 'VIT Chennai' },
  { name: 'Woi.eco' },
  { name: 'QETCI' },
  { name: 'Freshworks' },
  { name: 'Women in Product' },
];
