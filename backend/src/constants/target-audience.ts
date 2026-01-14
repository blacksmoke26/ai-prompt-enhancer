/**
 * Represents a structured response with categorized values, often used for documentation or API response formatting.
 * Each category contains multiple values, each with metadata like description, parameters, and tone.
 */
export interface TargetAudience {
  key: string;
  /** The display name or title of this value */
  label: string;
  /** A more detailed summary than `shortDescription`, but less than `description` */
  summary: string;
  /** A full explanation or detailed description of this value */
  description: string;
  /** An array of strings representing relevant tags or keywords for this value */
  tags: string[];
  /** The category or group belongs to */
  category: string;
}

const targetAudiences: TargetAudience[] = [
  {
    key: 'web-dev-novice',
    label: 'Aspiring Web Developer',
    summary: 'Individuals just starting their journey in building websites.',
    description:
      'Users who are learning HTML, CSS, and basic JavaScript. They need clear, jargon-free explanations and step-by-step guides to build their first static pages.',
    tags: ['html', 'css', 'javascript', 'beginner', 'coding'],
    category: 'Software Development',
  },
  {
    key: 'web-dev-junior',
    label: 'Junior Web Developer',
    summary:
      'Developers with 1-2 years of experience familiar with modern frameworks.',
    description:
      'Proficient in basic syntax and can build simple applications. They are learning about state management, APIs, and version control but still require guidance on best practices.',
    tags: ['react', 'vue', 'angular', 'api', 'git'],
    category: 'Software Development',
  },
  {
    key: 'web-dev-senior',
    label: 'Senior Web Engineer',
    summary:
      'Experienced developers capable of architecting complex applications.',
    description:
      'Experts in performance optimization, scalability, security, and system design. They require deep technical documentation, API references, and architectural patterns.',
    tags: ['architecture', 'scalability', 'performance', 'leadership'],
    category: 'Software Development',
  },
  {
    key: 'mobile-dev-hobbyist',
    label: 'Mobile App Hobbyist',
    summary:
      'Enthusiasts building apps for fun or personal use on iOS or Android.',
    description:
      'Focuses on no-code tools or simple frameworks like Flutter or React Native. They prioritize quick visual results over deep code optimization.',
    tags: ['flutter', 'react-native', 'no-code', 'mobile'],
    category: 'Software Development',
  },
  {
    key: 'mobile-dev-professional',
    label: 'Professional Mobile Engineer',
    summary:
      'Specialists in native (Swift/Kotlin) or cross-platform development.',
    description:
      'Concerned with memory management, lifecycle handling, and app store optimization. They need detailed API docs and native interface guidelines.',
    tags: ['swift', 'kotlin', 'ios', 'android', 'native'],
    category: 'Software Development',
  },
  {
    key: 'devops-beginner',
    label: 'DevOps Trainee',
    summary:
      'Individuals learning the basics of CI/CD and cloud infrastructure.',
    description:
      'Familiarizing themselves with Linux, basic scripting, and tools like Jenkins or GitHub Actions. They need tutorials on pipeline creation and deployment.',
    tags: ['ci/cd', 'aws', 'azure', 'linux', 'infrastructure'],
    category: 'Software Development',
  },
  {
    key: 'devops-expert',
    label: 'DevOps Architect',
    summary: 'Experts in automating and scaling complex infrastructure.',
    description:
      'Focuses on Kubernetes orchestration, Infrastructure as Code (Terraform), and microservices security. Requires high-level architectural diagrams and CLI references.',
    tags: ['kubernetes', 'terraform', 'microservices', 'security'],
    category: 'Software Development',
  },
  {
    key: 'game-dev-indie',
    label: 'Indie Game Developer',
    summary: 'Solo developers or small teams creating games independently.',
    description:
      'Often uses engines like Unity or Godot. They need resources on asset integration, gameplay scripting, and marketing their games.',
    tags: ['unity', 'unreal', 'godot', 'game-design', 'c#'],
    category: 'Software Development',
  },
  {
    key: 'game-dev-studio',
    label: 'AAA Studio Developer',
    summary: 'Professional developers working in large game studios.',
    description:
      'Specialized in graphics programming (C++), physics engines, and network multiplayer optimization. Needs low-level engine documentation and performance profiling tools.',
    tags: ['c++', 'graphics', 'physics', 'networking', 'aaa'],
    category: 'Software Development',
  },
  {
    key: 'qa-manual',
    label: 'Manual QA Tester',
    summary:
      'Testers who validate software features without automated scripts.',
    description:
      'Focuses on user experience, exploratory testing, and bug reporting. Needs clear user stories and reproducible bug descriptions.',
    tags: ['testing', 'qa', 'bugs', 'user-experience'],
    category: 'Software Development',
  },
  {
    key: 'qa-automation',
    label: 'SDET (Test Automation Engineer)',
    summary: 'Developers who write code to test other code.',
    description:
      'Proficient in frameworks like Selenium or Cypress. They need API endpoints for testing and documentation on integration patterns.',
    tags: ['selenium', 'cypress', 'automation', 'java', 'python'],
    category: 'Software Development',
  },
  {
    key: 'backend-developer',
    label: 'Backend Developer',
    summary: 'Specialists in server-side logic and database integration.',
    description:
      'Focuses on API design, database optimization, and server infrastructure. Needs access to backend frameworks, data modeling tools, and server performance metrics.',
    tags: ['api', 'database', 'server', 'nodejs', 'python'],
    category: 'Software Development',
  },
  {
    key: 'frontend-developer',
    label: 'Frontend Developer',
    summary:
      'Developers focused on user interface and client-side interactions.',
    description:
      'Expert in modern frontend frameworks (React, Vue, Angular) and responsive design. Needs component libraries, performance optimization guides, and accessibility standards.',
    tags: ['react', 'vue', 'angular', 'responsive', 'css'],
    category: 'Software Development',
  },
  {
    key: 'fullstack-developer',
    label: 'Full Stack Developer',
    summary:
      'Professionals with expertise in both frontend and backend technologies.',
    description:
      'Balances both client and server-side development. Requires knowledge of full development cycles, cross-platform integration, and deployment strategies.',
    tags: ['fullstack', 'javascript', 'react', 'nodejs', 'database'],
    category: 'Software Development',
  },
  {
    key: 'mobile-app-developer',
    label: 'Mobile App Developer',
    summary: 'Specialists building applications for mobile platforms.',
    description:
      'Focuses on mobile-specific development practices, app store submission, and mobile performance optimization. Needs platform-specific guidelines and SDK documentation.',
    tags: ['mobile', 'ios', 'android', 'sdk', 'app-store'],
    category: 'Software Development',
  },
  {
    key: 'data-engineer',
    label: 'Data Engineer',
    summary: 'Experts in building and maintaining data pipelines.',
    description:
      'Designs data architecture, manages ETL processes, and ensures data quality. Needs tools for data integration, pipeline monitoring, and data warehouse management.',
    tags: ['data-pipeline', 'etl', 'database', 'big-data', 'architecture'],
    category: 'Software Development',
  },
  {
    key: 'cloud-engineer',
    label: 'Cloud Engineer',
    summary: 'Professionals managing infrastructure in cloud environments.',
    description:
      'Specializes in cloud architecture, deployment automation, and scalable infrastructure design. Requires cloud platform documentation, security compliance, and cost optimization guides.',
    tags: ['cloud', 'aws', 'azure', 'gcp', 'infrastructure'],
    category: 'Software Development',
  },
  {
    key: 'data-student',
    label: 'Data Science Student',
    summary: 'Learners exploring statistics, Python, and basic ML models.',
    description:
      'Focuses on understanding concepts like regression, classification, and data visualization (Matplotlib/Seaborn). Needs concept explanations and clean datasets.',
    tags: ['python', 'pandas', 'statistics', 'ml', 'learning'],
    category: 'Data Science & AI',
  },
  {
    key: 'data-analyst',
    label: 'Data Analyst',
    summary:
      'Professionals who interpret data to help businesses make decisions.',
    description:
      'Experts in SQL, Excel, and BI tools (Tableau/PowerBI). They need data dictionaries and clear schema definitions to build dashboards.',
    tags: ['sql', 'tableau', 'powerbi', 'visualization', 'business'],
    category: 'Data Science & AI',
  },
  {
    key: 'data-scientist',
    label: 'Data Scientist',
    summary: 'Experts building predictive models and complex algorithms.',
    description:
      'Focuses on feature engineering, model tuning, and deployment (MLOps). They require API access to computational resources and detailed mathematical explanations.',
    tags: ['machine-learning', 'nlp', 'deep-learning', 'algorithms'],
    category: 'Data Science & AI',
  },
  {
    key: 'ml-engineer',
    label: 'Machine Learning Engineer',
    summary: 'Engineers specializing in deploying ML models to production.',
    description:
      'Bridges the gap between data science and DevOps. Focuses on model latency, scalability, and pipeline architecture.',
    tags: ['mlops', 'tensorflow', 'pytorch', 'deployment'],
    category: 'Data Science & AI',
  },
  {
    key: 'ai-prompt-learner',
    label: 'Prompt Engineering Novice',
    summary: 'Users learning how to effectively communicate with LLMs.',
    description:
      'Experimenting with basic prompts to generate text or images. Needs examples of effective prompt structures and common pitfalls.',
    tags: ['llm', 'chatgpt', 'prompts', 'generative-ai'],
    category: 'Data Science & AI',
  },
  {
    key: 'ai-researcher',
    label: 'AI Researcher',
    summary:
      'Academics and professionals pushing the boundaries of AI capabilities.',
    description:
      'Reads academic papers and designs new neural network architectures. Needs access to raw data, model weights, and hyperparameters.',
    tags: ['research', 'academic', 'neural-networks', 'innovation'],
    category: 'Data Science & AI',
  },
  {
    key: 'ai-engineer',
    label: 'AI Engineer',
    summary: 'Professionals building and deploying AI solutions.',
    description:
      'Focuses on AI system implementation, model optimization, and integration with existing platforms. Needs documentation on AI frameworks, deployment platforms, and model monitoring tools.',
    tags: ['ai', 'machine-learning', 'tensorflow', 'pytorch', 'deployment'],
    category: 'Data Science & AI',
  },
  {
    key: 'data-architect',
    label: 'Data Architect',
    summary: 'Experts designing data systems and structures.',
    description:
      'Designs enterprise data architecture, ensures data governance, and creates scalable data solutions. Requires access to data modeling tools, data governance frameworks, and architecture documentation.',
    tags: [
      'data-architecture',
      'database',
      'governance',
      'design',
      'enterprise',
    ],
    category: 'Data Science & AI',
  },
  {
    key: 'business-intelligence-analyst',
    label: 'Business Intelligence Analyst',
    summary:
      'Professionals creating reports and dashboards for business insights.',
    description:
      'Focuses on data analysis for strategic decision-making, building reports, and visualizing business metrics. Needs BI tools, dashboard design guides, and data warehouse access.',
    tags: ['bi', 'analytics', 'dashboard', 'reports', 'business'],
    category: 'Data Science & AI',
  },
  {
    key: 'data-privacy-officer',
    label: 'Data Privacy Officer',
    summary:
      'Professionals ensuring compliance with data protection regulations.',
    description:
      'Manages data privacy compliance, privacy impact assessments, and regulatory reporting. Needs access to privacy frameworks, compliance tools, and regulatory updates.',
    tags: ['privacy', 'gdpr', 'compliance', 'regulations', 'data-protection'],
    category: 'Data Science & AI',
  },
  {
    key: 'design-novice',
    label: 'Design Enthusiast',
    summary: 'Individuals exploring graphic design as a hobby.',
    description:
      'Uses tools like Canva or basic Photoshop. They focus on layout, color theory basics, and typography.',
    tags: ['canva', 'photoshop', 'layout', 'color-theory'],
    category: 'Design & Creative',
  },
  {
    key: 'ui-designer',
    label: 'UI Designer',
    summary:
      'Designers focused on the visual look and feel of digital products.',
    description:
      'Expert in Figma or Sketch. They need design system specifications, asset libraries, and interaction guidelines.',
    tags: ['figma', 'sketch', 'visual', 'interface', 'mockups'],
    category: 'Design & Creative',
  },
  {
    key: 'ux-designer',
    label: 'UX Researcher/Designer',
    summary: 'Professionals focused on user flow, research, and accessibility.',
    description:
      'Conducts user interviews and usability testing. Needs documentation on user personas, journey maps, and WCAG accessibility standards.',
    tags: ['research', 'accessibility', 'wireframing', 'usability'],
    category: 'Design & Creative',
  },
  {
    key: 'graphic-designer',
    label: 'Graphic Designer',
    summary: 'Visual communicators working on branding, print, and marketing.',
    description:
      'Proficient in Adobe Illustrator and InDesign. Requires vector assets, brand guidelines, and print specifications (CMYK/Pantone).',
    tags: ['illustrator', 'indesign', 'branding', 'print', 'identity'],
    category: 'Design & Creative',
  },
  {
    key: '3d-artist-beginner',
    label: '3D Art Beginner',
    summary: 'Learners exploring modeling, texturing, and rendering.',
    description:
      'Struggling with concepts like UV mapping and topology. Needs step-by-step workflow tutorials.',
    tags: ['blender', 'maya', 'modeling', 'texturing'],
    category: 'Design & Creative',
  },
  {
    key: '3d-artist-pro',
    label: 'Professional 3D Artist',
    summary:
      'Experts creating assets for games, VFX, or architectural visualization.',
    description:
      'Focuses on photorealistic rendering, rigging, and pipeline integration. Needs technical specs for engine implementation (e.g., Unity/Unreal).',
    tags: ['vfx', 'rendering', 'rigging', 'pipeline', 'zbrush'],
    category: 'Design & Creative',
  },
  {
    key: 'video-editor',
    label: 'Video Editor',
    summary:
      'Professionals editing footage for social media, film, or corporate.',
    description:
      'Uses Premiere Pro or DaVinci Resolve. Needs codec information, export settings, and workflow integration tools.',
    tags: ['premiere', 'davinci', 'editing', 'film', 'post-production'],
    category: 'Design & Creative',
  },
  {
    key: 'motion-designer',
    label: 'Motion Designer',
    summary: 'Designers creating animated content for digital platforms.',
    description:
      'Focuses on animation principles, After Effects, and interactive motion graphics. Needs tutorials, template libraries, and animation guidelines.',
    tags: [
      'after-effects',
      'animation',
      'motion-design',
      'cinema-4d',
      'premiere',
    ],
    category: 'Design & Creative',
  },
  {
    key: 'brand-identity-designer',
    label: 'Brand Identity Designer',
    summary: 'Specialists creating cohesive brand visual systems.',
    description:
      'Designs logos, color palettes, typography, and brand guidelines. Needs brand asset libraries, style guide templates, and creative inspiration resources.',
    tags: ['branding', 'identity', 'logo', 'design-system', 'visual-identity'],
    category: 'Design & Creative',
  },
  {
    key: 'illustrator',
    label: 'Professional Illustrator',
    summary: 'Artists creating digital illustrations and artwork.',
    description:
      'Specializes in vector art, digital painting, and illustration techniques. Needs software tutorials, art supplies, and portfolio development resources.',
    tags: [
      'vector',
      'digital-art',
      'painting',
      'illustration',
      'adobe-illustrator',
    ],
    category: 'Design & Creative',
  },
  {
    key: 'web-designer',
    label: 'Web Designer',
    summary: 'Professionals designing user interfaces for websites.',
    description:
      'Focuses on web layout, responsive design, and user experience. Needs design templates, UX research tools, and web development frameworks.',
    tags: ['web-design', 'ui', 'ux', 'responsive', 'framer'],
    category: 'Design & Creative',
  },
  {
    key: 'product-designer',
    label: 'Product Designer',
    summary: 'Designers focused on creating digital products and services.',
    description:
      'Combines UI/UX design with product development. Needs design systems, prototyping tools, and user research methodologies.',
    tags: ['product-design', 'ux', 'ui', 'prototyping', 'design-system'],
    category: 'Design & Creative',
  },
  {
    key: 'art-director',
    label: 'Art Director',
    summary: 'Creative leaders managing visual design projects.',
    description:
      'Oversees creative direction, manages teams, and ensures visual consistency. Needs project management tools, creative brief templates, and design strategy documentation.',
    tags: [
      'creative-director',
      'visual-direction',
      'brand',
      'leadership',
      'design-strategy',
    ],
    category: 'Design & Creative',
  },
  {
    key: 'business-owner',
    label: 'Small Business Owner',
    summary: 'Entrepreneurs managing small to medium enterprises.',
    description:
      'Focuses on cost-efficiency, marketing ROI, and tools to manage operations. They need simple, high-level summaries of technical capabilities.',
    tags: ['entrepreneur', 'sme', 'marketing', 'operations'],
    category: 'Business & Management',
  },
  {
    key: 'startup-founder',
    label: 'Startup Founder',
    summary: 'Entrepreneurs building high-growth technology companies.',
    description:
      'Needs scalability information, speed-to-market tools, and investor pitch data. Highly concerned with product-market fit and agile methodologies.',
    tags: ['startup', 'innovation', 'agile', 'fundraising'],
    category: 'Business & Management',
  },
  {
    key: 'product-manager',
    label: 'Product Manager',
    summary:
      'Professionals responsible for the strategy and roadmap of a product.',
    description:
      'Bridges the gap between tech and business. Needs feature requirement docs, user analytics, and competitive analysis data.',
    tags: ['roadmap', 'strategy', 'agile', 'scrum', 'kpi'],
    category: 'Business & Management',
  },
  {
    key: 'project-manager',
    label: 'Project Manager',
    summary:
      'Individuals responsible for planning and executing projects within scope.',
    description:
      'Focuses on timelines, resource allocation, and risk management. Needs Gantt chart tools, milestone tracking, and status reporting.',
    tags: ['pmp', 'waterfall', 'risk', 'timeline', 'jira'],
    category: 'Business & Management',
  },
  {
    key: 'executive',
    label: 'C-Level Executive',
    summary: 'Top-tier management (CEO, CFO, CTO) making strategic decisions.',
    description:
      'Needs high-level dashboards, financial forecasts, and executive summaries. Uninterested in technical implementation details, focused on ROI and risk.',
    tags: ['strategy', 'leadership', 'finance', 'high-level'],
    category: 'Business & Management',
  },
  {
    key: 'hr-generalist',
    label: 'HR Generalist',
    summary: 'HR professionals managing recruitment and employee relations.',
    description:
      'Needs tools for applicant tracking, onboarding flows, and performance management summaries.',
    tags: ['recruitment', 'onboarding', 'people-management', 'culture'],
    category: 'Business & Management',
  },
  {
    key: 'marketing-manager',
    label: 'Marketing Manager',
    summary: 'Professionals managing marketing campaigns and brand strategy.',
    description:
      'Focuses on campaign execution, brand positioning, and marketing analytics. Needs campaign templates, analytics tools, and marketing automation platforms.',
    tags: ['marketing', 'campaigns', 'brand', 'analytics', 'strategy'],
    category: 'Business & Management',
  },
  {
    key: 'sales-manager',
    label: 'Sales Manager',
    summary: 'Leaders managing sales teams and territories.',
    description:
      'Needs pipeline forecasting, team performance dashboards, and territory planning data.',
    tags: ['forecasting', 'management', 'revenue', 'territory'],
    category: 'Business & Management',
  },
  {
    key: 'operations-manager',
    label: 'Operations Manager',
    summary: 'Professionals overseeing daily business operations.',
    description:
      'Focuses on process optimization, resource allocation, and operational efficiency. Needs operational dashboards, process documentation, and performance metrics.',
    tags: ['operations', 'efficiency', 'process', 'optimization', 'management'],
    category: 'Business & Management',
  },
  {
    key: 'consultant',
    label: 'Business Consultant',
    summary: 'Experts providing strategic advice to organizations.',
    description:
      'Focuses on business strategy, process improvement, and organizational development. Needs consulting frameworks, case studies, and business analysis tools.',
    tags: [
      'consulting',
      'strategy',
      'business-analysis',
      'improvement',
      'advice',
    ],
    category: 'Business & Management',
  },
  {
    key: 'entrepreneur',
    label: 'Entrepreneur',
    summary: 'Individuals starting and growing their own businesses.',
    description:
      'Needs business planning resources, funding strategies, and market research tools. Focuses on innovation, risk management, and scalability.',
    tags: [
      'entrepreneurship',
      'business-planning',
      'funding',
      'market-research',
      'innovation',
    ],
    category: 'Business & Management',
  },
  {
    key: 'financial-analyst',
    label: 'Financial Analyst',
    summary:
      'Professionals analyzing financial data to guide business decisions.',
    description:
      'Needs historical financial statements, ratio analysis tools, and market trend reports.',
    tags: ['financial-statements', 'valuation', 'modeling', 'excel'],
    category: 'Business & Management',
  },
  {
    key: 'business-strategist',
    label: 'Business Strategist',
    summary: 'Experts developing long-term business strategies.',
    description:
      'Focuses on competitive positioning, market expansion, and strategic planning. Requires industry reports, strategic frameworks, and business intelligence tools.',
    tags: [
      'strategy',
      'planning',
      'business-intelligence',
      'positioning',
      'expansion',
    ],
    category: 'Business & Management',
  },
  {
    key: 'social-media-intern',
    label: 'Social Media Intern',
    summary: 'Beginners managing brand presence on social platforms.',
    description:
      'Focuses on scheduling tools, hashtag research, and basic engagement metrics.',
    tags: ['instagram', 'tiktok', 'linkedin', 'engagement'],
    category: 'Marketing & Sales',
  },
  {
    key: 'content-strategist',
    label: 'Content Strategist',
    summary: 'Planners overseeing long-term content marketing goals.',
    description:
      'Needs SEO tools, editorial calendar templates, and audience demographic data.',
    tags: ['seo', 'editorial', 'audience', 'brand-voice'],
    category: 'Marketing & Sales',
  },
  {
    key: 'digital-marketer',
    label: 'Digital Marketing Specialist',
    summary:
      'Experts in PPC, email campaigns, and conversion rate optimization.',
    description:
      'Requires detailed analytics on click-through rates, cost-per-acquisition, and A/B testing results.',
    tags: ['ppc', 'sem', 'email', 'analytics', 'cro'],
    category: 'Marketing & Sales',
  },
  {
    key: 'sales-rep',
    label: 'Sales Representative',
    summary: 'Individuals focused on selling products or services directly.',
    description:
      'Needs CRM access, lead qualification criteria, and battlecards for handling objections.',
    tags: ['sales', 'crm', 'leads', 'closing'],
    category: 'Marketing & Sales',
  },
  {
    key: 'sales-director',
    label: 'Sales Director',
    summary: 'Leaders managing sales teams and territories.',
    description:
      'Needs pipeline forecasting, team performance dashboards, and territory planning data.',
    tags: ['forecasting', 'management', 'revenue', 'territory'],
    category: 'Marketing & Sales',
  },
  {
    key: 'copywriter',
    label: 'Copywriter',
    summary: 'Writers creating persuasive text for advertising and marketing.',
    description:
      'Needs brand style guides, value proposition statements, and target audience psychographics.',
    tags: ['writing', 'brand', 'persuasion', 'advertising'],
    category: 'Marketing & Sales',
  },
  {
    key: 'brand-manager',
    label: 'Brand Manager',
    summary: 'Professionals responsible for brand development and strategy.',
    description:
      'Focuses on brand positioning, customer perception, and brand consistency. Needs brand guidelines, market research, and brand strategy frameworks.',
    tags: ['brand', 'positioning', 'strategy', 'marketing', 'branding'],
    category: 'Marketing & Sales',
  },
  {
    key: 'customer-success-manager',
    label: 'Customer Success Manager',
    summary: 'Professionals ensuring customer satisfaction and retention.',
    description:
      'Focuses on customer onboarding, support, and relationship management. Needs CRM tools, customer journey mapping, and satisfaction metrics.',
    tags: [
      'customer-success',
      'support',
      'retention',
      'onboarding',
      'satisfaction',
    ],
    category: 'Marketing & Sales',
  },
  {
    key: 'email-marketer',
    label: 'Email Marketing Specialist',
    summary: 'Experts managing email campaigns and automation.',
    description:
      'Needs email marketing platforms, automation workflows, and analytics tools for campaign performance.',
    tags: ['email', 'marketing', 'automation', 'campaigns', 'analytics'],
    category: 'Marketing & Sales',
  },
  {
    key: 'marketing-automation-specialist',
    label: 'Marketing Automation Specialist',
    summary: 'Professionals implementing marketing automation systems.',
    description:
      'Focuses on campaign orchestration, lead scoring, and marketing technology integration. Needs automation platforms, integration guides, and analytics tools.',
    tags: ['automation', 'marketing', 'campaigns', 'integration', 'tools'],
    category: 'Marketing & Sales',
  },
  {
    key: 'seo-specialist',
    label: 'SEO Specialist',
    summary: 'Experts optimizing websites for search engine visibility.',
    description:
      'Needs SEO tools, keyword research, and content optimization guides. Focuses on ranking improvement and organic traffic growth.',
    tags: ['seo', 'optimization', 'keywords', 'content', 'traffic'],
    category: 'Marketing & Sales',
  },
  {
    key: 'social-media-manager',
    label: 'Social Media Manager',
    summary: 'Professionals managing social media presence and engagement.',
    description:
      'Focuses on content creation, audience engagement, and platform analytics. Needs scheduling tools, analytics dashboards, and content planning resources.',
    tags: ['social-media', 'engagement', 'analytics', 'content', 'scheduling'],
    category: 'Marketing & Sales',
  },
  {
    key: 'affiliate-marketer',
    label: 'Affiliate Marketer',
    summary: 'Individuals promoting products for commissions.',
    description:
      'Needs affiliate networks, performance tracking, and conversion optimization tools. Focuses on traffic generation and sales conversion.',
    tags: ['affiliate', 'marketing', 'commission', 'conversion', 'traffic'],
    category: 'Marketing & Sales',
  },
  {
    key: 'finance-novice',
    label: 'Personal Finance Beginner',
    summary: 'Individuals learning to budget and save money.',
    description:
      'Needs simple explanations of interest rates, compound growth, and basic budgeting tools.',
    tags: ['budgeting', 'saving', 'debt', 'basics'],
    category: 'Finance & Trading',
  },
  {
    key: 'day-trader',
    label: 'Active Day Trader',
    summary:
      'Traders buying and selling financial instruments within the same day.',
    description:
      'Requires real-time market data, technical analysis charts, and low-latency execution interfaces.',
    tags: ['stocks', 'forex', 'crypto', 'technical-analysis', 'charts'],
    category: 'Finance & Trading',
  },
  {
    key: 'investment-banker',
    label: 'Investment Banker',
    summary: 'Experts assisting in raising capital and M&A activities.',
    description:
      'Needs deep industry reports, regulatory compliance documents, and complex valuation models.',
    tags: ['mergers', 'acquisitions', 'capital', 'ipo'],
    category: 'Finance & Trading',
  },
  {
    key: 'crypto-enthusiast',
    label: 'Cryptocurrency Enthusiast',
    summary: 'Individuals investing in or mining digital currencies.',
    description:
      'Needs wallet integration guides, whitepapers, and real-time gas fee trackers.',
    tags: ['blockchain', 'bitcoin', 'ethereum', 'defi', 'web3'],
    category: 'Finance & Trading',
  },
  {
    key: 'financial-planner',
    label: 'Financial Planner',
    summary:
      'Professionals creating financial strategies and investment plans.',
    description:
      'Focuses on retirement planning, estate planning, and investment portfolios. Needs financial planning tools, risk assessment frameworks, and regulatory guidance.',
    tags: ['planning', 'retirement', 'investments', 'estate', 'strategy'],
    category: 'Finance & Trading',
  },
  {
    key: 'risk-manager',
    label: 'Risk Manager',
    summary: 'Experts managing financial and operational risks.',
    description:
      'Focuses on risk assessment, mitigation strategies, and regulatory compliance. Needs risk modeling tools, compliance frameworks, and risk reporting systems.',
    tags: ['risk', 'compliance', 'assessment', 'mitigation', 'regulations'],
    category: 'Finance & Trading',
  },
  {
    key: 'portfolio-manager',
    label: 'Portfolio Manager',
    summary: 'Professionals managing investment portfolios for clients.',
    description:
      'Focuses on asset allocation, performance analysis, and client reporting. Needs portfolio management tools, market analysis, and performance tracking systems.',
    tags: ['portfolio', 'investments', 'analysis', 'client', 'management'],
    category: 'Finance & Trading',
  },
  {
    key: 'insurance-agent',
    label: 'Insurance Agent',
    summary: 'Professionals selling insurance products and services.',
    description:
      'Needs product knowledge, client consultation tools, and compliance resources. Focuses on risk assessment and policy recommendations.',
    tags: ['insurance', 'products', 'client', 'compliance', 'risk'],
    category: 'Finance & Trading',
  },
  {
    key: 'credit-analyst',
    label: 'Credit Analyst',
    summary:
      'Professionals evaluating creditworthiness of individuals and businesses.',
    description:
      'Focuses on credit scoring, risk assessment, and lending decisions. Needs credit databases, scoring models, and regulatory compliance tools.',
    tags: ['credit', 'risk', 'analysis', 'scoring', 'lending'],
    category: 'Finance & Trading',
  },
  {
    key: 'tax-specialist',
    label: 'Tax Specialist',
    summary: 'Experts handling tax planning and compliance.',
    description:
      'Focuses on tax strategy, compliance, and planning for individuals and businesses. Needs tax software, regulatory updates, and planning guides.',
    tags: ['tax', 'planning', 'compliance', 'strategy', 'software'],
    category: 'Finance & Trading',
  },
  {
    key: 'k12-student',
    label: 'K-12 Student',
    summary: 'Primary and secondary school students.',
    description:
      'Requires interactive, engaging, and age-appropriate learning materials. Visual aids are crucial.',
    tags: ['learning', 'education', 'school', 'homework'],
    category: 'Education & Academia',
  },
  {
    key: 'undergrad',
    label: 'University Student',
    summary: 'Individuals pursuing higher education degrees.',
    description:
      'Needs academic resources, citation tools, research databases, and internship information.',
    tags: ['university', 'research', 'degree', 'career'],
    category: 'Education & Academia',
  },
  {
    key: 'academic-researcher',
    label: 'Academic Researcher',
    summary: 'PhD candidates and professors conducting advanced studies.',
    description:
      'Requires access to peer-reviewed journals, grant application portals, and statistical analysis software (SPSS/R).',
    tags: ['phd', 'journal', 'grants', 'statistics', 'publication'],
    category: 'Education & Academia',
  },
  {
    key: 'teacher',
    label: 'K-12 Educator',
    summary: 'Teachers managing classroom learning and curriculum.',
    description:
      'Needs lesson plan repositories, grading tools, and classroom management resources.',
    tags: ['teaching', 'curriculum', 'grading', 'classroom'],
    category: 'Education & Academia',
  },
  {
    key: 'professor',
    label: 'University Professor',
    summary: 'Higher education instructors and lecturers.',
    description:
      'Needs syllabus management tools, lecture recording platforms, and plagiarism detection software.',
    tags: ['lecturing', 'syllabus', 'higher-ed', 'tenure'],
    category: 'Education & Academia',
  },
  {
    key: 'educational-technology-specialist',
    label: 'Educational Technology Specialist',
    summary: 'Professionals integrating technology in educational settings.',
    description:
      'Focuses on learning management systems, educational apps, and digital tools for teaching. Needs platform documentation, educational software reviews, and integration guides.',
    tags: [
      'edtech',
      'learning-management',
      'digital-tools',
      'technology',
      'classroom',
    ],
    category: 'Education & Academia',
  },
  {
    key: 'curriculum-developer',
    label: 'Curriculum Developer',
    summary: 'Experts designing educational programs and course materials.',
    description:
      'Focuses on curriculum design, learning objectives, and assessment strategies. Needs curriculum frameworks, learning standards, and assessment tools.',
    tags: ['curriculum', 'development', 'learning', 'assessment', 'standards'],
    category: 'Education & Academia',
  },
  {
    key: 'online-educator',
    label: 'Online Educator',
    summary: 'Professionals teaching in virtual or hybrid environments.',
    description:
      'Needs online learning platforms, virtual classroom tools, and engagement strategies. Focuses on remote learning effectiveness and student interaction.',
    tags: [
      'online-learning',
      'virtual-classroom',
      'engagement',
      'platforms',
      'remote',
    ],
    category: 'Education & Academia',
  },
  {
    key: 'student-counselor',
    label: 'Student Counselor',
    summary:
      'Professionals supporting student development and academic success.',
    description:
      'Focuses on academic advising, career planning, and student well-being. Needs counseling resources, career assessment tools, and student support systems.',
    tags: ['counseling', 'advising', 'student-support', 'career', 'well-being'],
    category: 'Education & Academia',
  },
  {
    key: 'academic-librarian',
    label: 'Academic Librarian',
    summary: 'Professionals managing library resources and research support.',
    description:
      'Focuses on information access, research support, and digital library services. Needs library management systems, research databases, and information literacy tools.',
    tags: ['library', 'research', 'information', 'databases', 'support'],
    category: 'Education & Academia',
  },
  {
    key: 'teacher-trainer',
    label: 'Teacher Trainer',
    summary: 'Professionals providing professional development for educators.',
    description:
      'Focuses on teaching methodologies, curriculum implementation, and professional growth. Needs training resources, assessment tools, and educational best practices.',
    tags: [
      'training',
      'professional-development',
      'teaching',
      'methodology',
      'education',
    ],
    category: 'Education & Academia',
  },
  {
    key: 'educational-administrator',
    label: 'Educational Administrator',
    summary: 'Leaders managing educational institutions and programs.',
    description:
      'Focuses on institutional policy, resource management, and program development. Needs administrative tools, policy frameworks, and strategic planning resources.',
    tags: [
      'administration',
      'policy',
      'management',
      'institutions',
      'planning',
    ],
    category: 'Education & Academia',
  },
  {
    key: 'patient',
    label: 'General Patient',
    summary: 'Individuals seeking medical information or services.',
    description:
      'Needs information in plain language, focusing on symptoms, treatments, and wellness. Privacy is a major concern.',
    tags: ['health', 'wellness', 'symptoms', 'patients'],
    category: 'Healthcare',
  },
  {
    key: 'med-student',
    label: 'Medical Student',
    summary: 'Students studying to become doctors.',
    description:
      'Requires detailed anatomical atlases, case studies, and drug interaction databases.',
    tags: ['anatomy', 'physiology', 'pharmacology', 'clinical'],
    category: 'Healthcare',
  },
  {
    key: 'nurse',
    label: 'Registered Nurse',
    summary: 'Healthcare professionals providing patient care.',
    description:
      'Needs quick reference guides for drug dosages, patient monitoring protocols, and triage procedures.',
    tags: ['patient-care', 'triage', 'medication', 'clinical'],
    category: 'Healthcare',
  },
  {
    key: 'physician',
    label: 'Attending Physician',
    summary: 'Doctors specializing in diagnosis and treatment.',
    description:
      'Requires access to the latest clinical trials, specialized imaging tools, and electronic health records (EHR).',
    tags: ['diagnosis', 'specialist', 'ehr', 'medicine'],
    category: 'Healthcare',
  },
  {
    key: 'medical-researcher',
    label: 'Clinical Researcher',
    summary: 'Scientists conducting trials for new drugs or treatments.',
    description:
      'Needs data management systems for clinical trials, regulatory compliance guides (FDA/EMA), and statistical analysis.',
    tags: ['clinical-trials', 'fda', 'regulations', 'bio-statistics'],
    category: 'Healthcare',
  },
  {
    key: 'pharmacist',
    label: 'Pharmacist',
    summary: 'Professionals managing medications and patient drug information.',
    description:
      'Focuses on medication dispensing, drug interactions, and patient counseling. Needs pharmaceutical databases, drug information resources, and compliance tools.',
    tags: ['pharmacy', 'medications', 'counseling', 'drug', 'compliance'],
    category: 'Healthcare',
  },
  {
    key: 'healthcare-administrator',
    label: 'Healthcare Administrator',
    summary: 'Professionals managing healthcare facilities and operations.',
    description:
      'Focuses on facility management, resource allocation, and regulatory compliance. Needs management systems, compliance documentation, and operational tools.',
    tags: [
      'healthcare',
      'management',
      'facilities',
      'compliance',
      'operations',
    ],
    category: 'Healthcare',
  },
  {
    key: 'public-health-officer',
    label: 'Public Health Officer',
    summary: 'Experts managing community health and disease prevention.',
    description:
      'Focuses on epidemiology, health policy, and community outreach. Needs health statistics, policy documents, and prevention program resources.',
    tags: [
      'public-health',
      'epidemiology',
      'policy',
      'prevention',
      'community',
    ],
    category: 'Healthcare',
  },
  {
    key: 'medical-technician',
    label: 'Medical Technician',
    summary:
      'Professionals performing diagnostic tests and medical procedures.',
    description:
      'Focuses on laboratory testing, medical equipment operation, and patient diagnostics. Needs equipment manuals, safety protocols, and testing guidelines.',
    tags: ['medical', 'diagnostic', 'laboratory', 'equipment', 'testing'],
    category: 'Healthcare',
  },
  {
    key: 'medical-informatics-specialist',
    label: 'Medical Informatics Specialist',
    summary: 'Experts integrating information technology with healthcare.',
    description:
      'Focuses on health data systems, information management, and digital health tools. Needs health IT platforms, data analytics, and system integration resources.',
    tags: [
      'health-informatics',
      'data',
      'technology',
      'systems',
      'digital-health',
    ],
    category: 'Healthcare',
  },
  {
    key: 'health-coach',
    label: 'Health Coach',
    summary: 'Professionals providing wellness guidance and lifestyle support.',
    description:
      'Focuses on nutrition, fitness, and behavior change. Needs wellness resources, exercise programs, and client support tools.',
    tags: ['wellness', 'nutrition', 'fitness', 'coaching', 'lifestyle'],
    category: 'Healthcare',
  },
  {
    key: 'mental-health-counselor',
    label: 'Mental Health Counselor',
    summary: 'Professionals providing psychological support and therapy.',
    description:
      'Focuses on therapeutic techniques, client support, and mental health interventions. Needs therapeutic resources, assessment tools, and professional development materials.',
    tags: ['mental-health', 'therapy', 'counseling', 'support', 'wellness'],
    category: 'Healthcare',
  },
  {
    key: 'healthcare-researcher',
    label: 'Healthcare Researcher',
    summary: 'Scientists studying health outcomes and medical treatments.',
    description:
      'Focuses on clinical research, health data analysis, and treatment development. Needs research databases, data analysis tools, and research methodology resources.',
    tags: ['research', 'health', 'clinical', 'data', 'treatment'],
    category: 'Healthcare',
  },
  {
    key: 'legal-client',
    label: 'Legal Client',
    summary: 'Individuals seeking legal representation or advice.',
    description:
      "Needs explanations of legal rights and processes in layman's terms. Cost transparency is important.",
    tags: ['law', 'rights', 'legal-aid'],
    category: 'Legal',
  },
  {
    key: 'paralegal',
    label: 'Paralegal',
    summary: 'Legal assistants supporting lawyers.',
    description:
      'Needs document templates, case management software, and filing procedures.',
    tags: ['document-management', 'filing', 'support', 'admin'],
    category: 'Legal',
  },
  {
    key: 'attorney',
    label: 'Attorney at Law',
    summary: 'Licensed practitioners of law.',
    description:
      'Requires access to legal precedents, comprehensive law libraries, and secure client communication channels.',
    tags: ['court', 'litigation', 'contracts', 'precedent'],
    category: 'Legal',
  },
  {
    key: 'compliance-officer',
    label: 'Corporate Compliance Officer',
    summary: 'Professionals ensuring companies adhere to laws and regulations.',
    description:
      'Needs up-to-date regulatory changes, audit checklists, and risk assessment frameworks.',
    tags: ['regulations', 'audit', 'risk', 'corporate-governance'],
    category: 'Legal',
  },
  {
    key: 'legal-consultant',
    label: 'Legal Consultant',
    summary: 'Experts providing legal advice and strategic guidance.',
    description:
      'Focuses on legal strategy, compliance, and risk management. Needs legal databases, case law, and consulting frameworks.',
    tags: ['legal', 'consulting', 'strategy', 'compliance', 'risk'],
    category: 'Legal',
  },
  {
    key: 'court-reporter',
    label: 'Court Reporter',
    summary: 'Professionals transcribing legal proceedings.',
    description:
      'Focuses on accurate transcription, legal documentation, and court protocols. Needs transcription tools, legal terminology, and reporting standards.',
    tags: ['transcription', 'court', 'legal', 'documentation', 'proceedings'],
    category: 'Legal',
  },
  {
    key: 'legal-researcher',
    label: 'Legal Researcher',
    summary: 'Experts analyzing legal issues and precedents.',
    description:
      'Focuses on case law, statutory interpretation, and legal analysis. Needs legal databases, research tools, and case management systems.',
    tags: ['research', 'law', 'precedent', 'analysis', 'databases'],
    category: 'Legal',
  },
  {
    key: 'patent-attorney',
    label: 'Patent Attorney',
    summary: 'Legal professionals specializing in intellectual property.',
    description:
      'Focuses on patent applications, trademark protection, and IP litigation. Needs patent databases, application guidelines, and legal frameworks.',
    tags: [
      'patents',
      'intellectual-property',
      'trademarks',
      'law',
      'litigation',
    ],
    category: 'Legal',
  },
  {
    key: 'corporate-legal-counsel',
    label: 'Corporate Legal Counsel',
    summary: 'Lawyers providing legal advice to businesses.',
    description:
      'Focuses on corporate law, regulatory compliance, and business transactions. Needs legal databases, compliance resources, and transactional tools.',
    tags: ['corporate', 'law', 'compliance', 'transactions', 'advice'],
    category: 'Legal',
  },
  {
    key: 'family-law-attorney',
    label: 'Family Law Attorney',
    summary: 'Legal professionals specializing in family-related matters.',
    description:
      'Focuses on divorce, custody, adoption, and domestic relations. Needs family law resources, court procedures, and client support materials.',
    tags: ['family-law', 'divorce', 'custody', 'adoption', 'relations'],
    category: 'Legal',
  },
  {
    key: 'criminal-defense-attorney',
    label: 'Criminal Defense Attorney',
    summary:
      'Lawyers specializing in defending individuals against criminal charges.',
    description:
      'Focuses on criminal procedure, evidence handling, and defense strategies. Needs legal precedents, court procedures, and defense resources.',
    tags: ['criminal-law', 'defense', 'procedure', 'evidence', 'strategy'],
    category: 'Legal',
  },
  {
    key: 'litigation-specialist',
    label: 'Litigation Specialist',
    summary: 'Professionals managing legal disputes and court proceedings.',
    description:
      'Focuses on case management, court filings, and litigation strategy. Needs case management tools, legal procedures, and litigation resources.',
    tags: ['litigation', 'court', 'case-management', 'proceedings', 'strategy'],
    category: 'Legal',
  },
  {
    key: 'fitness-beginner',
    label: 'Fitness Beginner',
    summary: 'Individuals starting a workout routine for the first time.',
    description:
      'Needs beginner workout plans, nutrition guides, and motivational content.',
    tags: ['gym', 'workout', 'health', 'weight-loss'],
    category: 'Lifestyle & Hobbies',
  },
  {
    key: 'personal-trainer',
    label: 'Personal Trainer',
    summary: 'Fitness professionals helping clients achieve goals.',
    description:
      'Needs anatomy knowledge, progress tracking tools, and certification renewal resources.',
    tags: ['coaching', 'anatomy', 'progress', 'cpt'],
    category: 'Lifestyle & Hobbies',
  },
  {
    key: 'home-cook',
    label: 'Home Cooking Enthusiast',
    summary: 'Individuals cooking meals at home.',
    description:
      'Needs simple recipes, ingredient substitutions, and kitchen equipment reviews.',
    tags: ['recipes', 'cooking', 'food', 'kitchen'],
    category: 'Lifestyle & Hobbies',
  },
  {
    key: 'professional-chef',
    label: 'Professional Chef',
    summary: 'Culinary experts working in restaurants.',
    description:
      'Needs advanced techniques, supplier information, and kitchen management tools (inventory/scheduling).',
    tags: ['culinary', 'restaurant', 'hospitality', 'menu'],
    category: 'Lifestyle & Hobbies',
  },
  {
    key: 'diy-enthusiast',
    label: 'DIY / Maker',
    summary: 'Individuals who enjoy building and crafting things themselves.',
    description: 'Needs project plans, material lists, and tool tutorials.',
    tags: ['woodworking', 'crafting', 'maker', 'projects'],
    category: 'Lifestyle & Hobbies',
  },
  {
    key: 'gardener',
    label: 'Home Gardener',
    summary: 'Individuals interested in growing plants or vegetables.',
    description:
      'Needs planting schedules, pest control tips, and plant care guides.',
    tags: ['plants', 'vegetables', 'landscape', 'sustainability'],
    category: 'Lifestyle & Hobbies',
  },
  {
    key: 'traveler',
    label: 'Casual Traveler',
    summary: 'People traveling for leisure or vacation.',
    description:
      'Needs itinerary planning tools, booking recommendations, and local guides.',
    tags: ['tourism', 'vacation', 'flights', 'hotels'],
    category: 'Lifestyle & Hobbies',
  },
  {
    key: 'digital-nomad',
    label: 'Digital Nomad',
    summary: 'Professionals working remotely while traveling.',
    description:
      'Needs information on visa requirements, coworking spaces, internet connectivity, and travel gear.',
    tags: ['remote-work', 'travel', 'wifi', 'lifestyle'],
    category: 'Lifestyle & Hobbies',
  },
  {
    key: 'gamer-casual',
    label: 'Casual Gamer',
    summary: 'Players who enjoy games casually for relaxation.',
    description:
      'Needs game reviews, easy difficulty settings, and social connection features.',
    tags: ['gaming', 'entertainment', 'mobile', 'switch'],
    category: 'Lifestyle & Hobbies',
  },
  {
    key: 'gamer-hardcore',
    label: 'Hardcore Gamer',
    summary:
      'Dedicated players focused on competitive gaming and high performance.',
    description:
      'Needs high-fidelity graphics, low latency, competitive leaderboards, and deep lore.',
    tags: ['esports', 'pc-gaming', 'competitive', 'high-fps'],
    category: 'Lifestyle & Hobbies',
  },
  {
    key: 'pet-owner',
    label: 'Pet Owner',
    summary: 'Individuals caring for domestic animals.',
    description:
      'Needs pet care guides, health information, and training resources. Focuses on nutrition, exercise, and behavior management.',
    tags: ['pets', 'care', 'health', 'training', 'nutrition'],
    category: 'Lifestyle & Hobbies',
  },
  {
    key: 'cooking-enthusiast',
    label: 'Cooking Enthusiast',
    summary:
      'Individuals passionate about culinary arts and cooking techniques.',
    description:
      'Focuses on recipe development, cooking methods, and ingredient exploration. Needs cookbooks, technique guides, and culinary resources.',
    tags: ['cooking', 'recipes', 'techniques', 'ingredients', 'culinary'],
    category: 'Lifestyle & Hobbies',
  },
  {
    key: 'home-improvement-enthusiast',
    label: 'Home Improvement Enthusiast',
    summary: 'Individuals working on home renovation and maintenance projects.',
    description:
      'Needs project planning, material guides, and DIY tutorials. Focuses on practical home solutions and design inspiration.',
    tags: [
      'home-improvement',
      'projects',
      'renovation',
      'maintenance',
      'design',
    ],
    category: 'Lifestyle & Hobbies',
  },
  {
    key: 'music-enthusiast',
    label: 'Music Enthusiast',
    summary:
      'Individuals passionate about music creation, listening, and performance.',
    description:
      'Needs music theory guides, instrument tutorials, and performance resources. Focuses on musical development and creativity.',
    tags: ['music', 'performance', 'theory', 'instruments', 'creation'],
    category: 'Lifestyle & Hobbies',
  },
  {
    key: 'photography-enthusiast',
    label: 'Photography Enthusiast',
    summary: 'Individuals enjoying photography as a hobby or creative outlet.',
    description:
      'Needs camera guides, editing software, and composition tutorials. Focuses on visual storytelling and technical skills.',
    tags: ['photography', 'camera', 'editing', 'composition', 'visual'],
    category: 'Lifestyle & Hobbies',
  },
  {
    key: 'book-lover',
    label: 'Book Lover',
    summary: 'Individuals who enjoy reading and exploring literature.',
    description:
      'Needs book recommendations, reading guides, and literary analysis resources. Focuses on diverse reading experiences and literary discovery.',
    tags: ['books', 'reading', 'literature', 'recommendations', 'analysis'],
    category: 'Lifestyle & Hobbies',
  },
  {
    key: 'art-collector',
    label: 'Art Collector',
    summary: 'Individuals collecting and appreciating art works.',
    description:
      'Needs art history resources, collection management, and market insights. Focuses on artistic appreciation and investment strategies.',
    tags: ['art', 'collection', 'history', 'market', 'appreciation'],
    category: 'Lifestyle & Hobbies',
  },
  {
    key: 'yoga-practitioner',
    label: 'Yoga Practitioner',
    summary: 'Individuals practicing yoga for wellness and mindfulness.',
    description:
      'Needs yoga poses, meditation guides, and wellness resources. Focuses on physical and mental health benefits.',
    tags: ['yoga', 'wellness', 'mindfulness', 'meditation', 'health'],
    category: 'Lifestyle & Hobbies',
  },
  {
    key: 'hiking-enthusiast',
    label: 'Hiking Enthusiast',
    summary: 'Individuals enjoying outdoor hiking and nature exploration.',
    description:
      'Needs trail guides, safety resources, and outdoor gear recommendations. Focuses on outdoor adventure and physical activity.',
    tags: ['hiking', 'outdoor', 'adventure', 'nature', 'safety'],
    category: 'Lifestyle & Hobbies',
  },
  {
    key: 'garden-designer',
    label: 'Garden Designer',
    summary: 'Professionals creating outdoor landscape designs.',
    description:
      'Focuses on garden planning, plant selection, and landscape architecture. Needs design software, plant databases, and design inspiration resources.',
    tags: ['garden', 'design', 'landscape', 'planting', 'architecture'],
    category: 'Lifestyle & Hobbies',
  },
  {
    key: 'craft-enthusiast',
    label: 'Craft Enthusiast',
    summary: 'Individuals enjoying various creative crafting activities.',
    description:
      'Needs crafting tutorials, material guides, and creative inspiration. Focuses on various craft techniques and project development.',
    tags: ['crafting', 'projects', 'tutorials', 'materials', 'creativity'],
    category: 'Lifestyle & Hobbies',
  },
  {
    key: 'apprentice-electrician',
    label: 'Electrical Apprentice',
    summary: 'Individuals learning the electrical trade.',
    description:
      'Needs code books (NEC), safety guidelines, and basic circuitry tutorials.',
    tags: ['electrical', 'trade', 'apprenticeship', 'safety'],
    category: 'Trades & Services',
  },
  {
    key: 'master-electrician',
    label: 'Master Electrician',
    summary: 'Licensed experts in electrical systems.',
    description:
      'Needs complex wiring diagrams, permit information, and business management tools for contracting.',
    tags: ['contracting', 'licensing', 'code', 'blueprints'],
    category: 'Trades & Services',
  },
  {
    key: 'mechanic-student',
    label: 'Auto Repair Student',
    summary: 'Students learning to repair and maintain vehicles.',
    description:
      'Needs manuals for specific car models, tool guides, and engine theory.',
    tags: ['automotive', 'engines', 'repair', 'manuals'],
    category: 'Trades & Services',
  },
  {
    key: 'certified-tech',
    label: 'ASE Certified Technician',
    summary: 'Professional auto mechanics with certifications.',
    description:
      'Needs access to manufacturer databases (TSBs), diagnostic software updates, and parts inventory systems.',
    tags: ['diagnostics', 'ase', 'dealer', 'specialty'],
    category: 'Trades & Services',
  },
  {
    key: 'real-estate-agent',
    label: 'Real Estate Agent',
    summary: 'Professionals assisting in buying and selling property.',
    description:
      'Needs MLS listings, market analysis data, and CRM for client management.',
    tags: ['property', 'housing', 'sales', 'mls'],
    category: 'Trades & Services',
  },
  {
    key: 'construction-manager',
    label: 'Construction Manager',
    summary: 'Professionals overseeing construction projects and teams.',
    description:
      'Focuses on project planning, budget management, and team coordination. Needs project management tools, safety protocols, and construction guidelines.',
    tags: ['construction', 'project', 'management', 'planning', 'safety'],
    category: 'Trades & Services',
  },
  {
    key: 'plumber',
    label: 'Plumber',
    summary: 'Professionals installing and maintaining plumbing systems.',
    description:
      'Needs plumbing codes, installation guides, and repair techniques. Focuses on residential and commercial plumbing solutions.',
    tags: ['plumbing', 'installation', 'repair', 'codes', 'maintenance'],
    category: 'Trades & Services',
  },
  {
    key: 'carpenter',
    label: 'Carpenter',
    summary: 'Professionals building and repairing wooden structures.',
    description:
      'Needs woodworking techniques, tool guides, and construction plans. Focuses on carpentry craftsmanship and building projects.',
    tags: ['carpentry', 'woodworking', 'construction', 'tools', 'building'],
    category: 'Trades & Services',
  },
  {
    key: 'welder',
    label: 'Welder',
    summary: 'Professionals joining metal parts through welding techniques.',
    description:
      'Needs welding safety protocols, technique guides, and material specifications. Focuses on welding quality and safety standards.',
    tags: ['welding', 'metal', 'safety', 'techniques', 'materials'],
    category: 'Trades & Services',
  },
  {
    key: 'landscaper',
    label: 'Landscaper',
    summary: 'Professionals designing and maintaining outdoor spaces.',
    description:
      'Needs landscaping design principles, plant care guides, and maintenance techniques. Focuses on outdoor aesthetics and environmental sustainability.',
    tags: ['landscaping', 'design', 'maintenance', 'plants', 'environment'],
    category: 'Trades & Services',
  },
  {
    key: 'janitor',
    label: 'Janitor',
    summary: 'Professionals maintaining clean and safe environments.',
    description:
      'Needs cleaning procedures, safety guidelines, and facility maintenance tips. Focuses on hygiene standards and environmental care.',
    tags: ['cleaning', 'maintenance', 'safety', 'hygiene', 'facility'],
    category: 'Trades & Services',
  },
  {
    key: 'security-officer',
    label: 'Security Officer',
    summary: 'Professionals ensuring safety and security in facilities.',
    description:
      'Needs security protocols, emergency procedures, and surveillance techniques. Focuses on risk management and safety compliance.',
    tags: ['security', 'safety', 'protocols', 'emergency', 'compliance'],
    category: 'Trades & Services',
  },
  {
    key: 'housekeeping-manager',
    label: 'Housekeeping Manager',
    summary: 'Professionals managing housekeeping services in facilities.',
    description:
      'Focuses on service standards, cleaning schedules, and staff management. Needs housekeeping procedures, quality standards, and operational guidelines.',
    tags: ['housekeeping', 'management', 'cleaning', 'standards', 'operations'],
    category: 'Trades & Services',
  },
  {
    key: 'it-support-specialist',
    label: 'IT Support Specialist',
    summary: 'Professionals providing technical support and troubleshooting.',
    description:
      'Needs support tools, troubleshooting guides, and hardware/software documentation. Focuses on user support and system maintenance.',
    tags: ['it', 'support', 'troubleshooting', 'hardware', 'software'],
    category: 'Trades & Services',
  },
  {
    key: 'maintenance-technician',
    label: 'Maintenance Technician',
    summary: 'Professionals maintaining equipment and facilities.',
    description:
      'Needs maintenance procedures, equipment manuals, and safety guidelines. Focuses on equipment reliability and facility upkeep.',
    tags: ['maintenance', 'equipment', 'technician', 'safety', 'upkeep'],
    category: 'Trades & Services',
  },
  {
    key: 'freelance-worker',
    label: 'Freelance Worker',
    summary: 'Individuals providing services on a contract basis.',
    description:
      'Needs project management tools, client communication resources, and service delivery guidelines. Focuses on self-employment and service delivery.',
    tags: ['freelance', 'contract', 'services', 'project', 'self-employed'],
    category: 'Trades & Services',
  },
  {
    key: 'civil-engineer',
    label: 'Civil Engineer',
    summary: 'Engineers designing infrastructure like roads and bridges.',
    description:
      'Needs CAD standards, material specifications (concrete/steel), and environmental regulations.',
    tags: ['infrastructure', 'autocad', 'construction', 'structural'],
    category: 'Science & Engineering',
  },
  {
    key: 'mechanical-engineer',
    label: 'Mechanical Engineer',
    summary: 'Engineers designing mechanical systems and machines.',
    description:
      'Needs CAD/CAM tools, thermal analysis data, and manufacturing process information.',
    tags: ['cad', 'manufacturing', 'robotics', 'physics'],
    category: 'Science & Engineering',
  },
  {
    key: 'lab-technician',
    label: 'Laboratory Technician',
    summary: 'Technicians performing tests and experiments in a lab setting.',
    description:
      'Needs standard operating procedures (SOPs), equipment calibration guides, and safety data sheets (SDS).',
    tags: ['lab', 'chemistry', 'biology', 'safety'],
    category: 'Science & Engineering',
  },
  {
    key: 'biomedical-engineer',
    label: 'Biomedical Engineer',
    summary: 'Engineers developing medical devices and technologies.',
    description:
      'Focuses on medical device design, biocompatibility, and regulatory compliance. Needs medical device databases, safety standards, and design tools.',
    tags: ['biomedical', 'medical', 'devices', 'engineering', 'regulatory'],
    category: 'Science & Engineering',
  },
  {
    key: 'chemical-engineer',
    label: 'Chemical Engineer',
    summary: 'Professionals designing chemical processes and products.',
    description:
      'Needs chemical process information, safety guidelines, and material properties. Focuses on process optimization and product development.',
    tags: ['chemical', 'process', 'engineering', 'safety', 'materials'],
    category: 'Science & Engineering',
  },
  {
    key: 'aerospace-engineer',
    label: 'Aerospace Engineer',
    summary: 'Engineers designing aircraft and spacecraft.',
    description:
      'Focuses on aerodynamics, propulsion systems, and structural design. Needs aerospace databases, simulation tools, and engineering standards.',
    tags: ['aerospace', 'aircraft', 'spacecraft', 'aerodynamics', 'propulsion'],
    category: 'Science & Engineering',
  },
  {
    key: 'environmental-engineer',
    label: 'Environmental Engineer',
    summary: 'Professionals addressing environmental challenges and solutions.',
    description:
      'Focuses on pollution control, waste management, and environmental impact assessment. Needs environmental regulations, assessment tools, and sustainable practices.',
    tags: [
      'environmental',
      'pollution',
      'waste',
      'sustainability',
      'regulations',
    ],
    category: 'Science & Engineering',
  },
  {
    key: 'materials-scientist',
    label: 'Materials Scientist',
    summary: 'Experts studying properties and applications of materials.',
    description:
      'Focuses on material characterization, development, and applications. Needs material databases, testing methods, and research resources.',
    tags: ['materials', 'research', 'properties', 'science', 'applications'],
    category: 'Science & Engineering',
  },
  {
    key: 'nuclear-engineer',
    label: 'Nuclear Engineer',
    summary: 'Professionals working with nuclear technology and applications.',
    description:
      'Focuses on nuclear power generation, safety protocols, and radiation management. Needs nuclear safety guidelines, power systems, and regulatory standards.',
    tags: ['nuclear', 'power', 'safety', 'radiation', 'regulations'],
    category: 'Science & Engineering',
  },
  {
    key: 'geologist',
    label: 'Geologist',
    summary: "Scientists studying Earth's physical structure and processes.",
    description:
      'Focuses on geological mapping, mineral exploration, and environmental impact studies. Needs geological databases, mapping tools, and research resources.',
    tags: ['geology', 'mapping', 'minerals', 'environment', 'research'],
    category: 'Science & Engineering',
  },
  {
    key: 'marine-engineer',
    label: 'Marine Engineer',
    summary: 'Engineers designing and maintaining marine systems and vessels.',
    description:
      'Focuses on ship design, propulsion systems, and marine safety. Needs marine engineering standards, vessel specifications, and safety protocols.',
    tags: ['marine', 'vessel', 'ship', 'propulsion', 'safety'],
    category: 'Science & Engineering',
  },
  {
    key: 'robotics-engineer',
    label: 'Robotics Engineer',
    summary: 'Professionals designing and building robotic systems.',
    description:
      'Focuses on automation, control systems, and robotics applications. Needs robotics frameworks, control algorithms, and design tools.',
    tags: ['robotics', 'automation', 'control', 'design', 'systems'],
    category: 'Science & Engineering',
  },
  {
    key: 'geotechnical-engineer',
    label: 'Geotechnical Engineer',
    summary: 'Engineers specializing in soil and rock mechanics.',
    description:
      'Focuses on foundation design, soil analysis, and geotechnical data. Needs geotechnical databases, analysis tools, and design standards.',
    tags: ['geotechnical', 'soil', 'foundation', 'analysis', 'design'],
    category: 'Science & Engineering',
  },
  {
    key: 'industrial-engineer',
    label: 'Industrial Engineer',
    summary: 'Professionals optimizing production systems and processes.',
    description:
      'Focuses on process improvement, productivity analysis, and system optimization. Needs process analysis tools, optimization techniques, and productivity metrics.',
    tags: ['industrial', 'optimization', 'process', 'productivity', 'analysis'],
    category: 'Science & Engineering',
  },
  {
    key: 'research-scientist',
    label: 'Research Scientist',
    summary: 'Experts conducting scientific research and experiments.',
    description:
      'Focuses on hypothesis testing, experimental design, and data analysis. Needs research databases, experimental tools, and scientific methodologies.',
    tags: ['research', 'science', 'experiment', 'analysis', 'hypothesis'],
    category: 'Science & Engineering',
  },
];

export default targetAudiences;
