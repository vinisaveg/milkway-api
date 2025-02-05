import { Arg, Ctx, Query, Resolver } from 'type-graphql';

import { Milkshake } from '@entities/milkshake/Milkshake';
import { Context } from '@context/createContext';

@Resolver()
export class FindMilkshakesResolver {
    @Query((returns) => [Milkshake])
    async findMilkshakes(
        @Ctx() ctx: Context,
        @Arg('limit', { nullable: true }) limit: number
    ): Promise<Array<Milkshake>> {
        const milkshakes = await ctx.prisma.milkshake.findMany({
            take: limit,
            orderBy: {
                createdAt: 'desc',
            },
        });

        return milkshakes;
    }
}
