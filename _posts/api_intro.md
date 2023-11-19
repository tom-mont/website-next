---
title: "What is an API?"
excerpt: "An introduction to the Application Programming Interface"
coverImage: "/assets/blog/wireshark/cover.jpg"
date: "2020-03-16T05:35:07.322Z"
author:
  name: Tom Montgomery
  picture: "/assets/blog/authors/jj.jpeg"
ogImage:
  url: "/assets/blog/wireshark/cover.jpg"
---

APIs are all about communication. An API allows for different software
applications to interact with one another and is often used in the context
of data. This is particularly useful in the case of a third-party
application accessing data.

This post will establish a number of building blocks required to explain
what an API is and what it does, before putting these together to form the
big picture.

## What is REST?

Representational State Transfer (REST) is a set of constraints applied to
web architecture and services. A RESTful API adheres to the constraints of
REST, thus it is a means of standardising APIs.

REST APIs use the HTTP methods in order to execute requests.
HTTP Methods HTTP methods are ways of interacting with data with HTTP
requests. The methods are: GET - Used to retrieve information from a
server PUT - Updating existing data on a server POST - Sends new data to a
server DELETE - Removes data from a server

One important concept to grasp about an API which helped to make it
`click' for me is the following: an API allows for communication with
systems where internal access to the system is not possible. Interaction
occurs at the API layer. Of course, there will be many use cases where an
API is preferred even when there is internal access, but for simplicity it
is helpful to think in the way I stated.

## Endpoints

A RESTful API is generally comprised of endpoints. Endpoints will
represent a particular function. This is easy to imagine when it comes to
a web application - an endpoint may be to generate an order or to post a
message. Endpoints are accessed via the HTTP methods to manipulate or
retrieve data.

If you do not supply the correct inputs at the endpoint, your request will
not be successful.

APIs are a set of rules that allow software applications to communicate
with one another. REST APIs are governed by specific restrictions that
allow for standardised use. RESTful APIs make use of the HTTP protocol -
this means they are flexible and can be used by just about any programming
language.

When you think of an API, think 'Rules of Engagement'.
