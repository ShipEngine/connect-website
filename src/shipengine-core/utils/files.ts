import * as fs from "fs";

export async function fileExists(path: string): Promise<boolean> {
  try {
    // Check if file exists
    await fs.promises.access(path, fs.constants.F_OK);
    return true;
  }
  catch (error) {
    return false;
  }
}