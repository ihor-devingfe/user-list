import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractUserApi, PaginationParams, UserDto } from '../api';

export abstract class AbstractUserRepository {
  protected api: AbstractUserApi = inject(AbstractUserApi);

  abstract createUser(user: UserDto): Observable<string>;

  abstract getUsers(paginationParams: PaginationParams): Observable<UserDto[]>;

  abstract getUser(username: string): Observable<UserDto>;

  abstract updateUser(user: UserDto): Observable<string>;

  abstract deleteUser(username: string): Observable<string>;
}
