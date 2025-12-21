/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * Base interface for all success response objects.
 * Provides a common structure for success-related responses.
 */
export interface ISuccessResponse {
}

/**
 * Response interface indicating success with a boolean flag.
 * @example { "success": true }
 */
export interface SuccessOnlyResponse extends ISuccessResponse {
  /** The operation was successful */
  success: boolean;
}

/**
 * Generic success response containing data.
 * @example { "success": true, "data": { "id": 1, "name": "Test" } }
 * @developerNotes Use `success?: boolean` to allow optional success flag when inferred from context.
 */
export interface SuccessResponse<T = unknown> extends ISuccessResponse {
  /** The operation was successful */
  success?: boolean;
  /** The processed data */
  data: T;
}

/**
 * A generic type that combines the `SuccessOnlyResponse` interface with additional custom properties from type `T`.
 * This is useful for responses that include both standard success metadata and custom data.
 *
 * @example
 * ```ts
 * type UserResponse = SuccessCustomResponse<{ data: User }>;
 * // Equivalent to: { statusCode: number; message: string; data: User }
 * ```
 *
 * @developerNotes:
 * - `T` should be an object type with additional properties to be merged into the success response.
 * - `SuccessOnlyResponse` is expected to contain standard success metadata like `statusCode` and `message`.
 * - This type is commonly used in API response structures to include both success status and custom payload data.
 */
export type SuccessWithCustomResponse<T> = SuccessOnlyResponse & T;

/**
 * Success response containing a message instead of data.
 * @example { "success": true, "message": "Operation completed successfully" }
 */
export interface SuccessWithMessageResponse extends ISuccessResponse {
  /** The operation was successful */
  success?: boolean;
  /** The processed data */
  message: string;
}

/**
 * Type definition for sorting order in pagination.
 * Supported values: 'asc' (ascending), 'desc' (descending).
 */
export type PaginationOrder = 'asc' | 'desc';

/**
 * Interface for pagination parameters.
 * @developerNotes The `@ts-ignore` is used to bypass type-checking for extending generic types.
 * @example { "page": 1, "pageSize": 10, "sortBy": "name", "order": "asc" }
 */
// @ts-ignore
export interface PaginationParams<T = unknown> extends T {
  readonly page?: number;
  readonly pageSize?: number;
  readonly sortBy?: string;
  readonly order?: PaginationOrder;
}

/**
 * Interface for paginated results with metadata.
 * @example {
 *   "currentPage": 1,
 *   "totalCount": 100,
 *   "totalPages": 10,
 *   "hasPreviousPage": false,
 *   "hasNextPage": true,
 *   "rows": [{ "id": 1, "name": "Item 1" }]
 * }
 */
export interface PaginatedResult<T = unknown> {
  /** The current page */
  currentPage: number;
  /** Count of total records */
  totalCount: number;
  /** Count of total pages */
  totalPages: number;
  /** Whether there is a page before the current page */
  hasPreviousPage: boolean;
  /** Whether there is a page after the current page */
  hasNextPage: boolean;
  /** List of entities */
  rows: T[];
}

/**
 * Interface containing pagination metadata.
 * @example { "currentPage": 1, "totalPages": 10, "hasPreviousPage": false, "hasNextPage": true }
 */
export interface PageInfo {
  /** The current page */
  currentPage: number;
  /** Count of total pages */
  totalPages: number;
  /** Whether there is a page before the current page */
  hasPreviousPage: boolean;
  /** Whether there is a page after the current page */
  hasNextPage: boolean;
}

/**
 * Success response containing paginated data with metadata.
 * @example {
 *   "success": true,
 *   "totalCount": 100,
 *   "rows": [{ "id": 1, "name": "Item 1" }],
 *   "pageInfo": { "currentPage": 1, "totalPages": 10 }
 * }
 */
export interface PaginatedSuccessResponse<T> extends ISuccessResponse {
  /** The operation was successful */
  success: boolean;
  /** The total count of records */
  totalCount: number;
  /** The records */
  rows: T[];
  /** The pagination information */
  pageInfo: PageInfo;
}
