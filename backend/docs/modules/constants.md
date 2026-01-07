# Constants Module

The constants module contains predefined values and configuration constants used throughout the Synapse backend.

## Architecture

The constants module follows a modular pattern where each file defines constants for a specific purpose:

- `providers.ts` - AI provider configurations and mappings
- `enhancement-types.ts` - Prompt enhancement type definitions
- `prompt-user-roles.ts` - User role definitions and permissions
- `configuration.ts` - Application configuration constants

## Provider Constants (`providers.ts`)

Defines the supported AI providers and their default configurations:

### Supported Providers
- **Ollama** - Local LLM models
- **OpenAI** - GPT models
- **OpenRouter** - Open source model router
- **Deepseek** - Deepseek AI models
- **Coze** - Coze AI platform
- **Qianfan** (Baidu) - Baidu's Qianfan models
- **Gemini** (Google) - Google's generative models
- **Kimi** (Moonshot) - Moonshot AI models
- **Groq** - High-performance LLM inference
- **Anthropic** - Claude models
- **Mistral** - Mistral AI models
- **Nvidia** - NVIDIA AI models
- **Cohere** - Cohere AI platform
- **Cody** (Sourcegraph) - Sourcegraph's AI assistant
- **XAI** - xAI models
- **HuggingFace** - Hugging Face models
- **SiliconFlow** - SiliconFlow AI platform
- **Zhipu** - Zhipu AI models
- **Qwen** (Aliyun) - Alibaba's Qwen models
- **LM Studio** - Local model inference

### Provider Configuration Structure
Each provider includes:
- Default base URLs
- API key requirements
- Timeout settings
- Enabled status
- Display captions

## Enhancement Types (`enhancement-types.ts`)

Defines the types of prompt enhancements that can be applied:

- **clarify** - Clarify and simplify the prompt
- **expand** - Expand on the prompt with more detail
- **simplify** - Simplify the prompt for easier understanding
- **optimize** - Optimize for specific use cases
- **translate** - Translate the prompt to different languages
- **format** - Format the prompt in specific ways
- **refine** - Refine and improve the prompt structure
- **generate** - Generate new content based on the prompt
- **summarize** - Summarize the prompt content
- **rephrase** - Rephrase the prompt in different ways

## User Roles (`prompt-user-roles.ts`)

Defines user roles and their permissions:

- **admin** - Full access to all features and configurations
- **user** - Standard access to prompt enhancement features
- **guest** - Limited access for testing and demonstration

## Configuration Constants (`configuration.ts`)

Application-wide configuration defaults and settings:

### Default Settings
- Default database storage path: `database/database.sqlite`
- Default server host: `0.0.0.0`
- Default server port: `3000`
- Default logging level: `info`
- Default rate limit: `100 requests per minute`
- Default CORS origins: `*` (all origins)
- Default timeout settings for API calls

## Usage

Constants are imported and used throughout the application:

```typescript
import { providers } from '~/constants/providers';
import { enhancementTypes } from '~/constants/enhancement-types';
import { userRoles } from '~/constants/user-roles';
```

## Development Guidelines

When adding new constants:
1. **Group Related Constants**: Keep related constants together in the same file
2. **Use Descriptive Names**: Choose clear, descriptive names for constants
3. **Document Purpose**: Add comments explaining the purpose of each constant
4. **Maintain Consistency**: Follow existing naming conventions and patterns
5. **Update Documentation**: Keep this documentation in sync with code changes
6. **Avoid Hardcoded Values**: Use constants instead of hardcoded values throughout the application

## Best Practices

- **Immutability**: Constants should be treated as immutable values
- **Centralized Management**: Keep all application constants in one location
- **Type Safety**: Use TypeScript types to ensure constant values are correct
- **Environment-Specific**: Consider different values for different environments
- **Performance**: Constants are loaded once during startup, so they should be lightweight
