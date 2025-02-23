import React, {useState} from "react";
import {User} from "../models/User";
import {$api} from "../http";

export function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');

  async function getUsers() {
    try {
      const response = await $api.get<User[]>('/users');
      setUsers(response.data);
      if(error.length) {
        setError('')
      }
    } catch (e) {
      setError("Ошибка при загрузке пользователей");
    }
  }

  return (
    <>
      <button onClick={getUsers}>Загрузить пользователей</button>
      {users?.length > 0
          ? users.map((user) => (
            <div key={user.id}>
              <h3>{user.email}</h3>
            </div>
            ))
          : ''
      }

      {error && <h4 style={{color: 'red'}}>{error}</h4>}
    </>
  )
}