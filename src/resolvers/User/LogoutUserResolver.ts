import { Resolver, Query, Ctx } from 'type-graphql';

import { Context } from '@context/createContext';
@Resolver()
export class LogoutUserResolver {
    @Query(() => Boolean)
    async logoutUser(@Ctx() ctx: Context): Promise<Boolean> {
        if (ctx.request.session) {
            ctx.request.session.destroy(() => {});

            ctx.response.clearCookie('sid', {
                path: '/',
            });

            return true;
        }

        return false;
    }
}
