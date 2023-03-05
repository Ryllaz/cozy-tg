import TelegramBot from "node-telegram-bot-api";
import config from '../../config.js';
import fs from 'fs';
import path from 'path';

class CozyTg {
    constructor(token) {
        this._token = token;
        this._commands = {};
        this._config = config;
    }

    async init() {
        await this.loadCommands();
        const bot = new TelegramBot(this._token, { polling: true });
        bot.on('message', async (msg) => {
            for (const command in this._commands) {
                if (msg?.text?.match(`^${command}$`)) {
                    if (this._commands[command].constructor.name === 'AsyncFunction') {
                        await this._commands[command](msg, bot);
                    } else {
                        this._commands[command](msg, bot);
                    }
                    return;
                }
            }
        });
    };

    async loadCommands() {
        const modules = fs.readdirSync(this._config.commands_path);

        for (const module of modules) {
            if (['.', '..', 'index.js'].includes(module))
                continue;

            const { commandName, handler } = await import(path.join(this._config.commands_path, module));

            if (this._commands.hasOwnProperty(commandName)) {
                throw new Error(`Command with name '${commandName}' already exists.`);
            }

            this._commands[commandName] = handler;
        }
    };
};

export default CozyTg;