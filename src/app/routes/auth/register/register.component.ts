import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { _HttpClient, I18nPipe } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { finalize } from 'rxjs';
import { SharedModule } from '../../../shared';
import { NotyfService } from '../../../services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule, I18nPipe, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly router = inject(Router);
  private readonly http = inject(_HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly notifyService = inject(NotyfService);

  // #region fields

  form = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6), RegisterComponent.checkPassword.bind(this)]],
  });

  error = '';
  loading = false;
  visible = false;
  status = 'pool';
  progress = 0;
  passwordProgressMap: { [key: string]: 'success' | 'normal' | 'exception' } = {
    ok: 'success',
    pass: 'normal',
    pool: 'exception'
  };

  // #endregion

  static checkPassword(control: FormControl): NzSafeAny {
    if (!control) return null;

    const self: NzSafeAny = this;

    self.visible = !!control.value;
    if (control.value && control.value.length > 9) {
      self.status = 'ok';
    }
    else if (control.value && control.value.length > 5) {
      self.status = 'pass';
    }
    else {
      self.status = 'pool';
    }

    if (self.visible) {
      self.progress = control.value.length * 10 > 10 ? 100 : control.value.length * 10;
    }
  }

  submit(): void {
    this.error = '';
    Object.keys(this.form.controls).forEach(key => {
      const control = (this.form.controls as NzSafeAny)[key] as AbstractControl;
      control.markAsDirty();
      control.updateValueAndValidity();
    });
    if (this.form.invalid) return;

    const data = this.form.value;
    this.loading = true;
    this.cdr.detectChanges();
    this.http.post('/api/v1/User', {
      username: data.username,
      email: data.email,
      password: data.password,
      isActive: true,
    }).pipe(finalize(() => {
      this.loading = false;
      this.cdr.detectChanges();
    })).subscribe({
      next: res => {
        //Clear routing reuse information
        this.notifyService.success("Registered successfully");
        this.form.reset();
      },
      error: err => {
        this.error = err?.error?.errors[0] ?? '';
        this.cdr.detectChanges();
      }
    });
  }
}
