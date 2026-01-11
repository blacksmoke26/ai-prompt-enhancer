/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// types
import type { PromptParams, PromptGeneratorOptions } from '../PromptParams';

export const promptExamples: Array<{
  params: PromptParams;
  options?: PromptGeneratorOptions;
  description: string;
}> = [
  // ==========================================
  // SOFTWARE DEVELOPMENT & ENGINEERING
  // ==========================================

  {
    description: '1. Refactor Legacy Code (Python)',
    params: {
      text: 'def calc(x,y): return x+y',
      systemPrompt: 'You are a Python expert.',
      format: 'markdown',
      userRole: 'Senior Developer',
      enhancementType: 'refactor',
      technicalJargonLevel: 'professional',
      customInstructions: 'Add type hints and docstrings.',
    },
    options: { verbosity: 'explanatory' },
  },
  {
    description: '2. Debug JavaScript with Chain-of-Thought',
    params: {
      text: "console.log(user.name) // Error: Cannot read property 'name' of undefined",
      systemPrompt: 'Debug the issue.',
      format: 'markdown',
      userRole: 'Frontend Engineer',
      enhancementType: 'debug',
      strictness: 8,
    },
    options: {
      reasoningStyle: 'step-by-step',
      chainOfThoughtPrefix: "Let's trace the execution:",
      reasoningVisibility: 'visible',
    },
  },
  {
    description: '3. Generate Unit Tests (Java)',
    params: {
      text: 'public class Calculator { public int add(int a, int b) { return a + b; } }',
      systemPrompt: 'Generate JUnit tests.',
      format: 'text',
      userRole: 'QA Engineer',
      enhancementType: 'generate_tests',
      targetAudience: 'Developers',
    },
    options: {
      fewShotExamples: [
        { input: 'add(1,1)', output: 'assertEquals(2, calc.add(1,1));' },
      ],
    },
  },
  {
    description: '4. Convert Code to TypeScript',
    params: {
      text: "const user = { name: 'John' };",
      systemPrompt: 'Type the code strictly.',
      format: 'typescript',
      userRole: 'TypeScript Expert',
      enhancementType: 'translate',
      strictness: 10,
    },
    options: { formatStyle: 'plain', verbosity: 'terse' },
  },
  {
    description: '5. Code Review (Security Focus)',
    params: {
      text: "exec('rm -rf ' + userInput)",
      systemPrompt: 'Review for security flaws.',
      format: 'markdown',
      userRole: 'Security Auditor',
      enhancementType: 'code_review',
      domainSpecificity: 'Cybersecurity',
    },
    options: {
      reasoningStyle: 'compare-contrast',
      negativeConstraints: [
        'Do not suggest changing language',
        'Focus only on security',
      ],
    },
  },
  {
    description: '6. Write SQL Query',
    params: {
      text: 'Get the top 5 users by spending.',
      systemPrompt: 'You are a SQL database.',
      format: 'sql',
      userRole: 'Data Engineer',
      enhancementType: 'translate',
      enhancementParameters: { dialect: 'PostgreSQL' },
    },
    options: { verbosity: 'standard' },
  },
  {
    description: '7. Generate Regex for Email',
    params: {
      text: 'Match valid email addresses.',
      systemPrompt: 'Regex generator.',
      format: 'text',
      userRole: 'Backend Dev',
      enhancementType: 'regex_build',
    },
    options: { outputSchema: { pattern: 'string', flags: 'string' } },
  },
  {
    description: '8. Explain API Endpoint',
    params: {
      text: 'POST /users { name, email } returns 201 Created',
      systemPrompt: 'Document this API.',
      format: 'markdown',
      userRole: 'Technical Writer',
      enhancementType: 'document_code',
      headingHierarchy: true,
    },
    options: { modality: 'code' },
  },
  {
    description: '9. Optimize Algorithm Complexity',
    params: {
      text: 'Find duplicates in a list O(n^2)',
      systemPrompt: 'Optimize for performance.',
      format: 'python',
      userRole: 'Algorithm Expert',
      enhancementType: 'optimize_performance',
      strictness: 9,
    },
    options: { reasoningStyle: 'first-principles' },
  },
  {
    description: '10. Create API Client (Axios)',
    params: {
      text: 'REST API for user management',
      systemPrompt: 'Generate TypeScript client.',
      format: 'typescript',
      userRole: 'Full Stack Dev',
      enhancementType: 'generate',
    },
    options: {
      fewShotExamples: [
        { input: 'Get User', output: 'getUser(id: string): Promise<User>' },
      ],
    },
  },

  // ==========================================
  // DATA SCIENCE & AI
  // ==========================================

  {
    description: '11. Extract Data with Schema',
    params: {
      text: 'Invoice #123 dated 2023-01-01 for $500 to Acme Corp.',
      systemPrompt: 'Extract structured data.',
      format: 'json',
      userRole: 'NLP Engineer',
      enhancementType: 'extract_data',
    },
    options: {
      outputSchema: {
        type: 'object',
        properties: {
          invoice_id: 'string',
          date: 'string',
          amount: 'number',
          client: 'string',
        },
      },
      formatStyle: 'plain',
    },
  },
  {
    description: '12. Clean Messy CSV Data',
    params: {
      text: 'Name, Age\nJohn, 25\nJane, Twenty-Five\n, 30',
      systemPrompt: 'Fix data types and nulls.',
      format: 'csv',
      userRole: 'Data Analyst',
      enhancementType: 'data_cleaning',
    },
    options: {
      negativeConstraints: [
        'Do not remove rows',
        "Convert 'Twenty-Five' to 25",
      ],
      verbosity: 'terse',
    },
  },
  {
    description: '13. Explain Machine Learning Model',
    params: {
      text: 'Random Forest Classifier',
      systemPrompt: 'Explain the concept.',
      format: 'markdown',
      userRole: 'Data Scientist',
      enhancementType: 'explain',
      targetAudience: 'Product Manager',
      cognitiveLoad: 'medium',
      metaphorUsage: 'heavy',
    },
    options: {
      reasoningVisibility: 'visible',
    },
  },
  {
    description: '14. Generate Python Feature Engineering',
    params: {
      text: "Datetime column 'timestamp'",
      systemPrompt: 'Create features for time series.',
      format: 'python',
      userRole: 'ML Engineer',
      enhancementType: 'generate',
    },
    options: {
      fewShotExamples: [
        { input: 'timestamp', output: "df['hour'] = df['timestamp'].dt.hour" },
      ],
    },
  },
  {
    description: '15. Analyze Time Series Trend',
    params: {
      text: 'CPU usage data: [10, 12, 45, 80, 10]',
      systemPrompt: 'Detect anomalies.',
      format: 'json',
      userRole: 'DevOps Engineer',
      enhancementType: 'anomaly_detection',
    },
    options: { reasoningStyle: 'compare-contrast' },
  },
  {
    description: '16. SQL to Pandas Conversion',
    params: {
      text: 'SELECT * FROM users WHERE active = 1',
      systemPrompt: 'Convert to Pandas.',
      format: 'python',
      userRole: 'Data Scientist',
      enhancementType: 'translate',
    },
    options: { modality: 'code' },
  },
  {
    description: '17. Generate ML Training Pipeline',
    params: {
      text: 'Image classification for cats vs dogs',
      systemPrompt: 'Design a PyTorch pipeline.',
      format: 'python',
      userRole: 'ML Researcher',
      enhancementType: 'architecture_review',
    },
    options: { reasoningStyle: 'tree-of-thoughts' },
  },

  // ==========================================
  // DEVOPS & CLOUD
  // ==========================================

  {
    description: '18. Generate Dockerfile',
    params: {
      text: 'Node.js Express API',
      systemPrompt: 'Create an optimized Dockerfile.',
      format: 'dockerfile',
      userRole: 'DevOps Engineer',
      enhancementType: 'dockerize',
      customInstructions: 'Use multi-stage build.',
    },
    options: { formatStyle: 'plain' },
  },
  {
    description: '19. Write Kubernetes Deployment',
    params: {
      text: 'Web app with 3 replicas',
      systemPrompt: 'Generate K8s manifests.',
      format: 'yaml',
      userRole: 'Kubernetes Admin',
      enhancementType: 'generate',
    },
    options: {
      outputSchema: {
        apiVersion: 'string',
        kind: 'Deployment',
        spec: 'object',
      },
      customLabels: { structure: 'K8S_MANIFEST' },
    },
  },
  {
    description: '20. GitHub Actions CI/CD',
    params: {
      text: 'Run tests on push, build docker, deploy to staging',
      systemPrompt: 'Create workflow yaml.',
      format: 'yaml',
      userRole: 'DevOps',
      enhancementType: 'ci_cd_pipeline',
    },
    options: {
      fewShotExamples: [{ input: 'Test', output: '- run: npm test' }],
    },
  },
  {
    description: '21. Terraform Infrastructure',
    params: {
      text: 'AWS S3 Bucket with versioning',
      systemPrompt: 'Write Terraform HCL.',
      format: 'hcl',
      userRole: 'Cloud Architect',
      enhancementType: 'generate',
    },
    options: {
      reasoningStyle: 'step-by-step',
      verbosity: 'explanatory',
    },
  },
  {
    description: '22. Analyze Server Logs',
    params: {
      text: '[ERROR] Connection timeout: DB_HOST unreachable',
      systemPrompt: 'Diagnose the infrastructure issue.',
      format: 'markdown',
      userRole: 'SRE',
      enhancementType: 'debug',
      domainSpecificity: 'Networking',
    },
    options: { reasoningVisibility: 'hidden' },
  },
  {
    description: '23. Nginx Configuration',
    params: {
      text: 'Reverse proxy to node app on port 3000',
      systemPrompt: 'Write nginx.conf.',
      format: 'nginx',
      userRole: 'SysAdmin',
      enhancementType: 'generate',
    },
    options: { verbosity: 'terse' },
  },
  {
    description: '24. Helm Chart Values',
    params: {
      text: 'Redis configuration',
      systemPrompt: 'Generate values.yaml.',
      format: 'yaml',
      userRole: 'DevOps',
      enhancementType: 'generate',
    },
    options: { modality: 'code' },
  },

  // ==========================================
  // SECURITY & COMPLIANCE
  // ==========================================

  {
    description: '25. Generate Password Policy',
    params: {
      text: 'Internal application security',
      systemPrompt: 'Write a security policy.',
      format: 'markdown',
      userRole: 'CISO',
      enhancementType: 'policy_draft',
      regulatoryCompliance: ['NIST', 'ISO27001'],
    },
    options: {},
  },
  {
    description: '26. Penetration Testing Plan',
    params: {
      text: 'Web application login page',
      systemPrompt: 'List potential attack vectors.',
      format: 'json',
      userRole: 'Ethical Hacker',
      enhancementType: 'risk_assessment',
    },
    options: { reasoningStyle: 'tree-of-thoughts' },
  },
  {
    description: '27. GDPR Compliance Check',
    params: {
      text: 'We store IP addresses for analytics.',
      systemPrompt: 'Check for GDPR compliance.',
      format: 'text',
      userRole: 'Legal Tech Specialist',
      enhancementType: 'compliance_check',
      strictness: 10,
    },
    options: {
      reasoningStyle: 'first-principles',
      customLabels: { identity: 'LEGAL_AUDIT' },
    },
  },

  // ==========================================
  // ARCHITECTURE & DESIGN
  // ==========================================

  {
    description: '28. System Design: URL Shortener',
    params: {
      text: 'Design a system like bit.ly',
      systemPrompt: 'Outline the architecture.',
      format: 'markdown',
      userRole: 'System Architect',
      enhancementType: 'architecture_review',
      informationDensity: 'dense',
    },
    options: { reasoningStyle: 'step-by-step' },
  },
  {
    description: '29. Database Schema Design',
    params: {
      text: 'E-commerce platform (Users, Products, Orders)',
      systemPrompt: 'Design relational schema.',
      format: 'sql',
      userRole: 'DBA',
      enhancementType: 'generate',
    },
    options: {
      outputSchema: { tables: 'array', relationships: 'array' },
      formatStyle: 'plain',
    },
  },
  {
    description: '30. Microservices Decomposition',
    params: {
      text: 'Monolithic Inventory System',
      systemPrompt: 'Suggest microservice boundaries.',
      format: 'json',
      userRole: 'Solutions Architect',
      enhancementType: 'refactor',
    },
    options: { reasoningStyle: 'compare-contrast' },
  },
  {
    description: '31. API Gateway Routing Rules',
    params: {
      text: 'Routes for /auth, /users, /orders',
      systemPrompt: 'Configure Kong Gateway.',
      format: 'yaml',
      userRole: 'API Architect',
      enhancementType: 'generate',
    },
    options: { verbosity: 'terse' },
  },

  // ==========================================
  // PRODUCT & MANAGEMENT
  // ==========================================

  {
    description: '32. Write User Stories',
    params: {
      text: 'User wants to reset password via email',
      systemPrompt: 'Create Jira tickets.',
      format: 'markdown',
      userRole: 'Product Owner',
      enhancementType: 'user_story',
    },
    options: { formatStyle: 'markdown' },
  },
  {
    description: '33. Technical Interview Questions',
    params: {
      text: 'React Developer position',
      systemPrompt: 'Generate interview questions.',
      format: 'text',
      userRole: 'Tech Lead',
      enhancementType: 'interview_q',
    },
    options: {
      fewShotExamples: [
        { input: 'React Core', output: 'Explain Virtual DOM.' },
      ],
    },
  },
  {
    description: '34. Generate Release Notes',
    params: {
      text: 'Features: Dark Mode, Bugfix: Login crash',
      systemPrompt: 'Write release notes.',
      format: 'markdown',
      userRole: 'Product Manager',
      enhancementType: 'summarize',
      tone: 'exciting',
    },
    options: { verbosity: 'standard' },
  },
  {
    description: '35. Sprint Burndown Analysis',
    params: {
      text: 'Task completion data for Sprint 12',
      systemPrompt: 'Analyze team velocity.',
      format: 'json',
      userRole: 'Scrum Master',
      enhancementType: 'data_analysis',
    },
    options: { reasoningStyle: 'step-by-step' },
  },

  // ==========================================
  // MISCELLANEOUS & ADVANCED USE CASES
  // ==========================================

  {
    description: '36. Explain Tech Concept (ELI5)',
    params: {
      text: 'How does the Internet work?',
      systemPrompt: "Explain like I'm 5.",
      format: 'text',
      userRole: 'Educator',
      enhancementType: 'explain',
      cognitiveLoad: 'low',
      metaphorUsage: 'heavy',
    },
    options: {},
  },
  {
    description: '37. Create Regex from Natural Language',
    params: {
      text: 'Date format YYYY-MM-DD',
      systemPrompt: 'Generate regex.',
      format: 'code',
      userRole: 'Developer',
      enhancementType: 'regex_build',
    },
    options: { verbosity: 'terse' },
  },
  {
    description: '38. Code Translation (Java to C#)',
    params: {
      text: "public void hello() { System.out.println('Hi'); }",
      systemPrompt: 'Translate to C#.',
      format: 'csharp',
      userRole: 'Polyglot Dev',
      enhancementType: 'translate',
      technicalJargonLevel: 'professional',
    },
    options: { modality: 'code' },
  },
  {
    description: '39. Generate CLI Help Text',
    params: {
      text: 'CLI tool to resize images',
      systemPrompt: 'Write --help output.',
      format: 'markdown',
      userRole: 'UX Writer',
      enhancementType: 'generate',
      listStyle: 'bulleted',
    },
    options: {},
  },
  {
    description: '40. Convert XML to JSON',
    params: {
      text: '<note><to>User</to><from>Admin</from></note>',
      systemPrompt: 'Convert format.',
      format: 'json',
      userRole: 'Data Converter',
      enhancementType: 'translate',
      minimalOutput: true,
    },
    options: {},
  },

  // ==========================================
  // XML FORMATTING & DEBUGGING SCENARIOS
  // ==========================================

  {
    description: '41. Structured XML Prompt for Parsing',
    params: {
      text: "Analyze sentiment of 'I love this product!'",
      systemPrompt: 'NLP Task.',
      format: 'json',
      userRole: 'Bot',
      enhancementType: 'sentiment_analysis',
    },
    options: {
      formatStyle: 'xml',
      reasoningVisibility: 'hidden',
      customLabels: { identity: 'agent_config' },
    },
  },
  {
    description: '42. Debug Mode Output',
    params: {
      text: 'Sort array [3,1,2]',
      systemPrompt: 'Sort numbers.',
      format: 'python',
      userRole: 'Dev',
      enhancementType: 'generate',
    },
    options: { debugMode: true, verbosity: 'explanatory' },
  },
  {
    description: '43. Terse API Request',
    params: {
      text: 'Get weather for London',
      systemPrompt: 'Weather API.',
      format: 'json',
      userRole: 'Service',
      enhancementType: 'api_call',
    },
    options: { verbosity: 'terse', formatStyle: 'plain' },
  },

  // ==========================================
  // WEB DEVELOPMENT SPECIFIC
  // ==========================================

  {
    description: '44. Generate HTML Form',
    params: {
      text: 'User registration form',
      systemPrompt: 'Create HTML5 form.',
      format: 'html',
      userRole: 'Frontend Dev',
      enhancementType: 'generate',
      strictness: 5,
      customInstructions: 'Use Bootstrap classes.',
    },
    options: {},
  },
  {
    description: '45. CSS Grid Layout',
    params: {
      text: '3-column responsive layout',
      systemPrompt: 'Write CSS Grid.',
      format: 'css',
      userRole: 'UI Designer',
      enhancementType: 'generate',
    },
    options: { modality: 'code' },
  },
  {
    description: '46. React Component Generation',
    params: {
      text: 'A reusable button component',
      systemPrompt: 'Write functional React component.',
      format: 'typescript',
      userRole: 'React Dev',
      enhancementType: 'generate',
    },
    options: {
      fewShotExamples: [
        {
          input: 'Button',
          output:
            'export const Button = ({ children }) => <button>{children}</button>',
        },
      ],
    },
  },
  {
    description: '47. GraphQL Resolver',
    params: {
      text: 'User type and friends query',
      systemPrompt: 'Write GraphQL resolvers.',
      format: 'typescript',
      userRole: 'Backend Dev',
      enhancementType: 'generate',
    },
    options: { modality: 'code' },
  },

  // ==========================================
  // ADDITIONAL IT SCENARIOS
  // ==========================================

  {
    description: '48. Git Commit Message',
    params: {
      text: 'Fixed the navbar overlap on mobile',
      systemPrompt: 'Conventional Commits.',
      format: 'text',
      userRole: 'Git User',
      enhancementType: 'git_message',
      maxTokens: 50,
    },
    options: { verbosity: 'terse' },
  },
  {
    description: '49. JSON Schema Validation',
    params: {
      text: 'User profile object',
      systemPrompt: 'Create JSON Schema.',
      format: 'json',
      userRole: 'Schema Architect',
      enhancementType: 'generate',
    },
    options: { outputSchema: { type: 'object', properties: {} } },
  },
  {
    description: '50. Bash Script Automation',
    params: {
      text: 'Backup database and compress',
      systemPrompt: 'Write bash script.',
      format: 'bash',
      userRole: 'SysAdmin',
      enhancementType: 'generate',
    },
    options: { negativeConstraints: ['Do not use sudo', 'Add error handling'] },
  },
  {
    description: '51. Swagger/OpenAPI Spec',
    params: {
      text: 'User API endpoints',
      systemPrompt: 'Generate OpenAPI 3.0 spec.',
      format: 'yaml',
      userRole: 'API Architect',
      enhancementType: 'api_spec',
    },
    options: { formatStyle: 'plain' },
  },
  {
    description: '52. Ansible Playbook',
    params: {
      text: 'Install Nginx on Ubuntu servers',
      systemPrompt: 'Write Ansible playbook.',
      format: 'yaml',
      userRole: 'DevOps Engineer',
      enhancementType: 'generate',
    },
    options: { verbosity: 'standard' },
  },
  {
    description: '53. Python Async Refactor',
    params: {
      text: 'Sequential file downloads',
      systemPrompt: 'Make asynchronous.',
      format: 'python',
      userRole: 'Backend Dev',
      enhancementType: 'optimize_performance',
    },
    options: { reasoningStyle: 'step-by-step' },
  },
  {
    description: '54. Technical Blog Post',
    params: {
      text: 'Benefits of GraphQL over REST',
      systemPrompt: 'Write technical blog post.',
      format: 'markdown',
      userRole: 'Tech Blogger',
      enhancementType: 'blog_post',
      tone: 'persuasive',
      headingHierarchy: true,
    },
    options: { formatStyle: 'markdown' },
  },
  {
    description: '55. Logstash Filter Config',
    params: {
      text: 'Parse Apache logs',
      systemPrompt: 'Create Logstash filter.',
      format: 'ruby',
      userRole: 'ELK Stack Admin',
      enhancementType: 'generate',
    },
    options: { modality: 'code' },
  },
];

export const promptExamplesBasic: PromptParams[] = [
  // ==========================================
  // 1. BASIC TRANSFORMATIONS
  // ==========================================

  {
    text: 'The quick brown fox jumps over the lazy dog.',
    systemPrompt: 'You are a helpful assistant.',
    format: 'text',
    userRole: 'general-user',
    enhancementType: 'correct',
    targetAudience: 'general',
    tone: 'neutral',
    responseLength: 'short',
  },
  {
    text: 'Artificial Intelligence is transforming the healthcare industry by enabling faster diagnosis and personalized treatment plans.',
    systemPrompt: 'You are an expert content writer.',
    format: 'markdown',
    userRole: 'content-writer',
    enhancementType: 'summarize',
    responseLength: 'short',
    informationDensity: 'dense',
  },
  {
    text: 'Photosynthesis is a process used by plants and other organisms to convert light energy into chemical energy.',
    systemPrompt: 'Explain concepts simply.',
    format: 'text',
    userRole: 'teacher',
    enhancementType: 'expand',
    targetAudience: 'children',
    cognitiveLoad: 'low',
    metaphorUsage: 'heavy',
  },
  {
    text: 'We need to launch the product Q3 to maximize market share.',
    systemPrompt: 'You are a corporate strategist.',
    format: 'markdown',
    userRole: 'manager',
    enhancementType: 'rewrite',
    tone: 'formal',
    language: 'ur',
  },
  {
    text: 'Hello world',
    systemPrompt: 'Translate text.',
    format: 'text',
    userRole: 'translator',
    enhancementType: 'translate',
    customInstructions: 'Translate to French.',
    language: 'fr',
  },

  // ==========================================
  // 2. SOFTWARE ENGINEERING & TECHNICAL
  // ==========================================

  {
    text: 'function add(a,b) { return a + b }',
    systemPrompt: 'You are a senior software engineer.',
    format: 'markdown',
    userRole: 'developer',
    enhancementType: 'refactor',
    technicalJargonLevel: 'professional',
    domainSpecificity: 'Software Engineering',
    customInstructions: 'Use TypeScript with strict typing.',
  },
  {
    text: 'The app crashes when I click the submit button.',
    systemPrompt: 'You are a debugging assistant.',
    format: 'json',
    userRole: 'support-engineer',
    enhancementType: 'debug',
    maxTokens: 500,
    includeMetadata: true,
  },
  {
    text: 'Create a user login system.',
    systemPrompt: 'You are a solution architect.',
    format: 'markdown',
    userRole: 'architect',
    enhancementType: 'architecture_review',
    cognitiveLoad: 'high',
    informationDensity: 'dense',
    listStyle: 'numbered',
  },
  {
    text: "SELECT * FROM users WHERE name = 'John'",
    systemPrompt: 'You are a database expert.',
    format: 'text',
    userRole: 'data-analyst',
    enhancementType: 'optimize',
    enhancementParameters: { database: 'PostgreSQL' },
  },
  {
    text: 'Extract email addresses from the following text...',
    systemPrompt: 'You are a regex generator.',
    format: 'text',
    userRole: 'developer',
    enhancementType: 'regex_build',
    ambiguityTolerance: 'low',
  },
  {
    text: 'async function fetchData() { const data = await fetch(url); return data; }',
    systemPrompt: 'You are a technical writer.',
    format: 'markdown',
    userRole: 'technical-writer',
    enhancementType: 'document_code',
    headingHierarchy: true,
    customInstructions: 'Include JSDoc comments.',
  },
  {
    text: 'Implement a binary search tree.',
    systemPrompt: 'You are a coding interviewer.',
    format: 'markdown',
    userRole: 'interviewer',
    enhancementType: 'generate_tests',
    enhancementParameters: {
      framework: 'Jest',
    },
    responseLength: 'long',
  },
  {
    text: 'const x = y + z',
    systemPrompt: 'You are a security auditor.',
    format: 'json',
    userRole: 'security-auditor',
    enhancementType: 'security_audit',
    strictness: 10,
    regulatoryCompliance: ['OWASP'],
  },

  // ==========================================
  // 3. DATA ANALYSIS & SCIENCE
  // ==========================================

  {
    text: 'Sales increased by 20% in Q1 but dropped by 5% in Q2 due to supply chain issues.',
    systemPrompt: 'You are a data scientist.',
    format: 'json',
    userRole: 'data-scientist',
    enhancementType: 'sentiment_analysis',
    minimalOutput: true,
  },
  {
    text: 'Apple Inc. is planning to release a new VR headset next year.',
    systemPrompt: 'Extract entities.',
    format: 'json',
    userRole: 'nlp-engineer',
    enhancementType: 'entity_recognition',
    customInstructions: 'Return Org, Date, and Product.',
  },
  {
    text: 'Patient ID: 101, Age: 45, Diagnosis: Hypertension',
    systemPrompt: 'You are a clinical data manager.',
    format: 'csv',
    userRole: 'researcher',
    enhancementType: 'data_cleaning',
    strictness: 9,
  },
  {
    text: 'The server CPU usage spikes every night at 2 AM.',
    systemPrompt: 'You are a DevOps engineer.',
    format: 'markdown',
    userRole: 'devops',
    enhancementType: 'anomaly_detection',
    cognitiveLoad: 'medium',
  },
  {
    text: 'List of monthly revenue for the past year: [10k, 12k, 15k, ...]',
    systemPrompt: 'You are a financial forecaster.',
    format: 'json',
    userRole: 'financial-analyst',
    enhancementType: 'forecast',
    enhancementParameters: { horizon: '3 months' },
  },

  // ==========================================
  // 4. BUSINESS & PROFESSIONAL
  // ==========================================

  {
    text: 'Draft an email to the client regarding the delay.',
    systemPrompt: 'You are a professional executive assistant.',
    format: 'text',
    userRole: 'executive-assistant',
    enhancementType: 'email_draft',
    tone: 'apologetic',
    empathyLevel: 8,
  },
  {
    text: 'We need to analyze our market position against Competitor X.',
    systemPrompt: 'You are a business strategist.',
    format: 'markdown',
    userRole: 'strategist',
    enhancementType: 'competitor_analysis',
    paragraphFlow: 'pyramidal',
  },
  {
    text: 'Full report on Q3 earnings including projections and risks.',
    systemPrompt: 'You are a CEO.',
    format: 'markdown',
    userRole: 'executive',
    enhancementType: 'executive_summary',
    responseLength: 'short',
    informationDensity: 'dense',
  },
  {
    text: 'Terms of service agreement for a SaaS platform.',
    systemPrompt: 'You are a lawyer.',
    format: 'text',
    userRole: 'legal-counsel',
    enhancementType: 'legal_simplify',
    cognitiveLoad: 'low',
    technicalJargonLevel: 'layman',
  },
  {
    text: 'Our new software automates invoice processing.',
    systemPrompt: 'You are a marketing copywriter.',
    format: 'html',
    userRole: 'marketer',
    enhancementType: 'marketing_copy',
    persuasionTechnique: 'pathos',
    emotionalIntensity: 7,
  },
  {
    text: 'Meeting notes from the sprint planning.',
    systemPrompt: 'You are a project manager.',
    format: 'markdown',
    userRole: 'pm',
    enhancementType: 'meeting_minutes',
    listStyle: 'bulleted',
    headingHierarchy: true,
  },
  {
    text: 'New product launch: The SuperWidget 3000.',
    systemPrompt: 'You are a PR specialist.',
    format: 'text',
    userRole: 'pr-manager',
    enhancementType: 'press_release',
    tone: 'enthusiastic',
    culturalContext: 'US-West',
  },
  {
    text: 'We want to increase user retention.',
    systemPrompt: 'You are a product owner.',
    format: 'json',
    userRole: 'po',
    enhancementType: 'user_story',
  },

  // ==========================================
  // 5. CREATIVE & CONTENT CREATION
  // ==========================================

  {
    text: 'A lonely robot on a deserted space station.',
    systemPrompt: 'You are a novelist.',
    format: 'text',
    userRole: 'writer',
    enhancementType: 'story_write',
    sentenceStructure: 'varied',
    emotionalIntensity: 8,
    metaphorUsage: 'heavy',
  },
  {
    text: 'The sunset over the ocean was beautiful.',
    systemPrompt: 'You are a poet.',
    format: 'markdown',
    userRole: 'poet',
    enhancementType: 'poem',
    abstractionLevel: 'abstract',
  },
  {
    text: 'How to bake a chocolate cake.',
    systemPrompt: 'You are a food blogger.',
    format: 'html',
    userRole: 'blogger',
    enhancementType: 'blog_post',
    tone: 'friendly',
    listStyle: 'numbered',
  },
  {
    text: 'Top 10 travel destinations in Japan.',
    systemPrompt: 'You are a travel influencer.',
    format: 'markdown',
    userRole: 'influencer',
    enhancementType: 'social_media',
    customInstructions: 'Use emoji and hashtags.',
    culturalContext: 'Japanese',
  },
  {
    text: "Hero enters the dragon's cave.",
    systemPrompt: 'You are a screenwriter.',
    format: 'text',
    userRole: 'screenwriter',
    enhancementType: 'screenplay',
    strictness: 8,
  },
  {
    text: 'Create a character for a fantasy RPG.',
    systemPrompt: 'You are a game designer.',
    format: 'json',
    userRole: 'game-designer',
    enhancementType: 'character_gen',
    minimalOutput: true,
  },
  {
    text: "Explain the concept of 'Time' using a metaphor.",
    systemPrompt: 'You are a philosopher.',
    format: 'text',
    userRole: 'philosopher',
    enhancementType: 'metaphor_gen',
    cognitiveLoad: 'high',
  },
  {
    text: 'Write a joke about programmers.',
    systemPrompt: 'You are a comedian.',
    format: 'text',
    userRole: 'comedian',
    enhancementType: 'joke',
    tone: 'dry',
  },

  // ==========================================
  // 6. ACADEMIC & EDUCATION
  // ==========================================

  {
    text: 'The impact of climate change on biodiversity.',
    systemPrompt: 'You are a professor.',
    format: 'markdown',
    userRole: 'academic',
    enhancementType: 'abstract',
    technicalJargonLevel: 'academic',
    strictness: 9,
  },
  {
    text: 'Study of the French Revolution.',
    systemPrompt: 'You are a historian.',
    format: 'text',
    userRole: 'historian',
    enhancementType: 'literature_review',
    paragraphFlow: 'linear',
  },
  {
    text: 'Formulate a question about black holes.',
    systemPrompt: 'You are a researcher.',
    format: 'json',
    userRole: 'researcher',
    enhancementType: 'research_question',
    ambiguityTolerance: 'medium',
  },
  {
    text: 'Introduction to Calculus.',
    systemPrompt: 'You are a tutor.',
    format: 'markdown',
    userRole: 'tutor',
    enhancementType: 'syllabus',
    headingHierarchy: true,
    responseLength: 'long',
  },
  {
    text: 'Civil War causes and effects.',
    systemPrompt: 'You are an examiner.',
    format: 'text',
    userRole: 'teacher',
    enhancementType: 'quiz_gen',
    enhancementParameters: { count: 5 },
  },
  {
    text: 'Argument for universal basic income.',
    systemPrompt: 'You are a debate coach.',
    format: 'markdown',
    userRole: 'debater',
    enhancementType: 'debate_argument',
    persuasionTechnique: 'logos',
  },

  // ==========================================
  // 7. ADVANCED & COMPLEX CONFIGURATIONS
  // ==========================================

  {
    text: 'Generate a YAML config for a Kubernetes deployment.',
    systemPrompt: 'You are a DevOps specialist.',
    format: 'yaml',
    userRole: 'devops',
    enhancementType: 'generate',
    strictness: 10,
    minimalOutput: true,
    domainSpecificity: 'DevOps',
  },
  {
    text: "Analyze the user's complaint about the software bug.",
    systemPrompt: 'You are a customer success manager.',
    format: 'json',
    userRole: 'csm',
    enhancementType: 'sentiment_analysis',
    empathyLevel: 9,
    includeMetadata: true,
    customInstructions: 'Detect urgency and frustration level.',
  },
  {
    text: 'Summarize the transcript.',
    systemPrompt: 'You are an AI summarizer.',
    format: 'markdown',
    userRole: 'ai',
    enhancementType: 'summarize',
    topP: 0.9,
    temperature: 0.5,
    presencePenalty: 0.5,
    responseLength: 'medium',
  },
  {
    text: 'Create a complex password policy document.',
    systemPrompt: 'You are a security officer.',
    format: 'text',
    userRole: 'security-officer',
    enhancementType: 'policy_draft',
    regulatoryCompliance: ['GDPR', 'HIPAA'],
    strictness: 10,
    tone: 'bureaucratic',
  },
  {
    text: 'Convert this HTML table to CSV.',
    systemPrompt: 'You are a data converter.',
    format: 'csv',
    userRole: 'converter',
    enhancementType: 'format_csv',
    minimalOutput: true,
    encoding: 'utf-8',
  },
  {
    text: 'Explain Quantum Entanglement.',
    systemPrompt: 'You are a science communicator.',
    format: 'markdown',
    userRole: 'communicator',
    enhancementType: 'explain',
    cognitiveLoad: 'medium',
    metaphorUsage: 'light',
    informationDensity: 'balanced',
    domainSpecificity: 'Quantum Physics',
  },
  {
    text: 'Draft a rejection letter for a job applicant.',
    systemPrompt: 'You are an HR manager.',
    format: 'text',
    userRole: 'hr',
    enhancementType: 'email_draft',
    tone: 'empathetic',
    empathyLevel: 8,
    emotionalIntensity: 3,
  },
  {
    text: 'Generate a JSON schema for a user profile.',
    systemPrompt: 'You are a backend developer.',
    format: 'json',
    userRole: 'backend-dev',
    enhancementType: 'schema_generate',
    strictness: 9,
    enhancementParameters: { strictTypes: true },
  },
  {
    text: 'Write a meditative script for sleep.',
    systemPrompt: 'You are a meditation guide.',
    format: 'text',
    userRole: 'guide',
    enhancementType: 'meditation_script',
    tone: 'soothing',
    emotionalIntensity: 2,
    sentenceStructure: 'simple',
  },
  {
    text: 'Analyze the potential risks of this investment.',
    systemPrompt: 'You are a risk analyst.',
    format: 'markdown',
    userRole: 'analyst',
    enhancementType: 'risk_assessment',
    ambiguityTolerance: 'low',
    listStyle: 'bulleted',
    technicalJargonLevel: 'professional',
  },
  {
    text: 'Translate this Python code to C++.',
    systemPrompt: 'You are a polyglot programmer.',
    format: 'markdown',
    userRole: 'polyglot',
    enhancementType: 'translate',
    enhancementParameters: { sourceLang: 'Python', targetLang: 'C++' },
  },
  {
    text: 'Create a SWOT analysis for Tesla.',
    systemPrompt: 'You are a business consultant.',
    format: 'markdown',
    userRole: 'consultant',
    enhancementType: 'swot',
    paragraphFlow: 'linear',
    headingHierarchy: true,
  },
  {
    text: 'Generate a GraphQL schema for a blog.',
    systemPrompt: 'You are a API designer.',
    format: 'text',
    userRole: 'api-designer',
    enhancementType: 'graphql_schema',
    informationDensity: 'dense',
    domainSpecificity: 'Web Development',
  },
  {
    text: 'Write a fairy tale about a coding dragon.',
    systemPrompt: "You are a children's author.",
    format: 'markdown',
    userRole: 'author',
    enhancementType: 'story_write',
    cognitiveLoad: 'low',
    metaphorUsage: 'heavy',
    tone: 'whimsical',
  },
  {
    text: 'Clean this dirty JSON data.',
    systemPrompt: 'You are a data cleaner.',
    format: 'json',
    userRole: 'data-cleaner',
    enhancementType: 'data_cleaning',
    strictness: 10,
    minimalOutput: true,
  },
  {
    text: 'Explain the Theory of Relativity.',
    systemPrompt: 'You are Albert Einstein.',
    format: 'markdown',
    userRole: 'physicist',
    enhancementType: 'explain',
    technicalJargonLevel: 'professional',
    abstractionLevel: 'mixed',
    domainSpecificity: 'Physics',
  },
  {
    text: 'Create a prompt for an image generator.',
    systemPrompt: 'You are a prompt engineer.',
    format: 'text',
    userRole: 'prompt-engineer',
    enhancementType: 'prompt_engineer',
    informationDensity: 'dense',
    customInstructions: 'Focus on lighting and style.',
  },
];
