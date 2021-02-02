import { Resolver, Query, Ctx } from 'type-graphql';

import { Context } from '@context/createContext';
import { User } from '@entities/user/User';

@Resolver()
export class AuthUserResolver {
    @Query(() => User, { nullable: true })
    async authUser(@Ctx() ctx: Context): Promise<User | null> {
        let userId = await (ctx.session as any).userId;

        if (userId) {
            const user = await ctx.prisma.user.findFirst({
                where: {
                    id: userId,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    nickname: true,
                },
            });

            return user;
        }

        return null;
    }
}
