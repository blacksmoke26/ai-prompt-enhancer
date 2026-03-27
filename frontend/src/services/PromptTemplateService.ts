// noinspection ExceptionCaughtLocallyJS

/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import api from '~/utils/api';

// services
import ConfigService from '~/services/ConfigService';

// types
import type {PromptTemplateCategories, PromptTemplateResponse} from '~/types';

/**
 * Parameters for fetching and filtering prompt templates.
 */
export interface GetTemplatesParams {
  /**
   * The page number to retrieve.
   * @default 1
   */
  page?: number;

  /**
   * The number of items to return per page.
   * @default 10
   */
  pageSize?: 10 | 15 | 25 | 50;

  /**
   * The field to sort the results by.
   * @default 'id'
   */
  sortBy?: 'id' | 'title' | 'categoryId';

  /**
   * The sort order direction.
   * @default 'asc'
   */
  order?: 'asc' | 'desc';

  /**
   * A search string to filter templates by title or content.
   */
  search?: string;

  /**
   * Filter templates by category ID.
   */
  categoryId?: number;

  /**
   * Filter templates by tag.
   */
  tag?: string;
}

/**
 * Service for managing prompt templates and their categories.
 */
export default abstract class PromptTemplateService {
  /**
   * Fetches all available prompt categories.
   * @returns A promise that resolves to an array of prompt categories.
   * @throws Will display an error toast if the request fails.
   */
  public static async getCategories(): Promise<PromptTemplateCategories[]> {
    try {
      const {data} = await api.get<{ data: PromptTemplateCategories[] }>('/prompt-categories');
      if (!Array.isArray(data.data)) {
        throw new Error('Invalid response format for prompt categories');
      }
      return data.data;
    } catch (error) {
      ConfigService.handleApiError(error, 'Unable to fetch prompt categories. Please try again.');
    }
  }

  /**
   * Fetches a paginated list of prompt templates based on the provided query parameters.
   * @param params - The query parameters to filter and sort the templates.
   * @returns A promise that resolves to an array of prompt templates.
   * @throws Will display an error toast if the request fails.
   */
  public static async getTemplates(params?: GetTemplatesParams): Promise<PromptTemplateResponse[]> {

    try {
      const {data} = await api.get<{ rows: PromptTemplateResponse[] }>('/prompt-templates', {
        params: {pageSize: 50, ...params},
      });

      if (!Array.isArray(data.rows)) {
        throw new Error('Invalid format for prompt templates');
      }
      return data.rows;
    } catch (error) {
      console.log(error);
      ConfigService.handleApiError(error, 'Unable to fetch prompt templates. Please try again.');
    }
  }
}
