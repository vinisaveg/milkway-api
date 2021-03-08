import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
export interface Context {
    prisma: PrismaClient;
    request: Request;
    response: Response;
}

export const createContext = (
    prisma: PrismaClient,
    request: Request,
    response: Response
): Context => {
    return {
        prisma,
        request,
        response,
    };
};
