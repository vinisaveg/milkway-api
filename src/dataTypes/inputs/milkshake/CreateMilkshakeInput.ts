import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class CreateMilkshakeInput {
    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    recipe: string;

    @Field((type) => [String])
    ingredients: Array<string>;

    @Field()
    iconColorA: string;

    @Field()
    iconColorB: string;
}
