import { Component, Input } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { Question } from "../../../../types";

@Component({
    selector: 'diagnosis-symtom',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <fieldset
            class="symtom-field bg-white border-0 rounded-3 shadow-diagnosis py-5 px-4 md:px-7.5 border-t-2.2 border-solid border-primary w-9/20 md:w-4/5 md:ml-1/40 absolute left-1/2 md:left-auto"
            [ngClass]="stage === currentStage ? '-translate-x-1/2 md:translate-x-0 opacity-100' : 'translate-x-max opacity-0'"
        >
            <h2 class="uppercase mb-1.25 text-primary text-18 text-center">
                Check your symtoms
            </h2>
            <h3 class="font-normal text-13 text-secondary mb-5 text-center">
                Choose what feels right to you
            </h3>

            <!-- Begin Total Number of Donors in Year 1 Field -->
            <ul class="p-0 m-0">
                <li class="flex items-center relative" *ngFor="let question of questions">
                    <fieldset
                        [id]="question.questionId.toString()"
                        class="border-b border-solid border-border m-0 flex flex-wrap gap-6 items-start flex-1 justify-between px-0 md:px-3 p-3 hover:bg-border transition-all duration-300"
                    >
                        <div class="flex md:flex-col w-full md:w-auto items-start justify-between gap-2">
                            <span class="text-[#1F262C] font-bold md:font-normal">{{question.question}}</span>
                            <button
                                class="align-start whitespace-normal gap-1 bg-transparent items-center inline-flex relative"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 48 48"
                                    role="img"
                                    class="fill-primary h-6 w-6"
                                >
                                    <path d="M26 14v4h-4v-4zm0 20V22h-4v12zm0 0"></path>
                                    <path
                                    fill-rule="evenodd"
                                    d="M24 44c11.047 0 20-8.953 20-20S35.047 4 24 4 4 12.953 4 24s8.953 20 20 20m0-4c8.836 0 16-7.164 16-16S32.836 8 24 8 8 15.164 8 24s7.164 16 16 16m0 0"
                                    ></path>
                                </svg>
                                <span class="text-secondary hidden md:block">What does it mean?</span>
                            </button>
                        </div>
                        <div class="gap-2 flex flex-[0_1_0%] flex-col">
                            <ul class="flex gap-6 whitespace-nowrap m-0 p-0">
                                <li class="flex items-center border-none relative" *ngFor="let num of [0, 1]">
                                    <label
                                        class="flex items-start gap-3 justify-start"
                                        [for]="'result-' + question.questionId + '-' + num"
                                    >
                                        <input
                                            [id]="'result-' + question.questionId + '-' + num"
                                            type="radio"
                                            class="overflow-hidden absolute w-px h-px whitespace-nowrap"
                                            [name]="'answer-' + question.questionId"
                                            [value]="num"
                                            (change)="onAnswerChange(question.questionId, num, question.symtoms)"
                                        />
                                        <div
                                            class="cursor-pointer flex items-center bg-white border border-solid border-primary flex-0 m-0.5 relative w-5 h-5 rounded-full"
                                        >
                                            <div
                                                [ngClass]="{
                                                    'invisible': !isSelected(question.questionId, num),
                                                    'visible': isSelected(question.questionId, num)
                                                }"
                                                class="bg-primary rounded-full invisible h-2.5 w-2.5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                            ></div>
                                        </div>
                                        <span class="text-[#1F262C]">{{num == 0 ? 'No' : 'Yes'}}</span>
                                    </label>
                                </li>
                            </ul>
                            <!---->
                        </div>
                        <!---->
                    </fieldset>
                </li>
            </ul>
            <!-- End Calc of Total Number of Donors Fields -->

            <input
                *ngIf="stage > 1"
                type="button"
                data-page="2"
                name="previous"
                class="float-left w-25 font-bold text-primary border-none rounded-px cursor-pointer py-2.5 px-1.25 my-2.5 mt-6 mx-auto transition-all duration-300 block"
                value="Previous"
                (click)="onPreviousClick()"
            />
            <input
                type="button"
                class="outline-none block w-full mb-5 py-2.5 px-4 border border-solid border-[#d9d9d9] rounded-3 text-[#837E7E] transition-all duration-300"
                data-page="2"
                name="next"
                class="float-right w-25 bg-primary font-bold text-white border-none rounded-px cursor-pointer py-2.5 px-1.25 my-2.5 mx-auto transition-all duration-300 block"
                value="Next"
                (click)="stage === finalStage ? onSubmitClick() : onNextClick()"
            />
        </fieldset>
    `,
    styles: `
        .symtom-field {
            transition: opacity 0.5s ease 0s, transform 0.5s ease 0.3s;
        }
    `
})

export class DiagnosisSymtom {
    @Input()
    questions!: Question[];
    
    @Input()
    stage!: number;

    @Input()
    onNextClick!: () => void;

    @Input()
    onPreviousClick!: () => void;

    @Input()
    onSubmitClick!: () => void;

    @Input()
    onAnswerChange!: (questionId: number, answer: number, symtoms: number[]) => void;

    @Input()
    isSelected!: (questionId: number, answer: number) => boolean;

    @Input() 
    currentStage!: number;

    @Input()
    finalStage!: number;
}