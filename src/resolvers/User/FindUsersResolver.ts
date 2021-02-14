import { Ctx, Query, Resolver } from 'type-graphql';

import { User } from '@entities/user/User';
import { Context } from '@context/createContext';
@Resolver()
export class FindUsersResolver {
    @Query((of) => [User])
    async findUsers(@Ctx() ctx: Context): Promise<Array<User>> {
        const users = await ctx.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                nickname: true,
                milkshakes: true,
            },
        });

        return users;
    }
}
