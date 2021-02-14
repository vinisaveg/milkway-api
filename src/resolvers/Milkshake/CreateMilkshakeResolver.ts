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

        const findUserById = await ctx.prisma.user.findFirst({
            where: { id: data.userId },
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
            data: data,
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
