
---

title: "I'm not being ignored - I am not actually expecting a response"
excerpt: "A fabulous example of what it means to be asynchronous"
coverImage: "/assets/blog/api-intro/api-intro-cover.jpg"
date: "2025-01-21T05:35:07.322Z"
author:
  name: Tom Montgomery
  picture: "/assets/blog/authors/jj.jpeg"
ogImage:
  url: "/assets/blog/wireshark/cover.jpg"
tags: ["Learnings"]
---

Yes yes, announcing that I am about to provide you with a "fabulous" example before you have even had a chance to critique it is a somewhat presumptuous. I understand. The reason I have described it as such is not because the example has fallen out of my head - it stumbled into my lap. That means it isn't arrogance - I was just lucky.

## The brief

Here's what you need to know - I was tasked with extending the abilities of the current ingestion tool we use. Extended abilities were required as one of the batch API calls used to retrieve data returned a flag implying not all the information for a particular field could be retrieved. An individual API would need to be made to retrieve the additional information.

Here's what you came here for - what does it mean for a function (or anything, for that matter) to be asynchronous? All I _really_ know is that a function that is asynchronous is not expecting a response. That's it. There's a possibility that your understanding of asynchronousity is the same. If that is the case, I hope you will enjoy this (some would say "fabulous") example.
