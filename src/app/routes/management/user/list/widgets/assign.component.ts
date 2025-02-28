import { Component, inject, Input, OnInit } from "@angular/core";
import { SharedModule } from "../../../../../shared";
import { FormGroup } from "@angular/forms";
import { DefaultSelectComponent } from "../../../../../components/selects/default/default.component";
import { OptionalService } from "../../../../../services";
import { Role } from "../../../../../types";

@Component({
    selector: 'assign-user',
    standalone: true,
    imports: [
        SharedModule,
        DefaultSelectComponent
    ],
    template: `
        <form nz-form [formGroup]="form">
            <div
              class="filled w-full relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:-mx-1 sm:pl-1"
            >
              <libra-select
                text="Roles"
                [args]="{
                  id: 'roles',
                  name: 'roles',
                  formControlName: 'roles',
                  formGroup: form
                }"
                [options]="roles"
                [isMultiple]="true"
              />
            </div>
        </form>
    `
})

export class AssignUserComponent implements OnInit {
    @Input() form!: FormGroup;
    roles: { value: number, label: string }[] = [];

    private readonly optionalService = inject(OptionalService);

    ngOnInit(): void {
        this.optionalService
            .getData('/api/v1/Role')
            .subscribe((res: any) => {
                if (res?.data?.items && res?.data?.items.length > 0)
                    this.roles = res?.data?.items.map((e: Role) => ({ value: e.code, label: e.name }));
            });
    }
}