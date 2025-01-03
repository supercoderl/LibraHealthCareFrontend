import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { DiagnosisProcess } from "./widgets/process.component";
import { DiagnosisInformation } from "./widgets/information.component";
import { DiagnosisSymtom } from "./widgets/symtom.component";
import { SharedModule } from '../../../shared';

@Component({
  selector: 'app-diagnosis',
  standalone: true,
  imports: [
    SharedModule,
    DiagnosisProcess, 
    DiagnosisInformation, 
    DiagnosisSymtom
  ],
  templateUrl: './diagnosis.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DiagnosisComponent {
  stage: number = 1;

  private readonly cdr = inject(ChangeDetectorRef);

  onNextClick = (): void => {
    this.stage++;
    this.cdr.detectChanges();
  }

  onPreviousClick = (): void => {
    this.stage--;
    this.cdr.detectChanges();
  }
}
