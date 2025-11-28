# AI Prompt Enhancer

A professional, feature-rich application for enhancing, correcting, and optimizing AI prompts using multiple AI services including Ollama, OpenAI, OpenRouter, DeepSeek, and more.

## 🚀 Features

### Core Functionality
- **Multi-Provider Support**: Connect to Ollama (local), OpenAI, OpenRouter, DeepSeek, and other cloud AI services
- **Advanced Prompt Enhancement**: Multiple enhancement types (correct, enhance, proofread, optimize, creative, technical, concise, structured)
- **User Roles**: Specialized enhancement based on user roles (developer, writer, researcher, marketer, educator, business, designer)
- **Real-time Processing**: Fast, responsive prompt enhancement with detailed metrics

### User Interface
- **Modern, Sleek Design**: Built with React, TypeScript, and Tailwind CSS
- **Light/Dark Theme**: Automatic system theme detection with manual override
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Sidebar**: Collapsible navigation with quick access to all features
- **Advanced Prompt Editor**: Feature-rich editor with character count, word count, and keyboard shortcuts

### History & Analytics
- **Prompt History**: Complete history of all prompt enhancements with search and filtering
- **Rating System**: Rate and add notes to enhanced prompts
- **Usage Statistics**: Detailed analytics including token usage, processing times, and most-used models
- **Export Functionality**: Export history and prompts in multiple formats (JSON, CSV, TXT)

### Configuration & Extensibility
- **Plugin Architecture**: Easy to extend with new AI providers
- **Configuration Management**: Save, restore, and export application settings
- **API Integration**: RESTful API with WebSocket support for real-time updates
- **Environment Configuration**: Flexible configuration through environment variables

## 🛠️ Technology Stack

### Backend
- **Framework**: Fastify (Node.js)
- **Language**: TypeScript
- **Architecture**: Modular, plugin-based design
- **Communication**: REST API + WebSocket
- **Validation**: Joi for request validation
- **Logging**: Winston for structured logging

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **UI Components**: Lucide React icons
- **Notifications**: React Hot Toast

### AI Providers
- **Ollama**: Local AI model support
- **OpenAI**: GPT models and API
- **OpenRouter**: Multiple model access
- **DeepSeek**: Advanced AI models
- **Extensible**: Plugin system for adding more providers

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Ollama (for local models) - optional

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-prompt-enhancer
   ```

2. **Run the setup script**
   ```bash
   ./setup.sh
   ```

3. **Configure environment variables**
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your API keys
   ```

4. **Start the development servers**
   
   Terminal 1 (Backend):
   ```bash
   cd backend
   npm run dev
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd frontend
   npm run dev
   ```

5. **Open the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - Health Check: http://localhost:3000/health

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
NODE_ENV=development
PORT=3000
HOST=0.0.0.0

# Ollama Configuration
OLLAMA_URL=http://localhost:11434
OLLAMA_TIMEOUT=30000

# OpenAI Configuration (Optional)
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_BASE_URL=https://api.openai.com/v1

# OpenRouter Configuration (Optional)
OPENROUTER_API_KEY=your_openrouter_api_key_here

# DeepSeek Configuration (Optional)
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

### AI Provider Setup

#### Ollama (Local)
1. Install Ollama: https://ollama.ai/
2. Pull models: `ollama pull llama2` (or any other model)
3. Configure OLLAMA_URL in environment (default: http://localhost:11434)

#### OpenAI
1. Get API key from https://platform.openai.com/
2. Set OPENAI_API_KEY in environment

#### OpenRouter
1. Get API key from https://openrouter.ai/
2. Set OPENROUTER_API_KEY in environment

#### DeepSeek
1. Get API key from https://platform.deepseek.com/
2. Set DEEPSEEK_API_KEY in environment

## 📖 Usage

### Basic Usage
1. **Enter Your Prompt**: Type or paste your prompt in the editor
2. **Select Configuration**: Choose AI model, enhancement type, and user role
3. **Enhance**: Click "Enhance Prompt" or press Ctrl+Enter
4. **Review**: View the enhanced prompt with metrics
5. **Save**: Results are automatically saved to history

### Enhancement Types
- **Correct**: Fix grammar, spelling, and clarity issues
- **Enhance**: Add details and make more specific
- **Proofread**: Review for effectiveness and quality
- **Optimize**: Optimize for AI model performance
- **Creative**: Add creative and imaginative elements
- **Technical**: Add technical details and precision
- **Concise**: Remove unnecessary words, improve efficiency
- **Structured**: Add clear sections and formatting

### User Roles
- **General**: Everyday prompt enhancement
- **Developer**: Programming and technical prompts
- **Writer**: Creative writing and content
- **Researcher**: Academic and research prompts
- **Marketer**: Marketing and promotional content
- **Educator**: Educational content
- **Business**: Corporate communication
- **Designer**: Design and visual prompts

### History Management
- **Search**: Filter history by content, model, or type
- **Rate**: Add star ratings to enhanced prompts
- **Notes**: Add personal notes and observations
- **Export**: Download history in JSON, CSV, or TXT format

## 🔧 Development

### Project Structure
```
ai-prompt-enhancer/
├── backend/                 # Fastify API server
│   ├── src/
│   │   ├── config/         # Configuration management
│   │   ├── controllers/    # Route handlers
│   │   ├── services/       # Business logic and AI providers
│   │   ├── middleware/     # Custom middleware
│   │   ├── types/          # TypeScript definitions
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── stores/         # Zustand stores
│   │   ├── utils/          # Utility functions
│   │   └── types/          # TypeScript definitions
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

### Adding New AI Providers

1. **Create Provider Class**
   ```typescript
   // backend/src/services/NewProvider.ts
   import { BaseAIProvider } from './BaseAIProvider';
   
   export class NewProvider extends BaseAIProvider {
     constructor(apiKey: string) {
       super('NewProvider', 'https://api.newprovider.com');
       this.client.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
     }
   
     async getModels(): Promise<AIModel[]> {
       // Implementation
     }
   
     async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
       // Implementation
     }
   
     async isAvailable(): Promise<boolean> {
       // Implementation
     }
   }
   ```

2. **Register Provider**
   ```typescript
   // backend/src/services/AIProviderManager.ts
   // Add to initializeProviders() method
   if (config.newprovider?.apiKey) {
     this.providers.set('newprovider', new NewProvider(config.newprovider.apiKey));
   }
   ```

3. **Update Configuration**
   ```typescript
   // backend/src/types/index.ts
   export interface AppConfig {
     // ... existing config
     newprovider?: {
       apiKey: string;
     };
   }
   ```

### API Endpoints

#### Prompt Enhancement
- `POST /api/prompts/enhance` - Enhance a prompt
- `GET /api/prompts/models` - Get available models
- `GET /api/prompts/providers` - Get provider status

#### History Management
- `GET /api/history` - Get prompt history
- `DELETE /api/history/:id` - Delete history item
- `PUT /api/history/:id` - Update history item
- `GET /api/history/export` - Export history

#### Configuration
- `GET /api/config` - Get application config
- `PUT /api/config` - Update config
- `GET /api/config/enhancement-types` - Get enhancement types
- `GET /api/config/user-roles` - Get user roles

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Linting
```bash
# Backend
cd backend
npm run lint

# Frontend
cd frontend
npm run lint
```

## 📊 Performance

### Optimization Features
- **Caching**: Intelligent response caching
- **Connection Pooling**: Efficient API connection management
- **Lazy Loading**: Components load on demand
- **Code Splitting**: Optimized bundle sizes
- **Image Optimization**: Automatic image compression

### Metrics
- **Response Time**: Average < 2 seconds for most enhancements
- **Memory Usage**: Optimized for large prompt histories
- **Bundle Size**: < 2MB for the entire application
- **API Efficiency**: Minimal token usage through optimization

## 🔒 Security

### Security Features
- **API Key Protection**: Environment variable storage
- **Rate Limiting**: Built-in rate limiting for API endpoints
- **Input Validation**: Comprehensive input sanitization
- **CORS Configuration**: Secure cross-origin requests
- **Helmet.js**: Security headers and protections

### Best Practices
- No sensitive data in client-side code
- Secure API key handling
- Input validation and sanitization
- Rate limiting and abuse prevention
- Regular security updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Write comprehensive tests
- Update documentation
- Use conventional commit messages
- Ensure code passes all linting checks

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: Report bugs and request features via GitHub Issues
- **Documentation**: Check this README and inline code documentation
- **Community**: Join discussions in GitHub Discussions

## 🗺️ Roadmap

### Upcoming Features
- [ ] Additional AI provider integrations
- [ ] Prompt templates and library
- [ ] Advanced analytics dashboard
- [ ] Team collaboration features
- [ ] Batch prompt processing
- [ ] Custom model fine-tuning support
- [ ] Mobile application
- [ ] Browser extension
- [ ] API documentation and playground
- [ ] Integration with popular tools and platforms

### Version History
- **v1.0.0** - Initial release with core functionality
- **v1.1.0** - Added history and analytics
- **v1.2.0** - Enhanced UI and additional providers
- **v2.0.0** - Plugin architecture and extensibility

---

**Built with ❤️ by the AI Prompt Enhancer Team**