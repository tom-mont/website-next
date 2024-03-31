---
title: "Understanding Prototypical Inheritance In JavaScript"
excerpt: "Making sense of object-oriented programming"
coverImage: "/assets/blog/prototypical-inheritance/curly-braces.jpeg"
date: "2024-03-23T05:35:07.322Z"
author:
  name: Tom Montgomery
  picture: "/assets/blog/authors/jj.jpeg"
ogImage:
  url: "/assets/blog/prototypical-inheritance/curly-braces.jpeg"
tags: ["Learnings"]
---

This post is a reaction to the article titled (Understanding Prototypal Inheritance In JavaScript)[https://dev.to/lawrence_eagles/understanding-prototypal-inheritance-in-JavaScript-4f31#chp-2] by Lawrence Eagles.

## First impressions

What initially struck me about this article was the fact that the author spoke of OOP in JavaScript. This was confusing to me - my understanding was that JavaScript is not an OOP language and that Typescript was required to extend JavaScript to accomoodate OOP. A quick Google confirms that JavaScript is a prototype-based OOP language (as opposed to a class-based OOP language). Which is exactly what this article is about… seems like I am in the right place, then.

An interesting take on OOP raised in the article is the fact that OOP uses objects to model real-world things. I had never made this leap of logic - objects (or classes) had always been abstracted from reality, almost entirely devoid of any bearing to real-life. The association to a real-life thing is appealing - it wil certainly assist in understanding. Metaphors are important.

## Inheritance

_Inheritance refers to a process whereby one object gets access to the properties and methods of another object_ is probably the crux of the article. This sentence becomes even more pertinent when considered in conjunction with the point above about real-world objects. The article goes on a journey of, essentially, convincing the reader that all data structures in JavaScript stem from one master prototype object - the JavaScript object. Each layer of abstraction from the JavaScript object inherits the properties and methods from the prototype at the level above. It’s prototypes all the way down.

What was also thrilling was the notion that an array, for instance, is also a data object with its own properties and methods. I guess I have been lulled into a false sense of security by looking for the curly brackets `{}` to confirm that, yes, indeed, I am looking at an object. When put in the content of the JavasScript master object, it makes perfect sense that an array is simply another object prototype (which, of course, eventually inherits the properties from the JavaScript master object).

## Warning signs

A common refrain in the article which excited and scared me was the ominous `// NEVER DO THIS IN REAL-LIFE. ONLY FOR DEMONSTRATION PURPOSE` comment left after each use of the `__proto__` method. Like any good tinkerer, I simply had to investigate this insidious method (and - eventually - figure out the correct way of assigning a prototype to an object. Boring.)

The linked article takes the reader to the (Mozilla developer docs)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto]. It’s always a good reminder that JavaSccript is the programming language for the internet and all the references to browsers in this page is a stark reminder.

![](/assets/blog/prototypical-inheritance/mozilla-developer-docs.png)

The above warning is also fun. Nothing like a hazard sign in a big red box to make you want to run that exact code.

Alas, there was some safe and usable information from the above warning. The last line suggests creating new objects using `Object.create()`. Seems straightforward enough, but it does beg the question: _Why?_ This, I think, is a subject matter for another post. I was perfectly happy creating my objects naively using my curly brackets. It’s going to require some convincing as to why I should open up this prototypical can of worms.

## What do we use it for, then?

The promise of prototypical inheritance is the idea that, because each object is an extension of a prototype, each object _contains_ the properties and methods of this prototype. This avoids unnecessary definitions of ubiquitous properties and methods - they are simply inherited. _This saves us memory and time_.

## The Bottom Line

At this point we need to investigate why prototypical inheritence should be used at all. Simply, it allows for centrality of properties and methods. From this central point they may be shared with other objects - we can then know with certainty what properties and methods, at _minimum_, any given object in JavaScript will have.

The post by Lawrence Eagles certainly shed some light for me on the cipher of OOP and I hope this unpolished reaction has done the same for you.
