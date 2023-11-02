---
title: Testing Google Cloud Functions with Vitest
date: "2023-09-17"
status: published
---

Recently I was tasked with building a system for logging client side errors from
the suite of [JavaScript widgets](https://en.wikipedia.org/wiki/Web_widget) that my team maintains. To keep things simple I thought a [serverless architecture](https://en.wikipedia.org/wiki/Serverless_computing) would fit this use-case perfectly. In essence, when an error occurs in a widget, the widget catches the error and sends a POST request to the serverless function (in this case, a Google Cloud Function). From there the error log can be stored for analysis later. One goal of this project was to have decent test coverage over this relatively small service. Since all of our other production code is tested with [Vitest](https://vitest.dev), I wanted to setup the same testing tools for the serverless function. In this article I'll show a minimal example of how I tested the Google Cloud function using Vitest.

## Setup

For the sake of example, below is a "Hello World" example of a Google Cloud Function, implemented in TypeScript. To follow along in your own project, you should have TypeScript, Vitest, and the functions-framework package (@google-cloud/functions-framework) installed as dependencies.

```typescript
// helloWorld.ts
import { type HttpFunction } from "@google-cloud/functions-framework";

export const helloWorld: HttpFunction = async (req, res): Promise<void> => {
    const { body, method } = req;
    
    if(method === "GET") res.send("Hello, World!");
    if(method === "POST" && body.name) res.send(`Hello, ${body.name}!`)
};
```

This function can accept `GET` & `POST` requests, and will respond with either "Hello, World!" or "Hello, name!" where name is a property on the requests body. 

## Writing the test

Now that we have our serverless function, lets setup our test file and some utilities we'll need for testing. First we need to import a few things from Vitest and the Google functions-framework package.

```typescript 
// helloWorld.test.ts
import { describe, expect, vi } from "vitest";
import { Request, Response } from "@google-cloud/functions-framework";
import { helloWorld } from "."; // Also import the serverless function itself
```

The classes we're importing from the functions-framework package are very
loosely typed versions of the Request and Response objects from the very popular
[Express](https://expressjs.com/) framework. To test our function, we need to
create mocked versions of these objects, so let's write a utility function to
generate those mocks in our tests.

```typescript
// helloWorld.test.ts
import { describe, expect, vi } from "vitest";
import { Request, Response } from "@google-cloud/functions-framework";

const getMocks = (method: string) => {
  return {
    req: { body: { name: "Jacob" }, method, query: {} },
    res: {
      send: vi.fn(), // make send a spy
    },
  } as { req: Request, res: Response };
};
```

Notice that we are type casting the returned object; this will make our tests cleaner and a bit more terse. Now when we call `getMocks`, the returned object contains the two objects we need to call our serverless function. At this point, we're ready to start writing the test.

```typescript
describe("helloWorld", () => {
    // First, we test the GET method code path in our function
    it("should call the response's send method", async () => {
        const mocks = getMocks("GET");
        const spy = vi.spyOn(mocks.res, "send");
        await helloWorld(mocks.req, mocks.res);
        expect(spy).toHaveBeenCalledWith("Hello, World!");
    });

    // Second, we test the POST method code path in our function
    it("should call the response's send method and return a message containing
    the value of body.name", async () => {
        const mocks = getMocks("POST");
        const spy = vi.spyOn(mocks.res, "send");
        await helloWorld(mocks.req, mocks.res);
        expect(spy).toHaveBeenCalledWith("Hello, Jacob!");
    });
});
```

In these tests we're testing both code paths (GET & POST requests) by calling
`getMocks`, spying on the `send()` method of the mocked response object, and calling
our serverless function while passing the mocks as arguments. We then expect the
spy to have been called with the correct value based on the request method used
in the test. 

That's it! We now have full test coverage of this basic Google Cloud function
using Vitest. Obviously in a production example you would have much more
complicated business logic, but this pattern should help you get started. Happy
testing!
