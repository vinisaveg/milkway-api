import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
export interface Context {
    prisma: PrismaClient;
    request: Request;
}

export const createContext = (
    prisma: PrismaClient,
    request: Request
): Context => {
    return {
        prisma,
        request,
    };
};
