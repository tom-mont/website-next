---
title: "Getting to grips with Apache Flink"
excerpt: "No fun pun for this title - just some learnings as I have messed around with Apache Flink."
coverImage: "/assets/blog/flink-starter/squirrles.jpg"
date: "2025-03-12T05:35:07.322Z"
author:
  name: Tom Montgomery
  picture: "/assets/blog/authors/jj.jpeg"
ogImage:
  url: "/assets/blog/wireshark/cover.jpg"
tags: ["Learnings"]
---

The last few weeks of my existence (and spare time) have been poured into getting to grips with Apache Flink. I already have a Kafka stream set up as outlined in [Process Github](https://www.tom-montgomery.com/posts/process-github), hence my challenge would be to use Flink on this stream to do something (interesting).

The code that accompanies this write up can be found [here](https://github.com/tom-mont/flink-starter).

A massive shoutout also to [Jaehyeon Kim](http://jaehyeon.me/blog/2023-08-17-getting-started-with-pyflink-on-aws-part-1/#source-data) whose blog helped in setting up Flink.

## Initial setup challenges

I was determined to use [PyFLink](https://nightlies.apache.org/flink/flink-docs-master/api/python/), the Python wrapper for Apache Flink. It took me a while to get thing set up, eventually coming right thanks almost entirely to [augustodn](https://github.com/augustodn/pyflink-iot-alerts) who lays down in excellent detail how to (1) ensure you are using the correct Python version (using `pyenv`) and (2) ensuring the packages used are correct by implementing a tremendously strict `requirements.txt` file. 

If you are planning on setting up PyFlink I would follow the instructions in that `README.md` very carefully. 

## So... What are you actually going to do with it, then?

As mentioned, I already had the [Github Firehose](https://github-firehose.libraries.io/) set up using Quix streams. It didn't take a creative genius to, well, use the Github Firehose as my source. This led me down a fortunate rabbit hole, being forced to learn some Flink basics (instead of actually reading about them in the first place `:)` ). 

The challenge would be: who were the top publishers of Github events in the last 10 seconds? (And then in 10 seconds time: Who were the top publishers of Github events in the last 10 seconds? And in 10 seconds time: Who etc. etc.)

## The jar is important

Apache Flink is built in Java. Since PyFlink is a Python wrapper, there needs to be some way to translate the (Java-native) functionality in Python. There is where a jar comes in. If you're looking for a technical explanation of what or why a jar is, I'm afraid you've come to the wrong place. Suffice to say - I included the jar in my repository and I was able to access this Java functionality from the comfort of my Python home.

## Kafka and Flink are friends

Flink has a built-in Kafka source connector, allowing for seamless Kafa integration. When creating a source it is usualy to use a `TimestampAssigner` for each event - this is not necessary with Kafka as a source in Flink. 

One step that should not be overlooked is the `KafkaOffsetInitializer`. Essentially, this is the point from which Flink will read from the Kafka topic. This caused me a lot of debugging confusion down the line - I had simply set the initialiser (I am going to spell it correctly in plaintext, at least) to `earliest` (because I am greedy and want all the data, obviously). This flummoxed me as I looked for "fresh" data when testing my Flink data stream only to find events coming from five days ago. Be conscious of when and what you set this initialiser to.

To tell you the truth, I could not tell you the difference between a bounded out of orderness watermark strategy and a monotonous timestamp watermark strategy. This is left as an exercise for the reader.

## Extract some insights already

This is where the real fun began. At this point, I had all the machinery in place and was ready to derive some _data-driven insights_. To achieve my goal - find out who the top publisher of Github events was in the past 10 seconds - I would need to utilise a `window_all` windowed datastream. When we eventually call the `process` function we would be accessing _all_ events in the window. Contrast this with a windowed (_sans all_) datastream where the process function would work on a per-key basis. I wanted to compare events within the window, keys be damned. 

Once I had figured out this nuance, it was simple Python from this point. In order to tally events, each event was cast to a tuple (all the Flink examples loved Tuples? I had to follow suit) consisting of the publisher and the number 1 (one). The simple Python function then adds the number part of the tuple, joined by the publisher. Sort it and disregard the non-top five publishers and we have our results. 

```bash
'top_results': [('github-actions', 51), ('RayhanZuck', 15), ('pull', 13), ('renovate', 7)]
```

Okay, no prizes for guessing that github-actions would be top. The challenge for the reader is... Who is RayhanZuck? My money is on a certain CEO but that is purely speculation on my part. Let me know in the comments below.

## Last cool learning

The `.print` function in Flink is simply a source to the I/O of the Task manager (in this case, that is you. And the I/O is your terminal.)