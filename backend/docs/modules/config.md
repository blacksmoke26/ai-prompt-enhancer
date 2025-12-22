# Configuration Module

The configuration module handles application settings and environment variable management for the AI Prompt Enhancer backend.

## Architecture

The configuration module follows a centralized approach where:
- Environment variables are loaded and processed
- Default configurations are provided
- Configuration validation and sanitization occurs
- Settings are accessible throughout the application

## Configuration Sources

### Environment Variables
Configuration is primarily managed through environment variables loaded from `.env` files:

```env
# Server configuration
HOST=0.0.0.0
PORT=3000
LOG_LEVEL=info

# Database
SQLITE_STORAGE=database/database.sqlite

# CORS configuration
CORS_ALLOWED_ORIGINS=
CORS_ALLOWED_IPS=
CORS_ALLOWED_ORIGIN_HEADERS=

# Rate limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_TIME_WINDOW='1 minute'

# Logging
LOGGING_FASTIFY_SERVER=true
```

### Configuration Structure
The configuration system supports the following key settings:
- `HOST` - Server host address (default: 0.0.0.0)
- `PORT` - Server port number (default: 3000)
- `LOG_LEVEL` - Logging level (default: info)
- `SQLITE_STORAGE` - Path to SQLite database file (default: database/database.sqlite)
- `CORS_ALLOWED_ORIGINS` - Comma-separated list of allowed CORS origins
- `CORS_ALLOWED_IPS` - Comma-separated list of allowed CORS IPs
- `RATE_LIMIT_MAX` - Maximum requests per time window (default: 100)
- `RATE_LIMIT_TIME_WINDOW` - Time window for rate limiting (default: '1 minute')
- `LOGGING_FASTIFY_SERVER` - Enable Fastify server logging (default: true)

## Configuration Loading

The configuration is loaded during application startup:
1. `.env` file is loaded using dotenv
2. Environment variables are processed and validated
3. Default values are applied for missing settings
4. Configuration is made available to all application modules

## Configuration Management

### Default Configuration
The application provides sensible defaults for all configuration options to ensure it runs out-of-the-box.

### Runtime Configuration
Some settings can be modified at runtime through:
- Database settings table
- API endpoints for configuration updates
- Environment variable overrides

## Usage

Configuration is accessed throughout the application using:
- Direct environment variable access
- Configuration service for centralized access
- Database settings for persistent configuration

## Best Practices

### Security
- Never commit sensitive configuration to version control
- Use environment variables for API keys and secrets
- Implement proper validation for configuration values
- Use different configuration files for different environments

### Performance
- Load configuration once during startup
- Cache configuration values where appropriate
- Validate configuration early in the application lifecycle
- Minimize configuration changes during runtime

### Development
- Use `.env.sample` as a template for new environments
- Implement environment-specific configuration files
- Test configuration changes in staging environments
- Document all configuration options thoroughly