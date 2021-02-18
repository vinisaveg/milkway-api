import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';

import { environment } from '@config/environment';

import { UserResponse } from '@dataTypes/response/UserResponse';
import { Context } from '@context/createContext';

@Resolver()
export class UpdateUserPasswordResolver {
    @Mutation((of) => UserResponse)
    async updateUserPassword(
        @Ctx() ctx: Context,
        @Arg('oldPassword') oldPassword: string,
        @Arg('password') password: string
    ): Promise<UserResponse> {
        let userId = await (ctx.session as any).userId;

        if (!userId) {
            return {
                error: {
                    message:
                        'Please sign in to be able to update your password',
                    field: 'auth',
                },
            };
        }

        if (password.length <= 6) {
            return {
                success: false,
                error: {
                    message: 'length must be greater than 6.',
                    field: 'password',
                },
            };
        }

        const userHashedPassword = await ctx.prisma.user.findFirst({
            where: {
                id: userId,
            },
            select: {
                password: true,
            },
        });

        if (!userHashedPassword?.password) {
            return {
                error: {
                    message: 'Could not check your password',
                    field: 'auth',
                },
            };
        }

        let result = await bcrypt.compare(
            oldPassword,
            userHashedPassword.password
        );

        if (result) {
            let salt = bcrypt.genSaltSync(environment.saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);

            const updatedUser = await ctx.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    password: hashedPassword,
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
                };
            }

            return {
                success: false,
                error: {
                    message: 'could not update the password',
                },
            };
        }

        return {
            success: false,
            error: {
                message: 'the old password is incorrect',
                field: 'password',
            },
        };
    }
}
