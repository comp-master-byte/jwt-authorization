import { createSelector } from "@reduxjs/toolkit";
import { RootState, useAppSelector } from "..";

const authState = (state: RootState) => state.authReducer;

const isUserAuthorizedSelector = createSelector(
  [authState],
  (authState) => authState.isAuth
)

export function useIsUserAuthorized() {
  const isAuth = useAppSelector(isUserAuthorizedSelector);

  return isAuth;
}

const selftUserSelector = createSelector(
  [authState],
  (authState) => authState.user
)

export function useSelfUser() {
  const user = useAppSelector(selftUserSelector);

  return user;
}

const isAuthorizationLoadingSelector = createSelector(
  [authState],
  (authState) => authState.isLoading
)

export function useIsAuthorizationLoading() {
  const isLoading = useAppSelector(isAuthorizationLoadingSelector);

  return isLoading;
}

const authorizationErrorSelector = createSelector(
  [authState],
  (authState) => authState.error
)

export function useAuthorizationError() {
  const error = useAppSelector(authorizationErrorSelector);

  return error;
}