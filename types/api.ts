export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: { field: string; message: string }[];
    requestId?: string;
  };
}

export interface PageMeta {
  page: number;
  pageSize: number;
  total: number;
}

export interface ApiList<T> {
  data: T[];
  meta: PageMeta;
}
