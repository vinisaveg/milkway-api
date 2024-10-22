import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PrismaClient } from '@prisma/client';

import express from 'express';
import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';
import cors from 'cors';

import { environment } from '@config/environment';

import { createContext } from '@context/createContext';

import { FindUsersResolver } from '@resolvers/User/FindUsersResolver';
import { RegisterUserResolver } from '@resolvers/User/RegisterUserResolver';
import { SignInUserResolver } from '@resolvers/User/SignInUserResolver';
import { UpdateUserInfoResolver } from '@resolvers/User/UpdateUserInfoResolver';
import { UpdateUserPasswordResolver } from '@resolvers/User/UpdateUserPasswordResolver';
import { DeleteUserResolver } from '@resolvers/User/DeleteUserResolver';
import { AuthUserResolver } from '@resolvers/User/AuthUserResolver';
import { LogoutUserResolver } from '@resolvers/User/LogoutUserResolver';
import { CreateMilkshakeResolver } from '@resolvers/Milkshake/CreateMilkshakeResolver';
import { FindMilkshakesResolver } from '@resolvers/Milkshake/FindMilkshakesResolver';
import { DeleteMilkshakeResolver } from '@resolvers/Milkshake/DeleteMilkshakeResolver';
import { UpdateMilkshakeResolver } from '@resolvers/Milkshake/UpdateMilkshakeResolver';
import { FindMilkshakeResolver } from '@resolvers/Milkshake/FindMilkshakeResolver';
import { FindUserMilkshakesResolver } from '@resolvers/Milkshake/FindUserMilkshakesResolver';

export const bootstrapServer = async () => {
    const prisma = new PrismaClient();

    const app = express();

    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient();

    app.use(
        cors({
            origin: process.env.ORIGIN || '',
            credentials: true,
            exposedHeaders: ['set-cookie'],
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
            SignInUserResolver,
            AuthUserResolver,
            LogoutUserResolver,
            UpdateUserInfoResolver,
            UpdateUserPasswordResolver,
            DeleteUserResolver,
            FindMilkshakesResolver,
            FindMilkshakeResolver,
            FindUserMilkshakesResolver,
            CreateMilkshakeResolver,
            DeleteMilkshakeResolver,
            UpdateMilkshakeResolver,
        ],
    });

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }) => createContext(prisma, req, res),
    });

    apolloServer.applyMiddleware({
        app,
        cors: false,
    });

    return app.listen({
        port: 4000,
    });
};
