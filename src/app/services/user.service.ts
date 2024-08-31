import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, Subject, tap, throwError } from 'rxjs';
import { PaginationParams, UserDto } from '../api';
import { AbstractUserRepository } from '../repositories';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private repository: AbstractUserRepository = inject(AbstractUserRepository);
  private toastService: ToastService = inject(ToastService);
  private usersUpdated: Subject<void> = new Subject<void>();

  getUsersUpdate(): Observable<void> {
    return this.usersUpdated.asObservable();
  }

  createUser(user: UserDto): Observable<string> {
    return this.repository.createUser(user).pipe(
      tap((message: string) => this.toastService.addToast(message, 'success')),
      tap(() => this.usersUpdated.next()),
      catchError((error: unknown) => {
        this.toastService.addToast('Something went wrong during user creation', 'error');
        console.log(error);

        return throwError(() => error);
      }),
    );
  }

  getUsers(paginationParams: PaginationParams): Observable<UserDto[]> {
    return this.repository.getUsers(paginationParams).pipe(
      catchError((error: unknown) => {
        this.toastService.addToast('Something went wrong during loading users', 'error');
        console.log(error);

        return throwError(() => error);
      }),
    );
  }

  getUserByUsername(username: string): Observable<UserDto> {
    return this.repository.getUser(username).pipe(
      catchError((error: unknown) => {
        this.toastService.addToast('Something went wrong during loading user', 'error');
        console.log(error);

        return throwError(() => error);
      }),
    );
  }

  updateUser(user: UserDto): Observable<string> {
    return this.repository.updateUser(user).pipe(
      tap((message: string) => this.toastService.addToast(message, 'success')),
      tap(() => this.usersUpdated.next()),
      catchError((error: unknown) => {
        this.toastService.addToast('Something went wrong during updating user', 'error');
        console.log(error);

        return throwError(() => error);
      }),
    );
  }

  deleteUser(username: string): Observable<string> {
    return this.repository.deleteUser(username).pipe(
      tap((message: string) => this.toastService.addToast(message, 'success')),
      tap(() => this.usersUpdated.next()),
      catchError((error: unknown) => {
        this.toastService.addToast('Something went wrong during deleting user', 'error');
        console.log(error);

        return EMPTY;
      }),
    );
  }
}
