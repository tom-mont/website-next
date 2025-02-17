---
title: "I'm not being ignored - I'm just not expecting a response"
excerpt: "A fabulous example of what asynchronous means"
coverImage: "/assets/blog/asynchronous/async-cover-image.jpg"
date: "2025-02-17T05:35:07.322Z"
author:
  name: Tom Montgomery
  picture: "/assets/blog/authors/jj.jpeg"
ogImage:
  url: "/assets/blog/wireshark/cover.jpg"
tags: ["Learnings"]
---

Yes yes, announcing that I am about to provide you with a "fabulous" example before you have even had a chance to critique it is a somewhat presumptuous. I understand. The reason I have described it as such is not because the example has fallen out of my head - it stumbled into my lap. That means it isn't arrogance; I was just lucky.

## The brief

Here's what you need to know - I was tasked with extending the abilities of the current ingestion tool we use. Extended abilities were required as one of the batch API calls used to retrieve data returned a flag implying not all the information for a particular field could be retrieved. Multiple individual API calls would need to be made to retrieve the additional information for each record.

Here's what you came here for: what does it mean for a function (or anything, for that matter) to be asynchronous? All I _really_ know is that a function that is asynchronous is not expecting a response. That's it from my side. There's a possibility that your understanding of asynchronosity is the same. If that is the case, I hope you will enjoy this (some may say "fabulous") example.

## A spot of cricket

I am going to alter the example from my work experience somewhat and what better way to explore asynchronous API calls than by involving a bit of cricket? I will make use of the [Sportsmonks API](https://www.sportmonks.com/cricket-api/) to extract some information about South African cricketers.

Now, we find ourselves in a situation where we can make one call to the _Players_ (plural) endpoint that retrieves all the player IDs for a given country. We'll select an arbitrary country like South Africa.

Furthermore, (pretend) we find ourselves in the situation where we would like to retrieve _more_ information about the player, further than just their ID. The trick is this: the _Players_ endpoint returns only the ID. In order to retrieve more information we need to hit the _Player_ (singular) endpoint for each individual using their ID. It is within these constraints that we can see exactly what asynchronous API calls are all about.

## The Traditionalist, or just looping through the calls

My first approach to this question would simply be to retrieve the list of all player IDs from the _Players_ endpoint and loop through these IDs. However, because I am a savvy and lazy data engineer, I would dynamically render the player ID _into_ the URL. This would automate the process of the numerous API calls and I would be able to take advantage of the power of loops in Python, producing a function that is way faster than, I don't know, manually inputting the IDs into the URL every time?

The pseudocode would look something like

```python
for ID in player_ids
  player_info = get(www.cricket-api.com/{ID})
  player_list_dataframe.append(player_info)
```

... And that will work!

However, running the code for the first 10 players we start to see a little bit of an issue:

```bash
INFO:root:Start
INFO:root:Retrieved information for Jean-Paul Duminy
INFO:root:0.6744346618652344
INFO:root:Retrieved information for Reeza Hendricks
INFO:root:0.30283260345458984
INFO:root:Retrieved information for Imran Tahir
INFO:root:0.29210400581359863
INFO:root:Retrieved information for Christiaan Jonker
INFO:root:0.6849350929260254
INFO:root:Retrieved information for Heinrich Klaasen
INFO:root:0.7190914154052734
INFO:root:Retrieved information for Aiden Markram
INFO:root:0.35073041915893555
INFO:root:Retrieved information for Lungi Ngidi
INFO:root:0.40166759490966797
INFO:root:Retrieved information for Andile Phehlukwayo
INFO:root:0.37362051010131836
INFO:root:Retrieved information for Kagiso Rabada
INFO:root:0.2818584442138672
```

Making the API call for each player takes between 0.3 to 0,6s. This is fine for the first 10 players. However, if we needs to do this for a database for hundreds (or thousands, or millions) of players, it is going to take a very long time.

## New School Asynchronous, or shoot-first-ask-questions-later

This is a very real issue, particularly in (almost every) practical application where you pay money to run a function. Fortunately, we have a way around this.

Step forward the `asyncio` and `aiohttp` Python packages. Respectively, these allow us to run asynchronous functions in Python and make asynchronous API calls over the internet.

The specific usage of these can be seen in this [Github repository](https://github.com/tom-mont/asynchronous) but I will put the jist here.

- You define your asynchronous task (Make _Player_ API call)

```python
async def api_call(session, url, player_id, payload):
    async with session.get(url=f"{url}/{player_id}", params=payload) as response:
        return await response.json() 
```

- You define how this task will repeat (dynamically inputting the Player ID into the API call)

```python
tasks = [api_call(session, url, player_id, payload) for player_id in player_ids]
```

- You run `asyncio.gather(*tasks)`

This unlocks the power of the asynchronous API call. Instead of starting the loop, making the API call, storing the results, starting the loop again, we make all our API calls (more or less) at the same time!

In this case, it doesn't matter when the results come back. We don't actually need to wait until we have got a response from the first call to move onto the second - we simply need to start the first API call, ensure there is somewhere the response is going to be stored when it _eventually_ gets back... And then we can move onto the next.

This explains all the extensive use of `await` whenever we are dealing with asynchronous functions - we are going to eventually assign the value of the response to our variable, but in the mean time... You (speaking directly to the variable here) just wait until that response comes.

The result of this:

```bash
INFO:root:Time to make all API calls: 1.1108953952789307s
```

It takes a comparable amount of time to do _all_ the API calls asynchronously compared to _one_ synchronous API call. These benefits compound as the number of API calls required increases: while the time taken to complete the task using the synchronous approach increases linearly as you increase the number of calls to be made, the time it takes to do the same job using the asynchronous approach increase at a much slower rate.

## The only currency that matters is concurrency

This gives a small taste of of running tasks concurrently using `asyncio`. I have no doubt whatsoever that the applications of such a package (and of asynchronous functions in general) spans much further than the retrieval of Kagiso Rabada's strike rate and when I come across another great use case I'll be sure to share it with you. Until then, I am going to have to ask you to be patient and wait.
