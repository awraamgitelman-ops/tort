import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BOT_TOKEN = process.env.BOT_TOKEN || '8855934222:AAE7urD82jvaYIf8cJddxnesQwuKVRyw4lY';

const dataDir = path.join(__dirname, 'data');
const portfolioJsonPath = path.join(dataDir, 'portfolio.json');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(portfolioJsonPath)) {
  fs.writeFileSync(portfolioJsonPath, '[]', 'utf8');
}

// Media groups buffer to group multi-photo album posts (0 MB server disk storage)
const mediaGroups = new Map();

export function initBot() {
  console.log('🤖 Starting BELLA CRÈME Multi-Photo Telegram Album Parser (0 MB Disk Usage)...');

  const bot = new TelegramBot(BOT_TOKEN, { polling: true });

  const savePortfolioEntry = (images, caption, chatId) => {
    try {
      const timestamp = Date.now();
      let portfolioData = [];
      try {
        const raw = fs.readFileSync(portfolioJsonPath, 'utf8');
        portfolioData = JSON.parse(raw);
      } catch (e) {
        portfolioData = [];
      }

      const cleanCaption = caption || 'Авторський десерт BELLA CRÈME';
      const lines = cleanCaption.trim().split('\n');
      const title = lines[0].substring(0, 80) || 'Авторський торт';

      const newWork = {
        id: timestamp,
        title: title,
        description: cleanCaption,
        image: images[0], // Main cover photo
        images: images,  // All photos in album
        date: new Date().toISOString().split('T')[0],
        likes: Math.floor(Math.random() * 20) + 15
      };

      portfolioData.unshift(newWork);
      fs.writeFileSync(portfolioJsonPath, JSON.stringify(portfolioData, null, 2), 'utf8');

      bot.sendMessage(
        chatId,
        `✅ *АЛЬБОМ УСПІШНО ЗБЕРЕЖЕНО НА САЙТ!*\n\n📸 *Кількість фото:* ${images.length}\n📝 *Заголовок:* ${title}\n📅 *Дата:* ${newWork.date}\n\n🌐 *Розділ "Мої роботи" з галереєю з ${images.length} фото оновлено!*`,
        { parse_mode: 'Markdown' }
      );
    } catch (err) {
      console.error('Portfolio save error:', err);
      bot.sendMessage(chatId, `❌ Помилка обробки альбому: ${err.message}`);
    }
  };

  bot.on('message', async (msg) => {
    if (msg.text === '/start') {
      return bot.sendMessage(
        msg.chat.id,
        `🍰 *Вітаємо у Боті-Парсері BELLA CRÈME!*\n\nПересилайте сюди альбоми з кількома фотографіями (наприклад 6-10 фото) або окремі пости з вашого каналу (@BELLA_CREME_ua). Бот автоматично об'єднає всі фото в інтерактивну галерею на сайті!`,
        { parse_mode: 'Markdown' }
      );
    }

    // Handle photo messages & albums (Media Groups)
    if (msg.photo && msg.photo.length > 0) {
      try {
        const photo = msg.photo[msg.photo.length - 1]; // Highest resolution
        const directFileUrl = await bot.getFileLink(photo.file_id);
        const caption = msg.caption || '';

        // If message is part of a multi-photo Media Group (Album)
        if (msg.media_group_id) {
          const groupId = msg.media_group_id;

          if (!mediaGroups.has(groupId)) {
            mediaGroups.set(groupId, {
              images: [],
              caption: '',
              chatId: msg.chat.id,
              timer: null
            });
          }

          const group = mediaGroups.get(groupId);
          group.images.push(directFileUrl);
          if (caption && !group.caption) {
            group.caption = caption;
          }

          // Clear previous timer and set debounce (1000ms) to wait for all photos of the album
          if (group.timer) clearTimeout(group.timer);
          group.timer = setTimeout(() => {
            savePortfolioEntry(group.images, group.caption, group.chatId);
            mediaGroups.delete(groupId);
          }, 1200);

        } else {
          // Single photo post
          savePortfolioEntry([directFileUrl], caption, msg.chat.id);
        }
      } catch (err) {
        console.error('Photo processing error:', err);
        bot.sendMessage(msg.chat.id, `❌ Помилка: ${err.message}`);
      }
    }
  });

  return bot;
}
