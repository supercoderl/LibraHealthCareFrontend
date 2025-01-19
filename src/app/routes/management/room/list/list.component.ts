import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { DefaultInputComponent } from '../../../../components/inputs/default/default.component';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpContext } from '@angular/common/http';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { delay, finalize } from 'rxjs';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { _HttpClient } from '@delon/theme';
import { OptionalService } from '../../../../services';
import { Block, Room } from '../../../../types';
import { DefaultSelectComponent } from '../../../../components/selects/default/default.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    SharedModule,
    DefaultInputComponent,
    DefaultSelectComponent
  ],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  checked = false;
  indeterminate = false;
  rooms: Room[] = [];
  roomNum: number = 0;
  modalTitle: 'Add' | 'Edit' = 'Add';
  blocks: { value: number, label: string }[] = [];
  setOfCheckedId = new Set<number>();
  error = '';
  loading = false;

  private cdr = inject(ChangeDetectorRef);
  private http = inject(_HttpClient);
  private readonly reuseTabService = inject(ReuseTabService, { optional: true });

  constructor(private optionalService: OptionalService) { }

  form = inject(FormBuilder).nonNullable.group({
    roomType: ['', [Validators.required]],
    blockId: [0, [Validators.required]],
    unavailable: [0, [Validators.required]]
  });

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: any): void {
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void { }

  isVisible = false;

  showModal(type: 'Add' | 'Edit', room?: Room | null): void {
    this.isVisible = true;
    this.modalTitle = type;
    if (room) {
      this.roomNum = room.roomNum;
      this.form.setValue({
        roomType: room.roomType,
        blockId: room.blockId,
        unavailable: Number(room.unavailable)
      });
    }
  }

  onGet(): void {
    this.loading = true;
    this.http.get('/api/v1/Room')
      .pipe(
        delay(600),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.rooms = res?.data?.items ?? [];
      });
  };

  handleOk(): void {
    this.error = '';
    const { roomType } = this.form.controls;
    roomType.markAsDirty();
    roomType.updateValueAndValidity();
    if (roomType.invalid) return;

    this.loading = true;
    this.cdr.detectChanges();

    const httpMethod = (url: string, body: any, options: any) =>
      this.modalTitle === 'Edit' ? this.http.put(url, body, options) : this.http.post(url, body, options);

    const requestBody: any = {
      roomType: this.form.value.roomType,
      blockId: this.form.value.blockId,
      unavailable: Boolean(this.form.value.unavailable)
    };

    if (this.modalTitle === 'Edit') {
      requestBody['roomNum'] = this.roomNum;
    }

    httpMethod('/api/v1/Room', requestBody, {
      context: new HttpContext().set(ALLOW_ANONYMOUS, true)
    }).pipe(finalize(() => {
      this.loading = false;
      this.cdr.detectChanges();
    })).subscribe({
      next: res => {
        //Clear routing reuse information
        this.reuseTabService?.clear();
        this.onGet();
        this.isVisible = false;
        this.form.reset();
      },
      error: err => {
        this.error = err?.error?.errors[0] ?? '';
        this.cdr.detectChanges();
      }
    });
  }

  handleCancel(): void {
    this.form.reset();
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.onGet();

    this.optionalService
      .getData('/api/v1/Block')
      .subscribe((res: any) => {
        if (res?.data?.items && res?.data?.items.length > 0)
          this.blocks = res?.data?.items.map((e: Block) => ({ value: e.blockId, label: e.blockCode }));
      });
  }
}
