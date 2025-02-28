import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { SharedModule } from "../../shared";

@Component({
    selector: 'upload-file',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <div 
            id="dropZoon" 
            class="relative h-[11.25rem] w-[11.25rem] flex justify-center items-center flex-col border-2 border-solid border-[rgb(171,_202,_255)] rounded-[15px] cursor-pointer transition-all duration-300 hover-border-[rgb(63,_134,_255)] drop-zoon"
            (click)="handleClick()"
        >
            <span class="flex text-[3.75rem] text-[rgb(63,_134,_255)] transition-opacity duration-300">
                <i class='bx bxs-file-image'></i>
            </span>
            <p 
                class="text-[0.9375rem] text-[rgb(171,_202,_255)] m-0 mt-[0.625rem] transition-opacity duration-300 text-center"
                *ngIf="!imageBase64 || imageBase64.length <= 0"
            >
                Click to browse
            </p>
            <span id="loadingText" class="absolute top-1/2 left-1/2 -translate-1/2 hidden ext-[rgb(171,_202,_255)] z-10">Please Wait</span>
            <img 
                [src]="imageBase64"
                *ngIf="imageBase64 && imageBase64.length > 0"
                alt="Preview Image" 
                id="previewImage" 
                class="absolute top-0 left-0 w-full h-full object-contain p-[0.3125rem] rounded-[10px] z-100 transition-opacity duration-300" 
                draggable="false"
            >

            <input 
                #fileInput
                type="file" 
                id="avatar" 
                name="avatar"
                class="!hidden" 
                accept="image/*"
                (change)="onFileSelected($event)"
            />
        </div>
    `
})

export class UploadFileComponent implements OnInit {
    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
    @Input() args: { [key: string]: any } = {};
    imageBase64: string | null = null;

    handleClick(): void {
        this.fileInput.nativeElement.click();
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];

            const reader = new FileReader();
            reader.readAsDataURL(file); // Convert file to base64

            reader.onload = () => {
                const base64String = reader.result as string;

                const controlName = this.args['formControlName'];
                const formGroup = this.args['formGroup'];

                if (formGroup && controlName) {
                    const control = formGroup.controls[controlName];

                    if (control) {
                        control.setValue(base64String);
                        this.imageBase64 = base64String;
                    }
                }
            };
        }
    }

    updateImagePreview() {
        const controlName = this.args['formControlName'];
        const formGroup = this.args['formGroup'];

        if (formGroup && controlName) {
            const control = formGroup.controls[controlName];

            if(control)
            {
                this.imageBase64 = control.value;
            }
        }
    }

    ngOnInit(): void {
        this.updateImagePreview(); // Update image when init
    }
}