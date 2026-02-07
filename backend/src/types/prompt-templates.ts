/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// types
import type { TemplateVariable } from '~/database/models/PromptTemplate';
import { PaginationParams } from '~/types/response';

/**
 * Request body for creating a new prompt template.
 */
export interface PromptTemplateCreateRequest {
  /** The category of the prompt */
  categoryId: number;
  /** The title of the prompt */
  title: string;
  /** The description of the prompt */
  description: string;
  /** The tags associated with the prompt */
  tags?: string[];
  /** The tools associated with the prompt */
  tools?: string[];
  /** The content of the prompt */
  content: string;
  /** The variables used in the prompt */
  variables?: TemplateVariable[];
}

/**
 * Request body for updating a prompt template.
 */
export interface PromptTemplateUpdateRequest {
  /** The category of the prompt */
  categoryId?: number;
  /** The title of the prompt */
  title?: string;
  /** The description of the prompt */
  description?: string;
  /** The tags associated with the prompt */
  tags?: string[];
  /** The tools associated with the prompt */
  tools?: string[];
  /** The content of the prompt */
  content?: string;
  /** The variables used in the prompt */
  variables?: TemplateVariable[];
}

/**
 * Response data for a prompt template.
 */
export interface PromptTemplateResponse {
  /** Unique identifier */
  id: number;
  /** The category of the prompt */
  categoryId: number;
  /** The title of the prompt */
  title: string;
  /** The description of the prompt */
  description: string;
  /** The tags associated with the prompt */
  tags: string[];
  /** The tools associated with the prompt */
  tools: string[];
  /** The content of the prompt */
  content: string;
  /** The variables used in the prompt */
  variables: TemplateVariable[];
}

/**
 * Request parameters for listing prompt templates with pagination and advanced search.
 */
export interface PromptTemplateListRequest extends PaginationParams {
  /** Search query for title, description, or content */
  search?: string;
  /** Filter by category ID */
  categoryId?: number;
  /** Filter by tag */
  tag?: string;
}

/**
 * Response data for a single prompt template.
 */
export type PromptTemplateSingleResponse = PromptTemplateResponse;

/**
 * Response data for listing prompt templates with pagination metadata.
 */
export type PromptTemplateListResponse = PromptTemplateResponse[];

/**
 * Filter options for advanced searching.
 */
export interface PromptTemplateFilterOptions {
  /** Search query for title, description, or content */
  search?: string;
  /** Filter by category ID */
  categoryId?: number;
  /** Filter by tag */
  tag?: string;
}
