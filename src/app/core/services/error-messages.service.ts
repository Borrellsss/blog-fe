import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { ErrorMessageInputDto } from "../../shared/models/input/error-message-input-dto";
import { ErrorMessageOutputDto } from "../../shared/models/output/error-message/error-message-output-dto";

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesService {
  constructor(private http: HttpClient) { }

  create(errorMessageInputDto: ErrorMessageInputDto): Observable<ErrorMessageOutputDto> {
    return this.http.post<ErrorMessageOutputDto>(`error-messages`, errorMessageInputDto);
  }
  update(id: number, errorMessageInputDto: ErrorMessageInputDto): Observable<ErrorMessageOutputDto> {
    return this.http.put<ErrorMessageOutputDto>(`error-messages/${id}`, errorMessageInputDto);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`error-messages/${id}`);
  }
}
