import { FastifyRequest, FastifyReply } from 'fastify';
import { promptRequestSchema } from '../utils/validation';

export const validatePromptRequest = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { error, value } = promptRequestSchema.validate(request.body);
    if (error) {
      reply.code(400).send({
        error: 'Validation failed',
        details: error.details.map(detail => detail.message),
      });
      return false;
    }
    request.body = value;
    return true;
  } catch (err) {
    reply.code(500).send({ error: 'Validation error' });
    return false;
  }
};