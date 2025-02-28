import { Injectable } from "@angular/core";
import { catchError, map, mergeMap, of, switchMap, tap } from "rxjs";
import { ProfileActions } from "../action";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { _HttpClient } from "@delon/theme";
import { User } from "../../types";

@Injectable()
export class ProfileEffects {
    loadProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfileActions.loadProfile),
            mergeMap(() => {
                return this.http.get<{ data: User | null }>('/api/v1/User/profile').pipe(
                    map(res => {
                        if (res?.data) {
                            localStorage.setItem('profile', JSON.stringify(res.data));
                            return ProfileActions.loadProfileSuccess({ profile: res.data });
                        }
                        return ProfileActions.loadProfileSuccess({ profile: null }); // If data doesn't exist
                    }),
                    catchError(error => {
                        console.error('Error loading profile:', error);
                        return of(ProfileActions.loadProfileSuccess({ profile: null })); // Return null if error
                    })
                );
            })
        )
    );

    updateProfile$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ProfileActions.updateProfile),
                mergeMap(({ profile }) =>
                    this.http.put<{ data: User }>('/api/v1/User', profile).pipe(
                        switchMap((res) => {
                            if (res?.data) {
                                // After update, recall API to get all information of user
                                return this.http.get<{ data: User | null }>('/api/v1/User/profile').pipe(
                                    map((profileRes) => {
                                        if (profileRes?.data) {
                                            localStorage.setItem('profile', JSON.stringify(profileRes.data));
                                            return ProfileActions.updateProfileSuccess({ profile: profileRes.data });
                                        }
                                        return ProfileActions.updateProfileSuccess({ profile: profile }); // Return old profile if the new's not exists
                                    }),
                                    catchError(error => {
                                        console.error('Error loading updated profile:', error);
                                        return of(ProfileActions.updateProfileFailure({ error }));
                                    })
                                );
                            }
                            return of(ProfileActions.updateProfileFailure({ error: 'Invalid response data' }));
                        }),
                        catchError(error => {
                            console.error('Error updating profile:', error);
                            return of(ProfileActions.updateProfileFailure({ error })); // Add action failure
                        })
                    )
                )
            ),
    );

    refreshProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfileActions.refreshProfile),
            mergeMap(() =>
                this.http.get<{ data: User | null }>('/api/v1/User/profile').pipe(
                    map((res) => {
                        if (res?.data) {
                            localStorage.setItem('profile', JSON.stringify(res.data));
                            return ProfileActions.loadProfileSuccess({ profile: res.data });
                        }
                        return ProfileActions.loadProfileSuccess({ profile: null }); // If data doesn't exist
                    }),
                    catchError(error => {
                        console.error('Error loading profile:', error);
                        return of(ProfileActions.loadProfileSuccess({ profile: null })); // Return null if error
                    })
                )
            )
        )
    );

    clearProfile$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ProfileActions.clearProfile),
                tap(() => {
                    localStorage.removeItem('profile'); // 👈 Clear profile from localStorage
                })
            ),
        { dispatch: false }
    );

    constructor(private actions$: Actions, private http: _HttpClient) { }
}