import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DiagnosisProcess } from "./widgets/process.component";
import { DiagnosisSymtom } from "./widgets/symtom.component";
import { SharedModule } from '../../../shared';
import { DiagnosisResult } from "./widgets/result.component";
import { DiagnosisSkeleton } from "../../../components/skeletons/diagnosis";
import { _HttpClient } from '@delon/theme';
import { delay, finalize } from 'rxjs';
import { Disease, Question, Symtom } from '../../../types';
import { AuthService, NotyfService, OptionalService } from '../../../services';
import { HttpContext } from '@angular/common/http';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { LoginAlert } from '../../../components/alerts/login-alert.component';

@Component({
  selector: 'app-diagnosis',
  standalone: true,
  imports: [
    SharedModule,
    DiagnosisProcess,
    DiagnosisSymtom,
    DiagnosisResult,
    DiagnosisSkeleton,
    LoginAlert
  ],
  templateUrl: './diagnosis.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DiagnosisComponent implements OnInit {
  stage: number = 1;
  loading: boolean = false;
  showModal = false;
  result: Disease | null = null;
  parts: Question[][] = [];
  symtoms: Symtom[] = [];
  answers: { questionId: number; answer: number, symtoms: number[] }[] = [];

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly http = inject(_HttpClient);

  constructor(private optionalService: OptionalService, private notyf: NotyfService, private authService: AuthService) {
    this.onAnswerChange = this.onAnswerChange.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }

  onNextClick = (): void => {
    this.stage++;
    this.cdr.detectChanges();
  }

  onPreviousClick = (): void => {
    this.stage--;
    this.cdr.detectChanges();
  }

  getRequestBody(): Record<string, number> {
    const requestBody: Record<string, number> = {};

    const activeSymptomIds = new Set<number>();
    this.answers.forEach((answer) => {
      if (answer.answer === 1) {
        answer.symtoms.forEach((id) => activeSymptomIds.add(id));
      }
    });

    // Scan symtom list to set 0 or 1
    this.symtoms.forEach((symptom) => {
      requestBody[symptom.name] = activeSymptomIds.has(symptom.symtomId) ? 1 : 0;
    });

    return requestBody;
  }

  onSubmit = (): void => {
    if (this.answers.length < 50) {
      this.notyf.error("You must tick all symtoms to continue.");
      return;
    }

    const request = this.getRequestBody();
    this.loading = true;
    this.stage++;
    this.cdr.markForCheck();

    this.http.post('/api/v1/Prediction', request).pipe(
      delay(600),
      finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })).subscribe({
        next: res => {
          this.result = res?.data;
        },
        error: err => {
          console.log(err);
          this.cdr.detectChanges();
        }
      })
  }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/DiagnosticQuestion', { pageSize: 50 })
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.parts = this.groupQuestionsByPart(res?.data?.items) ?? [];
      });
  };

  groupQuestionsByPart(questions: Question[]): Question[][] {
    // Random question list
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);

    // Get 50 questions
    const selectedQuestions = shuffledQuestions.slice(0, 50);

    // Declare part for them
    const groupedQuestions: Question[][] = [];
    selectedQuestions.forEach((question, index) => {
      const partIndex = Math.floor(index / 5); // Foreach part have 5 questions
      if (!groupedQuestions[partIndex]) {
        groupedQuestions[partIndex] = [];
      }
      groupedQuestions[partIndex].push({ ...question, part: partIndex + 1 });
    });

    return groupedQuestions;
  }

  onAnswerChange(questionId: number, answer: number, symtoms: number[]): void {
    const existingAnswerIndex = this.answers?.findIndex(
      (item) => item.questionId === questionId
    );

    if (existingAnswerIndex !== -1) {
      this.answers[existingAnswerIndex].answer = answer;
    } else {
      this.answers.push({ questionId, answer, symtoms });
    }
  }

  reset() {
    this.stage = 1;
  }

  isSelected(questionId: number, answer: number): boolean {
    const selectedAnswer = this.answers?.find(
      (item) => item.questionId === questionId
    );
    return selectedAnswer ? selectedAnswer.answer === answer : false;
  }

  ngOnInit(): void {
    if (!this.authService.checkAuthentication()) {
      this.showModal = true;
      return;
    }

    this.onGet();

    this.optionalService
      .getData('/api/v1/Symtom')
      .subscribe((res: any) => {
        if (res?.data?.items && res?.data?.items.length > 0)
          this.symtoms = res?.data?.items;
      });
  }
}
