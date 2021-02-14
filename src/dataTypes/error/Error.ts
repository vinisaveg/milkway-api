import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ErrorType {
    @Field({ nullable: true })
    message?: string;

    @Field({ nullable: true })
    field?: string;
}
