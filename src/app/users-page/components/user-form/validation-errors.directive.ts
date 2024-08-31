import { Directive, ElementRef, inject, Input, Renderer2 } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[ulValidationErrors]',
  standalone: true,
})
export class ValidationErrorsDirective {
  @Input() set ulValidationErrors(errors: ValidationErrors | null) {
    const text = errors
      ? Object.entries(errors)
        .map(([key, message]) => `${key}: ${message}`)
        .join('; ')
      : '';
    this.renderer.setProperty(this.elementRef.nativeElement, 'textContent', text);
  }

  private elementRef: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);
}
