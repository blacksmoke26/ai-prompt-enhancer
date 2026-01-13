/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { Op } from 'sequelize';

// db
import { EnhancementType, PromptUserRole, ResponseLength, Tone, } from '~/database/models';

// types
import type { PromptRequest } from '~/types/prompt';
import type { PromptParams } from '~/classes/composer/PromptParams';

/**
 * Class for normalizing prompt requests into standardized `PromptParams`
 * by enriching them with database values.
 *
 * This class is designed to be extended, but its methods are static and cannot be overridden.
 */
export default abstract class PromptRequestNormalizer {
  /**
   * Normalizes a `PromptRequest` into a structured `PromptParams` object, enriching it with database values.
   * @param request - The raw prompt request containing optional metadata.
   * @returns A normalized prompt parameter object.
   * @example
   * const request: PromptRequest = {
   *   text: 'Write a detailed explanation of quantum computing.',
   *   enhancementType: '123',
   *   userRole: '456',
   * };
   *
   * const params = await PromptRequestNormalizer.normalize(request);
   * console.log(params); // { text: '...', enhancementType: 'Correct Grammar & Spelling', ... }
   * @developerNotes
   * - This is a static method and cannot be overridden by subclasses.
   * - It merges the raw request into the `PromptParams` and enriches it with values from the database.
   * - Requires access to database models like `EnhancementType`, `PromptUserRole`, etc.
   */
  public static async normalize(request: PromptRequest): Promise<PromptParams> {
    const param: PromptParams = {
      systemPrompt: 'You are a helpful AI assistant specialised in enhancing and improving prompts.',
      format: request.format ?? 'markdown',
      ...request,
      text: request.text,
    };

    await this.loadDbValues(request, param);

    return param;
  }

  /**
   * Loads database values into the `PromptParams` object based on properties from the `PromptRequest`.
   * @param request - The raw prompt request.
   * @param param - The `PromptParams` object to be enriched.
   * @developerNotes
   * - This is a private static method and is used internally by `normalize()`.
   * - Performs asynchronous database queries using ORM (e.g., Sequelize) to fetch names or metadata.
   * - Ensure that database models like `EnhancementType`, `PromptUserRole`, etc., are properly configured.
   */
  private static async loadDbValues(
    request: PromptRequest,
    param: PromptParams,
  ) {
    if (request.enhancementType) {
      const record = await EnhancementType.findOne({
        attributes: ['name'],
        where: {
          [Op.or]: {
            key: request.enhancementType,
            id: request.enhancementType,
          },
        },
        raw: true,
      });

      param.enhancementType = record?.name ?? 'Correct Grammar & Spelling';
    }

    if (request.userRole) {
      const record = await PromptUserRole.findOne({
        attributes: ['name', 'systemPrompt'],
        where: {
          [Op.or]: {
            id: request.userRole,
            key: request.userRole,
          },
        },
        raw: true,
      });

      param.userRole = record?.name ?? 'General User';
      param.systemPrompt =
        record?.systemPrompt ??
        'You are a high-intelligence generalist assistant. Your primary directive is to maximize the informational density and clarity of the user\'s output.';
    }

    if (request?.responseLength) {
      const record = await ResponseLength.findOne({
        attributes: ['name'],
        where: {
          [Op.or]: {
            id: request.responseLength,
            key: request.responseLength,
          },
        },
        raw: true,
      });

      param.responseLength = record?.name ?? 'To-the-point';
    }

    if (request?.tone) {
      const record = await Tone.findOne({
        attributes: ['name'],
        where: {
          [Op.or]: {
            id: request.tone,
            key: request.tone,
          },
        },
        raw: true,
      });

      param.tone = record?.name ?? 'Professional';
    }
  }
}
