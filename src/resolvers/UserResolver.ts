import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import bcrypt from 'bcryptjs';

import { environment } from 'src/config/environment';

import { User } from '@entities/user/User';
import { Context } from '@context/createContext';
import { CreateUserInput } from '@dataTypes/inputs/CreateUserInput';
import { UpdateUserInput } from '@dataTypes/inputs/UpdateUserInput';
import { UserResponse } from '@dataTypes/response/UserResponse';
import { handleUserResponse } from 'src/utils/handleUserResponse';

@Resolver()
export class UserResolver {
    @Query((returns) => [User])
    async users(@Ctx() ctx: Context): Promise<Array<User>> {
        const users = await ctx.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                nickname: true,
            },
        });

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
            return handleUserResponse({
                message: 'length must be greater than 6.',
                field: 'password',
            });
        }

        if (data.nickname.length <= 3) {
            return handleUserResponse({
                message: 'length must be greater than 3.',
                field: 'nickname',
            });
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
            return handleUserResponse({
                message: 'this email already has an account',
                field: 'email',
            });
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
            return handleUserResponse(null, true, newUser);
        }

        return handleUserResponse({
            message: 'could not create the user',
        });
    }

    @Mutation((returns) => UserResponse)
    async updateUserInfo(
        @Ctx() ctx: Context,
        @Arg('id') id: number,
        @Arg('data') data: UpdateUserInput
    ): Promise<UserResponse> {
        if (data.nickname) {
            if (data.nickname.length <= 3) {
                return handleUserResponse({
                    message: 'length must be greater than 6.',
                    field: 'nickname',
                });
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
            return handleUserResponse(null, true, updatedUser);
        }

        return handleUserResponse({
            message: 'could not create the user',
        });
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
            return handleUserResponse({
                message: 'password must be greater than 6',
            });
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
            return handleUserResponse(null, true);
        }

        return handleUserResponse({
            message: 'could not update the password',
        });
    }

    @Mutation((returns) => UserResponse)
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
                return handleUserResponse(null, true);
            }
        }

        return handleUserResponse({ message: 'could not find user id' });
    }
}
