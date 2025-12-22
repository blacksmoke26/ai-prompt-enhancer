# Controllers Module

The controllers module handles all API route definitions and request processing. It defines the entry points for the application's functionality and maps them to appropriate action handlers.

## Architecture

The controllers follow a modular pattern where each controller file handles a specific section of the API:

- `main.controller.ts` - Main application endpoints (health, test)
- `config.controller.ts` - Configuration management endpoints
- `prompt.controller.ts` - Prompt enhancement endpoints
- `history.controller.ts` - History management endpoints
- `user-role.controller.ts` - User role management endpoints
- `enhancement-type.controller.ts` - Enhancement type management endpoints

## Controller Structure

Each controller file follows the same pattern:
1. Import required action handlers
2. Register routes with appropriate HTTP methods
3. Apply route prefixes for organization
4. Define route validation schemas when needed

## Main Controller (`main.controller.ts`)

Handles core application endpoints:
- `GET /api/health` - Health check endpoint
- `GET /api/test` - Test provider availability
- `GET /api/docs` - API documentation with Swagger

## Configuration Controller (`config.controller.ts`)

Manages provider configuration:
- `GET /api/config/providers` - Get all providers
- `GET /api/config/providers/:name/test` - Test specific provider
- `PUT /api/config/providers/:name` - Update provider configuration

## Prompt Controller (`prompt.controller.ts`)

Handles prompt enhancement functionality:
- `POST /api/prompts/enhance` - Enhance a prompt using configured provider
- `GET /api/prompts/models` - Get available models from all providers
- `GET /api/prompts/providers` - Get all configured providers
- `GET /api/prompts/:provider/test` - Test specific provider

## History Controller (`history.controller.ts`)

Manages history records:
- `GET /api/history` - Get all history records
- `GET /api/history/:id` - Get specific history record
- `DELETE /api/history/:id` - Delete specific history record
- `DELETE /api/history` - Delete all history records

## User Role Controller (`user-role.controller.ts`)

Manages user roles:
- `GET /api/user-roles` - Get all user roles

## Enhancement Type Controller (`enhancement-type.controller.ts`)

Manages enhancement types:
- `GET /api/enhancement-types` - Get all enhancement types

## Route Validation

All controllers use JSON schema validation through the Ajv validator. Validation schemas are defined in the `src/schemas/` directory and applied to request bodies and parameters to ensure data integrity.

## Error Handling

Controllers inherit error handling from the Fastify framework:
- Validation errors return 422 status codes
- Internal server errors return 500 status codes
- Provider-specific errors are handled and logged appropriately
- All errors are properly formatted for API responses

## Middleware Integration

Controllers can apply middleware for:
- Authentication
- Rate limiting
- Request logging
- CORS handling

## Usage

Controllers are automatically registered during application bootstrapping in `src/fastify/bootstrapper.ts` and map to the routes defined in `src/fastify/controllers/index.ts`.