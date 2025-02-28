import { Component, Input } from "@angular/core";
import { SharedModule } from "../../../../../shared";
import { FormGroup } from "@angular/forms";
import { DefaultInputComponent } from "../../../../../components/inputs/default/default.component";

@Component({
    selector: 'edit-role',
    standalone: true,
    imports: [
    SharedModule,
    DefaultInputComponent
],
    template: `
        <form nz-form [formGroup]="form">
            <div
              class="w-full relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:-mx-1 sm:pl-1"
              [class.filled]="form.value && form.value.code !== 1"
            >
              <libra-input
                text="Code"
                [args]="{
                  id: 'code',
                  name: 'code',
                  type: 'number',
                  formControlName: 'code'
                }"
              />
            </div>
            <div
              class="w-full relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:-mx-1 sm:pl-1"
              [class.filled]="form.value && form.value.name?.trim()"
            >
              <libra-input
                text="Name"
                [args]="{
                  id: 'name',
                  name: 'name',
                  type: 'text',
                  formControlName: 'name'
                }"
              />
            </div>
        </form>
    `
})

export class EditRoleComponent {
    @Input() form!: FormGroup;
}