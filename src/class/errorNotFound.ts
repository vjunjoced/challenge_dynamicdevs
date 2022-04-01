// Clase para genera los error de 404
export class NotFoundError extends Error {
  public code: string;
  public statusCode: number;

  constructor(message: string) {
    super(message);

    this.name = "ReourceNotFound";
    this.code = "resource_not_found";
    this.statusCode = 404;
  }
}