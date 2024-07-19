export interface IAsyncError {
  statusCode: number | "ERR_CANCELED";
  message: string;
}
