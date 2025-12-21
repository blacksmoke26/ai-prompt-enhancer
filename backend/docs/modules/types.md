# Types Documentation

## Overview
The types module defines the TypeScript interfaces and types used throughout the AI Prompt Enhancer backend. These types ensure type safety, improve code maintainability, and provide better developer experience with autocompletion and error detection.

## Architecture
The types module is organized to provide:
- Core application types
- API response types
- Provider-related types
- Database model types
- Configuration types

## Core Types

### AIProvider Interface (`AIProvider`)
Represents an AI provider with its configuration and capabilities.

```typescript
interface AIProvider {
  caption: string;           // Human-readable name
  name: string;              // Unique identifier
  models: AIModel[];         // Available models
  isConfigured: boolean;     // Whether provider is properly configured
  config: ConfigMeta;        // Provider configuration
}
```

### AIModel Interface (`AIModel`)
Represents an AI model available from a provider.

```typescript
interface AIModel {
  id: string;                // Unique model identifier
  name: string;              // Human-readable model name
  provider: string;          // Provider name
  description?: string;      // Model description
  contextLength?: number;    // Context window length
  maxTokens?: number;        // Maximum tokens allowed
  isAvailable?: boolean;     // Whether model is currently available
}
```

### EnhanceOptions Interface (`EnhanceOptions`)
Options for enhancing a prompt.

```typescript
interface EnhanceOptions {
  model?: string;            // Model to use
  temperature?: number;      // Sampling temperature
  maxTokens?: number;        // Maximum tokens to generate
  systemPrompt?: string;     // System prompt to use
  enhancementType?: string;  // Type of enhancement to apply
}
```

### EnhanceResult Interface (`EnhanceResult`)
Result of prompt enhancement operation.

```typescript
interface EnhanceResult {
  enhancedPrompt: string;    // The enhanced prompt
  originalPrompt: string;    // The original prompt
  provider: string;          // Provider used
  model: string;             // Model used
  tokensUsed: number;        // Tokens consumed
  processingTime: number;    // Time taken (milliseconds)
  temperature: number;       // Temperature used
  maxTokens: number;         // Max tokens used
  meta?: Record<string, any>; // Additional metadata
}
```

### ConfigMeta Interface (`ConfigMeta`)
Metadata for configuration objects.

```typescript
interface ConfigMeta {
  [key: string]: any;
  enabled?: boolean;         // Whether the configuration is enabled
  apiKey?: string | null;    // API key for authentication
  baseUrl?: string;          // Base URL for the provider's API
  timeout?: number;          // Request timeout in milliseconds
}
```

## Database Model Types

### HistoryAttributes
Attributes for history records.

```typescript
interface HistoryAttributes {
  id: number;
  providerId: number;
  originalPrompt: string;
  enhancedPrompt: string;
  model: string;
  enhancementType: string;
  userRole: string;
  systemPrompt: string;
  tokensUsed: number;
  processingTime: number;
  temperature: number;
  maxTokens: number;
  rating: number;
  notes: string | null;
  meta?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
```

### ProviderAttributes
Attributes for provider configurations.

```typescript
interface ProviderAttributes {
  id: number;
  caption: string;
  name: string;
  config: ConfigMeta;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## API Response Types

### HealthCheckResponse
Response for health check endpoint.

```typescript
interface HealthCheckResponse {
  status: 'ok';
  timestamp: string;
}
```

### ProviderTestResponse
Response for provider testing.

```typescript
interface ProviderTestResponse {
  isAvailable: boolean;
  models: AIModel[];
}
```

### PaginationResponse
Generic pagination response.

```typescript
interface PaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}
```

## Usage Examples

### Using Types in Controllers
```typescript
import type { AIProvider, AIModel, EnhanceOptions } from '~/types';

fastify.post('/api/prompts/enhance', async (request, reply) => {
  const { prompt, provider, model } = request.body as EnhanceOptions;
  // Type-safe usage of parameters
});
```

### Type Validation
```typescript
// Type assertion
const provider = providerManager.getProvider('openai') as BaseAIProvider;
// or
const provider: BaseAIProvider = providerManager.getProvider('openai')!;
```

## Type Safety Best Practices

### 1. Interface Design
- Use interfaces for contract definitions
- Implement proper inheritance patterns
- Keep types as simple as possible while providing necessary information

### 2. Union Types
- Use union types for optional fields
- Implement discriminated unions for complex conditional logic
- Provide clear type narrowing

### 3. Generic Types
- Use generics for reusable type patterns
- Implement type constraints where appropriate
- Consider type inference for better developer experience

## Migration and Compatibility

### Versioning Strategy
- Maintain backward compatibility when possible
- Use semantic versioning for type changes
- Document breaking changes in major releases
- Provide migration guides for significant type changes

### Type Evolution
- Add new fields as optional when possible
- Use type aliases for complex nested structures
- Implement proper error handling for type mismatches
- Update types consistently across the codebase

## Testing Considerations

### Type Checking
- Ensure all code compiles with TypeScript
- Test type compatibility in integration scenarios
- Verify that interfaces match implementation
- Test type safety in edge cases

### Development Experience
- Leverage TypeScript for autocompletion
- Use type definitions for better IDE support
- Implement proper JSDoc comments for complex types
- Document type usage patterns and examples

## Common Type Patterns

### Optional Fields
```typescript
interface OptionalFields {
  requiredField: string;
  optionalField?: string;   // Optional field
  maybeField: string | null; // Field that can be null
}
```

### Discriminated Unions
```typescript
type RequestType = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface BaseRequest {
  type: RequestType;
  url: string;
}

interface GetRequest extends BaseRequest {
  type: 'GET';
  headers?: Record<string, string>;
}

interface PostRequest extends BaseRequest {
  type: 'POST';
  body: any;
  contentType?: string;
}
```

### Type Guards
```typescript
function isAIProvider(obj: any): obj is AIProvider {
  return obj && typeof obj.name === 'string' && Array.isArray(obj.models);
}
```
