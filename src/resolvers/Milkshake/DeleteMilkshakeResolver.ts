import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

import { Context } from '@context/createContext';
import { Milkshake } from '@entities/milkshake/Milkshake';

@Resolver()
export class DeleteMilkshakeResolver {
    @Mutation((returns) => Milkshake)
    async deleteMilkshake(
        @Ctx() ctx: Context,
        @Arg('id') id: number
    ): Promise<Milkshake> {
        const deletedMilkshake = await ctx.prisma.milkshake.delete({
            where: {
                id,
            },
        });

        return deletedMilkshake;
    }
}
