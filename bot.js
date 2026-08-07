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

const BASE_WORKS = [];

if (!fs.existsSync(portfolioJsonPath)) {
  fs.writeFileSync(portfolioJsonPath, '[]', 'utf8');
}

const mediaGroups = new Map();

function getPortfolioData() {
  try {
    const raw = fs.readFileSync(portfolioJsonPath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function savePortfolioData(data) {
  fs.writeFileSync(portfolioJsonPath, JSON.stringify(data, null, 2), 'utf8');
}

export function initBot() {
  console.log('🤖 Starting BELLA CRÈME Post Manager Bot (Extracting Exact Channel Post Dates)...');

  const bot = new TelegramBot(BOT_TOKEN, { polling: true });

  const sendManageList = (chatId) => {
    const data = getPortfolioData();
    if (data.length === 0) {
      return bot.sendMessage(chatId, '📭 Список спарсених полів наразі порожній. Перешліть фото або альбом для додавання.');
    }

    let text = `📋 *СПИСОК ОПУБЛІКОВАНИХ РОБІТ НА САЙТІ (${data.length} шт):*\n\nНатисніть кнопку ❌ під відповідним постом, щоб видалити його з сайту:\n\n`;

    const inlineKeyboard = data.map((item, index) => [
      {
        text: `❌ [${index + 1}] ${item.title.substring(0, 32)}...`,
        callback_data: `delete_${item.id}`
      }
    ]);

    bot.sendMessage(chatId, text, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: inlineKeyboard
      }
    });
  };

  bot.on('callback_query', async (query) => {
    const data = query.data;
    if (data.startsWith('delete_')) {
      const targetId = parseInt(data.replace('delete_', ''));
      let portfolio = getPortfolioData();
      
      const beforeCount = portfolio.length;
      portfolio = portfolio.filter(item => item.id !== targetId);
      
      if (portfolio.length < beforeCount) {
        savePortfolioData(portfolio);
        bot.answerCallbackQuery(query.id, { text: '✅ Пост успішно видалено з сайту!' });
        bot.sendMessage(query.message.chat.id, `✅ *ПОСТ УСПІШНО ВИДАЛЕНО З САЙТУ!*\nЗалишилось робіт: ${portfolio.length}`, { parse_mode: 'Markdown' });
        sendManageList(query.message.chat.id);
      } else {
        bot.answerCallbackQuery(query.id, { text: '⚠️ Пост не знайдено або вже видалено.' });
      }
    }
  });

  bot.on('message', async (msg) => {
    const text = msg.text || '';

    if (text === '/start') {
      return bot.sendMessage(
        msg.chat.id,
        `🍰 *Вітаємо у Боті-Парсері BELLA CRÈME!*\n\n• Пересилайте сюди пости/альбоми з вашого каналу (@BELLA_CREME_ua).\n• Бот автоматично визначить точну дату публікації поста на каналі та опублікує на сайті!\n• Введіть /list для видалення будь-якого поста кнопкою ❌.`,
        { parse_mode: 'Markdown' }
      );
    }

    if (text === '/list' || text === '/manage') {
      return sendManageList(msg.chat.id);
    }

    if (text === '/clear') {
      savePortfolioData([]);
      return bot.sendMessage(
        msg.chat.id,
        `🧹 *ВСІ СПАРСЕНІ ПОСТИ УСПІШНО ВИДАЛЕНО!*`,
        { parse_mode: 'Markdown' }
      );
    }

    // Photo & album parsing
    if (msg.photo && msg.photo.length > 0) {
      try {
        const photo = msg.photo[msg.photo.length - 1];
        const directFileUrl = await bot.getFileLink(photo.file_id);
        const caption = msg.caption || '';

        // Extract REAL original channel post date from forward_date if forwarded, else msg.date
        const rawTimestamp = msg.forward_date || msg.date || Math.floor(Date.now() / 1000);
        const realDateObj = new Date(rawTimestamp * 1000);
        const actualPostDate = `${String(realDateObj.getDate()).padStart(2, '0')}.${String(realDateObj.getMonth() + 1).padStart(2, '0')}.${realDateObj.getFullYear()}`;

        if (msg.media_group_id) {
          const groupId = msg.media_group_id;

          if (!mediaGroups.has(groupId)) {
            mediaGroups.set(groupId, {
              images: [],
              caption: '',
              chatId: msg.chat.id,
              date: actualPostDate,
              timer: null
            });
          }

          const group = mediaGroups.get(groupId);
          group.images.push(directFileUrl);
          if (caption && !group.caption) {
            group.caption = caption;
          }

          if (group.timer) clearTimeout(group.timer);
          group.timer = setTimeout(() => {
            savePortfolioEntry(group.images, group.caption, group.chatId, group.date);
            mediaGroups.delete(groupId);
          }, 1200);

        } else {
          savePortfolioEntry([directFileUrl], caption, msg.chat.id, actualPostDate);
        }
      } catch (err) {
        console.error('Photo processing error:', err);
        bot.sendMessage(msg.chat.id, `❌ Помилка: ${err.message}`);
      }
    }
  });

  const savePortfolioEntry = (images, caption, chatId, actualDate) => {
    try {
      const timestamp = Date.now();
      let portfolioData = getPortfolioData();

      const cleanCaption = caption || 'Авторський десерт BELLA CRÈME';
      const lines = cleanCaption.trim().split('\n');
      const title = lines[0].substring(0, 80) || 'Авторський торт';

      const newWork = {
        id: timestamp,
        title: title,
        description: cleanCaption,
        image: images[0],
        images: images,
        date: actualDate, // Exact date from the original Telegram channel post
        likes: Math.floor(Math.random() * 20) + 15
      };

      portfolioData.unshift(newWork);
      savePortfolioData(portfolioData);

      bot.sendMessage(
        chatId,
        `✅ *АЛЬБОМ ЗБЕРЕЖЕНО З ТОЧНОЮ ДАТОЮ КАНАЛУ!*\n\n📸 *Фото:* ${images.length}\n📝 *Заголовок:* ${title}\n📅 *Дата публікації в каналі:* ${actualDate}\n\nЩоб переглянути або видалити пости, відправте /list`,
        { parse_mode: 'Markdown' }
      );
    } catch (err) {
      console.error('Portfolio save error:', err);
      bot.sendMessage(chatId, `❌ Помилка обробки альбому: ${err.message}`);
    }
  };

  return bot;
}
