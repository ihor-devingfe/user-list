import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable, startWith, switchMap } from 'rxjs';
import { UserDto } from '../../../api';
import { UserService } from '../../../services/user.service';
import { UsersTableComponent } from './components/users-table/users-table.component';

@Component({
  selector: 'ul-users-page',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    RouterLinkActive,
    RouterLink,
    RouterOutlet,
    UsersTableComponent,
  ],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPageComponent implements OnInit {
  users$!: Observable<UserDto[]>;

  protected route: ActivatedRoute = inject(ActivatedRoute);
  private userService: UserService = inject(UserService);

  ngOnInit(): void {
    this.users$ = this.userService.getUsersUpdate().pipe(
      startWith(null),
      switchMap(() => this.userService.getUsers({ page: 1, size: 10 })),
    );
  }
}
