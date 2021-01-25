import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import { HelloResolver } from '@resolvers/HelloResolver';
import { createContext } from '@context/createContext';
import { UserResolver } from '@resolvers/UserResolver';

export const bootstrapServer = async () => {
    const schema = await buildSchema({
        resolvers: [HelloResolver, UserResolver],
    });

    const apolloServer = new ApolloServer({
        schema,
        context: createContext(),
    });

    return apolloServer.listen({
        port: 4000,
    });
};
