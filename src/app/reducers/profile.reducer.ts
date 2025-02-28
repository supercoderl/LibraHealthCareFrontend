import { createReducer, on } from "@ngrx/store";
import { User } from "../types";
import { ProfileActions } from "../core/action";

export interface ProfileState {
  profile: User | null;
}

const initialState: ProfileState = {
  profile: null,
};

export const profileReducer = createReducer(
  initialState,
  on(ProfileActions.loadProfileSuccess, (state, { profile }) => ({ ...state, profile })),
  on(ProfileActions.updateProfileSuccess, (state, { profile }) => ({ ...state, profile })),
  on(ProfileActions.updateProfileFailure, (state, { error }) => ({ ...state, error })),
  on(ProfileActions.clearProfile, () => ({ profile: null, error: null }))
);
