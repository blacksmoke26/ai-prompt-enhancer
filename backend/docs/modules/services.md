# Services Module Documentation

## Overview
The services module contains the core business logic of the AI Prompt Enhancer backend. It provides abstractions for managing AI providers, handling history records, and implementing application-specific functionality that sits between the API controllers and database models.

## Architecture
The services module follows a clear separation of concerns:
- `AIProviderManager`: Manages multiple AI provider implementations and their lifecycle
- `HistoryManager`: Handles history record operations and persistence
- Other service classes for specific business logic

## AI Provider Manager (`AIProviderManager.ts`)

### Overview
The `AIProviderManager` is responsible for initializing, managing, and providing access to various AI service providers. It acts as a central hub for all AI provider interactions.

### Key Features
- Dynamic provider loading based on database configuration
- Provider availability testing
- Model discovery from all configured providers
- Provider-specific configuration management
- Caching and refresh mechanisms

### Methods
- `load()`: Initializes all configured providers
- `getAllProviders()`: Retrieves all providers with availability status
- `getAllModels()`: Gets all available models from all providers
- `getProvider(providerName)`: Gets a specific provider instance
- `refreshProviders()`: Reloads all providers
- `testProvider(providerName)`: Tests if a specific provider is available

### Usage Example
```typescript
const providerManager = new AIProviderManager();
await providerManager.load();

const openai = providerManager.getProvider('openai');
if (openai && await providerManager.testProvider('openai')) {
  const models = await providerManager.getAllModels();
}
```

## History Manager (`HistoryManager.ts`)

### Overview
The `HistoryManager` handles all operations related to prompt enhancement history records. It provides methods for creating, retrieving, updating, and deleting history entries.

### Key Features
- CRUD operations for history records
- Integration with database models
- History filtering and searching capabilities
- Data validation and sanitization
- Performance considerations for large datasets

### Methods
- `create(record)`: Creates a new history record
- `getAll(options)`: Gets all history records with optional filtering
- `getById(id)`: Gets a specific history record
- `update(id, data)`: Updates a history record
- `delete(id)`: Deletes a specific history record
- `deleteAll()`: Deletes all history records
- `search(filters)`: Searches history records based on criteria

### Usage Example
```typescript
const historyManager = new HistoryManager();

const historyRecord = await historyManager.create({
  providerId: 1,
  originalPrompt: "Explain quantum computing",
  enhancedPrompt: "Quantum computing is a computational paradigm...",
  model: "gpt-4",
  // ... other fields
});

const records = await historyManager.getAll({ limit: 10, offset: 0 });
```

## Service Integration

### Relationship with Other Modules
- **Database Models**: Services interact with database models for data persistence
- **Controllers**: Services implement business logic that controllers call
- **Providers**: Services utilize provider implementations for AI operations
- **Configuration**: Services read from configuration managers for settings

### Error Handling
Services implement comprehensive error handling:
- Database operation failures
- Provider-specific errors
- Validation errors
- Resource availability issues

## Best Practices

### 1. Service Layer Design
- Keep business logic in services, not controllers
- Use dependency injection for services
- Implement proper error propagation
- Ensure thread safety where needed

### 2. Performance Considerations
- Implement caching for frequently accessed data
- Optimize database queries
- Handle large datasets efficiently
- Use pagination for large result sets

### 3. Testing
Services should be tested for:
- Business logic correctness
- Integration with database models
- Error condition handling
- Provider interaction scenarios
- Performance under load

## Usage Examples

### Initializing Services
```typescript
// Initialize managers in main server
const configManager = new ConfigManager();
const providerManager = new AIProviderManager();
await providerManager.load();
const historyManager = new HistoryManager();
```

### Using Services in Controllers
```typescript
fastify.post('/api/prompts/enhance', async (request, reply) => {
  const { prompt, provider, model } = request.body;
  
  const providerInstance = providerManager.getProvider(provider);
  if (!providerInstance) {
    throw new Error('Provider not found');
  }
  
  const result = await providerInstance.enhancePrompt(prompt, model);
  
  // Save to history
  const historyRecord = await historyManager.create({
    providerId: providerInstance.id,
    originalPrompt: prompt,
    enhancedPrompt: result.enhancedPrompt,
    // ... other fields
  });
  
  return historyRecord;
});
```

## Testing Considerations

### Unit Testing
- Mock database interactions
- Mock provider implementations
- Test error conditions
- Test boundary cases

### Integration Testing
- Test database operations
- Test provider integration
- Test service-to-service interactions
- Test end-to-end workflows

## Security Considerations

### Data Validation
- Validate all inputs to service methods
- Sanitize data before database operations
- Implement proper access controls

### Provider Security
- Secure API key handling
- Implement proper authentication
- Rate limiting for provider calls
- Error message sanitization