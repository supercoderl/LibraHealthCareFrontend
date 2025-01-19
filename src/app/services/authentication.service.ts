import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLoggedIn: boolean = false;
    private tokenService = inject(DA_SERVICE_TOKEN);
    private router = inject(Router);

    constructor(private modalService: NzModalService) { }

    // Kiểm tra trạng thái đăng nhập
    checkAuthentication(): boolean {
        const token = this.tokenService.get()?.token;
        return token ? true : this.isLoggedIn;
    }

    // Show modal confirm
    showLoginConfirm(): void {
        this.modalService.confirm({
            nzTitle: 'Authentication Required',
            nzContent: 'You must login or register first to use this function!',
            nzOkText: 'OK',
            nzCancelText: null,
            nzClosable: false,
            nzOnOk: () => {
                // Navigate to login page
                window.location.href = '/auth/login';
            }
        });
    }

    // Utility function to check 
    requireAuthentication(): boolean {
        if (!this.checkAuthentication()) {
            this.showLoginConfirm();
            return false;
        }
        return true;
    }

    // Set login status
    setLoginStatus(status: boolean): void {
        this.isLoggedIn = status;
    }
}
