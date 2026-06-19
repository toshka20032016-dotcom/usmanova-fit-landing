# UsmanovaTeam Fitness Landing

Modern, responsive landing page for UsmanovaTeam fitness marathons by Katya Usmanova.

## Features

- Hero section with CTA scroll to contact form
- Popular marathons grid with category filter
- Program quiz (goal + time → personalized recommendation)
- Pricing section
- Footer contact form with validation and Telegram lead notifications
- Reading progress bar, social proof pop-up, scroll reveal, active nav

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- Vercel serverless function (`api/telegram.js`) for secure Telegram notifications
- Google Fonts: Montserrat

## Environment Variables

Copy `.env.example` to `.env` for local testing:

```bash
TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
TELEGRAM_CHAT_ID=your_chat_id
```

**Production:** set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in **Vercel Dashboard → Settings → Environment Variables**, then redeploy.

### How to get `TELEGRAM_CHAT_ID`

1. Create a bot via [@BotFather](https://t.me/BotFather) and copy the token.
2. Send any message to your bot (or add the bot to a group).
3. Open `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates` in a browser, or message [@userinfobot](https://t.me/userinfobot) for your personal chat ID.
4. Use the `chat.id` value from the JSON response as `TELEGRAM_CHAT_ID`.

## Local Development

```bash
npx vercel dev
```

Or open `index.html` in a browser (form API will not work without `vercel dev`).

## Deploy

Hosted on Vercel. Push to GitHub and deploy:

```bash
npx vercel deploy --prod --yes
```

Live site: [usmanova-fit-landing-ten.vercel.app](https://usmanova-fit-landing-ten.vercel.app)
