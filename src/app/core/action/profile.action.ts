import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../../types";

export const ProfileActions = createActionGroup({
  source: 'Profile',
  events: {
    'Load Profile': emptyProps(),
    'Load Profile Success': props<{ profile: User | null }>(),
    'Update Profile': props<{ profile: User }>(),
    'Update Profile Success': props<{ profile: User }>(),
    'Refresh Profile': emptyProps(),
    'Update Profile Failure': props<{ error: any }>(),
    'Clear Profile': emptyProps()
  },
});