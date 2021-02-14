import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

import { Milkshake } from '@entities/milkshake/Milkshake';
import { Context } from '@context/createContext';
import { UpdateMilkshakeInput } from '@dataTypes/inputs/milkshake/UpdateMilkshakeInput';

@Resolver()
export class UpdateMilkshakeResolver {
    @Mutation((returns) => Milkshake)
    async updateMilkshake(
        @Ctx() ctx: Context,
        @Arg('id') id: number,
        @Arg('data') data: UpdateMilkshakeInput
    ): Promise<Milkshake> {
        const updatedMilkshake = await ctx.prisma.milkshake.update({
            where: { id },
            data: { ...data },
        });

        return updatedMilkshake;
    }
}
