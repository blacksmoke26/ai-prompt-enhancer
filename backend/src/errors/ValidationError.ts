/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * Represents a standardized validation error with associated HTTP status code and error code.
 * Extends the built-in `Error` class to provide structured error handling in API responses.
 * @example new ValidationError("Invalid input", 400, "BAD_REQUEST")
 * @developerNotes Use this class consistently across the application for standardized error responses.
 * Ensure that `errorCode` aligns with `ErrorCodes` and `ErrorHelper` mappings.
 */
export default class ValidationError extends Error {
  /**
   * The HTTP status code associated with this error.
   * @example 400
   */
  public statusCode: number;

  /**
   * The standardized string error code (e.g., 'NOT_FOUND', 'BAD_REQUEST').
   * @example 'BAD_REQUEST'
   */
  public errorCode: string;

  /**
   * Constructs a new `ValidationError` instance.
   * @param message - A human-readable error message.
   * @param statusCode - The HTTP status code (default: 400).
   * @param errorCode - The standardized string error code (default: 'BAD_REQUEST').
   * @developerNotes Ensure that `errorCode` matches the `ErrorCodes` enum values for consistency.
   * Avoid hardcoding status codes where `ErrorHelper` can provide them.
   */
  constructor(message: string, statusCode: number = 400, errorCode: string = 'BAD_REQUEST') {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;

    // Set the prototype explicitly to ensure correct instanceof checks.
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
