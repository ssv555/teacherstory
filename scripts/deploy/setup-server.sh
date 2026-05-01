#!/usr/bin/env bash
# TeacherStory — первоначальная настройка на московском сервере
# Запускать от root на сервере

set -euo pipefail

DOMAIN="teacherstory.it-joy.ru"
APP_DIR="/var/www/$DOMAIN"
REPO="https://github.com/ssv555/teacherstory.git"

echo "=== 1. Клонирование репозитория ==="
mkdir -p /var/www
if [ ! -d "$APP_DIR" ]; then
  git clone "$REPO" "$APP_DIR"
else
  echo "    Директория $APP_DIR уже существует, пропускаю clone"
fi

echo "=== 2. Установка зависимостей ==="
cd "$APP_DIR"
bun install

echo "=== 3. Копирование nginx-конфига ==="
cp "$APP_DIR/scripts/deploy/$DOMAIN.conf" /etc/nginx/conf.d/
nginx -t
systemctl reload nginx

echo "=== 4. Выпуск SSL-сертификата (Let's Encrypt) ==="
certbot certonly --nginx -d "$DOMAIN"

echo "=== 5. Перезагрузка nginx с SSL ==="
nginx -t
systemctl reload nginx

echo "=== 6. Установка systemd-сервиса ==="
cp "$APP_DIR/scripts/deploy/teacherstory.service" /etc/systemd/system/
systemctl daemon-reload
systemctl enable teacherstory

echo ""
echo "=== Готово ==="
echo "Осталось:"
echo "  1. Скопировать .env.production в $APP_DIR/"
echo "  2. Собрать фронтенд: cd $APP_DIR/front && bun install && bun run build"
echo "  3. Применить схему БД: cd $APP_DIR && bun run db:push:prod"
echo "  4. Запустить: systemctl start teacherstory"
echo "  5. Проверить: curl -skI https://$DOMAIN/"
