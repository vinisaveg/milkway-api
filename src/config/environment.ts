export const environment = {
    saltRounds: Number(process.env.SALT_ROUNDS) || 10,
    prod: process.env.NODE_ENV === 'production',
    sessionSecret: process.env.SESSION_SECRET || 'milkway',
};
