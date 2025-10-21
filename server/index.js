import Server from './server.js';
import Lobby from './lobby.js';
import pmx from 'pmx';
import monk from 'monk';
import ServiceFactory from './services/ServiceFactory.js';
import CardService from './services/CardService.js';
import logger from './log.js';

let configService = ServiceFactory.configService();

async function runServer() {
    logger.info('runServer: Starting...');

    let options = {
        instance: configService.getValue('instance') || {}
    };
    logger.info('runServer: Instance config loaded');

    const dbPath = configService.getValue('dbPath');
    logger.info(`runServer: Attempting to connect to database at: ${dbPath}`);

    try {
        await monk(dbPath).then((db) => {
            options.db = db;
            logger.info('runServer: Database connection established successfully');
        });
    } catch (err) {
        logger.error('runServer: Database connection FAILED');
        logger.error('Database path:', dbPath);
        logger.error('Error:', err);
        throw new Error(`Database connection failed: ${err.message}`);
    }

    logger.info('runServer: Initializing CardService...');
    options.cardService = new CardService(options.db);
    logger.info('runServer: CardService initialized');

    logger.info('runServer: Creating Server instance...');
    let server = new Server(process.env.NODE_ENV !== 'production');
    logger.info('runServer: Server instance created');

    logger.info('runServer: Initializing HTTP server...');
    let httpServer = await server.init(options);
    logger.info('runServer: HTTP server initialized');

    logger.info('runServer: Creating Lobby instance...');
    let lobby = new Lobby(httpServer, options);
    logger.info('runServer: Lobby instance created');

    logger.info('runServer: Initializing lobby...');
    await lobby.init();
    logger.info('runServer: Lobby initialized successfully');

    pmx.action('status', (reply) => {
        var status = lobby.getStatus();

        reply(status);
    });

    pmx.action('disable', (param, reply) => {
        if (!param) {
            reply({ error: 'Need to specify node to disable' });

            return;
        }

        reply({ success: lobby.disableNode(param) });
    });

    pmx.action('enable', (param, reply) => {
        if (!param) {
            reply({ error: 'Need to specify node to enable' });

            return;
        }

        reply({ success: lobby.enableNode(param) });
    });

    pmx.action('debug', (reply) => {
        reply(lobby.debugDump());
    });

    logger.info('runServer: Starting HTTP server...');
    server.run();
    logger.info('runServer: HTTP server started');
}

export default runServer;
