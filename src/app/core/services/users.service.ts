import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SignInInputDto } from "../../shared/models/input/sign-in-input-dto";

import { SignUpInputDto } from "../../shared/models/input/sign-up-input-dto";
import { SignInOutputDto } from "../../shared/models/output/user/sign-in-output-dto";
import { SignUpOutputDto } from "../../shared/models/output/user/sign-up-output-dto";
import { UserOutputDto } from "../../shared/models/output/user/user-output-dto";

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) { }

  signUp(signUpInputDto: SignUpInputDto): Observable<SignUpOutputDto> {
    return this.http.post<SignUpOutputDto>("users/sign-up", signUpInputDto);
  }
  signIn(signInInputDto: SignInInputDto): Observable<SignInOutputDto> {
    return this.http.post<SignInOutputDto>("users/sign-in", signInInputDto);
  }
  readById(id: number): Observable<UserOutputDto> {
    return this.http.get<UserOutputDto>(`users/${id}`);
  }
}
