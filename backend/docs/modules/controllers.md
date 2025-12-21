# API Controllers Documentation

## Overview
The API controllers module handles all incoming HTTP requests and route management for the AI Prompt Enhancer backend. Controllers are organized by functionality and follow the Fastify route controller pattern, managing the flow of data between the client and services.

## Architecture
Controllers are organized based on their functionality:
- `main.controller.ts`: Main application endpoints and health checks
- `prompt.controller.ts`: Prompt enhancement and model management
- `history.controller.ts`: History record management
- `config.controller.ts`: Configuration management for providers
- `enhancement-type.controller.ts`: Enhancement type management
- `user-role.controller.ts`: User role management

## Controller Structure

Each controller follows the Fastify pattern:
```typescript
export default async function controllerName(fastify, options) {
  // Register routes here
  fastify.get('/endpoint', handler);
  fastify.post('/endpoint', handler);
  // ... other routes
}
```

## Main Controller (`main.controller.ts`)

Handles core application endpoints:
- `/health` - Health check endpoint
- `/test` - Provider availability test endpoint

## Prompt Controller (`prompt.controller.ts`)

Manages prompt enhancement operations:
- `POST /api/prompts/enhance` - Enhance a prompt using configured provider
- `GET /api/prompts/models` - Get available models from all providers

## History Controller (`history.controller.ts`)

Handles history record management:
- `GET /api/history` - Get all history records
- `GET /api/history/:id` - Get specific history record
- `DELETE /api/history/:id` - Delete specific history record
- `DELETE /api/history` - Delete all history records

## Configuration Controller (`config.controller.ts`)

Manages provider configuration:
- `GET /api/config/providers` - Get all providers
- `GET /api/config/providers/:name/test` - Test specific provider
- `PUT /api/config/providers/:name` - Update provider configuration

## Enhancement Type Controller (`enhancement-type.controller.ts`)

Manages enhancement types:
- `GET /api/enhancement-types` - Get all enhancement types

## User Role Controller (`user-role.controller.ts`)

Manages user roles:
- `GET /api/user-roles` - Get all user roles

## Route Parameters and Request Bodies

### Prompt Enhancement Request
```json
{
  "prompt": "Explain quantum computing in simple terms",
  "provider": "openai",
  "model": "gpt-4",
  "enhancementType": "clarify",
  "temperature": 0.7,
  "maxTokens": 1000
}
```

### Provider Configuration
```json
{
  "name": "openai",
  "caption": "OpenAI",
  "config": {
    "baseUrl": "https://api.openai.com/v1",
    "apiKey": "sk-1234567890",
    "timeout": 30000
  },
  "enabled": true
}
```

## Error Handling

Controllers implement standardized error handling:
- Validation errors (400)
- Internal server errors (500)
- Provider-specific errors
- Resource not found errors (404)

## Middleware Integration

Controllers integrate with:
- Authentication middleware (when implemented)
- Rate limiting
- CORS configuration
- Logging middleware

## Usage Examples

### Registering a Controller
```typescript
import promptController from './controllers/promptController';

fastify.register(promptController, { 
  prefix: '/api/prompts',
  providerManager,
  historyManager
});
```

### Controller Testing
```typescript
// Test endpoint
fastify.get('/test', async () => {
  const provider = options.providerManager.getProvider('zhipu')!;
  return {isAvailable: await provider.isAvailable(), models: await provider.getModels()};
});
```

## Best Practices

1. **Consistent Error Responses**: All controllers should return standardized error responses
2. **Input Validation**: Validate all request parameters and bodies
3. **Resource Management**: Properly handle database connections and resources
4. **Logging**: Implement appropriate logging for debugging and monitoring
5. **Security**: Validate and sanitize all inputs
6. **Documentation**: Keep route documentation up to date

## Testing

Controllers should be tested for:
1. Route registration and functionality
2. Valid request handling
3. Error case scenarios
4. Integration with services
5. Middleware functionality
6. Response format consistency
