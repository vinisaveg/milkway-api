import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import { createContext } from '@context/createContext';

import { FindUsersResolver } from '@resolvers/User/FindUsersResolver';
import { RegisterUserResolver } from '@resolvers/User/RegisterUserResolver';
import { UpdateUserInfoResolver } from '@resolvers/User/UpdateUserInfoResolver';
import { UpdateUserPasswordResolver } from '@resolvers/User/UpdateUserPasswordResolver';
import { DeleteUserResolver } from '@resolvers/User/DeleteUserResolver';

export const bootstrapServer = async () => {
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

    return apolloServer.listen({
        port: 4000,
    });
};
