import { UserResponse } from '@dataTypes/response/UserResponse';
import { User } from '@entities/user/User';

export const handleUserResponse = (
    error?: { field?: string; message?: string } | null,
    success?: boolean,
    user?: User
): UserResponse => {
    return {
        success: success || false,
        error,
        user,
    };
};
