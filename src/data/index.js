import core from './core';
import d1 from './d1-extra';
import d1fw from './d1-frameworks';
import d2 from './d2-extra';
import d3 from './d3-extra';
import storage from './storage-extra';
import deepDb from './deep-database';
import deepNet from './deep-network';
import deepCompute from './deep-compute';
import deepIntAn from './deep-integration-analytics';
import deepMlMgmt from './deep-ml-management';
import d4 from './d4-extra';
import d4gaps from './d4-gaps';
import gaps1 from './gaps-1';
import gaps2 from './gaps-2';
import services from './services';

export const DOMAINS = {
  1: 'Cloud Concepts',
  2: 'Security & Compliance',
  3: 'Cloud Technology & Services',
  4: 'Billing, Pricing & Support',
};
export const WEIGHT = { 1: 24, 2: 30, 3: 34, 4: 12 };
export const EXAM_PER = { 1: 16, 2: 19, 3: 22, 4: 8 }; // 65 questions

export const TAGS = {
  concepts: 'Cloud concepts', security: 'Security', compute: 'Compute', containers: 'Containers',
  storage: 'Storage', database: 'Databases', network: 'Networking', 'global-infra': 'Global infrastructure',
  analytics: 'Analytics', 'ml-ai': 'ML & AI', integration: 'Integration & messaging', devtools: 'Developer tools',
  management: 'Management & monitoring', migration: 'Migration', 'iot-other': 'IoT & other',
  'pricing-models': 'Pricing models', 'cost-tools': 'Cost tools', 'billing-org': 'Organizations & billing',
  support: 'Support plans', resources: 'Partners & resources',
};

export const CATEGORIES = {
  compute: 'Compute', containers: 'Containers', storage: 'Storage', database: 'Databases', network: 'Networking',
  'global-infra': 'Global infrastructure', security: 'Security & identity', integration: 'Integration & messaging',
  analytics: 'Analytics', 'ml-ai': 'ML & AI', management: 'Management & governance', devtools: 'Developer tools',
  migration: 'Migration & transfer', 'iot-other': 'IoT, end-user & other',
};

export function hash(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
  return h.toString(36);
}

// Dedupe by question text; id is derived from the text so saved progress survives reordering.
const seen = new Set();
export const QUESTIONS = [...core, ...d1, ...d1fw, ...d2, ...d3, ...storage, ...deepDb, ...deepNet, ...deepCompute, ...deepIntAn, ...deepMlMgmt, ...gaps1, ...gaps2, ...d4, ...d4gaps]
  .filter((q) => !seen.has(q.q) && seen.add(q.q))
  .map((q) => ({ ...q, id: hash(q.q) }));

export const SERVICES = services;
