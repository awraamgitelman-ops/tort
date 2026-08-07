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

// Base sample portfolio entries
const BASE_WORKS = [
  {
    id: 101,
    title: 'Бенто-торт "Ніжне серце" з вишневим конфеті',
    description: 'Ніжний бенто-тортик з оксамитовим бісквітом та вишневим начинням. Виконаний на замовлення з кремовою підписом та святковою свічкою.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    date: '2026-08-07',
    likes: 42
  },
  {
    id: 102,
    title: 'Сет авторських капкейків з полуничним крем-чизом',
    description: '6 капкейків із ніжними шапочками з натурального вершкового сиру, прикрашені свіжою лохиною та полуницею.',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80',
    date: '2026-08-06',
    likes: 38
  },
  {
    id: 103,
    title: 'Весільний 3-ярусний торт "Королівська лілія"',
    description: 'Торт 4.5 кг із покриттям з вершкового ганашу, декорований харчовим золотом та живими білими квітами.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    date: '2026-08-05',
    likes: 65
  },
  {
    id: 104,
    title: 'Торт "Снікерс" із домашньою солоною карамеллю',
    description: 'Насичені шоколадні коржі, молочне просочення, солона карамель з обсмаженим арахісом та ганаш на темному шоколаді.',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80',
    date: '2026-08-04',
    likes: 51
  }
];

if (!fs.existsSync(portfolioJsonPath)) {
  fs.writeFileSync(portfolioJsonPath, JSON.stringify(BASE_WORKS, null, 2), 'utf8');
}

const mediaGroups = new Map();

function getPortfolioData() {
  try {
    const raw = fs.readFileSync(portfolioJsonPath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return BASE_WORKS;
  }
}

function savePortfolioData(data) {
  fs.writeFileSync(portfolioJsonPath, JSON.stringify(data, null, 2), 'utf8');
}

export function initBot() {
  console.log('🤖 Starting BELLA CRÈME Post Manager Bot with Delete Buttons...');

  const bot = new TelegramBot(BOT_TOKEN, { polling: true });

  const sendManageList = (chatId) => {
    const data = getPortfolioData();
    if (data.length === 0) {
      return bot.sendMessage(chatId, '📭 Список полів порожній.');
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

  // Callback query listener for inline delete buttons (❌ Видалити)
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
        // Refresh manage list
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
        `🍰 *Вітаємо у Боті-Парсері BELLA CRÈME!*\n\n• Пересилайте сюди пости/альбоми з фото для публікації на сайті.\n• Введіть команда /list або /manage для перегляду списку та видалення постів кнопкою ❌.\n• Введіть /clear для видалення останніх спарсених постів.`,
        { parse_mode: 'Markdown' }
      );
    }

    if (text === '/list' || text === '/manage') {
      return sendManageList(msg.chat.id);
    }

    if (text === '/clear') {
      savePortfolioData(BASE_WORKS);
      return bot.sendMessage(
        msg.chat.id,
        `🧹 *ОСТАННІ СПАРСЕНІ ПОСТИ УСПІШНО ВИДАЛЕНО!*\nГалерею скинуто до базового стану.`,
        { parse_mode: 'Markdown' }
      );
    }

    // Photo & album parsing
    if (msg.photo && msg.photo.length > 0) {
      try {
        const photo = msg.photo[msg.photo.length - 1];
        const directFileUrl = await bot.getFileLink(photo.file_id);
        const caption = msg.caption || '';

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

          if (group.timer) clearTimeout(group.timer);
          group.timer = setTimeout(() => {
            savePortfolioEntry(group.images, group.caption, group.chatId);
            mediaGroups.delete(groupId);
          }, 1200);

        } else {
          savePortfolioEntry([directFileUrl], caption, msg.chat.id);
        }
      } catch (err) {
        console.error('Photo processing error:', err);
        bot.sendMessage(msg.chat.id, `❌ Помилка: ${err.message}`);
      }
    }
  });

  const savePortfolioEntry = (images, caption, chatId) => {
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
        date: new Date().toISOString().split('T')[0],
        likes: Math.floor(Math.random() * 20) + 15
      };

      portfolioData.unshift(newWork);
      savePortfolioData(portfolioData);

      bot.sendMessage(
        chatId,
        `✅ *АЛЬБОМ УСПІШНО ЗБЕРЕЖЕНО НА САЙТ!*\n\n📸 *Фото:* ${images.length}\n📝 *Заголовок:* ${title}\n📅 *Дата:* ${newWork.date}\n\nЩоб переглянути або видалити пости, відправте /list`,
        { parse_mode: 'Markdown' }
      );
    } catch (err) {
      console.error('Portfolio save error:', err);
      bot.sendMessage(chatId, `❌ Помилка обробки альбому: ${err.message}`);
    }
  };

  return bot;
}
