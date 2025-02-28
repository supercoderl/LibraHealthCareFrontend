import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SharedModule } from "../../shared";

@Component({
    selector: 'app-color-picker',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
    <div class="color-picker-container">
        <input 
            [style.background]="selectedColor" 
            [(colorPicker)]="selectedColor"
            (colorPickerChange)="onColorChange($event)"
            [cpOKButton]="true"
            [cpOKButtonText]="'Select'"
            [cpCancelButton]="true"
            [cpSaveClickOutside]="false"
            [cpDisableInput]="false"
            [cpAlphaChannel]="'disabled'" 
            [cpOutputFormat]="'hex'"
            [cpPresetColors]="presetColors"
            [cpAddColorButton]="true" 
        />
    </div>
    `,
    styles: `
    input {
        width: 150px;
        margin-bottom: 16px;
    }

    .cmyk-text {
        float: left;

        width: 72px;
        height: 72px;

        font-weight: bolder;
        line-height: 72px;
        text-align: center;
        text-shadow: 1px 1px 2px #bbb;
    }

    .color-box {
        width: 100px;
        height: 25px;
        margin: 16px auto;

        cursor: pointer;
    }

    .change-me {
        cursor: pointer;
        font-size: 30px;
        font-weight: bolder;
    }
    `
})
export class ColorPickerComponent {
    @Input() selectedColor: string = '#000000';
    @Output() selectedColorChange = new EventEmitter<string>();

    public colorList = [
        { key: "flame", value: "#e45a33", friendlyName: "Flame" },
        { key: "orange", value: "#fa761e", friendlyName: "Orange" },
        { key: "infrared", value: "#ef486e", friendlyName: "Infrared" },
        { key: "male", value: "#4488ff", friendlyName: "Male Color" },
        { key: "female", value: "#ff44aa", friendlyName: "Female Color" },
        { key: "paleyellow", value: "#ffd165", friendlyName: "Pale Yellow" },
        { key: "gargoylegas", value: "#fde84e", friendlyName: "Gargoyle Gas" },
        { key: "androidgreen", value: "#9ac53e", friendlyName: "Android Green" },
        { key: "carribeangreen", value: "#05d59e", friendlyName: "Carribean Green" },
        { key: "bluejeans", value: "#5bbfea", friendlyName: "Blue Jeans" },
        { key: "cyancornflower", value: "#1089b1", friendlyName: "Cyan Cornflower" },
        { key: "warmblack", value: "#06394a", friendlyName: "Warm Black" },
    ];

    public presetColors: string[] = this.colorList.map(c => c.value);

    public onColorChange(color: string) {
        this.selectedColor = color;
        this.selectedColorChange.emit(color);
    }
}