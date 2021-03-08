import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

import { CreateMilkshakeInput } from '@dataTypes/inputs/milkshake/CreateMilkshakeInput';
import { Context } from '@context/createContext';
import { MilkshakeResponse } from '@dataTypes/response/MilkshakeResponse';

@Resolver()
export class CreateMilkshakeResolver {
    @Mutation((returns) => MilkshakeResponse)
    async createMilkshake(
        @Arg('data') data: CreateMilkshakeInput,
        @Ctx() ctx: Context
    ): Promise<MilkshakeResponse> {
        if (data.name.length < 2) {
            return {
                error: {
                    message: 'length should be greater than 1',
                    field: 'name',
                },
            };
        }

        let userId = await (ctx.request.session as any).userId;

        if (!userId) {
            return {
                error: {
                    message: 'Please sign in to be able to create a milkshake',
                    field: 'auth',
                },
            };
        }

        const findUserById = await ctx.prisma.user.findFirst({
            where: { id: userId },
        });

        if (!findUserById) {
            return {
                error: {
                    message: 'Could not associate this recipe with a user',
                    field: 'userId',
                },
            };
        }

        const newMilkshake = await ctx.prisma.milkshake.create({
            data: { ...data, userId: userId },
        });

        if (newMilkshake) {
            return {
                milkshake: newMilkshake,
                success: true,
            };
        }

        return {
            error: {
                message: 'Could not create your milkshake. Try again',
            },
        };
    }
}
