import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { ValidationInputDto } from "../../shared/models/input/validation-input-dto";
import { ValidationOutputDto } from "../../shared/models/output/validations/validation-output-dto";

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {
  constructor(private http: HttpClient) { }

  create(validationInputDto: ValidationInputDto): Observable<ValidationOutputDto> {
    return this.http.post<ValidationOutputDto>(`validations`, validationInputDto);
  }
  readByField(field: string): Observable<ValidationOutputDto> {
    return this.http.get<ValidationOutputDto>(`validations/field/${field}`);
  }
  readByFieldStartsWith(field: string): Observable<Array<ValidationOutputDto>> {
    return this.http.get<Array<ValidationOutputDto>>(`validations/field-starts-with/${field}`);
  }
  update(code: string, validationInputDto: ValidationInputDto): Observable<ValidationOutputDto> {
    return this.http.put<ValidationOutputDto>(`validations/${code}`, validationInputDto);
  }
  delete(code: string): Observable<void> {
    return this.http.delete<void>(`validations/${code}`);
  }
}
