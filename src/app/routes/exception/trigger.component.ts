import { Component, inject } from "@angular/core";
import { DA_SERVICE_TOKEN } from "@delon/auth";
import { _HttpClient } from "@delon/theme";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCardModule } from "ng-zorro-antd/card";

@Component({
    selector: 'exception-trigger',
    template: `
        <div ngClass="pt-lg">
      <nz-card>
        @for (t of types; track $index) {
          <button (click)="go(t)" nz-button nzDanger>触发{{ t }}</button>
        }
        <button nz-button nzType="link" (click)="refresh()">触发刷新Token</button>
      </nz-card>
    </div>
    `,
    standalone: true,
    imports: [NzCardModule, NzButtonModule]
})

export class ExceptionTriggerComponent {
    private readonly http = inject(_HttpClient);
    private readonly tokenService = inject(DA_SERVICE_TOKEN);

    types = [401, 403, 404, 500];

    go(type: number): void {
        this.http.get(``).subscribe();
    }

    refresh(): void {
        this.tokenService.set({ token: 'invalid-token' });
        // A backend address must be provided and cannot be simulated through Mock
        this.http.post(``).subscribe({
            next: res => console.warn('Success', res),
            error: err => {
                console.log('The final result failed', err);
            }
        });
    }
}