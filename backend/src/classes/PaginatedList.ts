/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// utils
import { PAGE_MIN, PAGE_SIZE_MIN } from '~/classes/PaginationQuery';

// types
import type { FastifyRequest } from 'fastify';
import type { PaginatedResult } from '~/types/response';
import type { FindOptions, Model, ModelStatic, Order } from 'sequelize';

/**
 * Interface representing options for creating a paginated list from a request.
 * Combines Sequelize model, Fastify request, and sorting/filtering parameters.
 * @developerNotes Ensure that `sortByMap` aligns with model attributes, and `findOptions` respects Sequelize conventions.
 */
export interface PaginationCreateWithRequest<M extends Model> {
  /**
   * The Sequelize model class used for querying the database.
   * @example User
   */
  model: ModelStatic<M>;

  /**
   * The Fastify request object containing pagination and sorting parameters.
   * @example request
   */
  request: FastifyRequest;

  /**
   * A mapping of user-facing sort keys to model attribute names.
   * @example { name: 'username' }
   */
  sortByMap: Record<string, string>;

  /**
   * Optional FindOptions to filter or include related records.
   * @example { where: { status: 'active' } }
   */
  findOptions?: FindOptions<M>;

  /**
   * Default sort key to use if no sort parameter is provided.
   * @example 'id'
   */
  defaultSortBy?: string;

  /**
   * Default sort order to use if not specified in the request.
   * @example 'desc'
   */
  defaultSortOrder?: 'asc' | 'desc';
}

/**
 * Interface defining options for pagination, such as page number and items per page.
 * @developerNotes Ensure `pageSize` adheres to application-defined limits (e.g., min/max values).
 */
export interface PaginatorOptions {
  /**
   * The page number to retrieve (1-indexed).
   * @example 2
   */
  page?: number;

  /**
   * The number of items to return per page.
   * @example 10
   */
  pageSize?: number;
}

/**
 * Represents a paginated list of entities, providing metadata and navigation controls.
 * Used to structure paginated API responses consistently.
 * @example new PaginatedList(users, 100, 2, 10)
 * @developerNotes Always use this class to return paginated data from API endpoints.
 * Ensure `toPaginatedResult()` is called when serializing to JSON responses.
 */
export default class PaginatedList<T> {
  /**
   * Total number of pages available.
   * @example 10
   */
  public totalPages: number;

  /**
   * Total number of items in the dataset.
   * @example 250
   */
  public totalCount: number;

  /**
   * Determines whether there is a previous page available.
   * @example true
   */
  public get hasPreviousPage(): boolean {
    return this.page > 1;
  }

  /**
   * Determines whether there is a next page available.
   * @example true
   */
  public get hasNextPage(): boolean {
    return this.page < this.totalPages;
  }

  /**
   * Constructor for initializing a paginated list.
   * @param items - The list of items to include in the current page.
   * @param count - The total number of items in the dataset.
   * @param page - The current page number (1-indexed).
   * @param pageSize - The number of items per page.
   * @developerNotes Avoid creating instances manually; use `create()` or `createWithRequest()` instead.
   */
  public constructor(
    private items: T[],
    count: number,
    public page: number,
    pageSize: number,
  ) {
    this.totalCount = count;
    this.totalPages = Math.ceil(count / pageSize);
  }

  /**
   * Converts the paginated list into a paginated result object for API responses.
   * @returns A structured object containing pagination metadata and items.
   * @example { currentPage: 2, totalPages: 10, hasPreviousPage: true, rows: [...] }
   */
  public toPaginatedResult(): PaginatedResult<T> {
    return {
      currentPage: this.page,
      totalPages: this.totalPages,
      hasPreviousPage: this.hasPreviousPage,
      hasNextPage: this.hasNextPage,
      totalCount: this.totalCount,
      rows: this.items,
    };
  }

  /**
   * Applies a transformation function to each item in the paginated list.
   * @param callback - The function to apply to each item.
   * @developerNotes Use for data transformation before returning to the client.
   */
  public itemsIterator(callback: (item: T) => T): void {
    this.items = this.items.map((x) => callback(x));
  }

  /**
   * Creates a paginated list from a Sequelize model and query options.
   * @param model - The Sequelize model class.
   * @param findOptions - Options to filter and sort the query.
   * @param options - Pagination options like page and pageSize.
   * @returns A new `PaginatedList` instance with results from the database.
   * @example PaginatedList.create(User, { where: { status: 'active' } }, { page: 1, pageSize: 10 })
   * @developerNotes Prefer this method for paginated queries using Sequelize.
   */
  public static async create<M extends Model>(
    model: ModelStatic<M>,
    findOptions: FindOptions<M>,
    options: PaginatorOptions = {}
  ): Promise<PaginatedList<M>> {
    const page = options?.page ?? PAGE_MIN;
    const pageSize = options?.pageSize ?? PAGE_SIZE_MIN;

    const { rows, count } = await model.findAndCountAll({
      ...findOptions,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    return new PaginatedList<M>(rows, count, page, pageSize);
  }

  /**
   * Creates a paginated list from a Fastify request and model.
   * Uses request-based pagination, sorting, and filtering.
   * @param options - Options containing the model, request, and sorting configuration.
   * @returns A new `PaginatedList` instance with results from the database.
   * @example PaginatedList.createWithRequest({ model: User, request: req, sortByMap: { name: 'username' } })
   * @developerNotes Use this method in Fastify route handlers to extract pagination and sorting from requests.
   */
  public static createWithRequest<M extends Model>(
    options: PaginationCreateWithRequest<M>
  ): Promise<PaginatedList<M>> {
    const { pagination } = options.request;

    const order: Order = [[
      options.sortByMap[pagination.getSortBy(options?.defaultSortBy ?? 'id')],
      pagination.getOrder(options?.defaultSortOrder ?? 'desc')
    ]];

    return this.create(
      options.model,
      {
        ...(options?.findOptions ?? {}),
        order,
      },
      {
        pageSize: pagination.getPageSize(),
        page: pagination.getPage(),
      },
    );
  }
}
