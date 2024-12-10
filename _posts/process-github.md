---
title: "Kafka is a writer"
excerpt: "Looking at streaming"
coverImage: "/assets/blog/process-github/process-github-cover.jpg"
date: "2024-12-10T05:35:07.322Z"
author:
  name: Tom Montgomery
  picture: "/assets/blog/authors/jj.jpeg"
ogImage:
  url: "/assets/blog/wireshark/cover.jpg"
tags: ["Learnings"]
---

I have spent the past couple of months (relatively unsuccessfully) trying to experiment with Apache Kafka. It is a somewhat foreboding topic (excuse the pun) and I struggled to find an entry point. Fortunately, I came across some excellent videos on the Quix Youtube page that offered an exciting entry point into Kafka. This blog post will look at setting up a pipeline that streams event from the [Github firehouse](https://github-firehose.libraries.io/) as outlined in [this fantastic video](https://www.youtube.com/watch?v=mdhEXg5Pny8&t=671s). The Github firehose is a live stream of all events on Github.

You can find my repository with the source code [here](https://github.com/tom-mont/process-github). The nitty-gritty is contained here - this blogpost will be a somewhat more lighthearted explainer of what's actually going on.

## Getting me up and working Quix 

I mentioned in the preamble that I struggled a bit to actually find a way of interacting with Kafka. To be sure this was, in all likelihood, a product of my own ineptitude however I was grateful to come across the Quix events streams as a means of obfuscating some of the chewier bits. 

As an example, in the `main.py` script we are able simply import the `Applications` module from the `quix` package. This module allows us to spin up a Kafka producer using plain Python, essentially just declaring the config. If that last sentence confuses you, that is precisely the point. With a simple `quix pipeline up` command we are able to run Kakfa (another action I struggled to do all on my lonesome).

## Format(ters)

Close attention was paid by the creator of the video (whose name I am unble to source - please make me aware of this if you possess such knowledge!) to the format in which the streams appeared. Although the use case may be narrow (I am not sure how many of us are sitting watching events go by in the command line), I think the principle of ensuring data is in a digestible format for the end user is always relevant. There were a couple of interesting steps used to ensure this:

In the `main.py` script:

```json.loads(event.data)```

turned the json blob into a python dictionary. The use of this is self-evident and clearly a good first-step in any data processing.

```python
logging.debug(
    "Got: %s", pformat(value)
)
``` 

This next step transforms the event into a string with neat indentation, allowing for ease of reading.

The next formatting sleight of hand took place in the command line. It is work breaking down the entire command:

```bash
kafkacat -b localhost:19092 -Ct github_events | jq .
```

[Kafkacat](https://github.com/rollulus/kafcat) (or kafcat, for copyright purposes I believe) is another seemingly-awesome tool I haven't really managed to sink my teeth into. Essentially is a tool for interacting with Kafka. Above, we are able to consume the topic (`-Ct`) `github_events` whose broker (`-b`) can be found on port (`localhost:19092`) of the broker. We then pipe (`|`) this to a formatter `jq`. [`jq`](https://jqlang.github.io/jq/) is a JSON processer that makes JSON more readable in the command line (I have no doubt that it has countless other uses beyond that extremely reductive description).

## Tradeoffs 

The final point that was made refreshingly clear in the video was the presence of trade offs in the configuration. The more I learn about data, the more I come to understand that there are tradeoffs present in basically every decision. This tradeoff also seems to boil down to efficiency vs. expenditure (be that of resources or money or, in all likelihood, both).

An example of this would be in the `main.py` script when setting the extra config settings. Let's bring out attention to the following setting:

```python
"linger.ms": 200,
```

This is telling Kafka to wait 200ms before sending a batch. This seems ludicrous - I am using Kafka for realtime streaming in the first place, why would I want to wait for a batch? 

The answer seems to be that real real-time doesn't really exist for almost all uses. In this case, lingering for 200ms allows more events to be included in a batch. This means we are being more efficient with our resources - we pay for compute resources. This is where the tradeoff emerges - we are using Kafka to unlock real-time streaming. But we can improve our efficiency by moving slightly away from real real-time. It is an interesting thought and one which is embedded into the foundation of software and data engineering.