import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

import { UserResponse } from '@dataTypes/response/UserResponse';
import { Context } from '@context/createContext';

@Resolver()
export class DeleteUserResolver {
    @Mutation((of) => UserResponse)
    async deleteUser(
        @Ctx() ctx: Context,
        @Arg('id') id: number
    ): Promise<UserResponse> {
        const userToDelete = await ctx.prisma.user.findFirst({
            where: {
                id,
            },
        });

        if (userToDelete) {
            const deletedUser = await ctx.prisma.user.delete({
                where: {
                    id,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    nickname: true,
                },
            });

            if (deletedUser.id) {
                return {
                    success: true,
                };
            }
        }

        return {
            success: false,
            error: {
                message: 'could not find user id',
            },
        };
    }
}
