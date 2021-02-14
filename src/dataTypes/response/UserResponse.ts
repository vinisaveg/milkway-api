import { Field, ObjectType } from 'type-graphql';

import { User } from '@entities/user/User';
import { ErrorType } from '@dataTypes/error/Error';

@ObjectType()
export class UserResponse {
    @Field((type) => User, { nullable: true })
    user?: User;

    @Field((type) => ErrorType, { nullable: true })
    error?: ErrorType | null;

    @Field({ nullable: true })
    success?: boolean;
}
