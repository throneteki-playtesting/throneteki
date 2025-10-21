import express from 'express';
import ViteExpress from 'vite-express';
const app = express();
import bodyParser from 'body-parser';
import passport from 'passport';
import logger from './log.js';
import { init as ApiInit } from './api/index.js';
import http from 'http';
import Sentry from '@sentry/node';
import passportJwt from 'passport-jwt';
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

import ServiceFactory from './services/ServiceFactory.js';

const __dirname = import.meta.dirname;

class Server {
    constructor(isDeveloping) {
        logger.info(`Server constructor: isDeveloping=${isDeveloping}`);
        this.isDeveloping = isDeveloping;
        this.configService = ServiceFactory.configService();
    }

    async init(options) {
        logger.info('Server.init: Starting initialization...');

        logger.info('Server.init: Creating UserService...');
        this.userService = ServiceFactory.userService(options.db, this.configService);
        logger.info('Server.init: UserService created');

        logger.info('Server.init: Creating HTTP server...');
        this.server = http.Server(app);
        logger.info('Server.init: HTTP server created');

        if (!this.isDeveloping) {
            logger.info('Server.init: Production mode - initializing Sentry...');
            const sentryDsn = this.configService.getValue('sentryDsn');
            logger.info(`Server.init: Sentry DSN configured: ${sentryDsn ? 'Yes' : 'No'}`);
            Sentry.init({
                dsn: sentryDsn,
                release: process.env.VERSION || 'Local build',
                includeLocalVariables: true
            });
            app.use(Sentry.Handlers.requestHandler());
            app.use(Sentry.Handlers.errorHandler());
            logger.info('Server.init: Sentry initialized');
        } else {
            logger.info('Server.init: Development mode - Sentry disabled');
        }

        logger.info('Server.init: Configuring JWT authentication...');
        var opts = {};
        opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        opts.secretOrKey = this.configService.getValue('secret');
        logger.info(`Server.init: JWT secret configured: ${opts.secretOrKey ? 'Yes' : 'No'}`);

        passport.use(
            new JwtStrategy(opts, (jwtPayload, done) => {
                this.userService
                    .getUserById(jwtPayload._id)
                    .then((user) => {
                        if (user) {
                            return done(null, user.getWireSafeDetails());
                        }

                        return done(null, false);
                    })
                    .catch((err) => {
                        return done(err, false);
                    });
            })
        );
        logger.info('Server.init: JWT strategy configured');

        app.use(passport.initialize());
        logger.info('Server.init: Passport initialized');

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        logger.info('Server.init: Body parser middleware added');

        logger.info('Server.init: Initializing API routes...');
        await ApiInit(app, options);
        logger.info('Server.init: API routes initialized');

        logger.info('Server.init: Configuring static file serving...');
        app.use(express.static(__dirname + '/../public'));
        app.use(express.static(__dirname + '/../dist'));
        logger.info('Server.init: Static file middleware configured');

        // Define error middleware last
        app.use(function (err, req, res, next) {
            logger.error(err);

            if (!res.headersSent && req.xhr) {
                return res.status(500).send({ success: false });
            }

            next(err);
        });
        logger.info('Server.init: Error middleware configured');

        logger.info('Server.init: Initialization complete');
        return this.server;
    }

    run() {
        let port = process.env.PORT || this.configService.getValue('port') || 4000;
        logger.info(`Server.run: Configured port: ${port}`);

        logger.info('Server.run: Binding Vite Express...');
        try {
            ViteExpress.bind(app, this.server);
            logger.info('Server.run: Vite Express bound successfully');
        } catch (err) {
            logger.error('Server.run: Failed to bind Vite Express');
            logger.error('Error:', err);
            throw err;
        }

        logger.info(`Server.run: Starting to listen on port ${port}...`);
        this.server.listen(port, '0.0.0.0', function onStart(err) {
            if (err) {
                logger.error('Server.run: Failed to start listening');
                logger.error('Error:', err);
                throw err;
            }

            logger.info(
                '==> ?? Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.',
                port,
                port
            );
            logger.info('=== SERVER IS NOW RUNNING ===');
        });

        // Add event listeners for server events
        this.server.on('error', (err) => {
            logger.error('Server error event:', err);
            if (err.code === 'EADDRINUSE') {
                logger.error(`Port ${port} is already in use`);
            }
        });

        this.server.on('close', () => {
            logger.info('Server closed');
        });
    }

    serializeUser(user, done) {
        if (user) {
            done(null, user._id);
        }
    }
}

export default Server;
