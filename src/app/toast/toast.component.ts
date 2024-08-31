import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { Toast } from '../types';

@Component({
  standalone: true,
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  imports: [
    NgClass,
    AsyncPipe,
    NgTemplateOutlet,
  ],
})
export class ToastComponent implements OnInit {
  errorToasts$!: Observable<Toast[]>;
  successToasts$!: Observable<Toast[]>;

  private toastService: ToastService = inject(ToastService);

  ngOnInit(): void {
    this.errorToasts$ = this.toastService.getToasts().pipe(
      map((toasts: Toast[]) => toasts.filter(({ type }: Toast) => type === 'error')),
    );

    this.successToasts$ = this.toastService.getToasts().pipe(
      map((toasts: Toast[]) => toasts.filter(({ type }: Toast) => type !== 'error')),
    );
  }
}
