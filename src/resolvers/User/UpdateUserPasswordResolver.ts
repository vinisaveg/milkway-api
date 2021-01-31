import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';

import { environment } from 'src/config/environment';

import { UserResponse } from '@dataTypes/response/UserResponse';
import { Context } from '@context/createContext';

@Resolver()
export class UpdateUserPasswordResolver {
    @Mutation((of) => UserResponse)
    async updateUserPassword(
        @Ctx() ctx: Context,
        @Arg('id') id: number,
        @Arg('password') password: string
    ): Promise<UserResponse> {
        let salt = bcrypt.genSaltSync(environment.saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (password.length <= 6) {
            return {
                success: false,
                error: {
                    message: 'length must be greater than 6.',
                    field: 'password',
                },
            };
        }

        const user = await ctx.prisma.user.update({
            where: {
                id,
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

        if (user) {
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
}
