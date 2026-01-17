/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import StreamEnded from '~/classes/StreamEnded';

// db
import {
  EnhancementType,
  History,
  PromptUserRole,
  Provider,
} from '~/database/models';

// schemas
import schema from './schemas/stream.schema';

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';

// types
import type { FastifyInstance } from 'fastify';
import type { PromptRequest, StreamError } from '~/types/prompt';

export default (fastify: FastifyInstance) => {
  fastify.post<{
    Body: PromptRequest;
  }>('/stream', { schema }, async function (this, request, reply) {
    const promptRequest = request.body;

    const provider = this.providerService.getProvider(promptRequest.provider);

    if (!provider) {
      ErrorHelper.throwWithStatus(
        `Provider ${request.body.provider} not found`,
        404,
      );
    }

    // Check if provider is available
    if (!(await provider.isAvailable())) {
      ErrorHelper.throwWithStatus(
        `Provider ${request.body.provider} is not available`,
        503,
      );
    }

    try {
      // Set headers for Server-Sent Events
      reply.raw.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control',
      });

      // Variable to store the complete message from the stream for future use
      const fullStreamData: any[] = [];
      let streamResponse: StreamEnded | undefined = undefined;

      // Stream the response
      try {
        for await (const chunk of provider.generateStream(request.body)) {
          if ( chunk instanceof StreamEnded ) {
            streamResponse = chunk;
            break;
          }

          const data = `data: ${JSON.stringify(chunk)}\n\n`;
          reply.raw.write(data);

          // Store each chunk in the array to accumulate the full message
          fullStreamData.push(chunk?.message?.content);

          // Flush the response to send data immediately
          if (typeof (reply.raw as any).flush === 'function') {
            (reply.raw as any).flush();
          }
        }
      } catch (streamError) {
        console.error('Streaming error:', streamError);
        const errorData = `data: ${JSON.stringify({
          error: 'Streaming failed',
          details:
            streamError instanceof Error
              ? streamError.message
              : 'Unknown streaming error',
        } as StreamError)}\n\n`;
        reply.raw.write(errorData);
      }

      // Send final event to indicate stream completion
      reply.raw.write('data: [DONE]\n\n');
      const fullStreamString = fullStreamData.join('');

      if (!(promptRequest?.offTheRecord ?? false)) {
        const providerRecord = await Provider.findOne({
          where: {
            name: promptRequest.provider,
          },
        });

        // Save to history
        await History.create({
          aiPrompt: streamResponse?.data?.aiPrompt,
          providerId: providerRecord?.id ?? 1,
          originalPrompt: promptRequest.text,
          enhancedPrompt: fullStreamString,
          model: promptRequest.model,
          enhancementType: EnhancementType.getIdByKey(
            promptRequest.enhancementType,
          ),
          userRole: PromptUserRole.getIdByKey(
            promptRequest.userRole || 'general',
          ),
          systemPrompt: promptRequest?.systemPrompt ?? '',
          tokensUsed: streamResponse?.data?.tokensUsed ?? 0,
          processingTime: streamResponse?.data?.processingTime ?? 0,
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

      reply.raw.end();
    } catch (error) {
      console.error('Chat endpoint error:', error);
      if (!reply.raw.headersSent) {
        ErrorHelper.throwWithStatus(
          error instanceof Error ? error.message : 'Unknown error',
          400,
        );
      } else {
        ErrorHelper.throwWithStatus(
          error instanceof Error ? error.message : 'Unknown error',
          400,
        );
      }
    }
  });
};
