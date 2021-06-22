import ono from '@jsdevtools/ono';
import path from 'path';
import { promises as fs } from 'fs';
import { readFile } from './read-file';

const defaultFile = '.shipconnect';

function getHomePath(): string {
  return (
    process.env.HOME ||
    process.env.HOMEPATH ||
    (process.env.USERPROFILE as string)
  );
}

function getKeyFilePath(): string {
  return path.resolve(getHomePath(), defaultFile);
}

export enum Errors {
  NotFound = 'ERR_API_KEY_NOT_FOUND',
  SetError = 'ERR_SETTING_API_KEY',
}

/**
 * Retrieves a key if it exist in the file system
 * @returns {Promise<string>} A promise w/ the key value
 */
export async function get(): Promise<string> {
  try {
    const key = await readFile<string>(getKeyFilePath());
    return key;
  } catch (error) {
    throw ono(error, { code: Errors.NotFound }, 'API key not found');
  }
}

/**
 * Sets a key in the file system
 *
 * @param {string} apiKey The key that should be set
 * @returns {Promise<string>} A promise with the value of the key that was set
 */
export async function set(apiKey: string): Promise<string> {
  try {
    await fs.writeFile(getKeyFilePath(), apiKey, 'utf8');
    return apiKey;
  } catch (error) {
    throw ono(error, { code: Errors.SetError }, 'API key was not set');
  }
}

/**
 * Clears a key if it exist in the file system
 * @returns {Promise<void>} A promise that resolves to void
 */
export async function clear(): Promise<void> {
  try {
    await fs.unlink(getKeyFilePath());
  } catch {
    // If the file doesnt exist swallow the error
  }
}
