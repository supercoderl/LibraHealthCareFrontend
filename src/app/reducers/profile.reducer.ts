import { createReducer, on } from "@ngrx/store";
import { User } from "../types";
import { ProfileActions } from "../core/action";

export interface ProfileState {
  profile: User | null;
  loading: boolean;
  error: any;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null
};

export const profileReducer = createReducer(
  initialState,
  on(ProfileActions.loadProfile, (state) => ({ ...state, loading: true })),
  on(ProfileActions.loadProfileSuccess, (state, { profile }) => ({ ...state, profile, loading: false })),
  on(ProfileActions.updateProfile, (state) => ({ ...state, loading: true })),
  on(ProfileActions.updateProfileSuccess, (state, { profile }) => ({ ...state, profile, loading: false })),
  on(ProfileActions.updateProfileFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(ProfileActions.clearProfile, () => ({ profile: null, error: null, loading: false }))
);
