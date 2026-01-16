/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { randomBytes } from 'node:crypto';
import {
  readFileSync,
  rmSync,
  statSync,
  WriteFileOptions,
  writeFileSync,
} from 'node:fs';
import merge from 'deepmerge';

export default abstract class FileHelper {
  /**
   * Given a filename, read the file and return the contents as a JSON object.
   * @param filename - The filename to read.
   * @returns The JSON object.
   */
  public static readJsonFile<T>(filename: string): T | null {
    try {
      return JSON.parse(
        readFileSync(resolve(filename), { encoding: 'utf8' }),
      ) as T;
    } catch (e) {
      return null;
    }
  }

  /**
   * Generate a temporary file path with a random name
   * @param [ext] - File extension (without the dot)
   * @param [dir] - Temp Directory (defaults to OS /tmp)
   * @returns A temporary file path
   */
  public static tempFile(ext: string = 'tmp', dir = null): string {
    return join(
      dir || tmpdir(),
      `file.${Date.now()}.${randomBytes(6).readUIntLE(0, 6).toString(36)}.${ext}`,
    );
  }

  /**
   * Write a content to the temp file
   * @param content - The content to store
   * @param [ext] - File extension (without the dot)
   * @param [options] - Write file options
   * @returns - Absolute path to the file
   */
  public static writeToTemp(
    content: any,
    ext: string = 'tmp',
    options: Partial<WriteFileOptions> = {},
  ): string {
    const file = FileHelper.tempFile(ext);
    writeFileSync(file, content, merge({ encoding: 'utf-8' }, options));
    return file;
  }

  /**
   * Write a content to the given file
   * @param filename - The absolute file path
   * @param content - The content to store
   * @param [options] - Options for the file
   * @returns Whatever the file written or not
   */
  public static writeToFile(
    filename: string,
    content: any,
    options: Partial<WriteFileOptions> = {},
  ): boolean {
    writeFileSync(
      filename,
      content,
      merge<WriteFileOptions>({ encoding: 'binary' }, options),
    );
    try {
      return statSync(filename).isFile();
    } catch (e) {
      console.log('writeToFile Error:', e);
      return false;
    }
  }

  /**
   * Remove a directory recursively
   * @param path - The absolute path to the directory
   */
  public static remRecursive(path: string) {
    try {
      rmSync(path, { recursive: true, force: true, maxRetries: 5 });
    } catch (e) {
      console.log(e);
      // Do nothing
    }
  }
}
