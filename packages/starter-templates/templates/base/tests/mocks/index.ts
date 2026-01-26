import closeWithGrace from 'close-with-grace';
import { setupServer } from 'msw/node';

// Import mock handlers
// import { handlers as resendHandlers } from './resend.ts';
// import { handlers as githubHandlers } from './github.ts';

export const server = setupServer(
	// Add your mock handlers here
	// ...resendHandlers,
	// ...githubHandlers,
);

server.listen({
	onUnhandledRequest(request) {
		// Do not print warnings on unhandled requests to Sentry
		if (request.url.includes('.sentry.io')) {
			return;
		}
		// Print the regular MSW unhandled request warning otherwise
	},
});

if (process.env.NODE_ENV !== 'test') {
	console.info('🔶 Mock server installed');

	closeWithGrace(() => {
		server.close();
	});
}
