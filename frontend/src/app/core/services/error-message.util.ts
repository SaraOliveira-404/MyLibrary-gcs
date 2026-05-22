import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '../models/api-error.model';

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    const body = error.error as Partial<ApiError> | undefined;

    if (body?.message) {
      if (typeof body.message === 'string') {
        return body.message;
      }

      return Object.values(body.message).join('\n');
    }

    if (error.status === 0) {
      return 'Não foi possível conectar ao backend. Verifique se o Spring Boot está rodando.';
    }
  }

  return 'Ocorreu um erro inesperado.';
}
