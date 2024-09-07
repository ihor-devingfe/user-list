import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ul-products-page-page',
  standalone: true,
  imports: [],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsPageComponent {
}
