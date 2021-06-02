async function routes(fastify, options) {

    fastify.get('/', async (request, reply) => {
        reply
            .code(200)
            .type('text/html')
            .send(`This is a telegram bot server created to tell you jokes. Open the telegram app and ask for a joke from the bot ${process.env.BOT_NAME}`);
    })

    fastify.get('/*', async (request, reply) => {
        reply
            .redirect('/');
    })

}

module.exports = routes;
