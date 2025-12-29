/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { createServer } from '../index';
import { appInstance } from '../fastify/bootstrapper';
import { initDB } from '../database';

// Mock the dependencies
jest.mock('../fastify/bootstrapper', () => ({
  appInstance: jest.fn(),
}));

jest.mock('../database', () => ({
  initDB: jest.fn(),
}));

jest.mock('dotenv/config', () => ({}));

describe('Index', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createServer', () => {
    it('should create and configure server correctly', async () => {
      const mockFastify = {
        head: jest.fn(),
        listen: jest.fn((_, callback) => {
          callback(null, 'http://localhost:3000');
        }),
      };

      (appInstance as jest.Mock).mockResolvedValue(mockFastify);
      (initDB as jest.Mock).mockResolvedValue(undefined);

      const server = await createServer();

      expect(appInstance).toHaveBeenCalled();
      expect(initDB).toHaveBeenCalled();
      expect(mockFastify.head).toHaveBeenCalledWith('*', expect.any(Function));
      expect(server).toBe(mockFastify);
    });

    it('should handle server startup errors', async () => {
      const mockFastify = {
        head: jest.fn(),
        listen: jest.fn((_, callback) => {
          callback(new Error('Server error'), null);
        }),
      };

      (appInstance as jest.Mock).mockResolvedValue(mockFastify);
      (initDB as jest.Mock).mockResolvedValue(undefined);

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(createServer()).rejects.toThrow();

      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
      consoleErrorSpy.mockRestore();
    });
  });
});
