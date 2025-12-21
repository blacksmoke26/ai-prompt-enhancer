# AI Prompt Enhancer Backend - Project Overview

## Project Description

The AI Prompt Enhancer is a comprehensive backend service designed to provide prompt enhancement capabilities using various AI/ML providers. It allows users to submit prompts, enhance them using different AI models, and track their enhancement history. The system supports multiple AI providers including OpenAI, Ollama, Gemini, Anthropic, and many others.

## Key Features

### Multi-Provider Support
- Support for 20+ different AI/ML providers
- Unified interface for interacting with different AI services
- Provider-specific configurations and authentication
- Dynamic provider loading and management

### Prompt Enhancement
- Various enhancement types (clarify, expand, simplify, etc.)
- Model selection and configuration
- Temperature and token control
- System prompt customization

### History Management
- Complete tracking of all prompt enhancement interactions
- Detailed metadata for each enhancement
- Rating and notes system
- Search and filtering capabilities

### Technical Features
- WebSocket real-time updates
- Rate limiting and security features
- Database persistence with SQLite
- TypeScript type safety
- Comprehensive API endpoints
- Environment-based configuration

## Architecture Overview

The backend follows a modular architecture built on Fastify with TypeScript:

```
src/
├── actions/          # Action handlers
├── base/             # Base classes and abstract implementations
├── classes/          # Core application classes
├── config/           # Configuration management
├── constants/        # Application constants
├── controllers/      # API route handlers
├── database/         # Database models, migrations, seeders
├── middleware/       # Custom middleware functions
├── providers/        # Provider-specific implementations
├── services/         # Business logic services
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Technology Stack

### Core Technologies
- **Framework**: Fastify (high-performance Node.js web framework)
- **Language**: TypeScript (type safety and modern JavaScript features)
- **Database**: SQLite with Sequelize ORM
- **API**: RESTful endpoints with WebSocket support
- **Authentication**: Environment-based security

### AI Provider Integration
- **OpenAI**: GPT models
- **Ollama**: Local LLM models
- **Gemini**: Google's generative models
- **Anthropic**: Claude models
- **Mistral**: Mistral AI models
- **Qwen**: Alibaba's Qwen models
- **And 10+ more providers**

### Development Tools
- **Testing**: Jest for unit and integration tests
- **Linting**: ESLint with TypeScript support
- **Build**: TypeScript compiler (tsc)
- **Development**: tsx for development mode
- **Database**: Sequelize CLI for migrations

## API Endpoints

### Main Endpoints
- `GET /api/health` - Health check
- `GET /api/test` - Provider testing

### Prompt Management
- `POST /api/prompts/enhance` - Enhance prompts
- `GET /api/prompts/models` - Get available models

### History Management
- `GET /api/history` - Get history records
- `GET /api/history/:id` - Get specific record
- `DELETE /api/history/:id` - Delete record
- `DELETE /api/history` - Delete all records

### Configuration
- `GET /api/config/providers` - Get all providers
- `GET /api/config/providers/:name/test` - Test specific provider
- `PUT /api/config/providers/:name` - Update provider config

### System Information
- `GET /api/enhancement-types` - Get enhancement types
- `GET /api/user-roles` - Get user roles

## Database Schema

The application uses SQLite with the following core tables:

### Providers
Stores configuration for different AI providers including base URLs, API keys, and enabled status.

### History
Stores all prompt enhancement interactions with detailed metadata including:
- Original and enhanced prompts
- Provider and model information
- Processing time and token usage
- Rating and notes

### Settings
Application-wide configuration settings.

### User Roles
Different user roles with their permissions.

### Enhancement Types
Types of prompt enhancement that can be applied.

## Getting Started

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Run database migrations: `npm run db:migrate`
4. Start the server: `npm run dev`

### Configuration
The application uses environment variables for configuration. Key variables include:
- `PORT` - Server port
- `HOST` - Server host
- `SQLITE_STORAGE` - Database file path
- Provider-specific API keys

## Development

### Running Development Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm run start
```

### Database Operations
```bash
# Migrations
npm run db:migrate
npm run db:rollback

# Seeders
npm run db:seed
npm run db:seed:undo
```

## Testing

```bash
npm run test
```

## Contributing

We welcome contributions to the AI Prompt Enhancer project. Please see our contributing guidelines for more information.

## License

This project is licensed under the MIT License.