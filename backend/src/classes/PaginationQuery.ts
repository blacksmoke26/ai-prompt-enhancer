/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';

// types
import type { FastifyRequest } from 'fastify';
import type { PaginationOrder, PaginationParams } from '~/types/response';

/**
 * Represents the minimum valid page number in pagination queries.
 * Ensures that page numbers do not fall below this value during validation.
 * @example 1
 * @developerNotes Used in `PaginationQuery` to enforce valid page numbers.
 */
export const PAGE_MIN: number = 1;

/**
 * Represents the maximum valid page number in pagination queries.
 * Ensures that page numbers do not exceed this value during validation.
 * @example 10000
 * @developerNotes Used in `PaginationQuery` to enforce valid page numbers.
 */
export const PAGE_MAX: number = 10000;

/**
 * Represents the minimum allowed page size for paginated results.
 * Ensures that the number of items per page does not fall below this value.
 * @example 10
 * @developerNotes Used in `PaginationQuery` to enforce valid page sizes.
 */
export const PAGE_SIZE_MIN: number = 10;

/**
 * Represents the maximum allowed page size for paginated results.
 * Ensures that the number of items per page does not exceed this value.
 * @example 50
 * @developerNotes Used in `PaginationQuery` to enforce valid page sizes.
 */
export const PAGE_SIZE_MAX: number = 50;

/**
 * A predefined list of allowed page sizes for paginated results.
 * Used to restrict the `pageSize` parameter to specific values.
 * @example [10, 15, 25, 50]
 * @developerNotes Used in `PaginationQuery` to enforce valid page sizes.
 */
export const PAGE_SIZE_GROUP: number[] = [10, 15, 25, 50];

/**
 * A predefined list of valid sort orders for pagination queries.
 * Ensures that the `order` parameter is restricted to 'asc' or 'desc'.
 * @example ['asc', 'desc']
 * @developerNotes Used in `PaginationQuery` to validate the sort order.
 */
export const ORDER_BY: string[] = ['asc', 'desc'];

/**
 * A utility class for parsing and validating pagination query parameters from a Fastify request.
 * Provides methods to extract page, page size, sort by, and sort order, along with validation logic.
 * @example const pagination = new PaginationQuery(request);
 * @developerNotes This class assumes the presence of a `PaginationParams<T>` interface and a `PaginationOrder` enum defined elsewhere.
 */
export default class PaginationQuery<T = unknown> {
  /**
   * Class constructor that initializes the Fastify request.
   * @param request - The Fastify request instance containing query parameters.
   * @developerNotes The request is set using `setRequest()` to allow for post-initialization configuration.
   */
  constructor(private request: FastifyRequest<{ Querystring: PaginationParams<T> }> | null) {
    this.setRequest(request);
  }

  /**
   * Sets or updates the Fastify request instance and validates the `page` and `pageSize` query parameters.
   * @param request - The Fastify request instance containing query parameters.
   * @developerNotes This method is idempotent and will only validate if a request is provided.
   */
  setRequest(request: FastifyRequest<{ Querystring: PaginationParams<T> }> | null) {
    if (request) {
      this.request = request;
      this.validatePage();
      this.validatePageSize();
    }
  }

  /**
   * Retrieves the current page number from the request query parameters.
   * @param defaultPage - The default page number to use if none is provided in the query.
   * @returns The parsed and validated page number.
   * @example pagination.getPage(1) // returns 2 if ?page=2 is in the request.
   * @developerNotes Ensure `defaultPage` aligns with your application's minimum page constraint.
   */
  public getPage(defaultPage: number = PAGE_MIN): number {
    return +(this.request?.query?.page ?? defaultPage);
  }

  /**
   * Retrieves the page size from the request query parameters.
   * @param defaultSize - The default page size to use if none is provided in the query.
   * @returns The parsed and validated page size.
   * @example pagination.getPageSize(10) // returns 20 if ?pageSize=20 is in the request.
   * @developerNotes Ensure `defaultSize` is included in your `PAGE_SIZE_GROUP` configuration.
   */
  public getPageSize(defaultSize: number = PAGE_SIZE_MIN): number {
    return +(this.request?.query?.pageSize ?? defaultSize);
  }

  /**
   * Retrieves the sort by field from the request query parameters.
   * @param defaultSort - The default sort field to use if none is provided in the query.
   * @returns The sort field extracted from the query.
   * @example pagination.getSortBy('id') // returns 'name' if ?sortBy=name is in the request.
   * @developerNotes Ensure this matches the fields in your `PaginationParams<T>` interface.
   */
  public getSortBy(defaultSort: string = ''): string {
    return this.request?.query?.sortBy ?? defaultSort;
  }

  /**
   * Retrieves the sort order from the request query parameters.
   * @param defaultOrder - The default sort order to use if none is provided in the query.
   * @returns The parsed sort order, either 'asc' or 'desc'.
   * @example pagination.getOrder('desc') // returns 'asc' if ?order=asc is in the request.
   * @developerNotes Ensure `defaultOrder` is a valid value from your `PaginationOrder` enum.
   */
  public getOrder(defaultOrder: PaginationOrder = 'desc'): PaginationOrder {
    return this.request?.query?.order ?? defaultOrder;
  }

  /**
   * Validates the `pageSize` query parameter.
   * Ensures it is a valid number, within the allowed range, and a permitted value.
   * @developerNotes This method throws a `ValidationError` on invalid input.
   * Ensure `PAGE_SIZE_GROUP`, `PAGE_SIZE_MIN`, and `PAGE_SIZE_MAX` are defined in your configuration.
   */
  private validatePageSize() {
    if (!this.request?.query?.pageSize) {
      return;
    }

    const num = Number(this.request?.query?.pageSize as unknown as string);

    if (!num) {
      ErrorHelper.throwWithCode('Page size must be a number');
    }

    if (num < PAGE_SIZE_MIN) {
      ErrorHelper.throwWithCode(`Page size must be greater than or equal to ${PAGE_SIZE_MIN}`);
    }

    if (num > PAGE_SIZE_MAX) {
      ErrorHelper.throwWithCode(`Page size must be less than ${PAGE_SIZE_MAX}`);
    }

    if (!PAGE_SIZE_GROUP.includes(num)) {
      ErrorHelper.throwWithCode(`Page size must be equal to one of the allowed values`);
    }
  }

  /**
   * Validates the `page` query parameter.
   * Ensures it is a valid number and within the allowed range.
   * @developerNotes This method throws a `ValidationError` on invalid input.
   * Ensure `PAGE_MIN` and `PAGE_MAX` are defined in your configuration.
   */
  private validatePage = () => {
    if (this.request?.query?.page) {
      const num = Number(this.request?.query?.page as unknown as string);

      if (!num) {
        ErrorHelper.throwWithCode('Page must be a number');
      }

      if (num < PAGE_MIN) {
        ErrorHelper.throwWithCode(`Page must be greater than or equal to ${PAGE_MIN}`);
      }

      if (num > PAGE_MAX) {
        ErrorHelper.throwWithCode(`Page must be less than ${PAGE_MAX}`);
      }
    }
  };
}
