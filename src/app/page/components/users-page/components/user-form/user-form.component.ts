import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ValidationError } from 'class-validator';
import { UserDto, UserType } from '../../../../../api';
import { passwordMatchValidator } from './password-match.validator';
import { ValidationErrorsDirective } from './validation-errors.directive';

@Component({
  selector: 'ul-user-form',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    NgTemplateOutlet,
    ValidationErrorsDirective,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  @Input() set user(user: UserDto) {
    this.isEditForm = true;
    this.title = `${user.first_name} ${user.last_name}`;
    this.form.setValue({ ...user, password: '', repeatPassword: '' });
    this.password.disable();
    this.repeatPassword.disable();
  }

  @Output() protected close: EventEmitter<void> = new EventEmitter();
  @Output() protected delete: EventEmitter<void> = new EventEmitter<void>();
  @Output() protected save: EventEmitter<UserDto> = new EventEmitter<UserDto>();

  protected form: FormGroup = inject(FormBuilder).group({
    username: ['', [Validators.required]],
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    user_type: [null, [Validators.required]],
    password: ['', [Validators.required]],
    repeatPassword: ['', [Validators.required]],
  }, { validators: [passwordMatchValidator()] });

  protected isEditForm: boolean = false;
  protected title: string = 'Create new user';

  setValidationErrors(errors: ValidationError[]): void {
    errors.forEach((error: ValidationError) => {
      this.form.get(error.property)?.setErrors(error.constraints ?? null);
      this.form.get(error.property)?.markAsDirty();
    });
  }

  protected get username(): FormControl {
    return this.form.get('username') as FormControl;
  }

  protected get first_name(): FormControl {
    return this.form.get('first_name') as FormControl;
  }

  protected get last_name(): FormControl {
    return this.form.get('last_name') as FormControl;
  }

  protected get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  protected get user_type(): FormControl {
    return this.form.get('user_type') as FormControl;
  }

  protected get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  protected get repeatPassword(): FormControl {
    return this.form.get('repeatPassword') as FormControl;
  }

  protected get userTypeOption(): typeof UserType {
    return UserType;
  }

  protected onClose(): void {
    this.close.emit();
  }

  protected onSubmit(): void {
    this.save.emit(this.form.value);
  }

  protected onDelete(): void {
    this.delete.emit();
  }
}
