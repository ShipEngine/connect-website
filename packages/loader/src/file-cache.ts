/**
 * Caches parsed file contents so the same file doesn't get read and parsed multiple times.
 * This also ensures that multiple references to the same file resolve to the same parsed obect instance.
 */
class FileCache {
  private readonly _cache = new Map<string, Promise<unknown>>();
  private _loadsInProgress = 0;

  /**
   * Adds the given value to the cache
   */
  public async add<T>(filePath: string, promise: Promise<T>): Promise<T> {
    if (this._cache.has(filePath)) {
      throw new ReferenceError(`Cache write error: ${filePath}`);
    }

    this._cache.set(filePath, promise);
    return promise;
  }

  /**
   * Gets the specified value from the cache, if it exists
   */
  public get<T>(filePath: string): Promise<T> | undefined {
    return this._cache.get(filePath) as Promise<T> | undefined;
  }

  /**
   * Lets the cache know that a ShipEngine Connect app is currently being loaded.
   * Be sure to call `finishedLoading()` afterward so the cache can be cleared to free-up memory.
   */
  public startedLoading() {
    this._loadsInProgress++;
  }

  /**
   * Lets the cache know that a ShipEngine Connect app has finished loading.
   * The cache will be cleared to free-up memory.
   */
  public finishedLoading() {
    this._loadsInProgress--;

    if (this._loadsInProgress <= 0) {
      this._loadsInProgress = 0;
      this._cache.clear();
    }
  }
}

/**
 * The singleton instance of the FileCache
 */
export const fileCache = new FileCache();
