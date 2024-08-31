import { Observable } from 'rxjs';
import { PaginationParams, UserDto } from './types';

export abstract class AbstractUserApi {
  abstract createUser(user: UserDto): Observable<string>;

  abstract getUsers(paginationParams: PaginationParams): Observable<UserDto[]>;

  abstract getUser(username: string): Observable<UserDto>;

  abstract updateUser(user: UserDto): Observable<string>;

  abstract deleteUser(username: string): Observable<string>;
}
