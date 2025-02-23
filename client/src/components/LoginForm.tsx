import React, { useState } from 'react';
import { useAppDispatch } from "../store";
import { login, registration } from '../store/auth';
import { useAuthorizationError } from "../store/auth/authSelectors";

export function LoginForm() {
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const authorizationButtonDisabled = !email || !password;

    const authorizationError = useAuthorizationError();

    function handleLogin() {
        dispatch(login({email, password}));
    }

    function handleRegistration() {
        dispatch(registration({email, password}));
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button
                onClick={handleLogin}
                disabled={authorizationButtonDisabled}
            >
              Войти
            </button>
            <button
              onClick={handleRegistration}
              disabled={authorizationButtonDisabled}
            >
              Регистрация
            </button>

          {authorizationError && <h4 style={{color: 'red'}}>{authorizationError}</h4>}
        </div>
    )
}