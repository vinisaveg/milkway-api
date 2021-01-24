import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import { HelloResolver } from '@resolvers/HelloResolver';

export const bootstrapServer = async () => {
    const schema = await buildSchema({
        resolvers: [HelloResolver],
    });

    const apolloServer = new ApolloServer({
        schema,
    });

    apolloServer.listen(4000);
};
