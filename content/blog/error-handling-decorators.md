---
title: Simplify Error Handling with TypeScript Decorators
date: "2023-09-30"
status: published 
---

Recently at my day job I was tasked with designing a library to provide a
simple API for error handling in our TypeScript and JavaScript applications.
Nearly all of our application entrypoints are ECMAScript classes that have many
synchronous and asynchronous methods. Error handling in these methods is pretty
simple - just wrap the internal logic in a try/catch, and handle the error with
a function provided by the library. 

```typescript
class MyClass {
    public async myMethod() {
        try {
            await someFunction();
        } catch(error) {
            handleError(error, someState, ...);
        }
    }
}
```

However, I wanted to avoid having to manually wrap every method's internal logic in a try/catch.
This eventually led me down a path to [TypeScript Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html). 
According to the TypeScript docs, "Decorators provide a way to add both annotations and a meta-programming syntax for class declarations and members." Simply put, decorators allow you to modify a class and it's members in a reusable way, which makes 
them perfect for this type of repeated try/catch logic. To illustrate this
concept, lets look at a simple decorator example.

> These code examples are largely inspired by Andrew Burgess' [YouTube video](https://www.youtube.com/watch?v=_1mQ_A7fq-g&pp=ygUVdHlwZXNjcmlwdCBkZWNvcmF0b3Jz)
> exploring decorators in the TypeScript 5 beta. If you want to learn more about
> advanced TypeScript, do checkout his channel!

```typescript
function logExecution<
    This,
    Args extends unknown[],
    Return,
    Fn extends (this: This, ...args: Args) => Return
>(
    target: Fn,
    context: ClassMethodDecroatorContext<This, Fn>
) {
    const methodName = String(context.name);
    function replacementMethod(this: This, ...args: Args): Return {
        console.log(`LOG: Entering method ${methodName}.`);
        const result = target.call(this, ...args);
        console.log(`LOG: Exiting method ${methodName}.`);
    }
    return replacementMethod;
}

class ExampleClass {
  @logExecution
  add(a: number, b: number): number {
    return a + b;
  }
}

const example = new ExampleClass();
const sum = example.add(2, 3); // This will log method execution and return 5.
```

A decorator usually receives three arguments...
1. `target`: represents a function (`Fn`) that will be the target of the decoration. It's a generic type that expects a function with a specific signature, taking a this context of type `This`, an array of arguments `Args`, and returning a value of type `Return`.

2. `context`: provides context information about the method being decorated and
   has the type `ClassMethodDecroatorContext<This, Fn>`. 

Our `logExecution` decorator simply calls the `target` function in between two console.logs. We can then apply the decorator to the `add` method of our `ExampleClass`. Then when we call that `add` method, we will still
get the returned value, but the console logs will also be called.

While this seems like a good solution, a standard decorator lacks one feature
I needed in my implementation. Each method may need a different function to be
called in the catch block - this should be specified by the engineer integrating the library with
a product. To accomplish this we need to go one level deeper to [decorator factories](https://www.typescriptlang.org/docs/handbook/decorators.html#decorator-factories).

## Decorator Factories

A decorator factory is "simply a function that returns the expression that will be called by the decorator at runtime." 
In essence, our decorator factory will take the callback as an argument, and
return a decorator that calls the callback in the catch block. With all that
said, lets look at some code. 

```typescript
function wrapMethodFactory<
    This,
    Args extends unknown[], 
    Return, 
    Fn extends (this: This, ...args: Args) => Return
>(
    callback: (error: Error) => void
) {
    return function wrapMethod(
      target: Fn,
      context: ClassMethodDecoratorContext<This, Fn>
    ): (this: This, ...args: Args) => unknown {
      return function replacementMethod(this: This, ...args: Args): Return | Promise<void> | void {
        try {
          return target.call(this, ...args);
        } catch (error) {
          callback(error);
        }
      };
    };
  };

function myCallback(error: Error) {
    console.error(error)
}

class ExampleClass {
  @wrapMethodFactory(myCallback)
  add(a: number, b: number): number {
    return a + b;
  }
}
```

This factory takes a callback as an argument and returns a decorator that will
call the provided callback in the catch block. This allows the caller to modify
the business logic without needing to clutter up the method with that logic. I
hope this pattern is useful to you as you build your TypeScript applications.
