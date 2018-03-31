const TelegramBot = require('node-telegram-bot-api')

const TOKEN = process.env.TOKEN

const bot = new TelegramBot(TOKEN)

bot.setWebHook(`https://us-central1-${config.projectId}.cloudfunctions.net/bot/${TOKEN}`)
