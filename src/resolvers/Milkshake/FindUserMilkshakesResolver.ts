import { Arg, Ctx, Query, Resolver } from 'type-graphql';

import { Milkshake } from '@entities/milkshake/Milkshake';
import { Context } from '@context/createContext';

@Resolver()
export class FindUserMilkshakesResolver {
    @Query((returns) => [Milkshake])
    async findUserMilkshakes(
        @Ctx() ctx: Context,
        @Arg('id') userId: number,
        @Arg('limit', { nullable: true }) limit: number
    ): Promise<Array<Milkshake>> {
        const userMilkshakes = await ctx.prisma.milkshake.findMany({
            where: {
                userId: userId,
            },
            take: limit,
        });

        return userMilkshakes;
    }
}
