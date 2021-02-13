import { IsEmail } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { Milkshake } from '@entities/milkshake/Milkshake';
@ObjectType()
export class User {
    @Field((type) => ID)
    id: number;

    @Field()
    name: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    nickname: string;

    @Field((type) => String, { nullable: true })
    password?: string | null;

    @Field((type) => [Milkshake], { nullable: true })
    milkshakes?: Array<Milkshake>;
}
