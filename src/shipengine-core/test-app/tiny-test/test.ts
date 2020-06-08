const hash = require("object-hash");

export default class Test {
  fn: any;
  sha: string;
  title: string;
  skip: boolean;

  constructor({
    title,
    fn,
    skip = false,
  }: {
    title: string;
    fn: any;
    skip?: boolean;
  }) {
    this.title = title;
    this.fn = fn;
    this.sha = hash(title);
    this.skip = skip;
  }

  toString(): string {
    return `(${this.truncatedSha()}) ${this.title}`;
  }

  negatedToString(): string {
    return `(${this.truncatedSha()}) raises when ${this.title}`;
  }

  truncatedSha(): string {
    return this.sha.slice(0, 7);
  }
}
