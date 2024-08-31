import { Observable } from 'rxjs';
import { PaginationParams, UserDto } from '../api';
import { AbstractUserRepository } from './abstract-user.repository';

export class UserRepository extends AbstractUserRepository {
  override createUser(user: UserDto): Observable<string> {
    return this.api.createUser(user);
  }

  override getUsers(paginationParams: PaginationParams): Observable<UserDto[]> {
    return this.api.getUsers(paginationParams);
  }

  override getUser(username: string): Observable<UserDto> {
    return this.api.getUser(username);
  }

  override updateUser(user: UserDto): Observable<string> {
    return this.api.updateUser(user);
  }

  override deleteUser(username: string): Observable<string> {
    return this.api.deleteUser(username);
  }
}
