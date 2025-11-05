# Google OAuth Setup Guide для YTrust

## Шаг 1: Создание проекта в Google Cloud Console

1. Откройте [Google Cloud Console](https://console.cloud.google.com/)
2. Нажмите на выпадающий список проектов (вверху слева)
3. Нажмите **"New Project"**
4. Введите название: **YTrust** или любое другое
5. Нажмите **"Create"**

## Шаг 2: Включение YouTube Data API и YouTube Analytics API

1. В боковом меню выберите **"APIs & Services"** → **"Library"**
2. Найдите **"YouTube Data API v3"**
   - Нажмите на неё
   - Нажмите **"Enable"**
3. Вернитесь в Library
4. Найдите **"YouTube Analytics API"**
   - Нажмите на неё
   - Нажмите **"Enable"**

## Шаг 3: Настройка OAuth Consent Screen

1. В боковом меню: **"APIs & Services"** → **"OAuth consent screen"**
2. Выберите **"External"** (для тестирования)
3. Нажмите **"Create"**

### Заполните форму:

**App information:**
- App name: `YTrust`
- User support email: (ваш email)

**App logo:** (опционально)

**App domain:**
- Authorized domains: `localhost` (для разработки)

**Developer contact information:**
- Email addresses: (ваш email)

4. Нажмите **"Save and Continue"**

### Scopes:

5. Нажмите **"Add or Remove Scopes"**
6. Выберите следующие scopes:
   - `openid`
   - `email`
   - `profile`
   - `https://www.googleapis.com/auth/yt-analytics.readonly`
7. Нажмите **"Update"**
8. Нажмите **"Save and Continue"**

### Test users:

9. Нажмите **"Add Users"**
10. Добавьте свой Google email (с которого будете тестировать YouTube канал)
11. Нажмите **"Add"**
12. Нажмите **"Save and Continue"**

## Шаг 4: Создание OAuth Client ID

1. В боковом меню: **"APIs & Services"** → **"Credentials"**
2. Нажмите **"+ Create Credentials"** → **"OAuth client ID"**
3. Выберите **"Web application"**

**Name:** `YTrust Web Client`

**Authorized JavaScript origins:**
```
http://localhost:3000
```

**Authorized redirect URIs:**
```
http://localhost:3000/api/auth/callback/google
```

4. Нажмите **"Create"**

## Шаг 5: Копирование credentials

После создания вы увидите окно с:
- **Client ID** (длинная строка заканчивающаяся на `.apps.googleusercontent.com`)
- **Client Secret** (короткая строка)

**Скопируйте эти значения!**

## Шаг 6: Добавление credentials в проект

1. Откройте файл `.env.local` в корне проекта ytrust
2. Замените значения:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-random-string-here
GOOGLE_CLIENT_ID=your-actual-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-actual-client-secret
```

### Генерация NEXTAUTH_SECRET:

В PowerShell выполните:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Или используйте любую случайную строку длиной 32+ символов.

## Шаг 7: Перезапуск dev сервера

1. Остановите dev сервер (Ctrl+C в терминале)
2. Запустите заново:
```bash
npm run dev
```

## Шаг 8: Тестирование

1. Откройте http://localhost:3000
2. Нажмите "Start Explore"
3. Нажмите "Add Channel"
4. Нажмите "Connect Google Account"
5. Войдите через Google аккаунт (который вы добавили как test user)
6. Разрешите доступ к YouTube Analytics

## Важно! 

- **Test users:** Пока приложение в статусе "Testing", только добавленные test users могут авторизоваться
- **Для продакшена:** Нужно будет пройти Google verification process
- **Redirect URI:** Должен точно совпадать с настройкой в Google Console

## Возможные проблемы:

### Ошибка "redirect_uri_mismatch":
- Проверьте что redirect URI в Google Console точно: `http://localhost:3000/api/auth/callback/google`
- Убедитесь что NEXTAUTH_URL в .env.local: `http://localhost:3000`

### Ошибка "Access blocked: Authorization Error":
- Добавьте ваш email в Test Users
- Проверьте что добавили нужные scopes

### Ошибка "Invalid client":
- Проверьте что GOOGLE_CLIENT_ID и GOOGLE_CLIENT_SECRET правильно скопированы
- Перезапустите dev сервер после изменения .env.local
