export class RespuestaEstandarizada<T> {
  status: "success" | "error";
  message: string;
  data?: T;
  statusCode: number;

  constructor(
    status: "success" | "error",
    message: string,
    statusCode: number,
    data?: T
  ) {
    this.status = status;
    this.message = message;
    this.statusCode = statusCode;
    if (data !== undefined) {
      this.data = data;
    }
  }

  static success<T>(message: string, data?: T, statusCode: number = 200) {
    return new RespuestaEstandarizada("success", message, statusCode, data);
  }

  static error(message: string, statusCode: number = 500) {
    return new RespuestaEstandarizada("error", message, statusCode);
  }
}