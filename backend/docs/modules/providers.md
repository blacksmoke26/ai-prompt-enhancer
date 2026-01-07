# Providers Module

The providers module is responsible for implementing support for various AI/ML providers. It provides a unified interface for interacting with different AI services through provider-specific implementations.

## Architecture

The providers module follows a base class pattern where each provider extends the `BaseAIProvider` class. This ensures consistent interfaces across different providers while allowing provider-specific implementations.

## Supported Providers

The Synapse supports the following AI providers:

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
- **XAI** -xAI models
- **HuggingFace** - Hugging Face models
- **SiliconFlow** - SiliconFlow AI platform
- **Zhipu** - Zhipu AI models
- **Qwen** (Aliyun) - Alibaba's Qwen models
- **LM Studio** - Local model inference

## Provider Implementation

Each provider is implemented as a separate class in `src/providers/` directory:

- `OllamaProvider.ts`
- `OpenAIProvider.ts`
- `GeminiProvider.ts`
- `AnthropicProvider.ts`
- `MistralProvider.ts`
- And 10+ more provider-specific implementations

Each provider class:
1. Extends the `BaseAIProvider` abstract class
2. Implements the required methods for prompt enhancement
3. Handles provider-specific configuration and authentication
4. Manages API requests and responses
5. Processes provider-specific response formats

## Base Provider Interface

All providers must implement the following methods from `BaseAIProvider`:

- `testConnection()` - Tests the provider connection
- `enhancePrompt()` - Enhances a prompt using the provider
- `getModels()` - Retrieves available models from the provider
- `getProviderInfo()` - Returns provider information

## Configuration

Provider configuration is stored in the database in the `Providers` table and includes:
- Provider name and caption
- Base URL for the API
- API key or authentication credentials
- Enabled status
- Provider-specific settings

## Usage

Providers are automatically loaded and managed by the application. The system will:
1. Load all configured providers from the database
2. Make them available through the API
3. Handle authentication and request routing
4. Provide consistent response formats regardless of the provider used

## Provider-Specific Features

Each provider implementation may include:
- Custom headers or authentication methods
- Provider-specific rate limiting
- Model-specific parameters
- Response format handling
- Error message translation
