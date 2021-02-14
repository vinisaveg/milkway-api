import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class RegisterUserInput {
    @Field()
    name: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    nickname: string;

    @Field()
    password: string;
}
