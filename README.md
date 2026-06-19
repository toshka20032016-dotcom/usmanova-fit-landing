# Фитнес-Лендинг (Тестовое задание для GymTeam)

Интерактивный, полностью адаптивный одностраничный сайт фитнес-экосистемы UsmanovaTeam. Сделан с упором на производительность, чистоту кода и пользовательский опыт.

## 🚀 Демо

[👉 Посмотреть на Vercel](https://usmanova-fit-landing-ten.vercel.app)

## 🛠️ Стек технологий

- **HTML5** — семантическая вёрстка (`<main>`, skip-link, ARIA-атрибуты)
- **CSS3** — Flexbox, Grid, CSS-переменные, анимации, адаптив (375px–1280px+)
- **Vanilla JavaScript** — без тяжёлых библиотек
- **Vercel Serverless** — `/api/telegram` для отправки лидов в Telegram

## 💡 Реализованный функционал

- Hero-секция с CTA и скелетон-загрузкой изображений
- Каталог из 5 марафонов с фильтрацией по категориям (табы)
- Галереи результатов и отзывов
- Блок преимуществ GymTeam
- **Калькулятор калорий** (формула Mifflin-St Jeor)
- Тарифы и модальное окно выбора программы
- **FAQ-аккордеон** с `aria-expanded` / `aria-controls`
- Форма заявки с валидацией, `aria-invalid` и обработкой сетевых ошибок
- Отправка лидов в Telegram через serverless API
- Прогресс-бар чтения страницы
- Scroll reveal (Intersection Observer)
- Sticky header с эффектом при скролле
- Активная навигация по секциям (`aria-current`)
- Модальное окно с focus trap и закрытием по Escape
- UTM-метки из URL
- Open Graph / SEO meta-теги

## ⚙️ Локальный запуск

npm не требуется — откройте `index.html` в браузере или:

```bash
npx serve .
```

Для работы формы с Telegram:

```bash
cp .env.example .env
# заполните TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID
npx vercel dev
```

## 📁 Структура

```
usmanova-fit-landing/
├── index.html          # разметка, стили и клиентский JS
├── api/
│   └── telegram.js     # Vercel serverless — отправка в Telegram
├── images/             # ассеты лендинга
├── .env.example        # шаблон переменных окружения
└── README.md
```

## 🔐 Переменные окружения

| Переменная | Описание |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Токен бота от [@BotFather](https://t.me/BotFather) |
| `TELEGRAM_CHAT_ID` | ID чата для уведомлений о лидах |

**Production:** задайте переменные в Vercel Dashboard → Settings → Environment Variables, затем redeploy.

## 📄 Лицензия / примечание

Тестовое задание. Изображения используются с разрешения [usmanovafit.gymteam.ru](https://usmanovafit.gymteam.ru).
