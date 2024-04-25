export interface IResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export type IAsycRes<T> = Promise<IResponse<T>>;
