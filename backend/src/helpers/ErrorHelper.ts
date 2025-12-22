/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// errors
import ValidationError from '~/fastify/errors/ValidationError';

/**
 * Enum representing standardized error codes used across the application.
 * Each error code maps to a specific HTTP status and human-readable message.
 * @developerNotes Extend this enum when introducing new error types, ensuring consistent naming and mapping.
 */
export enum ErrorCodes {
  /**
   * General-purpose error for unknown or unhandled failures.
   * @example ErrorCodes.UnknownError
   */
  UnknownError = 0,

  /**
   * Resource not found or invalid reference.
   * @example ErrorCodes.NotFound
   */
  NotFound = 1,

  /**
   * Malformed or invalid request data.
   * @example ErrorCodes.BadRequest
   */
  BadRequest = 2,

  /**
   * Authentication is required to perform the operation.
   * @example ErrorCodes.Unauthorized
   */
  Unauthorized = 3,

  /**
   * User is authenticated but lacks permissions to perform the operation.
   * @example ErrorCodes.Forbidden
   */
  Forbidden = 4,

  /**
   * Resource is temporarily unavailable.
   * @example ErrorCodes.Unavailable
   */
  Unavailable = 5,

  /**
   * Request data is semantically incorrect or invalid.
   * @example ErrorCodes.Unprocessable
   */
  Unprocessable = 6,

  /**
   * Operation failed during processing (e.g., business rule violation).
   * @example ErrorCodes.ProcessFailed
   */
  ProcessFailed = 7,

  /**
   * Duplicate data entry (e.g., unique constraint violation).
   * @example ErrorCodes.DuplicateEntry
   */
  DuplicateEntry = 8,

  /**
   * User is authenticated but access is denied for policy reasons.
   * @example ErrorCodes.AccessDenied
   */
  AccessDenied = 9,

  /**
   * Previously granted access has been revoked.
   * @example ErrorCodes.AccessRevoked
   */
  AccessRevoked = 10,
}

/**
 * Enum representing standardized error codes used across the application.
 * Each error code maps to a specific HTTP status and human-readable message.
 * @developerNotes Extend this enum when introducing new error types, ensuring consistent naming and mapping.
 */
export type ErrorCode =
  | 'UNKNOWN_ERROR'
  | 'NOT_FOUND'
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'UNAVAILABLE'
  | 'UNPROCESSABLE'
  | 'PROCESS_FAILED'
  | 'DUPLICATE_ENTRY'
  | 'ACCESS_DENIED'
  | 'ACCESS_REVOKED'
  | 'VALIDATE_ERROR'
  | string;

/**
 * Helper class for managing error codes, messages, and HTTP status codes.
 * Provides utility methods to generate and throw standardized validation errors.
 */
export default abstract class ErrorHelper {
  /**
   * Converts an `ErrorCodes` enum value to a standardized string representation.
   * @param code - The error code to convert.
   * @returns A standardized string error code (e.g., 'NOT_FOUND').
   * @example ErrorHelper.getErrorCode(ErrorCodes.NotFound) // returns 'NOT_FOUND'
   * @developerNotes Ensure this mapping aligns with backend and frontend expectations.
   */
  public static getErrorCode(code: ErrorCodes): string {
    switch (code) {
      case ErrorCodes.UnknownError:
        return 'UNKNOWN_ERROR';
      case ErrorCodes.NotFound:
        return 'NOT_FOUND';
      case ErrorCodes.BadRequest:
        return 'BAD_REQUEST';
      case ErrorCodes.Unauthorized:
        return 'UNAUTHORIZED';
      case ErrorCodes.Forbidden:
        return 'FORBIDDEN';
      case ErrorCodes.Unavailable:
        return 'UNAVAILABLE';
      case ErrorCodes.Unprocessable:
        return 'UNPROCESSABLE_ENTITY';
      case ErrorCodes.ProcessFailed:
        return 'PROCESS_FAILED';
      case ErrorCodes.DuplicateEntry:
        return 'DUPLICATE_ENTRY';
      case ErrorCodes.AccessDenied:
        return 'ACCESS_DENIED';
      case ErrorCodes.AccessRevoked:
        return 'ACCESS_REVOKED';
      default:
        return 'BAD_REQUEST';
    }
  }

  /**
   * Returns a human-readable error message based on the provided error code.
   * @param code - The error code to map.
   * @returns A user-friendly error message.
   * @example ErrorHelper.getErrorMessage(ErrorCodes.Unauthorized) // returns 'Unauthorized'
   * @developerNotes Keep messages consistent with backend and frontend UI expectations.
   */
  public static getErrorMessage(code: ErrorCodes): string {
    switch (code) {
      case ErrorCodes.UnknownError:
        return 'Unknown error';
      case ErrorCodes.NotFound:
        return 'Not found';
      case ErrorCodes.Unauthorized:
        return 'Unauthorized';
      case ErrorCodes.Forbidden:
        return 'Forbidden';
      case ErrorCodes.Unavailable:
        return 'Unavailable';
      case ErrorCodes.Unprocessable:
        return 'Unprocessable entity';
      case ErrorCodes.ProcessFailed:
        return 'Process failed';
      case ErrorCodes.DuplicateEntry:
        return 'Duplicate entry';
      case ErrorCodes.AccessDenied:
        return 'Access denied';
      case ErrorCodes.AccessRevoked:
        return 'Access revoked';
      default:
        return 'Bad request';
    }
  }

  /**
   * Maps an `ErrorCodes` enum value to an appropriate HTTP status code.
   * @param code - The error code to map.
   * @returns An HTTP status code (e.g., 404 for `NotFound`).
   * @example ErrorHelper.getStatusCode(ErrorCodes.Unavailable) // returns 410
   * @developerNotes Follow REST/HTTP standards for status code mapping.
   */
  public static getStatusCode(code: ErrorCodes): number {
    switch (code) {
      case ErrorCodes.UnknownError:
      case ErrorCodes.BadRequest:
      case ErrorCodes.ProcessFailed:
      case ErrorCodes.DuplicateEntry:
        return 400;

      case ErrorCodes.NotFound:
        return 404;

      case ErrorCodes.Unauthorized:
      case ErrorCodes.AccessDenied:
        return 401;

      case ErrorCodes.Forbidden:
      case ErrorCodes.AccessRevoked:
        return 403;

      case ErrorCodes.Unavailable:
        return 410;
      case ErrorCodes.Unprocessable:
        return 422;
      default:
        return 400;
    }
  }

  /**
   * Creates a `ValidationError` with a message derived from the provided error code.
   * @param errorCode - The error code to use (default: `BadRequest`).
   * @returns A new `ValidationError` instance.
   * @example ErrorHelper.withCode(ErrorCodes.NotFound)
   * @developerNotes Prefer this method for consistency in error creation.
   */
  public static withCode(errorCode: ErrorCodes = ErrorCodes.BadRequest): ValidationError {
    return new ValidationError(
      this.getErrorMessage(errorCode),
      this.getStatusCode(errorCode),
      this.getErrorCode(errorCode),
    );
  }

  /**
   * Creates a `ValidationError` with a custom message and error code.
   * @param message - The custom error message.
   * @param errorCode - The error code to use (default: `BadRequest`).
   * @returns A new `ValidationError` instance.
   * @example ErrorHelper.withMessageCode('Invalid user ID', ErrorCodes.NotFound)
   * @developerNotes Use when a custom message is needed for the same error code.
   */
  public static withMessageCode(message: string, errorCode: ErrorCodes = ErrorCodes.BadRequest): ValidationError {
    return new ValidationError(message, this.getStatusCode(errorCode), this.getErrorCode(errorCode));
  }

  /**
   * Creates a `ValidationError` with a custom message, status code, and error code.
   * @param message - The custom error message.
   * @param statusCode - The HTTP status code (default: 400).
   * @param errorCode - The error code to use (default: `BadRequest`).
   * @returns A new `ValidationError` instance.
   * @example ErrorHelper.withMessageStatusCode('Resource not found', 404, ErrorCodes.NotFound)
   * @developerNotes Use for highly specific error creation scenarios.
   */
  public static withMessageStatusCode(
    message: string,
    statusCode: number = 400,
    errorCode: ErrorCodes = ErrorCodes.BadRequest,
  ): ValidationError {
    return new ValidationError(message, statusCode, this.getErrorCode(errorCode));
  }

  /**
   * Creates a `ValidationError` with a custom message, status code, and error code string.
   * @param message - The custom error message.
   * @param statusCode - The HTTP status code (default: 400).
   * @param errorCode - The error code string (default: 'BAD_REQUEST').
   * @returns A new `ValidationError` instance.
   * @example ErrorHelper.withMessageStatusErrorCode('Invalid data', 422, 'UNPROCESSABLE_ENTITY')
   * @developerNotes Use when working with external systems expecting string-based error codes.
   */
  public static withMessageStatusErrorCode(
    message: string,
    statusCode: number = 400,
    errorCode: ErrorCode = 'BAD_REQUEST',
  ): ValidationError {
    return new ValidationError(message, statusCode, errorCode);
  }

  /**
   * Throws a `ValidationError` with a message derived from the provided error code.
   * @param message - The message to use (or derived from `errorCode`).
   * @param errorCode - The error code to use (default: `BadRequest`).
   * @developerNotes Use for centralized error throwing in business logic.
   * @example ErrorHelper.throwWithCode(null, ErrorCodes.NotFound)
   */
  public static throwWithCode(message: string | null, errorCode: ErrorCodes = ErrorCodes.BadRequest): never {
    throw new ValidationError(
      message ?? this.getErrorMessage(errorCode),
      this.getStatusCode(errorCode),
      this.getErrorCode(errorCode),
    );
  }

  /**
   * Throws a `ValidationError` with a custom message, status code, and error code.
   * @param message - The custom error message.
   * @param statusCode - The HTTP status code (default: 400).
   * @param errorCode - The error code string (default: 'BAD_REQUEST').
   * @developerNotes Use when an explicit error must be thrown immediately.
   * @example ErrorHelper.throwWithStatus('Invalid request', 400, 'BAD_REQUEST')
   */
  public static throwWithStatus(
    message: string = 'An unknown error occurred',
    statusCode: number = 400,
    errorCode: ErrorCode = 'BAD_REQUEST',
  ): never {
    throw new ValidationError(message, statusCode ?? this.getStatusCode(ErrorCodes.BadRequest), errorCode ?? this.getErrorCode(ErrorCodes.BadRequest));
  }
}
