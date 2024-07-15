const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { name, email } = req.body;
    const message = `New form submission:\nName: ${name}\nEmail: ${email}`;
    
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    res.status(200).json({ status: 'success' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
