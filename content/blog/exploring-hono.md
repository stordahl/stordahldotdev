---
title: Exploring Hono
date: "2023-11-08"
status: published 
---

Recently, I realized the workflow I had built for my personal blog, was causing me to not want to write. Originally, I had built this site as a way to dive into learning about [SvelteKit](htts://kit.svelte.dev) and it's application model. While I still love SvelteKit, I started to feel that it's just too much infrastructure for a simple [Markdown](https://en.wikipedia.org/wiki/Markdown) blog. This led me to start looking at different solutions that would allow me to do two things; simplify the system, and learn something new. 

## Enter Hono

I've heard many people praise [Hono.js](https://hono.dev), an edge ready server framework, over the last few months in various places, so I decided to check it out. Hono has an [Express](https://expressjs.com/) like API, however what sold me on the framework was all of it's differences from Express.

1. TypeScript support built-in
2. Deploy anywhere - edge runtimes, Node, Bun, Deno, and more
3. Built on Web Standards
4. HTML helpers enable JSX syntax for UI composition
5. Tons of built-in middleware

All of these features bundled together feels incredibly modern, while also feeling incredibly natural if you've ever worked with an Express like framework. I won't be diving into any code in this article, but I encourage you to checkout the [source code](https://github.com/stordahl/stordahldotdev) for this version of my blog, and also the Hono docs, if you're interested in learning more.

## Thoughts after using Hono

I honestly have nothing bad to say about Hono; as I started from scratch moving each route of my site, I ran into no issues at all. From dev, to deploying the worker to Cloudflare, the docs were extremely straighforward and all of the tools _just worked_. If you're looking to build a serverless api, server render some HTML, or build any micro-service in TypeScript, I'd implore you to consider Hono. I believe it will bring you a lot of joy to write code that feels so familiar, with all of the modern tools we've come to rely on in the JavaScript space.
