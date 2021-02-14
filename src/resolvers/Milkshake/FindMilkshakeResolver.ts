import { Arg, Ctx, Query, Resolver } from 'type-graphql';

import { Context } from '@context/createContext';
import { MilkshakeResponse } from '@dataTypes/response/MilkshakeResponse';
@Resolver()
export class FindMilkshakeResolver {
    @Query((returns) => MilkshakeResponse)
    async findMilkshake(
        @Ctx() ctx: Context,
        @Arg('id') id: number
    ): Promise<MilkshakeResponse> {
        const findedMilkshake = await ctx.prisma.milkshake.findFirst({
            where: { id },
        });

        if (findedMilkshake) {
            return {
                milkshake: findedMilkshake,
                success: true,
            };
        }

        return {
            error: {
                message: 'Could not find the Milkshake',
            },
        };
    }
}
