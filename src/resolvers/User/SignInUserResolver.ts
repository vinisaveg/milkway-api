import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

import bcrypt from 'bcryptjs';

import { Context } from '@context/createContext';
import { SignInUserInput } from '@dataTypes/inputs/SignInUserInput';
import { UserResponse } from '@dataTypes/response/UserResponse';

@Resolver()
export class SignInUserResolver {
    @Mutation((of) => UserResponse)
    async signInUser(@Ctx() ctx: Context, @Arg('data') data: SignInUserInput) {
        const user = await ctx.prisma.user.findFirst({
            where: {
                nickname: data.nickname,
            },
            select: {
                id: true,
                name: true,
                email: true,
                nickname: true,
                password: true,
            },
        });

        if (user?.password) {
            let result = await bcrypt.compare(data.password, user.password);

            if (result) {
                (ctx.session as any).userId = user.id;

                return {
                    success: true,
                };
            }
        }

        return {
            success: false,
            error: {
                message: 'Nickname or password is incorrect',
                field: 'nickname/password',
            },
        };
    }
}
