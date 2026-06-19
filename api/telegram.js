const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: 'Server configuration error' });
  }

  const body = typeof req.body === 'string' ? (() => { try { return JSON.parse(req.body); } catch { return {}; } })() : (req.body || {});
  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const utm_source = typeof body?.utm_source === 'string' ? body.utm_source.trim() : 'direct';
  const utm_medium = typeof body?.utm_medium === 'string' ? body.utm_medium.trim() : 'none';
  const utm_campaign = typeof body?.utm_campaign === 'string' ? body.utm_campaign.trim() : 'none';

  if (name.length < 2 || name.length > 100) {
    return res.status(400).json({ ok: false, error: 'Invalid name' });
  }

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email' });
  }

  const text = [
    '🆕 Новая заявка UsmanovaTeam',
    '',
    `👤 Имя: ${name}`,
    `📧 Email: ${email}`,
    `📍 Источник: ${utm_source} / ${utm_medium} / ${utm_campaign}`,
  ].join('\n');

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    const tgData = await tgRes.json();

    if (!tgData.ok) {
      console.error('Telegram API error:', tgData);
      return res.status(502).json({ ok: false, error: 'Failed to send notification' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Telegram send error:', err);
    return res.status(500).json({ ok: false, error: 'Internal server error' });
  }
};
