import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SignInInputDto } from "../../shared/models/input/sign-in-input-dto";

import { SignUpInputDto } from "../../shared/models/input/sign-up-input-dto";
import { UserInputDto } from "../../shared/models/input/user-input-dto";
import { SignInOutputDto } from "../../shared/models/output/users/sign-in-output-dto";
import { SignUpOutputDto } from "../../shared/models/output/users/sign-up-output-dto";
import { UserOutputDto } from "../../shared/models/output/users/user-output-dto";
import { UserPageableOutputDto } from "../../shared/models/output/users/user-pageable-output-dto";

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
  readAllByOrderByUsername(page: number): Observable<UserPageableOutputDto> {
    return this.http.get<UserPageableOutputDto>("users", {
      params: {
        page: page
      }
    });
  }
  readAllByUsernameContainsOrderByUsername(username: string, page: number): Observable<UserPageableOutputDto> {
    return this.http.get<UserPageableOutputDto>("users/username-contains", {
      params: {
        value: username,
        page: page
      }
    });
  }
  readById(id: number): Observable<UserOutputDto> {
    return this.http.get<UserOutputDto>(`users/${id}`);
  }
  update(id: number, userInputDto: UserInputDto): Observable<UserOutputDto> {
    return this.http.put<UserOutputDto>(`users/${id}`, userInputDto);
  }
  updatePassword(id: number, userInputDto: UserInputDto): Observable<void> {
    return this.http.put<void>(`users/${id}/password`, userInputDto);
  }
  blockOrUnblock(id: number): Observable<void> {
    return this.http.put<void>(`users/${id}/block-or-unblock`, null);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`users/${id}`);
  }
}
