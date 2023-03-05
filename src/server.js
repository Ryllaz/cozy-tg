import dotenv from 'dotenv';
import CozyTg from "../system/core/cozy-tg.core.js";
dotenv.config();

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;

const cozyTg = new CozyTg(telegramBotToken);

await cozyTg.init();