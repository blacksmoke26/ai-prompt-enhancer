# Synapse Backend - Project Summary

## Project Overview

The Synapse is a comprehensive backend service designed to provide prompt enhancement capabilities using various AI/ML providers. It allows users to submit prompts, enhance them using different AI models, and track their enhancement history. The system supports multiple AI providers including OpenAI, Ollama, Gemini, Anthropic, and many others.

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

## Architecture

The backend follows a modular architecture built on Fastify with TypeScript:

```
src/
├── actions/          # Action handlers for business logic
├── base/             # Base classes for AI providers and other components
├── classes/          # Core application classes
├── config/           # Configuration management
├── constants/        # Application constants
├── controllers/      # Fastify route controllers
├── database/         # Database models, migrations, and seeders
├── fastify/          # Fastify specific configurations and bootstrapping
├── helpers/          # Helper functions and utilities
├── middleware/       # Custom middleware functions
├── providers/        # Provider-specific implementations
├── schemas/          # JSON schemas for validation
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

## Documentation

The project includes comprehensive documentation in the `docs/` directory:

### Module Documentation
- [Database Module](docs/modules/database.md) - Database schema and operations
- [API Controllers](docs/modules/controllers.md) - API endpoint structure and controllers
- [Services Module](docs/modules/services.md) - Business logic and service implementations
- [Providers Module](docs/modules/providers.md) - AI provider implementations
- [Configuration Management](docs/modules/config.md) - Configuration handling and management
- [Base Classes](docs/modules/base.md) - Abstract base classes and design patterns
- [Types Module](docs/modules/types.md) - TypeScript interfaces and type definitions

### Project Overview
- [Project Overview](docs/project-overview.md) - Complete project documentation and usage examples

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

## Roadmap

The project follows a structured roadmap with phases:
1. **Core Foundation** (Completed) - Basic functionality and database structure
2. **Enhanced Functionality** (In Progress) - Advanced features and improvements
3. **Scalability & Performance** (Upcoming) - Performance optimizations and scalability
4. **Advanced Features** (Future) - Advanced analytics, templates, and marketplace
5. **Ecosystem Integration** (Future) - Integration with external tools and platforms

## License

This project is licensed under the MIT License.
