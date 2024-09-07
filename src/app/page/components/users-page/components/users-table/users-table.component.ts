import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { UserDto } from '../../../../../api';

@Component({
  selector: 'ul-users-table',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableComponent {
  users: InputSignal<UserDto[]> = input.required<UserDto[]>();

  protected route: ActivatedRoute = inject(ActivatedRoute);
}
