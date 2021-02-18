import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

import { Context } from '@context/createContext';
import { UpdateMilkshakeInput } from '@dataTypes/inputs/milkshake/UpdateMilkshakeInput';
import { MilkshakeResponse } from '@dataTypes/response/MilkshakeResponse';

@Resolver()
export class UpdateMilkshakeResolver {
    @Mutation((returns) => MilkshakeResponse)
    async updateMilkshake(
        @Ctx() ctx: Context,
        @Arg('id') id: number,
        @Arg('data') data: UpdateMilkshakeInput
    ): Promise<MilkshakeResponse> {
        let userId = await (ctx.session as any).userId;

        if (!userId) {
            return {
                error: {
                    message: 'Please sign in to be able to update a milkshake',
                    field: 'auth',
                },
            };
        }

        const milkshakeToUpdate = await ctx.prisma.milkshake.findFirst({
            where: { id: id, userId: userId },
        });

        if (!milkshakeToUpdate) {
            return {
                success: false,
                error: {
                    message: 'Invalid milkshake id',
                    field: 'id',
                },
            };
        }

        const updatedMilkshake = await ctx.prisma.milkshake.update({
            where: { id },
            data: { ...data },
        });

        if (updatedMilkshake) {
            return {
                success: true,
                milkshake: updatedMilkshake,
            };
        }

        return {
            success: false,
            error: {
                message: 'Could not update the Milkshake',
            },
        };
    }
}
