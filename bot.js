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

const mediaGroups = new Map();
const backupJsonPath = path.join(dataDir, 'portfolio.backup.json');

function getPortfolioData() {
  try {
    if (fs.existsSync(portfolioJsonPath)) {
      const raw = fs.readFileSync(portfolioJsonPath, 'utf8');
      if (raw && raw.trim().length > 2) {
        return JSON.parse(raw);
      }
    }
    if (fs.existsSync(backupJsonPath)) {
      const rawBackup = fs.readFileSync(backupJsonPath, 'utf8');
      if (rawBackup && rawBackup.trim().length > 2) {
        return JSON.parse(rawBackup);
      }
    }
    return [];
  } catch (e) {
    console.error('Error reading portfolio data:', e);
    return [];
  }
}

function savePortfolioData(data) {
  try {
    if (fs.existsSync(portfolioJsonPath)) {
      const currentRaw = fs.readFileSync(portfolioJsonPath, 'utf8');
      if (currentRaw && currentRaw.trim().length > 2) {
        fs.writeFileSync(backupJsonPath, currentRaw, 'utf8');
      }
    }
    fs.writeFileSync(portfolioJsonPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving portfolio data:', e);
  }
}

async function uploadToCatbox(fileUrl, filename) {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error(`Failed to download from Telegram: ${response.statusText}`);
    const arrayBuffer = await response.arrayBuffer();
    const blob = new Blob([arrayBuffer]);

    const formData = new FormData();
    formData.append('reqtype', 'fileupload');
    formData.append('fileToUpload', blob, filename);

    const res = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      throw new Error(`Catbox API error: ${res.statusText}`);
    }

    const permanentUrl = (await res.text()).trim();
    if (permanentUrl.startsWith('http')) {
      return permanentUrl;
    }
    throw new Error(`Invalid Catbox response: ${permanentUrl}`);
  } catch (err) {
    console.error('Catbox upload error:', err);
    return fileUrl;
  }
}

export function initBot() {
  console.log('🤖 Starting BELLA CRÈME Post Manager Bot (Catbox Free CDN & Media Support)...');

  const bot = new TelegramBot(BOT_TOKEN, { polling: true });

  const sendManageList = (chatId) => {
    const data = getPortfolioData();
    if (data.length === 0) {
      return bot.sendMessage(chatId, '📭 Список спарсених робіт наразі порожній. Перешліть фото або відео для додавання.');
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
        `🍰 *Вітаємо у Боті-Парсері BELLA CRÈME!*\n\n• Підтримуються *фотографії, альбоми та відео-огляди* тортів!\n• Бот автоматично завантажить медіа у безкоштовне вічне сховище та додасть у розділ *"Мої роботи"* на сайті.\n• Введіть /list для перегляду списку та видалення.`,
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
        `🧹 *ВСІ СПАРСЕНІ РОБОТИ УСПІШНО ВИДАЛЕНО!*`,
        { parse_mode: 'Markdown' }
      );
    }

    // Extract exact original channel post date
    const rawTimestamp = msg.forward_date || msg.date || Math.floor(Date.now() / 1000);
    const realDateObj = new Date(rawTimestamp * 1000);
    const actualPostDate = `${String(realDateObj.getDate()).padStart(2, '0')}.${String(realDateObj.getMonth() + 1).padStart(2, '0')}.${realDateObj.getFullYear()}`;

    // 1. Handle Photo Messages & Photo Albums
    if (msg.photo && msg.photo.length > 0) {
      try {
        const photo = msg.photo[msg.photo.length - 1];
        const directFileUrl = await bot.getFileLink(photo.file_id);
        const caption = msg.caption || '';

        if (msg.media_group_id) {
          const groupId = msg.media_group_id;

          if (!mediaGroups.has(groupId)) {
            mediaGroups.set(groupId, {
              mediaList: [],
              caption: '',
              chatId: msg.chat.id,
              date: actualPostDate,
              timestamp: rawTimestamp * 1000,
              timer: null
            });
          }

          const group = mediaGroups.get(groupId);
          group.mediaList.push({ type: 'image', url: directFileUrl });
          if (caption && !group.caption) {
            group.caption = caption;
          }

          if (group.timer) clearTimeout(group.timer);
          group.timer = setTimeout(() => {
            enqueuePortfolioEntry(group.mediaList, group.caption, group.chatId, group.date, group.timestamp);
            mediaGroups.delete(groupId);
          }, 1200);

        } else {
          enqueuePortfolioEntry([{ type: 'image', url: directFileUrl }], caption, msg.chat.id, actualPostDate, rawTimestamp * 1000);
        }
      } catch (err) {
        console.error('Photo processing error:', err);
        bot.sendMessage(msg.chat.id, `❌ Помилка фото: ${err.message}`);
      }
    }

    // 2. Handle Video Messages (Відео-огляди десертів)
    if (msg.video || msg.animation) {
      try {
        const videoObj = msg.video || msg.animation;
        const directVideoUrl = await bot.getFileLink(videoObj.file_id);
        const caption = msg.caption || '';

        if (msg.media_group_id) {
          const groupId = msg.media_group_id;

          if (!mediaGroups.has(groupId)) {
            mediaGroups.set(groupId, {
              mediaList: [],
              caption: '',
              chatId: msg.chat.id,
              date: actualPostDate,
              timestamp: rawTimestamp * 1000,
              timer: null
            });
          }

          const group = mediaGroups.get(groupId);
          group.mediaList.push({ type: 'video', url: directVideoUrl });
          if (caption && !group.caption) {
            group.caption = caption;
          }

          if (group.timer) clearTimeout(group.timer);
          group.timer = setTimeout(() => {
            enqueuePortfolioEntry(group.mediaList, group.caption, group.chatId, group.date, group.timestamp);
            mediaGroups.delete(groupId);
          }, 1200);

        } else {
          enqueuePortfolioEntry([{ type: 'video', url: directVideoUrl }], caption, msg.chat.id, actualPostDate, rawTimestamp * 1000);
        }
      } catch (err) {
        console.error('Video processing error:', err);
        bot.sendMessage(msg.chat.id, `❌ Помилка відео: ${err.message}`);
      }
    }
  });

  // Sequential Queue to prevent race conditions during bulk message forwarding (e.g. 100+ posts)
  const queue = [];
  let isProcessingQueue = false;

  const enqueuePortfolioEntry = (mediaList, caption, chatId, actualDate, originalTimestamp) => {
    queue.push({ mediaList, caption, chatId, actualDate, originalTimestamp });
    processQueue();
  };

  const processQueue = async () => {
    if (isProcessingQueue || queue.length === 0) return;
    isProcessingQueue = true;

    const item = queue.shift();
    try {
      await savePortfolioEntry(item.mediaList, item.caption, item.chatId, item.actualDate, item.originalTimestamp);
    } catch (err) {
      console.error('Queue task error:', err);
    } finally {
      isProcessingQueue = false;
      setTimeout(processQueue, 250);
    }
  };

  const savePortfolioEntry = async (mediaList, caption, chatId, actualDate, originalTimestamp) => {
    try {
      // Re-read fresh portfolio data right before writing to avoid race conditions
      let portfolioData = getPortfolioData();
      const timestamp = Date.now();

      const rawCaption = caption || 'Авторський десерт BELLA CRÈME';
      const cleanCaption = rawCaption
        .replace(/https?:\/\/t\.me\/[^\s]+/gi, '')
        .replace(/t\.me\/[^\s]+/gi, '')
        .replace(/@BELLA_CREME_ua/gi, '')
        .trim() || 'Авторський десерт BELLA CRÈME';

      const lines = cleanCaption.trim().split('\n').filter(line => line.trim() !== '');
      const title = (lines[0] || 'Авторський десерт').substring(0, 80);

      const hasVideo = mediaList.some(m => m.type === 'video');

      const uploadedMediaList = await Promise.all(
        mediaList.map(async (m, idx) => {
          const ext = m.type === 'video' ? 'mp4' : 'jpg';
          const filename = `bellacreme_${timestamp}_${idx}.${ext}`;
          const catboxUrl = await uploadToCatbox(m.url, filename);
          return { type: m.type, url: catboxUrl };
        })
      );

      const mediaUrls = uploadedMediaList.map(m => m.url);

      const newWork = {
        id: timestamp,
        originalTimestamp: originalTimestamp || timestamp,
        title: title,
        description: cleanCaption,
        image: mediaUrls[0],
        images: mediaUrls,
        mediaList: uploadedMediaList,
        hasVideo: hasVideo,
        date: actualDate,
        likes: Math.floor(Math.random() * 20) + 15
      };

      portfolioData.unshift(newWork);
      savePortfolioData(portfolioData);

      bot.sendMessage(
        chatId,
        `✅ *${hasVideo ? 'ВІДЕО' : 'ПОСТ'} УСПІШНО ЗБЕРЕЖЕНО!* (Всього на сайті: ${portfolioData.length})\n\n📝 *${title}*`,
        { parse_mode: 'Markdown' }
      ).catch(() => {});
    } catch (err) {
      console.error('Portfolio save error:', err);
      bot.sendMessage(chatId, `❌ Помилка збереження: ${err.message}`).catch(() => {});
    }
  };

  return bot;
}

