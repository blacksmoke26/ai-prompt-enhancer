/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import type { PromptTemplate } from './types';

const promptTemplates: PromptTemplate[] = [
  {
    title: 'Full-Stack E-Commerce MVP',
    description:
      'Generate a complete e-commerce platform with cart, checkout, and admin dashboard.',
    category: 'E-commerce & Shopping',
    tags: ['stripe', 'inventory', 'checkout', 'admin'],
    content:
      'Generate a full-stack E-Commerce MVP using {{techStack}}.\n\n**Core Features:**\n1. Product Catalog with filtering and search.\n2. Shopping Cart logic (state management).\n3. Payment Integration ({{paymentProvider}}).\n4. Order History tracking.\n\n**Tech Specs:**\n- Database: {{dbType}}\n- Auth: {{authProvider}}\n- Styling: {{stylingFramework}}\n\nInclude the database schema, API routes for products/orders, and the Product List/Cart components.',
    variables: [
      {
        name: 'techStack',
        description: 'The technology stack to use for the e-commerce platform.',
        type: 'select',
        options: [
          'MERN (Mongo, Express, React, Node)',
          'Next.js + Supabase',
          'Django + React',
          'Laravel + Vue',
        ],
        required: true,
      },
      {
        name: 'paymentProvider',
        description:
          'The payment provider to integrate for handling transactions.',
        type: 'select',
        options: ['Stripe', 'PayPal', 'Square', 'Paddle'],
        required: true,
      },
      {
        name: 'dbType',
        description: 'The type of database to use for storing data.',
        type: 'select',
        options: ['PostgreSQL', 'MongoDB', 'MySQL', 'SQLite'],
        required: true,
      },
      {
        name: 'authProvider',
        description: 'The authentication provider to use for user management.',
        type: 'select',
        options: ['Auth0', 'Clerk', 'NextAuth', 'Passport.js'],
        required: false,
      },
      {
        name: 'stylingFramework',
        description: 'The styling framework to use for the frontend UI.',
        type: 'select',
        options: ['Tailwind CSS', 'Bootstrap', 'Material UI', 'Shadcn/UI'],
        required: false,
      },
    ],
  },
  {
    title: 'Corporate Business Landing Page',
    description:
      'A high-performance SEO-optimized landing page for a B2B service company.',
    category: 'Business & Corporate',
    tags: ['seo', 'marketing', 'responsive', 'corporate'],
    content:
      'Create a responsive Corporate Landing Page using {{frontendFramework}} and {{stylingFramework}}.\n\n**Sections Required:**\n1. Hero Section with CTA.\n2. Services Grid with icons.\n3. Testimonials Carousel.\n4. Contact Form (validation included).\n5. Footer with sitemap.\n\n**Requirements:**\n- High Lighthouse performance score (90+).\n- SEO Semantic Tags (Article, Section, Header).\n- Animations using {{animationLibrary}}.',
    variables: [
      {
        name: 'frontendFramework',
        description:
          'The frontend framework to use for building the landing page.',
        type: 'select',
        options: ['Next.js', 'React', 'Vue 3', 'SvelteKit', 'Astro'],
        required: true,
      },
      {
        name: 'stylingFramework',
        description:
          'The styling framework to use for designing the landing page.',
        type: 'select',
        options: ['Tailwind CSS', 'Sass/SCSS', 'Styled Components'],
        required: true,
      },
      {
        name: 'animationLibrary',
        description:
          'The animation library to use for adding animations to the landing page.',
        type: 'select',
        options: ['Framer Motion', 'GSAP', 'CSS Transitions', 'Lottie'],
        required: false,
      },
    ],
  },
  {
    title: 'Social Media Feed Engine',
    description:
      'Backend and Frontend for an Instagram/Twitter clone with real-time updates.',
    category: 'Social Media & Networking',
    tags: ['realtime', 'websocket', 'feed', 'likes'],
    content:
      'Build a Social Media Feed application.\n\n**Backend:** {{backendFramework}}\n1. Schema for Users, Posts, Comments, Likes.\n2. API endpoints for creating posts and fetching paginated feeds.\n3. Real-time notification system using {{realtimeEngine}}.\n\n**Frontend:** {{frontendFramework}}\n1. Infinite scrolling feed.\n2. Post creation modal with image upload.\n3. Like/Comment buttons with optimistic UI updates.',
    variables: [
      {
        name: 'backendFramework',
        description:
          'The backend framework to use for the social media feed application.',
        type: 'select',
        options: ['Express', 'Fastify', 'Django REST', 'NestJS', 'Go (Gin)'],
        required: true,
      },
      {
        name: 'frontendFramework',
        description:
          'The frontend framework to use for the social media feed application.',
        type: 'select',
        options: ['React Native', 'React', 'Vue', 'Flutter'],
        required: true,
      },
      {
        name: 'realtimeEngine',
        description:
          'The real-time engine to use for notifications and updates in the social media feed application.',
        type: 'select',
        options: ['Socket.io', 'Pusher', 'Ably', 'WebSockets (native)'],
        required: true,
      },
      {
        name: 'imageStorage',
        description:
          'The image storage service to use for storing media content in the social media feed application.',
        type: 'select',
        options: ['AWS S3', 'Cloudinary', 'Local Storage', 'Firebase Storage'],
        required: false,
      },
    ],
  },
  {
    title: 'News Portal & CMS',
    description:
      'A content-heavy site with a CMS for journalists and a reader view.',
    category: 'News & Media Publishers',
    tags: ['cms', 'wysiwyg', 'headless', 'rss'],
    content:
      'Develop a high-performance News Portal.\n\n**Public Site:**\n- Dynamic featured news slider with auto-play and manual navigation.\n- Advanced category filtering with multi-tag support (Politics, Tech, Sports).\n- SEO-optimized article pages with structured data (Schema.org), lazy loading, and fast load times.\n\n**Admin CMS:**\n- Rich Text Editor ({{editor}}) for writing articles with media embedding support.\n- Comprehensive media management system (upload, crop, organize).\n- Content scheduling and automated publishing workflows.\n- Role-based access control for Editors, Authors, and Admins.\n\n**Tech Stack:** {{cmsStack}}. Include a robust RSS feed generator endpoint and sitemap auto-generation.',
    variables: [
      {
        name: 'cmsStack',
        description:
          'The primary technology stack for the portal and headless CMS.',
        type: 'select',
        options: [
          'Next.js + Sanity.io',
          'WordPress (Headless)',
          'Strapi + React',
          'Custom PHP/Laravel',
        ],
        required: true,
      },
      {
        name: 'editor',
        description:
          'The WYSIWYG editor used for creating and editing rich content in the CMS.',
        type: 'select',
        options: ['TinyMCE', 'Quill', 'Draft.js', 'TipTap'],
        required: false,
      },
    ],
  },
  {
    title: 'LMS / Educational Platform',
    description:
      'A platform for hosting courses, tracking progress, and quizzes.',
    category: 'Educational & Academic',
    tags: ['lms', 'video', 'quiz', 'progress'],
    content:
      'Generate a scalable Learning Management System.\n\n**Features:**\n1. Hierarchical course curriculum structure (Modules -> Lessons -> Topics).\n2. Adaptive video player integration ({{videoProvider}}) with playback speed control and bookmarks.\n3. Advanced Quiz engine supporting multiple-choice, true/false, and drag-and-drop questions.\n4. Comprehensive user progress tracking dashboard with analytics and certificates.\n5. Discussion forums per course for student interaction.\n\n**Database:**\n- Normalized models for Course, Enrollment, Lesson, QuizResult, and UserProgress.\n- Define relationships: User has many Courses, Course has many Modules.\n- Implement optimized querying for reporting.',
    variables: [
      {
        name: 'backendLang',
        description:
          'The programming language and framework for the backend server.',
        type: 'select',
        options: ['Python (Django)', 'Node.js', 'Ruby on Rails', 'PHP'],
        required: true,
      },
      {
        name: 'videoProvider',
        description:
          'The service used for video hosting, streaming, and transcoding.',
        type: 'select',
        options: ['Vimeo API', 'Mux', 'AWS S3 + HLS', 'YouTube Embed'],
        required: false,
      },
      {
        name: 'frontend',
        description:
          'The JavaScript framework for the student and instructor interface.',
        type: 'select',
        options: ['React', 'Vue', 'Angular'],
        required: false,
      },
    ],
  },
  {
    title: 'Portfolio & Creative Showcase',
    description:
      'A visually stunning portfolio with animations and project galleries.',
    category: 'Portfolio & Creative',
    tags: ['creative', 'threejs', 'animation', 'gallery'],
    content:
      'Create a high-impact Portfolio Website optimized for performance and visual appeal.\n\n**Visual Style:** {{visualStyle}} with high-fidelity assets.\n**Key Features:**\n1. Immersive Hero section with interactive 3D elements (using {{3dLibrary}}) or scroll-triggered animations.\n2. Dynamic Project gallery with filtering tags (e.g., Web Design, 3D, Illustration) and lightbox view.\n3. Seamless smooth page transitions and preloading for instant navigation.\n4. Fully functional contact form with validation and spam protection.\n\nEnsure robust mobile responsiveness, keyboard navigability, and strict accessibility compliance (ARIA labels, focus management).',
    variables: [
      {
        name: 'visualStyle',
        description:
          'The overarching aesthetic and design language of the portfolio.',
        type: 'select',
        options: ['Minimalist', 'Brutalist', 'Glassmorphism', 'Neon/Dark Mode'],
        required: true,
      },
      {
        name: '3dLibrary',
        description:
          'The JavaScript library for rendering 3D graphics and animations.',
        type: 'select',
        options: [
          'Three.js',
          'R3F (React Three Fiber)',
          'Spline',
          'None (2D only)',
        ],
        required: false,
      },
      {
        name: 'framework',
        description: 'The frontend framework used to build the site.',
        type: 'select',
        options: ['Next.js', 'Gatsby', 'Plain HTML/JS'],
        required: true,
      },
    ],
  },
  {
    title: 'Streaming Service MVP',
    description: 'Netflix-style video streaming app with user profiles.',
    category: 'Streaming & Entertainment',
    tags: ['streaming', 'video', 'subscriptions'],
    content:
      "Build a responsive Video Streaming MVP focusing on user engagement.\n\n**Backend:** {{backend}}.\n- Implement video ingestion pipeline logic and transcoding for adaptive streaming (concept).\n- Ensure secure serving of DRM-protected video content.\n- Store user watch history and preferences for recommendations.\n\n**Frontend:** {{frontend}}.\n- Create immersive 'Hero' banner with auto-playing video preview and sound toggle.\n- Implement horizontal scrolling carousels for categories (Trending, New Releases, Continue Watching).\n- Custom video player with adaptive controls (Play/Pause, Volume, Timeline, Quality settings).",
    variables: [
      {
        name: 'backend',
        description:
          'The server-side technology stack for handling streaming and data.',
        type: 'select',
        options: ['Node.js + Mux', 'Python + Django', 'Go'],
        required: true,
      },
      {
        name: 'frontend',
        description: 'The client-side technology stack for the user interface.',
        type: 'select',
        options: ['React', 'React Native', 'Flutter', 'Smart TV (WebOS/Tizen)'],
        required: true,
      },
    ],
  },
  {
    title: 'Fintech Dashboard & Crypto Tracker',
    description:
      'Real-time financial data dashboard with charts and portfolio management.',
    category: 'Financial Services & Crypto',
    tags: ['finance', 'charts', 'websocket', 'security'],
    content:
      'Create a professional-grade Financial Dashboard.\n\n**Data Source:** Integrate with {{dataSource}} API for live market data.\n**Features:**\n1. Interactive candlestick charts with technical indicators using {{chartLib}}.\n2. Real-time price updates via WebSockets with sub-millisecond latency.\n3. Portfolio input and tracking (Buy/Sell transactions, PnL calculations).\n4. Visual asset allocation pie chart and performance metrics.\n\n**Security:** Strictly implement rate limiting, input sanitization, and secure API key storage to protect sensitive financial data.',
    variables: [
      {
        name: 'dataSource',
        description:
          'The external API provider for fetching market and crypto data.',
        type: 'select',
        options: ['CoinGecko', 'AlphaVantage', 'Yahoo Finance', 'Binance'],
        required: true,
      },
      {
        name: 'chartLib',
        description:
          'The library used for rendering financial charts and graphs.',
        type: 'select',
        options: ['TradingView Widgets', 'Recharts', 'Chart.js', 'Highcharts'],
        required: true,
      },
      {
        name: 'framework',
        description: 'The frontend framework for the dashboard UI.',
        type: 'select',
        options: ['React', 'Vue', 'Angular'],
        required: true,
      },
    ],
  },
  {
    title: 'Job Board & Recruitment Portal',
    description:
      'Indeed/LinkedIn clone with job posting and application tracking.',
    category: 'Job Boards & Recruitment',
    tags: ['jobs', 'search', 'resume', 'ats'],
    content:
      "Generate a comprehensive Job Board Platform.\n\n**User Roles:** Candidate, Recruiter, Admin.\n**Features:**\n1. Advanced job search with filters (Location, Salary, Type, Experience).\n2. One-click 'Easy Apply' functionality with profile pre-fill.\n3. Resume upload and intelligent parsing logic ({{parsingService}}) to auto-fill candidate details.\n4. Recruiter dashboard to manage applicants, schedule interviews, and track status.\n\n**Stack:** {{techStack}} ensuring scalability for high traffic.",
    variables: [
      {
        name: 'techStack',
        description: 'The full technology stack for the application.',
        type: 'select',
        options: ['Laravel', 'Django', 'MERN', 'WordPress (JobManager)'],
        required: true,
      },
      {
        name: 'parsingService',
        description:
          'The service used to extract data from uploaded resume PDFs.',
        type: 'select',
        options: ['Api.ai (Sovren)', 'Manual Text Extraction', 'Mock Parser'],
        required: false,
      },
    ],
  },
  {
    title: 'Real Estate Listing App',
    description: 'Zillow-style property listing with map integration.',
    category: 'Real Estate & Travel',
    tags: ['map', 'listings', 'search', 'filters'],
    content:
      "Build a feature-rich Real Estate Marketplace.\n\n**Key Integrations:**\n- Interactive Maps using {{mapProvider}} for location-based search.\n\n**Features:**\n1. Toggle between Property list view and interactive Map view.\n2. Advanced search filters (Bedrooms, Bathrooms, Price Range, Amenities, SqFt).\n3. Detailed Property listing page with high-res photo gallery, virtual tour, and mortgage calculator.\n4. Integrated 'Schedule Tour' form with calendar sync.\n\n**Stack:** {{techStack}} optimized for fast geospatial queries.",
    variables: [
      {
        name: 'techStack',
        description: 'The technology stack powering the application.',
        type: 'select',
        options: ['Next.js + MongoDB', 'React + Ruby on Rails', 'PHP + MySQL'],
        required: true,
      },
      {
        name: 'mapProvider',
        description:
          'The mapping service provider for interactive maps and geolocation.',
        type: 'select',
        options: ['Google Maps API', 'Mapbox', 'Leaflet'],
        required: true,
      },
    ],
  },
  {
    title: 'Discussion Forum & Community',
    description:
      'Reddit/Discourse clone with threads, upvotes, and nested comments.',
    category: 'Forums & Communities',
    tags: ['forum', 'nested-comments', 'gamification'],
    content:
      'Create a vibrant Community Forum platform.\n\n**Core Features:**\n1. Customizable feed of threads (Hot/New/Top/Controversial).\n2. Efficient nested comment system (recursive data structure) with expand/collapse.\n3. Community-driven Upvote/Downvote logic with rate limiting.\n4. Rich user profiles with Karma points, badges, and achievement tracking.\n\n**Database:** Focus on efficient querying strategies for recursive comments ({{commentStrategy}}) to handle deep threads without performance hits.',
    variables: [
      {
        name: 'techStack',
        description: 'The backend framework and language for the forum logic.',
        type: 'select',
        options: [
          'Discourse (Ruby)',
          'Node.js (Express)',
          'Django',
          'Flarum (PHP)',
        ],
        required: true,
      },
      {
        name: 'commentStrategy',
        description:
          'The database pattern used to store and retrieve nested comments efficiently.',
        type: 'select',
        options: [
          'Adjacency List',
          'Materialized Path',
          'Nested Sets',
          'Closure Table',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'Secure File Storage & Sharing',
    description:
      'Google Drive/Dropbox clone with drag-and-drop and folder structures.',
    category: 'File Sharing/Torrents',
    tags: ['cloud', 'storage', 'upload', 'security'],
    content:
      'Build a secure, scalable File Storage MVP.\n\n**Features:**\n1. Intuitive File/Folder hierarchy tree view with breadcrumb navigation.\n2. Drag and drop upload zone with progress indicators and chunking.\n3. Secure shareable links with expiration dates, password protection, and access logs.\n4. Visual storage quota visualization and user management.\n\n**Backend:** Integrate directly with {{storageProvider}} SDK for reliable object storage and CDN delivery.',
    variables: [
      {
        name: 'backend',
        description: 'The server-side language and framework.',
        type: 'select',
        options: ['Node.js', 'Python (FastAPI)', 'Go'],
        required: true,
      },
      {
        name: 'storageProvider',
        description: 'The cloud object storage service for file persistence.',
        type: 'select',
        options: ['AWS S3', 'DigitalOcean Spaces', 'MinIO (Self-hosted)'],
        required: true,
      },
      {
        name: 'frontend',
        description: 'The client-side framework for the file manager UI.',
        type: 'select',
        options: ['React', 'Vue', 'Svelte'],
        required: true,
      },
    ],
  },
  {
    title: 'Search Engine & Aggregator',
    description: 'A custom search interface using an indexing API.',
    category: 'Search Engines & Portals',
    tags: ['search', 'elasticsearch', 'indexing'],
    content:
      'Create a fast Search Engine Portal.\n\n**Backend:**\n- Connect to a high-performance indexing service ({{indexProvider}}).\n- Implement a robust, scalable web crawler/scraper logic for specific target domains ({{targetDomains}}).\n\n**Frontend:**\n- Search bar with instant auto-suggest and spelling correction.\n- Results page displaying ranked results with title, highlighted snippet, and URL.\n- Server-side pagination for rapid result retrieval.',
    variables: [
      {
        name: 'indexProvider',
        description:
          'The search engine technology used to index and query documents.',
        type: 'select',
        options: ['Elasticsearch', 'Algolia', 'Typesense', 'MeiliSearch'],
        required: true,
      },
      {
        name: 'targetDomains',
        type: 'textarea',
        description: 'Comma separated list of domains to index',
        required: true,
      },
    ],
  },
  {
    title: 'Travel Booking Portal',
    description: 'Expedia/Booking.com clone with flight/hotel search.',
    category: 'Real Estate & Travel',
    tags: ['booking', 'api', 'dates', 'calendar'],
    content:
      'Develop a user-friendly Travel Booking MVP.\n\n**API:** Use {{travelApi}} to fetch real-time pricing and availability.\n**Features:**\n1. Smart Flight search widget (Origin, Dest, Date, Passengers, Class).\n2. Hotel list page with rich reviews, amenities, and dynamic pricing.\n3. Seamless Booking summary page with cost breakdown and passenger details.\n4. Integrated Currency converter and timezone detection.',
    variables: [
      {
        name: 'travelApi',
        description:
          'The third-party API providing travel inventory and booking capabilities.',
        type: 'select',
        options: ['Amadeus API', 'Skyscanner API', 'Sabre', 'Mock Data'],
        required: true,
      },
      {
        name: 'framework',
        description: 'The frontend framework for the booking interface.',
        type: 'select',
        options: ['Next.js', 'Angular', 'React'],
        required: true,
      },
    ],
  },
  {
    title: 'Mobile Food Delivery App',
    description: 'UberEats clone with customer and restaurant interfaces.',
    category: 'Mobile App',
    tags: ['mobile', 'gps', 'tracking', 'notifications'],
    content:
      'Generate a polished React Native app for Food Delivery.\n\n**Screens:**\n1. Onboarding/Login flow with social auth options.\n2. Restaurant discovery screen with List and Map views.\n3. Detailed Menu & Cart with modifiers (e.g., extra cheese).\n4. Real-time Order Tracking with Live GPS simulation and status updates.\n\n**Navigation:** Handle routing and deep linking using {{navLibrary}}.\n**State:** Manage global state efficiently with {{stateLibrary}}.',
    variables: [
      {
        name: 'uiLibrary',
        description: 'The cross-platform UI component library for styling.',
        type: 'select',
        options: ['React Native Paper', 'NativeBase', 'Tamagui', 'Unstyled'],
        required: true,
      },
      {
        name: 'navLibrary',
        description:
          'The library managing screen transitions and navigation stack.',
        type: 'select',
        options: ['React Navigation', 'React Native Navigation'],
        required: true,
      },
      {
        name: 'stateLibrary',
        description: 'The state management solution for application data.',
        type: 'select',
        options: ['Redux Toolkit', 'Zustand', 'Context API'],
        required: true,
      },
    ],
  },
  {
    title: 'Cross-Platform Fitness Tracker',
    description:
      'Fitness app with workout logging and health sensor integration.',
    category: 'Mobile App',
    tags: ['health', 'sensors', 'charts', 'mobile'],
    content:
      'Build a comprehensive Fitness App using {{mobileFramework}}.\n\n**Features:**\n1. Detailed workout logger (Type, Duration, Sets, Reps, Weight).\n2. Hardware-agnostic Pedometer step counting using native sensors and APIs.\n3. Visual progress charts tracking weight lifted, body stats, and streaks over time.\n4. Dark mode support and customizable themes for comfort during workouts.\n\nInclude robust code for handling native permissions (Camera/Storage) and sensor access.',
    variables: [
      {
        name: 'mobileFramework',
        description: 'The cross-platform framework for mobile development.',
        type: 'select',
        options: [
          'Flutter (Dart)',
          'React Native',
          'Swift (iOS Native)',
          'Kotlin (Android Native)',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'Desktop Task Management Tool',
    description: 'Notion/Trello style desktop app with offline capabilities.',
    category: 'Desktop App',
    tags: ['electron', 'offline', 'database', 'productivity'],
    content:
      "Create a powerful Desktop Task Manager using {{desktopFramework}}.\n\n**Features:**\n1. Reliable local database ({{localDB}}) for fully offline-first storage and sync.\n2. Flexible Kanban board interface (Todo, In Progress, Done) with drag-and-drop.\n3. System tray icon with 'Quick Add' shortcut and notification support.\n4. Settings panel for theme customization and data management.",
    variables: [
      {
        name: 'desktopFramework',
        description: 'The framework for building the desktop application.',
        type: 'select',
        options: [
          'Electron + React',
          'Tauri + React',
          'Tauri + Svelte',
          'Electron + Vue',
        ],
        required: true,
      },
      {
        name: 'localDB',
        description: 'The embedded database for local data persistence.',
        type: 'select',
        options: ['SQLite', 'IndexedDB', 'LowDB', 'PouchDB'],
        required: true,
      },
    ],
  },
  {
    title: 'Code Editor (VS Code Clone)',
    description:
      'A lightweight code editor with syntax highlighting and file tree.',
    category: 'Desktop App',
    tags: ['editor', 'monaco', 'files', 'devtools'],
    content:
      "Build a functional Code Editor using {{desktopFramework}}.\n\n**Core:**\n- Embed Monaco Editor for a professional editing experience.\n- File system explorer sidebar with search and filtering.\n- Multi-file support with tabs for easy switching.\n- Integrated Terminal emulation (using xterm.js).\n\nAllow users to install and manage 'Extensions' (simulated via JSON configuration) to customize the editor environment.",
    variables: [
      {
        name: 'desktopFramework',
        description: 'The framework used to build the desktop wrapper.',
        type: 'select',
        options: ['Electron', 'Tauri'],
        required: true,
      },
    ],
  },
  {
    title: 'Government Service Portal',
    description:
      'Accessible, secure form submission portal for government services.',
    category: 'Government & Non-Profit',
    tags: ['accessibility', 'forms', 'security', 'compliance'],
    content:
      'Design a compliant, secure Government Service Portal.\n\n**Priority:** Strict Accessibility (WCAG 2.1 AA) and Section 508 compliance.\n\n**Features:**\n1. Intuitive multi-step form wizard with save-and-resume functionality for lengthy applications.\n2. Secure document upload (PDF/JPG) with server-side validation and virus scanning.\n3. Status tracking application page with detailed timeline.\n4. Enterprise-grade security headers (CSP, HSTS, X-Frame-Options).\n\n**Stack:** {{govStack}} tailored for security and compliance standards.',
    variables: [
      {
        name: 'govStack',
        description: 'The technology stack ensuring security and compliance.',
        type: 'select',
        options: [
          'Drupal (Gov distro)',
          'React + .NET Core',
          'AEM',
          'WordPress',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'Non-Profit Donation Platform',
    description: 'Charity website with recurring donations and impact stories.',
    category: 'Government & Non-Profit',
    tags: ['donations', 'stripe', 'stories', 'cms'],
    content:
      "Create a trustworthy Donation Platform for a non-profit.\n\n**Features:**\n1. Emotive Hero section with storytelling and high-impact imagery.\n2. Easy-to-use Donation form with One-time and Monthly recurring toggle options.\n3. Seamless integration with {{paymentGateway}} for secure processing.\n4. 'Impact' blog section showing transparency in how funds are utilized.\n\nFocus heavily on trust signals, transparency, and ease of giving.",
    variables: [
      {
        name: 'paymentGateway',
        description: 'The payment processor for handling donations.',
        type: 'select',
        options: ['Stripe Checkout', 'PayPal Giving Fund', 'Donorbox'],
        required: true,
      },
      {
        name: 'cms',
        description:
          'The Content Management System for managing impact stories and content.',
        type: 'select',
        options: ['Contentful', 'Sanity', 'WordPress'],
        required: true,
      },
    ],
  },
  {
    title: 'SaaS Boilerplate (Multi-tenant)',
    description: 'Production-ready SaaS starter with Stripe billing and auth.',
    category: 'Boilerplates',
    tags: ['saas', 'stripe', 'auth', 'multi-tenant'],
    content:
      'Generate a comprehensive SaaS Boilerplate using {{stack}}.\n\n**Features:**\n1. Secure User Registration/Login flow ({{auth}}) with email verification.\n2. Integrated Stripe Billing for subscription management (Free, Pro, Enterprise tiers).\n3. Organization/Team management module for multi-tenancy and collaboration.\n4. Comprehensive Settings page (API Keys, Profile, Billing).\n5. High-converting Landing page marketing site.\n\nInclude Docker configuration for consistent development and production deployment.',
    variables: [
      {
        name: 'stack',
        description: 'The main full-stack framework for the SaaS application.',
        type: 'select',
        options: ['Next.js 14 (App Router)', 'Remix Run', 'Laravel Spark'],
        required: true,
      },
      {
        name: 'auth',
        description: 'The authentication service for managing users.',
        type: 'select',
        options: ['Clerk', 'Auth0', 'Supabase Auth', 'NextAuth'],
        required: true,
      },
    ],
  },
  {
    title: 'GraphQL API Boilerplate',
    description: 'Headless CMS starter with GraphQL, Postgres, and Auth.',
    category: 'Boilerplates',
    tags: ['graphql', 'api', 'backend', 'node'],
    content:
      "Create a robust, type-safe GraphQL API Server.\n\n**Tech:** Node.js, {{server}}, {{orm}}, GraphQL ({{gqlLib}}).\n\n**Features:**\n1. Secure user authentication with JWT tokens and refresh token rotation.\n2. Full CRUD operations for 'Posts' with validation and authorization.\n3. Efficient file upload support (e.g., S3 integration).\n4. Interactive GraphQL Playground for testing queries and mutations.\n5. Role-based access control (RBAC) for Admin and User roles.",
    variables: [
      {
        name: 'server',
        description: 'The Node.js server framework for the GraphQL API.',
        type: 'select',
        options: ['Apollo Server', 'Express + GraphQL', 'Fastify + Mercurius'],
        required: true,
      },
      {
        name: 'orm',
        description: 'The Object-Relational Mapper for database interaction.',
        type: 'select',
        options: ['Prisma', 'TypeORM', 'Sequelize', 'MikroORM'],
        required: true,
      },
      {
        name: 'gqlLib',
        description:
          'The GraphQL client library for frontend consumption (optional).',
        type: 'select',
        options: ['Apollo Client', 'Urql', 'Relay'],
        required: false,
      },
    ],
  },
  {
    title: 'AI Chatbot Interface (OpenAI Wrapper)',
    description: 'ChatGPT clone with streaming responses and history.',
    category: 'Technology & SaaS',
    tags: ['ai', 'openai', 'chat', 'streaming'],
    content:
      'Build a responsive AI Chat Interface.\n\n**Backend:** Node.js + Express.\n- Create route to proxy requests securely to the OpenAI API ({{model}}).\n- Handle server-side streaming responses for immediate feedback.\n\n**Frontend:** React + Tailwind.\n- Design a clean, accessible Chat bubble interface with markdown rendering.\n- Implement auto-scrolling to latest message and typing indicators.\n- Sidebar for chat history management (saved to {{dbType}}).',
    variables: [
      {
        name: 'model',
        description: 'The specific AI model to use for chat generation.',
        type: 'select',
        options: ['gpt-4', 'gpt-3.5-turbo', 'claude-2', 'llama-2'],
        required: true,
      },
      {
        name: 'dbType',
        description:
          'The database for storing conversation history and user data.',
        type: 'select',
        options: ['MongoDB', 'PostgreSQL', 'LocalStorage'],
        required: true,
      },
    ],
  },
  {
    title: 'Inventory Management System',
    description: 'Internal tool for tracking stock, orders, and suppliers.',
    category: 'Business & Corporate',
    tags: ['inventory', 'crud', 'dashboard', 'internal'],
    content:
      "Develop a robust Inventory System for internal operations.\n\n**Entities:** Products, Categories, Suppliers, StockLevels, Transactions.\n\n**Features:**\n1. Dashboard with configurable 'Low Stock' alerts and visual inventory levels.\n2. Add/Edit Product modal with image upload and variant management.\n3. Bulk CSV Import/Export functionality for inventory updates.\n4. Comprehensive audit log for all stock changes and adjustments.\n\n**Stack:** {{techStack}} chosen for reliability and performance.",
    variables: [
      {
        name: 'techStack',
        description: 'The technology stack for the inventory system.',
        type: 'select',
        options: ['Django (Python)', 'PHP (Laravel)', 'ASP.NET Core'],
        required: true,
      },
    ],
  },
  {
    title: 'Event Management Platform',
    description: 'Eventbrite clone with ticket selling and calendar views.',
    category: 'Business & Corporate',
    tags: ['events', 'tickets', 'calendar', 'maps'],
    content:
      'Build an all-in-one Event Platform.\n\n**Features:**\n1. Organizer interface to Create Events (Title, Date, Location, Cover Image, Description).\n2. Flexible Ticket types (General, VIP) with dynamic pricing and availability.\n3. Seamless Checkout flow for ticket purchase with payment integration.\n4. Public Calendar view of upcoming events with search and filters.\n5. Secure QR Code generation for valid ticket entry.',
    variables: [
      {
        name: 'frontend',
        description: 'The frontend framework for the public facing site.',
        type: 'select',
        options: ['React', 'Next.js'],
        required: true,
      },
      {
        name: 'backend',
        description: 'The backend technology for handling payments and data.',
        type: 'select',
        options: ['Node.js', 'Ruby on Rails', 'Go'],
        required: true,
      },
    ],
  },
  {
    title: 'Dating App MVP',
    description: 'Tinder clone with swipe gestures and matching logic.',
    category: 'Social Media & Networking',
    tags: ['mobile', 'gestures', 'matching', 'geolocation'],
    content:
      "Create a modern Dating App using {{framework}}.\n\n**Core:**\n1. Engaging 'Swipe' card stack animation ({{animationLib}}) for rapid profile browsing.\n2. Smart Geolocation matching algorithm (find users within {{radius}} km).\n3. Real-time chat system for matches with read receipts.\n4. Rich Profile creation with photo uploads and bio.",
    variables: [
      {
        name: 'framework',
        description: 'The mobile framework for the application.',
        type: 'select',
        options: ['React Native', 'Flutter', 'Swift'],
        required: true,
      },
      {
        name: 'animationLib',
        description: 'The library for implementing the swipe card interface.',
        type: 'select',
        options: [
          'React Native Tinder Card',
          'Framer Motion',
          'Custom PanResponder',
        ],
        required: true,
      },
      {
        name: 'radius',
        type: 'number',
        description: 'Search radius in kilometers',
        defaultValue: 10,
      },
    ],
  },
  {
    title: 'Q&A / Knowledge Base (Stack Overflow Clone)',
    description: 'Community-driven Q&A site with reputation points.',
    category: 'Forums & Communities',
    tags: ['qa', 'reputation', 'voting', 'markdown'],
    content:
      "Build a vibrant Q&A Platform for developers.\n\n**Features:**\n1. Advanced Ask Question form supporting Title, Body (with Markdown), and Tags.\n2. Answer list with logic to select and mark an 'Accepted Answer'.\n3. Voting system (Up/Down) to surface best content.\n4. Reputation and Badges system logic to incentivize participation.\n5. Full-text search functionality across questions and answers.",
    variables: [
      {
        name: 'stack',
        description: 'The technology stack for the Q&A platform.',
        type: 'select',
        options: ['MEAN Stack', 'Django', 'Rails'],
        required: true,
      },
    ],
  },
  {
    title: 'Telemedicine / Telehealth Portal',
    description:
      'Healthcare platform for video consultations and appointments.',
    category: 'Educational & Academic',
    tags: ['healthcare', 'video', 'hipaa', 'appointments'],
    content:
      'Generate a secure Telehealth MVP compliant with healthcare standards.\n\n**Features:**\n1. Separate dashboards for Patients and Doctors with role-specific views.\n2. Integrated Appointment scheduling calendar with conflict detection.\n3. HD Video call integration using {{videoSDK}} for consultations.\n4. Private Prescription/Notes management module for doctors.\n\n**Important:** Strictly adhere to HIPAA compliance in all data handling, including encryption at rest and in transit.',
    variables: [
      {
        name: 'videoSDK',
        description: 'The provider of the video conferencing technology.',
        type: 'select',
        options: ['Twilio Programmable Video', 'Agora', 'Daily.co', 'Whereby'],
        required: true,
      },
      {
        name: 'stack',
        description: 'The technology stack for the telehealth platform.',
        type: 'select',
        options: ['Next.js', 'Laravel', 'Django'],
        required: true,
      },
    ],
  },
  {
    title: 'Cryptocurrency Wallet Dashboard',
    description: 'Web3 wallet interface for sending/receiving crypto.',
    category: 'Financial Services & Crypto',
    tags: ['web3', 'blockchain', 'wallet', 'ethers'],
    content:
      'Build a user-friendly Crypto Wallet Dashboard.\n\n**Library:** {{web3Lib}} for blockchain interaction.\n**Features:**\n1. One-click Connect Wallet (Metamask/WalletConnect) with account switching.\n2. View current balances for multiple assets (ETH/BTC).\n3. Send Transaction form with gas estimation and fee adjustment.\n4. Comprehensive Transaction History list with status tracking.\n5. Real-time Gas price estimation for cost-effective transfers.',
    variables: [
      {
        name: 'web3Lib',
        description:
          'The library for interacting with the Ethereum blockchain.',
        type: 'select',
        options: ['Ethers.js', 'Viem', 'Wagmi', 'Web3.js'],
        required: true,
      },
      {
        name: 'framework',
        description: 'The frontend framework for the wallet UI.',
        type: 'select',
        options: ['React', 'Next.js', 'Vue'],
        required: true,
      },
    ],
  },
  {
    title: 'Restaurant POS System',
    description: 'Point of Sale system for restaurants with table management.',
    category: 'Business & Corporate',
    tags: ['pos', 'restaurant', 'offline', 'receipts'],
    content:
      'Create a fast, reliable Restaurant POS for Web/Desktop.\n\n**Features:**\n1. Interactive Visual Table Map to select tables and view status.\n2. Menu categories and items with complex modifiers (e.g., No onions, Extra cheese).\n3. Split bill functionality by item or guest count.\n4. Print receipt to thermal printer using {{printingLib}} or kitchen display.\n5. Robust offline mode support to ensure operations continue during outages.',
    variables: [
      {
        name: 'techStack',
        description: 'The technology stack for the POS application.',
        type: 'select',
        options: ['Electron', 'React (PWA)', 'Desktop App (.NET)'],
        required: true,
      },
      {
        name: 'printingLib',
        description: 'The library for communicating with thermal printers.',
        type: 'select',
        options: ['QZ Tray', 'Web Bluetooth Printer', 'Raw Print'],
        required: false,
      },
    ],
  },
  {
    title: 'NFT Marketplace',
    description: 'OpenSea clone for minting and buying NFTs.',
    category: 'Financial Services & Crypto',
    tags: ['nft', 'marketplace', 'web3', 'auction'],
    content:
      'Build a decentralized NFT Marketplace.\n\n**Smart Contracts:** Provide Solidity code for ERC-721 token and Marketplace contract.\n**Frontend:**\n1. Connect Wallet and verify ownership.\n2. Mint NFT with IPFS image upload and metadata.\n3. List NFT for sale with Fixed price or Auction bidding.\n4. Explore page with advanced filters and sorting.',
    variables: [
      {
        name: 'framework',
        description: 'The frontend framework for the marketplace.',
        type: 'select',
        options: ['Next.js + Ethers.js', 'React + Moralis'],
        required: true,
      },
    ],
  },
  {
    title: 'Project Management Tool (Jira Clone)',
    description: 'Agile board and backlog management for dev teams.',
    category: 'Technology & SaaS',
    tags: ['project-management', 'agile', 'kanban', 'sprint'],
    content:
      'Develop a robust Project Management Tool.\n\n**Features:**\n1. Kanban Board with customizable columns (Backlog, To Do, In Progress, Done).\n2. Smooth Drag and drop tickets (using {{dndLib}}).\n3. Sprint creation, planning, and management with burndown charts.\n4. Rich Issue detail modal with threaded comments and attachments.\n5. Dark mode support for reduced eye strain.',
    variables: [
      {
        name: 'framework',
        description: 'The frontend framework for the tool.',
        type: 'select',
        options: ['React', 'Vue', 'Angular'],
        required: true,
      },
      {
        name: 'dndLib',
        description:
          'The library for implementing drag and drop functionality.',
        type: 'select',
        options: ['dnd-kit', 'react-beautiful-dnd', 'react-grid-layout'],
        required: true,
      },
    ],
  },
  {
    title: 'Weather Application',
    description: 'Polished weather app with forecasts and alerts.',
    category: 'Mobile App',
    tags: ['weather', 'api', 'location', 'mobile'],
    content:
      'Build a visually stunning Weather App using {{framework}}.\n\n**API:** OpenWeatherMap for reliable weather data.\n**Features:**\n1. Current weather display with dynamic background that changes based on conditions.\n2. Detailed 7-Day forecast list with weather icons and high/low temps.\n3. Interactive Hourly forecast graph for detailed daily planning.\n4. Geolocation detection to show weather for current location.\n5. Robust Search by city name with autocomplete suggestions.',
    variables: [
      {
        name: 'framework',
        description: 'The mobile framework for the application.',
        type: 'select',
        options: ['React Native', 'Flutter', 'SwiftUI', 'Jetpack Compose'],
        required: true,
      },
    ],
  },
  {
    title: 'Meditation & Wellness App',
    description:
      'Calm/Headspace clone with audio player and breathing exercises.',
    category: 'Mobile App',
    tags: ['wellness', 'audio', 'timer', 'mobile'],
    content:
      'Create a calming Wellness App.\n\n**Features:**\n1. Inspiring Home screen with a daily quote and personalized greeting.\n2. Meditation library with audio player, progress tracking, and instructor info.\n3. Breathing exercise tool with guided animation (e.g., 4-7-8 technique).\n4. Curated Sleep stories list with soothing audio.\n5. Toggles for Dark/Sky theme to suit user preference.',
    variables: [
      {
        name: 'framework',
        description: 'The mobile framework for the wellness app.',
        type: 'select',
        options: ['React Native', 'Flutter'],
        required: true,
      },
    ],
  },
  {
    title: 'Language Learning Flashcards',
    description: 'Duolingo-style app with spaced repetition.',
    category: 'Educational & Academic',
    tags: ['education', 'flashcards', 'algorithm', 'mobile'],
    content:
      "Build an engaging Language Learning App.\n\n**Core Logic:** Implement a Spaced Repetition Algorithm ({{srsAlgo}}) for efficient learning.\n**Features:**\n1. Flashcard flipping animation for tactile learning.\n2. Action buttons for self-assessment: 'Again', 'Hard', 'Good', 'Easy'.\n3. Gamified progress tracking (Streak, XP, Levels) to boost engagement.\n4. Deck management system allowing users to create custom study decks.",
    variables: [
      {
        name: 'framework',
        description: 'The mobile framework for the app.',
        type: 'select',
        options: ['React Native', 'Swift', 'Kotlin'],
        required: true,
      },
      {
        name: 'srsAlgo',
        description: 'The algorithm scheduling flashcards for review.',
        type: 'select',
        options: ['SuperMemo 2', 'Anki Algorithm', 'Leitner System'],
        required: true,
      },
    ],
  },
  {
    title: 'Car Rental Booking System',
    description: 'Turo clone for renting cars peer-to-peer.',
    category: 'Real Estate & Travel',
    tags: ['rental', 'booking', 'map', 'search'],
    content:
      'Develop a comprehensive peer-to-peer Car Rental Platform (Turo clone).\n\n**Core Features:**\n1. **Advanced Search:** Filter by pickup/drop-off location, dates, car type (SUV, Sedan, Luxury), and price range.\n2. **Car Detail Page:** High-res gallery, vehicle features (mileage, transmission, seats), insurance options included in the price.\n3. **Booking Flow:** Instant booking vs Host approval requests, price calculation with taxes and fees, secure payment processing.\n4. **Host Dashboard:** Calendar availability management (sync with external calendars), listing editor (photos, description, pricing rules), earnings tracker.\n5. **Interactive Map:** Clustered map view of available cars with price markers and quick preview cards.',
    variables: [
      {
        name: 'stack',
        description:
          'The full-stack technology framework to power the rental platform.',
        type: 'select',
        options: ['MERN', 'Django', 'Rails'],
        required: true,
      },
    ],
  },
  {
    title: 'E-Book Reader & Store',
    description: 'Kindle clone with library management and reader features.',
    category: 'Educational & Academic',
    tags: ['ebook', 'reader', 'epub', 'store'],
    content:
      'Create a cross-platform E-Book Reader and Store application.\n\n**Reader Features:**\n1. **EPUB Rendering:** Parse and render EPUB files smoothly using {{epubLib}}.\n2. **Customization:** Change font size, font family, line height, and theme (Sepia, Dark, Light, High Contrast).\n3. **Progress Tracking:** Auto-save reading progress, bookmark specific pages, and highlight text for notes.\n4. **Navigation:** Table of Contents (TOC) for quick chapter jumping, search within the book.\n\n**Store Features:**\n1. **Discovery:** Grid and list views of book covers with ratings and synopsis.\n2. **Purchase Flow:** Secure cart system, payment integration, and digital license management.\n3. **Library:** Downloaded books library with sorting (Author, Title, Date).',
    variables: [
      {
        name: 'framework',
        description:
          'The framework for building the reader interface and store UI.',
        type: 'select',
        options: ['React Native', 'Electron', 'Flutter'],
        required: true,
      },
      {
        name: 'epubLib',
        description:
          'The library used for parsing and rendering EPUB file formats.',
        type: 'select',
        options: ['react-native-epub', 'epub.js', 'Foliate Reader'],
        required: true,
      },
    ],
  },
  {
    title: 'Anonymous Confessions Board',
    description: 'Secret app for posting anonymous messages.',
    category: 'Social Media & Networking',
    tags: ['anonymous', 'social', 'feed', 'location'],
    content:
      "Build an Anonymous Confessions Social App.\n\n**Features:**\n1. **Post Anonymously:** Share text or image confessions without any user identity linked.\n2. **Smart Feeds:** Filter confessions by 'Near Me' ({{locationType}}) for local relevance or 'Popular/Trending' globally.\n3. **Interaction:** Anonymous comment threads to discuss posts without revealing identity.\n4. **Engagement:** Upvote/Downvote system to surface popular content.\n5. **Moderation:** User-driven reporting system and admin tools to remove harmful content.",
    variables: [
      {
        name: 'locationType',
        description:
          'The precision level for location-based content filtering.',
        type: 'select',
        options: ['GPS Precise', 'City Level', 'Global'],
        required: true,
      },
    ],
  },
  {
    title: 'Personal Budget Tracker',
    description: 'Finance app for tracking income and expenses with charts.',
    category: 'Mobile App',
    tags: ['finance', 'charts', 'mobile', 'budget'],
    content:
      'Create a comprehensive Personal Budget Mobile App.\n\n**Features:**\n1. **Transaction Management:** Log income and expenses with amount, category, date, notes, and photo of receipt.\n2. **Visualization:** Interactive Pie Chart and Bar Chart breakdown of spending by category using {{chartLib}}.\n3. **Budgeting:** Set monthly budget limits per category with visual progress bars and overspending alerts.\n4. **Automation:** Support for recurring transactions (monthly subscriptions) and bill reminders.\n5. **Data Export:** Export financial data to CSV or PDF for reporting.',
    variables: [
      {
        name: 'framework',
        description:
          'The mobile framework for developing the budget application.',
        type: 'select',
        options: ['Flutter', 'React Native', 'Swift'],
        required: true,
      },
      {
        name: 'chartLib',
        description:
          'The charting library used for financial data visualization.',
        type: 'select',
        options: ['FL Chart', 'Victory Native', 'Charts (Swift)'],
        required: true,
      },
    ],
  },
  {
    title: 'CRM (Customer Relationship Management)',
    description: 'Salesforce-lite for managing leads and customers.',
    category: 'Business & Corporate',
    tags: ['crm', 'sales', 'leads', 'pipeline'],
    content:
      'Develop a robust CRM System for sales teams.\n\n**Features:**\n1. **Pipeline Management:** Kanban board visualizing Lead Stages (New, Contacted, Proposal, Negotiation, Won, Lost).\n2. **Contact Management:** Detailed customer profiles with contact info, interaction history, and social links.\n3. **Activity Tracking:** Log Tasks, Notes, and Events associated with specific Leads or Contacts.\n4. **Search & Filter:** Advanced filtering to find leads by status, value, or date.\n5. **Dashboard:** Overview with total revenue forecast, deal conversion rates, and upcoming tasks.',
    variables: [
      {
        name: 'stack',
        description: 'The technology stack for the CRM application.',
        type: 'select',
        options: ['ASP.NET Core MVC', 'Django', 'Laravel', 'React + Node'],
        required: true,
      },
    ],
  },
  {
    title: 'Wiki / Knowledge Base',
    description: 'Notion/Wikipedia hybrid with hierarchical pages.',
    category: 'Educational & Academic',
    tags: ['wiki', 'hierarchy', 'blocks', 'editor'],
    content:
      'Build a collaborative Wiki/Knowledge Base.\n\n**Editor:** Utilize a block-based rich text editor ({{editor}}) for content creation.\n**Features:**\n1. **Hierarchy:** Create nested pages with Parent/Child relationships for organized documentation.\n2. **Navigation:** Sidebar tree view for browsing the page structure.\n3. **Search:** Full-text search across all pages and content blocks.\n4. **Access Control:** Toggle pages between Public (accessible to all) and Private (restricted access).',
    variables: [
      {
        name: 'techStack',
        description: 'The core technology stack for the wiki platform.',
        type: 'select',
        options: ['Next.js', 'Vue', 'Django'],
        required: true,
      },
      {
        name: 'editor',
        description:
          'The block-based editor component for creating and editing wiki content.',
        type: 'select',
        options: ['TipTap', 'Slate.js', 'Editor.js'],
        required: true,
      },
    ],
  },
  {
    title: 'URL Shortener & Analytics',
    description: 'Bitly clone with click tracking and QR codes.',
    category: 'Technology & SaaS',
    tags: ['url-shortener', 'analytics', 'redirect', 'api'],
    content:
      'Create a feature-rich URL Shortener Service.\n\n**Backend:**\n1. **Shortening:** API endpoint `POST /shorten` to generate unique, short codes for long URLs.\n2. **Redirection:** Logic `GET/:code` to redirect users using 301 (permanent) or 302 (temporary) status codes.\n3. **Analytics:** Record detailed click analytics including IP address, User-Agent, Referrer, and Timestamp.\n\n**Frontend:**\n1. **Input:** Simple text field for entering long URLs with validation.\n2. **History:** Table displaying past links with click counts and creation dates.\n3. **QR Codes:** Automatic QR code generation for the shortened link.\n4. **Customization:** Optional alias for the short URL.',
    variables: [
      {
        name: 'backend',
        description:
          'The backend framework for handling URL logic and data storage.',
        type: 'select',
        options: ['Node.js/Redis', 'Go', 'Python'],
        required: true,
      },
    ],
  },
  {
    title: 'Voting & Polling System',
    description: 'Real-time polling app for meetings or public opinion.',
    category: 'Social Media & Networking',
    tags: ['polls', 'voting', 'realtime', 'charts'],
    content:
      'Build a Real-time Voting and Polling System.\n\n**Features:**\n1. **Poll Creation:** Admin interface to create polls with questions and multiple choice options.\n2. **Live Results:** Real-time view of vote counts updating instantly via {{realtime}} connection.\n3. **Visualization:** Dynamic Bar or Pie chart visualization of the voting results.\n4. **Restrictions:** Logic to limit one vote per user ID or IP address to prevent stuffing.\n5. **Embed:** Generate embeddable HTML widgets code for using polls on external websites.',
    variables: [
      {
        name: 'stack',
        description: 'The full-stack solution for the voting platform.',
        type: 'select',
        options: ['Firebase', 'Next.js + Socket.io', 'Vue + Supabase'],
        required: true,
      },
      {
        name: 'realtime',
        description:
          'The mechanism used for pushing live result updates to clients.',
        type: 'select',
        options: ['WebSockets', 'Polling (setInterval)'],
        required: true,
      },
    ],
  },
  {
    title: 'IoT Dashboard',
    description: 'Dashboard to visualize sensor data from IoT devices.',
    category: 'Technology & SaaS',
    tags: ['iot', 'mqtt', 'charts', 'realtime'],
    content:
      'Create an IoT Monitoring Dashboard.\n\n**Data Ingestion:** Simulate MQTT subscription or REST API data ingestion from sensors.\n**Features:**\n1. **Historical Data:** Line charts showing Temperature, Humidity, and Pressure trends over time.\n2. **Current State:** Gauge meters for displaying real-time values and status indicators.\n3. **Device Management:** Status indicators (Online/Offline/Offline Alert) for connected devices.\n4. **Remote Control:** Toggle switches to control device relays or actuators (simulated logic).',
    variables: [
      {
        name: 'framework',
        description: 'The frontend framework for building the dashboard UI.',
        type: 'select',
        options: ['React', 'Vue', 'Angular'],
        required: true,
      },
    ],
  },
  {
    title: 'Browser Extension Boilerplate',
    description:
      'Chrome/Firefox extension starter with popup and content scripts.',
    category: 'Boilerplates',
    tags: ['extension', 'chrome', 'firefox', 'js'],
    content:
      'Generate a modular Browser Extension Starter Kit.\n\n**Type:** {{extensionType}}.\n**Features:**\n1. **Manifest:** Configured Manifest V3 for modern browser standards.\n2. **Popup UI:** HTML/CSS/JS popup interface interacting with the background script.\n3. **Content Script:** Script injected into web pages to modify DOM via {{interactionType}}.\n4. **Options:** Dedicated page for managing user settings and preferences.',
    variables: [
      {
        name: 'framework',
        description: 'The JavaScript framework used to build the extension UI.',
        type: 'select',
        options: ['Vanilla JS', 'React (CRXJS)', 'Vue (WebExtension)'],
        required: true,
      },
      {
        name: 'extensionType',
        description: 'The functional category of the browser extension.',
        type: 'select',
        options: ['Productivity Tool', 'Ad Blocker', 'Password Manager'],
        required: true,
      },
      {
        name: 'interactionType',
        description:
          'The specific DOM interaction method for the content script.',
        type: 'select',
        options: ['Highlight Text', 'Inject Button', 'Replace Images'],
        required: false,
      },
    ],
  },
  {
    title: 'Headless CMS Boilerplate',
    description: 'Strapi/Contentful alternative using Node.js.',
    category: 'Boilerplates',
    tags: ['cms', 'headless', 'api', 'admin'],
    content:
      'Build a custom Headless CMS from scratch.\n\n**Backend:** Node.js server.\n**Features:**\n1. **Dynamic Schema:** API endpoint or Admin UI for users to define custom content types and fields.\n2. **API Generation:** Auto-generated GraphQL API based on the defined content schema.\n3. **Admin Panel:** React-based admin interface to manage content entries.\n4. **Assets:** Built-in asset management system for image uploads and optimization.',
    variables: [
      {
        name: 'db',
        description:
          'The database adapter for storing CMS content and schema data.',
        type: 'select',
        options: ['MongoDB', 'PostgreSQL', 'MySQL'],
        required: true,
      },
    ],
  },
  {
    title: 'Online Code Compiler (IDE)',
    description: 'Replit/CodePen clone with code execution.',
    category: 'Technology & SaaS',
    tags: ['ide', 'compiler', 'docker', 'code'],
    content:
      'Create a secure Online Code Compiler and IDE.\n\n**Frontend:** Monaco Editor for code editing with file tabs and syntax highlighting.\n**Backend:**\n1. **Execution:** API endpoint accepting code payload and language selection.\n2. **Sandboxing:** Spin up an ephemeral Docker container ({{image}}) to execute code safely and prevent resource abuse.\n3. **Output:** Return program output, compilation errors, or timeout exceptions.\n4. **Console:** WebSocket connection to stream real-time console logs to the frontend.',
    variables: [
      {
        name: 'language',
        description:
          'The primary programming language or environment for the compiler.',
        type: 'select',
        options: ['Node.js', 'Python', 'Go', 'Multi-language'],
        required: true,
      },
    ],
  },
  {
    title: 'Game Launcher (Desktop)',
    description: 'Steam/Epic Games launcher clone for managing game libraries.',
    category: 'Desktop App',
    tags: ['launcher', 'games', 'store', 'desktop'],
    content:
      "Build a Desktop Game Launcher application.\n\n**Features:**\n1. **Library:** Grid view of installed and available games with status indicators.\n2. **Actions:** 'Play', 'Update', 'Uninstall', and 'Verify Integrity' buttons.\n3. **Store:** Browse a mock store with featured games, categories, and purchase buttons.\n4. **News:** Integrated news feed section for patch notes and announcements.\n5. **Visuals:** Background video playback for the featured game and overlay UI.",
    variables: [
      {
        name: 'framework',
        description: 'The framework for building the desktop launcher window.',
        type: 'select',
        options: ['Electron', 'Qt (C++)', 'WPF (C#)'],
        required: true,
      },
    ],
  },
  {
    title: 'Developer Documentation Portal',
    description: 'GitBook-style docs site with sidebar navigation and search.',
    category: 'Educational & Academic',
    tags: ['docs', 'markdown', 'search', 'static'],
    content:
      "Create a modern Developer Documentation Portal.\n**Tools:** Utilize {{docTool}} for static site generation.\n\n**Features:**\n1. **Navigation:** Sidebar with hierarchical navigation for multi-level docs.\n2. **Search:** Integrated search bar (e.g., Algolia DocSearch) for finding content.\n3. **Code:** Syntax highlighting for code blocks using PrismJS or similar.\n4. **Integration:** 'Edit on GitHub' links for community contributions.\n5. **UI:** Dark mode toggle and responsive design.",
    variables: [
      {
        name: 'docTool',
        description:
          'The static site generator used for building the documentation.',
        type: 'select',
        options: ['Docusaurus', 'VitePress', 'GitBook', 'Hugo'],
        required: true,
      },
    ],
  },
  {
    title: 'Digital Signage Controller',
    description: 'Web app to manage content displayed on digital screens.',
    category: 'Business & Corporate',
    tags: ['signage', 'schedule', 'media', 'kiosk'],
    content:
      'Build a Web-based Digital Signage Management System.\n**Features:**\n1. **Layout Editor:** Canvas to define zones (Image, Video, Ticker/Text, Widgets).\n2. **Media Library:** Upload and manage images, videos, and webpages.\n3. **Scheduling:** Set schedules to play specific content (e.g., Content A from 9am-5pm, Content B overnight).\n4. **Monitoring:** Remote status dashboard showing if screens are Online, Offline, or Error.',
    variables: [
      {
        name: 'stack',
        description: 'The technology stack for the management backend and UI.',
        type: 'select',
        options: ['React + Node', 'Angular + Laravel'],
        required: true,
      },
    ],
  },
  {
    title: 'Chatbot Platform Builder',
    description: 'Interface to design chatbot flows and connect to APIs.',
    category: 'Technology & SaaS',
    tags: ['chatbot', 'flow-builder', 'nlp', 'api'],
    content:
      "Create a No-Code Chatbot Flow Builder.\n**Visual:** Canvas-based drag-and-drop interface for designing conversation flows.\n**Logic:**\n1. **Nodes:** Drag nodes for 'User Message', 'Bot Response', 'Condition/Logic', 'API Call', 'Transfer to Human'.\n2. **Storage:** Save the JSON flow schema to a database.\n3. **Runtime:** Engine to execute the flow logic and manage conversation state.",
    variables: [
      {
        name: 'frontend',
        description:
          'The React library for implementing the drag-and-drop canvas.',
        type: 'select',
        options: ['React Flow', 'Vue Flow', 'JointJS'],
        required: true,
      },
    ],
  },
  {
    title: 'Ticketing Support System (Zendesk Clone)',
    description: 'Helpdesk software for managing customer support tickets.',
    category: 'Business & Corporate',
    tags: ['support', 'tickets', 'email', 'crm'],
    content:
      'Develop a Customer Support Ticketing System.\n**Features:**\n1. **Email Integration:** Automatic Email-to-ticket conversion by parsing incoming emails (IMAP/SMTP).\n2. **Agent Dashboard:** View tickets by status (Open, Pending, Solved) and agent assignment.\n3. **Customer Portal:** Customer view to submit tickets and view their own history.\n4. **Efficiency:** Canned responses (Macros) for quick replies to common issues.',
    variables: [
      {
        name: 'stack',
        description: 'The server-side framework for the helpdesk logic.',
        type: 'select',
        options: ['Rails (Helpy)', 'Django', 'PHP (osTicket alternative)'],
        required: true,
      },
    ],
  },
  {
    title: 'Recipe & Meal Planner',
    description: 'App to store recipes and generate weekly meal plans.',
    category: 'Mobile App',
    tags: ['food', 'recipe', 'planner', 'shopping-list'],
    content:
      "Build a smart Recipe and Meal Planner App.\n**Features:**\n1. **Recipe Management:** Add recipes with ingredients (quantities, units), cooking instructions, and photos.\n2. **Planner:** Drag and drop recipes onto a Weekly Calendar view (Mon-Sun).\n3. **Shopping List:** Auto-generate a consolidated shopping list based on the week's selected recipes.\n4. **Nutrition:** Calculate and display macro-nutritional information (Calories, Protein, Carbs, Fat) for meals.",
    variables: [
      {
        name: 'framework',
        description: 'The mobile framework for the planner application.',
        type: 'select',
        options: ['Flutter', 'React Native', 'Swift'],
        required: true,
      },
    ],
  },
  {
    title: 'Scrum Poker / Planning Poker',
    description: 'Tool for agile teams to estimate story points remotely.',
    category: 'Technology & SaaS',
    tags: ['agile', 'poker', 'voting', 'realtime'],
    content:
      'Create a Scrum Poker / Planning Poker App.\n**Real-time:** Powered by {{socket}}.\n**Features:**\n1. **Session:** Create a planning session room.\n2. **Join:** Participants join by entering their name.\n3. **Voting:** Players select card values (1, 2, 3, 5, 8, 13, 20, ?).\n4. **Reveal:** Votes are hidden until everyone has voted, then revealed simultaneously.\n5. **Results:** Show average, median, and agreement on the final estimate.',
    variables: [
      {
        name: 'socket',
        description: 'The real-time communication library for live updates.',
        type: 'select',
        options: ['Socket.io', 'Pusher', 'Firebase'],
        required: true,
      },
    ],
  },
  {
    title: 'Micro-SaaS Analytics Dashboard',
    description: 'Template for building analytics widgets (Mixpanel clone).',
    category: 'Boilerplates',
    tags: ['analytics', 'charts', 'saas', 'dashboard'],
    content:
      'Generate a Micro-SaaS Analytics Dashboard Template.\n**Features:**\n1. **Trends:** Line chart showing Events over time (e.g., Daily Active Users).\n2. **Funnels:** Visual chart tracking conversion rates through defined steps.\n3. **Retention:** User retention table displaying Cohort analysis (e.g., % retained week over week).\n4. **Controls:** Date range picker to filter the dashboard data.\n**Data Source:** Use a mock JSON object for demonstration.',
    variables: [
      {
        name: 'chartLib',
        description:
          'The charting library for rendering analytics visualizations.',
        type: 'select',
        options: ['Recharts', 'Nivo', 'Chart.js', 'Highcharts'],
        required: true,
      },
    ],
  },
  {
    title: 'Quiz / Trivia Game',
    description: 'Multiplayer quiz game with leaderboards.',
    category: 'Streaming & Entertainment',
    tags: ['game', 'quiz', 'multiplayer', 'socket'],
    content:
      'Build a Multiplayer Trivia Game.\n**Modes:** Support both Single Player and Multiplayer modes.\n**Features:**\n1. **Gameplay:** Timer per question, score calculation based on speed and accuracy.\n2. **Ranking:** Global Leaderboard (using Redis for high-performance score storage).\n3. **Content:** Filter questions by Category (Science, History, Pop Culture).\n4. **Multiplayer:** Real-time socket connection for live matches with other players.',
    variables: [
      {
        name: 'stack',
        description:
          'The full-stack technology for the game server and client.',
        type: 'select',
        options: ['Node + Socket', 'Unity (WebGL)', 'Phaser.js'],
        required: true,
      },
    ],
  },
  {
    title: 'Resume Builder',
    description: 'Interactive tool to create resumes and export to PDF.',
    category: 'Job Boards & Recruitment',
    tags: ['resume', 'pdf', 'editor', 'templates'],
    content:
      'Create an interactive Resume Builder tool.\n**Features:**\n1. **Input:** Forms for Profile, Work Experience, Education, Skills, and Projects.\n2. **Preview:** Live side-by-side preview of the resume layout (A4 size).\n3. **Templates:** Switch between multiple resume layouts ({{templates}}) with different designs.\n4. **Export:** Download the final resume as a PDF file using {{pdfLib}}.',
    variables: [
      {
        name: 'templates',
        description: 'The style options available for the resume layout.',
        type: 'select',
        options: ['Modern', 'Classic', 'Creative'],
        required: true,
      },
      {
        name: 'pdfLib',
        description:
          'The library used for generating PDF from the HTML/Canvas.',
        type: 'select',
        options: ['jsPDF', 'html2pdf', 'Puppeteer'],
        required: true,
      },
    ],
  },
  {
    title: 'Cryptocurrency News Aggregator',
    description:
      'Feed of crypto news from various sources with sentiment analysis.',
    category: 'Financial Services & Crypto',
    tags: ['crypto', 'news', 'rss', 'aggregator'],
    content:
      "Build a Cryptocurrency News Aggregator.\n**Backend:**\n1. **Ingestion:** Fetch RSS feeds from major crypto news sites (CoinDesk, Cointelegraph, etc.).\n2. **Storage:** Store headlines and summaries in a database.\n3. **Analysis:** Perform basic sentiment analysis (positive/negative/neutral) on titles using {{sentimentLib}}.\n\n**Frontend:**\n1. **Filtering:** Filter news feed by sentiment (Positive/Negative) or Coin.\n2. **Display:** List view with visual 'Hot' indicator for trending articles.",
    variables: [
      {
        name: 'sentimentLib',
        description:
          'The NLP library used for determining news headline sentiment.',
        type: 'select',
        options: ['Sentiment (Node)', 'Vader (Python)', 'AFINN'],
        required: true,
      },
    ],
  },
  {
    title: 'Church / Non-Profit Management',
    description: 'CMS for churches with event management and donations.',
    category: 'Government & Non-Profit',
    tags: ['church', 'cms', 'events', 'members'],
    content:
      'Build a comprehensive Church Management System (ChMS) designed to streamline church administration and community engagement.\n**Features:**\n1. **Member Directory:** A fully searchable database with contact information, family groupings, and custom fields (e.g., spiritual gifts, baptism date).\n2. **Event Management:** Robust calendar system for scheduling Sunday services, small group meetings, and special fundraising events with recurring event support.\n3. **Online Giving:** Secure, PCI-compliant donation portal supporting one-time tithes, recurring automated giving, and specific fund designation (e.g., building fund, missions).\n4. **Volunteer Coordination:** Advanced scheduling system allowing volunteers to sign up for roles (usher, greeter) and management of rotation schedules with automated reminders.\n5. **Communication Tools:** Integrated email marketing and SMS blast capabilities for announcements and urgent prayer requests.',
    variables: [
      {
        name: 'stack',
        description:
          'The technology stack chosen for building the church management system.',
        type: 'select',
        options: ['WordPress (Church Theme)', 'React + Rails', 'Django'],
        required: true,
      },
    ],
  },
  {
    title: 'Wedding Planner / RSVP Tool',
    description: 'Website for wedding details and guest management.',
    category: 'Business & Corporate',
    tags: ['wedding', 'rsvp', 'events', 'planning'],
    content:
      "Create an elegant and personalized Wedding Website to keep guests informed and collect RSVPs seamlessly.\n**Features:**\n1. **Hero Section:** Visually stunning introduction featuring the couple's names, date countdown, and a personalized photo gallery.\n2. **Our Story Timeline:** Interactive timeline showcasing the couple's relationship journey from first meeting to engagement.\n3. **Smart RSVP Form:** Digital form capturing guest count, meal preferences, dietary restrictions, and song requests for the DJ.\n4. **Accommodation & Travel:** Curated list of recommended hotels, blocked room rates, and transportation details for out-of-town guests.\n5. **Photo Gallery & Registry:** Interactive photo gallery and direct links to gift registries to simplify gifting for guests.",
    variables: [
      {
        name: 'stack',
        description:
          'The technology framework used to build the wedding website.',
        type: 'select',
        options: ['Static HTML/JS', 'Next.js', 'Squarespace Template'],
        required: true,
      },
    ],
  },
  {
    title: 'Lost & Found Platform',
    description: 'Community board for reporting and finding lost items.',
    category: 'Social Media & Networking',
    tags: ['lost-found', 'community', 'location', 'map'],
    content:
      "Build a hyper-local community platform dedicated to reuniting lost items with their owners quickly and efficiently.\n**Features:**\n1. **Report Lost Item:** Users can post detailed reports including photos, descriptions, last known location (GPS), and contact info.\n2. **Report Found Item:** Good Samaritans can list items they have found to help return them.\n3. **Interactive Map View:** Visual map overlay displaying pins for all recent lost and found items in the user's vicinity.\n4. **Smart Match Alerts:** Automated notification system that alerts users if a new listing matches the description of their lost item.\n5. **User Reputation:** Trust rating system based on successful returns to encourage community honesty.",
    variables: [
      {
        name: 'framework',
        description: 'The development framework for the application.',
        type: 'select',
        options: ['React Native', 'Flutter', 'Web App'],
        required: true,
      },
    ],
  },
  {
    title: 'Screen Recording Tool',
    description: 'Desktop app to record screen and microphone.',
    category: 'Desktop App',
    tags: ['recording', 'media', 'ffmpeg', 'desktop'],
    content:
      'Build a robust Desktop Screen Recorder capable of capturing high-quality video and audio for tutorials or gameplay.\n**Tech:** Electron + {{capturer}}.\n**Features:**\n1. **Flexible Capture Options:** Select to record the entire screen, a specific application window, or a browser tab.\n2. **Audio Integration:** Toggle microphone audio input to include narration alongside system audio.\n3. **Recording Controls:** On-screen timer and floating control bar for Start, Pause, and Stop actions.\n4. **Format Selection:** Choose output format ({{format}}) and quality settings to balance file size and clarity.\n5. **Instant Preview:** Built-in media player to review recordings immediately after capture.',
    variables: [
      {
        name: 'capturer',
        description: 'The library or API used to capture the screen stream.',
        type: 'select',
        options: ['Electron desktopCapturer', 'FFmpeg (via command line)'],
        required: true,
      },
      {
        name: 'format',
        description: 'The video file format for the output recording.',
        type: 'select',
        options: ['WebM', 'GIF', 'MP4'],
        required: true,
      },
    ],
  },
  {
    title: 'Interior Design Moodboard',
    description: 'Canva-lite for arranging furniture images and colors.',
    category: 'Portfolio & Creative',
    tags: ['design', 'canvas', 'moodboard', 'drag-drop'],
    content:
      'Create a user-friendly digital Moodboard Creator for interior designers and DIY enthusiasts.\n**Canvas:** {{canvasLib}}.\n**Features:**\n1. **Image Upload:** Drag and drop images directly from the device or import via URL onto the canvas.\n2. **Interactive Canvas:** Full drag-and-drop support with resize handles and rotation tools for all elements.\n3. **Color Palette Builder:** Dedicated color picker and swatch library to save and apply cohesive color schemes.\n4. **Project Management:** Save projects to local storage or export as JSON for sharing and collaboration.\n5. **Grid & Guides:** Toggleable alignment grid and guidelines to ensure perfect furniture placement.',
    variables: [
      {
        name: 'canvasLib',
        description: 'The JavaScript library used for the interactive canvas.',
        type: 'select',
        options: ['Fabric.js', 'Konva.js', 'React Flow'],
        required: true,
      },
    ],
  },
  {
    title: 'Music Player (Spotify Clone)',
    description: 'Audio player with playlists and local file support.',
    category: 'Streaming & Entertainment',
    tags: ['music', 'audio', 'playlists', 'visualizer'],
    content:
      "Build a feature-rich Music Player mimicking modern streaming service interfaces.\n**Features:**\n1. **Local Library:** Built-in file explorer to scan, load, and organize local MP3/AAC files from the user's hard drive.\n2. **Playback Controls:** Complete audio suite including Play, Pause, Next, Previous, Shuffle, Repeat, and Volume normalization.\n3. **Playlist Management:** Create, edit, and organize custom playlists with drag-and-drop sorting capabilities.\n4. **Visual Experience:** Real-time audio visualizer using the Web Audio API and Canvas to render frequencies.\n5. **Metadata Parsing:** Automatically extract and display ID3 tags (Album Art, Artist, Title) for a polished UI.",
    variables: [
      {
        name: 'framework',
        description: 'The framework used for the music player UI.',
        type: 'select',
        options: ['Electron', 'React (Web)', 'Vue'],
        required: true,
      },
    ],
  },
  {
    title: 'Invoice Generator',
    description:
      'A tool for freelancers and businesses to create, manage, and export PDF invoices.',
    category: 'Business & Corporate',
    tags: ['invoice', 'pdf', 'finance', 'sme'],
    content:
      'Generate a professional full-stack Invoice Generator application for freelancers and small businesses.\n\n**Features:**\n1. **Invoice Builder:** Dynamic form to create/edit invoices with client details, line items (quantity, rate), tax calculations, and discount codes.\n2. **Live Calculations:** JavaScript-driven real-time updates of subtotals, tax amounts, and grand totals as data is entered.\n3. **Database Persistence:** Save complete invoice history to a database ({{dbType}}) for retrieval and modification later.\n4. **PDF Export:** Generate high-quality, professional PDF invoices using {{pdfLib}} directly from the browser or server.\n5. **Client Communication:** Integrated functionality to email the finalized invoice directly to the client with a payment link.\n\n**Frontend:** {{frontendFramework}} ensuring a responsive, clean, and print-friendly layout.',
    variables: [
      {
        name: 'techStack',
        description: 'The core full-stack technology framework.',
        type: 'select',
        options: ['MERN', 'Django', 'Rails', 'Next.js'],
        required: true,
      },
      {
        name: 'pdfLib',
        description: 'The library used for generating PDF documents.',
        type: 'select',
        options: ['jsPDF', 'html2pdf', 'Puppeteer', 'Wkhtmltopdf'],
        required: true,
      },
      {
        name: 'dbType',
        description: 'The database system for storing invoice data.',
        type: 'select',
        options: ['MongoDB', 'PostgreSQL', 'SQLite'],
        required: false,
      },
    ],
  },
  {
    title: 'Contract Management (E-Signature)',
    description:
      'Platform for uploading contracts, defining fields, and capturing electronic signatures.',
    category: 'Business & Corporate',
    tags: ['legal', 'esign', 'contracts', 'security'],
    content:
      'Build a secure E-Signature Application MVP to digitize document workflows.\n\n**Core Features:**\n1. **Document Upload:** Drag-and-drop interface to upload PDF documents for preparation.\n2. **Field Placement:** Drag and drop signature, initial, date, and text fields onto specific areas of the PDF document using a canvas overlay.\n3. **Signer Workflow:** Simplified flow for signers to review the document, draw their signature using a touch/mouse pad, and place it in the designated fields.\n4. **Final Generation:** Combine the original PDF with the captured signatures and generate a new, flattened, legally signed PDF.\n\n**Security:** Ensure document integrity through checksum validation and maintain a comprehensive audit trail for all actions.',
    variables: [
      {
        name: 'framework',
        description: 'The technology stack for the web application.',
        type: 'select',
        options: ['React + Node.js', 'Vue + Laravel', 'Django'],
        required: true,
      },
      {
        name: 'pdfLib',
        description: 'The library used to manipulate and sign PDF files.',
        type: 'select',
        options: ['pdf-lib', 'PDFTron', 'Adobe PDF Services'],
        required: true,
      },
    ],
  },
  {
    title: 'Meeting Room Booking System',
    description:
      'Internal tool for scheduling conference rooms and managing resources.',
    category: 'Business & Corporate',
    tags: ['booking', 'calendar', 'resources', 'corporate'],
    content:
      'Create a centralized Meeting Room Booking System for efficient office space management.\n\n**Features:**\n1. **Interactive Calendar:** Visual day/week/month view showing real-time availability of all conference rooms.\n2. **Booking Wizard:** Intuitive booking form allowing users to select Date, Time, Room, and add Attendees.\n3. **Conflict Detection:** Logic to prevent double-booking by alerting users to scheduling conflicts in real-time.\n4. **Recurring Meetings:** Support for setting up daily, weekly, or monthly recurring meeting schedules.\n5. **Admin Dashboard:** Administrative panel to manage room details (capacity, equipment like projectors/whiteboards) and view utilization reports.',
    variables: [
      {
        name: 'techStack',
        description:
          'The technology stack for the booking backend and frontend.',
        type: 'select',
        options: ['ASP.NET Core', 'Django', 'Node.js'],
        required: true,
      },
      {
        name: 'calendarLib',
        description: 'The calendar library used for the scheduling UI.',
        type: 'select',
        options: ['FullCalendar', 'React Big Calendar', 'Calendar.js'],
        required: false,
      },
    ],
  },
  {
    title: 'Visitor Management System',
    description:
      'Digital log for office visitors, printing badges, and notifying hosts.',
    category: 'Business & Corporate',
    tags: ['iot', 'admin', 'security', 'printing'],
    content:
      'Develop a modern Visitor Management System to streamline the front-desk check-in process.\n\n**Features:**\n1. **iPad Kiosk Mode:** Self-service sign-in interface allowing visitors to enter their Name, Photo (via webcam), and select the Host.\n2. **Instant Notification:** Automated email or SMS notification sent immediately to the host upon visitor arrival.\n3. **Badge Printing:** Integration with thermal printers ({{printingProtocol}}) to automatically print visitor badges on demand.\n4. **Security Dashboard:** Log for security personnel to view all current visitors, their host, and check-out status.\n5. **Legal Compliance:** NDA digital sign-off feature for visitors to agree to confidentiality terms before entry.',
    variables: [
      {
        name: 'techStack',
        description: 'The framework used for the kiosk and admin interface.',
        type: 'select',
        options: ['React', 'Angular', 'Vue'],
        required: true,
      },
      {
        name: 'printingProtocol',
        description: 'The method used to communicate with the badge printer.',
        type: 'select',
        options: [
          'Browser Print Dialog',
          'Raw USB (QZ Tray)',
          'Network Printer',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'Client Portal',
    description:
      'Secure area for clients to view project status, invoices, and files.',
    category: 'Business & Corporate',
    tags: ['portal', 'dashboard', 'client-relations'],
    content:
      'Generate a secure B2B Client Portal to enhance client transparency and communication.\n\n**Features:**\n1. **Authentication:** Secure login for clients with support for Single Sign-On ({{sso}}) integration for enterprise clients.\n2. **Project Hub:** Visual timeline and status view displaying the current progress of active projects and milestones.\n3. **Financials:** Invoice history section allowing clients to view past invoices, download PDFs, and pay via secure links.\n4. **File Repository:** Secure storage area for project-related documents (contracts, briefs, deliverables) accessible only to authorized users.\n5. **Communication:** Integrated messaging widget or comment threads for direct communication between the client and the project team.',
    variables: [
      {
        name: 'techStack',
        description: 'The technology stack for the portal.',
        type: 'select',
        options: ['Next.js', 'Drupal', 'WordPress'],
        required: true,
      },
      {
        name: 'sso',
        description: 'The Single Sign-On provider for authentication.',
        type: 'select',
        options: ['Auth0', 'Okta', 'SAML 2.0', 'None'],
        required: false,
      },
    ],
  },
  {
    title: 'Business Plan Generator',
    description:
      'AI-assisted wizard for generating professional business plans.',
    category: 'Business & Corporate',
    tags: ['ai', 'document', 'generator', 'startup'],
    content:
      'Build an AI-assisted Business Plan Generator to simplify the startup documentation process.\n\n**Workflow:**\n1. **Interactive Wizard:** Step-by-step guided form gathering information for Executive Summary, Market Analysis, Operations, and Financials.\n2. **AI Enhancement:** Text generation helper that expands on user inputs to write professional sections (using {{aiModel}}).\n3. **Live Preview:** Split-screen view allowing users to see the formatted document update in real-time as they input data.\n4. **Export Options:** Export the final business plan to DOCX or PDF for editing in external software or sharing.\n5. **Cloud Saving:** Save and load draft plans from the cloud so users can work at their own pace.',
    variables: [
      {
        name: 'aiModel',
        description: 'The AI model used for text generation.',
        type: 'select',
        options: ['OpenAI API', 'Claude API', 'Local LLM'],
        required: true,
      },
      {
        name: 'framework',
        description: 'The frontend framework for the wizard interface.',
        type: 'select',
        options: ['React', 'Vue', 'Svelte'],
        required: true,
      },
    ],
  },
  {
    title: 'Lead Generation Landing Page',
    description: 'High-conversion landing page with A/B testing capabilities.',
    category: 'Business & Corporate',
    tags: ['marketing', 'landing-page', 'conversion', 'ab-testing'],
    content:
      'Create a high-performance Lead Generation Landing Page optimized for conversion.\n\n**Features:**\n1. **Hero Section:** Eye-catching header with an autoplaying video background and a strong value proposition.\n2. **Multi-step Form:** Progressive lead capture form to reduce friction (e.g., Name -> Company -> Needs).\n3. **Social Proof:** Dynamic ticker displaying logos of past clients or partners to build trust.\n4. **Optimization:** Integrated A/B testing ({{abTool}}) to test different headlines, CTAs, and layouts.\n5. **CRM Integration:** Direct integration ({{crm}}) to push leads instantly to the sales team.',
    variables: [
      {
        name: 'framework',
        description: 'The framework or platform for the landing page.',
        type: 'select',
        options: ['Webflow', 'Next.js', 'Unbounce', 'HTML/CSS'],
        required: true,
      },
      {
        name: 'abTool',
        description: 'The tool used for split testing variations.',
        type: 'select',
        options: ['Google Optimize', 'Optimizely', 'VWO', 'Custom Logic'],
        required: false,
      },
      {
        name: 'crm',
        description: 'The CRM system to receive lead data.',
        type: 'select',
        options: ['HubSpot', 'Salesforce', 'Zoho', 'Webhook'],
        required: false,
      },
    ],
  },
  {
    title: 'Whitepaper/Case Study Hub',
    description: 'Resource center for gated content to capture leads.',
    category: 'Business & Corporate',
    tags: ['content', 'resources', 'gated', 'marketing'],
    content:
      "Develop a Resource Center / Hub to showcase premium content and capture lead details.\n\n**Features:**\n1. **Content Grid:** Visually appealing grid of Whitepapers, Case Studies, and Ebooks with cover images and descriptions.\n2. **Advanced Filtering:** Allow users to filter resources by Industry, Topic, or Content Type.\n3. **Gated Access:** 'Gated' content model where users must complete a lead capture form before downloading.\n4. **Recommendations:** Smart 'Related Content' section suggesting other resources based on the user's current selection.\n5. **Marketing Automation:** Integration with marketing platforms to nurture leads after download.",
    variables: [
      {
        name: 'cms',
        description: 'The Content Management System for resources.',
        type: 'select',
        options: ['Contentful', 'Sanity', 'WordPress'],
        required: true,
      },
    ],
  },
  {
    title: 'Press Release Distribution',
    description:
      'Tool to draft press releases and distribute them to media lists.',
    category: 'Business & Corporate',
    tags: ['pr', 'media', 'distribution', 'email'],
    content:
      "Build a Press Release Manager to streamline public relations communications.\n\n**Features:**\n1. **Rich Editor:** WYSIWYG Rich Text Editor for drafting professional press releases with formatting options.\n2. **Media Database:** Management interface to maintain lists of journalists, bloggers, and media contacts.\n3. **Distribution Engine:** One-click Email distribution functionality leveraging SMTP or an API ({{emailService}}).\n4. **Preview Mode:** 'How it looks' preview feature to see exactly how the release will appear in an email inbox.\n5. **Analytics:** Track open rates, click rates, and engagement to measure PR campaign effectiveness.",
    variables: [
      {
        name: 'emailService',
        description: 'The service used to send mass emails.',
        type: 'select',
        options: ['SendGrid', 'Mailgun', 'Postmark', 'AWS SES'],
        required: true,
      },
    ],
  },
  {
    title: 'Stock Photography Marketplace',
    description: 'Platform for photographers to sell high-quality images.',
    category: 'Business & Corporate',
    tags: ['marketplace', 'media', 'ecommerce', 'licensing'],
    content:
      'Create a Stock Photo Marketplace connecting photographers with buyers.\n\n**Features:**\n1. **Upload & Tag:** Streamlined upload workflow with automatic AI-powered tagging using {{visionApi}} to categorize images.\n2. **Licensing Model:** Flexible licensing tiers allowing photographers to offer Standard or Extended Commercial rights.\n3. **Storefront:** Integrated shopping cart and download manager for a seamless purchasing experience.\n4. **Artist Dashboard:** A dedicated portal for photographers to manage their portfolio, track earnings, and view sales reports.\n5. **Content Protection:** Automatic watermarking of preview images to prevent unauthorized use.',
    variables: [
      {
        name: 'visionApi',
        description: 'The computer vision API for image tagging.',
        type: 'select',
        options: ['Google Vision', 'AWS Rekognition', 'Clarifai'],
        required: false,
      },
    ],
  },
  {
    title: 'Translation Service Agency',
    description:
      'Portal for clients to request translations and track progress.',
    category: 'Business & Corporate',
    tags: ['translation', 'workflow', 'agency', 'service'],
    content:
      'Develop a Translation Agency Portal to manage the end-to-end translation workflow.\n\n**Features:**\n1. **Quote Request:** Form for clients to request quotes based on word count, source language, and target language.\n2. **Order Tracking:** Real-time status tracking system allowing clients to see where their document is in the translation queue.\n3. **File Handling:** Secure upload and download system supporting CAT-tool compatible formats (XLIFF, TMX).\n4. **Manager Dashboard:** Project manager interface to assign specific translators to jobs and monitor deadlines.\n5. **Billing:** Automated invoicing system generated based on the final word count and agreed-upon rates.',
    variables: [
      {
        name: 'stack',
        description: 'The technology stack for the agency portal.',
        type: 'select',
        options: ['PHP (Laravel)', 'Django', 'Node.js'],
        required: true,
      },
    ],
  },
  {
    title: 'Personal Diary/Journal App',
    description:
      'Secure private journaling app with mood tracking and markdown support.',
    category: 'Blog & Personal',
    tags: ['journal', 'diary', 'privacy', 'mobile'],
    content:
      'Build a Personal Journal App focused on privacy and expressive writing.\n\n**Features:**\n1. **Markdown Editor:** A distraction-free daily entry editor supporting full Markdown syntax for rich text formatting.\n2. **Mood Tracking:** Visual mood selector with icons and descriptions to help track emotional patterns over time.\n3. **Search & Tags:** Powerful search functionality to find past entries by keywords, date, or custom tags.\n4. **Security:** Local encryption options (if supported) or biometric/passcode lock to ensure diary privacy.\n5. **Data Portability:** Export all entries to standard JSON or Markdown formats for permanent backup.\n\n**Platform:** {{platform}}.',
    variables: [
      {
        name: 'platform',
        description: 'The target platform for the journal application.',
        type: 'select',
        options: [
          'Mobile App (React Native)',
          'Web App (PWA)',
          'Desktop (Electron)',
        ],
        required: true,
      },
      {
        name: 'storage',
        description: 'The storage mechanism for journal entries.',
        type: 'select',
        options: ['Local Storage', 'Encrypted SQLite', 'Firebase'],
        required: true,
      },
    ],
  },
  {
    title: 'Tech Blog Starter',
    description: 'Developer-focused blog with syntax highlighting and RSS.',
    category: 'Blog & Personal',
    tags: ['blog', 'tech', 'markdown', 'static-site'],
    content:
      'Generate a high-performance Tech Blog for developers.\n\n**Tech Stack:** {{ssg}}.\n**Features:**\n1. **Content First:** Markdown-based content management system optimized for writing technical articles with code snippets.\n2. **Syntax Highlighting:** Beautiful syntax highlighting for code blocks ({{hlLib}}) supporting multiple programming languages.\n3. **User Experience:** Dark mode toggle and a clean, typography-focused reading experience.\n4. **Syndication:** Automatic RSS Feed generation to allow readers to subscribe in their favorite feed reader.\n5. **SEO:** Built-in SEO optimizations including Sitemap generation and Meta tags.\n6. **Community:** Integrated comment section ({{commentSystem}}) for reader engagement.',
    variables: [
      {
        name: 'ssg',
        description: 'The Static Site Generator for the blog.',
        type: 'select',
        options: ['Gatsby', 'Next.js', 'Hugo', 'Astro', 'Jekyll'],
        required: true,
      },
      {
        name: 'hlLib',
        description: 'The library used for syntax highlighting.',
        type: 'select',
        options: ['Prism.js', 'Highlight.js', 'Shiki'],
        required: true,
      },
      {
        name: 'commentSystem',
        description: 'The third-party comment system.',
        type: 'select',
        options: ['Disqus', 'giscus', 'Utterances', 'Commento'],
        required: true,
      },
    ],
  },
  {
    title: 'Food Recipe Blog',
    description:
      'Blog focused on recipes with print view and nutritional info.',
    category: 'Blog & Personal',
    tags: ['food', 'recipe', 'blog', 'lifestyle'],
    content:
      "Create a visually appealing Food Recipe Blog focused on usability and cooking.\n\n**Features:**\n1. **Recipe Card:** Prominent card displaying prep time, cook time, servings, and difficulty level.\n2. **User-Friendly View:** 'Jump to Recipe' button that takes readers directly to the instructions.\n3. **Print Optimized:** A special print-friendly view that hides ads and chatter to provide a clean recipe for the kitchen.\n4. **Rich Data:** Implementation of Schema.org markup for Google Recipes to appear in Google search results.\n5. **Interactive:** Ingredient checkbox list that users can check off as they cook.\n\n**CMS:** {{cms}}.",
    variables: [
      {
        name: 'cms',
        description: 'The CMS used for managing recipes.',
        type: 'select',
        options: ['WordPress', 'Tasty', 'Custom (Next.js + CMS)'],
        required: true,
      },
    ],
  },
  {
    title: 'Travel Vlog Site',
    description: 'Video-first blog with map integration of travel locations.',
    category: 'Blog & Personal',
    tags: ['travel', 'video', 'map', 'blog'],
    content:
      "Build an immersive Travel Vlog Site to share adventures.\n\n**Features:**\n1. **Cinematic Intro:** Hero section with a full-screen video background from the traveler's latest destination.\n2. **Video Integration:** Blog posts featuring embedded videos from YouTube or Vimeo alongside travel stories.\n3. **Geo-Context:** Interactive map ({{mapProvider}}) showing pins of all visited locations and travel routes.\n4. **Gallery:** Lightbox-enabled photo gallery showcasing high-resolution images from the trips.\n5. **Resources:** A 'Travel Tips' section providing practical advice for future travelers (visas, transport, etc.).",
    variables: [
      {
        name: 'mapProvider',
        description: 'The map service provider.',
        type: 'select',
        options: ['Google Maps', 'Mapbox', 'Leaflet'],
        required: true,
      },
      {
        name: 'framework',
        description: 'The web framework for the site.',
        type: 'select',
        options: ['Next.js', 'Gatsby', 'Vue'],
        required: true,
      },
    ],
  },
  {
    title: 'Photoblog (Masonry Grid)',
    description: 'Visual-first blog with Pinterest-style masonry layout.',
    category: 'Blog & Personal',
    tags: ['photography', 'masonry', 'portfolio', 'blog'],
    content:
      'Create a minimalist Photoblog where images take center stage.\n\n**UI:** Pinterest-style masonry grid layout (using {{masonryLib}}) for a responsive, aesthetic flow.\n**Features:**\n1. **Performance:** Lazy loading of high-resolution images to ensure fast page load times.\n2. **Technical Details:** Sidebar or hover display of EXIF data (Camera model, ISO, Aperture, Shutter Speed) for photography enthusiasts.\n3. **Immersive:** Full-screen Lightbox for viewing images in high detail.\n4. **Design:** Ultra-minimalist design with minimal UI chrome to keep the focus solely on the photography.',
    variables: [
      {
        name: 'masonryLib',
        description: 'The library implementing the masonry layout.',
        type: 'select',
        options: ['Masonry.js', 'React-Masonry-CSS', 'CSS Grid'],
        required: true,
      },
    ],
  },
  {
    title: 'Podcast Host Site (with RSS)',
    description:
      'Website for a podcast with audio player and subscription links.',
    category: 'Blog & Personal',
    tags: ['podcast', 'audio', 'rss', 'blog'],
    content:
      'Generate a professional website for a Podcast to grow an audience.\n\n**Features:**\n1. **Sticky Player:** A persistent audio player at the bottom of the screen that allows users to listen while navigating the site.\n2. **Show Notes:** Clean episode list with detailed show notes, chapter markers, and guest information.\n3. **Syndication:** Automatic RSS Feed generation to enable subscription on Apple Podcasts, Spotify, and Google Podcasts.\n4. **Discoverability:** Subscribe buttons for major platforms and an embedded player for easy sharing.\n5. **Transcripts:** Dedicated section for displaying episode transcripts for accessibility and SEO.',
    variables: [
      {
        name: 'techStack',
        description: 'The technology stack for the site.',
        type: 'select',
        options: ['Next.js', 'Hugo', 'WordPress (PowerPress)'],
        required: true,
      },
    ],
  },
  {
    title: 'Newsletter Curator',
    description:
      'Landing page to showcase past newsletters and capture email subs.',
    category: 'Blog & Personal',
    tags: ['newsletter', 'email', 'marketing', 'content'],
    content:
      "Build a Newsletter Archive & Subscribe Page to grow a subscriber list.\n\n**Features:**\n1. **Public Archive:** A clean, browsable archive of all past newsletters, displayed in reverse chronological order.\n2. **Sign Up Form:** A prominent and well-designed email capture form integrated with an email provider ({{emailProvider}}).\n3. **Discovery:** A 'Recent Issues' sidebar or section highlighting the latest content.\n4. **Social Sharing:** Built-in sharing buttons to make it easy for readers to share individual issues with their network.",
    variables: [
      {
        name: 'emailProvider',
        description: 'The email marketing service provider.',
        type: 'select',
        options: ['Substack', 'ConvertKit', 'Mailchimp', 'Buttondown'],
        required: true,
      },
    ],
  },
  {
    title: 'Micro-blogging Platform (Twitter clone)',
    description: 'Short-form content platform with followers and hashtags.',
    category: 'Blog & Personal',
    tags: ['microblog', 'social', 'twitter-clone', 'feed'],
    content:
      'Create a Micro-blogging App for sharing short, frequent updates.\n\n**Features:**\n1. **Character Limit:** Enforce a character limit ({{charLimit}}) for posts to encourage brevity.\n2. **Social Graph:** Follow/Unfollow system to build a personalized network of users.\n3. **Discovery:** Hashtag discovery page and search functionality to find trending topics.\n4. **Engagement:** Like and Repost functionality to amplify content within the network.\n5. **Real-time Feed:** A real-time, chronologically sorted timeline of posts from followed users.',
    variables: [
      { name: 'charLimit', type: 'number', defaultValue: 280, required: false },
      {
        name: 'techStack',
        description: 'The full-stack technology for the platform.',
        type: 'select',
        options: ['React + Firebase', 'Vue + Supabase', 'Laravel'],
        required: true,
      },
    ],
  },
  {
    title: "Writer's Collaboration Tool",
    description: 'Google Docs alternative for co-writing stories or articles.',
    category: 'Blog & Personal',
    tags: ['collaboration', 'writing', 'editor', 'realtime'],
    content:
      "Build a Collaborative Writing Tool for remote co-authoring.\n\n**Features:**\n1. **Rich Editor:** A sophisticated rich text editor with support for comments and suggestions mode for editing.\n2. **Real-time Presence:** Visual indicators of other users' cursors and selections using CRDT ({{crdtLib}}) for a smooth collaborative experience.\n3. **Version History:** A timeline view of the document's history, allowing users to view and restore previous versions.\n4. **Permissions:** User permission system to define roles (Owner, Editor, Viewer) and control access.",
    variables: [
      {
        name: 'crdtLib',
        description: 'The CRDT library for real-time collaboration.',
        type: 'select',
        options: ['Yjs', 'Automerge', 'ShareDB'],
        required: true,
      },
    ],
  },
  {
    title: 'Quote of the Day API',
    description:
      'Backend service providing random quotes and a frontend dashboard.',
    category: 'Blog & Personal',
    tags: ['api', 'quotes', 'backend', 'frontend'],
    content:
      "Create a full-stack Quote of the Day Service.\n\n**Backend:**\n1. **REST API:** Endpoint `GET /quotes/random` to serve quotes.\n2. **Filtering:** Support for filtering quotes by author, tag, or category.\n3. **Data Source:** A database of quotes, potentially extensible via an admin panel.\n\n**Frontend:**\n1. **Widget:** A simple, attractive widget to display the daily quote.\n2. **Utility:** A 'Copy to clipboard' button for easy sharing.\n3. **Aesthetics:** A feature to change the widget's background color or theme.",
    variables: [
      {
        name: 'techStack',
        description: 'The backend technology stack.',
        type: 'select',
        options: ['Node + Express', 'Python + Flask', 'Go'],
        required: true,
      },
    ],
  },
  {
    title: 'Fan Fiction Archive',
    description: 'AO3-style platform for publishing and reading fan fiction.',
    category: 'Blog & Personal',
    tags: ['fiction', 'reading', 'archive', 'tags'],
    content:
      "Build a Fan Fiction Archive for writers and readers of fan fiction.\n\n**Features:**\n1. **Advanced Search:** Powerful search by Fandoms, Characters, Rating (G, T, M, E), and Archive Warnings.\n2. **Chaptered Works:** Publishing system that supports multi-chapter stories with chapter navigation.\n3. **Interaction:** A Kudos and comment system for readers to leave feedback on stories.\n4. **Collections:** Users can create and save stories to 'Collections' or 'Bookmarks'.\n5. **Themes:** Dark mode support for comfortable reading at night.",
    variables: [
      {
        name: 'techStack',
        description: 'The full-stack technology for the archive.',
        type: 'select',
        options: ['Django', 'Rails', 'Node.js'],
        required: true,
      },
    ],
  },
  {
    title: 'Poetry Magazine',
    description:
      'Literary magazine with elegant typography and submission system.',
    category: 'Blog & Personal',
    tags: ['poetry', 'literary', 'magazine', 'writing'],
    content:
      "Create a Poetry Magazine Website focused on literary aesthetics.\n\n**Design Focus:** A typography-first, elegant layout that honors the written word.\n**Features:**\n1. **Daily Highlight:** A 'Featured Poem of the day' section to highlight specific works.\n2. **Submissions:** A secure submission manager for poets to upload their work as Doc or PDF files.\n3. **Archive:** An organized archive of all past issues and poems.\n4. **Multimedia:** A section dedicated to audio recordings of poems read by the authors.",
    variables: [
      {
        name: 'framework',
        description: 'The frontend framework.',
        type: 'select',
        options: ['Next.js', 'Webflow', 'Craft CMS'],
        required: true,
      },
    ],
  },
  {
    title: 'News Aggregator (Personal Feedly)',
    description:
      'Client-side RSS reader to consume content from various sites.',
    category: 'Blog & Personal',
    tags: ['rss', 'aggregator', 'reader', 'news'],
    content:
      "Build a Personal News Aggregator to curate your own news feed.\n\n**Features:**\n1. **Add Source:** Simple input field to add RSS Feed URLs from your favorite news sites or blogs.\n2. **Fetch & Parse:** Logic to fetch and parse XML/Atom RSS feeds either on the client or via a server proxy.\n3. **Feed List:** A list view of the latest articles from all your subscribed feeds.\n4. **Actions:** 'Mark as Read' and 'Save for Later' functionality to manage your reading queue.\n5. **Organization:** Ability to categorize feeds into groups (e.g., Tech, News, Sports).",
    variables: [
      {
        name: 'framework',
        description: 'The frontend framework.',
        type: 'select',
        options: ['React', 'Vue', 'Svelte'],
        required: true,
      },
      {
        name: 'parser',
        description: 'The method for parsing RSS feeds.',
        type: 'select',
        options: ['RSS Parser (Node)', 'Browser Fetch'],
        required: false,
      },
    ],
  },
  {
    title: 'Guest Post Management System',
    description: 'CMS extension to handle guest contributor workflows.',
    category: 'Blog & Personal',
    tags: ['cms', 'workflow', 'guest', 'publishing'],
    content:
      "Develop a Guest Post Manager to streamline contributions from external writers.\n\n**Workflow:**\n1. **Submission:** Guest writers submit their articles via a public-facing form (Status: Pending).\n2. **Review:** Editors review the submissions (Status: Under Review) and can request changes or approve.\n3. **Approval:** Editors approve the final version for publication.\n4. **Publication:** The post is published to the blog with a special 'Guest Author Bio' section.\n\n**Stack:** Implemented as a {{cms}} plugin/extension or a custom application.",
    variables: [
      {
        name: 'cms',
        description: 'The CMS to extend or the custom stack.',
        type: 'select',
        options: ['WordPress Plugin', 'Strapi Plugin', 'Custom Next.js'],
        required: true,
      },
    ],
  },
  {
    title: 'Niche Social Network (e.g., for Doctors)',
    description: 'Professional community platform with verified profiles.',
    category: 'Social Media & Networking',
    tags: ['social', 'professional', 'niche', 'network'],
    content:
      'Generate a Niche Professional Network tailored for a specific industry.\n\n**Target Audience:** {{niche}}.\n**Features:**\n1. **Verification:** Profile verification system requiring users to upload a professional License or ID.\n2. **Forums:** Specialized discussion forums ({{forumType}}) for industry-specific topics and Q&A.\n3. **Career Center:** A job board focused exclusively on opportunities within that specific industry.\n4. **Networking:** Direct messaging between professionals and connection requests.\n5. **Content Feed:** A social feed for sharing industry news, articles, and case studies.',
    variables: [
      {
        name: 'niche',
        description: 'The specific professional industry for the network.',
        type: 'select',
        options: ['Doctors', 'Lawyers', 'Developers', 'Teachers'],
        required: true,
      },
      {
        name: 'forumType',
        description: 'The style and structure of the discussion forums.',
        type: 'select',
        options: ['Reddit Style', 'Discourse Style', 'Facebook Group Style'],
        required: true,
      },
    ],
  },
  {
    title: 'Alumni Network Portal',
    description: 'Platform for university/school alumni to connect and mentor.',
    category: 'Social Media & Networking',
    tags: ['alumni', 'education', 'networking', 'mentorship'],
    content:
      'Build an Alumni Network Portal to foster lifelong connections.\n\n**Features:**\n1. **Directory:** A searchable Alumni Directory (by Grad Year, Major, Location).\n2. **Mentorship:** A program matching Alumni (Mentors) with Students (Mentees) for career guidance.\n3. **Events:** An events page for managing Reunions, Networking Webinars, and Chapter meetups.\n4. **Job Board:** A job board exclusively for alumni to post and apply for opportunities.\n5. **Giving:** A donation gateway for alumni to contribute back to their alma mater.',
    variables: [
      {
        name: 'techStack',
        description: 'The technology stack for the portal.',
        type: 'select',
        options: ['Laravel', 'Django', 'React + Node'],
        required: true,
      },
    ],
  },
  {
    title: 'Dating App (Tinder style)',
    description: 'Geolocation-based dating app with swipe gestures.',
    category: 'Social Media & Networking',
    tags: ['dating', 'swipe', 'mobile', 'geo'],
    content:
      'Create a modern Dating App.\n\n**Core Interaction:** A Tinder-style swipe card deck interface ({{swipeLib}}).\n**Features:**\n1. **Matching:** Geolocation-based matching algorithm to find users within a {{radius}}km radius.\n2. **Profile:** Profile setup allowing users to upload multiple photos and write a bio.\n3. **Match Detection:** System that detects when two users have both swiped right on each other.\n4. **Chat:** A real-time chat feature available only between matched users.',
    variables: [
      {
        name: 'swipeLib',
        description: 'The library for implementing the swipe gesture UI.',
        type: 'select',
        options: ['Tinder Card', 'Framer Motion', 'Custom Gesture'],
        required: true,
      },
      {
        name: 'platform',
        description: 'The mobile development platform.',
        type: 'select',
        options: ['React Native', 'Flutter'],
        required: true,
      },
    ],
  },
  {
    title: 'Matrimonial Site',
    description: 'Traditional matchmaking service with advanced filters.',
    category: 'Social Media & Networking',
    tags: ['matrimony', 'matchmaking', 'profiles', 'search'],
    content:
      "Build a comprehensive Matrimonial Site.\n\n**Features:**\n1. **Detailed Profiles:** In-depth profile creation including Religion, Caste, Profession, Horoscope, and more.\n2. **Search:** Advanced search filters to find potential matches based on a wide range of criteria.\n3. **Interaction:** An 'Interest' sending functionality to initiate contact with a match.\n4. **Privacy:** Robust privacy controls, such as blurring profile photos and revealing contact info only after acceptance.\n5. **Monetization:** Paid membership tiers that unlock premium features like direct contact.",
    variables: [
      {
        name: 'techStack',
        description: 'The technology stack for the site.',
        type: 'select',
        options: ['PHP (Custom)', 'Django', 'MERN'],
        required: true,
      },
    ],
  },
  {
    title: 'Professional Network (LinkedIn style)',
    description: 'Career-focused social network for connections and jobs.',
    category: 'Social Media & Networking',
    tags: ['linkedin', 'professional', 'jobs', 'connections'],
    content:
      "Develop a Professional Network similar to LinkedIn.\n\n**Features:**\n1. **Profile:** A resume-style profile page with sections for Experience, Education, and Skills.\n2. **Feed:** A social feed for posting professional updates, articles, and insights.\n3. **Connections:** A system to send, accept, and manage connection requests with other professionals.\n4. **Validation:** A skills endorsement system where connections can validate a user's listed skills.\n5. **Jobs:** A job board with an 'Easy Apply' feature and company pages.",
    variables: [
      {
        name: 'techStack',
        description: 'The technology stack for the network.',
        type: 'select',
        options: ['MERN', 'Java Spring Boot', 'Python'],
        required: true,
      },
    ],
  },
  {
    title: 'Community Event Board',
    description: 'Hyperlocal event discovery and management.',
    category: 'Social Media & Networking',
    tags: ['events', 'local', 'community', 'calendar'],
    content:
      'Create a Community Event Board for local happenings.\n\n**Features:**\n1. **Map Discovery:** A map-based interface to discover events happening nearby.\n2. **Event Creation:** Form for users to create events (Title, Date, Location, Cover Image).\n3. **Engagement:** RSVP tracking system for events and a comment section for discussion.\n4. **Promotion:** A slider to highlight featured events on the homepage.\n5. **Social:** Share event details on social media platforms.',
    variables: [
      {
        name: 'mapProvider',
        description: 'The map service provider.',
        type: 'select',
        options: ['Google Maps', 'Mapbox', 'Leaflet'],
        required: true,
      },
    ],
  },
  {
    title: 'Live Streaming App (TikTok style)',
    description: 'Vertical video streaming platform with real-time comments.',
    category: 'Social Media & Networking',
    tags: ['streaming', 'video', 'social', 'mobile'],
    content:
      "Build a Live Streaming App similar to TikTok Live.\n\n**Tech:** React Native + {{streamingSdk}}.\n**Features:**\n1. **Broadcast:** A 'Go Live' button for users to start their own video stream.\n2. **Viewer Experience:** A full-screen video feed interface with animated heart reactions.\n3. **Interaction:** Real-time comments overlay on the video stream from viewers.\n4. **Engagement:** A live viewer list and viewer count displayed on screen.\n5. **Replay:** Ability to save the live stream to the user's profile for later viewing.",
    variables: [
      {
        name: 'streamingSdk',
        description: 'The SDK for managing live video streams.',
        type: 'select',
        options: ['Agora', 'Twilio', 'Mux', 'AWS IVS'],
        required: true,
      },
    ],
  },
  {
    title: 'Forum Software (Discourse clone)',
    description: 'Robust discussion board with categories and trust levels.',
    category: 'Social Media & Networking',
    tags: ['forum', 'discussion', 'discourse', 'community'],
    content:
      "Generate powerful Forum Software.\n\n**Features:**\n1. Category-based navigation.\n2. Threaded topics.\n3. User trust levels (Newbie -> Leader).\n4. Badges and gamification.\n5. 'Solved' button for support topics.",
    variables: [
      {
        name: 'techStack',
        description: 'The technology stack for the forum software.',
        type: 'select',
        options: ['Rails', 'Django', 'Node.js (Flarum)'],
        required: true,
      },
    ],
  },
  {
    title: 'Group Chat App (WhatsApp Web style)',
    description: 'Browser-based group chat with media sharing.',
    category: 'Social Media & Networking',
    tags: ['chat', 'messaging', 'websocket', 'groups'],
    content:
      'Create a Group Chat Application.\n\n**Backend:** WebSocket ({{socketLib}}).\n**Features:**\n1. Create Group and add members.\n2. Send Text, Images, and Files.\n3. Message read receipts (Blue ticks).\n4. Emoji picker.\n5. Search message history.',
    variables: [
      {
        name: 'socketLib',
        description: 'The WebSocket library for real-time communication.',
        type: 'select',
        options: ['Socket.io', 'WS', 'Pusher'],
        required: true,
      },
    ],
  },
  {
    title: 'Fan Club Platform',
    description: 'Exclusive content platform for creators/influencers.',
    category: 'Social Media & Networking',
    tags: ['fans', 'creator', 'subscription', 'exclusive'],
    content:
      'Build a Fan Club Platform.\n\n**Features:**\n1. Creator Profile with tiers (Free, VIP).\n2. Paywall for exclusive posts.\n3. Direct messaging to creators.\n4. Live Q&A sessions for VIP members.',
    variables: [
      {
        name: 'payment',
        description: 'The payment gateway for subscriptions.',
        type: 'select',
        options: ['Stripe Subscription', 'Patreon API', 'Coinbase Commerce'],
        required: true,
      },
    ],
  },
  {
    title: 'Influencer Marketplace',
    description: 'Platform for brands to find and hire influencers.',
    category: 'Social Media & Networking',
    tags: ['marketing', 'influencers', 'marketplace', 'brand'],
    content:
      'Develop an Influencer Marketplace.\n\n**Features:**\n1. Influencer profiles (Metrics: Followers, Engagement Rate).\n2. Search filters (Niche, Platform, Price).\n3. Campaign creation (Brief -> Send Proposal).\n4. Messaging between Brand and Influencer.\n5. Payment escrow service.',
    variables: [
      {
        name: 'techStack',
        description: 'The technology stack for the marketplace.',
        type: 'select',
        options: ['Next.js', 'React Native', 'Vue'],
        required: true,
      },
    ],
  },
  {
    title: 'Q&A Platform (Quora clone)',
    description: 'Knowledge sharing platform with upvotes and spaces.',
    category: 'Social Media & Networking',
    tags: ['qa', 'knowledge', 'quora', 'social'],
    content:
      "Create a Q&A Platform.\n\n**Features:**\n1. Ask Question (Rich text).\n2. Answer flow.\n3. Upvote/Downvote answers.\n4. 'Spaces' (Topics) to follow.\n5. Feed of activity.",
    variables: [
      {
        name: 'techStack',
        description: 'The technology stack for the Q&A platform.',
        type: 'select',
        options: ['MERN', 'Django', 'Rails'],
        required: true,
      },
    ],
  },
  {
    title: 'Anonymous Confession App',
    description: 'Secret-sharing app with location-based feeds.',
    category: 'Social Media & Networking',
    tags: ['anonymous', 'secret', 'location', 'social'],
    content:
      "Build an Anonymous Confession App.\n\n**Features:**\n1. Post text/image anonymously.\n2. Feed sorted by 'Near Me' ({{locPrecision}}) or 'Global'.\n3. Comment system (Anonymous).\n4. Like/Heart count.\n5. Moderation system (Report/Hide).",
    variables: [
      {
        name: 'locPrecision',
        description: 'The precision level for location-based feeds.',
        type: 'select',
        options: ['Exact GPS', 'City Level', 'Country Level'],
        required: true,
      },
    ],
  },
  {
    title: 'Neighborhood Watch App',
    description: 'Safety and security app for local communities.',
    category: 'Social Media & Networking',
    tags: ['safety', 'community', 'location', 'alerts'],
    content:
      'Develop a Neighborhood Watch App.\n\n**Features:**\n1. Report Incident (Theft, Suspicious Activity, Lost Pet).\n2. Map view of incidents with pins.\n3. Push alerts to neighbors in radius.\n4. Verified Residents only (Address verification).\n5. Anonymous posting option.',
    variables: [
      {
        name: 'framework',
        description: 'The mobile development framework.',
        type: 'select',
        options: ['React Native', 'Flutter', 'Ionic'],
        required: true,
      },
    ],
  },
  {
    title: 'Club/Association Portal',
    description: 'Management system for sports clubs or hobby groups.',
    category: 'Social Media & Networking',
    tags: ['club', 'membership', 'events', 'management'],
    content:
      'Create a Club Management Portal.\n\n**Features:**\n1. Member directory with profiles.\n2. Event calendar (Matches, Meetings).\n3. Membership renewal system (Pay for annual fee).\n4. Announcement board.\n5. Gallery/Albums for events.',
    variables: [
      {
        name: 'techStack',
        description: 'The technology stack for the club portal.',
        type: 'select',
        options: ['WordPress (BuddyBoss)', 'Django', 'Rails'],
        required: true,
      },
    ],
  },
  {
    title: 'Local News Portal',
    description: 'Hyperlocal news site focusing on a specific town or city.',
    category: 'News & Media Publishers',
    tags: ['news', 'local', 'journalism', 'cms'],
    content:
      'Generate a comprehensive Local News Portal tailored for a specific community.\n\n**Core Sections:**\n1. **Local Headlines:** Breaking news and featured stories curated for the town/city.\n2. **Interactive Weather Widget:** Real-time weather updates, forecasts, and severe weather alerts.\n3. **Local Sports Hub:** Scores, schedules, and analysis for high school and community teams.\n4. **Obituaries:** respectful death notices and guest books for community members.\n5. **Classifieds Marketplace:** Local jobs, housing, and for-sale listings.\n\n**Advanced Features:**\n- Content syndication and RSS feeds.\n- Event calendar integration.\n- Newsletter subscription management.\n- Ad management system for local businesses.\n- SEO optimization for local search.\n\n**Design:** High information density with emphasis on readability, speed, and accessibility.',
    variables: [
      {
        name: 'cms',
        description: 'The Content Management System powering the site.',
        type: 'select',
        options: ['WordPress (Newspaper theme)', 'Joomla', 'Custom Django'],
        required: true,
      },
    ],
  },
  {
    title: 'Magazine Subscription Site',
    description: 'Paywalled digital magazine with issue management.',
    category: 'News & Media Publishers',
    tags: ['magazine', 'subscription', 'paywall', 'content'],
    content:
      'Build a premium Digital Magazine Site focused on subscriber retention and engagement.\n\n**Features:**\n1. **Issue Archive:** Responsive grid layout of past issue covers with quick access.\n2. **Smart Paywall:** Metered access allowing {{numArticles}} free articles per month before requiring a subscription.\n3. **Subscription Management:** Integration with Stripe for recurring billing and plan management.\n4. **Immersive Reader:** Flipbook-style reader ({{readerTech}}) for a traditional magazine feel, or scrollable web view.\n5. **Contributor Profiles:** Dedicated pages for writers, photographers, and artists.\n\n**Monetization:**\n- Tiered subscription plans (Monthly/Yearly).\n- Single issue purchases.\n- Gift subscriptions.',
    variables: [
      {
        name: 'readerTech',
        description: 'The technology used to render the magazine pages.',
        type: 'select',
        options: ['PDF Flipbook', 'HTML Scroll', 'Image Slider'],
        required: true,
      },
      {
        name: 'numArticles',
        description: 'The number of free articles a user can read per month.',
        type: 'number',
        defaultValue: 3,
        required: false,
      },
    ],
  },
  {
    title: 'Video News Network',
    description: 'CNN-style video news aggregator and player.',
    category: 'News & Media Publishers',
    tags: ['video', 'news', 'streaming', 'media'],
    content:
      'Create a 24/7 Video News Network platform mimicking major broadcasters.\n\n**Features:**\n1. **Main Player with Playlist:** Persistent video player with an auto-updating playlist queue.\n2. **Breaking News Ticker:** Scrolling text overlay for urgent updates.\n3. **Category Feeds:** Segregated video feeds for Politics, Tech, Sports, and Entertainment.\n4. **Live Stream Integration:** Low-latency HLS streaming capabilities for live broadcasts.\n5. **Cross-Device Support:** AirPlay and Chromecast support for viewing on TVs.',
    variables: [
      {
        name: 'videoHost',
        description:
          'The platform or service used to host and stream video content.',
        type: 'select',
        options: ['YouTube API', 'Vimeo', 'Mux', 'AWS'],
        required: true,
      },
    ],
  },
  {
    title: 'Weather Channel Site',
    description: 'Forecast site with radar maps and severe alerts.',
    category: 'News & Media Publishers',
    tags: ['weather', 'maps', 'api', 'forecast'],
    content:
      'Develop a professional Weather Site providing critical meteorological data.\n\n**API Integration:** OpenWeatherMap, WeatherAPI, or NOAA.\n**Features:**\n1. **Current Conditions:** Real-time temperature, humidity, wind speed, and UV index.\n2. **7-Day Forecast:** Detailed hourly and daily predictions.\n3. **Interactive Radar Map:** Animated weather layers ({{mapProvider}}) showing precipitation, clouds, and temperature.\n4. **Severe Weather Alerts:** Prominent banner notifications for storms, floods, or hurricanes.\n5. **Location Services:** Auto-detection and multiple saved location support.',
    variables: [
      {
        name: 'mapProvider',
        description: 'The mapping provider for the radar overlay.',
        type: 'select',
        options: ['Google Maps', 'Mapbox', 'Leaflet'],
        required: true,
      },
    ],
  },
  {
    title: 'Sports News Aggregator',
    description: 'Central hub for scores, news, and league tables.',
    category: 'News & Media Publishers',
    tags: ['sports', 'scores', 'news', 'api'],
    content:
      "Build a comprehensive Sports News Aggregator for fans.\n\n**Features:**\n1. **Live Score Ticker:** Real-time game updates powered by a Sports API.\n2. **League Standings:** Dynamic tables showing rankings, points, and win/loss records.\n3. **Personalized Feed:** News and highlights filtered by user's favorite teams and leagues.\n4. **Schedule Calendar:** Interactive calendar view of upcoming games.\n5. **Fan Interaction:** 'My Teams' preferences and comment sections on articles.",
    variables: [
      {
        name: 'api',
        description: 'The data source for live scores and sports statistics.',
        type: 'select',
        options: ['TheSportsDB', 'API-Football', 'SportRadar', 'Mock Data'],
        required: true,
      },
    ],
  },
  {
    title: 'Tech Crunch Clone',
    description: 'Tech news blog with startup database and funding rounds.',
    category: 'News & Media Publishers',
    tags: ['tech', 'startups', 'news', 'database'],
    content:
      'Create a Tech News Site serving the startup and venture capital community.\n\n**Features:**\n1. **Tech News Feed:** Latest articles on gadgets, software, and industry trends.\n2. **Startup Database:** Searchable directory of companies with descriptions and funding history.\n3. **Crunchbase-Style Profiles:** Detailed pages linking investors, acquisitions, and key personnel.\n4. **Market Filtering:** Filter news and startups by market category (FinTech, SaaS, AI).\n5. **Newsletter:** Daily or weekly digest of top stories delivered via email.',
    variables: [
      {
        name: 'techStack',
        description: 'The framework or CMS used to build the site.',
        type: 'select',
        options: ['Next.js', 'Hugo', 'Ghost'],
        required: true,
      },
    ],
  },
  {
    title: 'Comic Strip Repository',
    description: 'Archive for webcomics with navigation and comments.',
    category: 'News & Media Publishers',
    tags: ['comics', 'archive', 'media', 'entertainment'],
    content:
      'Build a Comic Strip Archive for a webcomic artist.\n\n**Features:**\n1. **Chronological Navigation:** First, Previous, Next, and Last buttons to browse the archive.\n2. **Date Picker:** Calendar view to jump to specific publication dates.\n3. **Accessibility:** Transcript text provided for screen readers and search indexing.\n4. **Social Sharing:** One-click sharing to Twitter and Facebook.\n5. **Cast List:** Wiki-style page explaining recurring characters.',
    variables: [
      {
        name: 'cms',
        description: 'The platform for managing comic posts and assets.',
        type: 'select',
        options: ['WordPress (ComicPress)', 'Custom PHP', 'Static Site'],
        required: true,
      },
    ],
  },
  {
    title: 'Obituary Listings',
    description: 'Respectful listing service for obituaries and condolences.',
    category: 'News & Media Publishers',
    tags: ['obituaries', 'death', 'condolences', 'listing'],
    content:
      'Create an Obituary Listing Service for funeral homes or newspapers.\n\n**Features:**\n1. **Searchable Database:** Filter obituaries by name, date, and location.\n2. **Memorial Pages:** Detailed view including biography, service details, and photo gallery.\n3. **Guest Book:** Digital condolence book for friends and family to leave messages.\n4. **Funeral Home Info:** Contact details and directions for the service.\n5. **Commerce:** Integration for sending flowers or making charitable donations in memory.',
    variables: [
      {
        name: 'framework',
        description: 'The web framework for the application.',
        type: 'select',
        options: ['PHP', 'Django', 'Rails'],
        required: true,
      },
    ],
  },
  {
    title: 'Press Release Wire',
    description: 'Service to distribute press releases to journalists.',
    category: 'News & Media Publishers',
    tags: ['pr', 'distribution', 'news', 'journalism'],
    content:
      'Develop a Press Release Wire for public relations professionals.\n\n**Features:**\n1. **Content Upload:** Form to upload PR text, images, and multimedia assets.\n2. **Categorization:** Tagging system to organize releases by industry and topic.\n3. **Journalist Network:** Portal for media professionals to subscribe to specific beats.\n4. **SEO Landing Pages:** Static pages generated for every PR to improve search visibility.\n5. **Analytics Dashboard:** Track views, opens, and click-through rates for distributions.',
    variables: [
      {
        name: 'techStack',
        description: 'The technology stack for the backend and frontend.',
        type: 'select',
        options: ['Laravel', 'Node.js', 'Django'],
        required: true,
      },
    ],
  },
  {
    title: 'Fact-Checking Database',
    description: 'Platform to verify political claims and news stories.',
    category: 'News & Media Publishers',
    tags: ['fact-check', 'politics', 'news', 'database'],
    content:
      'Build a non-partisan Fact-Checking Platform.\n\n**Features:**\n1. **Claim Submission:** Public interface for users to submit statements for review.\n2. **Editorial Dashboard:** Assignment system for editors to distribute claims to analysts.\n3. **Verdict Scale:** Standardized rating system (True, Mostly True, False, Pants on Fire).\n4. **Citations:** Logic to attach and link primary source documents.\n5. **Public API:** Endpoint for news organizations to embed fact-check scores.',
    variables: [
      {
        name: 'framework',
        description: 'The framework used for the web application.',
        type: 'select',
        options: ['Django', 'Rails', 'React'],
        required: true,
      },
    ],
  },
  {
    title: 'Financial News Terminal',
    description: 'Bloomberg-lite terminal with stock tickers and charts.',
    category: 'News & Media Publishers',
    tags: ['finance', 'stocks', 'news', 'terminal'],
    content:
      'Create a high-performance Financial News Terminal for traders.\n\n**Features:**\n1. **Ticker Tape:** Scrolling bar showing real-time prices for major indices.\n2. **Market Charts:** Interactive candlestick charts ({{chartLib}}) for technical analysis.\n3. **Contextual News:** News feed filtered to match the currently selected stock symbol.\n4. **Market Summary:** Overview tables for bonds, commodities, and currencies.\n5. **Economic Calendar:** Schedule of upcoming earnings reports and economic data releases.',
    variables: [
      {
        name: 'chartLib',
        description: 'The library used for rendering financial charts.',
        type: 'select',
        options: ['TradingView Widgets', 'Recharts', 'Highcharts'],
        required: true,
      },
    ],
  },
  {
    title: 'Podcast Directory',
    description: 'Searchable directory of podcasts with reviews and ratings.',
    category: 'News & Media Publishers',
    tags: ['podcast', 'directory', 'audio', 'reviews'],
    content:
      "Build a Podcast Directory to help users discover new audio content.\n\n**Features:**\n1. **Search:** Filter by category, name, or popularity.\n2. **Show Details:** Dynamic pages parsing RSS feeds for episode lists and metadata.\n3. **Embedded Player:** Audio player for listening to episodes directly on the site.\n4. **Community:** User reviews and 5-star rating system.\n5. **Discovery:** 'Top Charts' algorithm based on subscriptions and listens.",
    variables: [
      {
        name: 'techStack',
        description: 'The framework or CMS for the directory.',
        type: 'select',
        options: ['Next.js', 'Vue', 'React'],
        required: true,
      },
    ],
  },
  {
    title: 'Classifieds Section (Craigslist style)',
    description: 'Simple, text-heavy classified ads platform.',
    category: 'News & Media Publishers',
    tags: ['classifieds', 'marketplace', 'ads', 'simple'],
    content:
      'Develop a minimalist Classifieds Platform.\n\n**Style:** Information-dense, text-heavy design prioritizing speed over aesthetics (Craigslist style).\n**Features:**\n1. **Hierarchical Categories:** Drill-down navigation (For Sale > Housing > Jobs > Services).\n2. **Posting Wizard:** Simple form to post title, price, description, and contact email.\n3. **Media:** Basic image gallery support for listings.\n4. **Search:** Text search with filters for location and price.\n5. **Lifecycle:** Automatic expiration and renewal logic for ads.',
    variables: [
      {
        name: 'techStack',
        description: 'The backend language and framework.',
        type: 'select',
        options: ['PHP', 'Python', 'Node.js'],
        required: true,
      },
    ],
  },
  {
    title: 'Media Kit Generator',
    description: 'Tool to create downloadable PDF media kits for brands.',
    category: 'News & Media Publishers',
    tags: ['media-kit', 'pdf', 'marketing', 'brand'],
    content:
      "Create a Media Kit Generator for influencers and companies.\n\n**Features:**\n1. **Data Input:** Fields for brand colors, logo uploads, social media stats, and audience demographics.\n2. **Live Preview:** WYSIWYG editor showing the PDF layout in real-time.\n3. **Export:** Button to generate and download the finalized PDF.\n4. **Templates:** Pre-built layouts for 'Personal Brand/Influencer' vs 'Corporate Company'.",
    variables: [
      {
        name: 'pdfLib',
        description: 'The library used to generate the PDF document.',
        type: 'select',
        options: ['Puppeteer', 'jsPDF', 'html2pdf'],
        required: true,
      },
    ],
  },
  {
    title: 'Municipal Website',
    description:
      'Official government site with service portals and transparency.',
    category: 'Government & Non-Profit',
    tags: ['government', 'portal', 'services', 'accessibility'],
    content:
      'Generate a comprehensive Municipal Website for local government.\n\n**Compliance:** WCAG 2.1 AA Accessibility standards.\n**Features:**\n1. **Leadership:** Mayor and Board message sections with bio.\n2. **311 Center:** Online portal for reporting non-emergency issues (potholes, trash).\n3. **Transparency:** Repository for meeting agendas, minutes, and financial reports (PDFs).\n4. **Utility Portal:** Secure payment gateway for water bills and property taxes.\n5. **Public Safety:** Emergency alert banner for immediate notifications.',
    variables: [
      {
        name: 'cms',
        description:
          'The CMS used for government compliance and content management.',
        type: 'select',
        options: ['Drupal (Gov distro)', 'WordPress (GovPress)', 'Joomla'],
        required: true,
      },
    ],
  },
  {
    title: 'Tax Payment Portal',
    description: 'Secure system for paying property and local taxes.',
    category: 'Government & Non-Profit',
    tags: ['tax', 'payment', 'government', 'security'],
    content:
      'Build a secure Tax Payment System for local residents.\n\n**Features:**\n1. **Property Search:** Look up records by Parcel ID or physical address.\n2. **Ledger View:** Display current outstanding balance and payment history.\n3. **Payment Gateway:** Secure integration ({{paymentGateway}}) for credit cards and ACH.\n4. **Receipts:** Functionality to view and print official payment receipts.\n5. **Mortgage Info:** Display escrow company details for tax payments made by mortgage servicers.',
    variables: [
      {
        name: 'paymentGateway',
        description: 'The payment processor for handling transactions.',
        type: 'select',
        options: ['Official Payments', 'PayPal', 'Stripe Connect'],
        required: true,
      },
    ],
  },
  {
    title: '311 Service Request App',
    description: 'Citizen app to report potholes, graffiti, and streetlights.',
    category: 'Government & Non-Profit',
    tags: ['311', 'civic', 'reporting', 'mobile'],
    content:
      'Create a 311 Reporting App for civic engagement.\n\n**Features:**\n1. **Issue Categorization:** Select issue type (Pothole, Missed Trash, Graffiti, etc.).\n2. **Geolocation:** Auto-detect location or allow user to pin on map.\n3. **Evidence:** Photo upload capability to document the issue.\n4. **Tracking:** Status timeline (Submitted -> In Progress -> Resolved).\n5. **Notifications:** Push alerts to the citizen when the status of their request changes.',
    variables: [
      {
        name: 'platform',
        description: 'The mobile development framework.',
        type: 'select',
        options: ['React Native', 'Flutter', 'Ionic'],
        required: true,
      },
    ],
  },
  {
    title: 'Voting Information Guide',
    description: 'Non-partisan guide to polling places and candidates.',
    category: 'Government & Non-Profit',
    tags: ['voting', 'election', 'civic', 'information'],
    content:
      "Develop a Voting Information Site to boost civic participation.\n\n**Features:**\n1. **Registration Check:** 'Am I Registered?' tool integrated with state voter databases ({{api}}).\n2. **Locator:** Map-based polling place locator with hours and directions.\n3. **Ballot Preview:** Digital sample ballot showing candidates and measures.\n4. **Education:** Voter FAQ and rights information.\n5. **Reminders:** Email or SMS reminders for election day.",
    variables: [
      {
        name: 'api',
        description: 'The API source for voter registration data.',
        type: 'select',
        options: [
          'Google Civic Information',
          'Vote.org API',
          'Manual Data Entry',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'Charity Donation Platform',
    description: 'Crowdfunding site for non-profit organizations.',
    category: 'Government & Non-Profit',
    tags: ['charity', 'donation', 'nonprofit', 'fundraising'],
    content:
      'Build a Charity Donation Platform for non-profits.\n\n**Features:**\n1. **Campaign Pages:** Dedicated pages for specific causes with goals, stories, and updates.\n2. **Recurring Giving:** Options for monthly or weekly donations.\n3. **Payment Integration:** Stripe and PayPal for secure processing.\n4. **Donor Wall:** Public recognition for top contributors.\n5. **Compliance:** Automated generation of tax receipts for donors.',
    variables: [
      {
        name: 'framework',
        description: 'The web framework for the platform.',
        type: 'select',
        options: ['React', 'Vue', 'Django'],
        required: true,
      },
    ],
  },
  {
    title: 'Volunteer Coordination System',
    description: 'Tool to manage signups and schedules for volunteers.',
    category: 'Government & Non-Profit',
    tags: ['volunteer', 'management', 'events', 'coordination'],
    content:
      'Create a Volunteer Manager for non-profit organizations.\n\n**Features:**\n1. **Opportunities Board:** Listings of available roles with dates and skill requirements.\n2. **Onboarding:** Registration form collecting availability and interests.\n3. **Scheduling:** Calendar view showing shift assignments and gaps.\n4. **Attendance:** Check-in/Check-out functionality for logging hours.\n5. **Communication:** Automated email reminders and newsletters for volunteers.',
    variables: [
      {
        name: 'techStack',
        description: 'The backend and frontend technology.',
        type: 'select',
        options: ['Node.js', 'Rails', 'PHP'],
        required: true,
      },
    ],
  },
  {
    title: 'Grant Management System',
    description: 'System for NGOs to apply for and track government grants.',
    category: 'Government & Non-Profit',
    tags: ['grants', 'management', 'government', 'applications'],
    content:
      'Develop a Grant Management System for funding agencies.\n\n**Features:**\n1. **Opportunities:** Public listings of available RFPs (Requests for Proposals).\n2. **Application Wizard:** Multi-step form for uploading PDFs, narratives, and detailed budgets.\n3. **Review Workflow:** Interface for officials to assign reviewers and score applications.\n4. **Tracking:** Status updates (Submitted -> Under Review -> Awarded).\n5. **Reporting:** Module for grantees to submit compliance and progress reports.',
    variables: [
      {
        name: 'stack',
        description: 'The core technology stack.',
        type: 'select',
        options: ['Django', '.NET', 'Salesforce (NPSP)'],
        required: true,
      },
    ],
  },
  {
    title: 'Public Records Search',
    description: 'Portal for citizens to search court and property records.',
    category: 'Government & Non-Profit',
    tags: ['records', 'search', 'government', 'database'],
    content:
      'Build a Public Records Search portal for transparency.\n\n**Features:**\n1. **Search:** Query by Name, Case Number, or Document Type.\n2. **Results:** Paginated list of matching records with metadata.\n3. **Viewer:** Embedded viewer for images and PDF documents.\n4. **Commerce:** Gateway to purchase certified copies of official documents.\n5. **Filtering:** Advanced filters by date range and court jurisdiction.',
    variables: [
      {
        name: 'searchEngine',
        description: 'The technology powering the search functionality.',
        type: 'select',
        options: ['Elasticsearch', 'SQL Like', 'Solr'],
        required: true,
      },
    ],
  },
  {
    title: 'Government Job Board',
    description: 'Civil service job listings and application portal.',
    category: 'Government & Non-Profit',
    tags: ['jobs', 'government', 'hiring', 'portal'],
    content:
      'Create a Government Job Board for civil service recruitment.\n\n**Features:**\n1. **Search:** Filter listings by Department, Location, and Job Type.\n2. **Details:** Comprehensive descriptions including salary ranges and requirements.\n3. **Application:** Online form with resume upload and questionnaire.\n4. **Status Tracker:** Portal for applicants to check their application status.\n5. **Notifications:** Alerts for exam schedules and interview invitations.',
    variables: [
      {
        name: 'cms',
        description: 'The CMS or ATS managing the job listings.',
        type: 'select',
        options: ['NeoGov', 'PowerSchool', 'Custom PHP'],
        required: true,
      },
    ],
  },
  {
    title: 'Census Data Visualization',
    description: 'Interactive dashboard exploring demographic data.',
    category: 'Government & Non-Profit',
    tags: ['census', 'data', 'visualization', 'maps'],
    content:
      'Build a Census Data Visualization tool for analysts.\n\n**Data Source:** Public Census API.\n**Features:**\n1. **Choropleth Maps:** Interactive maps color-coded by population density or demographics.\n2. **Filters:** Filter data by year, age group, and ethnicity.\n3. **Charts:** Bar and line charts showing trends over time.\n4. **Export:** Download raw data in CSV format.\n5. **Embed:** Generate code to embed charts on external sites.',
    variables: [
      {
        name: 'vizLib',
        description: 'The library used for rendering data visualizations.',
        type: 'select',
        options: ['D3.js', 'Leaflet', 'Mapbox', 'Plotly'],
        required: true,
      },
    ],
  },
  {
    title: 'Disaster Relief Coordination',
    description: 'Map-based tool for managing relief efforts during crises.',
    category: 'Government & Non-Profit',
    tags: ['disaster', 'relief', 'map', 'emergency'],
    content:
      'Develop a Disaster Relief Coordination App for emergency management.\n\n**Features:**\n1. **Incident Map:** Geospatial view of reported incidents (Floods, Fires, Power Outages).\n2. **Shelters:** Status and capacity view of emergency shelters.\n3. **Resource Log:** Request list for essential supplies (Water, Food, Medications).\n4. **Mobilization:** Map view to coordinate volunteer deployment.\n5. **Resilience:** Offline mode capability for areas with poor connectivity.',
    variables: [
      {
        name: 'mapTech',
        description: 'The mapping technology provider.',
        type: 'select',
        options: ['Mapbox', 'ArcGIS', 'Google Maps'],
        required: true,
      },
    ],
  },
  {
    title: 'Library Catalog System',
    description: 'Online Public Access Catalog (OPAC) for libraries.',
    category: 'Government & Non-Profit',
    tags: ['library', 'catalog', 'books', 'search'],
    content:
      "Generate a Library Catalog (OPAC) for public or academic libraries.\n\n**Features:**\n1. **Search:** Query by ISBN, Title, Author, or Subject.\n2. **Status:** Real-time availability (Checked Out / Available / On Hold).\n3. **Patron Account:** 'My Account' section to renew books and manage holds.\n4. **New Arrivals:** Feed showcasing recent additions to the collection.\n5. **Integration:** Support for importing/exporting records in {{marcFormat}} standard.",
    variables: [
      {
        name: 'marcFormat',
        description: 'The standard metadata format for bibliographic data.',
        type: 'select',
        options: ['MARC21', 'UNIMARC'],
        required: false,
      },
    ],
  },
  {
    title: 'Museum Virtual Tour',
    description: '360-degree virtual tour of exhibits.',
    category: 'Government & Non-Profit',
    tags: ['museum', 'vr', 'tour', 'culture'],
    content:
      'Create a Virtual Tour for a museum or gallery.\n\n**Tech:** {{tourLib}} or Panorama stitching.\n**Features:**\n1. **360 Rooms:** Immersive view of exhibition rooms.\n2. **Hotspots:** Clickable points on items to reveal detailed information popups.\n3. **Audio Guide:** Narration tracks that play automatically when entering specific rooms.\n4. **Navigation:** Floor plan minimap to help users orient themselves.',
    variables: [
      {
        name: 'tourLib',
        description: 'The library used to render the 360 panorama.',
        type: 'select',
        options: ['Marzipano', 'Pannellum', 'Three.js'],
        required: true,
      },
    ],
  },
  {
    title: 'Park Reservation System',
    description:
      'Booking platform for campsites, pavilions, and sports fields.',
    category: 'Government & Non-Profit',
    tags: ['parks', 'booking', 'reservation', 'recreation'],
    content:
      'Build a Park Reservation System for a parks department.\n\n**Features:**\n1. **Map Interface:** Interactive map of all parks and facilities.\n2. **Availability:** Grid calendar showing open slots for reservations.\n3. **Booking Wizard:** Step-by-step flow to select dates, facility type, and permits.\n4. **Payments:** Processing of reservation fees via credit card.\n5. **Permits:** Generation of digital QR codes for park rangers to scan.',
    variables: [
      {
        name: 'framework',
        description: 'The web framework for the application.',
        type: 'select',
        options: ['React', 'Angular', 'Django'],
        required: true,
      },
    ],
  },
  {
    title: 'Transparency/Open Data Portal',
    description: 'Repository for government datasets and financial reports.',
    category: 'Government & Non-Profit',
    tags: ['opendata', 'transparency', 'datasets', 'government'],
    content:
      'Create an Open Data Portal for government transparency.\n\n**Features:**\n1. **Catalog:** Searchable list of datasets with titles, formats, and update dates.\n2. **API Docs:** Documentation for developers to access data via APIs.\n3. **Visualizations:** Gallery of pre-made charts and graphs derived from the data.\n4. **Requests:** Portal for citizens to request datasets that are missing.\n5. **Downloads:** Direct links to download data in CSV or JSON formats.',
    variables: [
      {
        name: 'cms',
        description: 'The platform specialized in open data management.',
        type: 'select',
        options: ['CKAN', 'DKAN', 'Socrata'],
        required: true,
      },
    ],
  },
  {
    title: 'Custom Google Search Wrapper',
    description:
      'Branded search engine using Google Programmable Search Engine.',
    category: 'Search Engines & Portals',
    tags: ['search', 'google', 'cse', 'portal'],
    content:
      "Build a Custom Search Engine (CSE) for a specific niche.\n\n**Implementation:** Google Programmable Search Engine (CSE) API.\n**Features:**\n1. **Branding:** Custom branded header and footer matching the organization.\n2. **Hero:** Large search bar prominently displayed on the landing page.\n3. **Tabs:** Tabbed results for Web, Images, and News content.\n4. **Safety:** Toggle for 'Safe Search' strict mode.\n5. **Ads:** Management interface for controlling ad placement and revenue.",
    variables: [
      {
        name: 'framework',
        description: 'The framework used for the wrapper UI.',
        type: 'select',
        options: ['HTML/CSS', 'Next.js', 'PHP'],
        required: true,
      },
    ],
  },
  {
    title: 'Vertical Search Engine (e.g., for Medical)',
    description: 'Specialized search for a specific industry.',
    category: 'Search Engines & Portals',
    tags: ['search', 'vertical', 'niche', 'indexing'],
    content:
      'Develop a Vertical Search Engine for {{industry}}.\n\n**Features:**\n1. **Crawler:** Logic to crawl and scrape content from whitelisted domains.\n2. **Indexing:** Full-text search using {{indexer}}.\n3. **Filters:** Custom search filters specific to the industry (e.g., Dosage for Medical, Price for Retail).\n4. **Autocomplete:** Intelligent suggestion system as users type queries.',
    variables: [
      {
        name: 'industry',
        description: 'The specific industry the search engine targets.',
        type: 'select',
        options: ['Medical', 'Legal', 'Academic', 'Recipes'],
        required: true,
      },
      {
        name: 'indexer',
        description: 'The search and indexing backend service.',
        type: 'select',
        options: ['Elasticsearch', 'Algolia', 'MeiliSearch'],
        required: true,
      },
    ],
  },
  {
    title: 'Directory Listing (Yellow Pages)',
    description: 'Business directory with categories, maps, and reviews.',
    category: 'Search Engines & Portals',
    tags: ['directory', 'business', 'listing', 'local'],
    content:
      "Build a Business Directory (Yellow Pages).\n\n**Features:**\n1. **Drill-Down:** Category navigation tree (Restaurants -> Italian -> Pizza).\n2. **Business Pages:** Detail view with hours, photos, reviews, and map.\n3. **Claims:** 'Claim this Business' flow for business owners to manage their listing.\n4. **Monetization:** Paid 'Featured' listings that appear at the top.\n5. **Local:** 'Near Me' search using geolocation.",
    variables: [
      {
        name: 'techStack',
        description: 'The technology stack for the directory.',
        type: 'select',
        options: ['WordPress (Directory Theme)', 'Joomla', 'Custom (MERN)'],
        required: true,
      },
    ],
  },
  {
    title: 'Coupon Aggregator',
    description: 'Site to find and share discount codes.',
    category: 'Search Engines & Portals',
    tags: ['coupons', 'deals', 'affiliate', 'shopping'],
    content:
      "Create a Coupon Aggregator for savvy shoppers.\n\n**Features:**\n1. **Store Index:** A-Z index of supported online stores.\n2. **Listing:** List of coupons distinguishing between codes and exclusive deals.\n3. **Reveal:** 'Show Code' button that reveals the code and opens the store site.\n4. **Voting:** Community voting system (Works / Doesn't Work) to validate codes.\n5. **Tracking:** Expiration date tracking and removal of dead links.",
    variables: [
      {
        name: 'framework',
        description: 'The framework used for the web app.',
        type: 'select',
        options: ['PHP', 'Django', 'React'],
        required: true,
      },
    ],
  },
  {
    title: 'Job Aggregator (Indeed style)',
    description: 'Scraping or API-based job board aggregator.',
    category: 'Search Engines & Portals',
    tags: ['jobs', 'aggregator', 'search', 'scraping'],
    content:
      'Build a Job Aggregator (Indeed style).\n\n**Backend:**\n1. **Ingest:** Scrape jobs from company career pages or ingest via APIs.\n2. **Normalize:** Standardize data into a unified schema.\n\n**Frontend:**\n1. **Search:** Search by Keyword (What) and Location (Where).\n2. **Apply:** Redirection to the original posting for Easy Apply.\n3. **Save:** Functionality to save jobs to a list for later.',
    variables: [
      {
        name: 'scraper',
        description: 'The tool used to gather job listings from the web.',
        type: 'select',
        options: ['Puppeteer', 'Selenium', 'API Integration'],
        required: true,
      },
    ],
  },
  {
    title: 'Real Estate Listing Portal',
    description: 'Zillow-style property search with map integration.',
    category: 'Search Engines & Portals',
    tags: ['realestate', 'property', 'search', 'map'],
    content:
      "Develop a Real Estate Portal (Zillow style).\n\n**Features:**\n1. **Split View:** Map and List view synchronized for easy browsing.\n2. **Filters:** Search by Price, Beds, Baths, Square Footage, and Lot Size.\n3. **Detail Page:** Photo gallery, agent contact form, and mortgage calculator.\n4. **Favorites:** 'Save Home' functionality to track interesting properties.\n5. **Scheduling:** Open House calendar and scheduler.",
    variables: [
      {
        name: 'mapProvider',
        description: 'The mapping provider for the property locations.',
        type: 'select',
        options: ['Mapbox', 'Google Maps', 'Leaflet'],
        required: true,
      },
    ],
  },
  {
    title: 'Travel Meta-Search (Kayak style)',
    description: 'Search engine comparing prices from multiple travel sites.',
    category: 'Search Engines & Portals',
    tags: ['travel', 'meta-search', 'flights', 'hotels'],
    content:
      "Create a Travel Meta-Search Engine (Kayak style).\n\n**APIs:** Amadeus, Skyscanner, Sabre.\n**Features:**\n1. **Flights:** Search for Round trip, One way, or Multi-city flights.\n2. **Hotels:** Hotel search and availability checking.\n3. **Alerts:** Price alert subscription for specific routes.\n4. **Flexibility:** 'Flexible dates' calendar view to find the cheapest travel days.",
    variables: [
      {
        name: 'apiProvider',
        description: 'The travel API provider for data.',
        type: 'select',
        options: ['Amadeus', 'Skyscanner API', 'Duffel'],
        required: true,
      },
    ],
  },
  {
    title: 'Price Comparison Engine',
    description: 'Compare prices for electronics or goods across retailers.',
    category: 'Search Engines & Portals',
    tags: ['price', 'compare', 'shopping', 'products'],
    content:
      'Build a Price Comparison Engine.\n\n**Backend:** Scrape or ingest product prices from various retailers.\n**Features:**\n1. **Search:** Look up products by model name or SKU.\n2. **History:** Price History Chart ({{chartLib}}) showing trends over time.\n3. **Listings:** List of retailers sorted by lowest price first.\n4. **Alerts:** Set Price Alerts to receive an email when the price drops.',
    variables: [
      {
        name: 'chartLib',
        description: 'The charting library for price history.',
        type: 'select',
        options: ['Chart.js', 'Recharts', 'Highcharts'],
        required: true,
      },
    ],
  },
  {
    title: 'File Search Engine',
    description: 'Search for PDFs, DOCs, and other public files.',
    category: 'Search Engines & Portals',
    tags: ['files', 'search', 'documents', 'indexing'],
    content:
      'Create a File Search Engine.\n\n**Features:**\n1. **Search:** Query by Filename or Content Text (using OCR for PDFs).\n2. **Filter:** Filter results by File Type (PDF, DOCX, PPTX).\n3. **Preview:** Preview documents in browser using Google Docs Viewer or {{pdfLib}}.\n4. **Download:** Direct download button for files.',
    variables: [
      {
        name: 'indexer',
        description: 'The indexing and search engine backend.',
        type: 'select',
        options: ['Elasticsearch', 'Solr', 'Apache Tika'],
        required: true,
      },
    ],
  },
  {
    title: 'Recipe Search Engine',
    description: 'Find recipes based on ingredients you have.',
    category: 'Search Engines & Portals',
    tags: ['recipe', 'ingredients', 'search', 'cooking'],
    content:
      "Build a Recipe Search Engine.\n\n**Logic:** Reverse search (Input Ingredients -> Output Recipes).\n**Features:**\n1. **Input:** Comma-separated list of ingredients (e.g., 'Onion, Garlic, Chicken').\n2. **Output:** List of matching recipes ranked by ingredient match.\n3. **Exclude:** Filter to exclude ingredients (Allergies).\n4. **Nutrition:** Display nutritional information per serving.",
    variables: [
      {
        name: 'dataSource',
        description: 'The API providing recipe data.',
        type: 'select',
        options: ['Spoonacular API', 'Edamam', 'TheMealDB'],
        required: true,
      },
    ],
  },
  {
    title: 'Academic Paper Search',
    description: 'Google Scholar alternative for research papers.',
    category: 'Search Engines & Portals',
    tags: ['academic', 'research', 'papers', 'search'],
    content:
      "Develop an Academic Paper Search (Google Scholar).\n\n**Features:**\n1. **Search:** Query by Title, Author, DOI, or Keywords.\n2. **Metrics:** Display citation count and h-index for papers.\n3. **Related:** 'Related Articles' section using similarity algorithms.\n4. **Access:** Links to Open Access PDFs or publisher paywalls.\n5. **Cite:** Export citation in APA, MLA, Chicago, and BibTeX formats.",
    variables: [
      {
        name: 'api',
        description: 'The academic data provider API.',
        type: 'select',
        options: ['Semantic Scholar API', 'OpenAlex', 'CrossRef'],
        required: true,
      },
    ],
  },
  {
    title: 'Product Review Aggregator',
    description: 'Consolidate reviews from Amazon, Yelp, etc., into one score.',
    category: 'Search Engines & Portals',
    tags: ['reviews', 'products', 'aggregator', 'ratings'],
    content:
      'Create a Review Aggregator.\n\n**Features:**\n1. **Search:** Find product by name or UPC.\n2. **Fetch:** Aggregate reviews from multiple sources ({{sources}}).\n3. **Score:** Calculate a weighted average rating from all sources.\n4. **Sentiment:** Display positive and negative word cloud.\n5. **Source:** Link back to original reviews for full context.',
    variables: [
      {
        name: 'sources',
        description: 'The external sites to fetch reviews from.',
        type: 'multiselect',
        options: ['Amazon', 'BestBuy', 'Yelp', 'Trustpilot'],
        required: true,
      },
    ],
  },
  {
    title: 'Browser Start Page',
    description: 'New Tab page with time, weather, bookmarks, and search.',
    category: 'Search Engines & Portals',
    tags: ['start-page', 'dashboard', 'widgets', 'new-tab'],
    content:
      'Build a customizable Browser Start Page.\n\n**Features:**\n1. **Clock:** Large digital clock and current date display.\n2. **Greeting:** Dynamic greeting based on time of day (Good Morning/Evening).\n3. **Weather:** Current conditions widget ({{weatherApi}}).\n4. **Search:** Omnibox for Google, DuckDuckGo, or Bing.\n5. **Speed Dial:** Customizable grid of frequently used bookmarks.',
    variables: [
      {
        name: 'weatherApi',
        description: 'The weather data provider.',
        type: 'select',
        options: ['OpenWeatherMap', 'WeatherAPI', 'WTW'],
        required: false,
      },
    ],
  },

  {
    title: 'Neobank Interface',
    description:
      'Modern mobile-first banking UI with accounts, transfers, and analytics.',
    category: 'Financial Services & Crypto',
    tags: ['banking', 'fintech', 'mobile', 'dashboard'],
    content:
      'Design and build a Neobank Dashboard.\n\n**Core Features:**\n1. **Accounts:** Overview of Current Balance and Savings goals.\n2. **Transactions:** List of recent transactions with categorization (Merchant, Category).\n3. **Transfers:** P2P Money Transfer using Email or Phone lookup.\n4. **Cards:** Card management features (Freeze card, Set limits, Reset PIN).\n5. **Analytics:** Spending analysis visualized via charts ({{chartLib}}).\n\n**UI:** Mobile-first responsive design with sleek, modern aesthetics.',
    variables: [
      {
        name: 'framework',
        description: 'The mobile or web framework used.',
        type: 'select',
        options: ['React Native', 'Flutter', 'React (Web)'],
        required: true,
      },
      {
        name: 'chartLib',
        description: 'The library for rendering financial charts.',
        type: 'select',
        options: ['Victory Native', 'Recharts', 'Chart.js'],
        required: true,
      },
    ],
  },
  {
    title: 'Personal Finance Dashboard',
    description:
      'Mint-style aggregator for bank accounts, budgets, and net worth.',
    category: 'Financial Services & Crypto',
    tags: ['finance', 'budget', 'aggregation', 'charts'],
    content:
      "Create a Personal Finance Dashboard (Mint style).\n\n**Integrations:** Use {{bankingApi}} for account syncing (Mock data accepted).\n**Features:**\n1. **Net Worth:** Line chart showing total asset and liability trends.\n2. **Budgets:** Comparison of Budgeted vs Actual spending per category.\n3. **Bills:** Calendar view of upcoming bill due dates.\n4. **Goals:** Progress tracking for savings goals (e.g., 'Buy House').\n5. **Cash Flow:** Visualization of monthly income vs expenses.",
    variables: [
      {
        name: 'bankingApi',
        description: 'The API used to fetch financial data.',
        type: 'select',
        options: ['Plaid API', 'Salt Edge', 'Yodlee', 'Mock Data'],
        required: true,
      },
    ],
  },
  {
    title: 'Crypto Exchange',
    description:
      'Full cryptocurrency exchange with order books and trading engine.',
    category: 'Financial Services & Crypto',
    tags: ['crypto', 'exchange', 'trading', 'orderbook'],
    content:
      'Build a Crypto Exchange MVP.\n\n**Core:**\n1. **Charts:** Trading View with candlestick chart ({{chartingLib}}).\n2. **Order Book:** Live display of Bids and Asks.\n3. **Trading:** Forms for placing Limit and Market orders.\n4. **Wallet:** User Wallet balance simulation (Deposit/Withdraw).\n5. **History:** List of recent trade executions.',
    variables: [
      {
        name: 'chartingLib',
        description: 'The library used for financial charting.',
        type: 'select',
        options: ['TradingView Lightweight Charts', 'ApexCharts', 'Highstock'],
        required: true,
      },
      {
        name: 'backend',
        description: 'The backend language for the trading engine.',
        type: 'select',
        options: ['Node.js', 'Go', 'Python'],
        required: true,
      },
    ],
  },
  {
    title: 'Crypto Wallet',
    description: 'Non-custodial wallet for sending/receiving crypto (ETH/BTC).',
    category: 'Financial Services & Crypto',
    tags: ['web3', 'wallet', 'blockchain', 'security'],
    content:
      'Develop a Non-Custodial Crypto Wallet.\n\n**Tech:** {{web3Lib}}.\n**Features:**\n1. **Setup:** Generate or Import Wallet via Seed Phrase.\n2. **Balance:** Check native token balance for {{chain}}.\n3. **Send:** Create and sign transactions with private key.\n4. **Explorer:** Transaction history linked to block explorer.\n5. **Scan:** QR Code scanner for receiving addresses.',
    variables: [
      {
        name: 'web3Lib',
        description: 'The library for blockchain interaction.',
        type: 'select',
        options: ['Ethers.js', 'Web3.js', 'Viem'],
        required: true,
      },
      {
        name: 'chain',
        description: 'The blockchain network to support.',
        type: 'select',
        options: ['Ethereum', 'Bitcoin (Simplified)', 'Polygon'],
        required: true,
      },
    ],
  },
  {
    title: 'Stock Trading Simulator',
    description:
      'Paper trading platform with virtual currency and real-time market data.',
    category: 'Financial Services & Crypto',
    tags: ['stocks', 'trading', 'simulation', 'paper-trading'],
    content:
      'Create a Stock Trading Simulator.\n\n**Data Source:** {{marketDataProvider}}.\n**Features:**\n1. **Trading:** Buy/Sell interface supporting limit orders.\n2. **Portfolio:** Virtual portfolio showing Cash and Holdings value.\n3. **P&L:** Real-time Profit & Loss tracking.\n4. **Leaderboard:** Ranking of top traders by P&L.\n5. **Screener:** Stock screener to find equities.',
    variables: [
      {
        name: 'marketDataProvider',
        description: 'The API providing stock data and quotes.',
        type: 'select',
        options: ['Alpha Vantage', 'IEX Cloud', 'Polygon.io', 'Mock'],
        required: true,
      },
    ],
  },
  {
    title: 'Forex Trading Platform',
    description:
      'Currency pair trading dashboard with leverage and pip calculations.',
    category: 'Financial Services & Crypto',
    tags: ['forex', 'currency', 'trading', 'leverage'],
    content:
      'Build a Forex Trading Platform.\n\n**Features:**\n1. **Pairs:** Currency pair selector (EUR/USD, GBP/JPY, etc.).\n2. **Spread:** Live spread display for selected pairs.\n3. **Position:** Position sizing calculator for risk management.\n4. **Execution:** One-click execution for Long and Short trades.\n5. **Risk:** Margin call logic simulation.',
    variables: [
      {
        name: 'techStack',
        description: 'The full stack for the trading platform.',
        type: 'select',
        options: ['Node.js + React', 'Python + Django', 'C# .NET'],
        required: true,
      },
    ],
  },
  {
    title: 'Invoicing/Accounting SaaS',
    description:
      'Software for businesses to create invoices and track expenses.',
    category: 'Financial Services & Crypto',
    tags: ['saas', 'accounting', 'invoicing', 'reports'],
    content:
      'Develop an Accounting SaaS.\n\n**Features:**\n1. **Invoices:** Builder for creating invoices with line items and taxes.\n2. **Expenses:** Logging and categorization of business expenses.\n3. **Reports:** Automated Profit & Loss report generation.\n4. **CRM Lite:** Client management for storing contact details.\n5. **Multi-Currency:** Support for invoices in different currencies.',
    variables: [
      {
        name: 'techStack',
        description: 'The framework for the SaaS application.',
        type: 'select',
        options: ['Rails', 'Django', 'Laravel'],
        required: true,
      },
    ],
  },
  {
    title: 'Expense Tracker',
    description: 'Simple app to log daily expenses and visualize spending.',
    category: 'Financial Services & Crypto',
    tags: ['expense', 'tracker', 'mobile', 'finance'],
    content:
      'Create a mobile Expense Tracker.\n\n**Features:**\n1. **Logging:** Quick add transaction modal (Amount, Category, Note).\n2. **Budget:** Monthly budget progress bars.\n3. **Visualization:** Pie chart of spending by category.\n4. **Export:** Export data to CSV for external analysis.\n5. **Recurring:** Notifications for recurring expense due dates.',
    variables: [
      {
        name: 'framework',
        description: 'The mobile app development framework.',
        type: 'select',
        options: ['React Native', 'Flutter', 'Swift'],
        required: true,
      },
    ],
  },
  {
    title: 'Tax Calculator',
    description: 'Interactive tool to calculate tax liability based on income.',
    category: 'Financial Services & Crypto',
    tags: ['tax', 'calculator', 'finance', 'forms'],
    content:
      'Build a Tax Calculator.\n\n**Features:**\n1. **Input:** Form for Income, Deductions, and Filing Status.\n2. **Logic:** Progressive tax bracket calculation logic.\n3. **Rates:** Display of Effective vs Marginal tax rates.\n4. **Print:** Generate a printable summary PDF.',
    variables: [
      {
        name: 'jurisdiction',
        description: 'The tax jurisdiction for calculations.',
        type: 'select',
        options: ['USA (Federal)', 'UK (HMRC)', 'Canada (CRA)'],
        required: true,
      },
    ],
  },
  {
    title: 'Crowdfunding Platform',
    description: 'Kickstarter clone for creative projects.',
    category: 'Financial Services & Crypto',
    tags: ['crowdfunding', 'backers', 'projects', 'payments'],
    content:
      "Develop a Crowdfunding Site (Kickstarter).\n\n**Features:**\n1. **Campaigns:** Creation of campaigns with Video, Story, and Funding Goal.\n2. **Tiers:** Backer tier system for different pledge amounts.\n3. **Logic:** 'All or Nothing' vs 'Keep what you raise' funding models.\n4. **Updates:** Tab for creators to post project updates.\n5. **Payments:** Stripe Connect integration for processing pledges.",
    variables: [
      {
        name: 'techStack',
        description: 'The full stack for the platform.',
        type: 'select',
        options: ['React + Node', 'Django', 'Rails'],
        required: true,
      },
    ],
  },
  {
    title: 'P2P Lending Platform',
    description: 'Platform connecting borrowers with individual lenders.',
    category: 'Financial Services & Crypto',
    tags: ['lending', 'p2p', 'loans', 'risk'],
    content:
      'Build a P2P Lending Platform.\n\n**Features:**\n1. **Borrowers:** Profile showing Credit Score and Income.\n2. **Listings:** Loan listing request (Amount, Interest, Duration).\n3. **Lenders:** Dashboard to invest in fractions of loans.\n4. **Repayment:** Automated repayment schedule generator.\n5. **Auto-Invest:** Tool to automatically fund loans matching criteria.',
    variables: [
      {
        name: 'techStack',
        description: 'The backend and frontend technology.',
        type: 'select',
        options: ['Laravel', 'Django', 'Node.js'],
        required: true,
      },
    ],
  },
  {
    title: 'Insurance Quote Generator',
    description: 'Tool to generate insurance quotes based on user input.',
    category: 'Financial Services & Crypto',
    tags: ['insurance', 'quote', 'forms', 'calculation'],
    content:
      'Create an Insurance Quote Generator.\n\n**Type:** {{insuranceType}}.\n**Features:**\n1. **Wizard:** Multi-step form wizard for data collection.\n2. **Risk:** Risk assessment logic based on Age, Location, and History.\n3. **Engine:** Premium calculation engine.\n4. **Compare:** Comparison view of Basic vs Premium plans.',
    variables: [
      {
        name: 'insuranceType',
        description: 'The specific type of insurance to quote.',
        type: 'select',
        options: ['Auto', 'Home', 'Life', 'Health'],
        required: true,
      },
    ],
  },
  {
    title: 'Credit Score Checker',
    description: 'Tool to estimate credit score and offer improvement tips.',
    category: 'Financial Services & Crypto',
    tags: ['credit', 'score', 'finance', 'education'],
    content:
      "Build a Credit Score Estimator.\n\n**Features:**\n1. **Questionnaire:** Detailed questions about credit habits.\n2. **Algorithm:** Score estimation using VantageScore 3.0 model logic.\n3. **Factors:** Breakdown of factors affecting score (Positive/Negative).\n4. **Simulator:** 'What if' simulator to see impact of paying off card.",
    variables: [
      {
        name: 'techStack',
        description: 'The framework for the web tool.',
        type: 'select',
        options: ['React', 'Vue', 'Python (Streamlit)'],
        required: true,
      },
    ],
  },
  {
    title: 'Wealth Management Portal',
    description: 'High-net-worth dashboard for asset allocation.',
    category: 'Financial Services & Crypto',
    tags: ['wealth', 'investments', 'portfolio', 'high-net-worth'],
    content:
      'Develop a Wealth Management Portal.\n\n**Features:**\n1. **Allocation:** Asset Allocation Doughnut Chart.\n2. **Horizon:** Analysis based on investment time horizon.\n3. **Performance:** Performance vs Benchmark (S&P 500) comparison.\n4. **Vault:** Document Vault for Wills and Trusts.\n5. **Secure:** Secure messaging channel to financial advisor.',
    variables: [
      {
        name: 'techStack',
        description: 'The enterprise-grade technology stack.',
        type: 'select',
        options: ['Angular', 'React', '.NET MVC'],
        required: true,
      },
    ],
  },
  {
    title: 'Payroll Management System',
    description: 'System to process employee salaries, taxes, and deductions.',
    category: 'Financial Services & Crypto',
    tags: ['payroll', 'hr', 'finance', 'taxes'],
    content:
      'Build a Payroll System.\n\n**Features:**\n1. **Profile:** Employee profile with Salary and Tax code.\n2. **Run:** Process Payroll run (Calculate Gross, Tax, Net).\n3. **Slip:** Generate PaySlip (PDF).\n4. **Deposit:** Generate Direct Deposit file (NACHA format).\n5. **PTO:** PTO accrual and leave tracking.',
    variables: [
      {
        name: 'techStack',
        description: 'The backend framework for payroll logic.',
        type: 'select',
        options: ['PHP', 'Ruby on Rails', 'Java'],
        required: true,
      },
    ],
  },
  {
    title: 'Project Management Tool (Jira clone)',
    description: 'Agile board and backlog management for software teams.',
    category: 'Technology & SaaS',
    tags: ['project-management', 'agile', 'kanban', 'scrum'],
    content:
      'Create a Project Management Tool (Jira).\n\n**Features:**\n1. **Board:** Kanban Board with columns (Backlog, To Do, In Progress, Done).\n2. **Drag & Drop:** Drag and drop tickets using {{dndLib}}.\n3. **Sprints:** Sprint creation and management.\n4. **Tickets:** Issue detail modal with comments and attachments.\n5. **Theme:** Dark mode support.',
    variables: [
      {
        name: 'dndLib',
        description: 'The library handling drag and drop interactions.',
        type: 'select',
        options: ['dnd-kit', 'react-beautiful-dnd', 'react-grid-layout'],
        required: true,
      },
      {
        name: 'framework',
        description: 'The frontend framework.',
        type: 'select',
        options: ['React', 'Vue', 'Angular'],
        required: true,
      },
    ],
  },
  {
    title: 'CRM (Salesforce clone)',
    description: 'Customer relationship management for sales teams.',
    category: 'Technology & SaaS',
    tags: ['crm', 'sales', 'leads', 'contacts'],
    content:
      'Build a CRM (Salesforce).\n\n**Features:**\n1. **Pipeline:** Pipeline view (Leads, Prospecting, Proposal, Closed Won).\n2. **Contacts:** Contact detail view with Activity log and Emails.\n3. **Tasks:** Add Task, Note, or Event to a Lead.\n4. **Search:** Search and Filter leads.\n5. **Forecast:** Dashboard with revenue forecast.',
    variables: [
      {
        name: 'techStack',
        description: 'The full stack for the CRM.',
        type: 'select',
        options: ['ASP.NET Core MVC', 'Django', 'Laravel', 'React + Node'],
        required: true,
      },
    ],
  },
  {
    title: 'Helpdesk/Support Desk (Zendesk clone)',
    description: 'Ticketing system for managing customer support requests.',
    category: 'Technology & SaaS',
    tags: ['support', 'tickets', 'helpdesk', 'sla'],
    content:
      'Develop a Helpdesk System (Zendesk).\n\n**Features:**\n1. **List:** Ticket list with status (Open, Pending, Solved).\n2. **Agent:** Agent dashboard (My tickets, Unassigned).\n3. **Customer:** Customer view showing Ticket history.\n4. **Macros:** Canned responses for common issues.\n5. **SLA:** SLA Timer showing time to first response.',
    variables: [
      {
        name: 'techStack',
        description: 'The framework for the support platform.',
        type: 'select',
        options: ['Rails (Helpy)', 'Django', 'PHP (osTicket alternative)'],
        required: true,
      },
    ],
  },
  {
    title: 'Live Chat Widget',
    description: 'Embeddable chat widget for websites.',
    category: 'Technology & SaaS',
    tags: ['chat', 'widget', 'support', 'javascript'],
    content:
      'Create a Live Chat Widget.\n\n**Tech:** Vanilla JS snippet (injectable).\n**Features:**\n1. **UI:** Chat bubble icon that expands into chat window.\n2. **History:** Conversation history across sessions.\n3. **Status:** Agent availability status indicator.\n4. **Files:** File upload support for users.\n5. **Proactive:** Trigger proactive messages after 10s on page.',
    variables: [
      {
        name: 'backend',
        description: 'The realtime backend for chat messages.',
        type: 'select',
        options: ['Socket.io', 'Pusher', 'Firebase'],
        required: true,
      },
    ],
  },
  {
    title: 'Email Marketing Platform',
    description: 'Tool to design, send, and track email campaigns.',
    category: 'Technology & SaaS',
    tags: ['email', 'marketing', 'campaigns', 'automation'],
    content:
      'Build an Email Marketing Platform.\n\n**Features:**\n1. **Builder:** Drag and drop email builder ({{builderLib}}).\n2. **Lists:** Contact list management and Segments.\n3. **Schedule:** Campaign scheduler.\n4. **Analytics:** Analytics (Open rate, Click rate).\n5. **Automation:** Automation workflows (Drip series).',
    variables: [
      {
        name: 'builderLib',
        description: 'The library for the visual email editor.',
        type: 'select',
        options: ['GrapesJS', 'Unlayer', 'Custom (React-Draft)'],
        required: true,
      },
    ],
  },
  {
    title: 'Analytics Dashboard (Google Analytics style)',
    description: 'Web traffic visualization tool.',
    category: 'Technology & SaaS',
    tags: ['analytics', 'traffic', 'charts', 'data'],
    content:
      'Create an Analytics Dashboard.\n\n**Data:** Mock JSON of pageviews/sessions.\n**Features:**\n1. **Realtime:** Real-time active users counter.\n2. **Trends:** Line chart of users over time.\n3. **Sources:** Traffic sources table (Direct, Social, Organic).\n4. **Geo:** Geo map of users ({{mapLib}}).',
    variables: [
      {
        name: 'mapLib',
        description: 'The library for map visualization.',
        type: 'select',
        options: ['Google Charts Geo', 'React Simple Maps', 'DataMaps'],
        required: true,
      },
    ],
  },
  {
    title: 'A/B Testing Tool',
    description: 'Platform to run split tests on web pages.',
    category: 'Technology & SaaS',
    tags: ['ab-testing', 'optimization', 'stats', 'marketing'],
    content:
      'Develop an A/B Testing Tool.\n\n**Features:**\n1. **Experiment:** Create Experiment (Name, Variants A/B).\n2. **Script:** Script injection (JavaScript snippet for client site).\n3. **Results:** Results dashboard (Conversion rate, Statistical significance).\n4. **Winner:** Winner declaration logic.',
    variables: [
      {
        name: 'backend',
        description: 'The backend language for statistical analysis.',
        type: 'select',
        options: ['Node.js', 'Python', 'Go'],
        required: true,
      },
    ],
  },
  {
    title: 'SEO Audit Tool',
    description: 'Tool to scan websites and suggest SEO improvements.',
    category: 'Technology & SaaS',
    tags: ['seo', 'audit', 'scraping', 'marketing'],
    content:
      'Build an SEO Audit Tool.\n\n**Features:**\n1. **Crawl:** Input URL -> Crawl site (using {{crawler}}).\n2. **Check:** Check Meta tags, H1 tags, Image Alt text.\n3. **Speed:** Page speed score (via Lighthouse API).\n4. **Report:** Generate PDF report.',
    variables: [
      {
        name: 'crawler',
        description: 'The headless browser for crawling.',
        type: 'select',
        options: ['Puppeteer', 'Selenium', 'Cheerio'],
        required: true,
      },
    ],
  },
  {
    title: 'Website Builder (Wix clone)',
    description: 'Drag-and-drop website creation tool.',
    category: 'Technology & SaaS',
    tags: ['builder', 'drag-drop', 'cms', 'saas'],
    content:
      'Create a Website Builder (Wix).\n\n**Editor Tech:** {{editorLib}}.\n**Features:**\n1. **Canvas:** Canvas area (Drop sections: Header, Hero, Gallery).\n2. **Elements:** Sidebar with elements (Text, Image, Button).\n3. **Inspect:** Property inspector (Change font, color, padding).\n4. **Preview:** Preview/Publish mode.',
    variables: [
      {
        name: 'editorLib',
        description: 'The library for the drag-and-drop editor.',
        type: 'select',
        options: ['GrapesJS', 'Craft.js', 'GrapesJS React'],
        required: true,
      },
    ],
  },
  {
    title: 'App Builder (Bubble clone)',
    description: 'No-code tool to build web apps visually.',
    category: 'Technology & SaaS',
    tags: ['nocode', 'appbuilder', 'logic', 'database'],
    content:
      'Develop a No-Code App Builder (Bubble).\n\n**Core:**\n1. **DB:** Database designer (Create Table, Fields).\n2. **UI:** UI Designer (Drag elements, bind to data).\n3. **Logic:** Workflow tab (When Button Click -> Create Record).\n4. **Deploy:** Preview/Deploy button.',
    variables: [
      {
        name: 'techStack',
        description: 'The stack for the no-code platform.',
        type: 'select',
        options: ['React + Node', 'Vue', 'Django'],
        required: true,
      },
    ],
  },
  {
    title: 'API Management Gateway',
    description: 'Kong/Apigee clone to manage API keys and rate limiting.',
    category: 'Technology & SaaS',
    tags: ['api', 'gateway', 'rate-limit', 'security'],
    content:
      'Build an API Gateway Dashboard (Kong).\n\n**Features:**\n1. **Service:** Register API Service (Name, Target URL).\n2. **Keys:** Generate API Keys for consumers.\n3. **Rate Limit:** Configure Rate Limits (Req/Sec).\n4. **Analytics:** Analytics (Logs, Latency).\n5. **Plugins:** Transform plugins (Add headers).',
    variables: [
      {
        name: 'backend',
        description: 'The gateway backend technology.',
        type: 'select',
        options: ['Kong (Config)', 'Express.js', 'Go'],
        required: true,
      },
    ],
  },
  {
    title: 'Webhook Relay Service',
    description: 'Tool to forward webhooks to different endpoints.',
    category: 'Technology & SaaS',
    tags: ['webhooks', 'integration', 'relay', 'logs'],
    content:
      'Create a Webhook Relay Service.\n\n**Features:**\n1. **URL:** Generate a unique webhook URL for the user.\n2. **Rules:** Set forwarding rules (If Header X=Y -> Send to Z).\n3. **Logs:** Request log viewer (Headers, Body).\n4. **Retry:** Retry failed deliveries.',
    variables: [
      {
        name: 'backend',
        description: 'The backend for webhook processing.',
        type: 'select',
        options: ['Node.js', 'Go', 'Python'],
        required: true,
      },
    ],
  },
  {
    title: 'Server Monitoring (Datadog clone)',
    description: 'Real-time infrastructure monitoring.',
    category: 'Technology & SaaS',
    tags: ['monitoring', 'infrastructure', 'uptime', 'alerts'],
    content:
      'Build a Server Monitor (Datadog).\n\n**Features:**\n1. **Server:** Add Server (IP, Name).\n2. **Agent:** Agent installation script (Node/Bash).\n3. **Charts:** Charts: CPU, Memory, Disk usage over time.\n4. **Uptime:** Uptime check (Ping).\n5. **Alerts:** Alert thresholds (Email if CPU > 90%).',
    variables: [
      {
        name: 'chartLib',
        description: 'The charting library for metrics.',
        type: 'select',
        options: ['Chart.js', 'Rickshaw', 'D3'],
        required: true,
      },
    ],
  },
  {
    title: 'Log Management (Splunk clone)',
    description: 'Centralized log aggregation and search.',
    category: 'Technology & SaaS',
    tags: ['logs', 'search', 'elasticsearch', 'devops'],
    content:
      'Develop a Log Management Tool (Splunk).\n\n**Features:**\n1. **Ship:** Ship logs (Logstash/Fluentd style).\n2. **Search:** Search bar (Query language `level=error AND service=auth`).\n3. **Table:** Table of log entries.\n4. **Parse:** Parse JSON logs automatically.',
    variables: [
      {
        name: 'searchEngine',
        description: 'The backend search engine.',
        type: 'select',
        options: ['Elasticsearch', 'Solr', 'MeiliSearch'],
        required: true,
      },
    ],
  },
  {
    title: 'Headless CMS',
    description: 'Strapi/Contentful alternative for managing content.',
    category: 'Technology & SaaS',
    tags: ['cms', 'headless', 'api', 'content'],
    content:
      'Build a Headless CMS from scratch (Strapi/Contentful).\n\n**Backend:** Node.js.\n**Features:**\n1. **Schema:** Dynamic schema creation (User defines content types).\n2. **API:** GraphQL API auto-generated from schema.\n3. **Admin:** Admin Panel UI (React) to manage content.\n4. **Assets:** Asset management (Image upload).',
    variables: [
      {
        name: 'db',
        description: 'The database for content storage.',
        type: 'select',
        options: ['MongoDB', 'PostgreSQL', 'MySQL'],
        required: true,
      },
    ],
  },
  {
    title: 'Job Board (Indeed clone)',
    description: 'Searchable database of job listings.',
    category: 'Job Boards & Recruitment',
    tags: ['jobs', 'search', 'board', 'career'],
    content:
      'Create a Job Board (Indeed).\n\n**Features:**\n1. **Search:** Search (Keyword, Location).\n2. **Filters:** Filters (Job Type, Salary, Experience).\n3. **Detail:** Job Detail page (Apply via Email/URL).\n4. **Post:** Post a Job (Employer flow).\n5. **Alerts:** Email alerts for new jobs.',
    variables: [
      {
        name: 'techStack',
        description: 'The stack for the job board.',
        type: 'select',
        options: ['Laravel', 'Django', 'MERN'],
        required: true,
      },
    ],
  },
  {
    title: 'Resume Database (ATS)',
    description: 'System to upload, parse, and search resumes.',
    category: 'Job Boards & Recruitment',
    tags: ['ats', 'resume', 'parser', 'search'],
    content:
      "Develop an Applicant Tracking System (ATS).\n\n**Features:**\n1. **Upload:** Upload Resume (PDF/DOCX).\n2. **Parse:** Parse text (extract Skills, Email, Phone).\n3. **Kanban:** Kanban board for candidates (New, Interview, Offer).\n4. **Search:** Search by Keyword (e.g., 'Python').",
    variables: [
      {
        name: 'parser',
        description: 'The resume parsing library/API.',
        type: 'select',
        options: ['Resume Parser API', 'pdf-parse', 'Tika'],
        required: true,
      },
    ],
  },
  {
    title: 'Freelance Marketplace (Upwork clone)',
    description: 'Platform for clients to hire freelancers.',
    category: 'Job Boards & Recruitment',
    tags: ['freelance', 'marketplace', 'escrow', 'bidding'],
    content:
      'Build a Freelance Marketplace (Upwork).\n\n**Features:**\n1. **Project:** Post Project (Title, Description, Budget).\n2. **Profile:** Freelancer Profiles (Portfolio, Skills, Hourly Rate).\n3. **Bidding:** Bidding system (Freelancers submit proposals).\n4. **Escrow:** Milestone/Escrow payment system.',
    variables: [
      {
        name: 'techStack',
        description: 'The stack for the marketplace.',
        type: 'select',
        options: ['React + Node', 'Django', 'Rails'],
        required: true,
      },
    ],
  },
  {
    title: 'Gig Economy App (TaskRabbit clone)',
    description: 'Local task marketplace (Cleaning, Moving, Help).',
    category: 'Job Boards & Recruitment',
    tags: ['gig', 'tasks', 'local', 'mobile'],
    content:
      'Create a Gig Economy App (TaskRabbit).\n\n**Features:**\n1. **Tasker:** Tasker profile (Skills, Background check).\n2. **Post:** Post Task (Help moving couch, $50).\n3. **Map:** Map view of available taskers.\n4. **Chat:** In-app chat.\n5. **Pay:** Payment processing after task completion.',
    variables: [
      {
        name: 'platform',
        description: 'The mobile platform.',
        type: 'select',
        options: ['React Native', 'Flutter', 'Ionic'],
        required: true,
      },
    ],
  },
  {
    title: 'Internship Finder',
    description: 'Board specifically for student internships.',
    category: 'Job Boards & Recruitment',
    tags: ['internship', 'students', 'career', 'education'],
    content:
      "Build an Internship Finder.\n\n**Features:**\n1. **Filter:** Filter by Major/Industry.\n2. **Apply:** 'Apply with LinkedIn' button.\n3. **Resources:** Resources section (Resume tips for interns).\n4. **Profile:** Company profiles.",
    variables: [
      {
        name: 'techStack',
        description: 'The web framework.',
        type: 'select',
        options: ['Next.js', 'Vue', 'Django'],
        required: true,
      },
    ],
  },
  {
    title: 'Executive Search Portal',
    description: 'High-end recruitment for C-level roles.',
    category: 'Job Boards & Recruitment',
    tags: ['executive', 'headhunter', 'jobs', 'confidential'],
    content:
      'Develop an Executive Search Portal.\n\n**Features:**\n1. **Blind:** Confidential job listings (Blind company name).\n2. **Headhunter:** Headhunter dashboard (Manage candidates).\n3. **Docs:** Document management (NDAs, CVs).\n4. **Message:** Private messaging.',
    variables: [
      {
        name: 'techStack',
        description: 'The enterprise stack.',
        type: 'select',
        options: ['PHP (Laravel)', 'ASP.NET', 'Rails'],
        required: true,
      },
    ],
  },
  {
    title: 'Career Coaching Platform',
    description: 'Marketplace for career coaches and mentees.',
    category: 'Job Boards & Recruitment',
    tags: ['coaching', 'mentorship', 'booking', 'video'],
    content:
      'Create a Career Coaching Platform.\n\n**Features:**\n1. **Coach:** Coach profiles (Specialty, Rate).\n2. **Calendar:** Calendar booking system (Calendly style).\n3. **Video:** Video call integration ({{videoProvider}}).\n4. **Notes:** Session notes/journal for mentees.',
    variables: [
      {
        name: 'videoProvider',
        description: 'The video calling SDK.',
        type: 'select',
        options: ['Twilio', 'Agora', 'Daily'],
        required: true,
      },
    ],
  },
  {
    title: 'Interview Scheduling Tool',
    description:
      'Tool to coordinate interview times between candidates and interviewers.',
    category: 'Job Boards & Recruitment',
    tags: ['scheduling', 'calendar', 'interviews', 'hr'],
    content:
      'Build an Interview Scheduler.\n\n**Features:**\n1. **Input:** Candidate availability input.\n2. **Sync:** Interviewer calendar integration ({{calendarApi}}).\n3. **Match:** Auto-match slots.\n4. **Invite:** Send email/Calendar invites.',
    variables: [
      {
        name: 'calendarApi',
        description: 'The calendar API for sync.',
        type: 'select',
        options: ['Google Calendar API', 'Outlook Graph API', 'Calendly'],
        required: true,
      },
    ],
  },
  {
    title: 'Salary Comparison Tool',
    description: 'Glassdoor-style salary database and calculator.',
    category: 'Job Boards & Recruitment',
    tags: ['salary', 'comparison', 'data', 'anonymity'],
    content:
      'Create a Salary Comparison Tool (Glassdoor).\n\n**Features:**\n1. **Add:** Add Salary (Anonymously: Title, Location, Company, Salary).\n2. **Search:** Search by Job Title.\n3. **Chart:** Chart: Salary distribution (Box plot).\n4. **Filter:** Filter by Location and Experience.',
    variables: [
      {
        name: 'chartLib',
        description: 'The charting library.',
        type: 'select',
        options: ['Recharts', 'Chart.js', 'D3'],
        required: true,
      },
    ],
  },
  {
    title: 'Remote Job Board',
    description: 'Board exclusively for remote work opportunities.',
    category: 'Job Boards & Recruitment',
    tags: ['remote', 'jobs', 'wfh', 'digital-nomad'],
    content:
      "Develop a Remote Job Board.\n\n**Features:**\n1. **Tags:** Tags: 'Remote', 'Worldwide', 'US Only'.\n2. **Time:** Time zone converter display.\n3. **Culture:** Company culture videos.\n4. **Newsletter:** Newsletter 'Remote Weekly'.",
    variables: [
      {
        name: 'techStack',
        description: 'The web stack.',
        type: 'select',
        options: ['Next.js', 'Hugo (Static)', 'Gatsby'],
        required: true,
      },
    ],
  },
  {
    title: 'Tech Job Board',
    description: 'Stack Overflow Jobs clone for developers.',
    category: 'Job Boards & Recruitment',
    tags: ['tech', 'developer', 'jobs', 'stack-overflow'],
    content:
      "Build a Tech Job Board (Stack Overflow Jobs).\n\n**Features:**\n1. **Filter:** Filter by Tech Stack (React, Python, Go).\n2. **Dismiss:** 'Dismissible' jobs (Mark as viewed).\n3. **Stack:** Company tech stack visualization.\n4. **Salary:** Salary range filter.",
    variables: [
      {
        name: 'techStack',
        description: 'The framework for the board.',
        type: 'select',
        options: ['React', 'Vue', 'Laravel'],
        required: true,
      },
    ],
  },
  {
    title: 'Creative Job Board',
    description: 'Behance/Dribbble Jobs for designers.',
    category: 'Job Boards & Recruitment',
    tags: ['design', 'creative', 'jobs', 'portfolio'],
    content:
      'Create a Creative Job Board (Behance/Dribbble).\n\n**Features:**\n1. **Visual:** Visual-heavy job cards (Company logo prominent).\n2. **Filter:** Filter by Role (UI/UX, Illustration, Motion).\n3. **Portfolio:** Link to Portfolio (required in application).\n4. **Gallery:** Gallery of work.',
    variables: [
      {
        name: 'techStack',
        description: 'The visual framework.',
        type: 'select',
        options: ['Next.js', 'WordPress', 'Webflow'],
        required: true,
      },
    ],
  },
  {
    title: 'Blue Collar Job Board',
    description: 'Snagajob style for hourly workers.',
    category: 'Job Boards & Recruitment',
    tags: ['blue-collar', 'hourly', 'jobs', 'local'],
    content:
      "Develop a Blue Collar Job Board (Snagajob).\n\n**Features:**\n1. **Apply:** Simple 'Apply Now' button (Phone number/Text).\n2. **Shift:** Filter by Shift (Morning, Night, Weekend).\n3. **Map:** Map-based search (Jobs near me).\n4. **Resume:** No Resume required for many roles.",
    variables: [
      {
        name: 'techStack',
        description: 'The framework.',
        type: 'select',
        options: ['PHP', 'Ruby on Rails', 'Node.js'],
        required: true,
      },
    ],
  },
  {
    title: 'Campus Recruitment Portal',
    description: 'Platform for universities and companies to hire students.',
    category: 'Job Boards & Recruitment',
    tags: ['campus', 'university', 'recruitment', 'students'],
    content:
      'Build a Campus Recruitment Portal.\n\n**Roles:** Admin, Company, Student.\n**Features:**\n1. **List:** Company lists jobs (Target specific universities).\n2. **Resume:** Student uploads resume.\n3. **Admin:** Admin coordinates placement drives.\n4. **Results:** Results/Offers dashboard.',
    variables: [
      {
        name: 'techStack',
        description: 'The robust stack.',
        type: 'select',
        options: ['Django', 'Java (Spring)', 'ASP.NET'],
        required: true,
      },
    ],
  },
  {
    title: 'HR Referral Platform',
    description: 'Internal tool for employees to refer candidates.',
    category: 'Job Boards & Recruitment',
    tags: ['referral', 'internal', 'hr', 'bonuses'],
    content:
      'Create an HR Referral Platform.\n\n**Features:**\n1. **List:** List of open jobs (Internal only).\n2. **Refer:** Employee submits referral (Upload CV).\n3. **Track:** Tracking status (Interviewed, Hired, Rejected).\n4. **Bonus:** Bonus tracker (Referral bonus awarded).',
    variables: [
      {
        name: 'techStack',
        description: 'The internal stack.',
        type: 'select',
        options: ['React + Node', 'Vue', 'Angular'],
        required: true,
      },
    ],
  },
  {
    title: 'Property Listing Site (Zillow clone)',
    description: 'Real estate search with maps and details.',
    category: 'Real Estate & Travel',
    tags: ['realestate', 'zillow', 'listings', 'map'],
    content:
      "Build a Real Estate Listing Site (Zillow).\n\n**Features:**\n1. **View:** Map + List split view.\n2. **Filter:** Filters (Price, Beds, Baths, Sqft).\n3. **Detail:** Detail page (Gallery, Agent Contact, Mortgage Calc).\n4. **Save:** 'Save Home' to favorites.\n5. **Schedule:** Open House scheduler.",
    variables: [
      {
        name: 'mapProvider',
        description: 'The mapping provider.',
        type: 'select',
        options: ['Mapbox', 'Google Maps', 'Leaflet'],
        required: true,
      },
    ],
  },
  {
    title: 'Vacation Rental (Airbnb clone)',
    description: 'Marketplace for short-term lodging.',
    category: 'Real Estate & Travel',
    tags: ['airbnb', 'rental', 'booking', 'travel'],
    content:
      'Develop a Vacation Rental Site (Airbnb).\n\n**Features:**\n1. **Search:** Search (Location, Dates, Guests).\n2. **Card:** Listing card (Photo, Price, Rating).\n3. **Book:** Booking flow (Request to book).\n4. **Host:** Host dashboard (Calendar, Pricing).\n5. **Review:** Reviews system.',
    variables: [
      {
        name: 'techStack',
        description: 'The stack for the rental platform.',
        type: 'select',
        options: ['MERN', 'Django', 'Rails'],
        required: true,
      },
    ],
  },
  {
    title: 'Hotel Booking Engine',
    description: 'Direct booking engine for hotels.',
    category: 'Real Estate & Travel',
    tags: ['hotel', 'booking', 'rooms', 'availability'],
    content:
      'Create a Hotel Booking Engine.\n\n**Features:**\n1. **Rooms:** Room type list (Single, Double, Suite) with photos.\n2. **Avail:** Availability calendar integration.\n3. **Guest:** Guest details form.\n4. **Pay:** Payment gateway.\n5. **Confirm:** Confirmation email/PDF.',
    variables: [
      {
        name: 'techStack',
        description: 'The booking engine stack.',
        type: 'select',
        options: ['PHP', 'Java', 'Node.js'],
        required: true,
      },
    ],
  },
  {
    title: 'Travel Itinerary Planner',
    description: 'Tool to build day-by-day travel plans.',
    category: 'Real Estate & Travel',
    tags: ['itinerary', 'planner', 'travel', 'timeline'],
    content:
      'Build a Travel Itinerary Planner.\n\n**Features:**\n1. **Trip:** Trip details (Destination, Dates).\n2. **Time:** Day-by-day timeline (09:00 Breakfast, 10:00 Museum).\n3. **Map:** Map view of itinerary pins.\n4. **Cost:** Cost estimator.\n5. **Share:** Export/Share itinerary.',
    variables: [
      {
        name: 'framework',
        description: 'The frontend framework.',
        type: 'select',
        options: ['React', 'Vue', 'Next.js'],
        required: true,
      },
    ],
  },
  {
    title: 'Flight Comparison Tool',
    description: 'Skyscanner clone for finding cheap flights.',
    category: 'Real Estate & Travel',
    tags: ['flights', 'travel', 'comparison', 'meta-search'],
    content:
      "Create a Flight Comparison Tool (Skyscanner).\n\n**APIs:** Amadeus, Skyscanner, Sabre.\n**Features:**\n1. **Flight:** Flight search (Round trip, One way, Multi-city).\n2. **Hotel:** Hotel search.\n3. **Alert:** Price alert subscription.\n4. **Dates:** 'Flexible dates' calendar view.",
    variables: [
      {
        name: 'apiProvider',
        description: 'The flight data API.',
        type: 'select',
        options: ['Amadeus', 'Skyscanner API', 'Duffel'],
        required: true,
      },
    ],
  },
  {
    title: 'Car Rental Marketplace',
    description: 'Turo clone for peer-to-peer car sharing.',
    category: 'Real Estate & Travel',
    tags: ['car-rental', 'turo', 'marketplace', 'auto'],
    content:
      'Build a Car Rental Marketplace (Turo).\n\n**Features:**\n1. **List:** List Car (Photos, Features, Price/Day).\n2. **Search:** Search (Location, Dates, Car Type).\n3. **Book:** Instant Book vs Request to Book.\n4. **Insure:** Insurance options integration.\n5. **Check:** Guest check-in/out (Odometer photos).',
    variables: [
      {
        name: 'techStack',
        description: 'The marketplace stack.',
        type: 'select',
        options: ['MERN', 'Django', 'Rails'],
        required: true,
      },
    ],
  },
  {
    title: 'Real Estate CRM',
    description: 'Tool for agents to manage buyers, sellers, and deals.',
    category: 'Real Estate & Travel',
    tags: ['crm', 'realestate', 'agents', 'deals'],
    content:
      'Develop a Real Estate CRM.\n\n**Features:**\n1. **Contacts:** Contact database (Buyers, Sellers).\n2. **Pipeline:** Property Pipeline (Lead -> Showing -> Offer -> Closing).\n3. **Docs:** Document storage (Contracts, Disclosures).\n4. **Email:** Email drip campaigns.',
    variables: [
      {
        name: 'techStack',
        description: 'The CRM stack.',
        type: 'select',
        options: ['Laravel', 'Django', '.NET'],
        required: true,
      },
    ],
  },
  {
    title: 'Commercial Property Lease',
    description: 'Platform for leasing office/retail space.',
    category: 'Real Estate & Travel',
    tags: ['commercial', 'lease', 'realestate', 'b2b'],
    content:
      'Create a Commercial Lease Platform.\n\n**Features:**\n1. **Space:** Space listing (Sq ft, Price/sq ft, Zoning).\n2. **RFP:** Request for Proposal (RFP) form.\n3. **Tenant:** Tenant application flow.\n4. **Lease:** Lease document generation.',
    variables: [
      {
        name: 'techStack',
        description: 'The B2B stack.',
        type: 'select',
        options: ['React + Node', 'Angular', 'Vue'],
        required: true,
      },
    ],
  },
  {
    title: 'House Hunting App',
    description: 'Mobile app for house hunters with alerts.',
    category: 'Real Estate & Travel',
    tags: ['house-hunting', 'mobile', 'alerts', 'map'],
    content:
      "Build a House Hunting Mobile App.\n\n**Features:**\n1. **Draw:** 'Draw' search area on map (Polygon).\n2. **Alert:** Instant alerts when a house matches criteria.\n3. **X-Ray:** 'X-Ray' view (See comps/sold prices nearby).\n4. **Photo:** Photo gallery.",
    variables: [
      {
        name: 'platform',
        description: 'The mobile platform.',
        type: 'select',
        options: ['React Native', 'Flutter', 'Swift'],
        required: true,
      },
    ],
  },
  {
    title: 'Travel Review Site (TripAdvisor clone)',
    description: 'Reviews for hotels, restaurants, and attractions.',
    category: 'Real Estate & Travel',
    tags: ['reviews', 'travel', 'ratings', 'photos'],
    content:
      "Develop a Travel Review Site (TripAdvisor).\n\n**Features:**\n1. **Search:** Search for Hotel/Restaurant.\n2. **Review:** Review submission (Rating, Title, Body, Photos).\n3. **Forum:** Traveler forums.\n4. **Do:** 'Things to Do' list.\n5. **Response:** Business Owner responses.",
    variables: [
      {
        name: 'techStack',
        description: 'The review platform stack.',
        type: 'select',
        options: ['PHP', 'Python', 'Ruby'],
        required: true,
      },
    ],
  },
  {
    title: 'Backpacking Planner',
    description: 'Budget and route planner for backpackers.',
    category: 'Real Estate & Travel',
    tags: ['backpacking', 'budget', 'route', 'travel'],
    content:
      'Create a Backpacking Planner.\n\n**Features:**\n1. **Route:** Map route planning (Points of Interest).\n2. **Budget:** Budget calculator (Daily spend vs Total).\n3. **Hostel:** Hostel finder integration.\n4. **Gear:** Gear checklist.\n5. **Visa:** Visa requirement checker.',
    variables: [
      {
        name: 'mapLib',
        description: 'The mapping library.',
        type: 'select',
        options: ['Mapbox', 'Leaflet', 'Google Maps'],
        required: true,
      },
    ],
  },
  {
    title: 'Cruise Booking Portal',
    description: 'Search and book cruise vacations.',
    category: 'Real Estate & Travel',
    tags: ['cruise', 'travel', 'booking', 'vacation'],
    content:
      'Build a Cruise Booking Portal.\n\n**Features:**\n1. **Search:** Search (Destination, Date, Line).\n2. **Deck:** Deck plan viewer (Select cabin).\n3. **Cabin:** Cabin details (Inside, Oceanview, Balcony).\n4. **Excursion:** Excursion add-ons.\n5. **Dining:** Dining preferences.',
    variables: [
      {
        name: 'techStack',
        description: 'The cruise booking stack.',
        type: 'select',
        options: ['React', 'Vue', 'ASP.NET'],
        required: true,
      },
    ],
  },
  {
    title: 'Campground Finder',
    description: 'RV and tent camping spot reservations.',
    category: 'Real Estate & Travel',
    tags: ['camping', 'rv', 'outdoors', 'booking'],
    content:
      'Develop a Campground Finder.\n\n**Features:**\n1. **Map:** Search by Map (Public vs Private campgrounds).\n2. **Filter:** Filters (Hookups: Water/Electric, Pet friendly).\n3. **Photo:** Photo gallery of sites.\n4. **Book:** Booking calendar.',
    variables: [
      {
        name: 'mapProvider',
        description: 'The map provider for camp locations.',
        type: 'select',
        options: ['Google Maps', 'Mapbox', 'Gaia GPS'],
        required: true,
      },
    ],
  },
  {
    title: 'Timeshare Exchange',
    description: 'Platform to swap timeshare weeks.',
    category: 'Real Estate & Travel',
    tags: ['timeshare', 'exchange', 'vacation', 'ownership'],
    content:
      "Create a Timeshare Exchange.\n\n**Features:**\n1. **Deposit:** Deposit your week (Season, Size, Resort).\n2. **Search:** Search for available exchanges.\n3. **Hot:** 'Hot weeks' (Last minute deals).\n4. **Confirm:** Confirmation and fee processing.",
    variables: [
      {
        name: 'techStack',
        description: 'The exchange platform stack.',
        type: 'select',
        options: ['PHP', 'Java', 'Python'],
        required: true,
      },
    ],
  },
  {
    title: 'Moving Company Quote Generator',
    description: 'Estimator for moving costs based on inventory.',
    category: 'Real Estate & Travel',
    tags: ['moving', 'quote', 'inventory', 'logistics'],
    content:
      'Build a Moving Quote Tool.\n\n**Features:**\n1. **Inventory:** Inventory checklist (Bedrooms, Living Room boxes).\n2. **Dist:** Distance calculator (From Zip to Zip).\n3. **Labor:** Labor hours estimation.\n4. **PDF:** Generate PDF Quote.',
    variables: [
      {
        name: 'framework',
        description: 'The frontend framework.',
        type: 'select',
        options: ['React', 'Vue', 'Angular'],
        required: true,
      },
    ],
  },
  {
    title: 'Reddit Clone',
    description: 'Link aggregation and discussion platform.',
    category: 'Forums & Communities',
    tags: ['social', 'news', 'aggregation', 'voting'],
    content:
      'Create a Reddit Clone.\n\n**Features:**\n1. **Sub:** Sub-reddits (Communities).\n2. **Post:** Post types (Link, Text, Image, Video).\n3. **Vote:** Upvote/Downvote system.\n4. **Thread:** Comment threads (Nested).\n5. **User:** User profiles (Karma).',
    variables: [
      {
        name: 'techStack',
        description: 'The social stack.',
        type: 'select',
        options: ['MERN', 'Django', 'Rails'],
        required: true,
      },
    ],
  },
  {
    title: 'Discourse Forum',
    description: 'Modern forum software with trust levels.',
    category: 'Forums & Communities',
    tags: ['forum', 'discussion', 'community', 'trust'],
    content:
      "Generate Forum Software (Discourse).\n\n**Features:**\n1. **Nav:** Category-based navigation.\n2. **Topic:** Threaded topics.\n3. **Trust:** User trust levels (Newbie -> Leader).\n4. **Badge:** Badges and gamification.\n5. **Solved:** 'Solved' button for support topics.",
    variables: [
      {
        name: 'techStack',
        description: 'The forum stack.',
        type: 'select',
        options: ['Rails', 'Django', 'Node.js (Flarum)'],
        required: true,
      },
    ],
  },
  {
    title: 'Slack/Discord Alternative',
    description: 'Real-time team chat application.',
    category: 'Forums & Communities',
    tags: ['chat', 'teams', 'voip', 'channels'],
    content:
      'Build a Team Chat App (Slack/Discord).\n\n**Tech:** WebSocket ({{socketLib}}).\n**Features:**\n1. **Chan:** Channels (Public/Private).\n2. **DM:** Direct Messages.\n3. **Voice:** Voice channels ({{voipLib}}).\n4. **File:** File sharing.\n5. **Webhooks:** Integrations (Incoming Webhooks).',
    variables: [
      {
        name: 'socketLib',
        description: 'The WebSocket library.',
        type: 'select',
        options: ['Socket.io', 'WS', 'Pusher'],
        required: true,
      },
      {
        name: 'voipLib',
        description: 'The Voice over IP library.',
        type: 'select',
        options: ['SimplePeer', 'mediasoup', 'Twilio'],
        required: false,
      },
    ],
  },
  {
    title: 'Stack Overflow Clone',
    description: 'Q&A site for programmers.',
    category: 'Forums & Communities',
    tags: ['qa', 'programming', 'reputation', 'code'],
    content:
      "Create a Q&A Platform (Stack Overflow).\n\n**Features:**\n1. **Ask:** Ask Question (Rich text, Code blocks).\n2. **Ans:** Answer flow.\n3. **Vote:** Upvote/Downvote answers.\n4. **Accept:** 'Accepted Answer' toggle.\n5. **Tag:** Tag system.",
    variables: [
      {
        name: 'techStack',
        description: 'The Q&A stack.',
        type: 'select',
        options: ['Django', 'Spring Boot', 'Node.js'],
        required: true,
      },
    ],
  },
  {
    title: 'Support Community',
    description: 'Peer-to-peer support forum for a product.',
    category: 'Forums & Communities',
    tags: ['support', 'help', 'forum', 'community'],
    content:
      "Develop a Support Community.\n\n**Features:**\n1. **Cat:** Product categories.\n2. **Ask:** 'Ask a Question' wizard.\n3. **Badge:** Verified Expert badge (Staff).\n4. **KB:** Knowledge Base integration.\n5. **Game:** Gamification (Top contributor).",
    variables: [
      {
        name: 'techStack',
        description: 'The support stack.',
        type: 'select',
        options: ['WordPress (bbPress)', 'Discourse', 'Custom'],
        required: true,
      },
    ],
  },
  {
    title: 'Gaming Clan Site',
    description: 'Website for a gaming clan/team.',
    category: 'Forums & Communities',
    tags: ['gaming', 'clan', 'roster', 'matches'],
    content:
      'Create a Gaming Clan Site.\n\n**Features:**\n1. **Roster:** Team Roster (Rank, Username, Role).\n2. **Match:** Match results log.\n3. **Forum:** Forum for strategies.\n4. **Recruit:** Recruitment application form.\n5. **Status:** Discord/Teamspeak status widget.',
    variables: [
      {
        name: 'framework',
        description: 'The framework.',
        type: 'select',
        options: ['HTML/PHP', 'React', 'Wordpress'],
        required: true,
      },
    ],
  },
  {
    title: 'Hobbyist Forum',
    description: 'General purpose forum (e.g., for Gardening or Cars).',
    category: 'Forums & Communities',
    tags: ['hobby', 'forum', 'niche', 'discussion'],
    content:
      'Build a Hobbyist Forum.\n\n**Topic:** {{hobbyTopic}}.\n**Features:**\n1. **Class:** Classifieds section (Buy/Sell gear).\n2. **Gallery:** Gallery for projects.\n3. **Event:** Event calendar (Meetups).\n4. **Sticky:** Sticky posts (Rules/FAQ).',
    variables: [
      {
        name: 'hobbyTopic',
        description: 'The specific hobby topic.',
        type: 'string',
        required: true,
        placeholder: 'e.g. Gardening',
      },
    ],
  },
  {
    title: 'Parenting Community',
    description: 'Support group for parents.',
    category: 'Forums & Communities',
    tags: ['parenting', 'family', 'support', 'forum'],
    content:
      'Create a Parenting Community.\n\n**Features:**\n1. **Anon:** Anonymous posting option.\n2. **Group:** Age-based groups (Newborn, Toddler, Teen).\n3. **Meet:** Local meetups finder.\n4. **Sell:** Buy/Sell used clothes/toys.',
    variables: [
      {
        name: 'techStack',
        description: 'The community platform.',
        type: 'select',
        options: ['Mighty Networks', 'Circle', 'Custom'],
        required: true,
      },
    ],
  },
  {
    title: 'Health Support Group',
    description: 'Forum for people with specific health conditions.',
    category: 'Forums & Communities',
    tags: ['health', 'support', 'medical', 'forum'],
    content:
      'Develop a Health Support Group.\n\n**Features:**\n1. **Private:** Private groups (Condition specific).\n2. **Pro:** Verified Medical Professional badge.\n3. **Res:** Resources section (Link to research).\n4. **Warn:** Disclaimer pop-up.',
    variables: [
      {
        name: 'techStack',
        description: 'The health forum stack.',
        type: 'select',
        options: ['Discourse', 'Drupal', 'Custom'],
        required: true,
      },
    ],
  },
  {
    title: 'Developer Community',
    description: 'Dev.to style blogging and discussion.',
    category: 'Forums & Communities',
    tags: ['dev', 'blog', 'code', 'community'],
    content:
      'Build a Developer Community (Dev.to).\n\n**Features:**\n1. **Blog:** Blog posts (Markdown support).\n2. **Code:** Code of conduct.\n3. **Tag:** Tag system (JavaScript, Python).\n4. **List:** Listing section (Podcasts, Projects).',
    variables: [
      {
        name: 'techStack',
        description: 'The dev community stack.',
        type: 'select',
        options: ['Forem (Dev.to source)', 'Ghost', 'Custom'],
        required: true,
      },
    ],
  },
  {
    title: 'Car Enthusiast Forum',
    description: 'Discussion board for car modification and racing.',
    category: 'Forums & Communities',
    tags: ['cars', 'automotive', 'forum', 'mods'],
    content:
      "Create a Car Forum.\n\n**Features:**\n1. **Garage:** 'Garage' profile (List your cars, mods).\n2. **Help:** Technical help sections.\n3. **Market:** Marketplace (Parts for sale).\n4. **Event:** Event calendar (Car meets/Shows).",
    variables: [
      {
        name: 'techStack',
        description: 'The automotive forum stack.',
        type: 'select',
        options: ['XenForo', 'vBulletin', 'Custom'],
        required: true,
      },
    ],
  },
  {
    title: 'Pet Owners Community',
    description: 'Advice and photo sharing for pet lovers.',
    category: 'Forums & Communities',
    tags: ['pets', 'animals', 'forum', 'photos'],
    content:
      "Develop a Pet Community.\n\n**Features:**\n1. **Pet:** 'Pet Profile' (Name, Breed, Age).\n2. **Contest:** Photo contests.\n3. **Vet:** Vet advice Q&A.\n4. **Lost:** Lost and Found section.",
    variables: [
      {
        name: 'techStack',
        description: 'The pet community stack.',
        type: 'select',
        options: ['React', 'Vue', 'Wordpress'],
        required: true,
      },
    ],
  },
  {
    title: 'Gaming Guild Site',
    description: 'MMO Guild management and roster.',
    category: 'Forums & Communities',
    tags: ['mmo', 'guild', 'roster', 'raids'],
    content:
      'Build an MMO Guild Site.\n\n**Features:**\n1. **Roster:** Roster with characters (Level, Class, Role).\n2. **Raid:** Raid sign-up calendar.\n3. **Loot:** Loot tracker (DKP system).\n4. **Forum:** Forum for strategies.',
    variables: [
      {
        name: 'techStack',
        description: 'The guild site stack.',
        type: 'select',
        options: ['PHP', 'Node.js', 'Python'],
        required: true,
      },
    ],
  },
  {
    title: 'Political Discussion Board',
    description: 'Debate platform for politics.',
    category: 'Forums & Communities',
    tags: ['politics', 'debate', 'forum', 'news'],
    content:
      "Create a Political Forum.\n\n**Features:**\n1. **Tag:** Left/Right spectrum tagging for threads.\n2. **Fact:** 'Fact Check' community tool.\n3. **Mod:** Civil discussion moderation tools.\n4. **Local:** Local politics sections.",
    variables: [
      {
        name: 'techStack',
        description: 'The political forum stack.',
        type: 'select',
        options: ['Discourse', 'Custom'],
        required: true,
      },
    ],
  },
  {
    title: 'Science Discussion Forum',
    description: 'Academic forum for scientific research.',
    category: 'Forums & Communities',
    tags: ['science', 'academic', 'research', 'forum'],
    content:
      'Develop a Science Forum.\n\n**Features:**\n1. **Cat:** Categories by field (Physics, Bio, Chem).\n2. **Math:** LaTeX support for formulas.\n3. **Peer:** Peer review discussion.\n4. **Cit:** Citation link integration.',
    variables: [
      {
        name: 'techStack',
        description: 'The academic forum stack.',
        type: 'select',
        options: ['Discourse', 'Vanilla Forums', 'Custom'],
        required: true,
      },
    ],
  },
  {
    title: 'Cloud Storage (Dropbox clone)',
    description: 'File storage and synchronization service.',
    category: 'File Sharing & Storage',
    tags: ['cloud', 'storage', 'sync', 'files'],
    content:
      'Build a Cloud Storage App (Dropbox).\n\n**Frontend:** React.\n**Backend:** Node.js + {{storageProvider}}.\n**Features:**\n1. **Tree:** File/Folder tree structure.\n2. **Drop:** Drag and drop upload.\n3. **Share:** Shareable link with password option.\n4. **Quota:** Storage quota visualization.',
    variables: [
      {
        name: 'storageProvider',
        description: 'The cloud object storage provider.',
        type: 'select',
        options: ['AWS S3', 'DigitalOcean Spaces', 'MinIO'],
        required: true,
      },
    ],
  },
  {
    title: 'File Transfer Service (WeTransfer)',
    description: 'Large file transfer without account creation.',
    category: 'File Sharing & Storage',
    tags: ['transfer', 'p2p', 'files', 'temp'],
    content:
      'Create a File Transfer Service (WeTransfer).\n\n**Features:**\n1. **Select:** Select file(s) and enter email (Sender & Recipient).\n2. **URL:** Generate unique short URL.\n3. **Exp:** Expiration date (e.g., 7 days).\n4. **Notif:** Email notification on download.\n5. **Prog:** Progress bar upload.',
    variables: [
      {
        name: 'backend',
        description: 'The file transfer backend.',
        type: 'select',
        options: ['Node.js', 'Go', 'Python'],
        required: true,
      },
    ],
  },
  {
    title: 'Torrent Client (Web)',
    description: 'Browser-based torrent downloader.',
    category: 'File Sharing & Storage',
    tags: ['torrent', 'p2p', 'webtorrent', 'download'],
    content:
      'Build a Web-based Torrent Client.\n\n**Tech:** {{torrentLib}}.\n**Features:**\n1. **Link:** Paste Magnet link or upload .torrent file.\n2. **Blob:** Download directly to browser blob (save to disk).\n3. **Stream:** Streaming support (Video).\n4. **Bar:** Download progress bar.',
    variables: [
      {
        name: 'torrentLib',
        description: 'The torrent handling library.',
        type: 'select',
        options: ['WebTorrent', 'Node.js (ExpressTorrent)'],
        required: true,
      },
    ],
  },
  {
    title: 'CDN Management Dashboard',
    description: 'Manage caching, purging, and analytics for a CDN.',
    category: 'File Sharing & Storage',
    tags: ['cdn', 'cache', 'analytics', 'devops'],
    content:
      'Develop a CDN Manager.\n\n**Features:**\n1. **Origin:** Add Origin Server (IP/Domain).\n2. **Purge:** Purge Cache (Single file or Wildcard).\n3. **BW:** Bandwidth usage chart.\n4. **SSL:** SSL Certificate management.',
    variables: [
      {
        name: 'techStack',
        description: 'The CDN control stack.',
        type: 'select',
        options: ['Go', 'Python', 'PHP'],
        required: true,
      },
    ],
  },
  {
    title: 'Photo Backup Service',
    description: 'Google Photos alternative for backing up images.',
    category: 'File Sharing & Storage',
    tags: ['photos', 'backup', 'gallery', 'ai'],
    content:
      "Create a Photo Backup Service (Google Photos).\n\n**Features:**\n1. **Bulk:** Bulk upload (Desktop/Mobile).\n2. **Face:** Face recognition grouping (AI).\n3. **Time:** Timeline view.\n4. **Share:** Shared albums.\n5. **Mem:** 'Memories' feature (On this day...).",
    variables: [
      {
        name: 'platform',
        description: 'The backup client platform.',
        type: 'select',
        options: ['React Native', 'Electron', 'Flutter'],
        required: true,
      },
    ],
  },
  {
    title: 'Document Scanner App',
    description: 'Scan physical docs to PDF using camera.',
    category: 'File Sharing & Storage',
    tags: ['scanner', 'ocr', 'camera', 'pdf'],
    content:
      'Build a Document Scanner App.\n\n**Features:**\n1. **Cam:** Camera capture with auto-edge detection.\n2. **Crop:** Crop and perspective correction.\n3. **OCR:** OCR (Optical Character Recognition) using {{ocrLib}}.\n4. **Exp:** Export to PDF/JPG.',
    variables: [
      {
        name: 'platform',
        description: 'The mobile platform.',
        type: 'select',
        options: ['React Native', 'Flutter', 'Ionic'],
        required: true,
      },
      {
        name: 'ocrLib',
        description: 'The OCR library.',
        type: 'select',
        options: ['Tesseract.js', 'Google Vision API'],
        required: true,
      },
    ],
  },
  {
    title: 'PDF Converter/Editor Tool',
    description: 'Convert files to PDF and edit them.',
    category: 'File Sharing & Storage',
    tags: ['pdf', 'converter', 'editor', 'tools'],
    content:
      'Develop a PDF Tool.\n\n**Features:**\n1. **Conv:** Convert Word/Excel/Image to PDF.\n2. **Merge:** Merge multiple PDFs.\n3. **Split:** Split PDF pages.\n4. **Water:** Add watermarks/signatures.',
    variables: [
      {
        name: 'backend',
        description: 'The PDF processing backend.',
        type: 'select',
        options: ['Node.js (PDF-lib)', 'Python (PyPDF2)', 'PHP'],
        required: true,
      },
    ],
  },
  {
    title: 'Large File Sending',
    description: 'Business solution for secure large file transfer.',
    category: 'File Sharing & Storage',
    tags: ['transfer', 'secure', 'enterprise', 'files'],
    content:
      'Create a Secure File Sending App.\n\n**Features:**\n1. **Enc:** End-to-end encryption.\n2. **Receipt:** Delivery receipts.\n3. **Exp:** File expiry and password protection.\n4. **Brand:** Branding options for email notifications.',
    variables: [
      {
        name: 'techStack',
        description: 'The enterprise file stack.',
        type: 'select',
        options: ['Node.js', 'Go', 'Java'],
        required: true,
      },
    ],
  },
  {
    title: 'Secure File Vault',
    description: 'Encrypted storage for sensitive documents.',
    category: 'File Sharing & Storage',
    tags: ['encryption', 'vault', 'security', 'files'],
    content:
      "Build a Secure File Vault.\n\n**Features:**\n1. **Client:** Client-side encryption before upload (AES-256).\n2. **Zero:** Zero-knowledge architecture (Server can't read files).\n3. **Share:** Secure sharing links with 2FA.",
    variables: [
      {
        name: 'platform',
        description: 'The platform for the vault app.',
        type: 'select',
        options: ['Web', 'Desktop (Electron)'],
        required: true,
      },
    ],
  },
  {
    title: 'Media Server Management (Plex clone)',
    description: 'Organize and stream media files.',
    category: 'File Sharing & Storage',
    tags: ['media', 'server', 'streaming', 'library'],
    content:
      'Develop a Media Server Manager (Plex).\n\n**Features:**\n1. **Scan:** Folder scanning (Movies, TV Shows, Music).\n2. **Meta:** Metadata fetching (TheMovieDB, MusicBrainz).\n3. **Trans:** Transcoding settings.\n4. **User:** User management (Profile, Parental Controls).',
    variables: [
      {
        name: 'backend',
        description: 'The media server backend.',
        type: 'select',
        options: ['Node.js', 'Python', 'Go'],
        required: true,
      },
    ],
  },
  {
    title: 'FTP Manager',
    description: 'Web-based FTP client.',
    category: 'File Sharing & Storage',
    tags: ['ftp', 'file-manager', 'web', 'hosting'],
    content:
      'Create a Web FTP Manager.\n\n**Tech:** Node.js ftp-srv or Client.\n**Features:**\n1. **Browse:** File browser (Tree/List view).\n2. **Up:** Upload/Download files.\n3. **Perm:** Rename/Delete/Move permissions.\n4. **Edit:** Code editor for text files.',
    variables: [
      {
        name: 'framework',
        description: 'The FTP UI framework.',
        type: 'select',
        options: ['React', 'Vue', 'Angular'],
        required: true,
      },
    ],
  },
  {
    title: 'Code Snippet Manager (Gist clone)',
    description: 'Tool to save and share code snippets.',
    category: 'File Sharing & Storage',
    tags: ['code', 'snippets', 'gists', 'developer'],
    content:
      'Build a Code Snippet Manager (Gist).\n\n**Features:**\n1. **Create:** Create Gist (Title, Description, Code, Language).\n2. **High:** Syntax highlighting.\n3. **Vis:** Public/Private visibility.\n4. **Embed:** Embed widget for websites.',
    variables: [
      {
        name: 'techStack',
        description: 'The snippet manager stack.',
        type: 'select',
        options: ['React', 'Next.js', 'Django'],
        required: true,
      },
    ],
  },
  {
    title: 'Design Asset Manager',
    description: 'Library for logos, fonts, and brand assets.',
    category: 'File Sharing & Storage',
    tags: ['design', 'assets', 'brand', 'management'],
    content:
      "Create a Design Asset Library.\n\n**Features:**\n1. **Upload:** Upload vector (SVG), Raster (PNG), and Font files.\n2. **Tag:** Tagging system (e.g., 'Logo', 'Marketing').\n3. **Ver:** Versioning for assets.\n4. **Zip:** Download bundles (ZIP).",
    variables: [
      {
        name: 'techStack',
        description: 'The asset library stack.',
        type: 'select',
        options: ['Next.js', 'Vue', 'PHP'],
        required: true,
      },
    ],
  },
  {
    title: 'Email Attachment Viewer',
    description:
      'Tool to view and download email attachments without opening email.',
    category: 'File Sharing & Storage',
    tags: ['email', 'attachments', 'security', 'viewer'],
    content:
      'Develop an Attachment Viewer.\n\n**Features:**\n1. **Connect:** Connect to Email Account (IMAP).\n2. **List:** List emails with attachments.\n3. **View:** Previewer for PDF, Images, Docs.\n4. **Bulk:** Bulk download function.',
    variables: [
      {
        name: 'backend',
        description: 'The email processing backend.',
        type: 'select',
        options: ['Node.js (Mailparser)', 'Python', 'PHP'],
        required: true,
      },
    ],
  },
  {
    title: 'Pastebin Service',
    description: 'Text storage for code sharing.',
    category: 'File Sharing & Storage',
    tags: ['text', 'paste', 'code', 'sharing'],
    content:
      'Create a Pastebin Service.\n\n**Features:**\n1. **Text:** Text area for content.\n2. **Syn:** Syntax selection.\n3. **Exp:** Expiration selection (Never, 10 min, 1 day).\n4. **Burn:** Burn after read option.',
    variables: [
      {
        name: 'techStack',
        description: 'The text sharing stack.',
        type: 'select',
        options: ['Node.js', 'Go', 'PHP'],
        required: true,
      },
    ],
  },
  {
    title: 'Fitness Tracker',
    description: 'Track workouts, steps, and calories.',
    category: 'Mobile App Specific',
    tags: ['fitness', 'health', 'tracking', 'mobile'],
    content:
      'Build a Fitness Tracker App.\n\n**Features:**\n1. **Log:** Log workout (Type, Duration, Sets/Reps).\n2. **Step:** Step counter using Pedometer ({{sensorLib}}).\n3. **Cal:** Calorie estimator.\n4. **Chart:** History chart ({{chartLib}}).',
    variables: [
      {
        name: 'platform',
        description: 'The mobile platform.',
        type: 'select',
        options: ['React Native', 'Flutter', 'Swift'],
        required: true,
      },
      {
        name: 'sensorLib',
        description: 'The sensor library.',
        type: 'select',
        options: ['Expo Sensors', 'Native Modules', 'CoreMotion'],
        required: true,
      },
    ],
  },
  {
    title: 'Meditation App',
    description: 'Guided meditation and sleep sounds.',
    category: 'Mobile App Specific',
    tags: ['meditation', 'wellness', 'audio', 'health'],
    content:
      'Create a Meditation App.\n\n**Features:**\n1. **Play:** Audio player with background play.\n2. **Lib:** Library of guided meditations.\n3. **Sleep:** Sleep timer.\n4. **Streak:** Streak tracking.',
    variables: [
      {
        name: 'platform',
        description: 'The mobile platform.',
        type: 'select',
        options: ['React Native', 'Flutter', 'Swift'],
        required: true,
      },
    ],
  },
  {
    title: 'Habit Tracker',
    description: "Don't break the chain tracker.",
    category: 'Mobile App Specific',
    tags: ['habits', 'productivity', 'tracking', 'mobile'],
    content:
      'Develop a Habit Tracker.\n\n**Features:**\n1. **Create:** Create Habit (Name, Frequency).\n2. **Cal:** Calendar view (Green dots for completed days).\n3. **Rem:** Reminders (Push notifications).\n4. **Stat:** Statistics (Current streak).',
    variables: [
      {
        name: 'platform',
        description: 'The mobile platform.',
        type: 'select',
        options: ['React Native', 'Flutter', 'Android (Kotlin)'],
        required: true,
      },
    ],
  },
  {
    title: 'Pedometer',
    description: 'Simple step counting app.',
    category: 'Mobile App Specific',
    tags: ['pedometer', 'steps', 'health', 'sensor'],
    content:
      'Build a Pedometer.\n\n**Core:** Pedometer API/Sensor.\n**Features:**\n1. **Bar:** Big circular progress bar (Steps vs Goal).\n2. **Dist:** Distance and Calories calculation.\n3. **Hist:** History chart (Last 7 days).',
    variables: [
      {
        name: 'platform',
        description: 'The mobile platform.',
        type: 'select',
        options: ['React Native', 'Swift', 'Kotlin'],
        required: true,
      },
    ],
  },
  {
    title: 'Water Tracker',
    description: 'Hydration reminder app.',
    category: 'Mobile App Specific',
    tags: ['water', 'health', 'hydration', 'tracker'],
    content:
      'Create a Water Tracker.\n\n**Features:**\n1. **Add:** Add cup/bottle (Customizable sizes).\n2. **Vis:** Visual progress (Filling a glass).\n3. **Rem:** Reminder notifications.\n4. **Log:** History log.',
    variables: [
      {
        name: 'platform',
        description: 'The mobile platform.',
        type: 'select',
        options: ['Flutter', 'React Native', 'SwiftUI'],
        required: true,
      },
    ],
  },
  {
    title: 'Sleep Cycle Alarm',
    description: 'Smart alarm that wakes you in light sleep.',
    category: 'Mobile App Specific',
    tags: ['sleep', 'alarm', 'health', 'sensor'],
    content:
      'Build a Sleep Cycle Alarm.\n\n**Core:** Accelerometer/Motion detection.\n**Features:**\n1. **Win:** Set alarm time window (e.g., 6:00-6:30 AM).\n2. **Rec:** Record sleep sounds (Snoring/Talking).\n3. **Graph:** Sleep quality graph.',
    variables: [
      {
        name: 'platform',
        description: 'The mobile platform.',
        type: 'select',
        options: ['React Native', 'Native (Swift/Kotlin)'],
        required: true,
      },
    ],
  },
  {
    title: 'Period Tracker',
    description: 'Menstrual cycle calendar.',
    category: 'Mobile App Specific',
    tags: ['period', 'health', 'tracker', 'calendar'],
    content:
      'Create a Period Tracker.\n\n**Features:**\n1. **Cal:** Calendar view (Period, Ovulation, PMS).\n2. **Log:** Log symptoms (Cramps, Mood).\n3. **Pred:** Prediction algorithm.\n4. **Priv:** Protection/Privacy mode.',
    variables: [
      {
        name: 'platform',
        description: 'The mobile platform.',
        type: 'select',
        options: ['Flutter', 'React Native', 'Swift'],
        required: true,
      },
    ],
  },
  {
    title: 'Pregnancy Tracker',
    description: 'Week-by-week pregnancy guide.',
    category: 'Mobile App Specific',
    tags: ['pregnancy', 'health', 'baby', 'tracker'],
    content:
      'Develop a Pregnancy Tracker.\n\n**Features:**\n1. **Due:** Due date calculator.\n2. **Fruit:** Weekly fruit comparison (Baby is size of a...).\n3. **Kick:** Kick counter.\n4. **Con:** Contraction timer.',
    variables: [
      {
        name: 'platform',
        description: 'The mobile platform.',
        type: 'select',
        options: ['React Native', 'Flutter', 'Native'],
        required: true,
      },
    ],
  },
  {
    title: 'Baby Tracker',
    description: 'Track feeding, diapers, and sleep for newborns.',
    category: 'Mobile App Specific',
    tags: ['baby', 'newborn', 'tracker', 'parents'],
    content:
      'Build a Baby Tracker.\n\n**Features:**\n1. **Tap:** One-tap logging (Nurse, Diaper, Sleep).\n2. **Time:** Timer for nursing sessions.\n3. **Grow:** Growth charts (Weight/Length).',
    variables: [
      {
        name: 'platform',
        description: 'The mobile platform.',
        type: 'select',
        options: ['React Native', 'Flutter', 'Swift'],
        required: true,
      },
    ],
  },
  {
    title: 'Recipe Box App',
    description: 'Digital cookbook for your phone.',
    category: 'Mobile App Specific',
    tags: ['recipe', 'cooking', 'food', 'offline'],
    content:
      'Create a Recipe Box App.\n\n**Features:**\n1. **Add:** Add Recipe (Ingredients, Steps, Photo).\n2. **Search:** Search by ingredient.\n3. **Fav:** Favorites collection.\n4. **Off:** Offline mode.',
    variables: [
      {
        name: 'platform',
        description: 'The mobile platform.',
        type: 'select',
        options: ['React Native', 'Flutter', 'Android'],
        required: true,
      },
    ],
  },

  {
    title: 'Barcode Scanner',
    description:
      'Mobile utility to scan product barcodes and look up information.',
    category: 'Mobile App Specific',
    tags: ['barcode', 'scanner', 'camera', 'mobile'],
    content:
      'Build a Barcode Scanner App.\n\n**Tech:** {{cameraLib}}.\n**Features:**\n1. **Cam:** Camera view with scanning overlay.\n2. **Fmt:** Barcode format detection (UPC, EAN, QR).\n3. **API:** API lookup (e.g., OpenFoodFacts for groceries) to display product details.\n4. **Hist:** History of scanned items.\n5. **List:** Create a shopping list from scans.',
    variables: [
      {
        name: 'platform',
        description: 'The mobile platform.',
        type: 'select',
        options: ['React Native', 'Flutter', 'Ionic'],
        required: true,
      },
      {
        name: 'cameraLib',
        description: 'The camera/scanning library.',
        type: 'select',
        options: ['react-native-camera', 'mobile_scanner', 'google_ml_kit'],
        required: true,
      },
    ],
  },
  {
    title: 'QR Code Generator/Scanner',
    description:
      'Tool to generate QR codes for text/URLs and scan existing ones.',
    category: 'Mobile App Specific',
    tags: ['qr', 'generator', 'scanner', 'utility'],
    content:
      'Create a QR Code Tool.\n\n**Features:**\n1. **Gen:** Generate QR from Text, URL, or WiFi credentials.\n2. **Custom:** Customize colors and logo in center.\n3. **Scan:** Scan QR codes to open links or copy text.\n4. **Save:** Save generated QRs to gallery.\n5. **Hist:** Scan History.',
    variables: [
      {
        name: 'platform',
        description: 'The mobile platform.',
        type: 'select',
        options: ['React Native', 'Flutter', 'Swift'],
        required: true,
      },
    ],
  },
  {
    title: 'Compass App',
    description: 'Digital compass with degree display and bearing.',
    category: 'Mobile App Specific',
    tags: ['compass', 'sensor', 'navigation', 'utility'],
    content:
      'Build a Compass App.\n\n**Tech:** Magnetometer sensor.\n**Features:**\n1. **Needle:** 360-degree rotating compass needle.\n2. **Deg:** Digital display of degrees (0-360).\n3. **Card:** Cardinal direction (N, S, E, W).\n4. **Cal:** Calibrate sensor notification.\n5. **Dark:** Dark mode map background.',
    variables: [
      {
        name: 'platform',
        description: 'The mobile platform.',
        type: 'select',
        options: ['React Native', 'Flutter', 'Native (Swift/Kotlin)'],
        required: true,
      },
    ],
  },
  {
    title: 'Flashlight App',
    description: 'Utility to control phone flash and screen brightness.',
    category: 'Mobile App Specific',
    tags: ['flashlight', 'torch', 'utility', 'brightness'],
    content:
      "Create a Flashlight App.\n\n**Features:**\n1. **Torch:** Big button to toggle Camera Flash (Torch).\n2. **Screen:** 'Screen Light' mode (White screen at max brightness).\n3. **Strobe:** Strobe/SOS mode with adjustable frequency.\n4. **Widget:** Widget support.",
    variables: [
      {
        name: 'platform',
        description: 'The mobile platform.',
        type: 'select',
        options: ['React Native', 'Flutter', 'Swift'],
        required: true,
      },
    ],
  },
  {
    title: 'Level Tool',
    description: 'Bubble level tool for measuring surface flatness.',
    category: 'Mobile App Specific',
    tags: ['level', 'sensor', 'measurement', 'utility'],
    content:
      'Build a Level Tool.\n\n**Sensors:** Accelerometer & Gyroscope.\n**Features:**\n1. **Bubble:** Visual bubble level (X and Y axes).\n2. **Deg:** Digital degree display for inclination.\n3. **Sound:** Sound indicator when level (0 degrees).\n4. **Lock:** Lock orientation.',
    variables: [
      {
        name: 'platform',
        description: 'The mobile platform.',
        type: 'select',
        options: ['React Native', 'Flutter', 'Native'],
        required: true,
      },
    ],
  },
  {
    title: 'Stopwatch/Timer',
    description: 'Multi-function stopwatch and countdown timer.',
    category: 'Mobile App Specific',
    tags: ['timer', 'stopwatch', 'utility', 'productivity'],
    content:
      'Create a Stopwatch & Timer App.\n\n**Features:**\n1. **Watch:** Stopwatch (Start, Stop, Lap, Reset).\n2. **Count:** Countdown Timer with presets (e.g., 5 min, 10 min).\n3. **Back:** Background timer support.\n4. **Alarm:** Alarm sound/vibration on finish.',
    variables: [
      {
        name: 'platform',
        description: 'The mobile platform.',
        type: 'select',
        options: ['React Native', 'Flutter', 'PWA'],
        required: true,
      },
    ],
  },
  {
    title: 'Metronome',
    description: 'Music tool to keep time with BPM control.',
    category: 'Mobile App Specific',
    tags: ['metronome', 'music', 'audio', 'bpm'],
    content:
      'Build a Metronome.\n\n**Core:** High-precision audio scheduling.\n**Features:**\n1. **BPM:** BPM Slider (40-240).\n2. **Sig:** Time signature selector (2/4, 3/4, 4/4).\n3. **Vis:** Visual flash/light on beat.\n4. **Acc:** Accent first beat of measure.',
    variables: [
      {
        name: 'platform',
        description: 'The mobile platform.',
        type: 'select',
        options: ['React Native', 'Flutter', 'Native'],
        required: true,
      },
    ],
  },
  {
    title: 'Tuner App',
    description: 'Instrument tuner using microphone input.',
    category: 'Mobile App Specific',
    tags: ['tuner', 'music', 'audio', 'frequency'],
    content:
      'Create a Tuner App.\n\n**Core:** Audio processing (FFT).\n**Features:**\n1. **Freq:** Frequency detection (Hz).\n2. **Note:** Note display (A, G#, etc.).\n3. **Sharp:** Flat/Sharp indicator (-20 to +20 cents).\n4. **Inst:** Instrument selection (Guitar, Violin, Chromatic).',
    variables: [
      {
        name: 'platform',
        description: 'The mobile platform.',
        type: 'select',
        options: ['React Native', 'Flutter', 'Native'],
        required: true,
      },
    ],
  },
  {
    title: 'Voice Recorder',
    description: 'High-quality audio recording with playback.',
    category: 'Mobile App Specific',
    tags: ['recorder', 'audio', 'mic', 'notes'],
    content:
      'Build a Voice Recorder.\n\n**Features:**\n1. **Rec:** Record/Stop/Pause controls.\n2. **Wave:** Visual waveform during recording.\n3. **List:** List of recordings with date/size.\n4. **Ren:** Rename/Delete recordings.\n5. **Share:** Share audio files.',
    variables: [
      {
        name: 'platform',
        description: 'The mobile platform.',
        type: 'select',
        options: ['React Native', 'Flutter', 'Swift'],
        required: true,
      },
    ],
  },
  {
    title: 'Scanner App (CamScanner style)',
    description: 'Scan documents to PDF using camera.',
    category: 'Mobile App Specific',
    tags: ['scanner', 'pdf', 'camera', 'ocr'],
    content:
      'Create a Document Scanner App (CamScanner).\n\n**Features:**\n1. **Cam:** Camera capture with auto-edge detection.\n2. **Crop:** Crop and perspective correction.\n3. **Filt:** Filter enhancement (B&W, Magic Color).\n4. **OCR:** OCR (Text recognition) using {{ocrLib}}.\n5. **Exp:** Export to PDF/JPG.',
    variables: [
      {
        name: 'platform',
        description: 'The mobile platform.',
        type: 'select',
        options: ['React Native', 'Flutter', 'Ionic'],
        required: true,
      },
      {
        name: 'ocrLib',
        description: 'The OCR library.',
        type: 'select',
        options: ['Tesseract.js', 'Google Vision API', 'ML Kit'],
        required: true,
      },
    ],
  },
  {
    title: 'Notes App (Bear/Notion style)',
    description: 'Desktop note-taking app with markdown and tags.',
    category: 'Desktop App Specific',
    tags: ['notes', 'markdown', 'productivity', 'desktop'],
    content:
      'Build a Notes App for Desktop (Bear/Notion).\n\n**Tech:** Electron + {{db}}.\n**Features:**\n1. **Side:** Sidebar with folder/tag hierarchy.\n2. **Edit:** Markdown editor with live preview.\n3. **Search:** Search across all notes.\n4. **Bio:** Biometric lock (TouchID/Windows Hello).\n5. **Cloud:** Cloud sync ({{syncProvider}}).',
    variables: [
      {
        name: 'framework',
        description: 'The desktop framework.',
        type: 'select',
        options: ['Electron + React', 'Electron + Vue', 'Tauri'],
        required: true,
      },
      {
        name: 'db',
        description: 'The local database.',
        type: 'select',
        options: ['SQLite', 'IndexedDB', 'LowDB'],
        required: true,
      },
      {
        name: 'syncProvider',
        description: 'The cloud sync provider.',
        type: 'select',
        options: ['Dropbox API', 'Google Drive', 'iCloud'],
        required: false,
      },
    ],
  },
  {
    title: 'To-Do List (Things/Todoist)',
    description: 'Task manager with projects and due dates.',
    category: 'Desktop App Specific',
    tags: ['todo', 'task', 'productivity', 'desktop'],
    content:
      "Create a Desktop To-Do App (Things/Todoist).\n\n**Features:**\n1. **View:** Inbox, Today, Upcoming views.\n2. **Proj:** Projects and Areas of Responsibility.\n3. **Nat:** Natural language parsing (e.g., type 'Buy milk tomorrow').\n4. **Flag:** Priority flags.",
    variables: [
      {
        name: 'framework',
        description: 'The desktop framework.',
        type: 'select',
        options: ['Electron', 'Tauri', 'Qt'],
        required: true,
      },
    ],
  },
  {
    title: 'Menu Bar Utility',
    description: 'Mac/Windows menu bar app for quick actions.',
    category: 'Desktop App Specific',
    tags: ['menubar', 'utility', 'productivity', 'desktop'],
    content:
      'Build a Menu Bar Utility.\n\n**Tech:** Electron/Electron Tray.\n**Features:**\n1. **Drop:** Dropdown from top menu bar.\n2. **Clip:** Quick snippets/Clipboard history.\n3. **Weather:** Weather widget.\n4. **Sys:** System stats (CPU/RAM).',
    variables: [
      {
        name: 'framework',
        description: 'The desktop framework.',
        type: 'select',
        options: ['Electron', 'Tauri', 'Swift (Mac only)'],
        required: true,
      },
    ],
  },
  {
    title: 'Window Manager',
    description: 'Tool to organize windows via keyboard shortcuts.',
    category: 'Desktop App Specific',
    tags: ['window-manager', 'automation', 'productivity', 'desktop'],
    content:
      'Create a Window Manager App.\n\n**Features:**\n1. **Hot:** Global hotkeys (e.g., Ctrl+Alt+Left to snap).\n2. **Grid:** Grid layout presets.\n3. **Mon:** Move windows between monitors.\n4. **Tray:** Minimize to tray.',
    variables: [
      {
        name: 'platform',
        description: 'The desktop platform.',
        type: 'select',
        options: ['Electron', 'Rust (Tauri)', 'Python (AutoGUI)'],
        required: true,
      },
    ],
  },
  {
    title: 'Clipboard Manager',
    description: 'History manager for copied text/images.',
    category: 'Desktop App Specific',
    tags: ['clipboard', 'history', 'utility', 'desktop'],
    content:
      'Build a Clipboard Manager.\n\n**Features:**\n1. **Hist:** Keep history of last {{historyCount}} copies.\n2. **Type:** Distinguish between Text, HTML, and Images.\n3. **Search:** Search history.\n4. **Pin:** Pin favorite clips.',
    variables: [
      {
        name: 'historyCount',
        description: 'The number of items to keep in history.',
        type: 'number',
        defaultValue: 50,
      },
      {
        name: 'framework',
        description: 'The desktop framework.',
        type: 'select',
        options: ['Electron', 'Tauri', 'Native (C#)'],
        required: true,
      },
    ],
  },
  {
    title: 'Screenshot Tool (Snagit style)',
    description: 'Advanced screenshot capture and annotation.',
    category: 'Desktop App Specific',
    tags: ['screenshot', 'capture', 'annotation', 'desktop'],
    content:
      'Create a Screenshot Tool (Snagit).\n\n**Features:**\n1. **Hot:** Global hotkey to capture region/window/fullscreen.\n2. **Annot:** Annotation toolbar (Arrow, Blur, Text, Rect).\n3. **Cloud:** Upload to cloud ({{storage}}) or copy to clipboard.\n4. **Rec:** Screen recording support.',
    variables: [
      {
        name: 'storage',
        description: 'The cloud storage for screenshots.',
        type: 'select',
        options: ['AWS S3', 'Dropbox', 'Imgur'],
        required: false,
      },
    ],
  },
  {
    title: 'GIF Recorder',
    description: 'Record screen sessions to GIF files.',
    category: 'Desktop App Specific',
    tags: ['gif', 'recorder', 'screen', 'desktop'],
    content:
      'Build a GIF Recorder.\n\n**Features:**\n1. **Area:** Select recording area.\n2. **Set:** FPS and Quality settings.\n3. **Rec:** Start/Stop recording.\n4. **Exp:** Export to GIF.',
    variables: [
      {
        name: 'framework',
        description: 'The desktop framework.',
        type: 'select',
        options: ['Electron', 'Tauri', 'Python'],
        required: true,
      },
    ],
  },
  {
    title: 'Video Editor (Premiere clone)',
    description: 'Simple non-linear video editor.',
    category: 'Desktop App Specific',
    tags: ['video', 'editor', 'multimedia', 'desktop'],
    content:
      'Create a Basic Video Editor (Premiere).\n\n**Tech:** Electron + {{videoLib}}.\n**Features:**\n1. **Time:** Timeline with Video/Audio tracks.\n2. **Cut:** Trim and Split clips.\n3. **Text:** Add text overlays.\n4. **Exp:** Export to MP4.',
    variables: [
      {
        name: 'videoLib',
        description: 'The video processing library.',
        type: 'select',
        options: ['FFmpeg (via command)', 'Remotion', 'Video.js'],
        required: true,
      },
    ],
  },
  {
    title: 'Audio Editor (Audacity clone)',
    description: 'Waveform editor for sound files.',
    category: 'Desktop App Specific',
    tags: ['audio', 'editor', 'waveform', 'desktop'],
    content:
      'Build an Audio Editor (Audacity).\n\n**Tech:** Web Audio API / Electron.\n**Features:**\n1. **Wave:** Waveform visualization.\n2. **Edit:** Cut/Copy/Paste regions.\n3. **FX:** Fade in/out effects.\n4. **Exp:** Export as WAV/MP3.',
    variables: [
      {
        name: 'framework',
        description: 'The desktop framework.',
        type: 'select',
        options: ['Electron', 'Tauri'],
        required: true,
      },
    ],
  },
  {
    title: 'Image Editor (Photoshop lite)',
    description: 'Raster graphics editor with layers.',
    category: 'Desktop App Specific',
    tags: ['image', 'editor', 'graphics', 'desktop'],
    content:
      'Create a Simple Image Editor (Photoshop).\n\n**Tech:** HTML5 Canvas.\n**Features:**\n1. **Crop:** Crop and Resize.\n2. **Adj:** Brightness/Contrast sliders.\n3. **Draw:** Draw/Brush tool.\n4. **Layer:** Layers support.',
    variables: [
      {
        name: 'framework',
        description: 'The desktop framework.',
        type: 'select',
        options: ['Electron', 'Tauri'],
        required: true,
      },
    ],
  },
  {
    title: 'FTP Client (FileZilla)',
    description: 'Graphical client for file transfer.',
    category: 'Desktop App Specific',
    tags: ['ftp', 'file-manager', 'transfer', 'desktop'],
    content:
      'Build an FTP Client (FileZilla).\n\n**Features:**\n1. **Site:** Site Manager (Save credentials).\n2. **Dual:** Dual pane view (Local vs Remote).\n3. **Drag:** Drag and drop upload/download.\n4. **Perm:** File permission editor (chmod).',
    variables: [
      {
        name: 'framework',
        description: 'The desktop framework.',
        type: 'select',
        options: ['Electron', 'Java Swing', 'C# .NET'],
        required: true,
      },
    ],
  },
  {
    title: 'Git GUI (SourceTree)',
    description: 'Graphical interface for Git commands.',
    category: 'Desktop App Specific',
    tags: ['git', 'version-control', 'gui', 'desktop'],
    content:
      'Create a Git GUI (SourceTree).\n\n**Tech:** Electron + {{gitLib}}.\n**Features:**\n1. **Graph:** Commit history graph.\n2. **Stage:** Stage/Unstage files.\n3. **Msg:** Commit message input.\n4. **Push:** Push/Pull/Branch switch.',
    variables: [
      {
        name: 'gitLib',
        description: 'The Git library.',
        type: 'select',
        options: ['simple-git', 'nodegit', 'isomorphic-git'],
        required: true,
      },
    ],
  },
  {
    title: 'Database Client (TablePlus)',
    description: 'Tool to connect and query databases.',
    category: 'Desktop App Specific',
    tags: ['database', 'sql', 'gui', 'desktop'],
    content:
      'Build a Database Client (TablePlus).\n\n**Drivers:** Support {{dbType}}.\n**Features:**\n1. **Conn:** Saved connection list.\n2. **Table:** Table browser with rows.\n3. **SQL:** SQL query editor with syntax highlighting.\n4. **Exp:** Export results.',
    variables: [
      {
        name: 'dbType',
        description: 'The supported database types.',
        type: 'multiselect',
        options: ['PostgreSQL', 'MySQL', 'SQLite', 'Redis'],
        required: true,
      },
    ],
  },
  {
    title: 'REST API Client (Postman)',
    description: 'Tool to test HTTP requests.',
    category: 'Desktop App Specific',
    tags: ['api', 'rest', 'testing', 'desktop'],
    content:
      'Create a REST Client (Postman).\n\n**Features:**\n1. **Method:** Methods (GET, POST, PUT, DELETE).\n2. **Header:** Header and Body builder (Form data, JSON).\n3. **Env:** Environment variables (Dev/Prod).\n4. **Save:** Save collections.',
    variables: [
      {
        name: 'framework',
        description: 'The desktop framework.',
        type: 'select',
        options: ['Electron', 'Tauri'],
        required: true,
      },
    ],
  },
  {
    title: 'SSH Terminal',
    description: 'Secure shell client in a desktop app.',
    category: 'Desktop App Specific',
    tags: ['ssh', 'terminal', 'networking', 'desktop'],
    content:
      'Build an SSH Client.\n\n**Tech:** node-pty/xterm.js.\n**Features:**\n1. **Prof:** Manage saved profiles (Host, User, Port).\n2. **Term:** Terminal emulator with tabs.\n3. **SFTP:** SFTP file browser sidebar.',
    variables: [
      {
        name: 'framework',
        description: 'The desktop framework.',
        type: 'select',
        options: ['Electron', 'Tauri'],
        required: true,
      },
    ],
  },
  {
    title: 'Markdown Editor',
    description: 'Distraction-free writing app.',
    category: 'Desktop App Specific',
    tags: ['markdown', 'writing', 'editor', 'desktop'],
    content:
      'Create a Markdown Editor.\n\n**Features:**\n1. **Split:** Split view (Edit + Preview).\n2. **Type:** Typewriter mode (Center text).\n3. **Focus:** Focus mode (Dim everything but current sentence).\n4. **Exp:** Export to PDF/HTML.',
    variables: [
      {
        name: 'framework',
        description: 'The desktop framework.',
        type: 'select',
        options: ['Electron', 'Tauri'],
        required: true,
      },
    ],
  },
  {
    title: 'Pomodoro Timer',
    description: 'Productivity timer with task tracking.',
    category: 'Desktop App Specific',
    tags: ['productivity', 'timer', 'pomodoro', 'desktop'],
    content:
      'Build a Pomodoro App.\n\n**Features:**\n1. **Timer:** Timer (25m Work / 5m Break).\n2. **Task:** Task list to associate with sessions.\n3. **Not:** Notification on break time.\n4. **Stat:** Statistics (Total focus time today).',
    variables: [
      {
        name: 'framework',
        description: 'The desktop framework.',
        type: 'select',
        options: ['Electron', 'Tauri', 'PWA'],
        required: true,
      },
    ],
  },
  {
    title: 'Focus App (Freedom)',
    description: 'App blocker for distractions.',
    category: 'Desktop App Specific',
    tags: ['productivity', 'blocker', 'focus', 'desktop'],
    content:
      'Create a Focus App (Freedom).\n\n**Features:**\n1. **Block:** List of blocked sites/apps.\n2. **Dur:** Set focus session duration.\n3. **Diff:** Difficulty to quit (Hard/Normal).\n4. **White:** Whitelist for essential tools.',
    variables: [
      {
        name: 'platform',
        description: 'The platform.',
        type: 'select',
        options: ['Electron', 'Rust (Tauri)', 'Python'],
        required: true,
      },
    ],
  },
  {
    title: 'System Cleaner',
    description: 'Tool to remove junk files and caches.',
    category: 'Desktop App Specific',
    tags: ['utility', 'cleaner', 'system', 'desktop'],
    content:
      "Build a System Cleaner.\n\n**Features:**\n1. **Scan:** Scan for Cache files, Logs, Temp files.\n2. **Size:** Show size of each category.\n3. **Clean:** 'Clean' button to delete.\n4. **Start:** Startup apps manager.",
    variables: [
      {
        name: 'platform',
        description: 'The platform.',
        type: 'select',
        options: ['Electron', 'Tauri', 'C#'],
        required: true,
      },
    ],
  },
  {
    title: 'Backup Utility',
    description: 'Automated file backup tool.',
    category: 'Desktop App Specific',
    tags: ['backup', 'utility', 'storage', 'desktop'],
    content:
      'Create a Backup Utility.\n\n**Features:**\n1. **Source:** Select source folders.\n2. **Dest:** Select destination (External Drive, Cloud).\n3. **Sched:** Schedule backups (Daily, Weekly).\n4. **Inc:** Incremental backup support.',
    variables: [
      {
        name: 'framework',
        description: 'The desktop framework.',
        type: 'select',
        options: ['Electron', 'Python', 'Rust'],
        required: true,
      },
    ],
  },
  {
    title: 'React Native Boilerplate',
    description: 'Production-ready starter with navigation and state.',
    category: 'Boilerplates & Dev Tools',
    tags: ['react-native', 'boilerplate', 'mobile', 'starter'],
    content:
      'Generate a React Native Boilerplate.\n\n**Tech:** React Native + {{nav}}.\n**Features:**\n1. **State:** Setup {{state}} for global state.\n2. **Nav:** Navigation structure (Auth Stack vs App Stack).\n3. **Theme:** Theming (Light/Dark).\n4. **API:** API Service layer (Axios).\n5. **Lint:** Pre-configured ESLint/Prettier.',
    variables: [
      {
        name: 'nav',
        description: 'The navigation library.',
        type: 'select',
        options: ['React Navigation', 'React Native Navigation'],
        required: true,
      },
      {
        name: 'state',
        description: 'The state management library.',
        type: 'select',
        options: ['Redux Toolkit', 'Zustand', 'MobX', 'Context API'],
        required: true,
      },
    ],
  },
  {
    title: 'Flutter Boilerplate',
    description: 'Clean architecture starter for Flutter.',
    category: 'Boilerplates & Dev Tools',
    tags: ['flutter', 'boilerplate', 'dart', 'mobile'],
    content:
      'Create a Flutter Boilerplate.\n\n**Architecture:** {{arch}}.\n**Features:**\n1. **State:** State management ({{stateLib}}).\n2. **DI:** Dependency Injection (GetIt).\n3. **API:** API Client (Dio).\n4. **Loc:** Localization (l10n) support.',
    variables: [
      {
        name: 'arch',
        description: 'The architectural pattern.',
        type: 'select',
        options: ['MVVM', 'Clean Architecture', 'MVC'],
        required: true,
      },
      {
        name: 'stateLib',
        description: 'The state management library.',
        type: 'select',
        options: ['BLoC', 'Riverpod', 'Provider', 'GetX'],
        required: true,
      },
    ],
  },
  {
    title: 'Electron Boilerplate',
    description: 'Cross-platform desktop starter with hot reload.',
    category: 'Boilerplates & Dev Tools',
    tags: ['electron', 'boilerplate', 'desktop', 'starter'],
    content:
      'Generate an Electron Boilerplate.\n\n**Tech:** Electron + {{ui}}.\n**Features:**\n1. **Proc:** Main/Renderer process structure.\n2. **IPC:** IPC (Inter-Process Communication) handlers.\n3. **Hot:** Hot reload setup.\n4. **Upd:** Updater (electron-updater).\n5. **Pack:** Packager config.',
    variables: [
      {
        name: 'ui',
        description: 'The UI framework.',
        type: 'select',
        options: ['React', 'Vue', 'Svelte', 'Plain HTML/JS'],
        required: true,
      },
    ],
  },
  {
    title: 'Next.js SaaS Boilerplate',
    description: 'Full-stack starter with Stripe, Auth, and DB.',
    category: 'Boilerplates & Dev Tools',
    tags: ['nextjs', 'saas', 'boilerplate', 'fullstack'],
    content:
      'Generate a Next.js SaaS Starter.\n\n**Features:**\n1. **Auth:** Auth ({{authProvider}}).\n2. **Pay:** Stripe Checkout integration.\n3. **DB:** Database ORM ({{orm}}).\n4. **UI:** Tailwind CSS + shadcn/ui.\n5. **Dash:** User Dashboard layout.',
    variables: [
      {
        name: 'authProvider',
        description: 'The authentication provider.',
        type: 'select',
        options: ['NextAuth', 'Clerk', 'Supabase Auth'],
        required: true,
      },
      {
        name: 'orm',
        description: 'The database ORM.',
        type: 'select',
        options: ['Prisma', 'Drizzle', 'TypeORM'],
        required: true,
      },
    ],
  },
  {
    title: 'Django Starter Kit',
    description: 'Opinionated starter for Django web apps.',
    category: 'Boilerplates & Dev Tools',
    tags: ['django', 'python', 'boilerplate', 'starter'],
    content:
      'Create a Django Starter.\n\n**Apps:** Users, Base.\n**Features:**\n1. **User:** Custom User model.\n2. **Async:** Celery setup for async tasks.\n3. **Docker:** Docker and Docker Compose files.\n4. **Prod:** Gunicorn/Nginx config for prod.\n5. **API:** DRF (Django Rest Framework) basic setup.',
    variables: [
      {
        name: 'frontend',
        description: 'The frontend integration.',
        type: 'select',
        options: [
          'None (Django Templates)',
          'Vue (via CDN)',
          'React (Separate)',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'Rails Starter Kit',
    description: 'Modern Rails boilerplate with Hotwire.',
    category: 'Boilerplates & Dev Tools',
    tags: ['rails', 'ruby', 'boilerplate', 'starter'],
    content:
      'Generate a Rails Starter.\n\n**Tech:** Rails {{version}}.\n**Features:**\n1. **Auth:** Devise for Auth.\n2. **Mail:** Action Mailer setup.\n3. **Test:** RSpec testing framework.\n4. **CSS:** Tailwind CSS via PostCSS.\n5. **Dock:** Docker support.',
    variables: [
      {
        name: 'version',
        description: 'The Rails version.',
        type: 'select',
        options: ['7.0', '6.1', '7.1'],
        required: true,
      },
    ],
  },
  {
    title: 'GraphQL Server Boilerplate',
    description: 'Headless CMS starter with GraphQL.',
    category: 'Boilerplates & Dev Tools',
    tags: ['graphql', 'node', 'boilerplate', 'backend'],
    content:
      'Create a GraphQL Server.\n\n**Tech:** Node.js + {{server}}.\n**Features:**\n1. **Schema:** Schema-first setup.\n2. **DB:** Prisma/Mongoose for DB.\n3. **Auth:** JWT Authentication.\n4. **Batch:** DataLoader for batching.\n5. **Play:** GraphQL Playground.',
    variables: [
      {
        name: 'server',
        description: 'The GraphQL server library.',
        type: 'select',
        options: [
          'Apollo Server',
          'Express + graphql-http',
          'Mercurius (Fastify)',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'Serverless Framework Boilerplate',
    description: 'AWS Lambda/Function starter.',
    category: 'Boilerplates & Dev Tools',
    tags: ['serverless', 'aws', 'lambda', 'boilerplate'],
    content:
      'Generate a Serverless Boilerplate.\n\n**Provider:** {{cloudProvider}}.\n**Features:**\n1. **Func:** Function handlers (HTTP and Event).\n2. **IaC:** Infrastructure as Code ({{iac}}).\n3. **Local:** Local environment emulation.\n4. **CI:** CI/CD pipeline examples.',
    variables: [
      {
        name: 'cloudProvider',
        description: 'The cloud provider.',
        type: 'select',
        options: ['AWS', 'Google Cloud', 'Azure'],
        required: true,
      },
      {
        name: 'iac',
        description: 'The Infrastructure as Code tool.',
        type: 'select',
        options: ['Serverless Framework', 'Terraform', 'Pulumi', 'SAM'],
        required: true,
      },
    ],
  },
  {
    title: 'WordPress Theme Boilerplate',
    description: 'Sage/Underscores style starter theme.',
    category: 'Boilerplates & Dev Tools',
    tags: ['wordpress', 'php', 'theme', 'boilerplate'],
    content:
      'Create a WP Theme Boilerplate.\n\n**Tech:** {{baseTheme}}.\n**Features:**\n1. **Build:** Build process ({{buildTool}}).\n2. **CSS:** CSS Framework ({{cssFramework}}).\n3. **Clean:** Clean markup (HTML5).\n4. **Func:** Useful functions.php hooks.',
    variables: [
      {
        name: 'baseTheme',
        description: 'The base theme to start from.',
        type: 'select',
        options: ['Underscores (_s)', 'Sage', 'Blankslate'],
        required: true,
      },
      {
        name: 'buildTool',
        description: 'The build tool.',
        type: 'select',
        options: ['Webpack', 'Vite', 'Gulp', 'None'],
        required: true,
      },
      {
        name: 'cssFramework',
        description: 'The CSS framework.',
        type: 'select',
        options: ['Tailwind CSS', 'Bootstrap', 'Bulma', 'None'],
        required: false,
      },
    ],
  },
];

export default promptTemplates;
