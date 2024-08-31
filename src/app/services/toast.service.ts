import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject: BehaviorSubject<Toast[]> = new BehaviorSubject<Toast[]>([]);

  getToasts(): Observable<Toast[]> {
    return this.toastsSubject.asObservable();
  }

  addToast(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    const toast: Toast = {
      id: Date.now(),
      message,
      type,
    };
    const toasts = [...this.toastsSubject.value, toast];
    this.toastsSubject.next(toasts);

    setTimeout(() => this.removeToast(toast.id), 6500);
  }

  removeToast(id: number): void {
    const toasts = this.toastsSubject.value.filter((toast: Toast) => toast.id !== id);
    this.toastsSubject.next(toasts);
  }
}
