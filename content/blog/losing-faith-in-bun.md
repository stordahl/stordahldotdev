---
title: Losing Faith in Bun
date: "2024-05-01"
status: published 
---

Over the past year, like many JavaScript developers, I have fallen in love with [Bun](https://bun.sh/). If you aren't familiar, Bun is a JavaScript tool chain including a runtime, package manager, bundler, and test runner, among other killer features. As a seasoned Node.js user, there are so many little features in Bun that make my development flow better overall. However, recent choices made by the Bun team have started to taint these feelings.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Everyday i am less and less inclined to use and advocate for Bun. <a href="https://t.co/kXnnYIm2nj">https://t.co/kXnnYIm2nj</a></p>&mdash; Jacob Stordahl — oss/acc (@stordahldotdev) <a href="https://twitter.com/stordahldotdev/status/1785695986116932072?ref_src=twsrc%5Etfw">May 1, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Embrace, Extend, Extinguish

If you've been in technology for long enough, you likely already know [EEE](https://en.wikipedia.org/wiki/Embrace,_extend,_and_extinguish) well. For the uninitiated, this was a phrase historically used at Microsoft throughout the 90's and 2000's, to describe their strategy to stranglehold product markets/categories. First, an open standard is embraced, then the open standard is extended with proprietary functionality, and finally the open standard and competitors that use it are "extinguished". 

This is exactly the behavior I fear we are seeing from the Bun team currently. They tout Bun as being Node.js compatible and having Web Standard APIs, while they actively ship features that prove otherwise. The first example of this that I was made aware of is their decision to support JSON5 in package.json files. JSON5 offers support for syntax features like comments and dangling commas, however it's not compatible with the Web Standard `JSON` API. The implication of this decision is that any npm package that uses the Web Standard `JSON` API to read your package.json file will now throw an error if the file uses JSON5 syntax and is used with Bun.

Much like Microsoft, Bun is also a corporation and like all corporations, one day they will have to become profitable. For now, I'm retreating back to the comfort of open governance in Node.js.
