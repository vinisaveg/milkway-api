import { Field, ObjectType } from 'type-graphql';

import { ErrorType } from '@dataTypes/error/Error';
import { Milkshake } from '@entities/milkshake/Milkshake';

@ObjectType()
export class MilkshakeResponse {
    @Field((type) => Milkshake, { nullable: true })
    milkshake?: Milkshake;

    @Field((type) => ErrorType, { nullable: true })
    error?: ErrorType;

    @Field({ nullable: true })
    success?: boolean;
}
