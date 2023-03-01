import express from "express";
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { z } from 'zod'; // (for type validation)

const app = express();

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
    sayHello: t.procedure
        .input(z.object({
            name: z.string(),
            age: z.number()
        }))
        .query(async ({ input }) => {
            return `Oh hi there, ${input.name} - as it turns out you are indeed ${input.age} years old!`
        })
})

export type AppRouter = typeof appRouter;

app.use(cors())
app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext
    })
)

app.listen(4000, () => console.log("[+] Server is running on port 4000."));