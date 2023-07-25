import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { RoleOutputDto } from "../../shared/models/output/roles/role-output-dto";

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  constructor(private http: HttpClient) { }

  readAll(): Observable<Array<RoleOutputDto>> {
    return this.http.get<Array<RoleOutputDto>>("roles");
  }
}
