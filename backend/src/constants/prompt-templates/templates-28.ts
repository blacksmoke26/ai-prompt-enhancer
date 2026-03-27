/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import type { PromptTemplate } from './types';

const promptTemplates: PromptTemplate[] = [
  {
    title: 'Multi-Vendor Marketplace API',
    description:
      'API Gateway aggregating multiple external providers for a unified catalog.',
    category: 'E-commerce & Shopping',
    tags: ['api', 'aggregator', 'marketplace', 'graphql'],
    content:
      'Build a Multi-Vendor Aggregation API using {{backend}}.\n\n**Core Architecture:**\n1. Implement an API Gateway pattern.\n2. Create adapter interfaces for {{providers}} (Shopify, WooCommerce, Custom).\n3. Normalize data schemas (Product, Inventory, Price) into a unified model.\n4. Implement product search and filtering across all vendors simultaneously.\n5. Handle rate limiting per provider using {{rateLimiter}} to avoid throttling.',
    variables: [
      {
        name: 'backend',
        description: 'Backend Framework',
        type: 'select',
        options: ['NestJS', 'Express', 'Go'],
        required: true,
      },
      {
        name: 'providers',
        description: 'Source Platforms',
        type: 'multiselect',
        options: ['Shopify', 'Magento', 'WooCommerce', 'BigCommerce'],
        required: true,
      },
      {
        name: 'rateLimiter',
        description: 'Throttling Strategy',
        type: 'select',
        options: [
          'Redis Token Bucket',
          'Distributed Sliding Window',
          'In-Memory',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'Real-Time Collaborative Editor',
    description:
      'Google Docs style editor with OT/CRDT for simultaneous editing.',
    content:
      "Create a Real-Time Collaborative Editor.\n\n**Core Architecture:**\n1. Use {{crdt}} for conflict-free synchronization (e.g., Yjs or Automerge).\n2. Implement a WebSocket server using {{webSocket}} to broadcast operations.\n3. Frontend: Monaco or CodeMirror editor bound to the CRDT document.\n4. Awareness ({{awareness}}) to show other users' cursors.\n5. Presence indicators (Online, Offline).",
    category: 'Technology & SaaS',
    tags: ['collab', 'ot', 'crdt', 'websocket'],
    variables: [
      {
        name: 'crdt',
        description: 'Conflict Resolution Strategy',
        type: 'select',
        options: ['Yjs', 'Automerge', 'ShareDB'],
        required: true,
      },
      {
        name: 'webSocket',
        description: 'WebSocket Implementation',
        type: 'select',
        options: ['Socket.io', 'Raw WebSocket', 'WebRTC DataChannels'],
        required: true,
      },
      {
        name: 'awareness',
        description: 'User Presence Library',
        type: 'select',
        options: ['Y-Awareness', 'WebRTC Provider', 'Custom Presence'],
        required: false,
      },
    ],
  },
  {
    title: 'PWA Push Notification Service',
    description:
      'System for managing push notifications for PWA and native apps.',
    content:
      'Build a Push Notification Service.\n\n**Core Architecture:**\n1. Generate VAPID keys for Web Push.\n2. Store subscriptions ({{db}}) mapped to Users.\n3. Support sending to {{platforms}} (Web, APNs, FCM).\n4. Implement Queuing for high-volume sending.\n5. Retry logic with exponential backoff.\n6. Payload validation (JSON).',
    category: 'Web & Mobile',
    tags: ['pwa', 'push', 'notifications', 'queue'],
    variables: [
      {
        name: 'db',
        description: 'Subscription Storage',
        type: 'select',
        options: ['PostgreSQL', 'MongoDB', 'Redis'],
        required: true,
      },
      {
        name: 'platforms',
        description: 'Target Platforms',
        type: 'multiselect',
        options: ['Web Push', 'iOS', 'Android'],
        required: true,
      },
    ],
  },
  {
    title: 'Advanced Analytics Dashboard',
    description:
      'Core Metrics visualization with cohort analysis and funnel tracking.',
    content:
      'Create an Analytics Dashboard.\n\n**Core Architecture:**\n1. Ingest events via {{ingestMethod}} (Pixel or SDK).\n2. Data aggregation using {{db}}.\n3. Visualize: Retention (Cohort Analysis), Funnels, Session Replay.\n4. Real-time active users graph using WebSocket.\n5. Export data to CSV/SQL.',
    category: 'Data & Analytics',
    tags: ['analytics', 'cohort', 'dashboard', 'realtime'],
    variables: [
      {
        name: 'ingestMethod',
        description: 'Data Collection Method',
        type: 'select',
        options: ['Beacon API', 'XMLHttpRequest', 'Server-Side Tracking'],
        required: true,
      },
      {
        name: 'db',
        description: 'Time-Series Database',
        type: 'select',
        options: ['ClickHouse', 'TimescaleDB', 'Elasticsearch'],
        required: true,
      },
    ],
  },
  {
    title: 'Event-Driven Microservices',
    description: 'Backend architecture using Event Sourcing and CQRS.',
    content:
      'Design an Event-Driven Microservices System.\n\n**Core Architecture:**\n1. Event Bus implementation ({{messageBroker}}).\n2. Event Store to persist immutable events.\n3. CQRS: Separate Read Models (Projections) from Write Models.\n4. Services: OrderService (Write), ShippingService (Read), NotificationService (Side-Effect).\n5. Saga pattern for distributed transaction management.',
    category: 'Backend Architecture',
    tags: ['event-sourcing', 'cqrs', 'microservices', 'kafka'],
    variables: [
      {
        name: 'messageBroker',
        description: 'Messaging Technology',
        type: 'options',
        options: ['RabbitMQ', 'Apache Kafka', 'Redis Streams', 'NATS'],
        required: true,
      },
    ],
  },
  {
    title: 'API Versioning Strategy',
    description: 'Handling multiple API versions (v1, v2) gracefully.',
    content:
      'Implement API Versioning.\n\n**Core Architecture:**\n1. Strategy: {{strategy}} (URI Versioning vs Header Versioning).\n2. Middleware to detect version.\n3. Version-specific routing (e.g., `/v1/resource`).\n4. Deprecation policy headers (Sunset header).\n5. Adapter pattern to transform data between versions.\n6. Documentation via {{docFormat}}.',
    category: 'Backend Architecture',
    tags: ['api', 'versioning', 'backward-compatibility', 'rest'],
    variables: [
      {
        name: 'strategy',
        description: 'Versioning Method',
        type: 'select',
        options: ['URI Path', 'Query Parameter', 'Header'],
        required: true,
      },
      {
        name: 'docFormat',
        description: 'Documentation Type',
        type: 'select',
        options: ['OpenAPI/Swagger', 'API Blueprint', 'RAML'],
        required: false,
      },
    ],
  },
  {
    title: 'Headless CMS Integration',
    description: 'Connecting frontend to Contentful/Sanity/Strapi.',
    content:
      'Build a Headless CMS frontend.\n\n**Core Architecture:**\n1. Connect to CMS API using {{cmsProvider}}.\n2. Fetch content types and map to components.\n3. Implement Preview Mode for editors ({{previewMode}}).\n4. Image optimization (Next/Image or CMS API).\n5. Static Site Generation (SSG) for performance.\n6. Incremental Static Regeneration (ISR) support.',
    category: 'Frontend',
    tags: ['headless', 'cms', 'ssg', 'nextjs'],
    variables: [
      {
        name: 'cmsProvider',
        description: 'CMS Provider',
        type: 'select',
        options: ['Contentful', 'Sanity.io', 'Strapi', 'Contentstack'],
        required: true,
      },
      {
        name: 'previewMode',
        description: 'Preview Handling',
        type: 'boolean',
        required: false,
      },
    ],
  },
  {
    title: 'OAuth 2.0 / OIDC Provider',
    description: 'Secure Identity Provider implementation.',
    content:
      'Create an OAuth 2.0 Identity Provider.\n\n**Core Architecture:**\n1. Authorization Code Flow (PKCE support for mobile).\n2. JWT ID Token generation with {{signingAlgo}}.\n3. JWKS (JSON Web Key Set) endpoint.\n4. OpenID Connect (UserInfo, Discovery).\n5. Scopes and Claims management.\n6. Refresh token rotation.',
    category: 'Security',
    tags: ['oauth', 'openid', 'jwt', 'identity'],
    variables: [
      {
        name: 'signingAlgo',
        description: 'Signing Algorithm',
        type: 'select',
        options: ['RS256', 'ES256', 'EdDSA'],
        required: true,
      },
    ],
  },
  {
    title: 'Resumable File Upload (TUS Protocol)',
    description: 'Chunked upload handling for large files.',
    content:
      'Create a Resumable Upload API.\n\n**Core Architecture:**\n1. Implement TUS protocol ({{serverLib}}) for chunking.\n2. File Concatenation logic.\n3. Verification of file integrity (Hash check).\n4. Expiry of incomplete uploads ({{expiry}}).\n5. Virus scanning integration (Async).\n6. Progress tracking via WebSocket.',
    category: 'Backend & Storage',
    tags: ['upload', 'tus', 'chunks', 'scalability'],
    variables: [
      {
        name: 'serverLib',
        description: 'TUS Server Library',
        type: 'select',
        options: ['tus-node-server', 'tusd', 'Custom'],
        required: true,
      },
      {
        name: 'expiry',
        description: 'Upload Expiry Time',
        type: 'string',
        defaultValue: '24h',
        required: false,
      },
    ],
  },
  {
    title: 'In-App Review Prompting',
    description: 'Logic to prompt users for reviews after purchases/usage.',
    content:
      'Build an In-App Review System.\n\n**Core Architecture:**\n1. Define Triggers: {{triggers}} (e.g., Nth launch, Days after purchase).\n2. Integration with {{platform}} Store SDK.\n3. Graceful decline logic.\n4. Delay mechanism ({{delay}}).\n5. Redirect to Store Rating form.',
    category: 'Mobile',
    tags: ['review', 'app-store', 'ratings', 'mobile'],
    variables: [
      {
        name: 'triggers',
        description: 'Review Triggers',
        type: 'multiselect',
        options: ['Successful Launch', '3 Days Install', 'Purchase'],
        required: true,
      },
      {
        name: 'platform',
        description: 'Mobile OS',
        type: 'select',
        options: ['iOS', 'Android'],
        required: true,
      },
      {
        name: 'delay',
        description: 'Min Delay',
        type: 'number',
        defaultValue: 3,
        required: false,
      },
    ],
  },
  {
    title: 'Dynamic Pricing Engine',
    description: 'Rule-based and ML-based pricing adjustment.',
    content:
      'Create a Pricing Engine Microservice.\n\n**Core Architecture:**\n1. Price Rules Engine (Seasonality, Competitor pricing).\n2. Inputs: User Context ({{context}}), Product ID.\n3. Output: Final Price, Discount Code Applied.\n4. Audit Trail for price changes.\n5. Integration with {{stripe}}.',
    category: 'FinTech & SaaS',
    tags: ['pricing', 'engine', 'rules', 'subscriptions'],
    variables: [
      {
        name: 'context',
        description: 'Input Parameters',
        type: 'multiselect',
        options: ['User Type', 'Location', 'Referral Source', 'Time of Day'],
        required: true,
      },
      {
        name: 'stripe',
        description: 'Payment Provider',
        type: 'select',
        options: ['Stripe Billing', 'Adyen', 'Braintree'],
        required: true,
      },
    ],
  },
  {
    title: 'Subscription Billing Engine',
    description: 'Handle recurring billing, pro-ration, and dunning.',
    content:
      'Create a Subscription Billing System.\n\n**Core Architecture:**\n1. Plan management (Monthly/Annual).\n2. Cycle logic (Billing Anchor Date).\n3. Pro-ration calculations for mid-cycle changes.\n4. Dunning (Retry failed payments) using {{retries}}.\n5. Invoicing PDF generation.\n6. Webhook handling for payment events.',
    category: 'FinTech & SaaS',
    tags: ['billing', 'subscription', 'recurring', 'invoicing'],
    variables: [
      {
        name: 'retries',
        description: 'Max Retry Attempts',
        type: 'number',
        defaultValue: 5,
        required: false,
      },
    ],
  },
  {
    title: 'Email Templating Engine',
    description: 'Liquid/Jinja template rendering for transactional emails.',
    content:
      'Build an Email Template System.\n\n**Core Architecture:**\n1. Template Engine: {{engine}} (e.g., Handlebars, Liquid).\n2. Variable interpolation (Name, Date, InvoiceID).\n3. Layout inheritance (Header/Footer).\n4. A/B Testing of subject lines.\n5. Inline CSS and Image embedding support.',
    category: 'Communication',
    tags: ['email', 'templates', 'marketing', 'transactional'],
    variables: [
      {
        name: 'engine',
        description: 'Template Library',
        type: 'select',
        options: ['Handlebars', 'Liquid (Shopify)', 'Jinja2', 'MJML'],
        required: true,
      },
    ],
  },
  {
    title: 'Content Delivery Network (CDN) Manager',
    description: 'Control caching, purging, and invalidation.',
    content:
      'Create a CDN Management Interface.\n\n**Core Architecture:**\n1. Connect to {{provider}} API.\n2. Purge specific URLs or Wildcard.\n3. Cache rule management (QueryString args, Headers).\n4. WAF (Web App Firewall) configuration via CDN.\n5. Tokenized URL generation for private content.',
    category: 'DevOps',
    tags: ['cdn', 'caching', 'performance', 'security'],
    variables: [
      {
        name: 'provider',
        description: 'CDN Provider',
        type: 'select',
        options: ['Cloudflare', 'Fastly', 'Akamai', 'AWS CloudFront'],
        required: true,
      },
    ],
  },
  {
    title: 'Form Builder with Dynamic Validation',
    description: 'Drag-and-drop form generator with Zod/Yup validation.',
    content:
      'Create a Form Builder.\n\n**Core Architecture:**\n1. Palette of fields (Text, Select, Multi-Select, Date).\n2. Canvas drop zone ({{dragLib}}).\n3. Schema generation based on fields.\n4. Validation Schema export: {{validation}}.\n5. Form Preview mode.',
    category: 'Frontend',
    tags: ['forms', 'builder', 'drag-drop', 'validation'],
    variables: [
      {
        name: 'dragLib',
        description: 'Drag and Drop Lib',
        type: 'select',
        options: ['dnd-kit', 'react-beautiful-dnd', 'muuri'],
        required: true,
      },
      {
        name: 'validation',
        description: 'Validation Library',
        type: 'select',
        options: ['Zod', 'Yup', 'Joi', 'Formik'],
        required: true,
      },
    ],
  },
  {
    title: 'Chatbot with NLU (Natural Language Understanding)',
    description: 'Intent recognition and entity extraction bot.',
    content:
      'Build an NLU Chatbot.\n\n**Core Architecture:**\n1. Intent Classifier (Intentions/Dialogflow/Custom).\n2. Entity Extractor (Dates, Locations, Numbers).\n3. Dialog Manager (State Machine).\n4. Context retention across turns.\n5. Smalltalk integration for answering.',
    category: 'AI & LLMs',
    tags: ['nlu', 'chatbot', 'intent', 'dialogflow'],
    variables: [
      {
        name: 'engine',
        description: 'Core NLU Engine',
        type: 'select',
        options: ['Microsoft LUIS', 'Google Dialogflow', 'Rasa NLU', 'Wit.ai'],
        required: true,
      },
    ],
  },
  {
    title: 'Voice Assistant Interface',
    description: 'Wake word, STT, and TTS pipeline.',
    content:
      'Create a Voice Assistant Interface.\n\n**Core Architecture:**\n1. Wake Word Detection ({{wakeWord}}).\n2. Speech-to-Text using {{stt}}.\n3. Processing via {{nlu}}.\n4. Text-to-Speech ({{tts}}) for response.\n5. Audio visualizer (Waveform).',
    category: 'Audio & Voice',
    tags: ['voice', 'stt', 'tts', 'assistant'],
    variables: [
      {
        name: 'stt',
        description: 'Speech Recognition',
        type: 'select',
        options: ['Web Speech API', 'Google Cloud Speech', 'Whisper (Local)'],
        required: true,
      },
      {
        name: 'tts',
        description: 'Speech Synthesis',
        type: 'select',
        options: ['Web Speech API', 'Amazon Polly', 'Google TTS'],
        required: true,
      },
      {
        name: 'wakeWord',
        description: 'Custom Wake Word',
        type: 'string',
        required: false,
      },
    ],
  },
  {
    title: 'Augmented Reality Web App',
    description: 'WebXR experience for mobile or desktop browsers.',
    content:
      'Create an AR Web Experience.\n\n**Core Architecture:**\n1. Use {{framework}}.\n2. Hit Testing (Raycasting via {{raycaster}}).\n3. Asset loading ({{loader}}) for models/textures.\n4. Controller support ({{controller}}).\n5. Handheld/Immersive mode toggling.',
    category: 'Graphics & AR',
    tags: ['webxr', 'ar', 'vr', 'threejs'],
    variables: [
      {
        name: 'framework',
        description: 'WebXR Lib',
        type: 'select',
        options: ['A-Frame', 'React-Three-Fiber', 'Babylon.js'],
        required: true,
      },
      {
        name: 'raycaster',
        description: 'Raycasting Lib',
        type: 'select',
        options: ['Three.js Native', 'Three-Raycaster'],
        required: true,
      },
      {
        name: 'controller',
        description: 'Controller Hardware',
        type: 'select',
        options: ['Gamepad', 'Touch', 'None'],
        required: true,
      },
    ],
  },
  {
    title: 'WebGL 2D Physics Engine',
    description: 'Physics simulation using Matter.js or Box2D.',
    content:
      'Create a Physics Simulation.\n\n**Core Architecture:**\n1. Setup {{engine}} world.\n2. Create Bodies (Bodies from JS Objects).\n3. Render loop using {{rendering}}.\n4. Interaction (Mouse Drag/Throw).\n5. Material properties (Restitution, Friction).',
    category: 'Graphics & Physics',
    tags: ['physics', '2d', 'simulation', 'engine'],
    variables: [
      {
        name: 'engine',
        description: 'Physics Engine',
        type: 'select',
        options: ['Matter.js', 'Planck.js', 'Box2D'],
        required: true,
      },
      {
        name: 'rendering',
        description: 'Renderer Lib',
        type: 'select',
        options: ['Matter.Render', 'Planck.Render', 'Custom Canvas'],
        required: true,
      },
    ],
  },
  {
    title: 'Multi-Tenant Database Schema',
    description: 'Schema design for SaaS multi-tenancy.',
    content:
      'Design a Multi-Tenant Database.\n\n**Core Architecture:**\n1. Strategy: {{strategy}} (Shared DB vs Shared Schema vs Separate DB).\n2. Tenant ID in every query/join.\n3. Row-Level Security (RLS) logic.\n4. Data Migration handling for new tenants.\n5. Connection pooling per tenant.',
    category: 'Database',
    tags: ['multi-tenancy', 'saas', 'security', 'database'],
    variables: [
      {
        name: 'strategy',
        description: 'Isolation Strategy',
        type: 'select',
        options: [
          'Shared Database (Discriminator Column)',
          'Shared Schema (Schema Per Tenant)',
          'Database Per Tenant',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'Audit Log Microservice',
    description: 'Immutable audit log for compliance.',
    content:
      'Create an Audit Log Service.\n\n**Core Architecture:**\n1. Immutable log entries (Insert Only).\n2. Event Schema (Actor, Action, Target, Timestamp, Result).\n3. Cryptographic Signature of logs for tamper evidence.\n4. Search by Date/Actor.\n5. Export to Audit Trail file.',
    category: 'Security & Compliance',
    tags: ['audit', 'compliance', 'security', 'logs'],
    variables: [
      {
        name: 'hash',
        description: 'Signing Hash',
        type: 'select',
        options: ['SHA-256', 'HMAC-SHA512'],
        required: true,
      },
    ],
  },
  {
    title: 'Configuration Server',
    description: 'Centralized configuration with hot-reloading.',
    content:
      'Create a Config Server.\n\n**Core Architecture:**\n1. Store configuration in {{backend}}.\n2. Watch for changes using {{watcher}}.\n3. Push updates to clients via WebSocket/Long-Polling.\n4. Versioning (E-Tag).\n5. Encryption of sensitive values.',
    category: 'DevOps & Architecture',
    tags: ['config-server', 'centralized', 'microservices'],
    variables: [
      {
        name: 'backend',
        description: 'Storage Backend',
        type: 'select',
        options: ['Git Repository', 'ZooKeeper', 'Consul', 'Etcd'],
        required: true,
      },
    ],
  },
  {
    title: 'Circuit Breaker Dashboard',
    description:
      'Visualizing Circuit Breaker states (Open, Half-Open, Closed).',
    content:
      'Create a Circuit Breaker Manager.\n\n**Core Architecture:**\n1. Circuit State Machine (State: Closed -> Open -> Half-Open).\n2. Failure Threshold configuration.\n3. Timeout settings.\n4. Manual Override (Open/Close).',
    category: 'Resilience & Monitoring',
    tags: ['circuit-breaker', 'resilience', 'hystrix', 'dashboard'],
    variables: [
      {
        name: 'failureThreshold',
        description: 'Failures before open',
        type: 'number',
        defaultValue: 5,
      },
    ],
  },
  {
    title: 'Distributed Lock Manager',
    description: 'Redis Redlock or Etcd Lease implementation.',
    content:
      'Create a Distributed Lock Manager.\n\n**Core Architecture:**\n1. Lock acquisition logic.\n2. Auto-renewal (Heartbeats). \n3. Release logic.\n4. Handling network partitions.\n5. Lease expiration safety (TTL).',
    category: 'Distributed Systems',
    tags: ['locks', 'redis', 'etcd', 'consistency'],
    variables: [
      {
        name: 'storage',
        description: 'Lock Backend',
        type: 'select',
        options: ['Redis (Redlock)', 'ZooKeeper', 'Etcd'],
        required: true,
      },
    ],
  },
  {
    title: 'Idempotency Key Manager',
    description: 'Idempotency-Key-Redis-Store pattern for API.',
    content:
      'Implement Idempotency Keys.\n\n**Core Architecture:**\n1. Middleware to extract `Idempotency-Key` header.\n2. Check if key exists in Cache ({{store}}).\n3. If exists, return cached response.\n4. If not, execute and save response.',
    category: 'API Design',
    tags: ['idempotency', 'redis', 'http', 'rest'],
    variables: [
      {
        name: 'store',
        description: 'Cache Store',
        type: 'select',
        options: ['Redis', 'Memcached', 'In-Memory'],
        required: true,
      },
    ],
  },
  {
    title: 'Message Queue Dead Letter Queue (DLQ)',
    description: 'Handling poison messages and reprocessing.',
    content:
      'Implement a Dead Letter Queue strategy.\n\n**Core Architecture:**\n1. Main Queue: {{mainQueue}}.\n2. Max Retry Policy.\n3. Failure Handler (Log error -> DLQ).\n4. DLQ Analysis Tool.\n5. Manual Reprocess Workflow.',
    category: 'Messaging',
    tags: ['dlq', 'rabbitmq', 'sqs', 'retry'],
    variables: [
      {
        name: 'mainQueue',
        description: 'Main Queue Name',
        type: 'string',
        required: true,
      },
    ],
  },
  {
    title: 'API Gateway (Backend for Frontend)',
    description: 'Aggregator with composition of microservices.',
    content:
      'Build an API Gateway (BFF).\n\n**Core Architecture:**\n1. Routing to microservices based on path ({{services}}).\n2. Aggregation of data from multiple services.\n3. Cross-cutting concerns: Auth, Logging.\n4. Rate limiting per User/IP.\n5. Response caching.',
    category: 'Microservices',
    tags: ['gateway', 'bff', 'aggregation', 'routing'],
    variables: [
      {
        name: 'services',
        description: 'Backend Services',
        type: 'multiselect',
        options: ['User', 'Order', 'Product', 'Payment'],
        required: true,
      },
    ],
  },
  {
    title: 'Rate Limiter (Token Bucket)',
    description: 'Distributed rate limiting with Redis Lua scripts.',
    content:
      'Implement a Distributed Rate Limiter.\n\n**Core Architecture:**\n1. Token Bucket algorithm.\n2. Redis Lua script for atomic operations.\n3. Sliding Window support.\n4. Refill rate.\n5. Response Headers (X-RateLimit-Limit).',
    category: 'Security & Performance',
    tags: ['rate-limiting', 'redis', 'security', 'lua'],
    variables: [
      {
        name: 'refillRate',
        description: 'Refill Rate',
        type: 'string',
        defaultValue: '1/s',
        required: true,
      },
    ],
  },
  {
    title: 'Kubernetes Operator Controller',
    description: 'Custom K8s controller managing CRDs.',
    content:
      'Develop a Kubernetes Operator using {{framework}}.\n\n**Core Architecture:**\n1. Custom Resource Definition (CRD).\n2. Controller Reconciliation Loop (Reconcile Loop).\n3. Watcher pattern on Pods/Services.\n4. Finalizer logic.\n5. Status subresource.',
    category: 'Infrastructure',
    tags: ['kubernetes', 'operator', 'golang', 'crd'],
    variables: [
      {
        name: 'framework',
        description: 'Operator Framework',
        type: 'select',
        options: ['Kubebuilder', 'Operator SDK (Golang)', 'Kopf (Python)'],
        required: true,
      },
    ],
  },
  {
    title: 'Helm 3 Chart',
    description: 'Packaging complex K8s apps for Helm.',
    content:
      'Create a Helm 3 Chart.\n\n**Core Architecture:**\n1. Chart.yaml metadata.\n2. Values schema.\n3. Templates for Deployments/Services/Ingress.\n4. Hooks (Post-Install, Pre-Upgrade).\n5. Tests (Helm Test).',
    category: 'Infrastructure',
    tags: ['helm', 'kubernetes', 'packaging', 'charts'],
    variables: [
      {
        name: 'chartType',
        description: 'Chart Type',
        type: 'select',
        options: ['Application', 'Library'],
        required: true,
      },
    ],
  },
  {
    title: 'Terraform Provider Plugin',
    description: 'Custom provider for managing external resources.',
    content:
      'Develop a Terraform Provider.\n\n**Core Architecture:**\n1. Schemas definition ({{resourceType}}).\n2. CRUD operations: Create, Read, Update, Delete.\n3. State management.\n4. Import functionality.',
    category: 'Infrastructure as Code',
    tags: ['terraform', 'provider', 'plugin', 'iac'],
    variables: [
      {
        name: 'resourceType',
        description: 'Managed Resource',
        type: 'string',
        required: true,
      },
    ],
  },
  {
    title: 'Service Mesh Virtualization',
    description: 'Traffic routing, splitting, and telemetry (Envoy/Istio).',
    content:
      'Implement Service Mesh configuration.\n\n**Core Architecture:**\n1. VirtualServices for versioning.\n2. Destination Rules.\n3. Traffic Splitting (90/10 for Canary).\n4. Circuit Breaking in Mesh.\n5. Observability (Traces/Metrics).',
    category: 'DevOps',
    tags: ['service-mesh', 'istio', 'envoy', 'traffic'],
    variables: [
      {
        name: 'provider',
        description: 'Mesh Provider',
        type: 'select',
        options: ['Istio', 'Linkerd', 'Consul Connect'],
        required: true,
      },
    ],
  },
  {
    title: 'Observability Platform (OpenTelemetry)',
    description: 'Collecting Traces, Metrics, and Logs.',
    content:
      'Create an Observability Collector.\n\n**Core Architecture:**\n1. Collector Endpoint (OTLP HTTP).\n2. Export to {{backend}}.\n3. Trace linking (Trace ID propagation).\n4. Visualization (Tempo/Grafana).\n5. Alarm management.',
    category: 'Monitoring',
    tags: ['telemetry', 'opentelemetry', 'traces', 'metrics'],
    variables: [
      {
        name: 'backend',
        description: 'Storage Backend',
        type: 'select',
        options: ['ClickHouse', 'Elasticsearch', 'Prometheus'],
        required: true,
      },
    ],
  },
  {
    title: 'Log Parsing (ELK Stack)',
    description: 'Parsing unstructured logs to JSON.',
    content:
      'Create a Log Parser.\n\n**Core Architecture:**\n1. Input File format ({{format}}).\n2. Grok patterns ({{parser}}) for extraction.\n3. Visual Editor for creating patterns.\n4. Test parser against logs.\n5. Output JSON structure.',
    category: 'Logging',
    tags: ['elk', 'logstash', 'grok', 'parsing'],
    variables: [
      {
        name: 'format',
        description: 'Input Log Format',
        type: 'select',
        options: ['Apache', 'Nginx', 'Generic', 'Syslog'],
        required: true,
      },
      {
        name: 'parser',
        description: 'Parser Engine',
        type: 'select',
        options: ['Grok', 'Regex', 'Dissect', 'CSV'],
        required: true,
      },
    ],
  },
  {
    title: 'Error Tracking Service',
    description: 'Source Map support and crash reporting.',
    content:
      'Build an Error Tracking Service.\n\n**Core Architecture:**\n1. Client SDKs for {{platforms}}.\n2. Source Map parsing to de-minify stack traces.\n3. Breadcrumb collection (User path before error).\n4. Release association.\n5. Issue grouping (Fingerprinting).',
    category: 'Monitoring',
    tags: ['sentry', 'crash-reporting', 'bugtracking', 'devtools'],
    variables: [
      {
        name: 'platforms',
        description: 'Supported SDKs',
        type: 'multiselect',
        options: ['React', 'Node.js', 'Python', 'Browser JS'],
        required: true,
      },
    ],
  },
  {
    title: 'Feature Flag System',
    description: 'Percentage rollouts and user segmentation.',
    content:
      'Create a Feature Flag System.\n\n**Core Architecture:**\n1. Flag Management (Boolean/Percentage).\n2. Segment targeting ({{segmentation}}).\n3. SDK fetch logic ({{fetching}}).\n4. UI for toggles.\n5. Audit log of flag changes.',
    category: 'DevTools',
    tags: ['feature-flags', 'rollout', 'segmentation'],
    variables: [
      {
        name: 'segmentation',
        description: 'User Attributes',
        type: 'multiselect',
        options: ['Country', 'Email Domain', 'User ID', 'Device Type'],
        required: true,
      },
      {
        name: 'fetching',
        description: 'Fetch Strategy',
        type: 'select',
        options: ['Polling', 'WebSocket', 'Edge Request'],
        required: true,
      },
    ],
  },
  {
    title: 'A/B Testing Framework',
    description: 'Split testing traffic for conversion.',
    content:
      'Build an A/B Testing Framework.\n\n**Core Architecture:**\n1. Experiment creation.\n2. Variants (Control vs Variant).\n3. Allocation strategy ({{strategy}}).\n4. Statistical significance calculator.\n5. Data export for analysis.',
    category: 'Marketing & Tools',
    tags: ['ab-testing', 'conversion', 'marketing', 'analytics'],
    variables: [
      {
        name: 'strategy',
        description: 'Allocation Logic',
        type: 'select',
        options: ['Hashing User ID', 'Cookie Based', 'Header Based'],
        required: true,
      },
    ],
  },
  {
    title: 'Headless Browser Pool',
    description: 'Managing Puppeteer/Playwright for scraping.',
    content:
      'Create a Browser Pool.\n\n**Core Architecture:**\n1. Pre-spawn browsers ({{poolSize}}).\n2. Context/Session isolation.\n3. Request Queue.\n4. Page reuse (Clear Cookies/Storage).\n5. Health check for zombie processes.',
    category: 'Web Scraping',
    tags: ['headless', 'puppeteer', 'scraping', 'pool'],
    variables: [
      {
        name: 'poolSize',
        description: 'Max Instances',
        type: 'number',
        defaultValue: 5,
        required: true,
      },
      {
        name: 'engine',
        description: 'Browser Engine',
        type: 'select',
        options: ['Chromium', 'Firefox', 'WebKit'],
        required: true,
      },
    ],
  },
  {
    title: 'Web Scraper with Rotation',
    description: 'Rotating User-Agents and Proxies.',
    content:
      'Build a Robust Scraper.\n\n**Core Architecture:**\n1. User-Agent rotation from list.\n2. Proxy rotation via {{proxyList}}.\n3. HTTP headers mimicry ({{headers}}).\n4. Rate limiting / Politeness ({{politeDelay}}).\n5. Fingerprint avoidance ({{avoidance}}).',
    category: 'Web Scraping',
    tags: ['scraper', 'proxy', 'bot', 'rotator'],
    variables: [
      {
        name: 'politeDelay',
        description: 'Delay per request',
        type: 'string',
        defaultValue: '2s',
        required: true,
      },
      {
        name: 'avoidance',
        description: 'Anti-Detection',
        type: 'multiselect',
        options: ['Canvas Fingerprinting', 'AudioContext', 'WebGL'],
        required: false,
      },
    ],
  },
  {
    title: 'Sitemap Generator API',
    description: 'Handling Video Sitemaps and Multi-language.',
    content:
      'Create a Sitemap Generator.\n\n**Core Architecture:**\n1. Index URL generation ({{pattern}}).\n2. Video sitemaps ({{videoSpec}}) for MRSS.\n3. Image sitemaps.\n4. Multi-language locales ({{locales}}).\n5. GZIP compression.',
    category: 'SEO',
    tags: ['sitemap', 'xml', 'seo', 'video'],
    variables: [
      {
        name: 'pattern',
        description: 'URL Structure',
        type: 'string',
        defaultValue: '/{category}/{page}',
        required: true,
      },
      {
        name: 'videoSpec',
        description: 'Video Sitemap Spec',
        type: 'select',
        options: ['Media RSS', 'Google Video', 'Yandex'],
        required: false,
      },
      {
        name: 'locales',
        description: 'Languages',
        type: 'multiselect',
        options: ['en', 'es', 'fr', 'de'],
        required: false,
      },
    ],
  },
  {
    title: 'Robots.txt Validator',
    description: 'Validating rules and crawl-delay.',
    content:
      'Create a Robots.txt Validator.\n\n**Core Architecture:**\n1. Parser for {{standard}}.\n2. Rule checking (Allow vs Disallow).\n3. Priority interpretation.\n4. Crawl-delay calculation.\n5. Visual Editor.',
    category: 'SEO',
    tags: ['robots', 'crawlers', 'seo', 'audit'],
    variables: [
      {
        name: 'standard',
        description: 'Parser Spec',
        type: 'select',
        options: ['Standard RFC', 'Google Extended'],
        required: true,
      },
    ],
  },
  {
    title: 'RSS/Atom Feed Aggregator',
    description: 'Consuming feeds and normalizing.',
    content:
      'Build an RSS/Atom Aggregator.\n\n**Core Architecture:**\n1. Fetch feeds list ({{feeds}}).\n2. Parse XML (RSS 2.0 / Atom).\n3. Content Normalization (Sanitize HTML).\n4. Publish-Hububub compatibility.\n5. Update interval (Cron).',
    category: 'APIs',
    tags: ['rss', 'atom', 'feed', 'aggregator'],
    variables: [
      {
        name: 'feeds',
        description: 'Feed URLs',
        type: 'textarea',
        required: true,
      },
    ],
  },
  {
    title: 'JSON-LD Generator Tool',
    description: 'Generating structured data for Rich Results.',
    content:
      'Create a JSON-LD Builder.\n\n**Core Architecture:**\n1. Select {{type}} (SoftwareApplication, Person, Event).\n2. Input fields ({{fields}}).\n3. Nesting support.\n4. Validation against Schema.org.\n5. `@id` and `@context` management.',
    category: 'SEO',
    tags: ['json-ld', 'schema.org', 'rich-results', 'seo'],
    variables: [
      {
        name: 'type',
        description: 'Schema Type',
        type: 'select',
        options: [
          'Article',
          'Book',
          'Event',
          'Organization',
          'Product',
          'Person',
        ],
        required: true,
      },
      {
        name: 'fields',
        description: 'Required Properties',
        type: 'textarea',
        required: true,
      },
    ],
  },
  {
    title: 'Open Graph Preview Tool',
    description: 'Previewing cards for social platforms.',
    content:
      'Create an OG Previewer.\n\n**Core Architecture:**\n1. Input URL.\n2. Fetch HTML.\n3. Extract Meta tags.\n4. Preview: {{platform}}.\n5. Debug mode (Missing tags, Warnings).',
    category: 'SEO & Social',
    tags: ['opengraph', 'social', 'preview', 'debug'],
    variables: [
      {
        name: 'platform',
        description: 'Social Platform',
        type: 'select',
        options: ['Facebook', 'LinkedIn', 'Twitter/X', 'Google'],
        required: true,
      },
    ],
  },
  {
    title: 'Canonical URL Manager',
    description: 'Avoiding duplicate content issues.',
    content:
      'Create a Canonical Manager.\n\n**Core Architecture:**\n1. URL Parameter handling ({{strategy}}).\n2. Logic: Sort params -> Canonical URL.\n3. Pagination logic ({{pagination}).\n4. Self-referencing links.\n5. Cross-domain canonicals.',
    category: 'SEO',
    tags: ['canonical', 'duplication', 'seo', 'link-structure'],
    variables: [
      {
        name: 'strategy',
        description: 'Param Strategy',
        type: 'select',
        options: ['Sort Params', 'No Follow', 'Keep Params'],
        required: true,
      },
      {
        name: 'pagination',
        description: 'Pagination Type',
        type: 'select',
        options: ['Offset/Limit', 'Cursor', 'Keyset'],
        required: false,
      },
    ],
  },
  {
    title: 'Schema Markup Tester',
    description: 'Testing structured data validation.',
    content:
      'Create a Schema Tester.\n\n**Core Architecture:**\n1. Extract JSON-LD/Microdata from URL.\n2. Validate against {{validator}}.\n3. Visual Highlighting of errors.\n4. Rich Results preview (Google Preview).',
    category: 'SEO',
    tags: ['schema', 'validator', 'json-ld', 'microdata'],
    variables: [
      {
        name: 'validator',
        description: 'Validation Tool',
        type: 'select',
        options: [
          'Google Rich Results Test',
          'Schema.org Validator',
          'Microdata Linter',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'Mobile Biometric Auth',
    description: 'TouchID/FaceID integration with fallback.',
    content:
      'Create a Biometric Auth Module.\n\n**Core Architecture:**\n1. {{os}} Native implementation.\n2. Local Keychain/Keystore storage ({{storage}}).\n3. Biometric prompt logic.\n4. Fallback to PIN/Password.\n5. FaceID Local Authentication check.',
    category: 'Mobile',
    tags: ['biometric', 'touchid', 'faceid', 'security'],
    variables: [
      {
        name: 'os',
        description: 'Mobile OS',
        type: 'select',
        options: ['iOS', 'Android'],
        required: true,
      },
      {
        name: 'storage',
        description: 'Secure Store',
        type: 'select',
        options: ['Keychain', 'Encrypted SQLite', 'KeyStore'],
        required: true,
      },
    ],
  },
  {
    title: 'Offline-First Mobile App (Sync)',
    description: 'WatermelonDB/PouchDB with queue.',
    content:
      'Create an Offline-First App.\n\n**Core Architecture:**\n1. Local DB: {{db}}.\n2. Sync Queue (Outbox).\n3. Conflict resolution (Last Write Wins).\n4. Background Sync ({{worker}}).\n5. Connectivity monitoring.',
    category: 'Mobile',
    tags: ['offline', 'sync', 'persistence', 'queue'],
    variables: [
      {
        name: 'db',
        description: 'Local Database',
        type: 'select',
        options: ['WatermelonDB', 'Realm', 'RxDB', 'PouchDB'],
        required: true,
      },
      {
        name: 'worker',
        description: 'Sync Worker',
        type: 'select',
        options: [
          'Background Sync Manager',
          'Kotlin Coroutines',
          'WorkManager',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'In-App Purchase (IAP) SDK',
    description: 'Handling Consumables and Subscriptions.',
    content:
      'Implement IAP Logic.\n\n**Core Architecture:**\n1. Store SDK Integration ({{store}}).\n2. Fetch Products ({{fetch}}).\n3. Consumable: Deduct count.\n4. Subscription: Check active status.\n5. Receipt Validation ({{receipt}}).',
    category: 'Mobile',
    tags: ['iap', 'monetization', 'store', 'receipts'],
    variables: [
      {
        name: 'store',
        description: 'App Store',
        type: 'select',
        options: ['Apple App Store', 'Google Play'],
        required: true,
      },
      {
        name: 'fetch',
        description: 'Products Request',
        type: 'select',
        options: [' synchronous', 'Asynchronous'],
        required: true,
      },
      {
        name: 'receipt',
        description: 'Verification',
        type: 'select',
        options: ['Local', 'Remote Server'],
        required: true,
      },
    ],
  },
  {
    title: 'Push Notification Provider',
    description: 'Unified push provider abstraction.',
    content:
      'Create a Push Provider Service.\n\n**Core Architecture:**\n1. Abstraction Layer ({{provider}}).\n2. Token registration (APNs, FCM).\n3. Handling payload formatting.\n4. Topic/Device Token Management.\n5. Batch sending.',
    category: 'Mobile',
    tags: ['push', 'notifications', 'apns', 'fcm'],
    variables: [
      {
        name: 'provider',
        description: 'Backend Service',
        type: 'select',
        options: [
          'Firebase Cloud Messaging',
          'Amazon SNS',
          'Azure Notification Hubs',
          'Pusher',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'Deep Linking Service',
    description: 'Deferred Deep Links (Branch style).',
    content:
      'Build a Deep Linking Service.\n\n**Core Architecture:**\n1. Short URL generation.\n2. App Open Attribution ({{sdk}}).\n3. Fallback landing page.\n4. Deep linking via Universal Links / App Links.\n5. Retargeting pixels.',
    category: 'Mobile',
    tags: ['deeplink', 'attribution', 'marketing', 'growth'],
    variables: [
      {
        name: 'sdk',
        description: 'Mobile SDK',
        type: 'select',
        options: [
          'Branch.io',
          'AppsFlyer',
          'Firebase Dynamic Links',
          'Airship',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'Mobile Crash Reporter',
    description: 'Symbolicating stack traces.',
    content:
      'Create a Crash Reporter SDK.\n\n**Core Architecture:**\n "Crash Handling:\n1. Minidump generation ({{engine}}).\n2. Symbol files upload.\n3. Stack Trace parsing.\n4. Device info gathering.\n5. Breadcrumbs (Leading events).',
    category: 'Mobile',
    tags: ['crash', 'minidump', 'stacktrace', 'bugs'],
    variables: [
      {
        name: 'engine',
        description: 'Crash Engine',
        type: 'select',
        options: ['Breakpad', 'Minidump', 'Crashlytics (Native)'],
        required: true,
      },
    ],
  },
  {
    title: 'Background Location Tracking',
    description: 'Battery-efficient GPS logging.',
    content:
      'Create a Location Tracker.\n\n**Core Architecture:**\n1. Service: {{service}}.\n2. Accuracy logic ({{accuracy}}).\n3. Battery check.\n4. Distance filter ({{distance}}).\n5. Geofencing (enter/exit).',
    category: 'Mobile',
    tags: ['location', 'gps', 'background', 'battery'],
    variables: [
      {
        name: 'service',
        description: 'Platform Service',
        type: 'select',
        options: [
          'FusedLocation (iOS)',
          'FusedLocationProvider (Android)',
          'WorkManager',
        ],
        required: true,
      },
      {
        name: 'accuracy',
        description: 'Accuracy',
        type: 'select',
        options: ['High', 'Balanced', 'Low'],
        required: true,
      },
      {
        name: 'distance',
        description: 'Significant Motion Meters',
        type: 'number',
        defaultValue: 100,
        required: true,
      },
    ],
  },
  {
    title: 'Bluetooth LE Peripheral',
    description: 'Connecting to low-energy devices.',
    content:
      'Create a BLE Peripheral App.\n\n**Core Architecture:**\n1. Scan for devices ({{devices}}).\n2. Connect (Bonding).\n3. Service Discovery.\n4. Characteristic read/write.\n5. Notifications on disconnect.',
    category: 'IoT',
    tags: ['ble', 'bluetooth', 'iot', 'hardware'],
    variables: [
      {
        name: 'devices',
        description: 'Target Device Type',
        type: 'string',
        required: true,
      },
      {
        name: 'platform',
        description: 'Platform',
        type: 'select',
        options: ['iOS (CoreBluetooth)', 'Android (GATT)'],
        required: true,
      },
    ],
  },
  {
    title: 'Local Peer-to-Peer Mesh',
    description: 'WiFi P2P or Multipeer Connectivity.',
    content:
      'Create a P2P Mesh.\n\n**Core Architecture:**\n1. Discovery ({{protocol}}).\n2. Network formation ({{mesh}}.\n3. Message routing ({{routing}}).\n4. Encryption ({{crypto}}).\n5. Dynamic joining/leaving.',
    category: 'Networking',
    tags: ['p2p', 'wifi', 'mesh', 'multipeer'],
    variables: [
      {
        name: 'protocol',
        description: 'Connectivity',
        type: 'select',
        options: ['Multipeer', 'P2P', 'AllJoyn'],
        required: true,
      },
      {
        name: 'mesh',
        description: 'Mesh Logic',
        type: 'select',
        options: ['Star', 'Line-Topo', 'Tree'],
        required: true,
      },
      {
        name: 'routing',
        description: 'Routing Protocol',
        type: 'select',
        options: ['Binary', 'Relay', 'Flood'],
        required: true,
      },
      {
        name: 'crypto',
        description: 'Encryption',
        type: 'select',
        options: ['AES-GCM', 'ChaCha20', 'None'],
        required: false,
      },
    ],
  },
  {
    title: 'Sensor Fusion (Orientation)',
    description: 'Fusing Accelerometer, Gyro, Magnetometer.',
    content:
      'Create a Sensor Fusion Engine.\n\n**Core Architecture:**\n1. Data inputs: {{inputs}}.\n2. Algorithm: {{algorithm}} (Complementary / Kalman).\n3. Gravity Vector estimation.\n4. Gyroscope drift compensation.\n5. Roll/Pitch/Yaw output.',
    category: 'Mobile / Sensors',
    tags: ['sensors', 'fusion', 'orientation', 'motion'],
    variables: [
      {
        name: 'inputs',
        description: 'Data Sources',
        type: 'multiselect',
        options: ['Accelerometer', 'Gyroscope', 'Magnetometer', 'Barometer'],
        required: true,
      },
      {
        name: 'algorithm',
        description: 'Fusion Algo',
        type: 'select',
        options: ['Complementary Filter', 'Kalman Filter', 'Madgwick'],
        required: true,
      },
    ],
  },
  {
    title: 'Desktop Global Shortcut Handler',
    description: 'Listening to system-wide hotkeys in background.',
    content:
      'Create a Global Shortcut Listener.\n\n**Core Architecture:**\n**Implementation:** {{lib}}.\n1. IpcMain/Electron.\n2. Register global shortcuts ({{hotkeys}}).\n3. Conflict check.\n4. Execute commands or toggle UI.',
    category: 'Desktop',
    tags: ['hotkeys', 'global', 'global-shortcut', 'electron'],
    variables: [
      {
        name: 'lib',
        description: 'Shortcut Lib',
        type: 'select',
        options: [
          'Electron.globalShortcut',
          'Electron-localshortcut',
          'iohook',
        ],
        required: true,
      },
      {
        name: 'hotkeys',
        description: 'Keys to trap',
        type: 'textarea',
        required: true,
      },
    ],
  },
  {
    title: 'Desktop Window State Persistence',
    description: 'Saving window bounds and state for next launch.',
    content:
      'Create a Window State Manager.\n**Features:**\n1. Save `x, y, width, height, maximized`.\n2. Monitor index handling.\n3. Restoration logic ({{restore}} on startup.\n4. DPI awareness.',
    category: 'Desktop',
    tags: ['window', 'persistence', 'electron', 'ui'],
    variables: [
      {
        name: 'restore',
        description: 'Restore Strategy',
        type: 'select',
        options: ['Immediate', 'After Content Load', 'Delay'],
        required: true,
      },
    ],
  },
  {
    title: 'Desktop Auto-Update Mechanism',
    description: 'Squirrel.Windows or Sparkle integration.',
    content:
      'Implement Auto-Update.\n**Framework:** {{framework}}.\n**Core Features:**\n1. Check updates at {{channel}}.\n2. Download installer in background.\n3. Silent install flags.\n4. Restart app logic.',
    category: 'Desktop',
    tags: ['updates', 'electron', 'installers', 'squirrel'],
    variables: [
      {
        name: 'framework',
        description: 'Platform',
        type: 'select',
        options: ['Electron', 'NSIS', 'Squirrel.Mac', 'Sparkle.Windows'],
        required: true,
      },
      {
        name: 'channel',
        description: 'Update Channel',
        type: 'select',
        options: ['Beta', 'Stable', 'Canary'],
        required: false,
      },
    ],
  },
  {
    title: 'Desktop Screenshot API',
    description: 'Capturing screen regions or windows.',
    content:
      'Create a Screenshot Module.\n**Core Architecture:**\n**Platform:** {{platform}}.\n1. Capture Desktop ({{capture}} or Active Window).\n2. Thumbnail preview.\n3. File Save Dialog.\n4. Copy to Clipboard.\n5. High-DPI awareness.',
    category: 'Desktop',
    tags: ['screenshot', 'capture', 'desktop', 'graphics'],
    variables: [
      {
        name: 'platform',
        description: 'Target Platform',
        type: 'select',
        options: ['Windows (GDI)', 'macOS (CGImage)', 'Linux (X11)'],
        required: true,
      },
      {
        name: 'capture',
        description: 'Capture Method',
        type: 'select',
        options: ['Screen', 'Window', 'Region', 'Webview'],
        required: true,
      },
    ],
  },
  {
    title: 'Tray Application Menu',
    description: 'Icon in system tray with context menu.',
    content:
      'Create a Tray App.\n**Core Architecture:**\n**Platform:** {{platform}}.\n**Features:**\n1. Icon loading.\n2. Menu items ({{items}}).\n3. Badge ({{badge}}) on icon.\n4. Click listener.\n5. Quit handling.',
    category: 'Desktop',
    tags: ['tray', 'system-tray', 'menu', 'status-icon'],
    variables: [
      {
        name: 'platform',
        description: 'Platform',
        type: 'select',
        options: ['Electron', 'Electron-Menu', 'Systray (Native)'],
        required: true,
      },
      {
        name: 'items',
        description: 'Menu Items',
        type: 'textarea',
        required: true,
      },
      {
        name: 'badge',
        description: 'Show Status Dot',
        type: 'boolean',
        required: false,
      },
    ],
  },
  {
    title: 'USB Device Communication',
    description: 'Connecting to generic USB devices.',
    content:
      'Create a USB Manager.\n**Core Architecture:**\n1. Detect device arrival/removal.\n2. Open interface ({{interface}}).\n3. Send/Receive Control Transfers.\n4. Bulk transfers.\n5. Device Descriptor parsing.',
    category: 'Hardware',
    tags: ['usb', 'libusb', 'device', 'driver'],
    variables: [
      {
        name: 'interface',
        description: 'USB Class',
        type: 'string',
        required: true,
      },
    ],
  },
  {
    title: 'Serial Port Terminal',
    description: 'Connecting to COM ports.',
    content:
      'Create a Serial Terminal.\n**Core Architecture:**\n1. List COM ports ({{library}}).\n2. Configuration: Baud rate, Data bits, Parity, Stop bits.\n3. Raw read/write.\n4. ASCII/Hex display modes.\n5. Log traffic.',
    category: 'Hardware',
    tags: ['serial', 'rs232', 'comport', 'terminal'],
    variables: [
      {
        name: 'library',
        description: 'Serial Lib',
        type: 'select',
        options: ['SerialPort', 'serialport', 'jssc'],
        required: true,
      },
    ],
  },
  {
    title: 'File Watcher Service',
    description: 'Monitoring file system events.',
    content:
      'Create a File Watcher.\n**Core Architecture:**\n**Method:** {{method}}.\n1. Watch directory: {{dir}}.\n2. Events: Create, Update, Delete.\n3. Debouncing ({{debounce}}).\n4. Recursive watching.\n5. Handling duplicate events.',
    category: 'Desktop / Backend',
    tags: ['watcher', 'fs', 'filesystem', 'realtime'],
    variables: [
      {
        name: 'method',
        description: 'Watching Method',
        type: 'select',
        options: ['Native (fs.watch)', 'Polling'],
        required: true,
      },
      {
        name: 'dir',
        description: 'Directory Path',
        type: 'string',
        required: true,
      },
      {
        name: 'debounce',
        description: 'Debounce Time',
        type: 'number',
        defaultValue: 1000,
        required: false,
      },
    ],
  },
  {
    title: 'Desktop SQLite Wrapper',
    description: 'Encrypted SQLite database for desktop apps.',
    content:
      'Create an Encrypted DB Wrapper.\n**Core Architecture:**\n1. SQLCipher ({{crypto}} integration.\n2. Table creation and migration support.\n3. CRUD operations.\n4. Pragma optimization ({{cache}}).\n5. Wal Mode.',
    category: 'Desktop / Storage',
    tags: ['sqlite', 'encryption', 'sqlcipher', 'database'],
    variables: [
      {
        name: 'crypto',
        description: 'Encryption Lib',
        type: 'select',
        options: [
          'SQLCipher',
          'Node-SQLite3',
          'Better-SQLite3',
          'Realm',
          'Sequelize',
        ],
        required: true,
      },
      {
        name: 'cache',
        description: 'Pragma Setting',
        type: 'boolean',
        required: false,
      },
    ],
  },
  {
    title: 'Desktop Notification System',
    description: 'System-level notifications (Windows 10/11, macOS/Linux).',
    content:
      'Create a Notification System.\n**Core Architecture:**\n**Platform:** {{platform}}.\n1. Native Notification Center support.\n2. Rich HTML/Text support.\n3. Notification sounds.\n4. Action buttons.\n5. Persistence history.',
    category: 'Desktop',
    tags: ['notifications', 'snore', 'toast', 'system'],
    variables: [
      {
        name: 'platform',
        description: 'Target OS',
        type: 'select',
        options: ['Windows (NodeRTC)', 'macOS (Cocoa)', 'Linux (libnotify)'],
        required: true,
      },
    ],
  },
  {
    title: 'Edge Request Handler',
    description: 'Fetch API in Cloudflare Workers.',
    content:
      'Create an Edge Request Handler.\n**Core Architecture:**\n**Runtime:** {{runtime}}.\n1. `fetch` logic (CORS handling).\n2. API Route matching ({{router}}).\n3. Cache integration ({{cache}}).\n4. HTML rewriting logic ({{rewrite}}).\n5. Dynamic Content Generation ({{render}}).',
    category: 'Edge',
    tags: ['cloudflare', 'workers', 'fetch', 'edge'],
    variables: [
      {
        name: 'runtime',
        description: 'Edge Runtime',
        type: 'select',
        options: ['Cloudflare Workers', 'Deno Deploy', 'Vercel Edge'],
        required: true,
      },
      {
        name: 'router',
        description: 'URL Router',
        type: 'select',
        options: ['itty-router', 'urlpattern', 'Hono'],
        required: true,
      },
      {
        name: 'cache',
        description: 'Cache API',
        type: 'select',
        options: ['Workers KV', 'Hyperdrive', 'R2', 'Durable Objects'],
        required: true,
      },
      {
        name: 'rewrite',
        description: 'Transformer',
        type: 'select',
        options: ['HTMLRewriter', 'Cloudflare Transform', 'ModHeader'],
        required: true,
      },
      {
        name: 'render',
        description: 'Renderer',
        type: 'select',
        options: ['HTML', 'Markdown', 'Text', 'JSON'],
        required: true,
      },
    ],
  },
  {
    title: 'Edge KV Store Wrapper',
    description: 'High performance Key-Value storage.',
    content:
      'Create a KV Store Wrapper.\n**Core Architecture:**\n**Runtime:** {{runtime}}.\n**Features:**\n1. `put`, `get`, `list`, `delete` methods.\n2. Expiration lists (DLists) via {{api}}.\n3. Listing order ({{order}}).\n4. Metadata.\n5. Atomic operations support.',
    category: 'Edge / Storage',
    tags: ['kv', 'edge', 'storage', 'durability'],
    variables: [
      {
        name: 'runtime',
        description: 'Edge Runtime',
        type: 'select',
        options: ['Cloudflare Workers', 'Deno', 'Fastly'],
        required: true,
      },
      {
        name: 'api',
        description: 'KV API',
        type: 'select',
        options: ['Cloudflare KV', 'Deno KV', 'Azure Key Vault'],
        required: true,
      },
      {
        name: 'order',
        description: 'List Order',
        type: 'select',
        options: ['Created-At', 'Updated-At', 'Key Name'],
        required: false,
      },
    ],
  },
  {
    title: 'Edge Worker KV Cache',
    description: 'Cache-Aside Pattern at the Edge.',
    content:
      'Implement an Edge Cache.\n**Core Architecture:** **Platform:** {{platform}}.\n**Logic:**\n1. Check KV Store for cached response.\n2. If miss, fetch origin ({{origin}}).\n3. Store response with TTL ({{ttl}}.\n4. Respect `Cache-Control` headers.',
    category: 'Edge / Caching',
    tags: ['cache', 'edge', 'kv', 'ttl'],
    variables: [
      {
        name: 'platform',
        description: 'Edge Platform',
        type: 'select',
        options: ['Cloudflare Workers', 'Fastly', 'Deno Deploy'],
        required: true,
      },
      {
        name: 'origin',
        description: 'Backend URL',
        type: 'string',
        required: true,
      },
      {
        name: 'ttl',
        description: 'Seconds',
        type: 'number',
        defaultValue: 3600,
        required: true,
      },
    ],
  },
  {
    title: 'Edge HTML Rewriter',
    description: 'Modifying HTML responses on the fly.',
    content:
      'Create an HTML Rewriter.\n**Core Architecture:**\n**Engine:** {{engine}}.\n**Logic:**\n1. Selector: {{selector}}.\n2. Rewrite logic ({{rule}}).',
    category: 'Edge / Middleware',
    tags: ['rewrite', 'html', 'transform', 'cloudflare'],
    variables: [
      {
        name: 'engine',
        description: 'Rewriter Engine',
        type: 'select',
        options: ['HTMLRewriter', 'Cloudflare Modules'],
        required: true,
      },
      {
        name: 'selector',
        description: 'CSS/Element Selector',
        type: 'string',
        required: true,
      },
      {
        name: 'rule',
        description: 'Action',
        type: 'select',
        options: ['Append Head', 'Body Text', 'Remove Element'],
        required: true,
      },
    ],
  },
  {
    title: 'Edge Geo-Router',
    description: 'Latency-based routing (Regional DNS).',
    content:
      'Create an Edge Geo-Router.\n**Core Architecture:**\n**Provider:** {{provider}}.\n1. Map URL path to {{backend}} region.\n2. Health Checks.\n3. Fallback strategy ({{fallback}} on latency > {{latency}}).\n4. Session stickiness.',
    category: 'Edge / Routing',
    tags: ['routing', 'geo-dns', 'latency', 'edge'],
    variables: [
      {
        name: 'provider',
        description: 'DNS Provider',
        type: 'select',
        options: ['Cloudflare Traffic', 'Google Cloud DNS', 'Fastly'],
        required: true,
      },
      {
        name: 'backend',
        description: 'Backend Region',
        type: 'string',
        required: true,
      },
      {
        name: 'fallback',
        description: 'Fallback',
        type: 'string',
        defaultValue: 'origin',
        required: true,
      },
      {
        name: 'latency',
        description: 'Max Latency (ms)',
        type: 'number',
        defaultValue: 50,
      },
    ],
  },
  {
    title: 'Durable Object Storage (S3 Compatible)',
    description: 'Object storage for large files.',
    content:
      'Create an Object Store Handler.\n**Core Architecture:**\n**Provider:** {{provider}}.\n**Logic:**\n1. Upload via {{upload}} (PUT).\n2. Multipart/Form Upload support.\n3. ETag generation.\n4. Head Object support.\n5. Access Control Lists ({{acl}} generation.',
    category: 'Edge / Storage',
    tags: ['storage', 'r2', 's3', 'object'],
    variables: [
      {
        name: 'provider',
        description: 'Storage Provider',
        type: 'select',
        options: ['R2', 'AWS S3', 'Google Cloud Storage'],
        required: true,
      },
      {
        name: 'upload',
        description: 'Upload Type',
        type: 'select',
        options: ['Standard', 'Multipart Form', 'Raw'],
        required: true,
      },
      {
        name: 'acl',
        description: 'ACL Type',
        type: 'select',
        options: ['Private', 'Public Read', 'Public Read/Write'],
        required: false,
      },
    ],
  },
  {
    title: 'Dynamic Rendering with Edge',
    description: 'SSR using V8 isolates or Streams.',
    content:
      'Create an Edge SSR App.\n**Core Architecture:**\n**Framework:** {{framework}}.\n**Logic:**\n1. Fetch data from {{source}}.\n2. Render HTML using {{render}}.\n3. Stream response body.\n4. Hydration.',
    category: 'Edge / Rendering',
    tags: ['ssr', 'v8', 'isolate', 'streams'],
    variables: [
      {
        name: 'framework',
        description: 'Edge Framework',
        type: 'select',
        options: ['Fresh (Deno)', 'Astro (Adaptor)', 'Hono', 'SolidJS'],
        required: true,
      },
      {
        name: 'source',
        description: 'Data Source',
        type: 'select',
        options: ['API', 'KV Store', 'Database'],
        required: true,
      },
      {
        name: 'render',
        description: 'Render Method',
        type: 'select',
        options: ['HTML String', 'JSX to HTML', 'Streaming'],
        required: true,
      },
    ],
  },
  {
    title: 'Edge Cron Trigger',
    description: 'Scheduled tasks on edge.',
    content:
      'Implement Edge Cron.\n**Core Architecture:**\n**Platform:** {{platform}}.\n**Logic:**\n1. Parse {{expression}} (Cron syntax).\n2. Create a Scheduled Trigger.\n3. Fetch data from {{api}}.\n4. Store result in {{store}}.',
    category: 'Edge / Automation',
    tags: ['cron', 'scheduled', 'scheduler', 'automation'],
    variables: [
      {
        name: 'platform',
        description: 'Platform',
        type: 'select',
        options: [
          'Cloudflare Workers Cron Triggers',
          'Deno Cron',
          'Edge Compute',
        ],
        required: true,
      },
      {
        name: 'expression',
        description: 'Cron Expression',
        type: 'string',
        required: true,
      },
      { name: 'api', description: 'Fetch URL', type: 'string', required: true },
      {
        name: 'store',
        description: 'Storage for output',
        type: 'select',
        options: ['KV Namespace', 'Durable Objects', 'Workers KV', 'Edge KV'],
        required: true,
      },
    ],
  },
  {
    title: 'Edge Crypto Service',
    description: 'WebCrypto API wrapper for keys and hashing.',
    content:
      'Create an Edge Crypto Wrapper.\n**Core Architecture:**\n**Platform:** {{platform}}\n**Features:**\n1. **Crypto**: {{algorithm}} (Sign/HMAC).\n2. **Keys:** Generate/Manage keys in {{store}}.\n3. Key Derivation from password.\n4. Export keys.',
    category: 'Security / Edge',
    tags: ['crypto', 'webcrypto', 'keys', 'hashing'],
    variables: [
      {
        name: 'platform',
        description: 'Platform',
        type: 'select',
        options: ['Deno', 'Cloudflare Workers'],
        required: true,
      },
      {
        name: 'algorithm',
        description: 'Algo',
        type: 'select',
        options: ['HMAC-SHA256', 'RSASSA-PKCS1-v1_5', 'AES-GCM', 'PBKDF2'],
        required: true,
      },
    ],
  },
  {
    title: 'Private DNS Tunneling',
    description: 'Exposing local server to internet securely.',
    content:
      'Build a Tunneling Tool.\n**Core Architecture:**\n**Provider:** {{provider}}.\n1. Create tunnel to {{localPort}}.\n2. Generate a Public URL.\n3. Manage tunnel (Start/Stop).\n4. Webhook Relay to localhost.',
    category: 'Network / DevOps',
    tags: ['tunnel', 'localhost', 'expose', 'localhost'],
    variables: [
      {
        name: 'provider',
        description: 'Tunnel Service',
        type: 'select',
        options: [
          'Cloudflare Tunnels',
          'Ngrok',
          'Localtunnel',
          'Cloudflare Access',
        ],
        required: true,
      },
      {
        name: 'localPort',
        description: 'Local Port',
        type: 'number',
        required: true,
      },
    ],
  },
  {
    title: 'WebAssembly SIMD',
    description: 'Using 128-bit vector math.',
    content:
      'Create a WebAssembly SIMD App.\n**Core Architecture:**\n**Language:** {{lang}}.\n1. Use SIMD {{engine}}.\n2. Matrix Multiplication ({{matrix}}).\n3. Performance optimization ({{opt}}\n4. Compare against Scalar version.',
    category: 'WASM / WebAssembly',
    tags: ['simd', 'wasm', 'performance', 'graphics'],
    variables: [
      {
        name: 'lang',
        description: 'Language',
        type: 'select',
        options: ['WATIR', 'AssemblyScript', 'Rust', 'C++ (Emscripten)'],
        required: true,
      },
      {
        name: 'engine',
        description: 'SIMD Extension',
        type: 'select',
        options: ['SIMD', 'NEON', 'Proposed', 'Relaxed SIMD', 'SSE4.1', 'AVX'],
      },
      {
        name: 'matrix',
        description: 'Operation',
        type: 'select',
        options: [
          'Matrix Multiplication',
          '4x4 Matrix',
          'Vector Addition',
          'Dot Product',
        ],
        required: true,
      },
      {
        name: 'opt',
        description: 'Optimization',
        type: 'select',
        options: ['Packed Boolean', 'Relaxed', 'Fast Math'],
        required: true,
      },
    ],
  },
  {
    title: 'WebAssembly Threads',
    description: 'Using SharedArrayBuffer for concurrency.',
    content:
      'Create a Multi-threaded WASM App.\n**Core Architecture:**\n**Language:** {{lang}}.\n**Libraries:** {{libs}}.\n1. Create {{num}} Workers.\n2. Use SharedArrayBuffer to share memory.\n3. Main thread coordination via {{coordination}}.\n4. **Data Sync:** {{sync}} via postMessage.',
    category: 'Wasm / WebAssembly',
    tags: ['workers', 'threads', 'sharedarraybuffer', 'concurrency'],
    variables: [
      {
        name: 'lang',
        description: 'Language',
        type: 'select',
        options: ['C++', 'Rust', 'AssemblyScript'],
        required: true,
      },
      {
        name: 'libs',
        description: 'Helper Libs',
        type: 'multiselect',
        options: ['Pthreads', 'WASM-threads', 'std::thread', 'rayon'],
      },
      {
        name: 'coordination',
        description: 'Worker Manager',
        type: 'select',
        options: [
          'Custom BroadcastChannel',
          'SharedArrayBuffer',
          'Comlink',
          'WaitAsync/Async',
        ],
      },
      {
        name: 'num',
        description: 'Number of Workers',
        type: 'number',
        defaultValue: 4,
        required: true,
      },
      {
        name: 'sync',
        description: 'Sync Mechanism',
        type: 'select',
        options: ['Atomics', 'SharedArrayBuffer', 'Lock-Free', 'Mutex'],
        required: true,
      },
    ],
  },
  {
    title: 'WebGL Compute Shaders',
    description: 'GPGPU for General Purpose Computing.',
    content:
      'Create a Compute Shader.\n**Core Architecture:**\n**Backend:** {{backend}}.\n**Type:** {{type}}.\n1. Pass data to Shader ({{inputFormat}}).\n2. Fragment Shader for {{task}}.\n3. Render output to {{output}}.\n4. Read back results (readPixels).',
    category: 'Graphics / Shader',
    tags: ['gpgpu', 'webgl', 'compute', 'shader'],
    variables: [
      {
        name: 'backend',
        description: 'Runtime',
        type: 'select',
        options: [
          'Browser (WebGL2)',
          'OffscreenCanvas',
          'GPU Compute Library (WebGPU)',
          'Generic',
          'FFT',
          'Ray Tracing',
          'Sorting',
        ],
        required: true,
      },
      {
        name: 'task',
        description: 'Task Name',
        type: 'string',
        required: true,
      },
      {
        name: 'inputFormat',
        description: 'Input Data',
        type: 'select',
        options: [
          'Texture (RGBA)',
          'Data Texture (RGBA Floats)',
          'Data Texture (Red, Green, Alpha)',
        ],
        required: true,
      },
      {
        name: 'output',
        description: 'Output Target',
        type: 'select',
        options: ['HTML5 Canvas', 'Framebuffer', 'Texture'],
        required: true,
      },
    ],
  },
  {
    title: 'MediaPipe Integration',
    description: 'Machine Learning in the browser.',
    content:
      'Integrate MediaPipe.\n**Core Architecture:**\n**Backend:** {{backend}}.\n**Models:** {{models}}.\n**Features:**\n1. Camera Utils.\n2. Drawing Utils ({{draw}} overlay.\n3. **Tasks:** \n4. Result Display.\n5. Audio Context ({{audioContext}}.',
    category: 'AI / Vision',
    tags: ['mediapipe', 'vision', 'ai', 'model'],
    variables: [
      {
        name: 'Model',
        description: 'ML Model',
        type: 'select',
        options: [
          'FaceMesh',
          'Face Detection',
          'Face Landmarks',
          'Object Detection',
          'Hand Pose',
          'Selfie Segmentation',
        ],
        required: true,
      },
      {
        name: 'draw',
        description: 'Drawing Lib',
        type: 'select',
        options: [
          'Canvas',
          'Drawing API',
          'Canvas (ThreeJS)',
          'Canvas2D',
          'Three.js',
        ],
        required: true,
      },
      {
        name: 'audioContext',
        description: 'Audio Wrapper',
        type: 'select',
        options: ['MediaPipe Web Audio', 'Web Audio API'],
        required: true,
      },
      {
        name: 'backend',
        description: 'Runtime',
        type: 'select',
        options: ['Vanilla JS', 'React', 'Vue', 'Angular'],
        required: true,
      },
      {
        name: 'providers',
        description: 'Model Providers',
        type: 'multiselect',
        options: ['@mediapipe/drawing_utils', '@mediapipe/tasks-vision'],
        required: true,
      },
    ],
  },
  {
    title: 'TensorFlow.js Model Training',
    description: 'Training Neural Networks in the browser.',
    content:
      'Train a Model.\n**Core Architecture:**\n1. Load Layers ({{layers}}).\n2. Compile the model ({{complier}}).\n3. Tensors: Tensors and {{tensorType}}.\n4. Training Loop ({{loop}}).\n5. Optimizer (SGD/Adam).',
    category: 'AI / Deep Learning',
    tags: ['tensorflow', 'training', 'neural-network', 'ml'],
    variables: [
      {
        name: 'layers',
        description: 'Layers',
        type: 'select',
        options: ['Conv2D', 'Dense', 'Conv2D', 'Flatten', 'Dropout'],
        required: true,
      },
      {
        name: 'compiler',
        description: 'Compiler',
        type: 'select',
        options: ['Standard', 'Custom'],
        required: true,
      },
      {
        name: 'tensorType',
        description: 'Tensor Type',
        type: 'select',
        options: ['4D Tensor', '3D Tensor', '2D Array'],
        required: true,
      },
      {
        name: 'loop',
        description: 'Iteration Strategy',
        type: 'select',
        options: ['Standard', 'For-Of', 'Custom'],
        required: true,
      },
    ],
  },
  {
    title: 'ONNX Runtime Web',
    description: 'Running pre-trained models in the browser.',
    content:
      'Create an ONNX Runtime App.\n**Core Architecture:\n**Framework:** {{framework}}.\n**Models:** {{models}}.\n1. Load `session` and `InferenceSession`.\n2. Input: {{inputType}}.\n3. Run Inference.\n4. Extract output.',
    category: 'AI / Inference',
    tags: ['onnx', 'wasm', 'inference', 'model'],
    variables: [
      {
        name: 'Models',
        description: 'Models',
        type: 'select',
        options: [
          'ResNet-18',
          'MobileNet V3',
          'SqueezeNet',
          'YOLOv5',
          'BERT-Base',
          'GPT-2',
        ],
        required: true,
      },
      {
        name: 'inputType',
        description: 'Input Type',
        type: 'select',
        options: [
          'Image (Resized)',
          'Tensor',
          'Audio (MFCC)',
          'Text (Tokenized)',
        ],
        required: true,
      },
    ],
  },
];

export default promptTemplates;
