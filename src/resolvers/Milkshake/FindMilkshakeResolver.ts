import { Context } from '@context/createContext';
import { Milkshake } from '@entities/milkshake/Milkshake';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';

@Resolver()
export class FindMilkshakeResolver {
    @Query((returns) => Milkshake)
    async findMilkshake(
        @Ctx() ctx: Context,
        @Arg('id') id: number
    ): Promise<Milkshake | null> {
        const findedMilkshake = await ctx.prisma.milkshake.findFirst({
            where: { id },
        });

        return findedMilkshake;
    }
}
