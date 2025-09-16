import { HttpParams } from "@angular/common/http";

export function buildHttpParams(filtros: Record<string, any>): HttpParams {
  let params = new HttpParams();

  Object.entries(filtros).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;

    const v =
      value instanceof Date
        ? value.toISOString().split('T')[0]
        : value.toString();

    params = params.set(key, v);
  });

  return params;
}