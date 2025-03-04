import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared';
import { map, startWith } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProfileState } from '../../../reducers';
import { ProfileActions } from '../../../core/action';
import { InformationProfileComponent } from "./widgets/information.component";
import { ActivityComponent } from "./widgets/activity.component";
import { MemberComponent } from "./widgets/member.component";
import { AboutComponent } from './widgets/about.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    SharedModule,
    InformationProfileComponent,
    ActivityComponent,
    AboutComponent,
    MemberComponent
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  isColorPickerVisible: boolean = false;
  isEditing: boolean = false;
  editedProfile: any = {};

  loading$ = this.store.select((state) => state.profile.loading);
  profile$ = this.store.select((state) => state.profile.profile).pipe(
    map(profile => {
      if (!profile) {
        return {
          userId: '0000-0000-0000-0000-0000',
          isActive: true,
          userName: 'Guest',
          email: 'guest@example.com',
          avatar: 'https://static-resource.np.community.playstation.net/avatar_m/WWS_J/J0001_m.png',
          background: '#000000',
          fullName: 'Guest',
          position: 'Guest',
          mobile: '0123456789',
          hiringDate: '01-01-1990',
          ssn: 0,
          address: '',
          role: 'guest'
        }
      }

      return {
        userId: profile.userId,
        isActive: profile.isActive,
        userName: profile.userName,
        email: profile.email,
        avatar: profile.avatar,
        background: profile.background,
        fullName: profile.physician ? profile.physician.name : profile.nurse ? profile.nurse.name : '',
        position: profile.physician ? profile.physician.position : profile.nurse ? profile.nurse.position : '',
        mobile: profile.physician ? profile.physician.mobile : profile.nurse ? profile.nurse.mobile : '',
        hiringDate: profile.physician ? profile.physician.hiringDate : profile.nurse ? profile.nurse.hiringDate : '',
        ssn: profile.physician ? profile.physician.ssn : profile.nurse ? profile.nurse.ssn : 0,
        address: profile.nurse ? profile.nurse.address : '',
        role: profile.nurse ? 'nurse' : profile.physician ? 'physician' : 'guest'
      }
    }),
    startWith({
      userId: '0000-0000-0000-0000-0000',
      isActive: true,
      userName: 'Guest',
      email: 'guest@example.com',
      avatar: 'https://static-resource.np.community.playstation.net/avatar_m/WWS_J/J0001_m.png',
      background: '#000000',
      fullName: 'Guest',
      position: 'Guest',
      mobile: '0123456789',
      hiringDate: '01-01-1990',
      ssn: 0,
      address: '',
      role: ''
    }) // Initial value
  );

  toggleColorPicker() {
    this.isColorPickerVisible = !this.isColorPickerVisible;
  }

  onColorChange(color: string) {
    this.editedProfile.background = color;
    this.isColorPickerVisible = false; // Ẩn bảng chọn màu sau khi chọn
  }

  onEdit() {
    this.isEditing = true;
  }

  handleSave() {
    this.store.dispatch(ProfileActions.updateProfile({ profile: this.editedProfile }));
  }

  reload(): void {
    this.store.dispatch(ProfileActions.loadProfile());
  }

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
        this.editedProfile.background = base64String;
      };
    }
  }

  constructor(private store: Store<{ profile: ProfileState }>) { }

  ngOnInit(): void {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      this.store.dispatch(ProfileActions.loadProfileSuccess({ profile: JSON.parse(storedProfile) }));
    } else {
      this.store.dispatch(ProfileActions.loadProfile());
    }

    this.profile$.subscribe(profile => {
      this.editedProfile = { ...profile };
    });

    this.loading$.subscribe(loading => {
      if (!loading) {
        this.isEditing = false;
      }
    });
  }
}
