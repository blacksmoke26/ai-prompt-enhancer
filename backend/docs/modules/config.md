# Configuration Management Documentation

## Overview
The configuration management module handles application-wide settings and provider configurations for the AI Prompt Enhancer backend. It provides a centralized way to manage both application settings and AI provider credentials.

## Architecture
The configuration management follows a modular approach:
- `ConfigService.ts` - Main configuration manager class
- `ProviderService.ts` - Provider-specific configuration handling
- Configuration persistence in database models
- Environment variable integration

## ConfigService Class (`ConfigService.ts`)

### Overview
The `ConfigService` class serves as the central point for managing all application configurations, including:
- Application-wide settings
- Provider configurations
- User roles and permissions
- Enhancement types

### Key Features
- Centralized configuration access
- Database-backed configuration storage
- Configuration validation and sanitization
- Caching for frequently accessed settings
- Change tracking and notifications

### Methods
- `getSettings()`: Get all application settings
- `updateSettings(settings)`: Update application settings
- `getProviderConfig(providerName)`: Get specific provider configuration
- `updateProviderConfig(providerName, config)`: Update provider configuration
- `getAllProviders()`: Get all configured providers
- `getEnhancementTypes()`: Get available enhancement types
- `getUserRoles()`: Get available user roles
- `validateConfig(config)`: Validate configuration data

### Usage Example
```typescript
const configService = new ConfigService();

// Get all providers
const providers = await configService.getAllProviders();

// Update provider configuration
await configService.updateProviderConfig('openai', {
  baseUrl: 'https://api.openai.com/v1',
  apiKey: 'sk-1234567890',
  timeout: 30000
});

// Get application settings
const settings = await configService.getSettings();
```

## Configuration Storage

### Database Models
Configuration data is stored in the database using:
- `Setting` model for application-wide settings
- `Provider` model for provider configurations
- `UserRole` model for user roles
- `EnhancementType` model for enhancement types

### Configuration Structure
```typescript
// Application Settings
{
  appName: 'AI Prompt Enhancer',
  version: '1.0.0',
  maxHistoryRecords: 1000,
  defaultEnhancementType: 'clarify',
  enableLogging: true
}

// Provider Configuration
{
  name: 'openai',
  caption: 'OpenAI',
  config: {
    baseUrl: 'https://api.openai.com/v1',
    apiKey: 'sk-1234567890',
    timeout: 30000
  },
  enabled: true
}
```

## Environment Variables

The application supports the following environment variables:
- `PORT` - Server port (default: 3000)
- `HOST` - Server host (default: 0.0.0.0)
- `LOG_LEVEL` - Logging level (default: info)
- `SQLITE_STORAGE` - Path to SQLite database file (default: database/database.sqlite)
- `NODE_ENV` - Environment mode (development, production, test)

## Integration with Other Modules

### Provider Manager
The configuration manager integrates with the `AIProviderManager` to:
- Load provider configurations from database
- Validate provider settings before initialization
- Handle configuration updates for running providers

### Controllers
Controllers use the configuration manager for:
- Provider availability checks
- Configuration validation
- Access to enhancement types and user roles
- Settings-based routing and behavior

## Best Practices

### 1. Security
- Never expose API keys in logs or responses
- Store sensitive configuration in environment variables
- Implement proper access controls for configuration updates
- Validate all configuration inputs

### 2. Performance
- Cache frequently accessed configurations
- Use efficient database queries for configuration lookups
- Implement proper error handling for configuration loading
- Consider lazy loading for non-critical configurations

### 3. Maintainability
- Keep configuration structure consistent
- Document configuration options clearly
- Implement configuration validation
- Use versioning for configuration schemas

## Usage Examples

### Initializing Configuration Manager
```typescript
import ConfigService from '~/config/ConfigService';

const configService = new ConfigService();
// Configuration is automatically loaded on instantiation
```

### Updating Configuration
```typescript
// Update application settings
await configService.updateSettings({
  maxHistoryRecords: 5000,
  enableLogging: false
});

// Update provider configuration
await configService.updateProviderConfig('openai', {
  apiKey: 'new-api-key-here'
});
```

### Configuration Validation
```typescript
// Validate provider configuration before saving
try {
  const isValid = await configService.validateConfig({
    name: 'openai',
    config: {
      baseUrl: 'https://api.openai.com/v1',
      apiKey: 'sk-1234567890'
    }
  });
  if (isValid) {
    // Proceed with saving configuration
  }
} catch (error) {
  // Handle validation errors
}
```

## Testing Considerations

### Unit Testing
- Test configuration loading and saving
- Test validation logic
- Test error conditions and edge cases
- Test integration with database models
- Mock external dependencies for provider tests

### Integration Testing
- Test full configuration workflow
- Test database persistence
- Test concurrent configuration updates
- Test configuration propagation to other modules

## Security Considerations

### Sensitive Data Handling
- API keys and credentials should never be logged
- Configuration should be encrypted at rest
- Access to configuration endpoints should be restricted
- Implement proper authentication for configuration updates

### Access Control
- Only authorized users should be able to modify configurations
- Implement role-based access control for configuration management
- Log all configuration changes for audit purposes
- Provide backup mechanisms for configuration data

## Performance Considerations

### Caching Strategy
- Cache frequently accessed configuration data
- Implement cache invalidation for updates
- Consider using memory caching for performance
- Handle cache misses gracefully

### Database Optimization
- Use indexes on frequently queried configuration fields
- Optimize queries for configuration lookups
- Implement proper connection pooling
- Monitor query performance for configuration operations

## Common Issues and Solutions

### 1. Configuration Loading Failures
- Ensure database is initialized before loading configurations
- Handle database connection errors gracefully
- Implement fallback to default configurations

### 2. Validation Errors
- Provide clear error messages for invalid configurations
- Validate required fields before saving
- Use consistent validation patterns across all configurations

### 3. Concurrency Issues
- Implement proper locking mechanisms for concurrent updates
- Use database transactions for related configuration changes
- Handle race conditions in configuration updates
