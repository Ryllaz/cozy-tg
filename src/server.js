import dotenv from 'dotenv';
import CozyTg from "../core/cozyTg.core.js";
dotenv.config();

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;

const cozyTg = new CozyTg(telegramBotToken);

cozyTg.init();