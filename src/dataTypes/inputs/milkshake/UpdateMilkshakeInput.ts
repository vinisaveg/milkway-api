import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateMilkshakeInput {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    recipe?: string;

    @Field((type) => [String], { nullable: true })
    ingredients?: Array<string>;

    @Field({ nullable: true })
    iconColorA?: string;

    @Field({ nullable: true })
    iconColorB?: string;
}
