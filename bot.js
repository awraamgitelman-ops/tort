import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BOT_TOKEN = process.env.BOT_TOKEN || '8855934222:AAE7urD82jvaYIf8cJddxnesQwuKVRyw4lY';

// Ensure data and upload directories exist
const dataDir = path.join(__dirname, 'data');
const portfolioJsonPath = path.join(dataDir, 'portfolio.json');
const uploadsDir = path.join(__dirname, 'public', 'portfolio');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(portfolioJsonPath)) {
  fs.writeFileSync(portfolioJsonPath, '[]', 'utf8');
}

export function initBot() {
  console.log('🤖 Starting BELLA CRÈME Telegram Post Parser Bot...');

  const bot = new TelegramBot(BOT_TOKEN, { polling: true });

  bot.on('message', async (msg) => {
    // If command /start
    if (msg.text === '/start') {
      return bot.sendMessage(
        msg.chat.id,
        `🍰 *Вітаємо у Боті-Парсері BELLA CRÈME!*\n\nПересилайте сюди будь-які пости або фото з вашого Telegram-каналу (@BELLA_CREME_ua). Бот завантажить фото та текст опису і автоматично додасть новий десерт у розділ *"Мої роботи"* на сайті!`,
        { parse_mode: 'Markdown' }
      );
    }

    // Process photo messages or forwarded posts with photos
    if (msg.photo && msg.photo.length > 0) {
      try {
        const photo = msg.photo[msg.photo.length - 1]; // Get highest resolution photo
        const caption = msg.caption || msg.text || 'Авторський десерт BELLA CRÈME';
        
        // Download photo locally
        const timestamp = Date.now();
        const filename = `work_${timestamp}.jpg`;
        const localFilePath = path.join(uploadsDir, filename);

        const downloadedPath = await bot.downloadFile(photo.file_id, uploadsDir);
        // Rename to standard filename
        fs.renameSync(downloadedPath, localFilePath);

        const relativeImgPath = `/portfolio/${filename}`;

        // Read existing portfolio database
        let portfolioData = [];
        try {
          const raw = fs.readFileSync(portfolioJsonPath, 'utf8');
          portfolioData = JSON.parse(raw);
        } catch (e) {
          portfolioData = [];
        }

        // Title from first sentence or line
        const lines = caption.trim().split('\n');
        const title = lines[0].substring(0, 80) || 'Авторський торт';
        const description = caption;

        const newWork = {
          id: timestamp,
          title: title,
          description: description,
          image: relativeImgPath,
          date: new Date().toISOString().split('T')[0],
          likes: Math.floor(Math.random() * 20) + 15
        };

        // Prepend to top of portfolio
        portfolioData.unshift(newWork);
        fs.writeFileSync(portfolioJsonPath, JSON.stringify(portfolioData, null, 2), 'utf8');

        bot.sendMessage(
          msg.chat.id,
          `✅ *ПОСТ УСПІШНО ЗБЕРЕЖЕНО ТА ОПУБЛІКОВАНО НА САЙТІ!*\n\n🖼️ *Фото:* Збережено у галерею\n📝 *Заголовок:* ${title}\n📅 *Дата:* ${newWork.date}\n\n🌐 *Розділ "Мої роботи" на сайті миттєво оновлено!*`,
          { parse_mode: 'Markdown' }
        );
      } catch (err) {
        console.error('Bot parsing error:', err);
        bot.sendMessage(msg.chat.id, `❌ Помилка під час обробки поста: ${err.message}`);
      }
    }
  });

  return bot;
}
