export default [
  {
    id: 'caf-perspectives', domain: 1, title: 'AWS CAF: the 6 perspectives',
    columns: ['Perspective', 'Type', 'Focus', 'Example capabilities', 'Typical stakeholders'],
    rows: [
      ['Business', 'Business', 'Cloud investments speed up business outcomes', 'Strategy, portfolio, innovation and product management; data monetization', 'CEO, CFO, COO, CIO, CTO'],
      ['People', 'Business', 'Culture and skills bridge technology and business', 'Culture evolution, cloud fluency, workforce transformation, change acceleration', 'CIO, COO, CTO, HR, cloud director'],
      ['Governance', 'Business', 'Maximize benefits, minimize risk', 'Program/project mgmt, benefits mgmt, risk mgmt, cloud financial mgmt, data governance', 'CTO, CIO, CFO, CDO, CRO, chief transformation officer'],
      ['Platform', 'Technical', 'Build an enterprise-grade, scalable cloud platform', 'Platform/data architecture, platform/data engineering, provisioning, CI/CD', 'CTO, technology leaders, architects, engineers'],
      ['Security', 'Technical', 'Confidentiality, integrity, availability', 'Security governance, IAM, threat detection, vulnerability mgmt, data protection, incident response', 'CISO, CCO, internal audit, security architects'],
      ['Operations', 'Technical', 'Deliver services at the agreed level', 'Observability, event mgmt, incident/problem mgmt, change & release, patch mgmt', 'Infrastructure & operations leaders, SREs, IT service managers'],
    ],
    tips: [
      'Business, People, Governance = business capabilities. Platform, Security, Operations = technical capabilities.',
      'Training, culture and change management → People, not Business.',
      'Cloud financial management and risk management → Governance, not Business.',
      'Platform builds the environment (architecture, CI/CD); Operations runs it (monitoring, incidents, patching).',
      'Exam guide v1.3 business outcomes: reduced business risk; improved ESG performance; increased revenue; increased operational efficiency.',
    ],
  },
  {
    id: 'caf-phases', domain: 1, title: 'AWS CAF: transformation phases',
    columns: ['Phase', 'What happens', 'Clue words'],
    rows: [
      ['1. Envision', 'Show how the cloud accelerates business outcomes; identify and prioritize opportunities', 'opportunities, prioritize, business outcomes'],
      ['2. Align', 'Find capability gaps and cross-organizational dependencies across the 6 perspectives; build readiness strategies', 'gaps, dependencies, readiness, stakeholder alignment'],
      ['3. Launch', 'Deliver pilot initiatives in production; demonstrate incremental value', 'pilot, production, incremental value'],
      ['4. Scale', 'Expand pilots to the desired scale; realize and sustain the benefits', 'expand, organization-wide, sustain benefits'],
    ],
    tips: [
      'Order: Envision → Align → Launch → Scale. The journey is iterative.',
      '"Pilot" points to Launch; "expand the pilot" points to Scale.',
      'The four transformation domains are Technology, Process, Organization and Product. Don\'t confuse them with the six perspectives.',
    ],
  },
  {
    id: 'security-pillar', domain: 1, title: 'Well-Architected: Security pillar principles',
    columns: ['Design principle', 'What it means', 'Example'],
    rows: [
      ['Implement a strong identity foundation', 'Least privilege, separation of duties, central identity, no long-term credentials', 'IAM Identity Center, IAM roles with temporary credentials'],
      ['Maintain traceability', 'Monitor, alert on and audit every action and change', 'CloudTrail, AWS Config, CloudWatch alarms'],
      ['Apply security at all layers', 'Defense in depth: edge, VPC, subnet, instance, app, data', 'WAF + security groups + NACLs + encryption'],
      ['Automate security best practices', 'Security controls as code in version-controlled templates', 'CloudFormation templates with guardrails'],
      ['Protect data in transit and at rest', 'Classify data; encrypt, tokenize, control access', 'KMS encryption, TLS, S3 Block Public Access'],
      ['Keep people away from data', 'Reduce direct and manual access to data', 'Dashboards and runbooks instead of console access to records'],
      ['Prepare for security events', 'Incident response processes, tooling and simulations', 'Game days, incident runbooks'],
    ],
    tips: [
      'The Security PILLAR (Well-Architected, Domain 1) is different from the Security & Compliance DOMAIN (Domain 2), though they share ideas.',
      '"Stop guessing capacity" and "go global in minutes" are cloud advantages, not Security principles.',
      '"Enable traceability" in older material is the same principle as "Maintain traceability".',
      '"Use serverless architectures" belongs to Performance Efficiency, not Security.',
    ],
  },
];
