import { ChangeDetectionStrategy, Component, inject, Signal, viewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { UserDto } from '../../../../../api';
import { UserService } from '../../../../../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'ul-create-user',
  standalone: true,
  imports: [
    RouterLink,
    UserFormComponent,
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUserComponent {
  private userForm: Signal<UserFormComponent> = viewChild.required(UserFormComponent);

  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private userService: UserService = inject(UserService);

  protected onSave(user: UserDto): void {
    this.userService.createUser(user).pipe(
      tap(() => this.close()),
      catchError((error: unknown) => {
        if (Array.isArray(error)) {
          this.userForm().setValidationErrors(error);
        } else {
          console.log(error);
        }

        return EMPTY;
      }),
    ).subscribe();
  }

  protected close(): void {
    this.router.navigate([{ outlets: { details: null } }], { relativeTo: this.route.parent });
  }
}
