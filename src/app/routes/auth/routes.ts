import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AuthComponent } from "../../layout";
import { RegisterComponent } from "./register/register.component";

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {
                path: '', // Route mặc định
                redirectTo: 'login',
                pathMatch: 'full',
            },
            {
                path: 'login',
                component: LoginComponent,
                data: { title: "Login", titleI18n: 'app.login.login' }
            },
            {
                path: 'register',
                component: RegisterComponent,
                data: { title: "Register", titleI18n: 'app.register.register' }
            }
        ]
    }
]