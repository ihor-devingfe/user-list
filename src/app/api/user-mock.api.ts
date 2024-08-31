import { Injectable } from '@angular/core';
import { validate, ValidationError } from 'class-validator';
import { from, map, Observable, of, switchMap, throwError } from 'rxjs';
import { AbstractUserApi } from './abstract-user.api';
import { PaginationParams, UserDto, UserModel } from './types';
import { getUsers, updateUsers } from './users';

@Injectable({
  providedIn: 'root',
})
export class UserMockApi extends AbstractUserApi {
  override createUser(user: UserDto): Observable<string> {
    return from(validate(UserModel.fromDto(user))).pipe(
      switchMap((validationErrors: ValidationError[]) => {
        if (validationErrors.length) {
          return throwError(() => validationErrors);
        }

        updateUsers([...getUsers(), user]);

        return of('User successfully created');
      }),
    );
  }

  override getUsers({ page, size }: PaginationParams): Observable<UserDto[]> {
    const startIndex = (page - 1) * size;
    const paginatedUsers = getUsers().slice(startIndex, startIndex + size);

    return of(paginatedUsers);
  }

  override getUser(username: string): Observable<UserDto> {
    return of(getUsers().find((user: UserDto) => user.username === username) ?? null).pipe(
      switchMap((user: UserDto | null) => {
        return user
          ? of(user)
          : throwError(() => new Error(`User "${username}" not found"}`));
      }),
    );
  }

  override updateUser(userToUpdate: UserDto): Observable<string> {
    const userWithoutUsername = UserModel.fromDto(userToUpdate);
    delete userWithoutUsername.username;

    return from(validate(userWithoutUsername, { skipMissingProperties: true })).pipe(
      switchMap((validationErrors: ValidationError[]) => {
        if (validationErrors.length) {
          return throwError(() => validationErrors);
        }

        updateUsers(
          getUsers().map((user: UserDto) => {
            return user.username === userToUpdate.username
              ? { ...user, ...userToUpdate }
              : user;
          }),
        );

        return of('User successfully updated');
      }),
    );
  }

  override deleteUser(username: string): Observable<string> {
    return of(getUsers()).pipe(
      map((users: UserDto[]) => {
        updateUsers(users.filter((user: UserDto) => user.username !== username));

        return 'User successfully deleted';
      }),
    );
  }
}
