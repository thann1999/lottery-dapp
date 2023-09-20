/* eslint-disable no-unused-vars */

export interface HttpResponse<T> {
  message?: string;
  data: T;
  status: number;
  header?: HeadersInit;
}

export interface ResponseData<T> {
  data: T;
  currentTime: string;
  msg: string;
  status: number;
}

export interface PaginationResponse<T> {
  docs: T[];
  page: number;
  size: number;
  total: number;
  totalPage: number;
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum ThrowErrorStrategy {
  ThrowOnly = 1,
  ThrowAndNotify = 2,
}

export interface HttpOptions {
  queryParams?: any;
  body?: Record<string, any> | BodyInit;
  headers?: HeadersInit;
  throwError?: ThrowErrorStrategy;
  signal?: AbortSignal;
}
