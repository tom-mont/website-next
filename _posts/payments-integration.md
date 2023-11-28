---
title: "Payments Integration"
excerpt: "Solving puzzles with my friends"
coverImage: "/assets/blog/api-integration/api-integration-cover.jpg"
date: "2023-11-28T05:35:07.322Z"
author:
  name: Tom Montgomery
  picture: "/assets/blog/authors/jj.jpeg"
ogImage:
  url: "/assets/blog/wireshark/cover.jpg"
---

Presently I find myself working as a project lead at an insurtech startup. The environment is dynamic and the exposure I receive is incredible.

Recently, I worked on a project integrating with a local payments provider. I _thoroughly_ enjoyed this process and would like to document some of the learnings here.

## From the outside looking in

In a [previous post](/posts/api_intro) I spoke about the concept of REST APIs as _Rules of Engagement_. This project exposed exactly what this means.

In essence, we used the payment provider to capture credit card details and set up a subscription to collect recurring payments from the card. Now, the payment provider has this plumbing set up. We have a certain set of requirements from the client. The trick is to fulfil these requirements given the payment provider's existing system.

The API told us _how_ to integrate. What we needed to figure out was how to integrate _to our system_.

## Setting up a webhook

The first step in this process was to ensure that the signals being sent out were being sent to us. Being relatively new to tech, this idea is not immediately intuitive.

We all seem to understand that, due to the incredible connectivity of modern systems, there is a lot of data flying around. What becomes apparent when working on an integration such as this is that, in order to receive and injest this data, we need to be listening to it.

Enter, the webhook. A magical hearing device that allows us to listen in on this cool data. The process of setting up the webhook was managed on the payment provider's end - this makes sense. We wouldn't want just anyone to be able to do this.

## Information. Do something with it.

The next part was the _really_ exciting part for me. Once the webhook was set up we were receiving data triggered by events. This data came in the form of a `payload` containing various fields of different values.

It was now our job to parse this data - these values - to find the information that would inform our next step. Create a policy, lapse a policy - you name it. The important part was that this data contained information from which our system was _making decisions_. This data was dynamic and our response was dynamic.

This encapsulates, for me, the idea of an integration. We have two systems with moving parts and there are dependencies between these systems. Integrations - APIs, specifically, in this case - enable communication between these systems (and unlock these dependencies).

## What did I learn?

Firstly, less importantly, this project showed me how interesting integration work is. The experience will definitely inform my next step - I am certain it will be in the direction of integration engineering work.

But, most importantly, this project taught me a valuable lesson on the kind of work that I enjoy.

My company has some awesome people and working on this integration project accessed a wistful enjoyment for me - the unfiltered, childish joy of _solving puzzles with your friends_.
