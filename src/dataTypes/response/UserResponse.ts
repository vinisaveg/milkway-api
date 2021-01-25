import { Field, ObjectType } from 'type-graphql';

import { User } from '@entities/user/User';

@ObjectType()
export class ErrorType {
    @Field()
    message?: string;

    @Field({ nullable: true })
    field?: string;
}

@ObjectType()
export class UserResponse {
    @Field((type) => User, { nullable: true })
    user?: User;

    @Field((type) => ErrorType, { nullable: true })
    error?: ErrorType | null;

    @Field({ nullable: true })
    success?: boolean;
}
