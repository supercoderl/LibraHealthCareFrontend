import { Component, Input } from "@angular/core";
import { SharedModule } from "../../../../../shared";
import { FormGroup } from "@angular/forms";
import { DefaultInputComponent } from "../../../../../components/inputs/default/default.component";
import { DefaultSelectComponent } from "../../../../../components/selects/default/default.component";
import { UploadFileComponent } from "../../../../../components/images/upload.component";

@Component({
  selector: 'edit-user',
  standalone: true,
  imports: [
    SharedModule,
    DefaultInputComponent,
    DefaultSelectComponent,
    UploadFileComponent
  ],
  template: `
        <form nz-form [formGroup]="form">
            <div
              class="w-full relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:-mx-1 sm:pl-1"
              [class.filled]="form.value && form.value.userName?.trim()"
            >
              <libra-input
                text="UserName"
                [args]="{
                  id: 'userName',
                  name: 'userName',
                  type: 'text',
                  formControlName: 'userName'
                }"
              />
            </div>
            <div
              class="w-full relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:-mx-1 sm:pl-1"
              [class.filled]="form.value && form.value.email?.trim()"
            >
              <libra-input
                text="Email"
                [args]="{
                  id: 'email',
                  name: 'email',
                  type: 'email',
                  formControlName: 'email'
                }"
              />
            </div>
            <div
              class="filled w-full relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:-mx-1 sm:pl-1"
            >
              <libra-select
                text="Is Active?"
                [args]="{
                  id: 'isActive',
                  name: 'isActive',
                  formControlName: 'isActive',
                  formGroup: form
                }"
                [options]="[
                  { value: 0, label: 'No' },
                  { value: 1, label: 'Yes' }
                ]"
              />
            </div>
            <div
              class="w-full relative input-component mb-5 empty sm:inline-block mt-2 sm:-mx-1 sm:pl-1"
              [class.filled]=""
            >
              <upload-file
                [args]="{
                  id: 'avatar',
                  name: 'avatar',
                  formControlName: 'avatar',
                  formGroup: form
                }"
              />
            </div>
        </form>
    `
})

export class EditUserComponent {
  @Input() form!: FormGroup;
}