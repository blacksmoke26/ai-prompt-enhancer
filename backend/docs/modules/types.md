# Types Module

The types module contains TypeScript type definitions and interfaces used throughout the Synapse backend. These types ensure type safety and provide better development experience with autocompletion and error detection.

## Architecture

The types module follows a structured approach organizing types by their purpose:

- `provider.types.ts` - Provider-specific type definitions
- `history.types.ts` - History record and related types
- `config.types.ts` - Configuration and settings types
- `user.types.ts` - User and role related types
- `prompt.types.ts` - Prompt enhancement related types
- `api.types.ts` - API response and request types
- `generic.types.ts` - Generic and reusable type definitions

## Key Type Definitions

### Provider Types (`provider.types.ts`)
Defines structures for AI provider configurations and information:
- `ProviderConfig` - Provider configuration schema
- `ProviderInfo` - Information about a provider
- `ProviderStatus` - Provider availability status
- `ModelInfo` - Information about available models

### History Types (`history.types.ts`)
Defines history record structures and related data:
- `HistoryRecord` - Complete history record structure
- `HistoryFilters` - Filter criteria for history queries
- `HistoryStats` - Statistics for history records

### Prompt Types (`prompt.types.ts`)
Defines prompt enhancement related types:
- `PromptEnhancementRequest` - Request structure for prompt enhancement
- `PromptEnhancementResponse` - Response structure for prompt enhancement
- `EnhancementOptions` - Enhancement configuration options
- `PromptMetadata` - Metadata for prompt operations

### API Types (`api.types.ts`)
Defines API response and request structures:
- `ApiResponse` - Standard API response format
- `ApiError` - Standard API error format
- `PaginatedResponse` - Paginated API response structure
- `ValidationErrorResponse` - Validation error response

### Generic Types (`generic.types.ts`)
Reusable type definitions:
- `Id` - Generic ID type
- `Timestamp` - Timestamp type
- `Optional` - Optional property helper
- `Partial` - Partial type helper
- `Record` - Generic record type

## Usage

Types are automatically imported and used by:
- Controllers for request/response type definitions
- Services for business logic parameter typing
- Database models for data structure definitions
- Schemas for validation type information
- Components for consistent type usage

## Development Guidelines

When creating or modifying types:
1. **Consistent Naming**: Use descriptive names that clearly indicate the type's purpose
2. **Interface vs Type**: Use interfaces for object structures, types for primitives and unions
3. **Documentation**: Include JSDoc comments explaining complex types
4. **Reusability**: Create generic types where possible for reuse
5. **Immutability**: Prefer readonly properties where appropriate
6. **Extensibility**: Design types to be easily extensible
7. **Validation**: Ensure types match schema definitions

## Best Practices

- **Type Safety**: Always prefer TypeScript types over any or unknown
- **Consistency**: Follow established naming conventions and patterns
- **Documentation**: Provide clear comments for complex type definitions
- **Testing**: Ensure types work correctly with actual implementation
- **Updates**: Keep types in sync with code changes
- **Performance**: Avoid overly complex type definitions that impact compilation
- **Backward Compatibility**: Maintain compatibility when possible during updates
