const fastify = require('fastify')({
    logger: true
});
const PORT = process.env.port || 3000;
require('dotenv').config();
const axios = require('axios').default;
const TeleBot = require('telebot');

fastify.register(require('./routes/default-route'));


const initBot = () => {
    const bot = new TeleBot(`${process.env.TELEGRAM_BOT_TOKEN}`);
    return bot;
}

const initBotMethods = (bot) => {
    bot.on(['/start', '/hello'], (msg) => {
        return msg.reply.text('Welcome!');
    });

    bot.on(/(tell\s)?joke*/, async (msg) => {
        const result = await axios.get('https://official-joke-api.appspot.com/random_joke');
        if (result?.data) {
            return msg.reply.text(`${result.data.setup}\n\n ---${result.data.punchline}`);
        } else {
            return msg.reply.text("Let's retry that!");
        }
    });

}

const startBot = () => {
    const bot = initBot();
    initBotMethods(bot);
    bot.start();
}

const start = async () => {
    try {
        await fastify.listen(PORT);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

startBot();
start();