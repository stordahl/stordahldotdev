---
title: My Case Against TypeScript Enums
date: "2023-12-31"
status: published
---

Over the past year, I've been a main contributor to an internal re-write of my teams core library (our business logic) from JavaScript to TypeScript. Through this process, my team has been able to safely refactor architectural level components of our products, because we now have the type level safety TypeScript provides. If you've been writing TypeScript for a while, you've likely noticed that the TypeScript team occasionally adds features to the language that are not supported by JavaScript. This is why TypeScript describes itself as a programming language that builds on JavaScript, rather than a strong typing layer on top of JavaScript. These decisions to add non-standard features can be somewhat controversial in the community. The main arguments I've seen about these non-standard features all boils down to the fact that TypeScript is almost never the target for the code at _runtime_, and thus we should only use features that exist in the target environment; TypeScript should only aim to solve the dynamically typed nature of JavaScript. Lately I've formed the same opinion, and today I'd like to explain why. 

Previously I've written about [decorators](https://stordahl.dev/writing/error-handling-decorators) which occupy this same space - decorators are not a JavaScript feature, but are available in TypeScript. However, the decorators implementation by the TypeScript team is limited to ECMAScript class methods which inherently limits the "blast radius" of using this feature. In contrast, I believe [enums](https://www.typescriptlang.org/docs/handbook/enums.html) are largely an anti-pattern, especially with modern versions of TypeScript. 

First some context; what I mean by "blast radius" is the inherent fluidity of code, and the work required to support a decision to use a specific tool. All code will change over enough time, and all programming languages will change over time as well. This fluidity is why we can make Software Engineering our careers; for a majority of a code bases life we act as remodelers, attempting to improve something that already exists. This is where I rubbed up against the rough edges of TypeScript Enums. 

## The Problem

A few weeks ago (at the time of writing), I started building a [Svelte](https://svelte.dev) component library for my team and the products we support. I opted to use [SvelteKit](http://kit.svelte.dev) and the svelte-package utility to build the source code (TypeScript and Svelte) into components that would work in JS projects as well. The first component used a few enums imported from our core library to narrow some props that would be used to conditionally render parts of the template. I did some minimal testing when integrating this component, got approval on my pull request, and shipped it to our staging environment. The next day I got a bug report from our QA team that there were UI regressions in a number of our legacy JS products. I quickly checked out the staging branch, ran a build and looked at the built components - the usage of enums in the built components was unchanged all branches checking a value against an enum returned false, which was the source of the bug.

To the browsers JavaScript engine, enums are a foreign concept and since the module was being imported rather than defined in the component, an error was never thrown. At first, I was sure this was just an issue with Svelte, SvelteKit or the svelte-package CLI, so I tweeted about it to see if anyone had also experienced this, and if there was a work around. Simon from the Svelte Core team replied:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Svelte and many other frameworks compile each file in isolation, so this isn&#39;t possible AFAIK. Basically they all use the isolatedModules mode: <a href="https://t.co/tVFIH68GaQ">https://t.co/tVFIH68GaQ</a></p>&mdash; Simon H (@dummdidumm_) <a href="https://twitter.com/dummdidumm_/status/1741424246667043287?ref_src=twsrc%5Etfw">December 31, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

So it seems that even in a JS first framework like React, you'd also run into a similar problem. This demonstrates the "blast radius" of enums - in a pure TS environment, they are a great tool, but as soon as you need to integrate with other JS tooling, you're fucked. 

## The Solution

Thankfully, modern TypeScript versions provide an interoperable way to have an enum like experience. First lets define a practical example where you may uses enums. Let's say I have an component that can be rendered differently base on which side of the screen it's on (like a carousel button that move the carousel left or right). We might define an enum like so...

```typescript
enum Side {
    left: "left",
    right: "right",
}
```
The API for this enum then feels oddly close to a JavaScript object, where we'd access the value via the keys (`Side.left === "left"`). Here's where TypeScript provides a better (in my opinion) way to provide the same API - object literals with an `as const` assertion. Let's define one with the same shape as our `Side` enum...

```typescript
const Side = {
    left: "left",
    right: "right",
} as const
```

By using an object literal, we maintain an interface that is valid JavaScript, and the const assertion provides the same type safety that an enum provides. After this experience, I'm going to be using object literals as a replacement for enums, and will push my team to do the same. Although, if you have a use case for enums that object literals don't solve, I'd love to hear about it, so [tweet at me](https://twitter.com/stordahldotdev)!
