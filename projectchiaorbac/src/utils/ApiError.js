class ApiError extends Error{
    constructor(
        statusCode,
        messahe ="Somthing went wrong",
        error=[],
        statck =""

    ){
        super(message)
        this.statusCode = statusCode;
        this.error = error;
        this.data = null
        this.succes=false;
        this.message = message;
    }
}