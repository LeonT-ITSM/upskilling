export class HttpError extends Error {
  statusCode: number;
  title: string;

  constructor(statusCode: number, title: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.title = title;
  }
}
