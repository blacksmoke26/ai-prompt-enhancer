/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import BaseAIProvider, { ProviderDefaultPrompt } from '~/base/BaseAIProvider';

// classes
import StreamEnded from '~/classes/StreamEnded';
import AIRequestHandler, { ProviderStrategy } from '~/classes/AIRequestHandler';

// db
import { ConfigMeta, History, HistoryAttributes } from '~/database/models';

// types
import type { AIModel } from '~/types';
import type { ProviderConfig } from '~/types/providers';
import type {
  PromptRequest,
  PromptResponse,
  StreamResponse,
} from '~/types/prompt';

/**
 * Amazon Bedrock provider for prompt enhancement.
 *
 * Uses the Bedrock "Converse" API structure.
 *
 * @developerNote
 * Amazon Bedrock requires AWS Signature V4 authentication. This implementation assumes
 * the `baseUrl` and `apiKey` point to a proxy or gateway (e.g., Vercel AI Gateway, LocalStack)
 * that handles the SigV4 signing. It does not implement raw AWS credentials signing here.
 */
export default class BedrockProvider extends BaseAIProvider {
  /**
   * @inheritDoc
   */
  public static readonly ProviderID: string = 'bedrock';

  /**
   * @inheritDoc
   */
  public static readonly ProviderKey: string = 'Bedrock';

  /**
   * @inheritDoc
   */
  public static readonly ProviderName: string = 'Amazon Bedrock';

  /**
   * @inheritDoc
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system:
      'You are an AI assistant available via Amazon Bedrock. Enhance prompts to be robust, clear, and suitable for enterprise-scale applications.',
    role: 'You are a prompt engineer for AWS services. Optimize prompts for clarity, security, and scalability.',
  };

  /**
   * @inheritDoc
   */
  public static readonly ProviderConfig: ProviderConfig = {
    caption: BedrockProvider.ProviderName,
    name: BedrockProvider.ProviderID,
    baseUrl: 'https://bedrock-runtime.us-east-1.amazonaws.com', // Example, usually proxied
    apiKey: '',
    timeout: 30000,
  };

  /**
   * @inheritDoc
   */
  constructor(config: ConfigMeta) {
    super(BedrockProvider.ProviderKey, {
      baseUrl: config?.baseUrl || BedrockProvider.ProviderConfig.baseUrl,
    });
    // Assuming proxy auth, otherwise AWS SDK is required for native auth
    if (config?.apiKey) {
      this.client.defaults.headers.common['Authorization'] =
        `Bearer ${config?.apiKey}`;
    }
  }

  /**
   * @inheritDoc
   */
  async getModels(): Promise<AIModel[]> {
    // Returning a curated list of popular Bedrock model IDs.
    // A full implementation would call the ListFoundationModels API.
    return [
      {
        id: 'anthropic.claude-3-5-sonnet-20240620-v1:0',
        name: 'Claude 3.5 Sonnet (Bedrock)',
        provider: BedrockProvider.ProviderID,
        description: 'Anthropic Claude 3.5 Sonnet on AWS',
        contextLength: 200000,
        maxTokens: 4096,
      },
      {
        id: 'anthropic.claude-3-haiku-20240307-v1:0',
        name: 'Claude 3 Haiku (Bedrock)',
        provider: BedrockProvider.ProviderID,
        description: 'Anthropic Claude 3 Haiku on AWS',
        contextLength: 200000,
        maxTokens: 4096,
      },
      {
        id: 'meta.llama3-8b-instruct-v1:0',
        name: 'Llama 3 8B (Bedrock)',
        provider: BedrockProvider.ProviderID,
        description: 'Meta Llama 3 8B on AWS',
        contextLength: 8192,
        maxTokens: 2048,
      },
      {
        id: 'amazon.titan-text-express-v1',
        name: 'Titan Text Express',
        provider: BedrockProvider.ProviderID,
        description: 'Amazon Titan Text Express',
        contextLength: 8000,
        maxTokens: 4096,
      },
    ];
  }

  /**
   * @inheritDoc
   */
  public async generate(
    request: PromptRequest,
    options?: { stream?: boolean; history?: History | HistoryAttributes },
  ): Promise<PromptResponse | AsyncGenerator<StreamResponse | StreamEnded>> {
    const strategy: ProviderStrategy = {
      // Bedrock Converse API endpoint
      endpoint: '/model/converse',

      buildPayload: (aiPrompt, sysPrompt, req, hist) => {
        const modelId = hist?.model ?? req?.model ?? 'anthropic.claude-3-haiku-20240307-v1:0';
        return {
          modelId,
          messages: [
            { role: 'user', content: [{ text: aiPrompt }] },
          ],
          system: [{ text: sysPrompt }],
          inferenceConfig: {
            maxTokens: req?.maxTokens ?? 2000,
            temperature: req?.temperature ?? 0.7,
          },
        };
      },

      parseSyncResponse: async (data, originalText, provider, format) => {
        // Bedrock Converse Response: output.message.content[0].text
        const content = data.output?.message?.content?.[0]?.text || '';
        return {
          aiPrompt: originalText,
          enhancedPrompt: await provider.toPromptResponse(
            content,
            originalText,
            BedrockProvider,
            format,
          ),
          originalPrompt: originalText,
          model: request.model, // Note: Bedrock response doesn't always echo model ID in body
          timestamp: new Date(),
          tokensUsed: data.usage?.totalTokens || 0,
          processingTime: 0,
        };
      },

      stream: {
        // Bedrock Converse Stream Event: contentBlockDelta
        hasText: (chunk) => chunk.type === 'content_block_delta' && !!chunk.delta?.text,
        getText: (chunk) => chunk.delta.text,
        isEnd: (chunk) => chunk.type === 'message_stop',
        getUsage: (chunk) => chunk.usage?.totalTokens || 0,
      },
    };

    return AIRequestHandler.generate({
      client: this.client,
      request,
      history: options?.history,
      stream: options?.stream ?? false,
      strategy,
      providerInstance: this,
    });
  }

  /**
   * @inheritDoc
   */
  public async generateSync(request: PromptRequest): Promise<PromptResponse> {
    return (await this.generate(request, { stream: false })) as PromptResponse;
  }

  /**
   * @inheritDoc
   */
  public async *generateStream(
    request: PromptRequest,
    history?: History | HistoryAttributes,
  ): AsyncGenerator<StreamResponse | StreamEnded, void, unknown> {
    if (!request && !history) throw new Error('Request or history required');
    const gen = await this.generate(
      request,
      { stream: true, history },
    );
    yield* gen as AsyncGenerator<StreamResponse | StreamEnded>;
  }

  /**
   * @inheritDoc
   */
  async isAvailable(): Promise<boolean> {
    try {
      // Using a minimal Converse request
      const response = await this.client.post('/model/converse', {
        modelId: 'anthropic.claude-3-haiku-20240307-v1:0',
        messages: [{ role: 'user', content: [{ text: 'Hi' }] }],
        inferenceConfig: { maxTokens: 1 },
      });
      return !!response.data.output;
    } catch {
      return false;
    }
  }
}
