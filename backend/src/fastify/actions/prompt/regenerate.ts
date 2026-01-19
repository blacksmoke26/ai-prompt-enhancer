/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import StreamEnded from '~/classes/StreamEnded';

// db
import { History, HistoryResponse, Provider, } from '~/database/models';

// schemas
import schema from './schemas/regenerate.schema';

// helpers
import ErrorHelper, { ErrorCodes } from '~/helpers/ErrorHelper';

// types
import type { FastifyInstance } from 'fastify';
import type { StreamError } from '~/types/prompt';

export default (fastify: FastifyInstance) => {
  fastify.post<{
    Params: { conversationId: string };
  }>(
    '/regenerate/:conversationId',
    { schema },
    async function (this, request, reply) {
      const history = (await History.findByPk(request.params.conversationId, {
        include: [
          {
            model: Provider,
            as: 'provider',
          },
        ],
        raw: true,
        nest: true,
      })) as (History & { provider: Provider }) | null;

      if (!history) {
        ErrorHelper.throwWithCode(
          'Conversation not found',
          ErrorCodes.NotFound,
        );
        return;
      }

      const provider = this.providerService.getProvider(history.provider.name);

      // Check if provider is available
      if (!provider || !(await provider.isAvailable())) {
        ErrorHelper.throwWithStatus(
          `Provider may not available or not found`,
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
        let streamResponse: StreamEnded | undefined;

        // Stream the response
        try {
          for await (const chunk of provider.generateStream(
            undefined,
            history,
          )) {
            if (chunk instanceof StreamEnded) {
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

        await HistoryResponse.create({
          historyId: history.id,
          response: history.enhancedPrompt,
        });

        await History.update(
          { enhancedPrompt: fullStreamData.join('') },
          {
            where: { id: history.id },
            limit: 1,
          },
        );

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
    },
  );
};
