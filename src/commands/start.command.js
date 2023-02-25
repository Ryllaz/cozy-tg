import TelegramBot from "node-telegram-bot-api";

const commandName = "Start";

/**
 * 
 * @param {TelegramBot.Message} msg 
 * @param {TelegramBot} bot 
 */
const handler = (msg, bot) => {
    console.log(commandName, ' loaded');
};

export default {
    commandName,
    handler,
};