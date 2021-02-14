import { Field, InputType } from 'type-graphql';

@InputType()
export class SignInUserInput {
    @Field()
    nickname: string;

    @Field()
    password: string;
}
