# Database Module

The database module is responsible for managing the application's data persistence using SQLite with Sequelize ORM. It provides a structured way to interact with the database and define the data models.

## Database Structure

The application uses SQLite with the following core tables:

### Providers
Stores configuration for different AI providers including their base URLs, API keys, and enabled status.

### History
Stores all prompt enhancement interactions with details such as:
- Original and enhanced prompts
- Provider used
- Model information
- Processing time and token usage
- Rating and notes

### Settings
Stores application-wide configuration settings.

### User Roles
Stores different user roles with their permissions.

### Enhancement Types
Stores different types of prompt enhancement that can be applied.

## Database Models

The database models are defined using Sequelize ORM and are located in `src/database/models/`:

- `Provider.ts` - Defines the Provider model
- `History.ts` - Defines the History model
- `Setting.ts` - Defines the Setting model
- `PromptUserRole.ts` - Defines the User Role model
- `EnhancementType.ts` - Defines the Enhancement Type model

## Database Initialization

The database is initialized in `src/database/index.ts` which:
1. Creates a Sequelize instance with the appropriate configuration
2. Establishes a connection to the SQLite database
3. Synchronizes the models with the database

## Migrations and Seeders

The application uses Sequelize CLI for database migrations and seeders:
- Migrations are located in `src/database/migrations/`
- Seeders are located in `src/database/seeders/`

Database operations can be performed using the following npm scripts:
- `npm run db:migrate` - Run all migrations
- `npm run db:rollback` - Undo the last migration
- `npm run db:seed` - Run all seeders
- `npm run db:seed:undo` - Undo all seeders
