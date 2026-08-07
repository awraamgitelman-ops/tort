import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BOT_TOKEN = process.env.BOT_TOKEN || '8855934222:AAE7urD82jvaYIf8cJddxnesQwuKVRyw4lY';

// Ensure data directory exists for JSON storage only (0 MB image storage on server)
const dataDir = path.join(__dirname, 'data');
const portfolioJsonPath = path.join(dataDir, 'portfolio.json');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(portfolioJsonPath)) {
  fs.writeFileSync(portfolioJsonPath, '[]', 'utf8');
}

export function initBot() {
  console.log('🤖 Starting BELLA CRÈME Telegram Post Parser Bot (Direct CDN Links mode - 0 MB Server Disk Usage)...');

  const bot = new TelegramBot(BOT_TOKEN, { polling: true });

  bot.on('message', async (msg) => {
    if (msg.text === '/start') {
      return bot.sendMessage(
        msg.chat.id,
        `🍰 *Вітаємо у Боті-Парсері BELLA CRÈME!*\n\nПересилайте сюди будь-які пости з фото з вашого каналу (@BELLA_CREME_ua). Бот отримає пряме посилання на фото з серверів Telegram і додасть його в *"Мої роботи"* без використання місця на диску сервера Railway!`,
        { parse_mode: 'Markdown' }
      );
    }

    // Process photo messages
    if (msg.photo && msg.photo.length > 0) {
      try {
        const photo = msg.photo[msg.photo.length - 1]; // Highest resolution
        const caption = msg.caption || msg.text || 'Авторський десерт BELLA CRÈME';
        const timestamp = Date.now();

        // Obtain direct CDN file link from Telegram (0 bytes local server disk storage!)
        const directFileUrl = await bot.getFileLink(photo.file_id);

        let portfolioData = [];
        try {
          const raw = fs.readFileSync(portfolioJsonPath, 'utf8');
          portfolioData = JSON.parse(raw);
        } catch (e) {
          portfolioData = [];
        }

        const lines = caption.trim().split('\n');
        const title = lines[0].substring(0, 80) || 'Авторський торт';
        const description = caption;

        const newWork = {
          id: timestamp,
          title: title,
          description: description,
          image: directFileUrl, // Direct Telegram CDN URL
          date: new Date().toISOString().split('T')[0],
          likes: Math.floor(Math.random() * 20) + 15
        };

        portfolioData.unshift(newWork);
        fs.writeFileSync(portfolioJsonPath, JSON.stringify(portfolioData, null, 2), 'utf8');

        bot.sendMessage(
          msg.chat.id,
          `✅ *ПОСТ ЗБЕРЕЖЕНО БЕЗ ЗАЙМАННЯ ДИСКУ СЕРВЕРА (0 МБ)!*\n\n🖼️ *CDN Посилання:* Отримано напряму з Telegram\n📝 *Заголовок:* ${title}\n📅 *Дата:* ${newWork.date}\n\n🌐 *Розділ "Мої роботи" на сайті оновлено!*`,
          { parse_mode: 'Markdown' }
        );
      } catch (err) {
        console.error('Bot parsing error:', err);
        bot.sendMessage(msg.chat.id, `❌ Помилка обробки: ${err.message}`);
      }
    }
  });

  return bot;
}
