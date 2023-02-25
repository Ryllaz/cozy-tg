import TelegramBot from "node-telegram-bot-api";

function CozyTg(token) {
    this._token = token;
    this._commands = {};
    this._config = require('../config');

    this.init = () => {
        loadCommands();
        const bot = new TelegramBot(this._token, { polling: true });
        bot.on('message', async (msg) => {
            for (const command in _commands) {
                if (msg?.text?.match(`^${command}$`)) {
                    this._commands[command](msg, bot);
                    return;
                }
            }
        });
    };

    this.loadCommands = () => {
        const fs = require('fs');
        const modules = fs.readdirSync(this._config.commands_path);

        for (const module of modules) {
            if (['.', '..', 'index.js'].includes(module)) continue;

            const command = require(path.join(__dirname, module));

            if (this._commands.hasOwnProperty(command.commandName)) {
                throw new Error(`Command with name '${command.commandName}' already exists.`);
            }

            this._commands[command.commandName] = command.handler;
        }
    };
};

module.exports = { 
    CozyTg,
    default: CozyTg
};