# Synapse Backend

Synapse is a comprehensive backend service designed to provide AI-powered prompt enhancement capabilities. It allows users to submit prompts, enhance them using various AI providers, track enhancement history, and manage prompt templates with advanced features.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Supported Providers](#supported-providers)
- [Enhancement Types](#enhancement-types)
- [Advanced Features](#advanced-features)
- [Usage Examples](#usage-examples)
- [Development](#development)
- [Testing](#testing)
- [Documentation](#documentation)
- [License](#license)

## Features

- **Multi-Provider Support**: Integration with 19+ AI providers including OpenAI, Ollama, Gemini, Anthropic, and more
- **Advanced Prompt Enhancement**: Multiple enhancement types with system prompts and parameter validation
- **Prompt Template System**: Create, categorize, and manage reusable prompt templates
- **Enhanced Context Control**: Configure tone, response length, and target audience for enhanced prompts
- **History Management**: Complete tracking of all prompt enhancement interactions with detailed metadata
- **Real-time Updates**: WebSocket support for live updates
- **Security & Rate Limiting**: Built-in CORS, Helmet security headers, and rate limiting
- **Caching System**: Redis-compatible cache management for improved performance
- **Database Persistence**: SQLite/PostgreSQL with Sequelize ORM
- **API Documentation**: Interactive API documentation with Scalar
- **TypeScript**: Full type safety with comprehensive type definitions

## Architecture

The backend is built using Fastify, a high-performance Node.js web framework, with TypeScript for type safety. The architecture follows a modular pattern with clear separation of concerns:

```
src/
├── base/             # Base classes for AI providers and other components
├── cache/            # Cache management and drivers
├── classes/          # Core application classes
├── constants/        # Application constants and configurations
├── database/         # Database models, migrations, and seeders
├── fastify/          # Fastify specific configurations and bootstrapping
├── helpers/          # Helper functions and utilities
├── providers/        # Provider-specific implementations
├── services/         # Business logic services
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

### Key Components

- **Actions**: API endpoint handlers organized by feature
- **Controllers**: Fastify route registration and organization
- **Services**: Business logic implementations (ProviderService, HistoryService, AdvancedEnhancementService, etc.)
- **Providers**: Individual AI provider implementations extending base classes
- **Models**: Sequelize ORM models for database entities
- **Cache**: CacheManager for performance optimization

## Project Structure

```
D:/Arena/NodeJs/synapse/backend/
├── src/
│   ├── index.ts              # Main application entry point
│   ├── sandbox.ts            # Development sandbox
│   ├── base/                 # Base classes
│   ├── cache/                # Cache management
│   ├── constants/            # Configuration constants
│   ├── database/             # Database configuration
│   ├── fastify/              # Fastify configuration
│   ├── providers/            # AI provider implementations
│   ├── services/             # Business logic
│   └── types/                # TypeScript definitions
├── docs/                     # Documentation
│   ├── modules/              # Module documentation
│   └── project-overview.md   # Project overview
├── __tests__/                # Test files
├── database/                 # SQLite database storage
├── dist/                     # Compiled JavaScript output
└── node_modules/             # Dependencies
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd synapse/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.sample` to `.env` (if available)
   - Configure your AI provider API keys

4. Run database migrations:
   ```bash
   npm run db:migrate
   ```

5. Run database seeders (optional):
   ```bash
   npm run db:seed
   ```

## Configuration

The application uses environment variables for configuration. Key configuration options include:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `HOST` | Server host | `0.0.0.0` |
| `LOG_LEVEL` | Logging level (debug, info, warn, error) | `info` |
| `SQLITE_STORAGE` | Path to SQLite database file | `database/database.sqlite` |
| `CORS_ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins | `-` |
| `CORS_ALLOWED_IPS` | Comma-separated list of allowed CORS IPs | `-` |
| `RATE_LIMIT_MAX` | Maximum requests per time window | `100` |
| `RATE_LIMIT_TIME_WINDOW` | Time window for rate limiting | `1 minute` |

### Provider Configuration

Each AI provider requires specific environment variables for API keys:

```bash
# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Anthropic
ANTHROPIC_API_KEY=your_anthropic_api_key

# Gemini
GEMINI_API_KEY=your_gemini_api_key

# And so on for each provider...
```

## API Endpoints

### Main Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check endpoint |
| `GET` | `/api/test` | Test provider availability |
| `GET` | `/api/docs` | Interactive API documentation (Scalar) |

### Prompt Enhancement Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/prompts/enhance` | Enhance a prompt using configured provider |
| `GET` | `/api/prompts/models` | Get available models from all providers |
| `GET` | `/api/prompts/providers` | Get all configured providers |
| `GET` | `/api/prompts/:provider/test` | Test specific provider |

### Advanced Enhancement Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/advanced-enhancement` | Get all enhancement types |
| `GET` | `/api/advanced-enhancement/:id` | Get specific enhancement type |
| `POST` | `/api/advanced-enhancement` | Create new enhancement type |
| `PUT` | `/api/advanced-enhancement/:id` | Update enhancement type |
| `POST` | `/api/advanced-enhancement/validate-chaining` | Validate enhancement chaining |

### History Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/history` | Get all history records |
| `GET` | `/api/history/:id` | Get specific history record |
| `DELETE` | `/api/history/:id` | Delete specific history record |
| `DELETE` | `/api/history` | Delete all history records |

### Prompt Template Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/templates` | Get all prompt templates |
| `GET` | `/api/templates/:id` | Get specific template |
| `GET` | `/api/templates/category/:category` | Get templates by category |
| `GET` | `/api/templates/tag/:tag` | Get templates by tag |

### Prompt Template Category Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/template-categories` | Get all template categories |

### Configuration Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/config/providers` | Get all providers |
| `GET` | `/api/config/providers/:name/test` | Test specific provider |
| `PUT` | `/api/config/providers/:name` | Update provider configuration |

### Enhancement Meta Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/enhancement-types` | Get all enhancement types |
| `GET` | `/api/tones` | Get all available tones |
| `GET` | `/api/response-lengths` | Get all response length options |
| `GET` | `/api/target-audiences` | Get all target audience options |

### User Role Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/user-roles` | Get all user roles |

## Database Schema

The application uses SQLite with Sequelize ORM. The database includes the following tables:

### Core Tables

- **Providers**: Stores configuration for different AI providers (base URLs, API keys, enabled status)
- **History**: Stores all prompt enhancement interactions with metadata
- **Settings**: Application-wide configuration settings
- **EnhancementType**: Different types of prompt enhancement that can be applied
- **PromptUserRole**: User roles with their permissions

### Advanced Tables

- **PromptTemplate**: Reusable prompt templates
- **PromptTemplateCategory**: Categories for organizing templates
- **HistoryResponse**: Response details for history records
- **Tone**: Available tone options for enhancements
- **ResponseLength**: Available response length options
- **TargetAudience**: Target audience configurations

### History Record Fields

Each history record contains:
- Original and enhanced prompts
- Provider and model information
- Processing time and token usage
- Enhancement type used
- Parameters (tone, response length, target audience)
- Rating and notes
- Template reference (if applicable)

## Supported Providers

Synapse supports the following 19 AI providers:

| Provider | Description | Implementation File |
|----------|-------------|-------------------|
| **Ollama** | Local LLM inference | `OllamaProvider.ts` |
| **OpenAI** | GPT models | `OpenAIProvider.ts` |
| **OpenRouter** | Multiple model routing | `OpenRouterProvider.ts` |
| **DeepSeek** | DeepSeek AI models | `DeepSeekProvider.ts` |
| **Coze** | ByteDance AI platform | `CozeProvider.ts` |
| **Qianfan** | Baidu AI models | `QianFanProvider.ts` |
| **Gemini** | Google generative models | `GeminiProvider.ts` |
| **Kimi** | Moonshot AI | `KimiProvider.ts` |
| **Groq** | Fast LLM inference | `GroqProvider.ts` |
| **Anthropic** | Claude models | `AnthropicProvider.ts` |
| **Mistral** | Mistral AI models | `MistralProvider.ts` |
| **Nvidia** | Nvidia AI models | `NvidiaProvider.ts` |
| **Cohere** | Cohere AI models | `CohereProvider.ts` |
| **Cody** | Sourcegraph AI | `CodyProvider.ts` |
| **XAI** | xAI models | `XAIProvider.ts` |
| **HuggingFace** | HuggingFace models | `HuggingFaceProvider.ts` |
| **SiliconFlow** | SiliconFlow models | `SiliconFlowProvider.ts` |
| **Zhipu** | Zhipu AI models | `ZhipuProvider.ts` |
| **Qwen** | Alibaba Qwen models | `QwenProvider.ts` |
| **LM Studio** | Local model server | `LMStudioProvider.ts` |

Each provider extends the base `BaseAIProvider` class and implements provider-specific configurations and API integrations.

## Enhancement Types

The system includes comprehensive enhancement types with features like:

- **System Prompts**: Customizable prompt templates for each enhancement type
- **Parameters**: Configurable parameters for fine-tuning enhancements
- **Chaining**: Support for chaining multiple enhancements together
- **Categories**: Organized by purpose (clarification, expansion, formatting, etc.)
- **Metadata**: Version tracking, author information, and update history
- **Complexity Levels**: Rated from simple to complex
- **Performance Metrics**: Estimated processing time and token usage
- **Tags**: For organizing and searching enhancement types

Example enhancement categories:
- Clarification
- Expansion
- Simplification
- Formatting
- Translation
- Analysis
- Creative Writing
- Code Generation
- And more...

## Advanced Features

### Prompt Templates

Create and manage reusable prompt templates:
- Organize templates by categories
- Tag templates for easy searching
- Template variables for dynamic content
- Version control for templates

### Enhancement Context

Fine-tune enhancements with:
- **Tones**: Professional, casual, humorous, etc.
- **Response Lengths**: Short, medium, detailed, comprehensive
- **Target Audiences**: General, technical, business, academic, etc.

### Chaining Enhancements

Chain multiple enhancement types together:
- Validate compatibility between enhancements
- Sequential or parallel processing
- Custom chaining rules
- Performance optimization

### Caching System

Performance optimization with:
- CacheManager for unified cache operations
- Configurable cache drivers
- TTL-based expiration
- Cache invalidation strategies

## Usage Examples

### Starting the Server

```bash
# Development mode with hot reload
npm run dev

# Debug mode with inspector
npm run debug

# Production mode
npm run build
npm run start
```

### Testing a Provider

```bash
curl http://localhost:3000/api/config/providers/openai/test
```

### Enhancing a Prompt (Basic)

```bash
curl -X POST http://localhost:3000/api/prompts/enhance \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Explain quantum computing in simple terms",
    "provider": "openai",
    "model": "gpt-4",
    "enhancementType": "clarify"
  }'
```

### Enhancing a Prompt (Advanced)

```bash
curl -X POST http://localhost:3000/api/prompts/enhance \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a blog post about machine learning",
    "provider": "anthropic",
    "model": "claude-3",
    "enhancementType": "expand",
    "tone": "professional",
    "responseLength": "detailed",
    "targetAudience": "technical"
  }'
```

### Getting Enhancement Types

```bash
# Get all enhancement types
curl http://localhost:3000/api/advanced-enhancement

# Get specific enhancement type
curl http://localhost:3000/api/advanced-enhancement/clarify
```

### Managing Prompt Templates

```bash
# Get all templates
curl http://localhost:3000/api/templates

# Get templates by category
curl http://localhost:3000/api/templates/category/technical

# Get templates by tag
curl http://localhost:3000/api/templates/tag/machine-learning
```

### History Management

```bash
# Get all history
curl http://localhost:3000/api/history

# Get specific history record
curl http://localhost:3000/api/history/123

# Delete specific record
curl -X DELETE http://localhost:3000/api/history/123

# Clear all history
curl -X DELETE http://localhost:3000/api/history
```

## Development

### Development Commands

```bash
# Start development server with hot reload
npm run dev

# Debug with inspector
npm run debug

# Start sandbox environment
npm run sandbox
```

### Building for Production

```bash
# Compile TypeScript
npm run build

# Clean build artifacts
npm run clean

# Start production server
npm run start
```

### Database Operations

```bash
# Run all migrations
npm run db:migrate

# Undo last migration
npm run db:rollback

# Undo all migrations
npm run db:rollback:all

# Run all seeders
npm run db:seed

# Undo all seeders
npm run db:seed:undo
```

### Code Quality

```bash
# Run linter
npm run lint

# Format code with Prettier
npm run prettier
```

## Testing

```bash
# Run all tests with coverage
npm run test

# Run tests in watch mode
npm run test:watch
```

## Documentation

### Project Documentation

- [Project Overview](docs/project-overview.md) - Complete project documentation and usage examples
- [Roadmap](ROADMAP.md) - Development roadmap and future features
- [Summary](SUMMARY.md) - Project summary and key features

### Module Documentation

Detailed documentation for each module:

- [Database Module](docs/modules/database.md) - Database schema and operations
- [Controllers](docs/modules/controllers.md) - API endpoint structure
- [Services Module](docs/modules/services.md) - Business logic implementations
- [Providers Module](docs/modules/providers.md) - AI provider implementations
- [Configuration](docs/modules/config.md) - Configuration management
- [Base Classes](docs/modules/base.md) - Abstract base classes and patterns
- [Types Module](docs/modules/types.md) - TypeScript interfaces and definitions

## Version History

- **v1.0.0** - Initial release with core functionality
- **v1.1.0** - Enhanced provider support and performance improvements
- **v1.2.0** - Added user roles and enhanced API
- **v1.3.0** - Current version with WebSocket support, prompt templates, and advanced enhancement features

## Contributing

We welcome contributions to the Synapse project! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on the [GitHub repository](https://github.com/blacksmoke26/synapse/issues).
