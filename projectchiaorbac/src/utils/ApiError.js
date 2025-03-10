class ApiError extends Error {
  constructor(
    statusCode,
    message = "Somthing went wrong",
    error = [],
    statck = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
    this.data = null;
    this.succes = false;
    this.message = message;

    if (statck) {
      this.stack = statck;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export {ApiError}