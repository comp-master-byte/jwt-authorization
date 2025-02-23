import React, {useEffect} from 'react';
import {LoginForm} from "./components/LoginForm";
import {useAppDispatch} from "./store";
import {checkAuthorization, logout} from "./store/auth";
import { useIsAuthorizationLoading, useIsUserAuthorized, useSelfUser } from './store/auth';
import {UsersList} from "./components/UsersList";

function App() {
  const dispatch = useAppDispatch();

  const user = useSelfUser();
  const isLoading = useIsAuthorizationLoading();
  const isUserAuthorized = useIsUserAuthorized();

  function logoutUser() {
    dispatch(logout());
  }

  useEffect(() => {
    if(localStorage.getItem('token')) {
      dispatch(checkAuthorization());
    }
  }, [dispatch])

  if(isLoading) {
    return <h1>Загрузка...</h1>
  }

  if(!isUserAuthorized) {
    return <LoginForm />;
  }

  return (
    <div>
      <h1>{isUserAuthorized ? `Пользователь авторизован: ${user?.email}` : 'Необходимо авторизоваться'}</h1>
      <h1>{user?.isActivated ? 'Почта активирована' : 'Необходимо подвердить аккаунт'}</h1>
      <button onClick={logoutUser}>Выйти</button>
      <UsersList />
    </div>
  );
}

export default App;
