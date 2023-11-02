export class BhashiniError extends Error {
  constructor({
    message,
    code,
    cause,
  }: {
    code?: string;
    message: string;
    cause?: any;
  }) {
    super(message);
    console.trace(cause);
    console.error(`${code} ${message}`);
  }
}
