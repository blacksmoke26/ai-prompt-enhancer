/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

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
    const provider = this.providerService.getProvider(request.body.provider);

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
      // TODO: Utilize this array if you need to access or process the full stream data after streaming is complete
      const fullStreamData: any[] = [];

      // Stream the response
      try {
        for await (const chunk of provider.generateStream(request.body)) {
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
      console.log('Stream DONE:', fullStreamString);
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
