// Clase para generar los error de validaciones
export class ValidationError extends Error {
  public code: string;
  public statusCode: number;

  constructor(message: string) {
    super(message);

    this.name = "ValidationError";
    this.code = "validation_error";
    this.statusCode = 400;
  }
}