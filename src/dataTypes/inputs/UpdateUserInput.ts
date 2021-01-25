import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateUserInput {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    @IsEmail()
    email?: string;

    @Field({ nullable: true })
    nickname?: string;
}
