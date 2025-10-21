import { init as AccountInit } from './account.js';
import { init as EventsInit } from './events.js';
import { init as DecksInit } from './decks.js';
import { init as DraftCubesInit } from './draftCubes.js';
import { init as CardsInit } from './cards.js';
import { init as NewsInit } from './news.js';
import { init as UserInit } from './user.js';
import { init as MessagesInit } from './messages.js';
import { init as BanlistInit } from './banlist.js';
import logger from '../log.js';

export const init = async function (server, options) {
    logger.info('API.init: Initializing API routes...');

    // Health check endpoint
    server.get('/api/health', (req, res) => {
        res.status(200).json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            version: process.env.VERSION || 'Local build',
            nodeVersion: process.version
        });
    });
    logger.info('API.init: Health check endpoint registered');

    // Readiness check endpoint
    server.get('/api/ready', async (req, res) => {
        try {
            // Check database connection
            if (options.db) {
                await options.db.listCollections().toArray();
            }
            res.status(200).json({ status: 'ready' });
        } catch (err) {
            logger.error('Readiness check failed:', err);
            res.status(503).json({ status: 'not ready', error: err.message });
        }
    });
    logger.info('API.init: Readiness check endpoint registered');

    logger.info('API.init: Initializing Account routes...');
    AccountInit(server, options);

    logger.info('API.init: Initializing Decks routes...');
    await DecksInit(server, options);

    logger.info('API.init: Initializing DraftCubes routes...');
    DraftCubesInit(server, options);

    logger.info('API.init: Initializing Cards routes...');
    CardsInit(server, options);

    logger.info('API.init: Initializing News routes...');
    NewsInit(server, options);

    logger.info('API.init: Initializing User routes...');
    UserInit(server, options);

    logger.info('API.init: Initializing Messages routes...');
    MessagesInit(server, options);

    logger.info('API.init: Initializing Banlist routes...');
    BanlistInit(server, options);

    logger.info('API.init: Initializing Events routes...');
    await EventsInit(server, options);

    logger.info('API.init: All API routes initialized successfully');
};
