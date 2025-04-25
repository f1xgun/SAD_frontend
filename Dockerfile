# Первый этап: установка зависимостей и сборка
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json* ./
RUN npm ci

# Копируем исходники и собираем приложение
COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Второй этап: создание образа для запуска
FROM node:20-alpine AS runner

WORKDIR /app

# Устанавливаем serve глобально
RUN npm install -g serve

# Копируем собранные файлы из этапа builder
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Запуск serve для раздачи статических файлов
CMD ["serve", "-s", "dist", "-l", "3000"]
