import React, {useEffect, useState} from 'react';
import {LoginForm} from "./components/LoginForm";
import {useAppDispatch} from "./store";
import {checkAuthorization, logout} from "./store/auth/async-actions";
import {User} from "./models/User";
import {$api} from "./http";
import { useIsAuthorizationLoading, useIsUserAuthorized, useSelfUser } from './store/auth';

function App() {
  const dispatch = useAppDispatch();

  const [users, setUsers] = useState<User[]>([]);

  const user = useSelfUser();
  const isLoading = useIsAuthorizationLoading();
  const isUserAuthorized = useIsUserAuthorized();

  function logoutUser() {
    dispatch(logout());
  }

  async function getUsers() {
    const response = await $api.get<User[]>('/users');
    setUsers(response.data);
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
      <button onClick={getUsers}>Загрузить пользователей</button>
      {users?.length > 0 ? users.map((user) => (
        <div key={user.id}>
          <h3>{user.email}</h3>
        </div>
      )) : ''}
    </div>
  );
}

export default App;
