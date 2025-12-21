/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */
// classes
import PaginatedList from '~/classes/PaginatedList';

// types
import type {
  PaginatedSuccessResponse,
  SuccessOnlyResponse,
  SuccessResponse,
  SuccessWithMessageResponse,
} from '~/types/response';

/**
 * Utility class for formatting standardized success responses in API interactions.
 * Provides methods to return success responses with or without data, messages, or pagination.
 */
export default abstract class ResponseHelper {
  /**
   * Returns a basic success response with only the `success` flag set to `true`.
   * @returns A simple success response object.
   * @example ResponseHelper.successOnly() // { "success": true }
   * @developerNotes Use this method for endpoints that do not need to return any data or message.
   */
  public static successOnly(): SuccessOnlyResponse {
    return { success: true };
  }

  /**
   * Returns a success response with associated data.
   * @param data - The data to return with the response (can be `null`).
   * @returns A success response object containing the provided data.
   * @example ResponseHelper.successWithData({ id: 1, name: 'John' }) // { "success": true, "data": { "id": 1, "name": "John" } }
   * @developerNotes Use `null` for data if no payload is needed, but be cautious of type casting.
   */
  public static successWithData<T>(data: T | null): SuccessResponse<T> {
    return { success: true, data: (data ?? 'Nothing to be returned') as T };
  }

  /**
   * Returns a success response with an associated message.
   * @param message - The message to include in the response.
   * @returns A success response object containing the message.
   * @example ResponseHelper.successWithMessage('Operation completed successfully') // { "success": true, "message": "Operation completed successfully" }
   * @developerNotes Use this method to provide user-friendly feedback or confirmations.
   */
  public static successWithMessage(message: string): SuccessWithMessageResponse {
    return { success: true, message };
  }

  /**
   * Returns a success response containing paginated data.
   * @param instance - A `PaginatedList` instance containing the paginated data.
   * @returns A paginated success response object with metadata and items.
   * @example
   * const paginatedData = new PaginatedList(users, 100, 2, 10);
   * ResponseHelper.successWithPaginated(paginatedData);
   * // { "success": true, "totalCount": 100, "pageInfo": { "currentPage": 2, "totalPages": 10, "hasNextPage": true, "hasPreviousPage": true }, "rows": [...] }
   * @developerNotes Ensure `instance` is derived from a valid `PaginatedList` object.
   */
  public static successWithPaginated<T>(instance: PaginatedList<T>): PaginatedSuccessResponse<T> {
    const paged = instance.toPaginatedResult();

    return {
      success: true,
      totalCount: paged.totalCount,
      pageInfo: {
        currentPage: paged.currentPage,
        totalPages: paged.totalPages,
        hasNextPage: paged.hasNextPage,
        hasPreviousPage: paged.hasPreviousPage,
      },
      rows: paged.rows,
    };
  }
}
