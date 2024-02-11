---
title: Better Async TypeScript 
date: "2024-01-25"
status: published
---

Over the past year, my team has been rebuilding our internal core library from a set of first principles as we migrate said library to TypeScript. Throughout this process we have had the opportunity to develop some really great patterns, and today I'd like to share one of them with you; errors as values in asynchronous TypeScript.

## Some Context

This article is written from the perspective of an engineering team looking to design reusable patterns that are distributed via an internal library. The patterns laid out here are designed with the _consumer_ in mind, and prioritize a flexible & type safe experience for them.

## The Problem

I'm sure you've seen code like this before...

```typescript
async function getData(): Promise<Record<string, any>> {
    const res = await fetch("https://api.example.com");
    return await res.json();
}
```

At a first glance, what problems do you see? The first thing you probably notice is that we aren't handling the many possible errors that could occur at runtime. Even though we have annotated the return type properly, TypeScript does not complain about the unhandled errors in this code at all. More importantly, _the caller of this function has no idea what this function will return if any of its internal Promises reject_. 

The first thing you might do to address this problem is simply wrap the functions logic in a try/catch like so...

```typescript
async function getData(): Promise<Record<string, any>> {
    try {
        const res = await fetch("https://api.example.com");
        return await res.json();
    } catch (error) {
        throw new Error(error);
    }
}
```

This feels a lot better, but remember the context from earlier; the consumer of this function has no idea how to handle the rejected promise without reading the source code. This is where we need to take some inspiration from another language - one that has great patterns for asynchronous and concurrent operations: Golang.

## Go Error Handling

If you aren't extremely online, you may not know that Golang's error handling is a bit of a meme. However, the patterns established in Go are pretty simple, yet effective at solving this problem that is presented by TypeScript, and by extension JavaScript. In Go, the error _is a value_, and always gets returned from a function. Lets look at an example of a standard function call site in Go...

```golang
data, err := getData()
if err != nil {
    return err
}

```

You can see, at the call site of `getData`, the returned values are data _and_ err (error). This forces the caller of the function to handle the possible error, in a way that make sense in their application.

## The Solution: Errors as Values in TypeScript

So how can we develop a pattern like we see in Golang? First lets define a type that represent the error state of an asynchronous function and the related data we want to be available to the function caller. 

```typescript
type AsyncError = {
     type: "_network" | "_runtime";
     error: Error;
     message: string;
}
```

This is where you can adjust this pattern to fit your use case. In the example, we want to be able to communicate if the error happened because of the network or a runtime error, as well as returning the actual caught error, and a custom message. Now that we have that type defined, lets create one more type that represents the constant data structure that we want this async function to return.

```typescript
type AsyncReturn = {
    data: Record<string, unknown> | null;
    error: AsyncError | null;
}
```
With this AsyncReturn type, we can now refactor our `getData` function to have a more Go like experience for the caller...

```typescript
async function getData(): Promise<AsyncReturn> {
    try {
        const res = await fetch("https://api.example.com");
        const data = await res.json();
        return { data, error: null }
    } catch (error) {
        return { 
            data: null, 
            error: {
                type: "_network",
                error,
                message: "Network Error from getData",
            },
        }
    }
}
```

Now the callers experience with this function is a lot more predictable, allowing them to always handle the possible error with an asynchronous operation.

```typescript
const { data, error } = await getData();
// handle the error however you like
if (error) throw new Error(error.error);
```

My team has been working with this pattern for the past 9 months as we've built out a new product line and overall it's something I've come to really enjoy using as an application developer.
