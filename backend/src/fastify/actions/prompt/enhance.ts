/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import ProviderService from '~/services/ProviderService';

// schemas
import schema from './schemas/enhance.schema';

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// db
import {History, Provider} from '~/database/models';

// utils
import {toProviderName} from '~/utils/provider';

// types
import type {FastifyInstance} from 'fastify';
import type {SuccessResponse} from '~/types/response';
import type {PromptRequest, PromptResponse} from '~/types/prompt';

/**
 * Enhances a prompt using the specified AI provider
 * @param providerManager - Instance of AIProviderManager
 * @param promptRequest - Request containing prompt and enhancement details
 * @returns Enhanced prompt response
 */
const enhance = async (
  providerManager: ProviderService,
  promptRequest: PromptRequest,
): Promise<PromptResponse> => {
  try {
    // Extract provider name from model ID
    const provider = providerManager.getProvider(promptRequest.provider);

    const providerRecord = await Provider.findOne({
      where: {name: toProviderName(promptRequest.provider), enabled: true},
      attributes: ['id'],
      raw: true,
    });

    if (!provider || !providerRecord) {
      ErrorHelper.throwWithStatus(`Provider ${promptRequest.provider} not found`, 404);
    }

    // Check if provider is available
    if (!(await provider.isAvailable())) {
      ErrorHelper.throwWithStatus(`Provider ${promptRequest.provider} is not available`, 503);
    }

    // Enhance the prompt
    const response = await provider.generateSync(promptRequest);

    if (!(promptRequest?.offTheRecord ?? false)) {
      // Save to history
      await History.create({
        aiPrompt: response.aiPrompt,
        providerId: providerRecord.id,
        originalPrompt: response.originalPrompt,
        enhancedPrompt: response.enhancedPrompt,
        model: response.model,
        enhancementType: promptRequest.enhancementType || 'enhance',
        userRole: promptRequest.userRole || 'general',
        systemPrompt: promptRequest?.systemPrompt ?? '',
        tokensUsed: response?.tokensUsed ?? 0,
        processingTime: response.processingTime,
        temperature: promptRequest?.temperature ?? 0,
        maxTokens: promptRequest?.maxTokens ?? 0,
        rating: 0,
        notes: null,
        targetAudience: promptRequest.targetAudience ?? null,
        tone: promptRequest.tone ?? null,
        responseLength: promptRequest.responseLength ?? null,
        customInstructions: promptRequest.customInstructions ?? null,
        enhancementParameters: promptRequest.enhancementParameters ?? null,
        format: promptRequest.format ?? null,
        timestamp: promptRequest.timestamp ?? null,
        metadata: promptRequest.metadata ?? null,
        topP: promptRequest.topP ?? null,
        topK: promptRequest.topK ?? null,
        stopSequences: promptRequest.stopSequences ?? null,
        frequencyPenalty: promptRequest.frequencyPenalty ?? null,
        presencePenalty: promptRequest.presencePenalty ?? null,
        conversationId: promptRequest.conversationId ?? null,
      });
    }

    return response;
  } catch (error: any) {
    ErrorHelper.throwWithStatus(`Prompt enhancement failed: ${error.message}`, error?.statusCode || 500);
  }
};

export default (fastify: FastifyInstance) => {
  /**
   * Enhances a prompt using the specified AI provider
   * @example
   * // POST /prompts/enhance
   * // Body: { model: "openai:gpt-4", prompt: "Hello world" }
   * @developer_notes Provider name is extracted from model ID format "provider:model"
   */
  fastify.post<{
    Body: PromptRequest;
    Reply: SuccessResponse<PromptResponse>
  }>('/enhance', {schema}, async function (this, request) {
    const response = await enhance(this.providerService, request.body);
    return ResponseHelper.successWithData(response);
  });
}
