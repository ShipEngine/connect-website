export interface PackageJSON {
  name?: string;
  version?: string;
  licnse?: string;
  description?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  bundledDependencies?: string[];
  scripts?: Record<string, string>;
  engines: Record<string, string>;
  [key: string]: unknown;
}
