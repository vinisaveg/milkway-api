import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

import { Milkshake } from '@entities/milkshake/Milkshake';
import { CreateMilkshakeInput } from '@dataTypes/inputs/milkshake/CreateMilkshakeInput';
import { Context } from '@context/createContext';

@Resolver()
export class CreateMilkshakeResolver {
    @Mutation((returns) => Milkshake)
    async createMilkshake(
        @Arg('data') data: CreateMilkshakeInput,
        @Ctx() ctx: Context
    ) {
        const newMilkshake = await ctx.prisma.milkshake.create({
            data: data,
        });

        return newMilkshake;
    }
}
