/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import ErrorHelper, { ErrorCodes } from '../../helpers/ErrorHelper';
import ValidationError from '../../fastify/errors/ValidationError';

describe('ErrorHelper', () => {
  describe('getErrorCode', () => {
    it('should return correct error code string for each enum value', () => {
      expect(ErrorHelper.getErrorCode(ErrorCodes.UnknownError)).toBe('UNKNOWN_ERROR');
      expect(ErrorHelper.getErrorCode(ErrorCodes.NotFound)).toBe('NOT_FOUND');
      expect(ErrorHelper.getErrorCode(ErrorCodes.BadRequest)).toBe('BAD_REQUEST');
      expect(ErrorHelper.getErrorCode(ErrorCodes.Unauthorized)).toBe('UNAUTHORIZED');
      expect(ErrorHelper.getErrorCode(ErrorCodes.Forbidden)).toBe('FORBIDDEN');
      expect(ErrorHelper.getErrorCode(ErrorCodes.Unavailable)).toBe('UNAVAILABLE');
      expect(ErrorHelper.getErrorCode(ErrorCodes.Unprocessable)).toBe('UNPROCESSABLE_ENTITY');
      expect(ErrorHelper.getErrorCode(ErrorCodes.ProcessFailed)).toBe('PROCESS_FAILED');
      expect(ErrorHelper.getErrorCode(ErrorCodes.DuplicateEntry)).toBe('DUPLICATE_ENTRY');
      expect(ErrorHelper.getErrorCode(ErrorCodes.AccessDenied)).toBe('ACCESS_DENIED');
      expect(ErrorHelper.getErrorCode(ErrorCodes.AccessRevoked)).toBe('ACCESS_REVOKED');
    });

    it('should return BAD_REQUEST for unknown error codes', () => {
      expect(ErrorHelper.getErrorCode(999 as any)).toBe('BAD_REQUEST');
    });
  });

  describe('getErrorMessage', () => {
    it('should return correct error message for each enum value', () => {
      expect(ErrorHelper.getErrorMessage(ErrorCodes.UnknownError)).toBe('Unknown error');
      expect(ErrorHelper.getErrorMessage(ErrorCodes.NotFound)).toBe('Not found');
      expect(ErrorHelper.getErrorMessage(ErrorCodes.Unauthorized)).toBe('Unauthorized');
      expect(ErrorHelper.getErrorMessage(ErrorCodes.Forbidden)).toBe('Forbidden');
      expect(ErrorHelper.getErrorMessage(ErrorCodes.Unavailable)).toBe('Unavailable');
      expect(ErrorHelper.getErrorMessage(ErrorCodes.Unprocessable)).toBe('Unprocessable entity');
      expect(ErrorHelper.getErrorMessage(ErrorCodes.ProcessFailed)).toBe('Process failed');
      expect(ErrorHelper.getErrorMessage(ErrorCodes.DuplicateEntry)).toBe('Duplicate entry');
      expect(ErrorHelper.getErrorMessage(ErrorCodes.AccessDenied)).toBe('Access denied');
      expect(ErrorHelper.getErrorMessage(ErrorCodes.AccessRevoked)).toBe('Access revoked');
    });

    it('should return "Bad request" for unknown error codes', () => {
      expect(ErrorHelper.getErrorMessage(999 as any)).toBe('Bad request');
    });
  });

  describe('getStatusCode', () => {
    it('should return correct HTTP status code for each enum value', () => {
      expect(ErrorHelper.getStatusCode(ErrorCodes.UnknownError)).toBe(400);
      expect(ErrorHelper.getStatusCode(ErrorCodes.NotFound)).toBe(404);
      expect(ErrorHelper.getStatusCode(ErrorCodes.Unauthorized)).toBe(401);
      expect(ErrorHelper.getStatusCode(ErrorCodes.Forbidden)).toBe(403);
      expect(ErrorHelper.getStatusCode(ErrorCodes.Unavailable)).toBe(410);
      expect(ErrorHelper.getStatusCode(ErrorCodes.Unprocessable)).toBe(422);
      expect(ErrorHelper.getStatusCode(ErrorCodes.ProcessFailed)).toBe(400);
      expect(ErrorHelper.getStatusCode(ErrorCodes.DuplicateEntry)).toBe(400);
      expect(ErrorHelper.getStatusCode(ErrorCodes.AccessDenied)).toBe(401);
      expect(ErrorHelper.getStatusCode(ErrorCodes.AccessRevoked)).toBe(403);
    });

    it('should return 400 for unknown error codes', () => {
      expect(ErrorHelper.getStatusCode(999 as any)).toBe(400);
    });
  });

  describe('withCode', () => {
    it('should create ValidationError with correct properties', () => {
      const error = ErrorHelper.withCode(ErrorCodes.NotFound);

      expect(error).toBeInstanceOf(ValidationError);
      expect(error.message).toBe('Not found');
      expect(error.statusCode).toBe(404);
      expect(error.errorCode).toBe('NOT_FOUND');
    });

    it('should use default BadRequest when no code provided', () => {
      const error = ErrorHelper.withCode();

      expect(error.message).toBe('Bad request');
      expect(error.statusCode).toBe(400);
      expect(error.errorCode).toBe('BAD_REQUEST');
    });
  });

  describe('withMessageCode', () => {
    it('should create ValidationError with custom message and error code', () => {
      const error = ErrorHelper.withMessageCode('Custom message', ErrorCodes.NotFound);

      expect(error).toBeInstanceOf(ValidationError);
      expect(error.message).toBe('Custom message');
      expect(error.statusCode).toBe(404);
      expect(error.errorCode).toBe('NOT_FOUND');
    });
  });

  describe('withMessageStatusCode', () => {
    it('should create ValidationError with custom message, status code, and error code', () => {
      const error = ErrorHelper.withMessageStatusCode('Custom message', 403, ErrorCodes.Forbidden);

      expect(error).toBeInstanceOf(ValidationError);
      expect(error.message).toBe('Custom message');
      expect(error.statusCode).toBe(403);
      expect(error.errorCode).toBe('FORBIDDEN');
    });
  });

  describe('withMessageStatusErrorCode', () => {
    it('should create ValidationError with custom message, status code, and error code string', () => {
      const error = ErrorHelper.withMessageStatusErrorCode('Custom message', 422, 'UNPROCESSABLE_ENTITY');

      expect(error).toBeInstanceOf(ValidationError);
      expect(error.message).toBe('Custom message');
      expect(error.statusCode).toBe(422);
      expect(error.errorCode).toBe('UNPROCESSABLE_ENTITY');
    });
  });

  describe('throwWithCode', () => {
    it('should throw ValidationError with correct properties', () => {
      expect(() => ErrorHelper.throwWithCode(null, ErrorCodes.NotFound))
        .toThrow(ValidationError);

      const error = new ValidationError('Not found', 404, 'NOT_FOUND');
      expect(() => ErrorHelper.throwWithCode(null, ErrorCodes.NotFound))
        .toThrow(error);
    });

    it('should use provided message when not null', () => {
      expect(() => ErrorHelper.throwWithCode('Custom error message'))
        .toThrow('Custom error message');
    });
  });

  describe('throwWithStatus', () => {
    it('should throw ValidationError with custom message, status code, and error code', () => {
      expect(() => ErrorHelper.throwWithStatus('Custom message', 403, 'FORBIDDEN'))
        .toThrow(ValidationError);

      const error = new ValidationError('Custom message', 403, 'FORBIDDEN');
      expect(() => ErrorHelper.throwWithStatus('Custom message', 403, 'FORBIDDEN'))
        .toThrow(error);
    });

    it('should use defaults when parameters are not provided', () => {
      expect(() => ErrorHelper.throwWithStatus())
        .toThrow(ValidationError);

      const error = new ValidationError('An unknown error occurred', 400, 'BAD_REQUEST');
      expect(() => ErrorHelper.throwWithStatus())
        .toThrow(error);
    });
  });
});
