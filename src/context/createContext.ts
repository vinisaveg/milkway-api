import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
export interface Context {
    prisma: PrismaClient;
    session: Request['session'];
}

export const createContext = (
    prisma: PrismaClient,
    session: Request['session']
): Context => {
    return {
        prisma,
        session,
    };
};
