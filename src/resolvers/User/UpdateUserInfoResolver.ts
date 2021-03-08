import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

import { UserResponse } from '@dataTypes/response/UserResponse';
import { UpdateUserInput } from '@dataTypes/inputs/user/UpdateUserInput';
import { Context } from '@context/createContext';

@Resolver()
export class UpdateUserInfoResolver {
    @Mutation((of) => UserResponse)
    async updateUserInfo(
        @Ctx() ctx: Context,
        @Arg('data') data: UpdateUserInput
    ): Promise<UserResponse> {
        let userId = await (ctx.request.session as any).userId;

        if (!userId) {
            return {
                error: {
                    message: 'Please sign in to be able to update your info',
                    field: 'auth',
                },
            };
        }

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
                id: userId,
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
                message: 'could not update the user',
            },
        };
    }
}
