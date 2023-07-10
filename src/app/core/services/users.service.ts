import { Injectable } from '@angular/core';
import { SignUpOutputDto } from "../../shared/models/output/user/sign-up-output-dto";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { SignUpInputDto } from "../../shared/models/input/user/sign-up-input-dto";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  signUp(signUpInputDto: SignUpInputDto): Observable<SignUpOutputDto> {
    return this.http.post<SignUpOutputDto>("users/sign-up", signUpInputDto);
  }
}
