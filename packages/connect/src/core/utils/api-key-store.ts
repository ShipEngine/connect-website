import path from 'path';
import { promises as fs } from 'fs';
import xdg from '@folder/xdg';
import mkdirp from 'mkdirp';
import os from 'os';

const CONFIG_DIR = path.resolve(xdg().config, 'connect');
const CONFIG_FILE = path.resolve(CONFIG_DIR, 'key');
const LEGACY_CONFIG_FILE = path.resolve(os.homedir(), '.shipconnect');

/**
 * Retrieves a key if it exist in the file system
 * @returns {Promise<string>} A promise w/ the key value
 */
export async function get(): Promise<string> {
  let apiKey;
  try {
    apiKey = await fs.readFile(CONFIG_FILE, 'utf8');
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw error;
    }
  }
  if (!apiKey) {
    apiKey = await fs.readFile(LEGACY_CONFIG_FILE, 'utf8');
    await set(apiKey);
    await fs.unlink(LEGACY_CONFIG_FILE);
  }
  if (!apiKey) {
    throw new Error(`${CONFIG_FILE} not found`);
  }
  return apiKey.trim();
}

/**
 * Sets a key in the file system
 *
 * @param {string} apiKey The key that should be set
 * @returns {Promise<string>} A promise with the value of the key that was set
 */
export async function set(apiKey: string): Promise<void> {
  await mkdirp(CONFIG_DIR);
  await fs.writeFile(CONFIG_FILE, `${apiKey.trim()}\n`, {
    encoding: 'utf8',
    mode: '600',
  });
}

/**
 * Clears a key if it exist in the file system
 * @returns {Promise<void>} A promise that resolves to void
 */
export async function clear(): Promise<void> {
  try {
    await fs.unlink(CONFIG_FILE);
    await fs.unlink(LEGACY_CONFIG_FILE);
  } catch (error) {
    if (error?.code === 'ENOENT') {
      return;
    }
    throw error;
  }
}
