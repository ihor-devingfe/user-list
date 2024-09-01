import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UsersTableComponent } from './components/users-page/components/users-table/users-table.component';

@Component({
  selector: 'ul-page',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    AsyncPipe,
    UsersTableComponent,
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent {
}
