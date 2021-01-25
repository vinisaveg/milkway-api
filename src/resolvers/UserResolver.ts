import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import bcrypt from 'bcryptjs';

import { environment } from 'src/config/environment';

import { User } from '@entities/user/User';
import { Context } from '@context/createContext';
import { CreateUserInput } from '@dataTypes/inputs/CreateUserInput';
import { UpdateUserInput } from '@dataTypes/inputs/UpdateUserInput';
import { UserResponse } from '@dataTypes/response/UserResponse';

@Resolver()
export class UserResolver {
    @Query((returns) => [User])
    async users(@Ctx() ctx: Context): Promise<Array<User>> {
        const users = await ctx.prisma.user.findMany();

        return users;
    }

    @Mutation((returns) => UserResponse)
    async createUser(
        @Ctx() ctx: Context,
        @Arg('data') data: CreateUserInput
    ): Promise<UserResponse> {
        let salt = bcrypt.genSaltSync(environment.saltRounds);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        if (data.password.length <= 6) {
            return {
                error: {
                    message: 'Length must be greater than 6.',
                    field: 'Password',
                },
                success: false,
            };
        }

        if (data.nickname.length <= 3) {
            return {
                error: {
                    message: 'Length must be greater than 3.',
                    field: 'Nickname',
                },
                success: false,
            };
        }

        const newUser = await ctx.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                nickname: data.nickname,
                password: hashedPassword,
            },
        });

        if (newUser) {
            return {
                user: newUser,
                success: true,
            };
        }

        return {
            error: {
                message: 'Could not create the user',
            },
            success: false,
        };
    }

    @Mutation((returns) => UserResponse)
    async updateUserInfo(
        @Ctx() ctx: Context,
        @Arg('id') id: number,
        @Arg('data') data: UpdateUserInput
    ): Promise<UserResponse> {
        const updatedUser = await ctx.prisma.user.update({
            where: {
                id,
            },
            data: {
                ...data,
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
                message: 'Could not update the user',
            },
        };
    }

    @Mutation((returns) => UserResponse)
    async updateUserPassword(
        @Ctx() ctx: Context,
        @Arg('id') id: number,
        @Arg('password') password: string
    ): Promise<UserResponse> {
        let salt = bcrypt.genSaltSync(environment.saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (password.length <= 6) {
            return {
                error: {
                    message: 'Password must be greater than 6',
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
        });

        if (user) {
            return {
                user,
                success: true,
            };
        }

        return {
            error: {
                message: 'Could not update the password',
            },
            success: false,
        };
    }

    @Mutation((returns) => UserResponse)
    async deleteUser(
        @Ctx() ctx: Context,
        @Arg('id') id: number
    ): Promise<UserResponse> {
        const deletedUser = await ctx.prisma.user.delete({
            where: {
                id,
            },
        });

        if (deletedUser) {
            return {
                success: true,
            };
        }

        return {
            success: false,
            error: {
                message: 'Could not delete the user',
            },
        };
    }
}
