<p align="center">
   <img src=".github/Banner.png" width="100%"/>
</p>

> The Intergalactic lab API for milkway

## About :question:

This project is the GraphQL API for milkway

milkway is an open web app to share milkshake recipes.

In these hard times we are living in, a well prepared milkshake can cheer anyone up, so grab some recipes and start drinking.

## Techs :computer:

-   [`Typescript`](https://www.typescriptlang.org)
-   [`Prisma`](https://www.prisma.io)
-   [`GraphQL`](https://graphql.org)
-   [`TypeGraphQL`](https://typegraphql.com)
-   [`ApolloServer`](https://www.prisma.io)
-   [`Express.js`](https://www.prisma.io)
-   [`Redis`](https://www.prisma.io)

## Installing :construction_worker:

To run the app you will also need to install the Front-end project [`here`](https://github.com/vinisaveg/milkway).

And make sure you have [`redis`](https://redis.io) installed

First clone this repo

```

    git clone https://github.com/vinisaveg/milkway-api.git

```

Install all dependencies

```

    yarn install

```

Create a .env file following the example.env file

```

    DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database>?schema=public"
    SALT_ROUNDS=<number>
    SESSION_SECRET=<secret>


```

Map the data model with prisma migrate

```

    npx prisma migrate dev --name init --preview-feature


```

Now you are good to:

-   `yarn dev` -> to start the app in development mode
-   `yarn test` -> to run all the tests
-   `yarn build` -> to bundle the app to production
-   `yarn start` -> to run the app in production mode
-   `npx prisma studio` -> to open up the prisma studio visual editor

## Contribuiting :+1:

Feel free to comment, open an issue, or send any PR. I'll love to merge your ideas.

## Issues :bug:

Found any problem? Feel free to [`report`](https://github.com/vinisaveg/milkway-api/issues).
