# Helpers Module

The helpers module contains utility functions and classes that provide common functionality used throughout the AI Prompt Enhancer backend.

## Architecture

The helpers module follows a functional pattern where each helper serves a specific purpose:
- `AjvHelper.ts` - JSON schema validation helper using Ajv
- `ErrorHelper.ts` - Error handling and formatting utilities
- `ResponseHelper.ts` - API response formatting utilities

## Key Helpers

### AjvHelper (`AjvHelper.ts`)
Provides JSON schema validation capabilities using the Ajv library:
- Centralized validation setup with custom error messages
- Schema compilation and validation functions
- Integration with Fastify's validator compiler
- Error formatting for validation failures

### ErrorHelper (`ErrorHelper.ts`)
Handles error management and formatting:
- Standardized error creation and formatting
- Error classification and logging
- API error response generation
- Exception handling utilities

### ResponseHelper (`ResponseHelper.ts`)
Manages API response formatting:
- Standardized success response structure
- Error response formatting
- Data wrapping and serialization
- HTTP status code handling

## Usage

Helpers are automatically imported and used by:
- Controllers for request validation
- Services for error handling
- Decorators for response formatting
- Middleware for consistent error handling

## Development

When adding new helpers:
1. Follow the existing patterns and naming conventions
2. Ensure proper TypeScript typing
3. Add comprehensive comments and documentation
4. Test helper functions thoroughly
5. Register new helpers in appropriate modules

## Best Practices

- Keep helpers focused on single responsibilities
- Maintain consistent return types and error handling
- Use TypeScript for better type safety
- Ensure helpers are reusable across different parts of the application
- Document helper usage with examples