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
  { key: 'backend', label: 'Backend', description: 'Server-side development' },
  {
    key: 'career-development',
    label: 'Career Development',
    description: 'Professional growth and advancement',
  },
  {
    key: 'cloud-architecture',
    label: 'Cloud Architecture',
    description: 'Designing cloud-based systems',
  },
  {
    key: 'documentation',
    label: 'Documentation',
    description: 'Creating clear and useful written materials',
  },
  {
    key: 'frontend',
    label: 'Frontend',
    description: 'Client-side development',
  },
  {
    key: 'machine-learning',
    label: 'Machine Learning',
    description: 'AI and data analysis',
  },
  {
    key: 'mobile-development',
    label: 'Mobile Development',
    description: 'App creation for mobile devices',
  },
  {
    key: 'product-management',
    label: 'Product Management',
    description: 'Planning and managing products',
  },
  {
    key: 'quality-assurance',
    label: 'Quality Assurance',
    description: 'Testing and verification',
  },
  {
    key: 'security-engineering',
    label: 'Security Engineering',
    description: 'Designing secure systems',
  },
  {
    key: 'site-reliability',
    label: 'Site Reliability',
    description: 'Maintaining reliable infrastructure',
  },
  {
    key: 'system-design',
    label: 'System Design',
    description: 'Designing scalable systems',
  },
  {
    key: 'technical-writing',
    label: 'Technical Writing',
    description: 'Creating clear and useful written materials',
  },
  {
    key: 'ux-research',
    label: 'UX Research',
    description: 'User experience investigation',
  },
  {
    key: 'ecommerce-shopping',
    label: 'E-commerce & Shopping',
    description: 'Online retail platforms and shopping experiences',
  },
  {
    key: 'business-corporate',
    label: 'Business & Corporate',
    description: 'Enterprise and professional business solutions',
  },
  {
    key: 'social-media-networking',
    label: 'Social Media & Networking',
    description: 'Platforms for social interaction and networking',
  },
  {
    key: 'news-media-publishers',
    label: 'News & Media Publishers',
    description: 'News outlets and media publishing houses',
  },
  {
    key: 'educational-academic',
    label: 'Educational & Academic',
    description: 'Learning platforms and academic resources',
  },
  {
    key: 'portfolio-creative',
    label: 'Portfolio & Creative',
    description: 'Showcasing creative work and personal portfolios',
  },
  {
    key: 'streaming-entertainment',
    label: 'Streaming & Entertainment',
    description: 'Video streaming and entertainment services',
  },
  {
    key: 'financial-services-crypto',
    label: 'Financial Services & Crypto',
    description: 'Banking, finance, and cryptocurrency platforms',
  },
  {
    key: 'job-boards-recruitment',
    label: 'Job Boards & Recruitment',
    description: 'Employment platforms and hiring services',
  },
  {
    key: 'real-estate-travel',
    label: 'Real Estate & Travel',
    description: 'Property listings and travel booking',
  },
  {
    key: 'forums-communities',
    label: 'Forums & Communities',
    description: 'Discussion boards and community platforms',
  },
  {
    key: 'file-sharing-torrents',
    label: 'File Sharing/Torrents',
    description: 'Peer-to-peer file sharing and distribution',
  },
  {
    key: 'search-engines-portals',
    label: 'Search Engines & Portals',
    description: 'Web search and directory portals',
  },
  {
    key: 'mobile-app',
    label: 'Mobile App',
    description: 'Applications for mobile devices',
  },
  {
    key: 'desktop-app',
    label: 'Desktop App',
    description: 'Applications for desktop computers',
  },
  {
    key: 'government-non-profit',
    label: 'Government & Non-Profit',
    description: 'Public sector and non-profit organization services',
  },
  {
    key: 'boilerplates',
    label: 'Boilerplates',
    description: 'Starter templates and code scaffolding',
  },
  {
    key: 'technology-saas',
    label: 'Technology & SaaS',
    description: 'Software as a Service and tech solutions',
  },
  {
    key: 'blog-personal',
    label: 'Blog & Personal',
    description: 'Personal blogs and websites',
  },
  {
    key: 'file-sharing-storage',
    label: 'File Sharing & Storage',
    description: 'Cloud storage and file management',
  },
  {
    key: 'mobile-app-specific',
    label: 'Mobile App Specific',
    description: 'Specialized mobile application features',
  },
  {
    key: 'desktop-app-specific',
    label: 'Desktop App Specific',
    description: 'Specialized desktop application features',
  },
  {
    key: 'boilerplates-dev-tools',
    label: 'Boilerplates & Dev Tools',
    description: 'Development templates and utilities',
  },
  {
    key: 'design-creative',
    label: 'Design & Creative',
    description: 'Creative design tools and resources',
  },
  {
    key: 'game-development',
    label: 'Game Development',
    description: 'Video game creation and design',
  },
  {
    key: 'construction-engineering',
    label: 'Construction & Engineering',
    description: 'Building and structural engineering',
  },
  {
    key: 'logistics-transport',
    label: 'Logistics & Transport',
    description: 'Supply chain and transportation management',
  },
  {
    key: 'health-telemedicine',
    label: 'Health & Telemedicine',
    description: 'Healthcare services and remote medical care',
  },
  {
    key: 'web-filtering-security',
    label: 'Web Filtering / Security',
    description: 'Content filtering and security services',
  },
  {
    key: 'seo-marketing',
    label: 'SEO & Marketing',
    description: 'Search engine optimization and marketing tools',
  },
  {
    key: 'devops-infrastructure',
    label: 'DevOps & Infrastructure',
    description: 'Development operations and infrastructure management',
  },
  {
    key: 'git-version-control',
    label: 'Git & Version Control',
    description: 'Version control systems and collaboration',
  },
  {
    key: 'development-tools',
    label: 'Development Tools',
    description: 'Software development utilities',
  },
  {
    key: 'data-converters',
    label: 'Data & Converters',
    description: 'Data transformation and conversion tools',
  },
  {
    key: 'database-tools',
    label: 'Database Tools',
    description: 'Database management and utilities',
  },
  {
    key: 'backend-tools',
    label: 'Backend Tools',
    description: 'Server-side development tools',
  },
  {
    key: 'web-apis',
    label: 'Web APIs',
    description: 'Application Programming Interfaces for web',
  },
  {
    key: 'pwa-mobile',
    label: 'PWA & Mobile',
    description: 'Progressive Web Apps and mobile solutions',
  },
  {
    key: 'design-tools',
    label: 'Design Tools',
    description: 'UI/UX design and prototyping tools',
  },
  {
    key: 'web-templates',
    label: 'Web Templates',
    description: 'Website themes and templates',
  },
  {
    key: 'security-tools',
    label: 'Security Tools',
    description: 'Cybersecurity and protection utilities',
  },
  {
    key: 'web-graphics',
    label: 'Web Graphics',
    description: 'Graphics and visualization for the web',
  },
  {
    key: 'web-performance',
    label: 'Web Performance',
    description: 'Optimization tools for web speed and efficiency',
  },
  {
    key: 'storage',
    label: 'Storage',
    description: 'Data storage solutions',
  },
  {
    key: 'audio',
    label: 'Audio',
    description: 'Audio processing and management',
  },
  {
    key: 'ai-llms',
    label: 'AI & LLMs',
    description: 'Artificial Intelligence and Large Language Models',
  },
  {
    key: 'backend-performance',
    label: 'Backend Performance',
    description: 'Server-side optimization and monitoring',
  },
  {
    key: 'realtime',
    label: 'Realtime',
    description: 'Real-time data and communication',
  },
  {
    key: 'backend-architecture',
    label: 'Backend Architecture',
    description: 'Server-side system design',
  },
  {
    key: 'frontend-architecture',
    label: 'Frontend Architecture',
    description: 'Client-side system design',
  },
  {
    key: 'mobile-notifications',
    label: 'Mobile & Notifications',
    description: 'Mobile development and push notifications',
  },
  {
    key: 'web-security',
    label: 'Web Security',
    description: 'Security for web applications',
  },
  {
    key: 'devops',
    label: 'DevOps',
    description: 'Development and operations practices',
  },
  {
    key: 'infrastructure-code',
    label: 'Infrastructure as Code',
    description: 'Automated infrastructure management',
  },
  {
    key: 'edge-computing',
    label: 'Edge Computing',
    description: 'Distributed computing at the network edge',
  },
  {
    key: 'developer-tools',
    label: 'Developer Tools',
    description: 'Utilities for software developers',
  },
  {
    key: 'web-accessibility',
    label: 'Web Accessibility',
    description: 'Making the web usable for all',
  },
  {
    key: 'ui-components',
    label: 'UI Components',
    description: 'Reusable user interface elements',
  },
  {
    key: 'documents',
    label: 'Documents',
    description: 'Document processing and management',
  },
  {
    key: 'editor',
    label: 'Editor',
    description: 'Text and code editors',
  },
  {
    key: 'media',
    label: 'Media',
    description: 'Multimedia handling and streaming',
  },
  {
    key: 'iot-internet-things',
    label: 'IoT (Internet of Things)',
    description: 'Connected devices and smart technology',
  },
  {
    key: 'iot',
    label: 'IoT',
    description: 'Internet of Things connectivity',
  },
  {
    key: 'monitoring',
    label: 'Monitoring',
    description: 'System monitoring and observability',
  },
  {
    key: 'data-engineering',
    label: 'Data Engineering',
    description: 'Data pipeline construction and management',
  },
  {
    key: 'data-visualization',
    label: 'Data Visualization',
    description: 'Graphical representation of data',
  },
  {
    key: 'maps-geo',
    label: 'Maps & Geo',
    description: 'Mapping and geolocation services',
  },
  {
    key: '3d-graphics',
    label: '3D Graphics',
    description: 'Three-dimensional rendering and modeling',
  },
  {
    key: 'mobile-ui',
    label: 'Mobile UI',
    description: 'User interfaces for mobile applications',
  },
  {
    key: 'desktop-architecture',
    label: 'Desktop Architecture',
    description: 'Desktop application structural design',
  },
  {
    key: 'bots',
    label: 'Bots',
    description: 'Automated software agents',
  },
  {
    key: 'voip-communications',
    label: 'VoIP & Communications',
    description: 'Voice over IP and messaging',
  },
  {
    key: 'audio-speech',
    label: 'Audio & Speech',
    description: 'Sound processing and speech recognition',
  },
  {
    key: 'ai-vision',
    label: 'AI / Vision',
    description: 'Computer vision and image recognition',
  },
  {
    key: 'ui-tools',
    label: 'UI Tools',
    description: 'User interface development utilities',
  },
  {
    key: 'forms',
    label: 'Forms',
    description: 'Form creation and validation',
  },
  {
    key: 'performance',
    label: 'Performance',
    description: 'System speed and efficiency optimization',
  },
  {
    key: 'mobile-tools',
    label: 'Mobile & Tools',
    description: 'Mobile development utilities',
  },
  {
    key: 'web-mobile',
    label: 'Web & Mobile',
    description: 'Cross-platform web and mobile solutions',
  },
  {
    key: 'data-analytics',
    label: 'Data & Analytics',
    description: 'Data analysis and business intelligence',
  },
  {
    key: 'frontend',
    label: 'Frontend',
    description: 'Client-side web development',
  },
  {
    key: 'security',
    label: 'Security',
    description: 'System and network security',
  },
  {
    key: 'backend-storage',
    label: 'Backend & Storage',
    description: 'Server-side logic and data storage',
  },
  {
    key: 'mobile',
    label: 'Mobile',
    description: 'Mobile application development',
  },
  {
    key: 'fintech-saas',
    label: 'FinTech & SaaS',
    description: 'Financial technology and software services',
  },
  {
    key: 'communication',
    label: 'Communication',
    description: 'Messaging and communication tools',
  },
  {
    key: 'audio-voice',
    label: 'Audio & Voice',
    description: 'Voice and audio technology',
  },
  {
    key: 'graphics-ar',
    label: 'Graphics & AR',
    description: 'Computer graphics and augmented reality',
  },
  {
    key: 'graphics-physics',
    label: 'Graphics & Physics',
    description: 'Visuals and physics simulation',
  },
  {
    key: 'database',
    label: 'Database',
    description: 'Data management systems',
  },
  {
    key: 'security-compliance',
    label: 'Security & Compliance',
    description: 'Security standards and regulatory compliance',
  },
  {
    key: 'devops-architecture',
    label: 'DevOps & Architecture',
    description: 'Infrastructure and system architecture',
  },
  {
    key: 'resilience-monitoring',
    label: 'Resilience & Monitoring',
    description: 'System reliability and oversight',
  },
  {
    key: 'distributed-systems',
    label: 'Distributed Systems',
    description: 'Computing across multiple networked computers',
  },
  {
    key: 'api-design',
    label: 'API Design',
    description: 'Designing effective interfaces',
  },
  {
    key: 'messaging',
    label: 'Messaging',
    description: 'Message queues and event streaming',
  },
  {
    key: 'microservices',
    label: 'Microservices',
    description: 'Architectural style for structuring applications',
  },
  {
    key: 'security-performance',
    label: 'Security & Performance',
    description: 'Balancing system protection and speed',
  },
  {
    key: 'infrastructure',
    label: 'Infrastructure',
    description: 'Foundational IT resources and services',
  },
  {
    key: 'logging',
    label: 'Logging',
    description: 'System event recording and analysis',
  },
  {
    key: 'devtools',
    label: 'DevTools',
    description: 'Tools for software development',
  },
  {
    key: 'marketing-tools',
    label: 'Marketing & Tools',
    description: 'Digital marketing utilities',
  },
  {
    key: 'web-scraping',
    label: 'Web Scraping',
    description: 'Data extraction from websites',
  },
  {
    key: 'seo',
    label: 'SEO',
    description: 'Search engine optimization',
  },
  {
    key: 'apis',
    label: 'APIs',
    description: 'Application Programming Interfaces',
  },
  {
    key: 'seo-social',
    label: 'SEO & Social',
    description: 'Search and social media optimization',
  },
  {
    key: 'networking',
    label: 'Networking',
    description: 'Network configuration and management',
  },
  {
    key: 'mobile-sensors',
    label: 'Mobile / Sensors',
    description: 'Mobile device hardware integration',
  },
  {
    key: 'desktop',
    label: 'Desktop',
    description: 'Desktop computing environments',
  },
  {
    key: 'hardware',
    label: 'Hardware',
    description: 'Physical computing components',
  },
  {
    key: 'desktop-backend',
    label: 'Desktop / Backend',
    description: 'Desktop and server-side integration',
  },
  {
    key: 'desktop-storage',
    label: 'Desktop / Storage',
    description: 'Local data storage on desktops',
  },
  {
    key: 'edge',
    label: 'Edge',
    description: 'Edge computing solutions',
  },
  {
    key: 'edge-storage',
    label: 'Edge / Storage',
    description: 'Data storage at the edge',
  },
  {
    key: 'edge-caching',
    label: 'Edge / Caching',
    description: 'Content caching at the edge',
  },
  {
    key: 'edge-middleware',
    label: 'Edge / Middleware',
    description: 'Middleware for edge applications',
  },
  {
    key: 'edge-routing',
    label: 'Edge / Routing',
    description: 'Network routing at the edge',
  },
  {
    key: 'edge-rendering',
    label: 'Edge / Rendering',
    description: 'Content rendering at the edge',
  },
  {
    key: 'edge-automation',
    label: 'Edge / Automation',
    description: 'Automating edge workflows',
  },
  {
    key: 'security-edge',
    label: 'Security / Edge',
    description: 'Security for edge computing',
  },
  {
    key: 'network-devops',
    label: 'Network / DevOps',
    description: 'Network operations and development',
  },
  {
    key: 'wasm-webassembly',
    label: 'WASM / WebAssembly',
    description: 'Binary instruction format for the web',
  },
  {
    key: 'wasm-webassembly-alt',
    label: 'Wasm / WebAssembly',
    description: 'WebAssembly technologies',
  },
  {
    key: 'graphics-shader',
    label: 'Graphics / Shader',
    description: 'Shader programming and graphics',
  },
  {
    key: 'ai-vision',
    label: 'AI / Vision',
    description: 'Artificial intelligence for visual data',
  },
  {
    key: 'ai-deep-learning',
    label: 'AI / Deep Learning',
    description: 'Advanced neural network techniques',
  },
  {
    key: 'ai-inference',
    label: 'AI / Inference',
    description: 'Running AI models for prediction',
  },
];

export default promptCategories;
