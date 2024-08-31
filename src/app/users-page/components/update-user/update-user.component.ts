import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { UserDto } from '../../../api';
import { UserService } from '../../../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'ul-update-user',
  standalone: true,
  imports: [
    UserFormComponent,
    RouterLink,
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUserComponent {
  user!: UserDto;

  @Input() set username(value: string | null) {
    if (!value) {
      this.openNotFoundPage();
    } else {
      this.userService.getUserByUsername(value).pipe(
        tap((user: UserDto) => this.user = user),
        catchError(() => {
          this.openNotFoundPage();

          return EMPTY;
        }),
      ).subscribe();
    }
  }

  private userService: UserService = inject(UserService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  protected onDelete(): void {
    this.userService.deleteUser(this.user.username).pipe(
      tap(() => this.close()),
    ).subscribe();
  }

  protected close(): void {
    this.router.navigate([{ outlets: { details: null } }], { relativeTo: this.route.parent });
  }

  private openNotFoundPage(): void {
    this.router.navigate([{ outlets: { details: ['user', 'not-found'] } }], { relativeTo: this.route.parent });
  }

  protected onSave(user: UserDto): void {
    this.userService.updateUser(user).pipe(
      tap(() => this.close()),
    ).subscribe();
  }
}
