import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';

import { environment } from 'src/config/environment';

import { Context } from '@context/createContext';
import { RegisterUserInput } from '@dataTypes/inputs/RegisterUserInput';
import { UserResponse } from '@dataTypes/response/UserResponse';

@Resolver()
export class RegisterUserResolver {
    @Mutation((of) => UserResponse)
    async registerUser(
        @Ctx() ctx: Context,
        @Arg('data') data: RegisterUserInput
    ): Promise<UserResponse> {
        let salt = bcrypt.genSaltSync(environment.saltRounds);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        if (data.password.length <= 6) {
            return {
                success: false,
                error: {
                    message: 'length must be greater than 6.',
                    field: 'password',
                },
            };
        }

        if (data.nickname.length <= 3) {
            return {
                success: false,
                error: {
                    message: 'length must be greater than 3.',
                    field: 'nickname',
                },
            };
        }

        const findUserByEmail = await ctx.prisma.user.findFirst({
            where: {
                email: data.email,
            },
            select: {
                id: true,
                name: true,
                email: true,
                nickname: true,
            },
        });

        if (findUserByEmail) {
            return {
                success: false,
                error: {
                    message: 'this email already has an account',
                    field: 'email',
                },
            };
        }

        const newUser = await ctx.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                nickname: data.nickname,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                nickname: true,
            },
        });

        if (newUser) {
            (ctx.session as any).userId = newUser.id;

            return {
                success: true,
                user: newUser,
            };
        }

        return {
            success: false,
            error: {
                message: 'Could not register the user',
            },
        };
    }
}
