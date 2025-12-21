# Database Module Documentation

## Overview
The database module is responsible for managing the application's data persistence using Sequelize ORM with SQLite as the primary database. It provides a structured way to interact with the database through models and handles database initialization, connection management, and migrations.

## Architecture
The database module follows a standard Sequelize pattern with:
- Models: Represent database tables and their relationships
- Migrations: Handle database schema changes over time
- Seeders: Populate database with initial data
- Configuration: Database connection settings

## Models

### Provider Model
Stores configuration for different AI providers including their base URLs, API keys, and enabled status.

**Fields:**
- `id` (INTEGER, PRIMARY KEY): Unique identifier
- `caption` (STRING): Human-readable name of the provider
- `name` (STRING): Unique identifier for the provider
- `config` (JSON): Provider-specific configuration
- `enabled` (BOOLEAN): Whether the provider is active
- `createdAt` (DATE): Record creation timestamp
- `updatedAt` (DATE): Last modification timestamp

### History Model
Stores all prompt enhancement interactions with details about the enhancement process.

**Fields:**
- `id` (INTEGER, PRIMARY KEY): Unique identifier
- `providerId` (INTEGER): Foreign key to Provider table
- `originalPrompt` (TEXT): The original prompt sent to the provider
- `enhancedPrompt` (TEXT): The enhanced prompt received from the provider
- `model` (TEXT): The model used for the response
- `enhancementType` (TEXT): Type of enhancement applied
- `userRole` (TEXT): The role of the user
- `systemPrompt` (TEXT): The system prompt used
- `tokensUsed` (INTEGER): Number of tokens used for the response
- `processingTime` (INTEGER): Time taken to process the request (milliseconds)
- `temperature` (NUMBER): Temperature setting used for the response
- `maxTokens` (INTEGER): Maximum tokens allowed for the response
- `rating` (INTEGER): Rating given to the response (0-5)
- `notes` (TEXT): Additional notes about the response
- `meta` (JSON): Optional metadata for the history record
- `createdAt` (DATE): Record creation timestamp
- `updatedAt` (DATE): Last modification timestamp

### Setting Model
Stores application-wide configuration settings.

### UserRole Model
Stores different user roles with their permissions.

### EnhancementType Model
Stores different types of prompt enhancement that can be applied.

## Database Initialization

The database initialization process:
1. Creates a Sequelize instance with configuration from `database/config/config.js`
2. Establishes connection to the SQLite database
3. Synchronizes models with the database (in development mode)
4. Handles connection errors gracefully

## Migration and Seeding

### Migrations
Database schema changes are managed through migrations. Each migration file contains:
- `up` function: Applies the migration
- `down` function: Reverts the migration

### Seeders
Seeders populate the database with initial data:
- Provider configurations
- Default user roles
- Enhancement types

## Configuration

Database configuration is loaded from `database/config/config.js` and supports:
- SQLite dialect
- Storage path configuration via environment variable `SQLITE_STORAGE`
- Logging configuration

## Usage Examples

### Initialize Database
```typescript
import {initDB} from '~/database';

await initDB();
```

### Get Database Instance
```typescript
import {getInstance} from '~/database';

const db = getInstance();
```

### Model Operations
```typescript
import Provider from '~/database/models/Provider';

// Find all providers
const providers = await Provider.findAll();

// Create a new provider
const newProvider = await Provider.create({
  name: 'openai',
  caption: 'OpenAI',
  config: { baseUrl: 'https://api.openai.com/v1' },
  enabled: true
});
```

## Best Practices

1. **Always initialize the database** before performing operations
2. **Use transactions** for related operations
3. **Handle connection errors** gracefully
4. **Use model methods** instead of raw queries when possible
5. **Keep migrations** for schema changes
6. **Backup database** before major changes
7. **Use proper indexing** for frequently queried fields

## Performance Considerations

1. **Query Optimization**: Use `attributes` and `where` clauses to limit data
2. **Batch Operations**: Use bulk operations for multiple records
3. **Connection Pooling**: Configure connection pooling appropriately
4. **Indexing**: Add indexes to frequently queried fields
5. **Memory Management**: Be cautious with large result sets
6. **Caching**: Consider caching frequently accessed data

## Security Considerations

1. **SQL Injection Prevention**: Use Sequelize's parameterized queries
2. **Data Validation**: Validate data before storing
3. **Access Control**: Implement proper database user permissions
4. **Sensitive Data**: Don't store API keys in plain text in logs
5. **Backup Security**: Secure database backups

## Testing

The database module should be tested with:
1. Connection establishment
2. Model creation and retrieval
3. Migration operations
4. Error handling scenarios
5. Transaction integrity