JWT авторизация

Полноценная Fullstack авторизация. При регистрации подключена отправка письма на почту для ее подтверждения.

Frontend: React, TypeScript, Redux toolkit.

Backend: Nodejs, Express, MongoDB.

Запуск Backend приложения:
  1. Необходимо установить MongoDB, это можно сделать с помощью Docker. Внутри Docker развернуть MongoDB, для этого нужно из Docker hub скачать образ Mongo. 
Для более удобной работы с базой рекомендуется установить MongoDB Compass.
  2. Прописать необходимые .env переменные
  3. npm install
  4. npm run dev

Запуск Frontend приложения:
  1. Необходим работающий бэкенд. Запустить его в фоновом режиме
  2. npm install
  3. npm run start
