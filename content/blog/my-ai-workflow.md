---
title: How I'm Using AI as a Software Engineer
date: "2023-12-4"
status: published
---

When ChatGPT was first released in 2022, I was very skeptical of the tool and the underlying LLM technology that was (and still is) buzzing around the tech world. After some research and experimenting, I quickly realized how powerful the underlying technology is for Software Engineering in particular. So, since the start of 2023, I've been exploring different applications of AI in my daily workflow as a Software Engineer. During the [AI Engineer Summit](https://twitter.com/aiDotengineer) in October of 2023, [Shawn Wang (Swyx)](https://twitter.com/swyx) perfectly summed up my intention with this work when he described the AI Enhanced Engineer in his talk [The 1000x AI Engineer](https://youtu.be/qaJXBMwUkoE?si=QW_cpk50M45UBEI0). Shawn describes three different types of AI Engineers we can expect to evolve as this new tech revolution unfolds, the first being an AI Enhanced Engineer. This is someone that utilizes AI technologies and tools in their existing workflows to improve productivity. This is the archetype I most align with at the moment, and what I've spent the last year working on in my workflows. 

## Task Automation with ChatGPT

The most obvious uses for any AI is task automation, however when thinking about LLMs and Software Engineering, the most obvious task to automate is writing code. When I first started using ChatGPT I found it really useful for generating logic code when I could very accurately describe the logic in natural language. I always struggle with complicated array method chains, and forget the nuances between things like slice, splice, push, pop, etc, so using an LLM to generate this type of code had a real impact on my velocity. 

The next logical step in automating code generation, is generating unit tests. The nature of unit tests means that, if you're writing mostly pure functions, you can provide the LLM all of the context it needs to write solid unit tests. Simply paste the whole function including any custom type definitions, and even GPT 3.5 can do a very solid job generating unit tests. Usually ChatGPT returns a test written in [Jest](https://jestjs.io/), which covers both Jest and Vitest since those two test runners have interop between their APIs. 

## Moving Past ChatGPT

After using ChatGPT in my workflow for a few months, I started to really feel the rough edges around this articular user experience around the LLM itself. I often lost track of my ChatGPT tab among the rest of my browser tabs, which was frustrating and made context switch even more difficult than normal. In addition to this, I found that for the more complex TypeScript problems I was seeking help with, ChatGPT just wasn't cutting it. It's important to remember that GPT _is not_ a code generation model; it's a general purpose LLM. These factors caused me to start exploring other user experiences around the LLM paradigm, as well as running specialized models locally.

A great place to start if you've never run models locally is [LM Studio](https://lmstudio.ai/) - a GUI application for searching, downloading, running, and chatting with any LLM available on HuggingFace (or a local.gguf file). LM Studio is cross platform and is very simple to get up and running with, making running local LLMs super accessible to the average user. Using LM Studio is also a great way to peak under the hood a bit with how these LLM's can be configured using temperature, inference parameters, pre-prompting and hardware settings. I've used LM Studio to create my own model configuration preset, specifically to assist in my daily dev work writing Svelte and TypeScript by tweaking some of the settings, and adding this pre-prompt...

```shell
You are a pair programming assistant knowledgeable about TypeScript, JavaScript, Svelte.js, SvelteKit, and the Web.
```

Another great feature of LM Studio is that the application can expose the LLM process as a local server, allowing you to integrate it with other tools running locally; very cool!

Running models locally with LM Studio is a great replacement for ChatGPT in the browser, however I want to avoid having extra applications open while I'm working if I can. This led me to [Ollama](https://ollama.ai/), a CLI for running and interacting with LLMs in your terminal. Similar to LM Studio, Ollama handles installing models, running models, and even exposing a local endpoint to be used in other applications. The main differences being, Ollama is a CLI, and it provides an API for creating customized models stored as text files. The customizations I mentioned above in LM Studio are all stored and managed within the [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface) application. With Ollama, simply create a file named `Modelfile` and then use a declarative syntax to create a custom model configuration. For example, here's the LM Studio customization from earlier, represented as a `Modelfile`.

```shell
FROM mistral

PARAMETER temperature 1

PARAMETER num_ctx 4096

TEMPLATE """
{{- if .First }}
### System:
{{ .System }}
{{- end }}

### User:
{{ .Prompt }}

### Response:
"""

SYSTEM You are a pair programming assistant knowledgeable about TypeScript, JavaScript, Svelte.js, SvelteKit, and the Web.
```

I really love being able to represent these model customizations in a text file that can be tracked in git along with the rest of my [dotfiles](https://github.com/stordahl/.dotfiles). Rather than Ollama replacing LM Studio, I've been using LM Studio to quickly tweak parameters in the GUI, and then once I'm happy with the models performance, I'll create an Ollama `Modelfile` to use that config in a [CLI](https://en.wikipedia.org/wiki/Command-line_interface).

## Specialized Tools

A large majority of my AI enabled workflow is using LLMs directly as a pair programming/ code generation tool, there are a few other more specialized tools that I use as well. The first is [v0.dev](https://v0.dev), a text prompt based UI generation tool by [Vercel](https://vercel.com). At my day job, I often build prototypes for products before they've entered any kind of design phase. This is where v0 enables me to keep moving quickly to validate an idea in code without it looking horrible. I will say that Vercel advertises v0 as producing "production ready code", which I would argue is not true. I often see accessibility issues with code produced by v0, but using it in prototypes knowing we'll improve the accessibility in the true design phase, it's a great tool to have. 

Another specialized application I use daily is [Pile](https://udara.io/pile/), an AI powered journal app. I often struggle to remember certain things, or just need to write down what I'm thinking to get it out of my head, and Pile has been the perfect tool for that. It's interface is very minimal, stores entries on a chronological timeline, and integrates with OpenAI's API to allow GPT-3.5 to "reflect" on your entries. When I'm thinking through a problem, I'll try to put it down into words in Pile, and let the LLM's reflection influence how I'm approaching the problem. I've found it incredibly helpful with unblocking me while working on a tough problem. The most recent tool I've added to my workflow is [Phind](https://www.phind.com/), an LLM enhanced search engineer specifically for software engineers. I haven't used it much, but I love the idea of using an LLM to enhance the traditional search model which is historically lacking in context. The few times I've used it have shown me how this enhancement creates a better user experience and generally got me my answer faster than my usual search workflow. 

If you're a new dev looking to gain an edge, or an industry veteran looking to use AI to enhance your existing workflow, I hope the tools and methodologies I've laid out here bring value to you. If there are any AI tools you're loving that I didn't mention here, I'd love to hear about them over on [Twitter (X)](https://x.com/stordahldotdev).

