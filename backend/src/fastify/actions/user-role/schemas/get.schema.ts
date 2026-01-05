/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema400WithError from '~/fastify/schemas/generic/400.schema';
import schema200WithData from '~/fastify/schemas/generic/200-success-with-data.schema';

// constants
import { getPromptUserRolesJsonSchema } from '~/constants/prompt-user-roles';

// types
import type {FastifySchema} from 'fastify';

export default {
  summary: 'List',
  description: 'Retrieves all available user roles for prompts',
  tags: ['User Roles'],
  security: [],
  response: {
    400: schema400WithError('Failed to fetch user roles'),
    200: schema200WithData(getPromptUserRolesJsonSchema()),
  },
} as FastifySchema;
