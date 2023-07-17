import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { ValidationOutputDto } from "../../shared/models/output/validation/validation-output-dto";

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {
  constructor(private http: HttpClient) { }

  readByField(field: string): Observable<ValidationOutputDto> {
    return this.http.get<ValidationOutputDto>(`validations/field/${field}`);
  }
  readByFieldStartsWith(field: string): Observable<Array<ValidationOutputDto>> {
    return this.http.get<Array<ValidationOutputDto>>(`validations/field-starts-with/${field}`);
  }
  delete(code: string): Observable<void> {
    return this.http.delete<void>(`validations/${code}`);
  }
}
