import { Context } from '@context/createContext';
import { Ctx, Mutation, Query, Resolver } from 'type-graphql';
@Resolver()
export class SignInUserResolver {
    @Query((of) => String)
    async signInUser(@Ctx() ctx: Context) {
        const id = ctx.request.session.id;

        return `here: ${id}`;
    }
}
