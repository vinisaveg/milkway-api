import { Mutation, Resolver } from 'type-graphql';

@Resolver()
export class SignInUserResolver {
    @Mutation()
    async signInUser() {
        // Do some stuff
    }
}
