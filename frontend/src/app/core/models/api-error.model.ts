export interface ApiError {
  timestamp?: string;
  status: number;
  error: string;
  message: string | Record<string, string>;
  path?: string;
}
