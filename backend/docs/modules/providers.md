# Providers Module Documentation

## Overview
The providers module contains implementations for various AI/ML service providers that the AI Prompt Enhancer can interact with. Each provider has its own implementation class that extends the base `BaseAIProvider` class, providing specific functionality for that provider's API.

## Architecture
The providers module follows a consistent pattern:
- Base class `BaseAIProvider` in `src/base/` defines common interfaces and methods
- Individual provider implementations in `src/providers/` extend the base class
- Provider classes are registered in `src/constants/providers.ts` for easy access

## Base Provider Class (`BaseAIProvider.ts`)

### Overview
The `BaseAIProvider` class serves as the foundation for all provider implementations. It defines the common interface and shared functionality that all AI providers must implement.

### Key Methods
- `isAvailable()`: Check if provider is reachable and properly configured
- `getModels()`: Retrieve available models from the provider
- `enhancePrompt(prompt, options)`: Enhance a prompt using the provider
- `testConnection()`: Test the connection to the provider API
- `getProviderInfo()`: Get information about the provider

### Properties
- `name`: Provider name
- `baseUrl`: Base URL for API endpoints
- `apiKey`: API authentication key (if required)
- `timeout`: Request timeout in milliseconds
- `config`: Provider-specific configuration

## Individual Provider Implementations

### Ollama Provider (`OllamaProvider.ts`)
- Connects to local Ollama service
- Supports local LLM models
- No API key required
- Default URL: `http://localhost:11434`

### OpenAI Provider (`OpenAIProvider.ts`)
- Connects to OpenAI API
- Supports GPT models
- Requires API key
- Default URL: `https://api.openai.com/v1`

### OpenRouter Provider (`OpenRouterProvider.ts`)
- Connects to OpenRouter API
- Supports multiple models from various providers
- Requires API key
- Default URL: `https://openrouter.ai/api/v1`

### DeepSeek Provider (`DeepSeekProvider.ts`)
- Connects to DeepSeek API
- Supports DeepSeek models
- Requires API key
- Default URL: `https://api.deepseek.com`

### Gemini Provider (`GeminiProvider.ts`)
- Connects to Google's Gemini API
- Supports Google's generative models
- Requires API key
- Default URL: `https://generativelanguage.googleapis.com/v1beta`

### And many more...
- Anthropic Provider
- Mistral Provider
- Qwen Provider
- HuggingFace Provider
- And others listed in the supported providers section

## Provider Configuration

### Configuration Structure
Each provider accepts configuration through:
```typescript
{
  baseUrl: string,
  apiKey?: string,
  timeout?: number,
  [key: string]: any
}
```

### Provider Registration
Providers are registered in `src/constants/providers.ts`:
- `providers` array defines default configurations
- `providersClasses` maps provider names to their implementation classes
- `configKeys` defines valid configuration keys

## Usage Examples

### Initializing a Provider
```typescript
import { providersClasses } from '~/constants/providers';

const OllamaProvider = providersClasses['ollama'];
const provider = new OllamaProvider({
  baseUrl: 'http://localhost:11434',
  timeout: 30000
});
```

### Using a Provider
```typescript
// Check if provider is available
const isAvailable = await provider.isAvailable();

// Get available models
const models = await provider.getModels();

// Enhance a prompt
const result = await provider.enhancePrompt("Explain quantum computing", {
  model: "llama2",
  temperature: 0.7
});
```

## Best Practices

### 1. Error Handling
- Implement proper error handling for API calls
- Handle rate limiting gracefully
- Log provider-specific errors appropriately
- Provide fallback mechanisms when possible

### 2. Security
- Never expose API keys in client-side code
- Implement secure storage for API credentials
- Validate provider configurations
- Use HTTPS when possible

### 3. Performance
- Implement connection pooling where appropriate
- Use caching for frequently accessed data
- Handle timeouts properly
- Monitor API usage and costs

### 4. Testing
- Mock API calls during testing
- Test provider availability
- Test model discovery
- Test error scenarios

## Integration with AI Provider Manager

The `AIProviderManager` uses the providers in the following way:
1. Loads provider configurations from database
2. Instantiates provider classes based on registered implementations
3. Provides access to providers through `getProvider()` method
4. Handles provider testing and availability checks

## Testing Considerations

### Unit Testing
- Mock API endpoints
- Test provider instantiation
- Test model discovery
- Test error handling scenarios

### Integration Testing
- Test actual API connectivity
- Test real provider responses
- Test configuration loading
- Test error conditions

## Security Considerations

### API Key Management
- Store API keys securely (environment variables)
- Never log API keys
- Implement proper access controls
- Rotate keys regularly

### Network Security
- Use HTTPS for all API calls
- Implement proper timeouts
- Validate provider endpoints
- Monitor for security issues

## Common Issues and Solutions

### 1. Connection Problems
- Check network connectivity
- Verify API endpoints
- Confirm API keys are valid
- Check provider status pages

### 2. Authentication Issues
- Verify API keys are correct
- Check provider permissions
- Ensure proper authentication headers
- Review provider documentation for auth requirements

### 3. Rate Limiting
- Implement proper rate limiting in application
- Handle rate limit errors gracefully
- Consider caching for repeated requests
- Monitor usage patterns