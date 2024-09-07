import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'ul-users-header',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './users-header.component.html',
  styleUrl: './users-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersHeaderComponent {
  protected route: ActivatedRoute = inject(ActivatedRoute);
}
