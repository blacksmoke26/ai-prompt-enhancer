# Fastify Module

The fastify module is responsible for the core Fastify server setup, configuration, and bootstrapping process for the Synapse backend.

## Architecture

The Fastify module follows a modular pattern that separates concerns:
- Server initialization and configuration
- Plugin registration and management
- Route controller mapping
- Error handling and validation
- Decorator registration

## Key Components

### Bootstrapper (`appInstance`)
The main entry point for creating the Fastify server instance:
1. Creates a new Fastify instance with configured options
2. Sets up JSON schema validation using Ajv
3. Registers global error handler
4. Loads and registers plugins
5. Registers decorators
6. Registers controllers

### Server Options (`app.options`)
Configures the Fastify server with:
- Logging settings
- Request limits
- Compression
- Security headers
- CORS configuration
- WebSocket support

### Plugin Registration
The system registers several Fastify plugins:
- CORS handling
- Compression
- Rate limiting
- Helmet for security headers
- Form body parsing
- JWT authentication
- WebSocket support
- Custom plugins

### Controller Mapping
Controllers are automatically registered through the bootstrapper:
- Main endpoints
- Configuration endpoints
- Prompt enhancement endpoints
- History management endpoints
- User role endpoints
- Enhancement type endpoints

## Configuration

The Fastify server is configured through environment variables and application settings:
- `HOST` - Server host (default: 0.0.0.0)
- `PORT` - Server port (default: 3000)
- `LOG_LEVEL` - Logging level
- `CORS_ALLOWED_ORIGINS` - Comma-separated list of allowed CORS origins
- `CORS_ALLOWED_IPS` - Comma-separated list of allowed CORS IPs
- `RATE_LIMIT_MAX` - Maximum requests per time window
- `RATE_LIMIT_TIME_WINDOW` - Time window for rate limiting

## Security Features

The Fastify module implements several security measures:
- Helmet middleware for security headers
- CORS configuration with allowed origins
- Rate limiting to prevent abuse
- Input validation using JSON schemas
- Proper error handling to avoid information leakage

## Error Handling

The Fastify module implements centralized error handling:
- Validation errors (422 status)
- Internal server errors (500 status)
- Provider-specific error handling
- Standardized error response format

## API Documentation

The system includes Swagger/OpenAPI documentation:
- Auto-generated API documentation
- Interactive API reference
- Endpoint descriptions and examples
- Request/response schema definitions

## Usage

The Fastify module is automatically initialized during application startup:
1. The `createServer()` function in `src/index.ts` calls the bootstrapper
2. Server configuration is loaded from environment variables
3. All plugins and controllers are registered
4. The server listens on the configured port and host

## Development

During development, the Fastify module:
- Enables detailed logging
- Provides development-specific error messages
- Disables certain security features for easier debugging
- Uses hot-reloading for faster development cycles
