import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ExceptionModule, ExceptionType } from '@delon/abc/exception';
import { RefreshButton } from "../../components/buttons/refresh.component";

@Component({
    selector: 'app-exception',
    template: `
        <div class="flex h-[calc(100vh-80px)] items-center justify-center p-5 w-full bg-white">
            <div class="text-center">
                <div class="inline-flex rounded-full">
                    <div class="rounded-full w-32 h-32">
                        <img class="w-full" [src]="exceptionInfo.icon" [alt]="exceptionInfo.title" loading="lazy" />
                    </div>
                </div>
                <h1 class="mt-5 mb-0 text-[36px] font-bold text-slate-800 lg:text-[50px]">{{type}} - {{exceptionInfo.title}}</h1>
                <p class="text-slate-600 mt-3 lg:text-lg whitespace-pre-line">{{exceptionInfo.text}}</p>
                <div class="mt-2 w-full flex items-center justify-center">
                    <refresh-btn />
                </div>
            </div>
        </div>    
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ExceptionModule,
        RefreshButton
    ]
})

export class ExceptionComponent {
    private readonly route = inject(ActivatedRoute);

    get type(): ExceptionType {
        return this.route.snapshot.data['type'];
    }

    get exceptionInfo(): any {
        return {
            403: {
                title: 'Unforbidden',
                text: 'You have not permission to access this page. \nIf you want to access, please contact to the administrator.',
                icon: '../../../assets/images/icons/block.png'
            },
            404: {
                title: 'Not Found',
                text: 'Sorry, but the page you are looking for is not found. \nPlease make sure you have typed the current URL.',
                icon: '../../../assets/images/icons/notfound.png'
            },
            500: {
                title: 'Server Error',
                text: 'The server has encountered an internal error. \nPlease wait until we finish fixing it.',
                icon: '../../../assets/images/icons/server.png'
            }
        }[this.type] || 'Unknown type';
    }
}