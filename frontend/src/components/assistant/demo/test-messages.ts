import { ChatMessage } from '../ResponseArea';



const generateId = () => `massive_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
const generateStats = (text: string, isUser: boolean) => {
  const words = text.split(/\s+/).length;
  const chars = text.length;
  const inputTokens = Math.floor(chars / 4);
  const outputTokens = isUser ? 0 : Math.floor(chars / 3.5);

  return {
    textData: [
      { name: 'Words', value: words },
      { name: 'Chars', value: chars },
      { name: 'Sentences', value: text.split(/[.!?]/).length }
    ],
    tokenStats: isUser ? [] : [
      { name: 'Input', value: inputTokens, fill: '#3b82f6' },
      { name: 'Output', value: outputTokens, fill: '#10b981' },
      { name: 'Total', value: inputTokens + outputTokens, fill: '#f59e0b' }
    ]
  };
};


// --- MOCK DATA SET: 25 SCENARIOS ---

export const MOCK_TEST_DATA: ChatMessage[] = [
  // 1. System Initialization
  {
    id: generateId(),
    role: 'system',
    aiPrompt: 'System initialized. Connection established.',
    originalPrompt: '',
    enhancedPrompt: '',
    model: 'System',
    enhancementType: 'init',
    userRole: 'system',
    timestamp: new Date(Date.now() - 1000000),
    tokensUsed: 0,
    processingTime: 0,
    rating: 0,
    notes: null,
    stats: { textData: [], tokenStats: [] },
    metadata: { source: 'system', level: 'info' }
  },

  // 2. Simple User Query
  {
    id: generateId(),
    role: 'user',
    aiPrompt: 'Hello, can you explain React Context?',
    originalPrompt: 'Hello, can you explain React Context?',
    enhancedPrompt: 'Hello, can you explain React Context?',
    model: 'user-input',
    enhancementType: 'input',
    userRole: 'developer',
    timestamp: new Date(Date.now() - 900000),
    tokensUsed: 15,
    processingTime: 100,
    rating: 0,
    notes: null,
    stats: generateStats('Hello, can you explain React Context?', true),
    variants: ['Explain Context API', 'Explain Redux', 'Explain Zustand'],
    variantIndex: 0,
    metadata: null
  },

  // 3. Standard Markdown Response (Bold, Lists, Code)
  {
    id: generateId(),
    role: 'assistant',
    aiPrompt: `**React Context** provides a way to pass data through the component tree without having to pass props down manually at every level.

\`\`\`typescript
const MyContext = React.createContext(defaultValue);
\`\`\`

It is useful for:
*   Global Themes
*   User Authentication
*   Language Preferences`,
    originalPrompt: '',
    enhancedPrompt: '',
    model: 'gpt-4',
    enhancementType: 'standard',
    userRole: 'developer',
    timestamp: new Date(Date.now() - 800000),
    tokensUsed: 150,
    processingTime: 1240,
    rating: 5,
    notes: null,
    stats: generateStats(`**React Context** provides a way...`, false),
    metadata: { provider: 'OpenAI', model: 'gpt-4-0125-preview' }
  },

  // 4. User with Variants (A/B Testing UI)
  {
    id: generateId(),
    role: 'user',
    aiPrompt: 'Generate a function to sort an array.',
    originalPrompt: 'Generate a function to sort an array.',
    enhancedPrompt: 'Generate a function to sort an array.',
    model: 'user-input',
    enhancementType: 'input',
    userRole: 'developer',
    timestamp: new Date(Date.now() - 700000),
    tokensUsed: 12,
    processingTime: 50,
    rating: 0,
    notes: null,
    stats: generateStats('Generate a function to sort an array.', true),
    variants: [
      'Sort array in ascending order',
      'Sort array in descending order',
      'Sort array by date'
    ],
    variantIndex: 0,
    metadata: null
  },

  // 5. Code-Heavy Response
  {
    id: generateId(),
    role: 'assistant',
    aiPrompt: `Here is a generic sort function in JavaScript:

\`\`\`javascript
function sortArray(arr) {
  return arr.sort((a, b) => a - b);
}

// Usage
const nums = [3, 1, 4, 1];
console.log(sortArray(nums)); // [1, 1, 3, 4]
\`\`\``,
    originalPrompt: '',
    enhancedPrompt: '',
    model: 'gpt-4',
    enhancementType: 'code',
    userRole: 'developer',
    timestamp: new Date(Date.now() - 600000),
    tokensUsed: 200,
    processingTime: 850,
    rating: 4,
    notes: null,
    stats: generateStats('Here is a generic sort function...', false),
    metadata: { language: 'javascript' }
  },

  // 6. Complex Table Rendering
  {
    id: generateId(),
    role: 'assistant',
    aiPrompt: `Here is the comparison of sorting algorithms:

| Algorithm | Time Complexity (Best) | Space Complexity |
|-----------|------------------------|------------------|
| Bubble Sort| O(n) | O(1) |
| Merge Sort| O(n log n) | O(n) |
| Quick Sort| O(n log n) | O(log n) |

> **Note:** Quick Sort is generally preferred for average case.`,
    originalPrompt: '',
    enhancedPrompt: '',
    model: 'gpt-4',
    enhancementType: 'standard',
    userRole: 'developer',
    timestamp: new Date(Date.now() - 500000),
    tokensUsed: 180,
    processingTime: 1100,
    rating: 5,
    notes: null,
    stats: generateStats('Here is the comparison...', false),
    metadata: { format: 'table' }
  },

  // 7. Low Rated Message (Testing Stars)
  {
    id: generateId(),
    role: 'assistant',
    aiPrompt: 'I am not sure about the answer. Maybe try Google?',
    originalPrompt: '',
    enhancedPrompt: '',
    model: 'gpt-3.5',
    enhancementType: 'low-confidence',
    userRole: 'developer',
    timestamp: new Date(Date.now() - 400000),
    tokensUsed: 25,
    processingTime: 400,
    rating: 1, // 1 Star
    notes: 'Hallucination risk detected',
    stats: generateStats('I am not sure...', false),
    metadata: { confidence: 0.2 }
  },

  // 8. Security / XSS Attempt (Input)
  {
    id: generateId(),
    role: 'user',
    aiPrompt: '<img src=x onerror="alert(1)">',
    originalPrompt: '<img src=x onerror="alert(1)">',
    enhancedPrompt: '<img src=x onerror="alert(1)">',
    model: 'user-input',
    enhancementType: 'security-test',
    userRole: 'hacker',
    timestamp: new Date(Date.now() - 300000),
    tokensUsed: 10,
    processingTime: 0,
    rating: 0,
    notes: 'Potential XSS payload',
    stats: generateStats('<img src=x onerror="alert(1)">', true),
    metadata: { test_type: 'xss' }
  },

  // 9. Sanitized Response (Testing Safety)
  {
    id: generateId(),
    role: 'assistant',
    aiPrompt: 'I detected malicious content in your request. I will not execute that script.',
    originalPrompt: '',
    enhancedPrompt: '',
    model: 'gpt-4',
    enhancementType: 'security',
    userRole: 'guard',
    timestamp: new Date(Date.now() - 200000),
    tokensUsed: 40,
    processingTime: 500,
    rating: 5,
    notes: 'Blocked harmful content',
    stats: generateStats('I detected malicious content...', false),
    metadata: { security_status: 'blocked' }
  },

  // 10. Long Text Stress Test
  {
    id: generateId(),
    role: 'user',
    aiPrompt: 'STRESS TEST: ' + 'AAAAA '.repeat(5000),
    originalPrompt: 'STRESS TEST: ' + 'AAAAA '.repeat(5000),
    enhancedPrompt: 'STRESS TEST: ' + 'AAAAA '.repeat(5000),
    model: 'user-stress',
    enhancementType: 'stress',
    userRole: 'tester',
    timestamp: new Date(Date.now() - 150000),
    tokensUsed: 5000,
    processingTime: 50,
    rating: 0,
    notes: 'Performance stress test',
    stats: generateStats('STRESS TEST: ' + 'A'.repeat(5000), true),
    metadata: { size_kb: 5 }
  },

  // 11. Deep Nesting Test
  {
    id: generateId(),
    role: 'assistant',
    aiPrompt: Array(10).fill(0).map((_, i) =>
      `> Level ${i} Quote\n` + '  '.repeat(i) + '- Nested content'
    ).join('\n'),
    originalPrompt: '',
    enhancedPrompt: '',
    model: 'gpt-4',
    enhancementType: 'formatting',
    userRole: 'developer',
    timestamp: new Date(Date.now() - 100000),
    tokensUsed: 150,
    processingTime: 800,
    rating: 4,
    notes: null,
    stats: generateStats(Array(10).fill(0).map((_, i) => `> Level ${i} Quote...`).join('\n'), false),
    metadata: { nesting_level: 10 }
  },

  // 12. JSON Request/Response
  {
    id: generateId(),
    role: 'user',
    aiPrompt: 'Return valid JSON for a user object.',
    originalPrompt: 'Return valid JSON for a user object.',
    enhancedPrompt: 'Return valid JSON for a user object.',
    model: 'user-input',
    enhancementType: 'json',
    userRole: 'api-developer',
    timestamp: new Date(Date.now() - 50000),
    tokensUsed: 15,
    processingTime: 50,
    rating: 0,
    notes: null,
    stats: generateStats('Return valid JSON...', true),
    metadata: { expected_format: 'json' }
  },

  // 13. JSON Response (Format: JSON)
  {
    id: generateId(),
    role: 'assistant',
    aiPrompt: `{
  "id": 101,
  "name": "Alice",
  "role": "admin",
  "active": true
}`,
    originalPrompt: '',
    enhancedPrompt: '',
    model: 'gpt-4',
    enhancementType: 'json',
    userRole: 'developer',
    timestamp: new Date(),
    tokensUsed: 40,
    processingTime: 600,
    rating: 5,
    notes: null,
    stats: generateStats(`{ "id": 101... }`, false),
    format: 'json',
    metadata: { mime_type: 'application/json' }
  },

  // 14. Unicode & Emoji Support
  {
    id: generateId(),
    role: 'user',
    aiPrompt: '🚀 🦄 🤖 What is the meaning of life? 🌍',
    originalPrompt: '🚀 🦄 🤖 What is the meaning of life? 🌍',
    enhancedPrompt: '🚀 🦄 🤖 What is the meaning of life? 🌍',
    model: 'user-input',
    enhancementType: 'unicode',
    userRole: 'user',
    timestamp: new Date(),
    tokensUsed: 20,
    processingTime: 100,
    rating: 0,
    notes: null,
    stats: generateStats('🚀 🦄 🤖 What is the meaning...', true),
    metadata: { encoding: 'utf-8' }
  },

  // 15. Emoji Heavy Response
  {
    id: generateId(),
    role: 'assistant',
    aiPrompt: 'The meaning of life, the universe, and everything is **42**. 🌌 ✨ 🪐 🕰 🧬 🧪 🧸',
    originalPrompt: '',
    enhancedPrompt: '',
    model: 'gpt-4',
    enhancementType: 'creative',
    userRole: 'user',
    timestamp: new Date(),
    tokensUsed: 60,
    processingTime: 1500,
    rating: 5,
    notes: null,
    stats: generateStats('The meaning of life...', false),
    metadata: { theme: 'philosophical' }
  },

  // 16. Pinned System Message
  {
    id: generateId(),
    role: 'system',
    aiPrompt: '🚨 **MAINTENANCE NOTICE:** Server restart scheduled for 03:00 UTC.',
    originalPrompt: '',
    enhancedPrompt: '',
    model: 'System',
    enhancementType: 'alert',
    userRole: 'admin',
    timestamp: new Date(),
    tokensUsed: 0,
    processingTime: 0,
    rating: 0,
    notes: null,
    pinned: true, // PINNED
    stats: { textData: [], tokenStats: [] },
    metadata: { priority: 'critical', scheduled_for: '03:00 UTC' }
  },

  // 17. Empty Content Edge Case
  {
    id: generateId(),
    role: 'user',
    aiPrompt: ' ',
    originalPrompt: ' ',
    enhancedPrompt: ' ',
    model: 'user-input',
    enhancementType: 'empty',
    userRole: 'tester',
    timestamp: new Date(),
    tokensUsed: 0,
    processingTime: 10,
    rating: 0,
    notes: 'Empty string test',
    stats: { textData: [{name: 'Words', value: 0}, {name: 'Chars', value: 1}, {name: 'Sentences', value: 0}], tokenStats: [] },
    metadata: { test_case: 'empty_content' }
  },

  // 18. High Latency Simulation
  {
    id: generateId(),
    role: 'assistant',
    aiPrompt: 'Sorry for the delay, I was processing a complex query.',
    originalPrompt: '',
    enhancedPrompt: '',
    model: 'gpt-4-turbo',
    enhancementType: 'latency-recovery',
    userRole: 'assistant',
    timestamp: new Date(),
    tokensUsed: 30,
    processingTime: 5000, // 5 seconds
    rating: 3,
    notes: 'High latency response',
    stats: generateStats('Sorry for the delay...', false),
    metadata: { latency_ms: 5000 }
  },

  // 19. HTML Content Test (If supported)
  {
    id: generateId(),
    role: 'assistant',
    aiPrompt: '<div style="color:red">This text should be red in a browser, but sanitized in Markdown.</div>',
    originalPrompt: '',
    enhancedPrompt: '',
    model: 'gpt-4',
    enhancementType: 'html-injection',
    userRole: 'developer',
    timestamp: new Date(),
    tokensUsed: 45,
    processingTime: 300,
    rating: 0,
    notes: 'HTML tag injection test',
    stats: generateStats('<div style="color:red">This text...</div>', false),
    metadata: { content_type: 'text/html' }
  },

  // 20. Mixed Media Link
  {
    id: generateId(),
    role: 'user',
    aiPrompt: 'Generate an image of a cyberpunk city.',
    originalPrompt: 'Generate an image of a cyberpunk city.',
    enhancedPrompt: 'Generate an image of a cyberpunk city.',
    model: 'user-dalle',
    enhancementType: 'image-gen',
    userRole: 'designer',
    timestamp: new Date(),
    tokensUsed: 12,
    processingTime: 0,
    rating: 0,
    notes: null,
    stats: generateStats('Generate an image...', true),
    metadata: { modality: 'image' }
  },

  // 21. Image Placeholder Response
  {
    id: generateId(),
    role: 'assistant',
    aiPrompt: '![Cyberpunk City](https://via.placeholder.com/400x300.png?text=Image+Generated)',
    originalPrompt: '',
    enhancedPrompt: '',
    model: 'dalle-3',
    enhancementType: 'image-gen',
    userRole: 'designer',
    timestamp: new Date(),
    tokensUsed: 0, // Images often don't count tokens in same way
    processingTime: 4500,
    rating: 5,
    notes: null,
    stats: generateStats('![Cyberpunk City](https://...)', false),
    metadata: { image_url: 'https://via.placeholder.com/400x300.png' }
  },

  // 22. Regeneration History (Notes field)
  {
    id: generateId(),
    role: 'assistant',
    aiPrompt: 'This is the regenerated, improved answer.',
    originalPrompt: '',
    enhancedPrompt: '',
    model: 'gpt-4',
    enhancementType: 'regeneration',
    userRole: 'developer',
    timestamp: new Date(),
    tokensUsed: 160,
    processingTime: 1100,
    rating: 5,
    notes: 'User was unsatisfied with previous answer.',
    stats: generateStats('This is the regenerated...', false),
    metadata: { gen_count: 2 }
  },

  // 23. Very High Tokens
  {
    id: generateId(),
    role: 'assistant',
    aiPrompt: '...' + 'Lorem ipsum dolor sit amet. '.repeat(100),
    originalPrompt: '',
    enhancedPrompt: '',
    model: 'gpt-4-32k',
    enhancementType: 'long-form',
    userRole: 'writer',
    timestamp: new Date(),
    tokensUsed: 4096, // Max context
    processingTime: 8000,
    rating: 4,
    notes: 'Max token usage test',
    stats: generateStats('...' + 'Lorem ipsum dolor sit amet. '.repeat(100), false),
    metadata: { context_window: '32k' }
  },

  // 24. Multi-turn Context (Referencing previous)
  {
    id: generateId(),
    role: 'assistant',
    aiPrompt: 'As mentioned earlier, **React Context** avoids prop drilling. To add to it, wrap components in the Provider.',
    originalPrompt: '',
    enhancedPrompt: '',
    model: 'gpt-4',
    enhancementType: 'contextual',
    userRole: 'developer',
    timestamp: new Date(),
    tokensUsed: 85,
    processingTime: 900,
    rating: 5,
    notes: null,
    stats: generateStats('As mentioned earlier...', false),
    metadata: { references_prev_msg: true }
  },

  // 25. Final Goodbye / End of Chat
  {
    id: generateId(),
    role: 'assistant',
    aiPrompt: 'Is there anything else I can help you with today?',
    originalPrompt: '',
    enhancedPrompt: '',
    model: 'gpt-4',
    enhancementType: 'closing',
    userRole: 'assistant',
    timestamp: new Date(),
    tokensUsed: 20,
    processingTime: 400,
    rating: 0,
    notes: null,
    stats: generateStats('Is there anything else...', false),
    metadata: { intent: 'follow_up' }
  }
];

const createMassiveStats = (text: string, isUser: boolean) => {
  const wordCount = text.split(/\s+/).length;
  return {
    textData: [
      { name: 'Words', value: wordCount },
      { name: 'Chars', value: text.length },
      { name: 'Sentences', value: text.split('.').length }
    ],
    tokenStats: isUser ? [] : [
      { name: 'Input', value: Math.floor(wordCount * 1.5), fill: '#3b82f6' },
      { name: 'Output', value: Math.floor(wordCount * 4), fill: '#10b981' }, // High token usage
      { name: 'Total', value: Math.floor(wordCount * 5.5), fill: '#f59e0b' }
    ]
  };
};

// --- MASSIVE CONTENT GENERATORS ---

const LOREM_IPSUM_LONG = Array(50).fill(null).map((_, i) => `
**Section ${i + 1}: Analysis Module**

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

*   **Constraint A:** System latency must be < 20ms.
*   **Constraint B:** Memory footprint must remain under 512MB.
*   **Constraint C:** API calls must be batched.

\`\`\`typescript
interface MassiveConfig {
  id: string;
  layers: number;
  active: boolean;
}

const config: MassiveConfig = {
  id: "cfg_${i}",
  layers: 100 + i,
  active: true
};
\`\`\`

> **Developer Note:** Ensure that section ${i + 1} is integrated into the main pipeline before deployment.
`).join('\n');

const MASSIVE_CODE_BLOCK = `
// 1. Core Processor Implementation
export class NeuralProcessor {
  private _weights: Float32Array;
  private _biases: Float32Array;

  constructor(layers: number[]) {
    // Initialize weights with Xavier initialization
    this._weights = new Float32Array(this.calculateSize(layers));
    this._biases = new Float32Array(layers.length);
    
    // Fill weights
    for (let i = 0; i < this._weights.length; i++) {
      this._weights[i] = (Math.random() - 0.5) * 2 / Math.sqrt(layers.length);
    }
  }

  // 2. Forward Pass
  public forward(input: number[]): number[] {
    let current = input;
    for (let i = 0; i < this._biases.length - 1; i++) {
      // Matrix multiplication step
      const next = this.relu(this.dot(current, i));
      current = next;
    }
    return current;
  }

  // 3. Backward Propagation
  public backward(output: number[], target: number[]): void {
    // Calculate Gradients
    // ... (omitted 500 lines for brevity, but imagine it is here)
  }

  // Helpers
  private relu(x: number): number { return Math.max(0, x); }
  private dot(input: number[], layerIndex: number): number[] {
    // Optimized dot product using SIMD operations
    return input.map((val, idx) => val * this._weights[layerIndex * idx]);
  }
}

// 4. Usage Example
const net = new NeuralProcessor([784, 128, 64, 10]);
const result = net.forward([...inputData]);
`.repeat(5); // Repeat code block 5 times to create massive content

// --- MOCK DATA EXPORT ---

export const MASSIVE_TEST_DATA: ChatMessage[] = [
  // 1. Massive User Request (System Architecture)
  {
    id: generateId(),
    role: 'user',
    aiPrompt: 'Generate a comprehensive backend architecture for a high-frequency trading platform. Include database schemas, caching strategies, and microservice breakdown.',
    originalPrompt: 'Generate a comprehensive backend architecture...',
    enhancedPrompt: 'Generate a comprehensive backend architecture...',
    model: 'user-input',
    enhancementType: 'complex_prompt',
    userRole: 'architect',
    timestamp: new Date(),
    tokensUsed: 45,
    processingTime: 100,
    rating: 0,
    notes: null,
    stats: createMassiveStats('Generate a comprehensive...', true),
    // VARIANTS: Rephrasing the request
    variants: [
      'Design a scalable architecture for a fintech app.',
      'Explain the microservices pattern for high-frequency trading.',
      'Outline the database requirements for trading systems.'
    ],
    variantIndex: 0,
    metadata: { complexity: 'high' }
  },

  // 2. Massive Assistant Response (Long Form Text)
  {
    id: generateId(),
    role: 'assistant',
    aiPrompt: LOREM_IPSUM_LONG, // ~5000 chars
    originalPrompt: '',
    enhancedPrompt: '',
    model: 'gpt-4-32k',
    enhancementType: 'long_form',
    userRole: 'ai',
    timestamp: new Date(),
    tokensUsed: 8500, // High token count
    processingTime: 5500, // 5.5 seconds
    rating: 5,
    notes: 'Generated comprehensive documentation',
    stats: createMassiveStats(LOREM_IPSUM_LONG, false),
    // VARIANTS: Summaries / Formats
    variants: [
      '## Executive Summary\n\nSystem is comprised of 50 modules. Latency target < 20ms.',
      '## Technical Breakdown\n\nSystem utilizes Float32Arrays for weight storage. ReLU activation function used throughout.',
      '## Deployment Checklist\n\n- [ ] Verify Xavier Initialization\n- [ ] Stress Test Batching\n- [ ] Confirm SIMD Support'
    ],
    variantIndex: 0,
    metadata: { format: 'markdown', size: 'large' }
  },

  // 3. Massive Code Response
  {
    id: generateId(),
    role: 'assistant',
    aiPrompt: MASSIVE_CODE_BLOCK, // ~10000 chars
    originalPrompt: '',
    enhancedPrompt: '',
    model: 'code-davinci-002',
    enhancementType: 'code_gen',
    userRole: 'developer',
    timestamp: new Date(),
    tokensUsed: 12000,
    processingTime: 12000,
    rating: 4,
    notes: null,
    stats: createMassiveStats(MASSIVE_CODE_BLOCK, false),
    // VARIANTS: Different Algorithms
    variants: [
      `// Implementation A: LSTM Network
class LSTM {
  // ... LSTM implementation (approx 500 chars)
}`,
      `// Implementation B: Transformer Model
class Transformer {
  // ... Transformer implementation (approx 500 chars)
}`,
      `// Implementation C: Simple Perceptron
class Perceptron {
  // ... Perceptron implementation (approx 500 chars)
}`
    ],
    variantIndex: 0,
    metadata: { language: 'typescript', framework: 'custom' }
  },

  // 4. Massive User Query (Data Dump Request)
  {
    id: generateId(),
    role: 'user',
    aiPrompt: 'I need to generate 10,000 mock user records with fields: ID, Name, Email, SignupDate, Status. Format as Markdown table.',
    originalPrompt: 'I need to generate 10,000 mock user records...',
    enhancedPrompt: 'I need to generate 10,000 mock user records...',
    model: 'user-input',
    enhancementType: 'bulk_generation',
    userRole: 'data_analyst',
    timestamp: new Date(),
    tokensUsed: 30,
    processingTime: 50,
    rating: 0,
    notes: null,
    stats: createMassiveStats('I need to generate 10,000...', true),
    // VARIANTS: Different Data Sizes
    variants: [
      'Generate 1,000 user records.',
      'Generate 50,000 user records.',
      'Generate 10 records only.'
    ],
    variantIndex: 0,
    metadata: { requested_rows: 10000 }
  },

  // 5. Massive Table Response (Simulated)
  {
    id: generateId(),
    role: 'assistant',
    aiPrompt: ''.concat('| ID | Name | Email | Signup Date | Status |\n|---|---|---|---|---|\n')
      .concat(Array(100).fill(0).map((i) => {
        const id = 1000 + i;
        const status = i % 3 === 0 ? 'Active' : (i % 3 === 1 ? 'Pending' : 'Inactive');
        const name = `User_${id}`;
        return `| ${id} | ${name} | user${id}@example.com | 2023-01-${(i % 30) + 1} | ${status} |`;
      }).join('\n'))
      .concat('\n*End of Table*'),
    originalPrompt: '',
    enhancedPrompt: '',
    model: 'gpt-4',
    enhancementType: 'table_gen',
    userRole: 'ai',
    timestamp: new Date(),
    tokensUsed: 5000,
    processingTime: 4000,
    rating: 5,
    notes: 'Generated bulk data table',
    stats: createMassiveStats('...table...', false),
    // VARIANTS: Sorting/Filtering the same data
    variants: [
      '| ID | Name | Email | Signup Date | Status |\n|---|---|---|---|---|\n*Sorted by ID (Desc)*\n| 1099 | User_1099 | ... | ... | ...',
      '| ID | Name | Email | Signup Date | Status |\n|---|---|---|---|---|\n*Showing Active Users Only*\n| 1002 | User_1002 | ... | ... | Active |',
      '| ID | Name | Email | Signup Date | Status |\n|---|---|---|---|---|\n*Showing Inactive Users Only*\n| 1001 | User_1001 | ... | ... | Inactive |'
    ],
    variantIndex: 0,
    metadata: { rows: 100, format: 'markdown_table' }
  },

  // 6. Massive JSON Response
  {
    id: generateId(),
    role: 'assistant',
    aiPrompt: JSON.stringify({
      systemConfig: {
        version: "2.4.0",
        environment: "production",
        features: Array(20).fill(null).map((_, i) => ({
          id: `feat_${i}`,
          enabled: i % 2 === 0,
          config: { timeout: 3000, retries: 3 }
        })),
        nested: {
          level1: {
            level2: {
              level3: Array(10).fill("deeply_nested_value")
            }
          }
        }
      }
    }, null, 2),
    originalPrompt: '',
    enhancedPrompt: '',
    model: 'gpt-4',
    enhancementType: 'json_gen',
    userRole: 'system',
    timestamp: new Date(),
    tokensUsed: 3500,
    processingTime: 1200,
    rating: 5,
    notes: 'Large JSON config object',
    stats: createMassiveStats('...json...', false),
    // VARIANTS: Different Formats
    variants: [
      '{ "format": "xml", "data": "<config>...</config>" }',
      '{ "format": "yaml", "data": "system: ..." }',
      '{ "format": "toml", "data": "[system]\\nversion=2.4.0" }'
    ],
    variantIndex: 0,
    format: 'json',
    metadata: { size: 'large', structure: 'nested' }
  },

  // 7. Mixed Content (Text + Code + Table) - The "Kitchen Sink"
  {
    id: generateId(),
    role: 'assistant',
    aiPrompt: `
# Final Report: System Integration

## 1. Overview
The integration is **complete** but requires monitoring.

## 2. Code Snippets
\`\`\`typescript
const connect = () => db.open();
\`\`\`

## 3. Data Metrics
| Metric | Value | Status |
|--------|-------|--------|
| Latency | 12ms | 🟢 |
| Error Rate | 0.01% | 🟢 |
| Uptime | 99.99% | 🟢 |

## 4. Logs
\${Array(10).fill(0).map(i => \`> [LOG] [${new Date().toISOString()}] Connection established.\`).join('\n')}

> **Note:** Scroll down for more logs.
    `.trim(),
originalPrompt: '',
enhancedPrompt: '',
model: 'gpt-4',
enhancementType: 'hybrid',
userRole: 'ai',
timestamp: new Date(),
tokensUsed: 2100,
processingTime: 1500,
rating: 5,
notes: null,
stats: createMassiveStats('# Final Report...', false),
variants: [
'View as Plain Text Only',
'View as Metrics Dashboard',
'View as Error Logs'
],
variantIndex: 0,
metadata: { content_type: 'hybrid' }
}
];
