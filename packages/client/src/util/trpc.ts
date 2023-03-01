import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'server';

const trpcUrl = "http://localhost:4000/trpc"

export const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: trpcUrl,
		}),
	],
});