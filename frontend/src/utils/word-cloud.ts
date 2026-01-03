/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * Represents metrics that quantify the complexity and characteristics of a word, including readability, technicality, and rarity.
 * Useful for analyzing text difficulty, vocabulary diversity, or domain-specific language patterns.
 * @example
 * const exampleMetrics: WordComplexityMetrics = {
 *   length: 10,
 *   syllableCount: 3,
 *   technicalScore: 0.75,
 *   rarityScore: 0.2,
 *   contextRelevance: 0.85,
 *   readabilityScore: 4.2,
 * };
 */
export interface WordComplexityMetrics {
  /** The number of characters in the word */
  length: number;
  /** The estimated number of syllables in the word */
  syllableCount: number;
  /** A score indicating the technicality of the word (higher values mean more technical terms) */
  technicalScore: number;
  /** A score reflecting the rarity of the word in general language usage (higher values mean rarer words) */
  rarityScore: number;
  /** A measure of how relevant the word is to a specific context or domain (0-1 scale) */
  contextRelevance: number;
  /** A readability score based on syllable count and word frequency (lower values indicate easier readability) */
  readabilityScore: number;
}

/**
 * Represents an insight or analysis result about a specific word in text, capturing its type, severity, and relevance.
 * Used to provide actionable feedback on language use, readability, and style.
 * @example
 * const exampleInsight: WordInsight = {
 *   id: "insight_123",
 *   type: "complex",
 *   category: "lexical",
 *   word: "sophistication",
 *   frequency: 2,
 *   message: "The word 'sophistication' may be too complex for the target audience.",
 *   suggestion: "Consider using 'complexity' instead.",
 *   severity: "high",
 *   confidence: 0.92,
 *   actionItems: ["Replace with simpler synonym", "Review target audience language level"],
 *   relatedInsights: ["insight_456", "insight_789"],
 * };
 */
export interface WordInsight {
  /** A unique identifier for this insight, used for filtering or grouping */
  id: string;
  /** The type of insight (e.g., 'overused', 'complex', 'technical', etc.) */
  type:
    | 'overused' | 'complex' | 'technical' | 'sentiment' | 'diversity'
    | 'readability' | 'grammar' | 'clarity' | 'engagement' | 'seo'
    | 'tone' | 'audience' | 'cultural' | 'gendered' | 'formality'
    | 'redundancy' | 'colloquialism' | 'false_friend' | 'translation_gap'
    | 'code_mixing';
  /** The category that this insight belongs to (e.g., 'lexical', 'structural', etc.) */
  category:
    | 'lexical' | 'structural' | 'semantic' | 'stylistic' | 'technical'
    | 'sociolinguistic' | 'translation' | 'pragmatic';
  /** The word that the insight is focused on */
  word: string;
  /** How frequently the word appears in the text or context being analyzed */
  frequency: number;
  /** A human-readable message summarizing the insight or recommendation */
  message: string;
  /** An optional suggestion for improvement or alternative wording */
  suggestion?: string;
  /** The severity level of the insight (e.g., 'low', 'high', 'critical') */
  severity: 'low' | 'medium' | 'high' | 'critical';
  /** A confidence score between 0 and 1 indicating the reliability of the insight */
  confidence: number;
  /** Optional list of actionable steps to resolve the issue */
  actionItems?: string[];
  /** Optional list of related insight IDs for cross-referencing or grouping */
  relatedInsights?: string[];
}

/**
 * Represents a processed word with its metadata, including frequency, original forms, and optional complexity/sentiment analysis.
 * Used to track linguistic patterns and analyze text characteristics in depth.
 * @example
 * const exampleWord: ProcessedWord = {
 *   id: "word_001",
 *   word: "sophistication",
 *   count: 3,
 *   originalForms: ["sophistications", "sophisticated", "sophisticates"],
 *   complexity: {
 *     length: 12,
 *     syllableCount: 5,
 *     technicalScore: 0.8,
 *     rarityScore: 0.3,
 *     contextRelevance: 0.7,
 *     readabilityScore: 3.5
 *   },
 *   sentiment: "neutral"
 * };
 */
export interface ProcessedWord {
  /** A unique identifier for this processed word instance */
  id: string;
  /** The normalized or lemmatized form of the word after processing */
  word: string;
  /** The number of times this word appears in the analyzed text */
  count: number;
  /** Original forms of the word before cleaning, normalization, or lemmatization */
  originalForms: string[];
  /** Optional complexity metrics of the word, such as technicality, readability, and rarity */
  complexity?: WordComplexityMetrics;
  /** Optional sentiment classification of the word ('positive', 'negative', or 'neutral */
  sentiment?: 'positive' | 'negative' | 'neutral';
}

/**
 * Represents a set of filter options for selecting words based on frequency, complexity, or type.
 * Used in UI components to filter and sort word insights or analysis results.
 * @example
 * const highFrequencyFilter = FILTER_OPTIONS.find(option => option.value === 'high');
 */
export const FILTER_OPTIONS = [
  {value: 'all', label: 'All words'},
  {value: 'high', label: 'High frequency'},
  {value: 'medium', label: 'Medium frequency'},
  {value: 'low', label: 'Low frequency'},
  {value: 'complex', label: 'Complex terms'},
  {value: 'technical', label: 'Technical terms'},
  {value: 'rare', label: 'Rare terms'},
];

/**
 * A list of predefined insight categories with visual styling for use in UI components.
 * Each category is associated with a color and label to help users categorize insights.
 * @example
 * const lexicalCategory = INSIGHT_CATEGORIES.find(cat => cat.id === 'lexical');
 */
export const INSIGHT_CATEGORIES = [
  { id: 'lexical', label: 'Lexical', color: 'bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' },
  { id: 'structural', label: 'Structural', color: 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200' },
  { id: 'semantic', label: 'Semantic', color: 'bg-purple-50 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200' },
  { id: 'stylistic', label: 'Stylistic', color: 'bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200' },
  { id: 'technical', label: 'Technical', color: 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200' },
  { id: 'sociolinguistic', label: 'Sociolinguistic', color: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200' },
  { id: 'translation', label: 'Translation', color: 'bg-teal-50 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200' },
  { id: 'pragmatic', label: 'Pragmatic', color: 'bg-fuchsia-50 dark:bg-fuchsia-900/30 text-fuchsia-800 dark:text-fuchsia-200' },
];

/**
 * A set of stop words that should be excluded from text analysis.
 * These are common function words that often have little semantic meaning.
 * @example
 * if (STOP_WORDS.has('the')) { console.log('Skip "the"'); }
 */
export const STOP_WORDS = new Set([
  'the', 'and', 'a', 'an', 'to', 'in', 'is', 'it', 'that', 'was', 'he', 'she', 'as', 'for', 'on', 'with',
  'by', 'at', 'this', 'be', 'are', 'were', 'but', 'not', 'or', 'have', 'has', 'had', 'of', 'they', 'their',
  'you', 'your', 'we', 'our', 'i', 'my', 'me', 'do', 'does', 'did', 'can', 'could', 'should', 'would',
  'will', 'just', 'about', 'also', 'very', 'only', 'from', 'one', 'all', 'so', 'no', 'if', 'than', 'too',
  'them', 'these', 'those', 'been', 'being', 'before', 'after', 'again', 'then', 'when', 'where', 'why', 'how',
  'up', 'out', 'down', 'off', 'over', 'under', 'more', 'most', 'some', 'any', 'such', 'while', 'until', 'upon',
  'towards', 'through', 'across', 'beyond', 'around', 'behind', 'between', 'among', 'within', 'without', 'against',
  'along', 'amid', 'near', 'next', 'last', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh',
  'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth',
  'seventeenth', 'eighteenth', 'nineteenth', 'twentieth', 'thirtieth', 'fortieth', 'fiftieth', 'sixtieth',
  'seventieth', 'eightieth', 'ninetieth', 'hundredth', 'thousandth', 'millionth', 'billionth', 'trillionth',
]);

/**
 * A set of common Urdu stop words used for filtering out function words during text processing or analysis.
 * These words are typically excluded from linguistic analysis as they carry little semantic meaning.
 * @example
 * if (URDU_STOP_WORDS.has('کا')) {
 *   console.log('"کا" is identified as a stop word in Urdu.');
 * }
 */
export const URDU_STOP_WORDS = new Set([
  'اور', 'کہ', 'کا', 'کے', 'نے', 'میں', 'پر', 'سے', 'یہ', 'وہ', 'ہیں', 'ہے',
  'کو', 'کیا', 'تھا', 'تھی', 'تھے', 'گیا', 'گئی', 'جائے', 'رہا', 'رہی', 'رہیں',
  'کرو', 'کر', 'دی', 'دیا', 'دیتا', 'دیتی', 'لے', 'نے', 'ہو', 'تک', 'بھی', 'ایک', 'دو',
  'تین', 'چار', 'پانچ', 'چھ', 'سات', 'اٹھ', 'نو', 'دس', 'گیارہ', 'بارہ', 'تیرہ', 'چودہ',
  'پندرہ', 'سولہ', 'سترہ', 'اٹھار', 'بیس', 'اکیس', 'بتیس', 'تیس', 'چونتیس', 'پینتیس',
  'چھتیس', 'سینتیس', 'اڑتیس', 'انتالیس', 'اینتیس', 'باتالیس', 'ترانتالیس', 'چوالیس',
  'پینتالیس', 'چھتالیس', 'ستتالیس', 'اٹھتالیس', 'بین', 'سو', 'ترسو', 'چوسو', 'پنسو',
  'چھسو', 'ستسو', 'اٹھسو', 'بین', 'سو', 'ترسو', 'چوسو', 'پنسو', 'چھسو', 'ستسو', 'اٹھسو',
  'ہزار', 'لاکھ', 'کروڑ', 'صد', 'ہزاروں', 'کوئی', 'کس', 'کسے', 'کون', 'کس کی', 'کہاں', 'ان',
  'صرف', 'یعنی', 'یعنیکہ', 'تاہم', 'اگرچہ', 'اگر', 'لیکن', 'گر', 'پر', 'بہرحال', 'اہلا',
]);

/**
 * A comprehensive set of technical terms across modern domains (e.g., AI, engineering, medicine) for specialized text analysis or filtering.
 * Used to identify domain-specific jargon, enhance semantic analysis, or flag terms requiring further clarification.
 * @example
 * // Check if a term is in the technical terms set
 * if (TECHNICAL_TERMS.has('neural_network')) {
 *   console.log('Term "neural_network" is identified as a technical term.');
 * }
 */
 export const TECHNICAL_TERMS = new Set([
   // Core CS & Programming
   'algorithm', 'function', 'variable', 'parameter', 'method', 'class', 'object', 'array', 'string', 'integer',
   'boolean', 'component', 'element', 'interface', 'property', 'state', 'effect', 'hook', 'closure', 'recursion',
   'polymorphism', 'inheritance', 'encapsulation', 'abstraction', 'lambda', 'callback', 'promise', 'async', 'await',
   'generator', 'iterator', 'decorator', 'mixin', 'monad', 'currying', 'hoisting', 'bubbling', 'transpilation',
   'polyfill', 'shim', 'idempotent', 'side-effect', 'pure', 'immutable', 'referential', 'transitive', 'covariant',
   'contravariant', 'phantom', 'opaque', 'nominal', 'structural', 'duck', 'strong', 'weak', 'static', 'dynamic',
   'generics', 'templates', 'reflection', 'metaprogramming', 'introspection', 'serialization', 'deserialization',
   'parsing', 'compiling', 'interpreting', 'jit', 'bytecode', 'concurrency', 'parallelism', 'thread', 'process',
   'fiber', 'coroutine', 'reactive', 'functional', 'imperative', 'declarative', 'objectoriented', 'eventdriven',
   'stack', 'heap', 'pointer', 'reference', 'memory-leak', 'garbage-collection', 'race-condition', 'deadlock',
   'semaphore', 'mutex', 'lock', 'barrier', 'latch', 'atomic', 'volatile', 'synchronized', 'blocking', 'non-blocking',

   // Web & Frontend
   'dom', 'bom', 'jsx', 'tsx', 'virtual', 'render', 'hydration', 'ssr', 'csr', 'isr', 'suspense', 'concurrent',
   'fiber', 'router', 'middleware', 'websocket', 'http', 'https', 'cors', 'csrf', 'cookie', 'localStorage',
   'sessionStorage', 'indexedDB', 'cdn', 'bundle', 'chunk', 'code-splitting', 'transpile', 'minify', 'sourcemap',
   'webpack', 'vite', 'rollup', 'esbuild', 'parcel', 'babel', 'swc', 'eslint', 'prettier', 'typescript', 'flow',
   'webassembly', 'webgl', 'serviceworker', 'pwa', 'manifest', 'cache', 'offline', 'intersection', 'mutation',
   'resize', 'animation', 'webcomponents', 'shadowdom', 'customElement', 'tailwind', 'bootstrap', 'material',
   'accessibility', 'a11y', 'semantic', 'html', 'aria', 'responsive', 'adaptive', 'progressive', 'enhancement',
   'viewport', 'meta-tag', 'canonical', 'sitemap', 'robotstxt', 'lighthouse', 'performance', 'fps', 'jank',
   'reflow', 'repaint', 'critical-rendering-path', 'lazy-loading', 'tree-shaking', 'scope-hoisting', 'minification',
   'obfuscation', 'uglification', 'polyfills', 'transpiler', 'bundler', 'task-runner', 'hot-module-replacement',
   'hmr', 'fast-refresh', 'error-boundary', 'fragment', 'portal', 'context', 'reducer', 'dispatch', 'store',
   'state-management', 'redux', 'mobx', 'zustand', 'recoil', 'jotai', 'effector', 'signal', 'computed',
   'memoization', 'usememo', 'usecallback', 'useeffect', 'uselayouteffect', 'useimperativehandle', 'useref',
   'useforwardref', 'custom-hook', 'higher-order-component', 'hoc', 'render-props', 'compound-component',
   'controlled-input', 'uncontrolled-input', 'form-validation', 'schema-validation', 'zod', 'yup', 'joi',

   // Backend & APIs
   'query', 'database', 'api', 'endpoint', 'server', 'client', 'request', 'response', 'error', 'exception',
   'rest', 'graphql', 'grpc', 'soap', 'oauth', 'openid', 'jwt', 'token', 'session', 'rate-limiting', 'throttling',
   'pagination', 'caching', 'redis', 'memcached', 'load-balancer', 'reverse-proxy', 'nginx', 'apache', 'ingress',
   'gateway', 'mesh', 'circuit-breaker', 'retry', 'backoff', 'idempotency', 'saga', 'event-sourcing', 'cqrs',
   'ddd', 'microservice', 'monolith', 'serverless', 'lambda', 'kafka', 'rabbitmq', 'pubsub', 'queue', 'topic',
   'middleware', 'interceptor', 'filter', 'controller', 'service', 'repository', 'dto', 'vo', 'entity', 'aggregrate',
   'dependency-injection', 'ioc', 'inversion-of-control', 'singleton', 'prototype', 'transient', 'scoped',
   'facade', 'adapter', 'strategy', 'observer', 'command', 'chain-of-responsibility', 'proxy', 'decorator',
   'factory', 'builder', 'prototype', 'singleton', 'mvc', 'mvp', 'mvvm', 'clean-architecture', 'hexagonal',
   'onion', 'layered', 'modular-monolith', 'strangler', 'anti-corruption', 'bounded-context', 'ubiquitous-language',
   'rpc', 'soap', 'wsdl', 'xml', 'json', 'yaml', 'toml', 'ini', 'protobuf', 'avro', 'thrift', 'flatbuffers',
   'graphql', 'schema', 'resolver', 'mutation', 'subscription', 'fragment', 'directive', 'apollo', 'relay',

   // Databases
   'sql', 'nosql', 'relational', 'document', 'key-value', 'graph', 'columnar', 'time-series', 'schema', 'index',
   'foreign', 'primary', 'constraint', 'transaction', 'acid', 'cap', 'normalization', 'denormalization', 'sharding',
   'replication', 'quorum', 'raft', 'paxos', 'mongodb', 'postgresql', 'mysql', 'sqlite', 'cassandra', 'neo4j',
   'elasticsearch', 'dynamodb', 'cockroachdb', 'spanner', 'clickhouse', 'influxdb', 'prometheus', 'vector',
   'join', 'inner-join', 'outer-join', 'left-join', 'right-join', 'cross-join', 'subquery', 'union', 'intersect',
   'except', 'group-by', 'having', 'order-by', 'aggregate', 'window-function', 'partition-by', 'row-number',
   'rank', 'dense-rank', 'lead', 'lag', 'cursor', 'trigger', 'stored-procedure', 'view', 'materialized-view',
   'cluster', 'node', 'shard', 'replica', 'leader', 'follower', 'primary', 'secondary', 'active-passive',
   'active-active', 'failover', 'recovery', 'backup', 'restore', 'snapshot', 'wal', 'write-ahead-log', 'b-tree',
   'lsm-tree', 'hash-index', 'full-text-search', 'inverted-index', 'geo-spatial', 'gis', 'r-tree', 'quadtree',

   // DevOps & Cloud
   'docker', 'kubernetes', 'container', 'pod', 'deployment', 'service', 'configmap', 'secret', 'volume', 'helm',
   'kustomize', 'ci', 'cd', 'pipeline', 'jenkins', 'github', 'gitlab', 'actions', 'terraform', 'ansible', 'chef',
   'puppet', 'cloud', 'aws', 'azure', 'gcp', 's3', 'ec2', 'rds', 'vpc', 'iam', 'lambda', 'cloudfunctions', 'monitoring',
   'logging', 'tracing', 'otel', 'grafana', 'prometheus', 'sentry', 'datadog', 'newrelic', 'splunk', 'chaos',
   'canary', 'bluegreen', 'darklaunch', 'infrastructure-as-code', 'iac', 'configuration-management',
   'orchestration', 'containerization', 'virtualization', 'hypervisor', 'vm', 'bare-metal', 'multi-cloud',
   'hybrid-cloud', 'serverless', 'faas', 'paas', 'saas', 'iaas', 'caas', 'baas', 'haas', 'dr', 'disaster-recovery',
   'sla', 'slo', 'sli', 'uptime', 'availability', 'latency', 'throughput', 'p99', 'p95', 'mttr', 'mttf', 'mttd',
   'incident-management', 'on-call', 'escalation', 'runbook', 'playbook', 'alerting', 'notification', 'pagerduty',
   'opsgenie', 'victorops', 'xmatters', 'status-page', 'health-check', 'readiness-probe', 'liveness-probe',
   'resource-quota', 'limit-range', 'hpa', 'vpa', 'cluster-autoscaler', 'node-pool', 'namespace', 'label',
   'selector', 'annotation', 'taint', 'toleration', 'affinity', 'anti-affinity', 'daemonset', 'statefulset',
   'replicaset', 'job', 'cronjob', 'ingress', 'network-policy', 'service-mesh', 'istio', 'linkerd', 'consul',
   'envoy', 'proxy', 'sidecar', 'gateway-api', 'crd', 'operator', 'controller', 'custom-resource',

   // AI/ML/Data
   'dataset', 'feature', 'label', 'training', 'inference', 'model', 'neural', 'tensor', 'gradient', 'backpropagation',
   'loss', 'accuracy', 'precision', 'recall', 'f1', 'auc', 'roc', 'overfitting', 'regularization', 'dropout',
   'batchnorm', 'optimizer', 'adam', 'sgd', 'pipeline', 'etl', 'data-lake', 'warehouse', 'olap', 'oltp', 'streaming',
   'batch', 'spark', 'flink', 'kafka', 'pandas', 'numpy', 'scikit', 'xgboost', 'tensorflow', 'pytorch', 'jax', 'keras',
   'huggingface', 'transformer', 'bert', 'gpt', 'llama', 'mistral', 'llm', 'embedding', 'tokenization', 'rag', 'finetune',
   'prompt', 'rlhf', 'quantization', 'pruning', 'distillation', 'onnx', 'langchain', 'vectorstore', 'chroma', 'pinecone',
   'clustering', 'pca', 'tsne', 'umap', 'anomaly', 'forecasting', 'timeseries', 'lstm', 'gru', 'cnn', 'rnn',
   'gan', 'vae', 'autoencoder', 'reinforcement-learning', 'q-learning', 'policy', 'reward', 'agent', 'environment',
   'supervised-learning', 'unsupervised-learning', 'semi-supervised', 'self-supervised', 'transfer-learning',
   'few-shot', 'zero-shot', 'one-shot', 'multimodal', 'nlp', 'cv', 'computer-vision', 'image-segmentation',
   'object-detection', 'classification', 'regression', 'hyperparameter', 'epoch', 'batch-size', 'learning-rate',
   'activation-function', 'relu', 'sigmoid', 'tanh', 'softmax', 'layer', 'hidden-layer', 'output-layer',
   'weight', 'bias', 'gradient-descent', 'stochastic-gradient', 'momentum', 'nesterov', 'adamw', 'rmsprop',
   'data-augmentation', 'normalization', 'standardization', 'scaling', 'imputation', 'outlier', 'noise',
   'feature-engineering', 'feature-selection', 'dimensionality-reduction', 'ensemble', 'bagging', 'boosting',
   'stacking', 'blending', 'cross-validation', 'k-fold', 'stratified', 'grid-search', 'random-search',
   'bayesian-optimization', 'hyperopt', 'optuna', 'mlflow', 'wandb', 'tensorboard', 'experiment-tracking',

   // Security
   'encryption', 'decryption', 'hashing', 'salting', 'xss', 'sql-injection', 'csrf', 'ssrf', 'ddos', 'firewall',
   'waf', 'zero-trust', 'mfa', '2fa', 'sso', 'pki', 'tls', 'ssl', 'certificate', 'penetration', 'vulnerability',
   'cve', 'owasp', 'sandbox', 'isolation', 'audit', 'compliance', 'gdpr', 'hipaa', 'pci', 'soc2', 'iso27001', 'nist',
   'sast', 'dast', 'sca', 'shiftleft', 'secrets', 'vault', 'identity', 'access', 'rbac', 'abac', 'iam',
   'authentication', 'authorization', 'accountability', 'non-repudiation', 'integrity', 'confidentiality',
   'availability', 'cia-triad', 'threat-modeling', 'attack-vector', 'attack-surface', 'exploit', 'payload',
   'malware', 'ransomware', 'spyware', 'adware', 'trojan', 'virus', 'worm', 'botnet', 'rootkit', 'keylogger',
   'phishing', 'spear-phishing', 'whaling', 'smishing', 'vishing', 'social-engineering', 'pretexting',
   'honeypot', 'honeytoken', 'deception', 'siem', 'soar', 'edr', 'xdr', 'ndr', 'ids', 'ips', 'dlp',
   'casb', 'swg', 'ztna', 'sase', 'fw-as-a-service', 'mse', 'cloud-security-posture-management', 'cspm',
   'cwpp', 'ciem', 'dsp', 'key-management', 'hsm', 'tpm', 'secure-boot', 'measured-boot', 'attestation',

   // Emerging Tech
   'blockchain', 'smartcontract', 'ethereum', 'solana', 'polygon', 'web3', 'defi', 'nft', 'dao', 'ipfs', 'arweave',
   'zeroknowledge', 'zkp', 'rollup', 'quantum', 'qubit', 'superposition', 'entanglement', 'edge', 'fog', '5g', 'iot',
   'digitaltwin', 'metaverse', 'ar', 'vr', 'mr', 'spatial', 'haptics', 'neuromorphic', 'biocomputing', 'dna', 'crispr',
   'generative-adversarial-network', 'diffusion-model', 'stable-diffusion', 'midjourney', 'dall-e',
   'synthetic-data', 'federated-learning', 'differential-privacy', 'homomorphic-encryption', 'multi-party-computation',
   'cryptocurrency', 'bitcoin', 'ether', 'wallet', 'private-key', 'public-key', 'seed-phrase', 'gas',
   'consensus', 'proof-of-work', 'proof-of-stake', 'proof-of-authority', 'proof-of-history', 'sharding',
   'layer-1', 'layer-2', 'sidechain', 'plasma', 'state-channel', 'atomic-swap', 'dex', 'cex', 'amm',
   'yield-farming', 'staking', 'liquidity-mining', 'governance-token', 'utility-token', 'security-token',
   'ico', 'ido', 'ieo', 'airdrop', 'whale', 'holder', 'miner', 'validator', 'oracles', 'chainlink',

   // Mobile & Embedded
   'mobile', 'ios', 'android', 'flutter', 'react-native', 'kotlin', 'swift', 'xamarin',
   'firmware', 'rtos', 'microcontroller', 'esp32', 'arduino', 'bluetooth', 'ble', 'nfc',
   'native-app', 'hybrid-app', 'cross-platform', 'widget', 'activity', 'fragment', 'intent', 'service',
   'broadcast-receiver', 'content-provider', 'lifecycle', 'viewmodel', 'livedata', 'flow', 'coroutine',
   'jetpack', 'compose', 'swiftui', 'uikit', 'cocoatouch', 'coredata', 'coreanimation', 'metal',
   'opengl', 'vulkan', 'directx', 'shader', 'vertex', 'fragment', 'geometry', 'compute', 'pipeline',
   'gpio', 'i2c', 'spi', 'uart', 'adc', 'dac', 'pwm', 'interrupt', 'timer', 'watchdog', 'dma',
   'pcb', 'schematic', 'footprint', 'gerber', 'pick-and-place', 'solder', 'reflow', 'wave-soldering',

   // Architecture & Dev Practices
   'clean-architecture', 'hexagonal', 'onion', 'ddd', 'cqrs', 'event-driven', 'pub-sub',
   'layered', 'modular-monolith', 'strangler', 'anti-corruption', 'bounded-context',
   'tdd', 'bdd', 'testing', 'unit-test', 'integration-test', 'e2e-test', 'functional-test',
   'acceptance-test', 'smoke-test', 'sanity-test', 'regression-test', 'performance-test', 'load-test',
   'stress-test', 'scalability-test', 'mock', 'stub', 'spy', 'dummy', 'fake', 'test-double',
   'code-review', 'pull-request', 'merge-request', 'commit', 'push', 'fetch', 'rebase', 'cherry-pick',
   'merge', 'branch', 'trunk-based-development', 'feature-branch', 'gitflow', 'github-flow',
   'semantic-versioning', 'changelog', 'release-notes', 'version-control', 'git', 'svn', 'mercurial',
   'agile', 'scrum', 'kanban', 'lean', 'xp', 'sprint', 'standup', 'retrospective', 'planning', 'backlog',
   'user-story', 'epic', 'task', 'bug', 'spike', 'technical-debt', 'refactoring', 'legacy-code',
   'design-pattern', 'solid', 'dry', 'kiss', 'yagni', 'separation-of-concerns', 'coupling', 'cohesion',

   // NLP & Linguistics
   'lemmatization', 'stemming', 'pos-tagging', 'named-entity', 'coreference', 'tokenization',
   'embedding', 'word2vec', 'fasttext', 'bert', 'transformer', 'attention', 'subword',
   'morphology', 'syntax', 'semantics', 'pragmatics', 'phonology', 'phonetics', 'corpus',
   'n-gram', 'bag-of-words', 'tf-idf', 'language-model', 'perplexity', 'bleu', 'rouge', 'meteor',
   'ner', 'chunking', 'parsing', 'dependency-parsing', 'constituency-parsing', 'semantic-role-labeling',
   'sentiment-analysis', 'emotion-recognition', 'topic-modeling', 'lda', 'nmf', 'text-classification',
   'text-generation', 'summarization', 'question-answering', 'machine-translation', 'alignment',
   'word-sense-disambiguation', 'anaphora-resolution', 'coreference-resolution', 'dialogue-system',
   'chatbot', 'conversational-ai', 'intent-detection', 'slot-filling', 'voice-recognition', 'tts', 'stt',

   // Cognitive Science
   'cognitive-load', 'priming', 'anchoring', 'framing', 'loss-aversion', 'nudge',
   'heuristics', 'biases', 'confirmation-bias', 'availability-heuristic', 'representativeness',
   'system-1', 'system-2', 'dual-process', 'attention', 'memory', 'working-memory', 'long-term-memory',
   'sensory-memory', 'encoding', 'storage', 'retrieval', 'forgetting', 'interference', 'decay',
   'schema', 'script', 'mental-model', 'prototype', 'category', 'concept', 'decision-making',
   'problem-solving', 'creativity', 'insight', 'intelligence', 'reasoning', 'logic', 'argumentation',

   // Physics & Engineering
   'mechanics', 'kinematics', 'dynamics', 'statics', 'thermodynamics', 'entropy', 'enthalpy',
   'fluid-dynamics', 'aerodynamics', 'electromagnetism', 'optics', 'acoustics', 'quantum-mechanics',
   'relativity', 'astrophysics', 'cosmology', 'particle-physics', 'nuclear-physics', 'solid-state',
   'materials-science', 'metallurgy', 'ceramics', 'polymers', 'composites', 'nanotechnology',
   'civil-engineering', 'structural-engineering', 'geotechnical', 'transportation', 'hydraulics',
   'mechanical-engineering', 'robotics', 'mechatronics', 'control-systems', 'automation',
   'electrical-engineering', 'electronics', 'circuits', 'vlsi', 'semiconductors', 'power-systems',
   'chemical-engineering', 'process-engineering', 'biochemical', 'reaction', 'catalysis', 'separation',

   // Biology & Medicine
   'genetics', 'genomics', 'transcriptomics', 'proteomics', 'metabolomics', 'bioinformatics',
   'cell-biology', 'molecular-biology', 'microbiology', 'immunology', 'virology', 'bacteriology',
   'physiology', 'anatomy', 'pathology', 'pharmacology', 'toxicology', 'epidemiology', 'public-health',
   'clinical-trials', 'diagnostics', 'therapeutics', 'surgery', 'radiology', 'oncology', 'cardiology',
   'neurology', 'psychiatry', 'pediatrics', 'gynecology', 'dermatology', 'ophthalmology',
   'biotechnology', 'genetic-engineering', 'synthetic-biology', 'bioengineering', 'biomedical',
   'vaccination', 'antibody', 'antigen', 'pathogen', 'virus', 'bacteria', 'fungus', 'parasite',
   'chromosome', 'dna', 'rna', 'gene', 'allele', 'mutation', 'expression', 'regulation', 'translation',

   // Finance & Economics
   'microeconomics', 'macroeconomics', 'fiscal-policy', 'monetary-policy', 'inflation', 'deflation',
   'recession', 'depression', 'gdp', 'gnp', 'unemployment', 'interest-rate', 'exchange-rate',
   'stock-market', 'bond-market', 'commodity', 'derivative', 'option', 'future', 'swap', 'hedging',
   'portfolio-management', 'asset-allocation', 'risk-management', 'valuation', 'discounted-cash-flow',
   'net-present-value', 'internal-rate-of-return', 'payback-period', 'financial-statements',
   'balance-sheet', 'income-statement', 'cash-flow', 'audit', 'taxation', 'compliance', 'accounting',
   'banking', 'credit', 'debit', 'loan', 'mortgage', 'bankruptcy', 'liquidation', 'merger', 'acquisition',
   'ipo', 'venture-capital', 'private-equity', 'angel-investor', 'crowdfunding', 'fintech',

   // Law & Legal
   'constitution', 'statute', 'regulation', 'ordinance', 'bylaw', 'contract', 'tort', 'civil-law',
   'criminal-law', 'common-law', 'equity', 'jurisprudence', 'litigation', 'arbitration', 'mediation',
   'plaintiff', 'defendant', 'judgment', 'verdict', 'appeal', 'precedent', 'stare-decis',
   'intellectual-property', 'patent', 'trademark', 'copyright', 'trade-secret', 'license',
   'compliance', 'governance', 'ethics', 'professional-responsibility', 'malpractice', 'liability',
   'due-diligence', 'mergers-and-acquisitions', 'corporate-law', 'tax-law', 'employment-law',
   'immigration-law', 'international-law', 'human-rights', 'environmental-law', 'cyber-law',

   // Urdu Tech Terms (transliterated & script)
   'kompyuter', 'internet', 'software', 'hardware', 'database', 'network', 'server', 'file',
   'folder', 'download', 'upload', 'app', 'mobile-app', 'website', 'browser', 'password',
   'email', 'e-mail', 'login', 'logout', 'signup', 'sign-up', 'register', 'user', 'admin',
   'setting', 'settings', 'profile', 'account', 'security', 'privacy', 'terms', 'conditions',
   'link', 'url', 'http', 'https', 'www', 'com', 'net', 'org', 'edu', 'gov', 'mil',
   'html', 'css', 'javascript', 'python', 'java', 'php', 'ruby', 'c', 'cpp', 'csharp',
   'coding', 'programming', 'developer', 'programmer', 'engineer', 'designer', 'tester',
   'bug', 'error', 'fix', 'patch', 'update', 'upgrade', 'version', 'release', 'beta', 'alpha',
   'cloud', 'storage', 'backup', 'restore', 'data', 'information', 'system', 'application',
   'interface', 'ui', 'ux', 'user-interface', 'user-experience', 'responsive', 'mobile-friendly',
   'seo', 'search-engine', 'optimization', 'marketing', 'social-media', 'analytics', 'traffic',
   'domain', 'hosting', 'server', 'client', 'frontend', 'backend', 'fullstack', 'database',
   'کمپیوٹر', 'انٹرنیٹ', 'سافٹ ویئر', 'ہارڈ ویئر', 'ڈیٹا بیس', 'نیٹ ورک', 'سرور',
   'فائل', 'فولڈر', 'ڈاؤن لوڈ', 'اپ لوڈ', 'ایپ', 'موبائل ایپ', 'ویب سائٹ', 'براؤزر', 'پاس ورڈ',
   'ای میل', 'لاگ ان', 'لاگ آؤٹ', 'سائن اپ', 'رجسٹر', 'صارف', 'ایڈمن', 'ترتیبات',
   'پروفائل', 'اکاؤنٹ', 'سیکیورٹی', 'پرائیویسی', 'شرائط', 'لنک', 'یو آر ایل',
   'ایل', 'ایچ ٹی ٹی پی', 'ایس ایس ایل', 'ڈبلیو ڈبلیو ڈبلیو', 'کوم', 'نیٹ', 'آرج',
   'ایچ ٹی ایم ایل', 'سی ایس ایس', 'جاوا اسکرپٹ', 'پائتھون', 'جاوا', 'پی ایچ پی',
   'کوڈنگ', 'پروگرامنگ', 'ڈویلپر', 'پروگرامر', 'انجینئر', 'ڈیزائنر', 'ٹیسٹر',
   'بگ', ' ایرر', 'فکس', 'پیچ', 'اپ ڈیٹ', 'ورژن', 'ریلیز', 'بیٹا', 'الفا',
   'کلاؤڈ', 'اسٹوریج', 'بیک اپ', 'ڈیٹا', 'انفارمیشن', 'سسٹم', 'ایپلی کیشن',
   'انٹرفیس', 'یو آئی', 'یو ایکس', 'رہسپانسیو', 'ایس ای او', 'مارکیٹنگ',
   'سوشل میڈیا', 'اینالیٹکس', 'ٹریفک', 'ڈومین', 'ہوسٹنگ', 'فرنٹ اینڈ', 'بیک اینڈ'
 ]);

/**
 * A comprehensive set of sentiment-labeled words used for sentiment analysis or filtering in text processing.
 * Helps identify positive or negative connotations in text based on predefined linguistic patterns.
 * @example
 * if (SENTIMENT_WORDS.positive.has('excellent')) {
 *   console.log('"excellent" is marked as a positive word.');
 * }
 */
export const SENTIMENT_WORDS = {
  /**
   * A set of words typically associated with positive sentiment.
   */
  positive: new Set([
    'excellent', 'amazing', 'perfect', 'love', 'brilliant', 'outstanding', 'elegant', 'smooth', 'seamless', 'intuitive',
    'powerful', 'robust', 'reliable', 'efficient', 'fast', 'scalable', 'flexible', 'modular', 'clean', 'well-written',
    'professional', 'polished', 'mature', 'stable', 'battle-tested', 'production-ready', 'future-proof', 'innovative',
    'cutting-edge', 'state-of-the-art', 'impressive', 'remarkable', 'exceptional', 'flawless', 'delightful', 'joyful',
    'satisfying', 'pleasing', 'cohesive', 'consistent', 'thoughtful', 'insightful', 'comprehensive', 'thorough', 'solid',
    'trustworthy', 'secure', 'resilient', 'fault-tolerant', 'high-performance', 'optimized', 'refined', 'crafted',
    'sleek', 'beautiful', 'graceful', 'harmonious', 'balanced', 'precise', 'accurate', 'clear', 'concise', 'expressive',
    'eloquent', 'articulate', 'lucid', 'coherent', 'logical', 'rational', 'reasonable', 'sensible', 'practical', 'useful',
    'helpful', 'valuable', 'beneficial', 'advantageous', 'productive', 'effective', 'impactful', 'transformative',
    'revolutionary', 'groundbreaking', 'pioneering', 'visionary', 'inspiring', 'motivating', 'empowering', 'uplifting',
    'encouraging', 'supportive', 'compassionate', 'empathetic', 'understanding', 'patient', 'tolerant', 'open',
    'inclusive', 'diverse', 'accessible', 'universal', 'equitable', 'fair', 'just', 'honest', 'transparent', 'authentic',
    'genuine', 'sincere', 'real', 'true', 'faithful', 'loyal', 'devoted', 'dedicated', 'committed', 'passionate',
  ]),
  /**
   * A set of words typically associated with negative sentiment.
   */
  negative: new Set([
    'broken', 'terrible', 'awful', 'buggy', 'confusing', 'frustrating', 'slow', 'clunky', 'cumbersome', 'bloated',
    'unreliable', 'flaky', 'inconsistent', 'messy', 'spaghetti', 'undocumented', 'opaque', 'cryptic', 'arcane', 'obscure',
    'outdated', 'deprecated', 'legacy', 'rigid', 'inflexible', 'fragile', 'brittle', 'error-prone', 'unmaintainable',
    'unreadable', 'untestable', 'over-engineered', 'under-engineered', 'half-baked', 'incomplete', 'unfinished',
    'unstable', 'crash', 'hang', 'freeze', 'leak', 'race', 'deadlock', 'security', 'vulnerability', 'exploit',
    'hack', 'compromise', 'unsafe', 'risky', 'dangerous', 'flawed', 'defective', 'subpar', 'mediocre', 'lackluster',
    'disappointing', 'annoying', 'tedious', 'repetitive', 'redundant', 'verbose', 'noisy', 'cluttered', 'chaotic',
    'disorganized', 'incoherent', 'illogical', 'irrational', 'unreasonable', 'impractical', 'useless', 'unhelpful',
    'worthless', 'valueless', 'pointless', 'meaningless', 'senseless', 'nonsensical', 'absurd', 'ridiculous',
    'ludicrous', 'preposterous', 'outrageous', 'scandalous', 'shocking', 'appalling', 'horrifying', 'terrifying',
    'frightening', 'alarming', 'disturbing', 'unsettling', 'disconcerting', 'troubling', 'worrisome', 'anxious',
    'nervous', 'stressed', 'overwhelmed', 'burnt', 'out', 'exhausted', 'tired', 'fatigued', 'drained', 'depleted',
    'spent', 'worn', 'out', 'weary', 'jaded', 'cynical', 'skeptical', 'doubtful', 'suspicious', 'mistrustful',
    'paranoid', 'disappointed', 'let', 'down', 'betrayed', 'abandoned', 'rejected', 'ignored', 'neglected', 'overlooked',
    'dismissed', 'disregarded', 'undervalued', 'underappreciated', 'taken', 'for', 'granted', 'exploited', 'manipulated',
  ]),
};

/**
 * A comprehensive set of Urdu sentiment-labeled words used for sentiment analysis or filtering in text processing.
 * Helps identify positive or negative connotations in Urdu text based on predefined linguistic patterns.
 * @example
 * if (URDU_SENTIMENT_WORDS.positive.has('شاندار')) {
 *   console.log('"شاندار" is marked as a positive word.');
 * }
 */
 export const URDU_SENTIMENT_WORDS = {
   /**
    * A set of Urdu words typically associated with positive sentiment.
    * These words are commonly used in positive contexts such as praise, approval, or satisfaction.
    */
   positive: new Set([
     'شاندار', 'زبردست', 'بہترین', 'خوبصورت', 'قابلِ تعریف',
     'کامیاب', 'پر اعتماد', 'محبت', 'پیار', 'امید', 'خوشی',
     'ممتاز', 'عمدہ', 'پرسکون', 'خوشگوار', 'لطیف', 'جذباتی',
     'وفادار', 'سچا', 'امانتدار', 'محترم', 'عزیز', 'پیارا',
     'شکور', 'شاکر', 'محسن', 'مہربان', 'کرم فرما', 'مہربانی',
     'خیر خواہ', 'نیک خواہ', 'ہمدرد', 'سنجیدہ', 'سچی', 'پر خلوص',
     'پر سوز', 'جذبات', 'محبت', 'آرزو', 'تمنا', 'خواب', 'سحر',
     'صبح', 'صبح بخیر', 'شب بخیر', 'اللہ حافظ', 'خدا حافظ', 'خدا hafiz',
     'السلام علیکم', 'والسلام علیکم', 'آداب', 'تشکر', 'شکریہ', 'ممنون',
     'بہت خوب', 'بہت اچھا', 'عالیشان', 'اعلیٰ', 'عظیم', 'بزرگ',
     'کبیر', 'جلیل', 'قدیر', 'قادر', 'خالق', 'رازق', 'رزاق',
     'کریم', 'رحیم', 'رحمن', 'ملک', 'پاک', 'پاکستان', 'پائندہ',
     'باد', 'جائے رہا', 'زندہ باد', 'آباد', 'خوشحال', 'ترقی یافتہ',
     'پیش رفت', 'کامیابی', 'کامرانی', 'فتح', 'جیت', 'کامیابی',
     'نصرت', 'مدد', 'حمایت', 'تائید', 'سہارا', 'اشتراک', 'تعاون',
     'اتفاق', 'محبت', 'الفہ', 'میل', 'لگاؤ', 'چسپاں', 'جڑا',
     'جوڑا', 'ساتھی', 'رفقہ', 'دوست', 'یار', 'ساتھ', 'همراه',
     'همراز', 'رازدار', 'وفا', 'بندگی', 'فرمانبرداری', 'اطاعت',
     'تسلیم', 'قبولیت', 'رضامندی', 'خوشی', 'مسرت', 'شادمانی', 'جشن',
     'تہوار', ' Eid ', 'عید', 'عید مبارک', 'مبارک باد', 'نور',
     'روشن', 'چمک', 'درخش', 'جلا', 'تابانی', 'شعاع', 'کرنا',
     'منور', 'نورانی', 'صاف', 'صاف ستون', 'شفاف', 'واضح', 'بینا',
     'ظاہر', 'آشکار', 'کھلا', 'ازاد', 'آزاد', 'مستقل', 'پائیدار',
     'دائمی', 'ہمیشہ', 'سدا', 'دیرینہ', 'قدیم', 'سابق', 'گزشتہ',
     'ماضی', 'حاضر', 'مستقبل', 'آئندہ', 'آنے والا', 'آغاز', 'ابتدا',
     'شروعات', 'منتهی', 'آخر', 'ختام', 'مکمل', 'کامل', 'all',
     'تمام', 'سب', 'سارے', 'ہر', 'ہر ایک', 'کوئی بھی', 'کسی بھی',
     'کچھ بھی', 'سب کچھ', 'کوئی نہیں', 'کچھ نہیں', 'بھی', 'بھی',
     'پھر', 'دوبارہ', 'مکرر', 'بار بار', 'دائیں بائیں', 'ہر طرف',
     'دور و نزدیک', 'کہیں بھی', 'کہیں', 'کہیں نہیں', 'یہاں', 'وہاں',
     'ید', 'اڑ', 'نیچے', 'اوپر', 'پر', 'منڈھا', 'پیچھے', 'آگے',
     'سامنے', 'روبرو', 'ساتھ', 'بغیر', 'بدون', 'سوا', 'الوا',
     'علاوہ', 'علاوہ ازیں', 'علاوہ ازین', 'علاوہ ازاں', 'علاوہ اس',
     'علاوہ ان', 'علاوہ وہ', 'علاوہ یہ', 'علاوہ تو', 'علاوہ ہم',
     'علاوہ تم', 'علاوہ آپ', 'علاوہ میں', 'سوال', 'جواب', 'فتویٰ',
     'حکم', 'فرمان', 'حکمت', 'دانائی', 'عقل', 'سمجھ', 'خیال',
     'فکر', 'سوچ', 'تصور', 'تخیل', 'خواب', 'جیسا', 'طرح', 'طرح',
     'طرح', 'سی', 'سانسے', 'مانند', 'طرح', 'مانند', 'شبہ', 'یقین',
     'ایمان', 'توکل', 'اعتماد', 'بھروسہ', 'سکون', 'طمأنینہ', 'پرامن',
     'خوشگوار', 'ممتاز', 'انتہائی', 'نہایت', 'بسیار', 'بہت', 'کافی',
     'کتنا', 'کتنی', 'کتنے', 'قدر', 'قدر', 'انقدار', 'ایسا',
     'ویسا', 'وہ', 'یہ', 'وہی', 'یہی', 'وہی', 'یہی', 'وہی',
   ]),
   /**
    * A set of Urdu words typically associated with negative sentiment.
    * These words are commonly used in negative contexts such as criticism, disappointment, or dissatisfaction.
    */
   negative: new Set([
     'بُرا', 'ناکام', 'ناامید', 'غم', 'الجھن', 'کدورت',
     'ناانصافی', 'ظلم', 'ناقابلِ تصور', 'ناقابلِ قبول',
     'بیزاری', 'ناراضگی', 'غصہ', 'خفا', 'بدگمانی', 'شک',
     'دشمنی', 'کینہ', ' نفرت', 'بدنامی', 'عزت کی ہزیمت', 'رسوائی',
     'شرمندگی', 'گناہ', 'جرم', 'خطا', 'قصوروار', 'ملامت',
     'تنقید', 'مذمت', 'الزام', 'دشنام', 'بدنام', 'بدنام',
     'خراب', 'برباد', 'تباہ', 'ہلاک', 'فنا', 'زوال', 'گرنا',
     'ٹوٹنا', 'ٹوٹ پھوٹ', 'پھٹ پڑنا', 'بگڑنا', 'بگاڑ', 'خرابی',
     'مسئلہ', 'مشکل', 'صعوبت', 'مشقت', 'تنگی', 'پریشانی', 'مصیبت',
     'آفت', 'تباہی', 'بربادی', 'غلہ', 'قحط', 'بحران', 'اندھیرا',
     'تاریکی', 'ظلمت', 'سردی', 'گرمی', 'آگ', 'آنسو', 'رونا',
     'فغان', 'فریاد', 'چیخ', 'زاری', 'نالہ', 'درد', 'صدمہ',
     'دکھ', 'تکلیف', 'زخم', 'مار', 'چوٹ', 'بیمار', 'مریض',
     'علیل', 'کسیر', 'اوجھل', 'ناکسار', 'نااہل', 'لاحق', 'مددگار',
     'آزاد', 'قیدی', 'بند', 'محبوس', 'گرفتار', 'مجرم', 'جانی',
     'خطرناک', 'نقصان دہ', 'مضر', 'ہلاک کن', 'قاتل', 'خون خوار',
     'وحشی', 'جابر', 'ظالم', 'ستمگر', 'آزار', 'اذهان', 'پریشان',
     'پریشان حال', 'بیچارہ', 'بے بس', 'مجبور', 'مستور', 'لاچار',
     'مامور', 'خدمت گار', 'چاکر', 'غلام', 'محکوم', 'مظلوم',
     'مجبور', 'مستضل', 'مغلوب', 'شکست خوردہ', 'ناکام', 'خائف',
     'ڈرپوک', 'بزدل', 'حریص', 'لالچی', 'کنبہ', 'خواہش مند', 'طمع',
     'شہوت', 'ہوس', 'فساد', 'بدکاری', 'گناہ', 'جرم', 'اثم',
     'شرارت', 'بدذاتی', 'برائی', 'پاکیزہ', 'ناپاکی', 'نجاست',
     'گندگی', 'آلودگی', 'بدبو', 'میلا', 'خراب', 'سڑا', 'خشک',
     'پوست', 'بے روح', 'مردہ', 'پرانی', 'قدیم', 'گزرا ہوا', 'ماضی',
     'فراموش', 'بھول گیا', 'یاد', 'یاد آوری', 'ناصرف', 'صرف',
     'محض',
   ])
 };

/**
 * A collection of linguistic patterns and prefixes/suffixes used to detect technical or complex language structures.
 * Useful for identifying code-like terms, jargon, or formal terminology in text analysis.
 * @example
 * // Check if a word matches a technical pattern
 * if (LINGUISTIC_PATTERNS.technicalPatterns[0].test('camelCase')) {
 *   console.log('"camelCase" matches a technical pattern.');
 * }
 */
 export const LINGUISTIC_PATTERNS = {
   /**
    * Common prefixes used in technical or formal terminology (e.g., 'hyper', 'neuro', 'trans').
    */
   technicalPrefixes: new Set([
     'a', 'ab', 'abs', 'acro', 'ad', 'afi', 'al', 'ana', 'ante', 'anti', 'apo', 'arch', 'as', 'at', 'auto', 'be', 'bi', 'bio', 'by',
     'cata', 'circum', 'co', 'col', 'com', 'con', 'contra', 'cor', 'counter', 'crypto', 'cyber', 'de', 'deca', 'deci', 'demi', 'demo',
     'den', 'des', 'di', 'dia', 'dif', 'dis', 'dys', 'e', 'ef', 'em', 'en', 'endo', 'epi', 'equi', 'ex', 'exo', 'extra', 'for', 'fore',
     'geo', 'glyco', 'gyn', 'hemi', 'hept', 'hex', 'holo', 'homo', 'hyper', 'hypo', 'ibi', 'il', 'im', 'in', 'infra', 'inter', 'intra',
     'iso', 'juxta', 'kilo', 'macro', 'mal', 'mega', 'meta', 'micro', 'milli', 'mini', 'mis', 'mono', 'multi', 'nano', 'neo', 'neuro',
     'non', 'nov', 'ob', 'oc', 'oct', 'omni', 'opt', 'ortho', 'out', 'over', 'pan', 'para', 'pent', 'per', 'peri', 'poly', 'post', 'pre',
     'pro', 'proto', 'pseudo', 'quad', 'quasi', 're', 'retro', 'semi', 'sept', 'sub', 'super', 'supra', 'sym', 'syn', 'tele', 'tetra',
     'trans', 'tri', 'twi', 'ultra', 'un', 'under', 'uni', 'vice', 'with', 'xeno', 'xyl', 'y',
   ]),
   /**
    * Common suffixes used in complex or formal vocabulary (e.g., 'ization', 'ment', 'ness').
    */
   complexSuffixes: new Set([
     'able', 'ac', 'acea', 'aceous', 'acious', 'acy', 'ade', 'age', 'aholic', 'al', 'ality', 'an', 'ance', 'ancy', 'ant', 'ar',
     'ard', 'arian', 'arium', 'ary', 'ase', 'aster', 'astic', 'ate', 'atic', 'ation', 'ative', 'ator', 'atory', 'cide', 'cle', 'cy',
     'cycle', 'd', 'dom', 'dont', 'dure', 'ed', 'ee', 'eer', 'ele', 'en', 'ence', 'ency', 'ent', 'eous', 'er', 'ern', 'escence',
     'escent', 'esque', 'ess', 'est', 'etic', 'ette', 'eur', 'fic', 'fid', 'fold', 'form', 'ful', 'fy', 'gence', 'gon', 'grade',
     'gram', 'graph', 'graphy', 'hedral', 'hedron', 'hex', 'hood', 'ia', 'iac', 'ian', 'iasis', 'ible', 'ic', 'ical', 'id', 'ide',
     'ile', 'ility', 'ily', 'ine', 'ing', 'ion', 'ious', 'ise', 'ish', 'ism', 'ist', 'ite', 'itis', 'itude', 'ive', 'ivity', 'ization',
     'ize', 'kin', 'less', 'let', 'like', 'ling', 'log', 'logue', 'ly', 'ment', 'mency', 'meter', 'metry', 'most', 'ness', 'oid',
     'oid', 'oma', 'on', 'onym', 'ology', 'or', 'ory', 'osis', 'osis', 'ost', 'ous', 'path', 'pathy', 'phile', 'phobia', 'phone',
     'phyte', 'pie', 'ple', 'ples', 'proof', 'ress', 'ric', 'ry', 'scape', 'scope', 'scribe', 'scrip', 'se', 'ship', 'shop', 'side',
     'sion', 'some', 'some', 'sphere', 'stan', 'ster', 'stic', 'tion', 'tious', 'tive', 'tomy', 'tude', 'ture', 'ty', 'ular',
     'ule', 'ulous', 'um', 'un', 'und', 'ure', 'ure', 'ward', 'ways', 'wise', 'work', 'y', 'yer',
   ]),
   /**
    * Regular expressions to detect common technical or structured writing patterns (e.g., camelCase, snake_case).
    */
   technicalPatterns: [
     /\b[a-z]+(?:[A-Z][a-z]+)+\b/, // camelCase
     /\b[A-Z]+[a-z]+(?:[A-Z]+[a-z]+)*\b/, // PascalCase
     /\b[a-z]+(?:_[a-z]+)+\b/, // snake_case
     /\b[A-Z]+(?:_[A-Z]+)+\b/, // SCREAMING_SNAKE_CASE
     /\b\d+\w*\b/, // words with numbers
     /\b\w+-\w+\b/, // hyphenated words
   ],
 };

/**
 * Removes markdown formatting, headers, links, images, and other elements from text, returning plain text.
 * Useful for preprocessing markdown content before further text analysis or processing.
 * @example
 * const markdownText = '# Header\nThis is a **bold** text with [link](https://example.com)';
 * const cleanText = cleanMarkdown(markdownText);
 * console.log(cleanText); // "This is a bold text with link"
 */
export const cleanMarkdown = (text: string): string => {
  // Remove markdown headers
  let cleanText = text.replace(/^#+\s+/gm, '');

  // Remove markdown links [text](url) -> text
  cleanText = cleanText.replace(/\[([^\]]+)]\([^)]+\)/g, '$1');

  // Remove images
  cleanText = cleanText.replace(/!\[[^\]]*]\([^)]*\)/g, '');

  // Remove bold and italic markers
  cleanText = cleanText.replace(/(\*\*|__)(.*?)\1/g, '$2');
  cleanText = cleanText.replace(/([*_])(.*?)\1/g, '$2');

  // Remove inline code markers
  cleanText = cleanText.replace(/`([^`]*)`/g, '$1');

  // Remove blockquotes
  cleanText = cleanText.replace(/^\s*>\s+/gm, '');

  // Remove horizontal rules
  cleanText = cleanText.replace(/^(-{3,}|_{3,}|\*{3,})\s*$/gm, '');

  // Remove HTML tags
  cleanText = cleanText.replace(/<[^>]*>/g, '');

  // Remove markdown formatting characters and symbols
  return cleanText
    .replace(/[*_~`#>[\](){}|\\/^$+.!?,;:@]/g, '') // Remove all symbols and markdown chars
    .replace(/<\/?[^>]+(>|$)/g, '') // Remove HTML tags
    .replace(/[0-9]+[^\p{L}\s][0-9]*/gu, '') // Remove words with numbers and symbols combined
    .replace(/[^a-zA-Z\s'-]/g, '') // Keep only letters, spaces, hyphens and apostrophes
    .replace(/^\s+|\s+$/g, '') // Trim whitespace
    .replace(/\s+/g, ' ') // Normalize spaces
    .toLowerCase()
    .split(' ')
    .filter(part => part.length > 1) // Remove single character parts
    .join(' ')
    .trim();
};

/**
 * Extracts words from text along with their frequency and original forms, using intelligent processing.
 * This function may normalize words, remove stop words, and group variations into canonical forms.
 * @example
 * const result = extractWordsWithIntelligence("JavaScript is fun, JavaScript is powerful!");
 * console.log(result);
 * // [
 * //   { word: "javascript", count: 2, originalForms: ["JavaScript", "JavaScript"] },
 * //   { word: "is", count: 2, originalForms: ["is", "is"] },
 * //   { word: "fun", count: 1, originalForms: ["fun"] },
 * //   { word: "powerful", count: 1, originalForms: ["powerful"] }
 * // ]
 * @returns An array of extracted words with their counts and original forms.
 */
export const extractWordsWithIntelligence = (text: string) => {
  let clean = text.toLowerCase().replace(/'s\b/g, '').replace(/'/g, '');

  const phrases = [
    // AI & ML
    'machine learning', 'deep learning', 'neural network', 'artificial intelligence',
    'natural language processing', 'large language model', 'generative ai', 'computer vision',
    'reinforcement learning', 'supervised learning', 'unsupervised learning', 'transfer learning',
    'gradient descent', 'backpropagation', 'convolutional neural network', 'recurrent neural network',
    'transformer model', 'attention mechanism', 'tokenization', 'embedding', 'vector database',
    'model inference', 'model training', 'hyperparameter tuning', 'feature engineering', 'data augmentation',
    'loss function', 'activation function', 'epoch', 'batch size', 'overfitting', 'underfitting',
    'bias variance tradeoff', 'random forest', 'decision tree', 'support vector machine', 'k-means clustering',
    'principal component analysis', 'anomaly detection', 'pattern recognition', 'speech recognition',
    'image classification', 'object detection', 'semantic segmentation', 'optical character recognition',

    // Web Development (Frontend & Backend)
    'user interface', 'user experience', 'front end', 'back end', 'full stack', 'data science',
    'react component', 'state management', 'api endpoint', 'type script', 'java script',
    'single page application', 'progressive web app', 'server side rendering', 'client side rendering',
    'static site generation', 'content delivery network', 'document object model', 'virtual dom',
    'cascading style sheets', 'responsive design', 'mobile first', 'cross browser compatibility',
    'web accessibility', 'accessibility tree', 'aria attributes', 'semantic html', 'progressive enhancement',
    'graphql', 'rest api', 'soap api', 'grpc', 'websocket', 'web real time communication',
    'http request', 'http response', 'status codes', 'headers', 'cookies', 'local storage',
    'session storage', 'indexed db', 'service worker', 'web cache', 'cache invalidation',
    'lazy loading', 'code splitting', 'tree shaking', 'minification', 'bundling', 'webpack',
    'vite', 'babel', 'eslint', 'prettier', 'jest', 'cypress', 'selenium', 'puppeteer',
    'node js', 'deno', 'bun', 'express', 'koa', 'nest js', 'fastify', 'django', 'flask',
    'ruby on rails', 'spring boot', 'laravel', 'asp.net core', 'microservices architecture',
    'monolithic architecture', 'serverless computing', 'function as a service', 'containerization',
    'docker container', 'kubernetes cluster', 'orchestration', 'load balancing', 'reverse proxy',
    'nginx', 'apache', 'ingress controller', 'service mesh', 'istio', 'envoy proxy',

    // DevOps & Cloud
    'continuous integration', 'continuous delivery', 'infrastructure as code', 'zero trust',
    'multi factor authentication', 'feature toggle', 'dark launch', 'blue green deployment',
    'canary release', 'chaos engineering', 'ci cd pipeline', 'build automation', 'test automation',
    'deployment automation', 'configuration management', 'version control', 'git flow', 'pull request',
    'code review', 'merge conflict', 'branching strategy', 'trunk based development', 'semantic versioning',
    'cloud computing', 'public cloud', 'private cloud', 'hybrid cloud', 'multi cloud strategy',
    'amazon web services', 'aws services', 'microsoft azure', 'google cloud platform', 'ibm cloud',
    'oracle cloud', 'alibaba cloud', 'digital ocean', 'heroku', 'vercel', 'netlify',
    'infrastructure as a service', 'platform as a service', 'software as a service',
    'virtual private cloud', 'virtual network', 'subnet', 'security group', 'firewall rules',
    'identity and access management', 'role based access control', 'active directory', 'ldap',
    'single sign on', 'oauth 2.0', 'open id connect', 'json web token', 'session management',
    'audit logging', 'compliance monitoring', 'disaster recovery', 'business continuity',
    'high availability', 'fault tolerance', 'scalability', 'elasticity', 'auto scaling',
    'resource provisioning', 'cost management', 'cloud optimization', 'right sizing',
    'monitoring and alerting', 'observability', 'application performance monitoring', 'log aggregation',
    'metrics collection', 'distributed tracing', 'error tracking', 'uptime monitoring',
    'health check', 'readiness probe', 'liveness probe', 'prometheus', 'grafana', 'elk stack',
    'splunk', 'datadog', 'new relic', 'sentry', 'pagerduty', 'incident response',
    'root cause analysis', 'postmortem', 'service level agreement', 'service level objective',
    'service level indicator', 'mean time to recovery', 'mean time between failures',

    // Database & Data Engineering
    'relational database', 'non relational database', 'nosql database', 'document store',
    'key value store', 'graph database', 'time series database', 'in memory database',
    'data warehouse', 'data lake', 'data lakehouse', 'data pipeline', 'etl process',
    'elt process', 'batch processing', 'stream processing', 'real time analytics',
    'structured query language', 'acid properties', 'base model', 'cap theorem', 'transactions',
    'indexing strategy', 'query optimization', 'execution plan', 'database normalization',
    'denormalization', 'foreign key constraint', 'primary key constraint', 'unique constraint',
    'database sharding', 'horizontal scaling', 'vertical scaling', 'database replication',
    'master slave replication', 'leader follower replication', 'multi leader replication',
    'read replica', 'write ahead logging', 'acid compliance', 'eventual consistency',
    'strong consistency', 'distributed transaction', 'two phase commit', 'saga pattern',
    'sql injection', 'database connection pooling', 'connection string', 'data source',
    'object relational mapping', 'query builder', 'database migration', 'schema evolution',
    'data governance', 'data quality', 'master data management', 'data lineage', 'metadata',
    'data catalog', 'data privacy', 'data anonymization', 'pseudonymization', 'encryption at rest',
    'encryption in transit', 'data masking', 'tokenization', 'key management', 'hardware security module',

    // Cybersecurity
    'cybersecurity', 'information security', 'network security', 'application security',
    'penetration testing', 'vulnerability assessment', 'threat modeling', 'attack surface',
    'attack vector', 'social engineering', 'phishing attack', 'malware analysis', 'ransomware',
    'zero day vulnerability', 'common vulnerabilities and exposures', 'security misconfiguration',
    'broken access control', 'cryptographic failures', 'injection flaws', 'insecure design',
    'security monitoring', 'security information and event management', 'intrusion detection system',
    'intrusion prevention system', 'firewall', 'next generation firewall', 'web application firewall',
    'denial of service', 'distributed denial of service', 'mitigation techniques', 'rate limiting',
    'throttling', 'secure software development life cycle', 'shift left security', 'devsecops',
    'static application security testing', 'dynamic application security testing', 'interactive application security testing',
    'software composition analysis', 'dependency management', 'supply chain security', 'code signing',
    'digital signature', 'public key infrastructure', 'certificate authority', 'ssl certificate',
    'tls protocol', 'transport layer security', 'secure sockets layer', 'https', 'ssh',
    'virtual private network', 'secure shell', 'secure file transfer protocol', 'authentication',
    'authorization', 'accounting', 'non repudiation', 'biometric authentication', 'multi factor authentication',
    'adaptive authentication', 'risk based authentication', 'privileged access management',
    'just in time access', 'zero trust architecture', 'never trust always verify', 'perimeter security',
    'network segmentation', 'demilitarized zone', 'bastion host', 'jump server', 'air gapped network',
    'data breach', 'incident response plan', 'forensics', 'malicious code', 'spyware', 'adware',
    'trojan horse', 'computer worm', 'botnet', 'command and control', 'exploit kit', 'payload',

    // Software Architecture & Design Patterns
    'software architecture', 'system design', 'enterprise architecture', 'solution architecture',
    'domain driven design', 'test driven development', 'behavior driven development', 'acceptance test driven development',
    'design patterns', 'architectural patterns', 'gang of four patterns', 'singleton pattern',
    'factory pattern', 'builder pattern', 'prototype pattern', 'adapter pattern', 'decorator pattern',
    'facade pattern', 'proxy pattern', 'observer pattern', 'publish subscribe pattern', 'strategy pattern',
    'command pattern', 'chain of responsibility', 'iterator pattern', 'composite pattern', 'flyweight pattern',
    'model view controller', 'model view presenter', 'model view viewModel', 'flux architecture', 'redux pattern',
    'cqrs', 'command query responsibility segregation', 'event sourcing', 'event driven architecture',
    'microkernel architecture', 'space based architecture', 'layered architecture', 'hexagonal architecture',
    'onion architecture', 'clean architecture', 'solid principles', 'dry principle', 'kiss principle',
    'yagni principle', 'separation of concerns', 'coupling and cohesion', 'loose coupling', 'high cohesion',
    'abstraction', 'encapsulation', 'inheritance', 'polymorphism', 'composition over inheritance',
    'interface segregation', 'dependency inversion', 'dependency injection', 'inversion of control',
    'service locator pattern', 'template method pattern', 'memento pattern', 'state pattern', 'visitor pattern',
    'mediator pattern', 'interpreter pattern', 'bridge pattern', 'flyweight pattern', 'proxy pattern',
    'software design principles', 'architectural decision records', 'design thinking', 'agile methodology',
    'scrum framework', 'kanban board', 'lean startup', 'extreme programming', 'pair programming',
    'mob programming', 'code review', 'refactoring', 'technical debt', 'legacy code', 'spaghetti code',
    'big ball of mud', 'software entropy', 'conway law', 'consul', 'zookeeper', 'etcd',

    // Mobile Development
    'mobile application development', 'native mobile development', 'cross platform development',
    'hybrid mobile app', 'progressive web app', 'react native', 'flutter', 'ionic', 'xamarin',
    'swift programming', 'swiftui', 'uikit', 'kotlin', 'jetpack compose', 'android sdk',
    'gradle build system', 'android manifest', 'app lifecycle', 'activity', 'fragment', 'intent',
    'service', 'broadcast receiver', 'content provider', 'view model', 'live data', 'data binding',
    'room database', 'sqlite', 'core data', 'realm database', 'firebase', 'google play services',
    'apple app store', 'app store optimization', 'mobile analytics', 'crash reporting', 'performance monitoring',
    'push notifications', 'in app purchases', 'mobile payments', 'biometrics authentication',
    'background processing', 'foreground service', 'work manager', 'alarm manager', 'job scheduler',
    'network requests', 'retrofit', 'okhttp', 'alamofire', 'volley', 'image loading', 'glide',
    'picasso', 'coil', 'kingfisher', 'custom views', 'animations', 'transitions', 'gestures',
    'touch events', 'recycler view', 'table view', 'collection view', 'navigation component',
    'material design', 'human interface guidelines', 'design system', 'component library',

    // Blockchain & Web3
    'blockchain technology', 'distributed ledger', 'smart contract', 'decentralized application',
    'ethereum', 'bitcoin', 'cryptocurrency', 'digital currency', 'virtual currency', 'altcoin',
    'stablecoin', 'central bank digital currency', 'non fungible token', 'nft marketplace',
    'decentralized finance', 'defi protocol', 'yield farming', 'liquidity mining', 'staking',
    'crypto wallet', 'hardware wallet', 'software wallet', 'metamask', 'web3 js', 'ethers js',
    'consensus mechanism', 'proof of work', 'proof of stake', 'proof of authority', 'delegated proof of stake',
    'proof of history', 'byzantine fault tolerance', 'hash rate', 'mining pool', 'block reward',
    'gas fee', 'transaction fee', 'gas limit', 'gas price', 'ether', 'gwei', 'wei', 'satoshi',
    'block explorer', 'ethereum virtual machine', 'solidity', 'rust', 'chainlink', 'oracle network',
    'interoperability', 'cross chain bridge', 'atomic swap', 'layer 2 scaling', 'rollup',
    'zero knowledge proof', 'zk snark', 'zk stark', 'privacy coin', 'mixing service', 'tumbler',
    'dao', 'decentralized autonomous organization', 'governance token', 'utility token', 'security token',
    'initial coin offering', 'initial exchange offering', 'security token offering', 'airdrop',
    'tokenomics', 'market cap', 'circulating supply', 'total supply', 'all time high',
    'fear and greed index', 'bull market', 'bear market', 'hodl', 'fomo', 'dyor', 'whale',
    'scalability', 'trilemma', 'sharding', 'sidechain', 'plasma', 'state channel', 'lightning network',
    'peer to peer network', 'node operator', 'full node', 'light node', 'masternode', 'validator node',
    'soft fork', 'hard fork', 'chain split', 'immutability', 'censorship resistance', 'trustlessness',

    // Internet of Things (IoT)
    'internet of things', 'iot devices', 'smart home', 'connected devices', 'industrial internet of things',
    'edge computing', 'fog computing', 'iot platform', 'iot gateway', 'sensor network',
    'embedded systems', 'microcontroller', 'system on chip', 'firmware', 'real time operating system',
    'mqtt protocol', 'coap protocol', 'amqp', 'opc ua', 'zigbee', 'z wave', 'ble', 'bluetooth low energy',
    'lora', 'lorawan', 'nb iot', 'sigfox', 'wifi', 'cellular iot', 'lte m', '5g iot',
    'actuator', 'transducer', 'raspberry pi', 'arduino', 'esp32', 'esp8266', 'stm32',
    'arduino ide', 'platformio', 'micropython', 'circuitpython', 'free rtos', 'embedded linux',
    'device management', 'over the air update', 'ota update', 'device provisioning', 'device authentication',
    'iot security', 'hardware security module', 'secure element', 'trusted execution environment',
    'telemetry', 'data logging', 'time series data', 'predictive maintenance', 'digital twin',
    'smart city', 'smart grid', 'connected car', 'vehicle to everything', 'v2x', 'autonomous vehicle',
    'industrial automation', 'plc', 'programmable logic controller', 'scada', 'supervisory control and data acquisition',
    'hmi', 'human machine interface', 'fieldbus', 'modbus', 'profibus', 'industrial ethernet',

    // Quantum Computing
    'quantum computing', 'quantum mechanics', 'quantum physics', 'quantum theory', 'quantum bits',
    'qubit', 'superposition', 'entanglement', 'quantum interference', 'quantum decoherence',
    'quantum gate', 'quantum circuit', 'quantum algorithm', 'shor algorithm', 'grover algorithm',
    'quantum supremacy', 'quantum advantage', 'quantum annealing', 'adiabatic quantum computation',
    'quantum error correction', 'surface code', 'fault tolerant quantum computing', 'noisy intermediate scale quantum',
    'quantum simulator', 'quantum cloud', 'ibm quantum', 'google sycamore', 'rigetti computing',
    'ionq', 'd wave systems', 'quantum programming', 'qiskit', 'cirq', 'pyquil', 'braket',
    'quantum cryptography', 'quantum key distribution', 'post quantum cryptography', 'quantum safe',
    'quantum sensing', 'quantum metrology', 'quantum imaging', 'quantum communication',
    'topological quantum computing', 'anyons', 'majorana fermions', 'spin qubit', 'trapped ion qubit',
    'superconducting qubit', 'photonic qubit', 'neutral atom qubit', 'silicon spin qubit',
    'quantum volume', 'quantum fidelity', 'coherence time', 'relaxation time', 'dephasing time',

    // Game Development
    'game development', 'game engine', 'unity engine', 'unreal engine', 'godot engine',
    'game design', 'level design', 'game mechanics', 'gameplay loop', 'player progression',
    'game physics', 'collision detection', 'rigid body dynamics', 'soft body physics',
    'rendering pipeline', 'graphics pipeline', 'shader programming', 'vertex shader', 'fragment shader',
    'compute shader', 'ray tracing', 'path tracing', 'global illumination', 'lighting model',
    'physically based rendering', 'pbr', 'texture mapping', 'normal mapping', 'displacement mapping',
    'bump mapping', 'parallax mapping', 'ambient occlusion', 'screen space ambient occlusion',
    'shadow mapping', 'cascade shadows', 'shadow volumes', 'bloom', 'depth of field', 'motion blur',
    'anti aliasing', 'multisampling', 'temporal anti aliasing', 'supersampling', 'post processing',
    'particle system', 'vfx', 'visual effects', 'animation system', 'skeletal animation', 'blend shapes',
    'inverse kinematics', 'forward kinematics', 'animation tree', 'state machine', 'animation blending',
    'artificial intelligence', 'behavior tree', 'finite state machine', 'navigation mesh', 'pathfinding',
    'a star algorithm', 'dijkstra algorithm', 'steering behaviors', 'flocking', 'boids',
    'game networking', 'replication', 'interpolation', 'extrapolation', 'lag compensation',
    'client side prediction', 'server reconciliation', 'tick rate', 'snapshot interpolation',
    'entity component system', 'data oriented design', 'cache coherence', 'memory management',
    'object pooling', 'spatial partitioning', 'quadtree', 'octree', 'broad phase', 'narrow phase',
    'game ui', 'user interface', 'hud', 'heads up display', 'menu system', 'input handling',
    'game controller', 'keyboard and mouse', 'touch input', 'virtual reality', 'vr',
    'augmented reality', 'ar', 'mixed reality', 'mr', 'xr', 'spatial computing', 'haptics',
    'procedural generation', 'terrain generation', 'dungeon generation', 'perlin noise', 'simplex noise',
    'wave function collapse', 'cellular automata', 'game audio', 'sound design', 'music composition',
    'audio engine', 'fmod', 'wwise', 'audio middleware', 'spatial audio', '3d audio', 'hrtf',
  ];

  const placeholders: { [key: string]: string } = {};
  phrases.forEach((phrase, idx) => {
    const placeholder = `__PHRASE_${idx}__`;
    const regex = new RegExp(phrase.replace(/\s+/g, '\\s+'), 'gi');
    if (clean.match(regex)) {
      clean = clean.replace(regex, placeholder);
      placeholders[placeholder] = phrase;
    }
  });

  const wordTokens = clean
    .split(/[\s\p{P}\p{M}]+/u)
    .map(w => w.trim())
    .filter(w =>
      (w.length >= 3 && !STOP_WORDS.has(w)) ||
      (w.length >= 2 && /^[\u0600-\u06FF]/.test(w) && !URDU_STOP_WORDS.has(w))
    );

  const finalWords: string[] = [];
  wordTokens.forEach(token => {
    if (token in placeholders) {
      finalWords.push(placeholders[token]);
    } else if (token) {
      finalWords.push(token);
    }
  });

  const wordMap = new Map<string, { count: number; originalForms: Set<string> }>();
  finalWords.forEach(word => {
    if (word.length < 2) return;
    if (/^\d+$/.test(word) || /(http|www|com|net|org|io|dev)$/i.test(word)) return;
    if (!wordMap.has(word)) {
      wordMap.set(word, { count: 0, originalForms: new Set() });
    }
    const entry = wordMap.get(word)!;
    entry.count++;
    entry.originalForms.add(word);
  });

  return Array.from(wordMap.entries())
    .map(([word, { count, originalForms }]) => ({
      word,
      count,
      originalForms: Array.from(originalForms),
    }))
    .sort((a, b) => b.count - a.count);
};

/**
 * Estimates the number of syllables in a word based on its length and basic vowel patterns.
 * This is a simplified implementation that may not capture all linguistic nuances.
 * @example
 * estimateSyllables("example"); // Returns 3
 * estimateSyllables("the"); // Returns 1
 */
export const estimateSyllables = (word: string): number => {
  if (word.length <= 3) return 1;
  if (/^[\u0600-\u06FF]/.test(word)) return Math.ceil(word.length / 3); // Urdu heuristic
  let modified = word.toLowerCase()
    .replace(/(?:[^laeiouy]es|[^laeiouy]e)$/, '')
    .replace(/^y/, '');
  const matches = modified.match(/[aeiouy]{1,2}/g);
  if (word.endsWith('le') && word.length > 2 && !/[aeiouy]/.test(word[word.length - 3])) {
    return Math.max(1, (matches?.length || 1) + 1);
  }
  return Math.max(1, matches?.length || 1);
};

/**
 * Calculates complexity metrics for a given word, such as length, syllable count, and readability score.
 * This is a placeholder implementation and should be extended with NLP-based logic for accurate results.
 * @example
 * const metrics = calculateWordComplexity("sophistication");
 * console.log(metrics);
 * // {
 * //   length: 14,
 * //   syllableCount: 5,
 * //   technicalScore: 0.8,
 * //   rarityScore: 0.2,
 * //   contextRelevance: 0.7,
 * //   readabilityScore: 3.5
 * // }
 * @returns A `WordComplexityMetrics` object containing various linguistic and readability metrics.
 */
export const calculateWordComplexity = (word: string): WordComplexityMetrics => {
  const length = word.length;
  const syllables = estimateSyllables(word);
  const isUrdu = /^[\u0600-\u06FF]/.test(word);

  const baseTechnicalScore = TECHNICAL_TERMS.has(word.toLowerCase()) ? 1.0 : 0.0;
  const prefixScore = Array.from(LINGUISTIC_PATTERNS.technicalPrefixes).some(prefix =>
    word.toLowerCase().startsWith(prefix)
  ) ? 0.3 : 0.0;
  const suffixScore = Array.from(LINGUISTIC_PATTERNS.complexSuffixes).some(suffix =>
    word.toLowerCase().endsWith(suffix)
  ) ? 0.2 : 0.0;
  const partsTechnicalScore = word.split(' ').some(part =>
    TECHNICAL_TERMS.has(part.toLowerCase())
  ) ? 0.7 : 0.0;
  const technicalScore = Math.min(1.0, Math.max(baseTechnicalScore, partsTechnicalScore, prefixScore + suffixScore));

  let rarityScore = 0;
  if (length > 10) rarityScore += 0.3;
  if (length > 15) rarityScore += 0.2;
  if (/[xqzj]/.test(word.toLowerCase())) rarityScore += 0.15;
  if (/[bcdfghjklmnpqrstvwxyz]{3,}/i.test(word)) rarityScore += 0.2;
  if (/\d/.test(word)) rarityScore += 0.1;
  if (isUrdu) rarityScore += 0.1; // Urdu words less common in English corpuses
  rarityScore = Math.min(1, rarityScore);

  let readabilityScore = 0;
  readabilityScore += (length > 12 ? 0.3 : 0);
  readabilityScore += (syllables > 3 ? 0.4 : 0);
  readabilityScore += (technicalScore > 0.7 ? 0.3 : 0);
  readabilityScore = Math.min(1, readabilityScore);

  return {
    length,
    syllableCount: syllables,
    technicalScore,
    rarityScore,
    contextRelevance: 0.5,
    readabilityScore,
  };
};

/**
 * Generates a list of linguistic and readability insights based on processed words, text length, and raw text.
 * This is a placeholder implementation and should be expanded with domain-specific logic and NLP tools.
 * @example
 * const insights = generateInsights(processedWords, 500, "This is a sample text...");
 * console.log(insights);
 * // [
 * //   {
 * //     id: "insight_001",
 * //     type: "complex",
 * //     category: "lexical",
 * //     word: "sophistication",
 * //     frequency: 2,
 * //     message: "The word 'sophistication' may be too complex for the target audience.",
 * //     severity: "high",
 * //     confidence: 0.85,
 * //   },
 * //   {
 * //     id: "insight_002",
 * //     type: "overused",
 * //     category: "stylistic",
 * //     word: "very",
 * //     frequency: 15,
 * //     message: "The word 'very' is overused and may reduce readability.",
 * //     suggestion: "Consider using more specific adverbs.",
 * //     severity: "medium",
 * //     confidence: 0.75,
 * //   }
 * // ]
 * @returns An array of `WordInsight` objects containing actionable feedback on word usage.
 */
export const generateInsights = (
  processedWords: ProcessedWord[],
  textLength: number,
  rawText: string
): WordInsight[] => {
  const insights: WordInsight[] = [];
  const totalCount = processedWords.reduce((sum, w) => sum + w.count, 0);
  const totalWords = processedWords.length;
  const uniqueWords = new Set(processedWords.map(w => w.word.toLowerCase())).size;
  const isLong = textLength > 2000;
  const avgWordLength = processedWords.reduce((sum, w) => sum + w.word.length * w.count, 0) / totalCount;
  const lexicalDiversity = uniqueWords / totalWords;

  const generateInsightId = (type: string, word: string) =>
    `${type}-${word.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;

  // ─── EXISTING INSIGHTS (unchanged logic) ───────────────────────────
  // Overuse, rare words, long words, technical density, jargon, diversity, readability, sentiment, filler, passive...

  const heavyThreshold = isLong ? 0.07 : 0.09;
  const mildThreshold = isLong ? 0.04 : 0.06;
  processedWords.slice(0, Math.min(25, totalWords)).forEach(w => {
    if (w.word.length < 4 || STOP_WORDS.has(w.word.toLowerCase())) return;
    const ratio = w.count / totalCount;
    if (ratio > heavyThreshold) {
      insights.push({
        id: generateInsightId('overused-critical', w.word),
        type: 'overused',
        category: 'lexical',
        word: w.word,
        frequency: w.count,
        message: `Critically overused: "${w.word}" appears ${w.count} times (${Math.round(ratio * 100)}% of all words)`,
        suggestion: `Replace with synonyms or restructure sentences to maintain reader engagement and avoid repetition.`,
        severity: 'critical',
        confidence: 0.95,
        actionItems: [
          `Identify 3-5 synonyms for "${w.word}" and distribute usage`,
          `Restructure sentences containing multiple instances of "${w.word}"`,
          `Use a thesaurus to find context-appropriate alternatives`,
        ],
      });
    } else if (ratio > mildThreshold) {
      insights.push({
        id: generateInsightId('overused-medium', w.word),
        type: 'overused',
        category: 'lexical',
        word: w.word,
        frequency: w.count,
        message: `"${w.word}" is frequently repeated (${w.count} occurrences, ${Math.round(ratio * 100)}% of text)`,
        suggestion: `Vary vocabulary to maintain reader interest and improve writing quality.`,
        severity: 'medium',
        confidence: 0.85,
        actionItems: [
          `Consider using alternative terms in 50% of occurrences`,
          `Group similar concepts to reduce individual word repetition`,
        ],
      });
    }
  });

  processedWords.filter(w => (w.complexity?.rarityScore || 0) > 0.8).slice(0, 10).forEach(w => {
    insights.push({
      id: generateInsightId('rare-word', w.word),
      type: 'complex',
      category: 'lexical',
      word: w.word,
      frequency: w.count,
      message: `"${w.word}" is a rare/complex term that may be unfamiliar to many readers`,
      suggestion: `Consider defining this term on first use or replacing it with a more common alternative if appropriate for your audience.`,
      severity: w.count > 3 ? 'medium' : 'low',
      confidence: 0.8,
      actionItems: [
        `Add a brief definition in parentheses after first use: "${w.word}" (definition)`,
        `Consider using a glossary for specialized terminology`,
        `Evaluate if this term is necessary for your target audience`,
      ],
    });
  });

  processedWords.filter(w => w.word.length > 14).slice(0, 8).forEach(w => {
    insights.push({
      id: generateInsightId('long-word', w.word),
      type: 'readability',
      category: 'structural',
      word: w.word,
      frequency: w.count,
      message: `Long word detected: "${w.word}" (${w.word.length} characters)`,
      suggestion: `Long words can reduce readability. Consider breaking into shorter words or phrases where possible.`,
      severity: w.word.length > 18 ? 'medium' : 'low',
      confidence: 0.75,
      actionItems: [
        `Break compound words where appropriate`,
        `Use hyphenation for readability: ${w.word.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`,
        `Consider simpler alternatives for critical sections`,
      ],
    });
  });

  const isTechnicalContent = processedWords.some(w => (w.complexity?.technicalScore || 0) > 0.7 && w.count >= 3);
  const techWords = processedWords.filter(w => (w.complexity?.technicalScore || 0) > 0.6 && w.count >= (isLong ? 2 : 1));
  const techWordCount = techWords.reduce((sum, w) => sum + w.count, 0);
  const techDensity = techWordCount / totalCount;
  if (techDensity > 0.15 && !isTechnicalContent) {
    insights.push({
      id: generateInsightId('technical-density-high', 'content'),
      type: 'technical',
      category: 'technical',
      word: 'Technical Terms',
      frequency: techWordCount,
      message: `High density of technical terms (${Math.round(techDensity * 100)}% of content) may alienate non-technical readers`,
      suggestion: `Balance technical content with explanations, analogies, or a glossary section for broader accessibility.`,
      severity: 'high',
      confidence: 0.9,
      actionItems: [
        `Add a glossary of key technical terms`,
        `Include explanatory footnotes for specialized terminology`,
        `Create a "Technical Concepts" appendix for reference`,
      ],
    });
  }

  const jargonPatterns = [
    /\b(?:utilize|leverage|synergy|paradigm|methodology|framework|ecosystem|solution|optimization|enhancement)\b/i,
    /\b(?:bandwidth|deliverable|touchpoint|workflow|stakeholder|painpoint|usecase|roadmap)\b/i,
  ];
  const jargonWords = processedWords.filter(w => jargonPatterns.some(pattern => pattern.test(w.word)));
  if (jargonWords.length > 3) {
    insights.push({
      id: generateInsightId('jargon-heavy', 'content'),
      type: 'clarity',
      category: 'stylistic',
      word: 'Business Jargon',
      frequency: jargonWords.reduce((sum, w) => sum + w.count, 0),
      message: `${jargonWords.length} jargon terms detected that may reduce clarity and authenticity`,
      suggestion: `Replace business jargon with plain language to improve communication clarity and reader trust.`,
      severity: 'medium',
      confidence: 0.85,
      actionItems: [
        `Replace "utilize" with "use", "leverage" with "use" or "apply"`,
        `Avoid buzzwords like "synergy", "paradigm shift", "ecosystem" without clear definition`,
        `Read text aloud - if it sounds unnatural, simplify the language`,
      ],
    });
  }

  if (lexicalDiversity < 0.12) {
    insights.push({
      id: generateInsightId('lexical-poor', 'diversity'),
      type: 'diversity',
      category: 'lexical',
      word: 'Vocabulary Range',
      frequency: 0,
      message: 'Critically low lexical diversity - same words appear excessively throughout the text',
      suggestion: `Expand vocabulary with synonyms and varied expressions to enhance engagement and professionalism.`,
      severity: 'critical',
      confidence: 0.95,
      actionItems: [
        `Use a thesaurus to find alternatives for frequently repeated words`,
        `Read your text aloud to identify repetitive patterns`,
        `Break long sentences into shorter, more varied structures`,
      ],
    });
  } else if (lexicalDiversity < 0.25) {
    insights.push({
      id: generateInsightId('lexical-moderate', 'diversity'),
      type: 'diversity',
      category: 'lexical',
      word: 'Vocabulary Range',
      frequency: 0,
      message: 'Limited vocabulary diversity - content may feel repetitive to readers',
      suggestion: `Introduce more synonyms and varied sentence structures to maintain reader interest.`,
      severity: 'medium',
      confidence: 0.85,
      actionItems: [
        `Identify 5 most repeated words and find 2-3 alternatives for each`,
        `Vary sentence length and structure to improve flow`,
      ],
    });
  }

  if (avgWordLength > 7.5 && !isTechnicalContent) {
    insights.push({
      id: generateInsightId('word-length-high', 'readability'),
      type: 'readability',
      category: 'structural',
      word: 'Word Length',
      frequency: 0,
      message: `Average word length is ${avgWordLength.toFixed(1)} characters - may reduce readability for general audiences`,
      suggestion: `Prefer shorter words where possible. Aim for an average of 5-6 characters per word for optimal readability.`,
      severity: 'medium',
      confidence: 0.8,
      actionItems: [
        `Replace long words with shorter synonyms (e.g., "utilize" → "use")`,
        `Break compound words where appropriate`,
        `Use contractions in informal contexts ("it is" → "it's")`,
      ],
    });
  }

  const sentenceCount = (rawText.match(/[.!?]+/g) || []).length;
  const avgWordsPerSentence = totalCount / Math.max(1, sentenceCount);
  if (avgWordsPerSentence > 25) {
    insights.push({
      id: generateInsightId('sentence-long', 'structure'),
      type: 'readability',
      category: 'structural',
      word: 'Sentence Length',
      frequency: 0,
      message: `Average sentence length is ${Math.round(avgWordsPerSentence)} words - may be difficult to follow`,
      suggestion: `Break long sentences into shorter ones. Aim for 15-20 words per sentence for optimal readability.`,
      severity: 'medium',
      confidence: 0.75,
      actionItems: [
        `Break sentences at natural conjunctions (and, but, because)`,
        `Use periods instead of semicolons or dashes where appropriate`,
        `Read sentences aloud - if you run out of breath, they're too long`,
      ],
    });
  }

  const posWords = processedWords.filter(w => SENTIMENT_WORDS.positive.has(w.word.toLowerCase()) || URDU_SENTIMENT_WORDS.positive.has(w.word));
  const negWords = processedWords.filter(w => SENTIMENT_WORDS.negative.has(w.word.toLowerCase()) || URDU_SENTIMENT_WORDS.negative.has(w.word));
  const posCount = posWords.reduce((sum, w) => sum + w.count, 0);
  const negCount = negWords.reduce((sum, w) => sum + w.count, 0);
  const sentimentRatio = posCount > 0 ? negCount / posCount : negCount;
  if (negCount > 0 && sentimentRatio > 2.5) {
    insights.push({
      id: generateInsightId('negative-tone', 'sentiment'),
      type: 'sentiment',
      category: 'semantic',
      word: 'Tone Balance',
      frequency: 0,
      message: `Strong negative sentiment detected (negative:positive ratio of ${sentimentRatio.toFixed(1)}:1)`,
      suggestion: `Balance criticism with constructive solutions, positive framing, or acknowledge positive aspects to maintain reader engagement.`,
      severity: negCount > 10 ? 'high' : 'medium',
      confidence: 0.85,
      actionItems: [
        `For each negative statement, add at least one positive or solution-oriented statement`,
        `Reframe problems as opportunities for improvement`,
        `Use neutral language when describing challenges`,
      ],
    });
  }

  const fillerWords = new Set(['very', 'really', 'actually', 'basically', 'essentially', 'literally', 'definitely', 'absolutely', 'just', 'simply', 'quite', 'rather', 'somewhat']);
  processedWords.filter(w => fillerWords.has(w.word.toLowerCase()) && w.count > 2).slice(0, 5).forEach(w => {
    insights.push({
      id: generateInsightId('filler-word', w.word),
      type: 'clarity',
      category: 'stylistic',
      word: w.word,
      frequency: w.count,
      message: `Filler word "${w.word}" used ${w.count} times - weakens impact and adds unnecessary length`,
      suggestion: `Remove or replace filler words to create more concise, impactful writing.`,
      severity: w.count > 5 ? 'medium' : 'low',
      confidence: 0.8,
      actionItems: [
        `Delete "${w.word}" and read the sentence - does it still make sense?`,
        `Replace with stronger, more specific language`,
        `Set a goal to reduce filler word usage by 50%`,
      ],
    });
  });

  // ─── NEW: URDU & MULTILINGUAL INSIGHTS ─────────────────────────────

  const urduWords = processedWords.filter(w => /^[\u0600-\u06FF]/.test(w.word));
  const englishWords = processedWords.filter(w => /^[a-zA-Z]/.test(w.word));

  if (urduWords.length > 0 && englishWords.length > 0) {
    insights.push({
      id: generateInsightId('code_mixing', 'language'),
      type: 'code_mixing',
      category: 'translation',
      word: 'Mixed Language',
      frequency: urduWords.length + englishWords.length,
      message: 'Text mixes Urdu and English—may reduce clarity for monolingual readers.',
      suggestion: 'Consider providing glossary or separating language sections.',
      severity: 'medium',
      confidence: 0.8,
      actionItems: [
        'Add tooltips for Urdu terms in English UI',
        'Offer language toggle in multilingual apps'
      ]
    });
  }

  if (rawText.toLowerCase().includes('actual') && urduWords.some(w => w.word.includes('اصلی'))) {
    insights.push({
      id: generateInsightId('false_friend', 'actual'),
      type: 'false_friend',
      category: 'translation',
      word: 'actual / اصلی',
      frequency: 1,
      message: '“Actual” and “اصلی” may not be direct equivalents in technical contexts.',
      suggestion: 'Verify meaning in context before translating.',
      severity: 'low',
      confidence: 0.7
    });
  }

  const urduTechWords = urduWords.filter(w => TECHNICAL_TERMS.has(w.word));
  if (urduTechWords.length > 0) {
    insights.push({
      id: generateInsightId('urdu-tech', 'terminology'),
      type: 'technical',
      category: 'translation',
      word: 'Urdu Technical Terms',
      frequency: urduTechWords.length,
      message: `${urduTechWords.length} Urdu technical terms detected—ensure consistency and accuracy.`,
      suggestion: 'Maintain a bilingual glossary for technical documentation.',
      severity: 'low',
      confidence: 0.75,
      actionItems: [
        'Define Urdu tech terms on first use',
        'Link to authoritative Urdu-English tech dictionary'
      ]
    });
  }

  // ─── FINALIZE ───────────────────────────────────────────────────────

  if (insights.length === 0) {
    insights.push({
      id: generateInsightId('excellent-content', 'summary'),
      type: 'engagement',
      category: 'semantic',
      word: 'Content Quality',
      frequency: 0,
      message: 'Excellent content quality detected with strong lexical diversity, balanced tone, and clear structure',
      severity: 'low',
      confidence: 0.95,
      actionItems: [
        `Maintain these writing standards consistently`,
        `Consider documenting your writing process for team sharing`,
      ],
    });
  }

  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  return [...insights]
    .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity] || b.confidence - a.confidence)
    .slice(0, 100);
};

/**
 * Processes raw text by cleaning markdown, extracting words with intelligence, calculating complexity/sentiment, and generating insights.
 * Returns a structured result with processed words and actionable linguistic insights.
 * @example
 * const result = processTextIntelligently(`# Sample Text
 * This is a **sample** text with [link](https://example.com) and complex words like "sophistication".
 * `);
 * console.log(result.processedWords);
 * // [
 * //   {
 * //     id: "word-sophistication-1672531200000",
 * //     word: "sophistication",
 * //     count: 1,
 * //     originalForms: ["sophistication"],
 * //     complexity: { length: 14, syllableCount: 5, technicalScore: 0.8, rarityScore: 0.2, contextRelevance: 0.7, readabilityScore: 3.5 },
 * //     sentiment: "neutral"
 * //   }
 * // ]
 * @returns An object with `processedWords` (array of `ProcessedWord`) and `insights` (array of `WordInsight`).
 */
const processTextIntelligently = (rawText: string) => {
  const clean = cleanMarkdown(rawText);
  const freq = extractWordsWithIntelligence(clean);
  const words = freq.map(w => ({
    id: `word-${w.word.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
    word: w.word,
    count: w.count,
    originalForms: w.originalForms,
    complexity: calculateWordComplexity(w.word),
    sentiment:
      SENTIMENT_WORDS.positive.has(w.word.toLowerCase()) || URDU_SENTIMENT_WORDS.positive.has(w.word) ? 'positive' :
        SENTIMENT_WORDS.negative.has(w.word.toLowerCase()) || URDU_SENTIMENT_WORDS.negative.has(w.word) ? 'negative' :
          'neutral',
  }));
  const insights = generateInsights(words as any, rawText.length, rawText);
  words.sort((a, b) => {
    const scoreA = a.count * (1 + (a.complexity?.technicalScore || 0) * 0.5 + (a.complexity?.readabilityScore || 0) * 0.3);
    const scoreB = b.count * (1 + (b.complexity?.technicalScore || 0) * 0.5 + (b.complexity?.readabilityScore || 0) * 0.3);
    return scoreB - scoreA;
  });
  return { processedWords: words, insights };
};

export default processTextIntelligently;
