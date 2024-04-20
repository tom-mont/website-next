---
title: "Don't sETL for less"
excerpt: "Dipping my toes in the world of data engineering"
coverImage: "/assets/blog/etl-pipeline/cover.jpg"
date: "2024-04-20T05:35:07.322Z"
author:
  name: Tom Montgomery
  picture: "/assets/blog/authors/jj.jpeg"
ogImage:
  url: "/assets/blog/etl-pipeline/cover.jpg"
tags: ["Learnings"]
---

Recently I have been exploring the world of data engineering. It appeals to me for a number of reason: it is tightly coupled to integrtion work, it involves building using different pieces (of a puzzle) and it sits in the intriguing middle-ground shared by coding and statistics. 

As such, I wanted to try my hand at building out a simple toy project to get a feel for the principals of Extract, Transform and Load. For those following along at home, the Github repository assosciated with this project can be found [here](https://github.com/tom-mont/etl-pipeline). 

## The project in a nutshell

If you have been following this blog for a while now you will have picked up that I enjoy working with APIs. A lot. I couldn't help but use this as an opportunity to keep working with these funny bits of tech that talk to one another. I decided to use the Open Movies Database. The project would simply involve retrieving some data from the OMDb and writing it to a SQL database on my local machine. 

This would explore some new concepts for me - I do not have extensive SQL knowledge so I am excited to figure out how this would work.

## Extract

I will save you the long, repeated story of how I set up a `.env` to demonstrate the incredible security posture of my toy projects. The extraction step boild down to calling the OMDb API using the following URL:

```
    # Build the API request URL
    url = f"{url}?apikey={api_key}&t={movie_name}"
```

Getting all of this to work required the Python `requests` package. This was a little different to me, having usually worked in Javascript. I forget that Javascript is the language that the internet uses and it just sort of works when using Javascript. Now that we have stepped in the Python world we need to `.json()` the responses in order to parse them into a format our language can read. This was stored in a dictionary in Python. You can check out my post on [Prototypical Inheritence](https://www.tom-montgomery.com/posts/prototypical-inheritance) about Javascript objects but in this case a Python dictionary corresponds to the Javascript object - allowing key/value pairs to be stored. 

These key/value pairs are accessed using syntax similar to that of accessing an item in the array - `dictionary['key']`.
 