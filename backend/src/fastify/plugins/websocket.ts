/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import websocket from '@fastify/websocket';

// types
import type {FastifyInstance} from 'fastify';

export default async function (fastify: FastifyInstance) {
  await fastify.register(websocket);

  await fastify.register(async function (fastify) {
    fastify.get('/ws', {websocket: true}, (socket, _req) => {
      console.log('WebSocket client connected');

      socket.on('message', (message: string) => {
        try {
          const data = JSON.parse(message.toString());
          console.log('Received WebSocket message:', data);

          // Handle different message types
          switch (data.type) {
            case 'ping':
              socket.send(JSON.stringify({type: 'pong'}));
              break;
            case 'subscribe':
              // Handle subscription to updates
              socket.send(JSON.stringify({
                type: 'subscribed',
                channels: data.channels || [],
              }));
              break;
            default:
              socket.send(JSON.stringify({
                type: 'error',
                message: 'Unknown message type',
              }));
          }
        } catch (error: any) {
          console.error('WebSocket message error:', error);
          socket.send(JSON.stringify({
            type: 'error',
            message: 'Invalid message format',
          }));
        }
      });

      socket.on('close', () => {
        console.log('WebSocket client disconnected');
      });

      // Send initial connection message
      socket.send(JSON.stringify({
        type: 'connected',
        timestamp: new Date().toISOString(),
      }));
    });
  });
}
