import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

import { Context } from '@context/createContext';
import { MilkshakeResponse } from '@dataTypes/response/MilkshakeResponse';

@Resolver()
export class DeleteMilkshakeResolver {
    @Mutation((returns) => MilkshakeResponse)
    async deleteMilkshake(
        @Ctx() ctx: Context,
        @Arg('id') id: number
    ): Promise<MilkshakeResponse> {
        let userId = await (ctx.session as any).userId;

        if (!userId) {
            return {
                error: {
                    message: 'Please sign in to be able to delete a milkshake',
                    field: 'auth',
                },
                success: false,
            };
        }
        const milkshakeToDelete = await ctx.prisma.milkshake.findFirst({
            where: { id: id, userId: userId },
        });

        if (!milkshakeToDelete) {
            return {
                error: {
                    message: 'Invalid milkshake id',
                    field: 'id',
                },
            };
        }

        const deletedMilkshake = await ctx.prisma.milkshake.delete({
            where: {
                id,
            },
        });

        if (deletedMilkshake) {
            return {
                success: true,
            };
        }

        return {
            error: {
                message: 'Could not delete the Milkshake',
            },
        };
    }
}
