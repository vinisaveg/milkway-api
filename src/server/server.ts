import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import express from 'express';
import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';
import cors from 'cors';

import { createContext } from '@context/createContext';

import { FindUsersResolver } from '@resolvers/User/FindUsersResolver';
import { RegisterUserResolver } from '@resolvers/User/RegisterUserResolver';
import { UpdateUserInfoResolver } from '@resolvers/User/UpdateUserInfoResolver';
import { UpdateUserPasswordResolver } from '@resolvers/User/UpdateUserPasswordResolver';
import { DeleteUserResolver } from '@resolvers/User/DeleteUserResolver';
import { environment } from 'src/config/environment';

export const bootstrapServer = async () => {
    const app = express();

    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient();

    app.use(
        cors({
            credentials: true,
            origin: 'http://localhost:3000',
        })
    );

    app.use(
        session({
            name: 'sid',
            store: new RedisStore({
                client: redisClient,
                disableTouch: true,
            }),
            saveUninitialized: false,
            secret: environment.sessionSecret,
            resave: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
                sameSite: 'lax',
                httpOnly: true,
                secure: environment.prod,
            },
        })
    );

    const schema = await buildSchema({
        resolvers: [
            FindUsersResolver,
            RegisterUserResolver,
            UpdateUserInfoResolver,
            UpdateUserPasswordResolver,
            DeleteUserResolver,
        ],
    });

    const apolloServer = new ApolloServer({
        schema,
        context: createContext(),
    });

    apolloServer.applyMiddleware({
        app,
        cors: false,
    });

    return app.listen({
        port: 4000,
    });
};
