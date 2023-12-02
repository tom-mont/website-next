---
title: "Tags"
excerpt: "Adding labels to my posts so you know which ones to read"
coverImage: "/assets/blog/tags/tags-cover.jpg"
date: "2023-12-01T05:35:07.322Z"
author:
  name: Tom Montgomery
  picture: "/assets/blog/authors/jj.jpeg"
ogImage:
  url: "/assets/blog/wireshark/cover.jpg"
tags: ["Learnings"]
---

The reason this blog was started was to allow me to build a portfolio of the work I have built to document my learnings as I venture into the world of tech and development.

However, I am also fairly fond of the sound of my own voice and would like to write some posts where I speak about matters that are a little more ethereal than zeros and ones.

This post is a _fabulous_ intersection point of these two worlds, as I take you along my journey of figuring out Next.js to get some tags onto my website.

## First stop... sigh, chatGPT

My first port of call is to go to the omniscient robot and ask how to do it. ChatGPT's innaccurary (at least to someone too cheap to pay up for 4) has been frustrating me for the last few months. However, ever the optimist, this can be seen as a feature (and not a bug) to someone who knows _enough_ about code to know when it is leading me astray. By being forced to correct it when I can see that it is wrong, I am learning not only how _not_ to do it but also (hopefully) how _to do it_.

The robot's response was to direct me to the `blogData.js` file. Since I am creating the blog posts using markdown to HTML and Typescript, this file does not exist. However, after taking longer to figure this out than I would care to admit in this post, it dawned on me that the markdown files I use to write the posts had headers which look quite a bit like the data structure put forward by the clever little man that lives inside my computer.

![](/assets/blog/tags/tags-screenshot.png)

Boom, simple.

## Displaying tags on the blog posts

The beep boop has now instructed me to modify the blog post component to display tags. _Component_ I have heard of before and I know where to look! The code to get this onto the blog post looks a little like this:

```js
{
  post.tags.map((tag, index) => <span key={index}>{tag}</span>);
}
```

I have encountered the `map` function before and am aware that it will _do something_ to each element in an array (which makes sense, as we added our tag in an array). I made a split-second design decision that I would rather add the tag to the post preview (which appears on my home page) as opposed to within the blog post itself.

I navigate to to the `post-preview.tsx` file in order to figure out how to get this pesky tag to display. This also feels a lot like I am going to run into some Typescript, so let's see how I get on!
