import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

import { UserResponse } from '@dataTypes/response/UserResponse';
import { UpdateUserInput } from '@dataTypes/inputs/UpdateUserInput';
import { Context } from '@context/createContext';

@Resolver()
export class UpdateUserInfoResolver {
    @Mutation((of) => UserResponse)
    async updateUserInfo(
        @Ctx() ctx: Context,
        @Arg('id') id: number,
        @Arg('data') data: UpdateUserInput
    ): Promise<UserResponse> {
        if (data.nickname) {
            if (data.nickname.length <= 3) {
                return {
                    success: false,
                    error: {
                        message: 'length must be greater than 6.',
                        field: 'nickname',
                    },
                };
            }
        }

        const updatedUser = await ctx.prisma.user.update({
            where: {
                id,
            },
            data: {
                ...data,
            },
            select: {
                id: true,
                name: true,
                email: true,
                nickname: true,
            },
        });

        if (updatedUser) {
            return {
                success: true,
                user: updatedUser,
            };
        }

        return {
            success: false,
            error: {
                message: 'could not create the user',
            },
        };
    }
}
