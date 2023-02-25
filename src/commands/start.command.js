import TelegramBot from "node-telegram-bot-api";

const commandName = "Start";

/**
 * 
 * @param {TelegramBot.Message} msg 
 * @param {TelegramBot} bot 
 */
const handler = async (msg, bot) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Hello! You\'ve started a bot!');
};

export {
    commandName,
    handler,
};