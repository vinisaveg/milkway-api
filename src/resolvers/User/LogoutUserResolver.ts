import { Resolver, Query, Ctx } from 'type-graphql';

import { Context } from '@context/createContext';

@Resolver()
export class LogoutUserResolver {
    @Query(() => Boolean)
    async logoutUser(@Ctx() ctx: Context): Promise<Boolean> {
        if (ctx.session) {
            (ctx.session as any).userId = null;

            return true;
        }

        return false;
    }
}
