export default [
  {
    id: 's3-classes', domain: 3, title: 'S3 storage classes',
    columns: ['Storage class', 'Access pattern', 'Retrieval', 'AZs', 'Min. duration', 'Use when'],
    rows: [
      ['S3 Standard', 'Frequent', 'Milliseconds', '≥3', 'None', 'Default: active data, websites, apps'],
      ['S3 Intelligent-Tiering', 'Unknown / changing', 'Milliseconds (opt-in archive tiers slower)', '≥3', 'None', "Can't predict access; small per-object monitoring fee, no retrieval fees"],
      ['S3 Express One Zone', 'Very frequent, latency-critical', 'Single-digit ms', '1', 'None', 'Fastest S3 for ML/analytics; directory buckets'],
      ['S3 Standard-IA', 'Infrequent', 'Milliseconds', '≥3', '30 days', 'Backups/DR you rarely read but need instantly'],
      ['S3 One Zone-IA', 'Infrequent, re-creatable', 'Milliseconds', '1', '30 days', 'Secondary copies; lost if the AZ is destroyed'],
      ['S3 Glacier Instant Retrieval', '~Once a quarter', 'Milliseconds', '≥3', '90 days', 'Archive that must open instantly (medical images)'],
      ['S3 Glacier Flexible Retrieval', '1–2 times a year', 'Expedited 1–5 min, standard 3–5 h, bulk 5–12 h', '≥3', '90 days', 'Backups/archives where waiting is fine'],
      ['S3 Glacier Deep Archive', 'Once a year or less', 'Standard ≤12 h, bulk ≤48 h', '≥3', '180 days', 'Cheapest: 7–10 year compliance retention, tape replacement'],
      ['S3 on Outposts', 'Data must stay on-premises', 'Local', 'Your site', '—', 'Data residency / local processing on AWS Outposts'],
    ],
    tips: [
      '"Infrequent but needed in milliseconds" → Standard-IA. About once a quarter → Glacier Instant Retrieval.',
      '"Unknown or changing access pattern" → Intelligent-Tiering, every time.',
      '"Re-creatable" or "non-critical" + cheapest infrequent → One Zone-IA. Never for the only copy of important data.',
      '"Lowest cost archive, 12 hours is fine" → Deep Archive. Needed within minutes → Glacier Flexible Retrieval (expedited).',
      'All classes have 11 nines (99.999999999%) durability. They differ in availability, AZ count and price.',
      'Moving objects between classes automatically on a schedule → S3 Lifecycle policies. S3 Reduced Redundancy is legacy and a distractor.',
    ],
  },
];
