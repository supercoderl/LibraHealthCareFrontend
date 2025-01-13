import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { DiagnosisProcess } from "./widgets/process.component";
import { DiagnosisInformation } from "./widgets/information.component";
import { DiagnosisSymtom } from "./widgets/symtom.component";
import { SharedModule } from '../../../shared';
import { DiagnosisResult } from "./widgets/result.component";
import { DiagnosisSkeleton } from "../../../components/skeletons/diagnosis";

@Component({
  selector: 'app-diagnosis',
  standalone: true,
  imports: [
    SharedModule,
    DiagnosisProcess,
    DiagnosisInformation,
    DiagnosisSymtom,
    DiagnosisResult,
    DiagnosisSkeleton
],
  templateUrl: './diagnosis.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DiagnosisComponent {
  stage: number = 1;
  loading: boolean = false;

  private readonly cdr = inject(ChangeDetectorRef);

  onNextClick = (): void => {
    this.stage++;
    this.cdr.detectChanges();
  }

  onPreviousClick = (): void => {
    this.stage--;
    this.cdr.detectChanges();
  }

  onSubmit = (): void => {
    this.loading = true;
    this.stage++;
    this.cdr.markForCheck();
    setTimeout(() => {
      this.loading = false;
      this.cdr.markForCheck();
    }, 3000);
  }
}
