import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ul-about-page',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {

}
