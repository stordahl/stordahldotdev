---
title: Monitoring Errors in Third-Party JavaScript Applications
date: "2024-03-29"
status: published
---

Over the past 9 months I've been designing, building, and iterating an error monitoring system for the suite of Third-Party JavaScript widgets I contribute to at my day job. I recently re-designed the client portion of this system and wanted to walk through the solution we ended up with.

## Motivation

If you build first party applications, you likely use a tool like [Sentry](https://sentry.io) or [Rollbar](https://rollbar.com/) to monitor errors in your application. These tools are great, but there are two major downsides that disqualified them for our use case; JavaScript bundle size and cost. [Third Party](https://en.wikipedia.org/wiki/Third-party_software_component) browser JavaScript applications are heavily scrutinized as they inherently effect page performance metrics and can seriously degrade the user experience, if not designed correctly. With this in mind, adding [700+ kb](https://www.npmjs.com/package/@sentry/browser) to our bundle, just to monitor errors, was untenable. Secondly, the applications my team ships are used by a lot of the biggest retail brands in the world. The scale we deal with normally is in the magnitude of _hundreds of millions_ of users per month. At that scale, paying for one of these services would cost a small fortune. So, with those two limiting factors in mind, I was tasked with designing a home grown solution that could deliver most of the benefit, with out a ton of resources (cost + dev time).

## Context

The original design for this system worked pretty well - I built a simple cloud function that could take in requests, construct a structured log from the request, and then store the log in Google Cloud Logger. Then on the client side, I wrote a small class that could be given meta data about the runtime and then would expose methods for sending requests to the cloud function. The main issue here was that the client side logger would need to _explicitly_ catch an error so it could then package is up into a request. This resulted in a ton of tech debt, manual error handling all over the code base, and ultimately lack luster performance on actually catching errors in our applications.

## Research

Whenever I need to solve a problem I've never solved before, I like to pull out some old JavaScript books to get some inspiration for how this may have been solved in the past. This led me to the [Event Delegation Pattern](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation) defined in the 2010 Edition of [Stoyan Stefanov's](https://twitter.com/stoyanstefanov?lang=en) [_JavaScript Patterns_](https://www.amazon.com/JavaScript-Patterns-Better-Applications-Coding/dp/0596806752) - I had heard of event delegation before, but never needed it to solve a problem. 

Event Delegation co-opts the DOM's event bubbling to reduce the amount of event listeners you need to attach to the DOM. Imagine you have a list of DOM nodes, and you want to have some code run when one of those nodes is clicked; you could add an event listener to each node in the list, but that seems a bit inefficient. Instead, we can add an event listener to the to list's parent node, then use the data provided to our event listener to figure out which child node was clicked; that is event delegation in a nut shell.

## Error Delegation

You may be thinking, "but wait I thought this article was about errors" - don't worry, it is! The light bulb moment for me when solving this problem was when I realized that errors are also events that can be listened for, making the event delegation pattern a great potential solution for reducing the code needed to handle errors. 

```typescript
class Logger {
    public error({ error, message }) {
        // send error to backend
    }

    public setupErrorDelegation() {
        window.addEventListener("error", ({ error, message }) => {
            this.error({ error, message });
        });
    }
}
```

In the example code, we have a basic class with two methods; `error` and `setupErrorDelegation`. The `error` method simply sends an error to our backend, while `setupErrorDelegation` sets up our event delegation.

## Dealing with window.onerror in a Third-Party context

In the above example, notice that we're adding the event listener to the `window`, which means every error that occurs on the page will be recorded by our system. Since we're monitoring errors in a third-party app, we only want to track errors that originate from our JavaScript code. Thankfully, the error event provides a `filename` argument that is the name of the script where the error originated. Let's update the example to use this strategy...

```typescript
class Logger {
    public error({ error, message }) {
        // send error to backend
    }

    public setupErrorDelegation() {
        window.addEventListener("error", ({ error, filename, message }) => {
            if (typeof filename === "string" && filename.includes("cdn.my-domain.com/script.js")) {
                this.error({ error, message });
            }
        });
    }
}
```

## Further Learning

To learn more, [Ben Vinegar](https://twitter.com/bentlegen) of Sentry has a [2019 talk](https://www.youtube.com/watch?v=KpeftlLF99c) all about JavaScript Errors that I highly recommend. I found this talk after I had already built and deployed the above solution, but I still learned a ton from it.
