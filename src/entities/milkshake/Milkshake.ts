import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Milkshake {
    @Field((type) => ID)
    id: number;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field((type) => [String])
    ingredients: Array<string>;
}
