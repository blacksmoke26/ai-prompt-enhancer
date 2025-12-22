# Schemas Module

The schemas module contains JSON schema definitions used for request validation throughout the AI Prompt Enhancer backend.

## Architecture

The schemas module follows a centralized validation pattern where each schema defines the structure and validation rules for specific API requests and responses:

- `prompt-enhance.schema.ts` - Schema for prompt enhancement requests
- `provider-config.schema.ts` - Schema for provider configuration updates
- `history.schema.ts` - Schema for history record operations
- `user-role.schema.ts` - Schema for user role management
- `enhancement-type.schema.ts` - Schema for enhancement type operations
- `generic.schema.ts` - Generic schemas used across multiple endpoints

## Validation Purpose

Schemas serve multiple purposes in the application:

### Request Validation
- Validate incoming request parameters and body content
- Ensure required fields are present
- Check data types and formats
- Apply constraints and limits

### Response Formatting
- Define structure for API responses
- Ensure consistent data format
- Provide documentation through schema definitions

### Error Handling
- Provide detailed validation error messages
- Enable centralized error handling
- Improve debugging experience

## Usage

Schemas are automatically integrated with the Fastify framework:

1. **Controller Level**: Schemas are applied to routes in controller files
2. **Validation Compiler**: Used by AjvHelper for request validation
3. **API Documentation**: Auto-generated from schema definitions
4. **Type Generation**: Used for TypeScript type definitions

## Schema Structure

Each schema file follows a consistent pattern:

```typescript
{
  $id: 'unique-id-for-schema',
  type: 'object',
  required: ['field1', 'field2'],
  properties: {
    field1: { type: 'string' },
    field2: { type: 'integer' },
    // ... other properties
  },
  additionalProperties: false
}
```

## Development Guidelines

When creating or modifying schemas:

1. **Consistent Naming**: Use descriptive names that match the purpose
2. **Validation Rules**: Apply appropriate validation rules (type, format, constraints)
3. **Documentation**: Include clear comments explaining validation requirements
4. **Reusability**: Create reusable schema components where possible
5. **Testing**: Ensure schemas work correctly with actual request data
6. **Updates**: Keep schemas in sync with API changes

## Best Practices

- Keep schemas focused and simple
- Use appropriate validation levels (required, optional, conditional)
- Provide clear error messages for validation failures
- Reuse common schema definitions where appropriate
- Regularly review and update schemas for new features
- Maintain backward compatibility when possible