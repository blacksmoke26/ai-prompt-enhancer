# AI Prompt Enhancer Backend

AI Prompt Enhancer is a backend service that provides an API for enhancing AI prompts using various AI providers like OpenAI, Ollama, and others. The service allows users to submit prompts, enhance them using AI models, and track their history.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Supported Providers](#supported-providers)
- [Usage Examples](#usage-examples)
- [Development](#development)
- [Testing](#testing)
- [License](#license)

## Features

- Multiple AI provider support (OpenAI, Ollama, Gemini, Anthropic, etc.)
- Prompt enhancement with various enhancement types
- History tracking of all prompt interactions
- Real-time WebSocket updates
- Rate limiting and security features
- Configurable settings and user roles
- Database persistence with Sequelize ORM
- Environment-based configuration
- API documentation with Swagger
- Validation and error handling

## Architecture

The backend is built using Fastify, a high-performance Node.js web framework, with TypeScript for type safety. The architecture follows a modular pattern with clear separation of concerns:

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

For detailed module documentation, see the [docs/modules](docs/modules) directory.

## Project Structure

- `src/index.ts` - Main application entry point
- `src/database/` - Database configuration and models
- `src/controllers/` - API route handlers
- `src/services/` - Business logic implementations
- `src/providers/` - Provider-specific AI implementations
- `src/base/` - Base classes for providers and other components
- `src/config/` - Configuration management
- `src/utils/` - Utility functions
- `src/fastify/` - Fastify specific bootstrapping and configuration

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` (if available) or use the default configuration

4. Run database migrations:
   ```bash
   npm run db:migrate
   ```

## Configuration

The application uses environment variables for configuration. Key configuration options include:

- `PORT` - Server port (default: 3000)
- `HOST` - Server host (default: 0.0.0.0)
- `LOG_LEVEL` - Logging level (default: info)
- `SQLITE_STORAGE` - Path to SQLite database file (default: database/database.sqlite)
- `CORS_ALLOWED_ORIGINS` - Comma-separated list of allowed CORS origins
- `CORS_ALLOWED_IPS` - Comma-separated list of allowed CORS IPs
- `RATE_LIMIT_MAX` - Maximum requests per time window (default: 100)
- `RATE_LIMIT_TIME_WINDOW` - Time window for rate limiting (default: '1 minute')

## API Endpoints

### Main Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/test` - Test provider availability
- `GET /api/docs` - API documentation with Swagger

### Prompt Endpoints

- `POST /api/prompts/enhance` - Enhance a prompt using configured provider
- `GET /api/prompts/models` - Get available models from all providers
- `GET /api/prompts/providers` - Get all configured providers
- `GET /api/prompts/:provider/test` - Test specific provider

### History Endpoints

- `GET /api/history` - Get all history records
- `GET /api/history/:id` - Get specific history record
- `DELETE /api/history/:id` - Delete specific history record
- `DELETE /api/history` - Delete all history records

### Configuration Endpoints

- `GET /api/config/providers` - Get all providers
- `GET /api/config/providers/:name/test` - Test specific provider
- `PUT /api/config/providers/:name` - Update provider configuration

### Enhancement Types

- `GET /api/enhancement-types` - Get all enhancement types

### User Roles

- `GET /api/user-roles` - Get all user roles

## Database Schema

The application uses SQLite with Sequelize ORM. The database includes the following tables:

### Providers
Stores configuration for different AI providers including their base URLs, API keys, and enabled status.

### History
Stores all prompt enhancement interactions with details such as:
- Original and enhanced prompts
- Provider used
- Model information
- Processing time and token usage
- Rating and notes

### Settings
Stores application-wide configuration settings.

### User Roles
Stores different user roles with their permissions.

### Enhancement Types
Stores different types of prompt enhancement that can be applied.

## Supported Providers

The AI Prompt Enhancer supports the following AI providers:

- Ollama
- OpenAI
- OpenRouter
- Deepseek
- Coze
- Qianfan (Baidu)
- Gemini (Google)
- Kimi (Moonshot)
- Groq
- Anthropic
- Mistral
- Nvidia
- Cohere
- Cody (Sourcegraph)
- XAI
- HuggingFace
- SiliconFlow
- Zhipu
- Qwen (Aliyun)
- LM Studio

Each provider has its own implementation in the `src/providers/` directory, extending the base `BaseAIProvider` class.

## Usage Examples

### Starting the Server

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm run start
```

### Testing a Provider

```bash
curl http://localhost:3000/api/config/providers/openai/test
```

### Enhancing a Prompt

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

For more detailed usage examples and API documentation, see [docs/project-overview.md](docs/project-overview.md).

## Development

### Running Development Server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Database Migrations

```bash
# Run migrations
npm run db:migrate

# Undo last migration
npm run db:rollback

# Run seeders
npm run db:seed
```

## Testing

```bash
npm run test
```

## License

This project is licensed under the MIT License.