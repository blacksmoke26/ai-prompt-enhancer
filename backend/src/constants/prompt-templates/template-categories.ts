/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

export interface PromptCategory {
  key: string;
  label: string;
  description: string;
}

const promptCategories = [
  {
    key: 'accounting',
    label: 'Accounting',
    description: 'Financial recording and reporting',
  },
  {
    key: 'agile',
    label: 'Agile',
    description: 'Iterative project management methodology',
  },
  {
    key: 'agriculture',
    label: 'Agriculture',
    description: 'Farming and cultivation practices',
  },
  {
    key: 'ai-ml',
    label: 'AI/Ml',
    description: 'Artificial Intelligence and Machine Learning',
  },
  {
    key: 'analysis',
    label: 'Analysis',
    description: 'Detailed examination of data or systems',
  },
  {
    key: 'api-design',
    label: 'API Design',
    description: 'Creating interfaces for software communication',
  },
  {
    key: 'architecture',
    label: 'Architecture',
    description: 'Structural design of systems or buildings',
  },
  {
    key: 'arts',
    label: 'Arts',
    description: 'Creative expression and visual works',
  },
  {
    key: 'automation',
    label: 'Automation',
    description: 'Automatic control of processes',
  },
  {
    key: 'automotive',
    label: 'Automotive',
    description: 'Vehicle design and engineering',
  },
  {
    key: 'aviation',
    label: 'Aviation',
    description: 'Aircraft operation and mechanics',
  },
  {
    key: 'biomedical',
    label: 'Biomedical',
    description: 'Application of engineering to medicine',
  },
  {
    key: 'blockchain',
    label: 'Blockchain',
    description: 'Distributed ledger technology',
  },
  {
    key: 'business',
    label: 'Business',
    description: 'Commercial and organizational activities',
  },
  {
    key: 'career',
    label: 'Career',
    description: 'Professional development and growth',
  },
  {
    key: 'chemical-eng',
    label: 'Chemical Engineering',
    description: 'Chemical processes and materials',
  },
  {
    key: 'civil-engineering',
    label: 'Civil Engineering',
    description: 'Infrastructure and construction design',
  },
  {
    key: 'cloud',
    label: 'Cloud',
    description: 'Cloud computing services and infrastructure',
  },
  {
    key: 'code-generation',
    label: 'Code Generation',
    description: 'Automated creation of source code',
  },
  {
    key: 'compliance',
    label: 'Compliance',
    description: 'Adherence to regulations and standards',
  },
  {
    key: 'construction',
    label: 'Construction',
    description: 'Building and structural work',
  },
  {
    key: 'content',
    label: 'Content',
    description: 'Information and media creation',
  },
  {
    key: 'content-creation',
    label: 'Content Creation',
    description: 'Producing written or visual material',
  },
  {
    key: 'corporate',
    label: 'Corporate',
    description: 'Business and enterprise operations',
  },
  {
    key: 'crafts',
    label: 'Crafts',
    description: 'Handmade artistic creations',
  },
  {
    key: 'creative',
    label: 'Creative',
    description: 'Imaginative and original work',
  },
  {
    key: 'customer-success',
    label: 'Customer Success',
    description: 'Ensuring customer satisfaction and goals',
  },
  {
    key: 'cx',
    label: 'Customer Experience',
    description: 'Customer experience management',
  },
  {
    key: 'data-engineering',
    label: 'Data Engineering',
    description: 'Data pipeline and infrastructure design',
  },
  {
    key: 'data-science',
    label: 'Data Science',
    description: 'Extracting insights from data',
  },
  {
    key: 'database',
    label: 'Database',
    description: 'Organized data storage and management',
  },
  {
    key: 'debugging',
    label: 'Debugging',
    description: 'Identifying and fixing code errors',
  },
  {
    key: 'design',
    label: 'Design',
    description: 'Planning and creating visual solutions',
  },
  {
    key: 'dev-ops',
    label: 'Dev Ops',
    description: 'Development and operations collaboration',
  },
  {
    key: 'development',
    label: 'Development',
    description: 'Software creation and programming',
  },
  {
    key: 'devops',
    label: 'Devops',
    description: 'Combined development and operations practices',
  },
  {
    key: 'documentation',
    label: 'Documentation',
    description: 'Written technical information and guides',
  },
  {
    key: 'ecommerce',
    label: 'Ecommerce',
    description: 'Online buying and selling platforms',
  },
  {
    key: 'education',
    label: 'Education',
    description: 'Teaching and learning processes',
  },
  {
    key: 'elearning',
    label: 'eLearning',
    description: 'Digital education and online courses',
  },
  {
    key: 'electrical',
    label: 'Electrical',
    description: 'Electric power and systems',
  },
  {
    key: 'electronics',
    label: 'Electronics',
    description: 'Electronic circuits and devices',
  },
  {
    key: 'emergency',
    label: 'Emergency',
    description: 'Urgent response and crisis management',
  },
  {
    key: 'energy',
    label: 'Energy',
    description: 'Power generation and resources',
  },
  {
    key: 'engineering',
    label: 'Engineering',
    description: 'Technical design and problem-solving',
  },
  { key: 'esports', label: 'Esports', description: 'Competitive video gaming' },
  {
    key: 'events',
    label: 'Events',
    description: 'Planning and managing occasions',
  },
  {
    key: 'fashion',
    label: 'Fashion',
    description: 'Clothing and style trends',
  },
  {
    key: 'finance',
    label: 'Finance',
    description: 'Money management and investment',
  },
  {
    key: 'fitness',
    label: 'Fitness',
    description: 'Physical health and exercise',
  },
  {
    key: 'gaming',
    label: 'Gaming',
    description: 'Playing video and tabletop games',
  },
  {
    key: 'geology',
    label: 'Geology',
    description: 'Earth science and rock formations',
  },
  {
    key: 'healthcare',
    label: 'Healthcare',
    description: 'Medical services and patient care',
  },
  { key: 'history', label: 'History', description: 'Study of past events' },
  {
    key: 'hobbies',
    label: 'Hobbies',
    description: 'Leisure activities and interests',
  },
  {
    key: 'hospitality',
    label: 'Hospitality',
    description: 'Guest services and entertainment',
  },
  {
    key: 'hr',
    label: 'HR',
    description: 'Human resources and personnel management',
  },
  {
    key: 'hvac',
    label: 'HVAC',
    description: 'Heating, ventilation, and air conditioning',
  },
  {
    key: 'immigration',
    label: 'Immigration',
    description: 'Movement of people between countries',
  },
  {
    key: 'insurance',
    label: 'Insurance',
    description: 'Risk management and financial protection',
  },
  {
    key: 'it-support',
    label: 'IT Support',
    description: 'Technical assistance for technology',
  },
  {
    key: 'journalism',
    label: 'Journalism',
    description: 'News reporting and media',
  },
  { key: 'legal', label: 'Legal', description: 'Law and regulatory matters' },
  {
    key: 'library',
    label: 'Library',
    description: 'Information and resource centers',
  },
  {
    key: 'lifestyle',
    label: 'Lifestyle',
    description: 'Daily living and personal interests',
  },
  {
    key: 'logistics',
    label: 'Logistics',
    description: 'Supply chain and transportation',
  },
  {
    key: 'manufacturing',
    label: 'Manufacturing',
    description: 'Production of goods on a large scale',
  },
  {
    key: 'marine',
    label: 'Marine',
    description: 'Sea-related activities and environments',
  },
  {
    key: 'marine-engineering',
    label: 'Marine Engineering',
    description: 'Design of marine systems and structures',
  },
  {
    key: 'marketing',
    label: 'Marketing',
    description: 'Promotion and market research',
  },
  {
    key: 'mechanical',
    label: 'Mechanical',
    description: 'Machines and mechanical systems',
  },
  {
    key: 'medical',
    label: 'Medical',
    description: 'Healthcare and clinical practice',
  },
  {
    key: 'mental-health',
    label: 'Mental Health',
    description: 'Psychological well-being',
  },
  {
    key: 'microservices',
    label: 'Microservices',
    description: 'Architectural style for applications',
  },
  {
    key: 'mobile',
    label: 'Mobile',
    description: 'Portable devices and applications',
  },
  {
    key: 'museum',
    label: 'Museum',
    description: 'Cultural heritage institutions',
  },
  { key: 'music', label: 'Music', description: 'Sound art and composition' },
  {
    key: 'networking',
    label: 'Networking',
    description: 'Connecting computers and systems',
  },
  {
    key: 'non-profit',
    label: 'Non Profit',
    description: 'Organizations serving social causes',
  },
  {
    key: 'nuclear',
    label: 'Nuclear',
    description: 'Nuclear energy and processes',
  },
  {
    key: 'oil-gas',
    label: 'Oil & Gas',
    description: 'Fossil fuel extraction and processing',
  },
  {
    key: 'parenting',
    label: 'Parenting',
    description: 'Raising and caring for children',
  },
  {
    key: 'performance',
    label: 'Performance',
    description: 'System efficiency and optimization',
  },
  { key: 'pets', label: 'Pets', description: 'Animal companions and care' },
  {
    key: 'pharmacy',
    label: 'Pharmacy',
    description: 'Medication and pharmaceutical services',
  },
  {
    key: 'politics',
    label: 'Politics',
    description: 'Government and public affairs',
  },
  {
    key: 'pr',
    label: 'Public Relations',
    description: 'Public relations and communication',
  },
  {
    key: 'productivity',
    label: 'Productivity',
    description: 'Efficiency and output optimization',
  },
  {
    key: 'project-management',
    label: 'Project Management',
    description: 'Planning and executing projects',
  },
  {
    key: 'realestate',
    label: 'Real estate',
    description: 'Property and land transactions',
  },
  {
    key: 'refactoring',
    label: 'Refactoring',
    description: 'Improving code structure',
  },
  {
    key: 'research',
    label: 'Research',
    description: 'Systematic investigation and study',
  },
  { key: 'retail', label: 'Retail', description: 'Selling goods to consumers' },
  {
    key: 'robotics',
    label: 'Robotics',
    description: 'Robot design and programming',
  },
  {
    key: 'sales',
    label: 'Sales',
    description: 'Selling products and services',
  },
  {
    key: 'science',
    label: 'Science',
    description: 'Systematic study of the natural world',
  },
  {
    key: 'screenwriting',
    label: 'Screenwriting',
    description: 'Writing scripts for film and TV',
  },
  {
    key: 'security',
    label: 'Security',
    description: 'Protection against threats',
  },
  {
    key: 'self-improvement',
    label: 'Self Improvement',
    description: 'Personal growth and development',
  },
  {
    key: 'semiconductor',
    label: 'Semiconductor',
    description: 'Electronic material components',
  },
  {
    key: 'social-work',
    label: 'Social Work',
    description: 'Community support and advocacy',
  },
  {
    key: 'sports',
    label: 'Sports',
    description: 'Physical competitions and athletics',
  },
  {
    key: 'support',
    label: 'Support',
    description: 'Assistance and help services',
  },
  {
    key: 'sustainability',
    label: 'Sustainability',
    description: 'Environmental and social responsibility',
  },
  { key: 'tech', label: 'Tech', description: 'Technology and innovation' },
  {
    key: 'tech-support',
    label: 'Tech Support',
    description: 'Technical assistance for technology users',
  },
  {
    key: 'telecom',
    label: 'Telecom',
    description: 'Communication technologies',
  },
  {
    key: 'testing',
    label: 'Testing',
    description: 'Quality assurance and verification',
  },
  {
    key: 'tools',
    label: 'Tools',
    description: 'Utility software and applications',
  },
  {
    key: 'translation',
    label: 'Translation',
    description: 'Converting text between languages',
  },
  {
    key: 'ui-ux',
    label: 'UI/UX',
    description: 'User interface and experience design',
  },
  {
    key: 'utilities',
    label: 'Utilities',
    description: 'Essential public services',
  },
  { key: 'ux', label: 'UX', description: 'User experience design' },
  {
    key: 'veterinary',
    label: 'Veterinary',
    description: 'Animal health and medicine',
  },
  {
    key: 'web-3',
    label: 'Web 3',
    description: 'Decentralized web technologies',
  },
  {
    key: 'web-dev',
    label: 'Web-Dev',
    description: 'Website and web application creation',
  },
];

export default promptCategories;
