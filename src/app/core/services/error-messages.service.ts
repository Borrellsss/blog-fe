import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesService {
  constructor(private http: HttpClient) { }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`error-messages/${id}`);
  }
}
