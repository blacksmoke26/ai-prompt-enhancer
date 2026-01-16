/**
 * @Author: Junaid Atari mj.atari@gmail.com
 * @Date: 2025-10-12 17:17:14
 */

import merge from 'deepmerge';

// utils
import { ORDER_BY, PAGE_MIN, PAGE_SIZE_GROUP, PAGE_SIZE_MIN } from '~/classes/PaginationQuery';

// types
import type { JSONSchema7 } from 'json-schema';

export default abstract class SchemaHelper {
  /**
   * Appends the pagination properties with the schema
   * @param properties - The schema properties
   * @returns The combined schema
   */
  public static withPagination(properties: JSONSchema7['properties'] = {}): JSONSchema7['properties'] {
    return merge(
      {
        page: {
          type: 'string',
          default: PAGE_MIN,
          description: 'A page number to start skipping from',
        },
        pageSize: {
          type: 'string',
          enum: PAGE_SIZE_GROUP.map(String),
          default: PAGE_SIZE_MIN,
          description: 'No. of records on each page',
        },
        sortBy: {
          type: 'string',
          enum: [],
          description: 'Sort records by key',
        },
        order: {
          type: 'string',
          enum: ORDER_BY,
          default: 'desc',
          description: 'Sort order type',
        },
      },
      properties,
    );
  }
}
