// Coverage vs the official CLF-C02 exam guide v1.3 (Oct 29, 2026) in-scope service list.
// Counts questions where the service appears in a correct answer, and anywhere in the question.
// Usage: node scripts/coverage.mjs
import { readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const IN_SCOPE = {
  Analytics: ['Athena', 'EMR', 'Glue', 'Kinesis', 'OpenSearch', 'Quick|QuickSight', 'Redshift'],
  'Application Integration': ['EventBridge', 'SNS|Simple Notification', 'SQS|Simple Queue', 'Step Functions'],
  'Business Applications': ['Amazon Connect', 'SES|Simple Email'],
  'Cloud Financial Management': ['Budgets', 'Cost and Usage Report|CUR', 'Cost Explorer', 'Marketplace'],
  Compute: ['Batch', 'EC2', 'Elastic Beanstalk', 'Lightsail', 'Outposts'],
  Containers: ['ECR|Elastic Container Registry', 'ECS|Elastic Container Service', 'EKS|Elastic Kubernetes'],
  'Customer Enablement': ['Support'],
  Database: ['Aurora', 'DocumentDB', 'DynamoDB', 'ElastiCache', 'Neptune', 'RDS'],
  'Developer Tools': ['AWS CLI|CLI', 'CodeBuild', 'CodePipeline', 'X-Ray'],
  'End User Computing': ['AppStream|WorkSpaces Applications', 'WorkSpaces(?! Secure| Applications)', 'WorkSpaces Secure Browser'],
  'Frontend Web and Mobile': ['Amplify'],
  IoT: ['IoT Core'],
  'Machine Learning': ['Comprehend', 'Lex', 'Polly', 'Amazon Q\\b', 'Rekognition', 'SageMaker', 'Textract', 'Transcribe', 'Translate'],
  'Management and Governance': ['Auto Scaling', 'CloudFormation', 'CloudTrail', 'CloudWatch', 'Compute Optimizer', 'AWS Config', 'Control Tower', 'Health Dashboard|Health API', 'License Manager', 'Management Console', 'Organizations', 'Service Catalog', 'Service Quotas', 'Systems Manager', 'Trusted Advisor', 'Well-Architected Tool'],
  'Migration and Transfer': ['Application Discovery Service', 'Application Migration Service', 'Database Migration Service|DMS', 'Migration Evaluator', 'Migration Hub', 'Schema Conversion|SCT'],
  Networking: ['API Gateway', 'CloudFront', 'Direct Connect', 'Global Accelerator', 'PrivateLink', 'Route 53', 'Transit Gateway', 'VPC', 'Site-to-Site VPN', 'Client VPN'],
  Security: ['Artifact', 'Certificate Manager|ACM', 'CloudHSM', 'Cognito', 'Detective', 'Directory Service', 'Firewall Manager', 'GuardDuty', 'IAM\\b', 'IAM Identity Center', 'Inspector', 'KMS|Key Management', 'Macie', 'Resource Access Manager|AWS RAM', 'Secrets Manager', 'Security Hub', 'Shield', 'WAF'],
  Serverless: ['Fargate', 'Lambda'],
  Storage: ['AWS Backup', 'EBS|Elastic Block Store', 'EFS|Elastic File System', 'Elastic Disaster Recovery', 'FSx', 'Amazon S3|S3 ', 'Glacier', 'Storage Gateway'],
};

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data');
const qs = [];
for (const f of readdirSync(dir).filter((f) => f.endsWith('.js') && !['index.js', 'services.js'].includes(f))) {
  const { default: list } = await import(pathToFileURL(path.join(dir, f)).href);
  qs.push(...list);
}
const thin = [];
for (const [cat, svcs] of Object.entries(IN_SCOPE)) {
  console.log(`\n${cat}`);
  for (const s of svcs) {
    const re = new RegExp(s);
    const asAnswer = qs.filter((q) => q.a.some((k) => re.test(q.o[k]))).length;
    const anywhere = qs.filter((q) => re.test(q.q + ' ' + q.o.join(' '))).length;
    const flag = asAnswer < 3 ? '  <-- thin' : '';
    if (flag) thin.push(`${s} (${asAnswer})`);
    console.log(`  ${s.split('|')[0].padEnd(32)} answer:${String(asAnswer).padStart(4)}  mentioned:${String(anywhere).padStart(4)}${flag}`);
  }
}
console.log(`\nThin (<3 questions with it as the answer): ${thin.join(', ') || 'none'}`);
