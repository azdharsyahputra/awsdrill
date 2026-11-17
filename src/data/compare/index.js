import storage from './storage';
import frameworks from './frameworks';
import database from './database';
import network from './network';
import compute from './compute';
import integrationAnalytics from './integration-analytics';
import mlManagement from './ml-management';
import billingSecurity from './billing-security';

// Ordered by domain, then by the order each file lists them.
export const TABLES = [...frameworks, ...storage, ...database, ...network, ...compute, ...integrationAnalytics, ...mlManagement, ...billingSecurity]
  .map((t, i) => ({ ...t, _i: i }))
  .sort((a, b) => a.domain - b.domain || a._i - b._i);
