---
title: "Earning my Stripes"
excerpt: "Using Python to integrate with a payment service"
coverImage: "/assets/blog/stripe-integration/cover.jpg"
date: "2024-03-31T05:35:07.322Z"
author:
  name: Tom Montgomery
  picture: "/assets/blog/authors/jj.jpeg"
ogImage:
  url: "/assets/blog/stripe-integration/cover.jpg"
tags: ["Learnings"]
---

Two aspects of tech I have been itching to kick off are:

(1) Scripting using python

(2) Integrating with an API-driven payment provider

this project seeks to knock both off the list. The code can be found at [this repository](https://github.com/tom-mont/stripe-integration).

The goal of the project was to run a script that would set up a recurring collection using Stripe.

### Setting up - securing my keys

The importance of authorisation and authentication has gradually become more apparent as I increase my exposure to APIs. The way I have seen API keys be managed before is by using an `.env` file - that is, a file which lives only on your local machine and is not uploaded to your online repository.

This method also solves the problem of authentication - if each person has to use their own API keys (which live in their own `.env` file on their local) we can enforce priciples of least privelege by only allowing the relevant permissions assosciated with each key (and no more).

The way this environment file is accessed within the `main.py` file is via the `dotenv` package. The `load dotenv()` function is run and, from there, the environment variables can be accessed through the `os.getenv("<VARIABLE NAME>")` function. [The documentation](https://pypi.org/project/python-dotenv/) is incredbily clear.

An important step here is to add the `.env` file path to the `.gitignore` file. As I mentioned earlier, the `.env` file should not be uploaded to the online repository.

### Setting up a customer on Stripe

A step I did not describe above was that I had created a Stripe account and saved my API key therefrom. (The reason for this omission is, even with my colourful writing, no one wants to read a blog post about signing up to an online service).

The Stripe dashboard allows for one to view the results of the API calls being made. It is _inordinately_ satisfying to make an API call on one's machine and see the dashboard update with a number having ticked up.

![](/assets/blog/stripe-integration/dashboard-api-call.png)

The [Stripe docs](https://docs.stripe.com/api/customers/create) are excellent and it did not take long to be able to make a call using their provided code snippet. Simply running:

```
stripe.Customer.create(
        name=name,
        email=email,
    )
```

was sufficient for getting a customer up-and-running.

From this point onwards, the flow followed a pretty common structure of:

- Getting a call working
- Figuring out what the next call would be
- Getting that call working

and so on.

One of the mistakes I made at this point was saving each new variable to my environment variables file. That is, once I had created a customer and retrieved the customer ID (which would be required in another call), I saved this to my environment variables file as `stripe_customer_id`. It took getting to the end of the project and realising that chaining together these commands did not necessitate such a roundabout way of retrieving the variables and I could simply pass them into the next call directly.

### Setting up the flow

With a customer set up, (through trial and error) I discovered I would need to do the following:

- Create a payment method
- Attached the paymentn method to the customer
- Create a price

and, finally,

- Create a subscription

this would allow me to collect monthly payments. Success!

![](/assets/blog/stripe-integration/dashboard-working-subscription.png)

Simply running `py main.py` from the command line results in a fully-formed subscription being created on Stripe!

### So, what did we do?

The exact real-world application of this script is a _little_ shaky. I can't imagine (or at least, I hope it isn't possible) to simply run a command from my laptop that would result in money being taken from someone's account each month.

That being said, there was plenty learned from the project which would extend further into the two areas in which I wanted to learn: Python scripting and API integrations.

### Design decisions

During the course of building out the script I needed to make some design decisions. While I naturally spent time trying to understand what the best practice for Python is on the various decisions, there is not always (never, actually) unanimous agreement as to how to design a Python script.

- `.env` file: This was informed by previously encountered practices. Further research and projects would be required into the storage and usage of secrets
- `helpers.py` file: I made the decision to only include function calls in the `main.py` file, abstracting all the actual complexity into a separate file. My decision allowed for a simple understanding of the script at a glance with an opportunity to go into the weeds in the helper file should one wish.
- Virtual environment: From the outset of the project I used a virtual environment to manage dependencies. I love the concept.

### Extensions of the project

I am happy with the framework I have set up here and would love to extend the project further:

- Setting up a webhook to listen in for failed payments on Stripe using a Lambda function
- Improving the storage of secrets
- Improving the file structure of the overall project
- Implementing further Python best practices into the naming convention
- A deeper understanding into the Python virtual environment and how to leverage this functionality
- Including some more complex logic into the code
