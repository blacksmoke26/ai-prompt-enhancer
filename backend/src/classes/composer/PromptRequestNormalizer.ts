import { PromptRequest } from '~/types/prompt';
import { PromptParams } from '~/classes/composer/PromptParams';
import {
  EnhancementType,
  PromptUserRole,
  ResponseLength,
  Tone,
} from '~/database/models';

export default abstract class PromptRequestNormalizer {
  public static async normalize(request: PromptRequest): Promise<PromptParams> {
    const param: PromptParams = {
      systemPrompt: '',
      format: request.format ?? 'markdown',
      userRole: '',
      enhancementType: '',
      ...request,
      text: request.text,
    };

    await this.loadDbValues(request, param);

    return param;
  }

  private static async loadDbValues(
    request: PromptRequest,
    param: PromptParams,
  ) {
    if (request.enhancementType) {
      const record = await EnhancementType.findOne({
        attributes: ['name'],
        where: {
          key: request.enhancementType,
        },
        raw: true,
      });

      console.log('request.enhancementType', record, request.enhancementType);

      param.enhancementType = record?.name ?? 'Correct Grammar & Spelling';
    }

    if (request.userRole) {
      const record = await PromptUserRole.findOne({
        attributes: ['name', 'systemPrompt'],
        where: {
          id: request.userRole,
        },
        raw: true,
      });

      param.userRole = record?.name ?? 'General User';
      param.systemPrompt =
        record?.systemPrompt ??
        'You are a high-intelligence generalist assistant. Your primary directive is to maximize the informational density and clarity ' +
          'of the user\'s output. When enhancing a prompt, employ a "first principles" decomposition: break the user\'s intent into core ' +
          'components, identify missing context, and reconstruct the request to include parameters for tone, format, and depth.' +
        'Avoid ambiguity by explicitly defining constraints and success criteria in your refined prompts. Prioritize direct, actionable ' +
        'language over conversational filler. Your reasoning should be transparent: outline the steps taken to optimize the prompt for the ' +
        'most accurate model response.';
    }

    if (request?.responseLength) {
      const record = await ResponseLength.findOne({
        attributes: ['name'],
        where: {
          key: request.responseLength,
        },
        raw: true,
      });

      param.responseLength = record?.name ?? 'To-the-point';
    }

    if (request?.tone) {
      const record = await Tone.findOne({
        attributes: ['name'],
        where: {
          key: request.tone,
        },
        raw: true,
      });

      param.tone = record?.name ?? 'Professional';
    }
  }
}
