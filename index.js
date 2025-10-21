import runServer from './server/index.js';
import logger from './server/log.js';

logger.info('=== Application Starting ===');
logger.info(`Node version: ${process.version}`);
logger.info(`Platform: ${process.platform}`);
logger.info(`Architecture: ${process.arch}`);
logger.info(`Working directory: ${process.cwd()}`);
logger.info(`NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
logger.info(`PORT: ${process.env.PORT || 'not set'}`);

// Log environment variables (excluding sensitive ones)
const envVars = Object.keys(process.env).filter(
    (key) =>
        !key.toLowerCase().includes('secret') &&
        !key.toLowerCase().includes('password') &&
        !key.toLowerCase().includes('key') &&
        !key.toLowerCase().includes('token')
);
logger.info(`Environment variables present: ${envVars.join(', ')}`);

// Add uncaught exception handlers
process.on('uncaughtException', (err) => {
    logger.error('=== UNCAUGHT EXCEPTION ===');
    logger.error('Error:', err);
    logger.error('Stack:', err.stack);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('=== UNHANDLED REJECTION ===');
    logger.error('Promise:', promise);
    logger.error('Reason:', reason);
    process.exit(1);
});

logger.info('Starting server initialization...');

runServer()
    .then(() => {
        logger.info('=== Server finished startup successfully ===');
    })
    .catch((err) => {
        logger.error('=== Server crashed during startup ===');
        logger.error('Error message:', err.message);
        logger.error('Error stack:', err.stack);
        logger.error('Error details:', err);
        process.exit(1);
    });
