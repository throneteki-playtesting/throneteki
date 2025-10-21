import config from 'config';
import logger from '../log.js';

class ConfigService {
    constructor() {
        logger.info('ConfigService: Initializing...');
        logger.info(`ConfigService: NODE_ENV = ${process.env.NODE_ENV || 'not set'}`);
        logger.info(`ConfigService: NODE_CONFIG_DIR = ${process.env.NODE_CONFIG_DIR || 'default'}`);

        // Log which config file is being used
        try {
            const configSources = config.util.getConfigSources();
            logger.info('ConfigService: Configuration sources:');
            configSources.forEach((source) => {
                logger.info(`  - ${source.name}`);
            });
        } catch (err) {
            logger.warn('ConfigService: Could not get config sources:', err.message);
        }
    }

    getValue(key) {
        if (!config.has(key)) {
            logger.warn(
                `ConfigService: Asked for config value '${key}', but it was not configured`
            );
            return undefined;
        }

        const value = config.get(key);

        // Log the retrieval (mask sensitive values)
        const sensitiveKeys = ['secret', 'password', 'key', 'token', 'dsn'];
        const isSensitive = sensitiveKeys.some((s) => key.toLowerCase().includes(s));

        if (isSensitive) {
            logger.debug(`ConfigService: Retrieved '${key}' = [REDACTED]`);
        } else {
            logger.debug(`ConfigService: Retrieved '${key}' = ${JSON.stringify(value)}`);
        }

        return value;
    }
}

export default ConfigService;
