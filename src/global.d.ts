import {} from "hono";

declare module "hono" {
	interface ContextRenderer {
		(content: string | Promise<string>, props?: { title?: string, description?: string }): Response;
	}
}
