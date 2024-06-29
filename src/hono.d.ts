declare module "hono" {
	type ContextRenderer = (
		content: string | Promise<string>,
		props: {
			title?: string;
			description?: string;
			cssFile?: string;
			loadMermaid?: boolean;
		},
	) => Response;
}
