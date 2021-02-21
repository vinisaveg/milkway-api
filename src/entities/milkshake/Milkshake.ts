import { Field, ID, ObjectType } from 'type-graphql';
@ObjectType()
export class Milkshake {
    @Field((type) => ID)
    id: number;

    @Field((type) => Number, { nullable: true })
    userId?: number | null;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    instructions: string;

    @Field((type) => [String])
    ingredients: Array<string>;

    @Field()
    iconColorA: string;

    @Field()
    iconColorB: string;
}
