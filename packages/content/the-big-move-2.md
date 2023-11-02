---
title: "The Big Move: Thoughts on a Pilot Project"
date: "2022-01-05"
status: published
---

I started off this year with a soft launch for our pilot project at Hennepin Tech for testing the waters with Svelte.js & Sanity.io. This project will help us decide if this new stack is something we want to use across all of our web products. Here is a list of what I've learned when considering using Jamstack tooling at a large higher education institution...

1. Conveying the benefits of the Jamstack & structured content is HARD. This is especially true in cases like mine, where there is only one technical person working on the project. I'm very excited and optimistic for Sanity's new Conference and for my non-technical colleagues can get more in-depth with the concepts presented by these technologies.

2. Any project can benefit from a design system and you should be building one right now! We've barely scratched the surface in terms of components we will utilize, but the small collection we've already created made building this pilot project a lot simpler. Start small, define attainable goals for the system, and iterate.

3. Building portable & maintainable design systems with Vanilla CSS is also HARD. Early on I built an elaborate gulp system that would compile the source SCSS into CSS and spit out documentation sites for both the source SCSS and the compiled CSS library. But this was not going to be maintainable. To solve this I'm currently working on a node package that will hijack the Svelte compiler to allow for a svelte-y dev flow of design systems while exporting a vanilla CSS & JS library like the Bootstraps of our past. 

4. Design your content before even talking about UI. If stake holders begin to think of your content as how it's presented, your content will not be as powerful & flexible as it could be. It's far more important for large organizations to narrow down what they are saying before deciding how to say it.

